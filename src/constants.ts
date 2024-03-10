// https://developers.circle.com/stablecoins/docs/evm-smart-contracts

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

export const MainnetContracts = {
    [Chains.Ethereum]: {
        TokenMessenger: "0xbd3fa81b58ba92a82136038b25adec7066af3155",
        MessageTransmitter: "0x0a992d191deec32afe36203ad87d7d289a738f81",
        TokenMinter: "0xc4922d64a24675e16e1586e3e3aa56c06fabe907"
    },
    [Chains.Avalanche]: {
        TokenMessenger: "0x6b25532e1060ce10cc3b0a99e5683b91bfde6982",
        MessageTransmitter: "0x8186359af5f57fbb40c6b14a588d2a59c0c29880",
        TokenMinter: "0x420f5035fd5dc62a167e7e7f08b604335ae272b8"
    },
    [Chains.OPMainnet]: {
        TokenMessenger: "0x2B4069517957735bE00ceE0fadAE88a26365528f",
        MessageTransmitter: "0x4d41f22c5a0e5c74090899e5a8fb597a8842b3e8",
        TokenMinter: "0x33E76C5C31cb928dc6FE6487AB3b2C0769B1A1e3"
    },
    [Chains.Arbitrum]: {
        TokenMessenger: "0x19330d10D9Cc8751218eaf51E8885D058642E08A",
        MessageTransmitter: "0xC30362313FBBA5cf9163F0bb16a0e01f01A896ca",
        TokenMinter: "0xE7Ed1fa7f45D05C508232aa32649D89b73b8bA48"
    },
    [Chains.Base]: {
        TokenMessenger: "0x1682Ae6375C4E4A97e4B583BC394c861A46D8962",
        MessageTransmitter: "0xAD09780d193884d503182aD4588450C416D6F9D4",
        TokenMinter: "0xe45B133ddc64bE80252b0e9c75A8E74EF280eEd6"
    },
    [Chains.PolygonPoS]: {
        TokenMessenger: "0x9daF8c91AEFAE50b9c0E69629D3F6Ca40cA3B3FE",
        MessageTransmitter: "0xF3be9355363857F3e001be68856A2f96b4C39Ba9",
        TokenMinter: "0x10f7835F827D6Cf035115E10c50A853d7FB2D2EC"
    },
}

export const TestnetContracts = {
    [Chains.Ethereum]: {
        TokenMessenger: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
        MessageTransmitter: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
        TokenMinter: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A"
    },
    [Chains.EthereumGoerli]: {
        TokenMessenger: "0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8",
        MessageTransmitter: "0x26413e8157cd32011e726065a5462e97dd4d03d9",
        TokenMinter: "0xca6b4c00831ffb77afe22e734a6101b268b7fcbe"
    },
    [Chains.Avalanche]: {
        TokenMessenger: "0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0",
        MessageTransmitter: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
        TokenMinter: "0x4ed8867f9947a5fe140c9dc1c6f207f3489f501e"
    },
    [Chains.OPMainnet]: {
        TokenMessenger: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
        MessageTransmitter: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
        TokenMinter: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A"
    },
    [Chains.OPGoerli]: {
        TokenMessenger: "0x23a04d5935ed8bc8e3eb78db3541f0abfb001c6e",
        MessageTransmitter: "0x9ff9a4da6f2157a9c82ce756f8fd7e0d75be8895",
        TokenMinter: "0x162580c71df51638df454e9ad75f11d184ff867b"
    },
    [Chains.Arbitrum]: {
        TokenMessenger: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
        MessageTransmitter: "0xaCF1ceeF35caAc005e15888dDb8A3515C41B4872",
        TokenMinter: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A"
    },
    [Chains.ArbitrumGoerli]: {
        TokenMessenger: "0x12dcfd3fe2e9eac2859fd1ed86d2ab8c5a2f9352",
        MessageTransmitter: "0x109bc137cb64eab7c0b1dddd1edf341467dc2d35",
        TokenMinter: "0xe997d7d2f6e065a9a93fa2175e878fb9081f1f0a"
    },
    [Chains.Base]: {
        TokenMessenger: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
        MessageTransmitter: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
        TokenMinter: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A"
    },
    [Chains.PolygonPoS]: {
        TokenMessenger: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
        MessageTransmitter: "0xe09A679F56207EF33F5b9d8fb4499Ec00792eA73",
        TokenMinter: "0xE997d7d2F6E065a9A93Fa2175E878Fb9081F1f0A"
    },
}