require('dotenv').config();
import { Approve, Burn, Mint, getBurnInfo } from ".";
import { ChainType } from "./contracts";
import { Chains } from "./contracts/testnet";

async function main(){
    const chainType: ChainType = process.env.CHAIN_TYPE as ChainType;
    const address = process.env.ADDRESS as string
    const privateKey = process.env.PRIVATE_KEY as string;

    const amount = "1000000";
    const fromChain = Chains.Avalanche;
    const toChain = Chains.Ethereum;

    const approveTx = await Approve(amount, address, chainType, fromChain, privateKey)
    console.log({ approve: approveTx.transactionHash});

    const burnTx = await Burn(amount, address, chainType, fromChain, toChain, privateKey)
    console.log({ burnTx: burnTx});

    const burnInfo = await getBurnInfo(fromChain, burnTx.transactionHash, chainType)
    if(burnInfo.attestation){
        const mintTx = await Mint(amount, address, chainType, toChain, burnInfo.messageBytes, burnInfo.attestation, privateKey)
        console.log({ mintTx: mintTx.transactionHash});
    }
}

main().then(() => {
    console.log("done");
})