// https://developers.circle.com/stablecoins/docs/evm-smart-contracts

export enum Chains {
    Ethereum = 'Ethereum',
    EthereumGoerli = 'EthereumGoerli',
    Avalanche = 'Avalanche',
    OPMainnet = 'OPMainnet',
    OPGoerli = 'OPGoerli',
    Arbitrum = 'Arbitrum',
    ArbitrumGoerli = 'ArbitrumGoerli',
    Base = 'Base',
    BaseGoerli = 'BaseGoerli',
    PolygonPoS = 'PolygonPoS',
}

export const Contracts = {
    [Chains.Ethereum]: {
        TokenMessenger: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
        MessageTransmitter: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
        TokenMinter: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A",
        USDCERC20: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
    },
    [Chains.EthereumGoerli]: {
        TokenMessenger: "0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8",
        MessageTransmitter: "0x26413e8157cd32011e726065a5462e97dd4d03d9",
        TokenMinter: "0xca6b4c00831ffb77afe22e734a6101b268b7fcbe",
        USDCERC20: "0x07865c6e87b9f70255377e024ace6630c1eaa37f"
    },
    [Chains.Avalanche]: {
        TokenMessenger: "0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0",
        MessageTransmitter: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
        TokenMinter: "0x4ed8867f9947a5fe140c9dc1c6f207f3489f501e",
        USDCERC20: "0x5425890298aed601595a70ab815c96711a31bc65"
    },
    [Chains.OPMainnet]: {
        TokenMessenger: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
        MessageTransmitter: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
        TokenMinter: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A",
        USDCERC20: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7"
    },
    [Chains.OPGoerli]: {
        TokenMessenger: "0x23a04d5935ed8bc8e3eb78db3541f0abfb001c6e",
        MessageTransmitter: "0x9ff9a4da6f2157a9c82ce756f8fd7e0d75be8895",
        TokenMinter: "0x162580c71df51638df454e9ad75f11d184ff867b",
        USDCERC20: "0xe05606174bac4A6364B31bd0eCA4bf4dD368f8C6"
    },
    [Chains.Arbitrum]: {
        TokenMessenger: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
        MessageTransmitter: "0xaCF1ceeF35caAc005e15888dDb8A3515C41B4872",
        TokenMinter: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A",
        USDCERC20: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
    },
    [Chains.ArbitrumGoerli]: {
        TokenMessenger: "0x12dcfd3fe2e9eac2859fd1ed86d2ab8c5a2f9352",
        MessageTransmitter: "0x109bc137cb64eab7c0b1dddd1edf341467dc2d35",
        TokenMinter: "0xe997d7d2f6e065a9a93fa2175e878fb9081f1f0a",
        USDCERC20: "0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63"
    },
    [Chains.Base]: {
        TokenMessenger: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
        MessageTransmitter: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
        TokenMinter: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A",
        USDCERC20: "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
    },
    [Chains.BaseGoerli]: {
        TokenMessenger: "0x877b8e8c9e2383077809787ED6F279ce01CB4cc8",
        MessageTransmitter: "0x9ff9a4da6f2157A9c82CE756f8fD7E0d75be8895",
        TokenMinter: "0xc90ece1CE1AE88676a2b2D65575206123C6fcE27",
        USDCERC20: "0xf175520c52418dfe19c8098071a252da48cd1c19"
    },
    [Chains.PolygonPoS]: {
        TokenMessenger: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
        MessageTransmitter: "0xe09A679F56207EF33F5b9d8fb4499Ec00792eA73",
        TokenMinter: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A",
        USDCERC20: "0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97"
    },
}
