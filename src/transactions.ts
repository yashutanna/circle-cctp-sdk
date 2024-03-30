import Web3 from 'web3';
import { Chains } from './contracts/testnet';
import { getContract, ChainType, Domains } from './contracts';
import { Common } from '@ethereumjs/common';
import { toBuffer } from 'ethereumjs-util';
import { LegacyTransaction } from '@ethereumjs/tx';

const tokenMessengerAbi = require('./abis/cctp/TokenMessenger.json');
const usdcAbi = require('./abis/Usdc.json');
const messageTransmitterAbi = require('./abis/cctp/MessageTransmitter.json');

export type Tx = {
    from: string,
    to: string,
    gasLimit: string,
    gasPrice: string,
    data: string,
    chainId: number,
    nonce: number
}

export async function createApproveTokenMessagerTransaction(
    web3: Web3,
    sourceAddress: string,
    sourceChain: Chains,
    allowance: string,
    chainType: ChainType,
    gasPrice: string
){

    const usdcTokenAddress = getContract(sourceChain, 'USDCERC20', chainType)
    const usdcEthContract = new web3.eth.Contract(usdcAbi, usdcTokenAddress, { from: sourceAddress });
    const sourceTokenMessagerContract = getContract(sourceChain, 'TokenMessenger', chainType);
    const approveTxGas = await usdcEthContract.methods.approve(sourceTokenMessagerContract, allowance).estimateGas({from: sourceAddress})
    const approveTx = await usdcEthContract.methods.approve(sourceTokenMessagerContract, allowance).encodeABI();
    const chainId = await web3.eth.getChainId();
    const nonce = await web3.eth.getTransactionCount(sourceAddress);
    const transaction: Tx = {
        from: sourceAddress,
        to: usdcTokenAddress,
        gasLimit: approveTxGas,
        gasPrice: gasPrice,
        data: approveTx,
        chainId: chainId,
        nonce
    };

    return transaction;
}

export async function createBurnUsdcTransaction(
    web3: Web3,
    sourceAddress: string,
    burnChain: Chains,
    mintToAddress: string,
    mintChain: Chains,
    amount: string,
    chainType: ChainType,
    gasPrice: string
){
    const tokenMessagerContract = getContract(burnChain, 'TokenMessenger', chainType)
    const sourceTokenMessengerContract = new web3.eth.Contract(tokenMessengerAbi, tokenMessagerContract, {from: sourceAddress});

    const mintAddressInBytes32 = web3.utils.padLeft(web3.utils.toHex(mintToAddress), 64);

    const usdcTokenAddress = getContract(burnChain, 'USDCERC20', chainType)

    const mintDomain = Domains[mintChain]
    const burnTxGas = await sourceTokenMessengerContract.methods.depositForBurn(amount, mintDomain, mintAddressInBytes32, usdcTokenAddress).estimateGas({from: sourceAddress});
    const burnTx = await sourceTokenMessengerContract.methods.depositForBurn(amount, mintDomain, mintAddressInBytes32, usdcTokenAddress).encodeABI();
    
    const chainId = await web3.eth.getChainId();
    const nonce = await web3.eth.getTransactionCount(sourceAddress);
    const transaction = {
        from: sourceAddress,
        to: tokenMessagerContract,
        gasLimit: burnTxGas,
        gasPrice,
        data: burnTx,
        chainId: chainId,
        nonce
    };

    return transaction;
}

export async function getburnBytesFromLogs(
    web3: Web3,
    burnTxHash: string,
){
    console.log("getting burn bytes from logs")
    const transactionReceipt = await web3.eth.getTransactionReceipt(burnTxHash);
    const eventTopic = web3.utils.keccak256('MessageSent(bytes)')
    const log = transactionReceipt.logs.find((l) => l.topics[0] === eventTopic)
    console.log({transactionReceipt })
    if(log && log.data){
        const messageBytes = web3.eth.abi.decodeParameters(['bytes'], log.data)[0]
        const messageHash = web3.utils.keccak256(messageBytes);

        return {
            messageBytes,
            messageHash
        }
    }
    throw new Error(`could not get burn message bytes for txHash(${burnTxHash})`)
}

export async function getAttestationFromCircle(
    messageHash: string,
    chainType: ChainType
){
    console.log(" getting attestation from circle")
    const circleUrl = chainType === 'mainnet' 
        ? 'https://api.circle.com/attestations/'
        : 'https://iris-api-sandbox.circle.com/attestations/';
    
    type AttestationResponse = {status: 'pending' | 'complete', attestation?: string };

    let attestationResponse: AttestationResponse = {status: 'pending', attestation: undefined };

    while(attestationResponse.status != 'complete') {
        const response = await fetch(`${circleUrl}${messageHash}`);
        attestationResponse = await response.json()
        await new Promise(r => setTimeout(r, 2000));
        console.log("getting attestation from circle");
        console.log({ circleResponse: attestationResponse });
    }

    const attestationSignature = attestationResponse.attestation;
    return attestationSignature;
}

export async function getMintUsdcTransaction(
    web3: Web3,
    mintToAddress: string,
    mintChain: Chains,
    chainType: ChainType,
    messageBytes: string,
    attestationSignature: string,
    gasPrice: string
){
    const transmitterContract = getContract(mintChain, 'MessageTransmitter', chainType)
    const avaxMessageTransmitterContract = new web3.eth.Contract(messageTransmitterAbi, transmitterContract, {from: mintToAddress });
    const mintTxGas = await avaxMessageTransmitterContract.methods.receiveMessage(messageBytes, attestationSignature).estimateGas({from: mintToAddress});
    const mintTx = await avaxMessageTransmitterContract.methods.receiveMessage(messageBytes, attestationSignature).encodeABI();
    const chainId = await web3.eth.getChainId();
    const nonce = await web3.eth.getTransactionCount(mintToAddress);
    const transaction = {
        from: mintToAddress,
        to: transmitterContract,
        gasLimit: mintTxGas,
        gasPrice,
        data: mintTx,
        chainId: chainId,
        nonce
    };

    return transaction;
}

export async function signTransaction(chainId: number, txData: Tx, privateKey: string) {
    
    // Define the chain and hardfork for the transaction
    const common = Common.custom({ chainId });

    // Create a new transaction object
    const tx = new LegacyTransaction({
        ...txData,
        gasPrice: BigInt(txData.gasPrice)
    }, { common });

    // Convert the private key to a buffer if it's a hex string
    const privateKeyBuffer = toBuffer(privateKey);

    // Sign the transaction
    const signedTx = tx.sign(privateKeyBuffer);
    // Serialize the transaction and return it as a hex string
    //@ts-ignore
    const serializedTx = Buffer.from(signedTx.serialize()).toString('hex')
    
    return '0x' + serializedTx;
}

export async function broadcast(web3: Web3, signedTxHex: string){
    console.log(`broadcasting tx(${signedTxHex})`)
    const broadcastResponse = await web3.eth.sendSignedTransaction(signedTxHex);
    console.log({ broadcastResponse })
    return broadcastResponse;
}