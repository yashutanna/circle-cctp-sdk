import Web3 from 'web3';
const tokenMessengerAbi = require('./abis/cctp/TokenMessenger.json');
const usdcAbi = require('./abis/Usdc.json');
const messageAbi = require('./abis/cctp/Message.json');
const messageTransmitterAbi = require('./abis/cctp/MessageTransmitter.json');
import { Chains } from './contracts/testnet';
import { getContract, ChainType, Domains } from './contracts';

export async function createApproveTokenMessagerTransaction(
    web3: Web3,
    sourceAddress: string,
    sourceChain: Chains,
    sourceTokenMessagerContract: string,
    allowance: string,
    chainType: ChainType
){
    const usdcTokenAddress = getContract(sourceChain, 'USDCERC20', chainType)
    const usdcEthContract = new web3.eth.Contract(usdcAbi, usdcTokenAddress, { from: sourceAddress });

    const approveTxGas = await usdcEthContract.methods.approve(sourceTokenMessagerContract, allowance).estimateGas({from: sourceAddress})
    const approveTx = await usdcEthContract.methods.approve(sourceTokenMessagerContract, allowance).encodeABI();
    const chainId = await web3.eth.getChainId();
    const transaction = {
        from: sourceAddress,
        to: usdcTokenAddress,
        gas: approveTxGas,
        data: approveTx,
        chainId: chainId,
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
    chainType: ChainType
){
    const tokenMessagerContract = getContract(burnChain, 'TokenMessenger', chainType)
    const sourceTokenMessengerContract = new web3.eth.Contract(tokenMessengerAbi, tokenMessagerContract, {from: sourceAddress});

    const mintAddressInBytes32 = web3.utils.padRight(web3.utils.toHex(mintToAddress), 64);

    const usdcTokenAddress = getContract(burnChain, 'USDCERC20', chainType)

    const mintDomain = Domains[mintChain]
    const burnTxGas = await sourceTokenMessengerContract.methods.depositForBurn(amount, mintDomain, mintAddressInBytes32, usdcTokenAddress).estimateGas({from: sourceAddress});
    const burnTx = await sourceTokenMessengerContract.methods.depositForBurn(amount, mintDomain, mintAddressInBytes32, usdcTokenAddress).encodeABI();
    
    const chainId = await web3.eth.getChainId();
    const transaction = {
        from: sourceAddress,
        to: tokenMessagerContract,
        gas: burnTxGas,
        data: burnTx,
        chainId: chainId,
    };

    return transaction;
}

export async function getburnBytesFromLogs(
    web3: Web3,
    burnTxHash: string,
){
    const transactionReceipt = await web3.eth.getTransactionReceipt(burnTxHash);
    const eventTopic = web3.utils.keccak256('MessageSent(bytes)')
    const log = transactionReceipt.logs.find((l) => l.topics[0] === eventTopic)
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
    const circleUrl = chainType === 'mainnet' 
        ? 'https://api.circle.com/attestations/'
        : 'https://iris-api-sandbox.circle.com/attestations/';
    let attestationResponse = {status: 'pending', attestation: undefined };
    while(attestationResponse.status != 'complete') {
        const response = await fetch(`${circleUrl}/${messageHash}`);
        attestationResponse = await response.json()
        await new Promise(r => setTimeout(r, 2000));
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
    attestationSignature: string
){
    const transmitterContract = getContract(mintChain, 'MessageTransmitter', chainType)
    const avaxMessageTransmitterContract = new web3.eth.Contract(messageTransmitterAbi, transmitterContract, {from: mintToAddress });
    const mintTxGas = await avaxMessageTransmitterContract.methods.receiveMessage(messageBytes, attestationSignature).estimateGas({from: mintToAddress});
    const mintTx = await avaxMessageTransmitterContract.methods.receiveMessage(messageBytes, attestationSignature).encodeABI();
    const chainId = await web3.eth.getChainId();
    const transaction = {
        from: mintToAddress,
        to: transmitterContract,
        gas: mintTxGas,
        data: mintTx,
        chainId: chainId,
    };

    return transaction;
}