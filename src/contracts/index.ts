import { Chains as MainnetChain, Contracts as MainnetContracts } from "./mainnet";
import { Chains as TestnetChain, Contracts as TestnetContracts } from "./testnet";

export type ChainType = 'mainnet' | 'testnet';

export function getContract(
    chain: TestnetChain | MainnetChain,
    contract: 'TokenMessenger' | 'MessageTransmitter' | 'TokenMinter' | 'USDCERC20',
    chainType: ChainType){
    switch(chainType){
        case "mainnet": {
            return MainnetContracts[chain as MainnetChain][contract];
        }
        case "testnet": {
            return TestnetContracts[chain as TestnetChain][contract];
        }
        default : {
            throw new Error(`chainType(${chainType}) not suported`)
        }
    }
}

export enum Domains {
    Ethereum = 0,
    EthereumGoerli = 0,
    Avalanche = 1,
    OPMainnet = 2,
    OPGoerli = 2,
    Arbitrum = 3,
    ArbitrumGoerli = 3,
    Base = 6,
    BaseGoerli = 6,
    PolygonPoS = 7,
}