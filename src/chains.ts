require('dotenv').config();
import Web3 from "web3";
import { getWeb3HttpInstance } from "./blockchain/evm/web3-client";
import { Chains } from "./contracts/testnet";

const HttpRPCUrls = {
    [Chains.Ethereum]:          process.env.RPC_URL_ETHEREUM,
    [Chains.Arbitrum]:          process.env.RPC_URL_ARBITRUM,
    [Chains.Avalanche]:         process.env.RPC_URL_AVALANCHE,
    [Chains.EthereumGoerli]:    process.env.RPC_URL_ETHEREUM_GOERLI,
    [Chains.OPMainnet]:         process.env.RPC_URL_OP_MAINNET,
    [Chains.OPGoerli]:          process.env.RPC_URL_OP_GOERLI,
    [Chains.ArbitrumGoerli]:    process.env.RPC_URL_ARBITRUM_GOERLI,
    [Chains.Base]:              process.env.RPC_URL_BASE,
    [Chains.BaseGoerli]:        process.env.RPC_URL_BASE_GOERLI,
    [Chains.PolygonPoS]:        process.env.RPC_URL_POLYGON_POS,
}

export const chainToWeb3: {[key in Chains]: Web3 | null} = {
    [Chains.Ethereum]:          getWeb3HttpInstance(HttpRPCUrls[Chains.Ethereum]),
    [Chains.Avalanche]:         getWeb3HttpInstance(HttpRPCUrls[Chains.Avalanche]),
    [Chains.EthereumGoerli]:    getWeb3HttpInstance(HttpRPCUrls[Chains.EthereumGoerli]),
    [Chains.OPMainnet]:         getWeb3HttpInstance(HttpRPCUrls[Chains.OPMainnet]),
    [Chains.OPGoerli]:          getWeb3HttpInstance(HttpRPCUrls[Chains.OPGoerli]),
    [Chains.Arbitrum]:          getWeb3HttpInstance(HttpRPCUrls[Chains.Arbitrum]),
    [Chains.ArbitrumGoerli]:    getWeb3HttpInstance(HttpRPCUrls[Chains.ArbitrumGoerli]),
    [Chains.Base]:              getWeb3HttpInstance(HttpRPCUrls[Chains.Base]),
    [Chains.BaseGoerli]:        getWeb3HttpInstance(HttpRPCUrls[Chains.BaseGoerli]),
    [Chains.PolygonPoS]:        getWeb3HttpInstance(HttpRPCUrls[Chains.PolygonPoS]),
}

export function getWeb3ForChain(chain: Chains): Web3{
    if(!chainToWeb3[chain]){
        throw new Error(`web3 not configured for chain(${chain})`)
    }
    return chainToWeb3[chain]!;
}