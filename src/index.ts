require('dotenv').config();
import Web3 from "web3";
import { ChainType } from "./contracts";
import { getWeb3ForChain } from "./chains";
import { Chains } from "./contracts/testnet";
import { Tx, broadcast, createApproveTokenMessagerTransaction, createBurnUsdcTransaction, getAttestationFromCircle, getMintUsdcTransaction, getburnBytesFromLogs, signTransaction } from "./transactions";

async function approve(address: string, chainType: ChainType, chain: Chains, amount: string, web3: Web3){
    const gasPrice = await web3.eth.getGasPrice();
    const approveTx = await createApproveTokenMessagerTransaction(
        web3,
        address,
        chain,
        amount,
        chainType,
        gasPrice
    );

    return approveTx
}

async function sign(tx: Tx, web3: Web3, privateKey: string){
    const chainId = await web3.eth.getChainId();
    const signedTx = await signTransaction(chainId, tx, privateKey)
    return signedTx;
}

async function burn(address: string, chainType: ChainType, burnChain: Chains, mintChain: Chains, amount: string, web3: Web3){
    const gasPrice = await web3.eth.getGasPrice();
    const burnTx = await createBurnUsdcTransaction(
        web3, address, burnChain, address, mintChain, amount, chainType, gasPrice
    );
    return burnTx;
}

async function getAttestation(messageHash: string, chainType: ChainType){
    const attestation = await getAttestationFromCircle(messageHash, chainType);
    return attestation;
}

async function mint(address: string, chainType: ChainType, chain: Chains, messageBytes: string, attestationSignature: string, web3: Web3){
    const gasPrice = await web3.eth.getGasPrice();
    const mintTx = await getMintUsdcTransaction(
        web3, address, chain, chainType, messageBytes, attestationSignature, gasPrice
    );
    return mintTx;
}

export async function Approve(amount: string, address: string, chainType: ChainType, chain: Chains, privateKey: string){
    console.log(`Approving ${amount} USDC`)
    
    const web3 = getWeb3ForChain(chain)
    return await approve(address, chainType, chain, amount, web3)
        .then(tx => sign(tx, web3, privateKey))
        .then(tx => broadcast(web3, tx));
}

export async function Burn(amount: string, address: string, chainType: ChainType, fromChain: Chains, toChain: Chains, privateKey: string){
    console.log(`Burning ${amount} USDC on ${fromChain}`)
    const web3 = getWeb3ForChain(fromChain)
    return burn(address, chainType, fromChain, toChain, amount, web3)
        .then(tx => sign(tx, web3, privateKey))
        .then(signedBurnTx => broadcast(web3, signedBurnTx));
}

export async function getBurnInfo(fromChain: Chains, burnTxHash: string, chainType: ChainType){
    console.log(`getting attestations and message bytes`)
    const web3 = getWeb3ForChain(fromChain)
    const burnDetails = await getburnBytesFromLogs(web3, burnTxHash);
    
    const attestation = await getAttestation(burnDetails.messageHash, chainType)
    
    return { 
        attestation,
        ...burnDetails
    }
}

export async function Mint(
    amount: string, 
    address: string, 
    chainType: ChainType, 
    mintChain: Chains, 
    burnMessageBytes: string, 
    burnAttestation: string, 
    privateKey: string
){
    const web3 = getWeb3ForChain(mintChain)
    console.log(`minting ${amount} USDC on ${mintChain}`)
    return mint(
        address,
        chainType,
        mintChain,
        burnMessageBytes,
        burnAttestation,
        web3
    )
    .then(tx => sign(tx, web3, privateKey))
    .then(signedMintTx => broadcast(web3, signedMintTx));
}