// https://developers.circle.com/stablecoins/docs/evm-smart-contracts

export enum Chains {
    Ethereum = 'Ethereum',
    Avalanche = 'Avalanche',
    OPMainnet = 'OPMainnet',
    Arbitrum = 'Arbitrum',
    Base = 'Base',
    PolygonPoS = 'PolygonPoS',
}

export const Contracts = {
    [Chains.Ethereum]: {
        TokenMessenger: "0xbd3fa81b58ba92a82136038b25adec7066af3155",
        MessageTransmitter: "0x0a992d191deec32afe36203ad87d7d289a738f81",
        TokenMinter: "0xc4922d64a24675e16e1586e3e3aa56c06fabe907",
        USDCERC20: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    },
    [Chains.Avalanche]: {
        TokenMessenger: "0x6b25532e1060ce10cc3b0a99e5683b91bfde6982",
        MessageTransmitter: "0x8186359af5f57fbb40c6b14a588d2a59c0c29880",
        TokenMinter: "0x420f5035fd5dc62a167e7e7f08b604335ae272b8",
        USDCERC20: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"
    },
    [Chains.OPMainnet]: {
        TokenMessenger: "0x2B4069517957735bE00ceE0fadAE88a26365528f",
        MessageTransmitter: "0x4d41f22c5a0e5c74090899e5a8fb597a8842b3e8",
        TokenMinter: "0x33E76C5C31cb928dc6FE6487AB3b2C0769B1A1e3",
        USDCERC20: "0x0b2c639c533813f4aa9d7837caf62653d097ff85"
    },
    [Chains.Arbitrum]: {
        TokenMessenger: "0x19330d10D9Cc8751218eaf51E8885D058642E08A",
        MessageTransmitter: "0xC30362313FBBA5cf9163F0bb16a0e01f01A896ca",
        TokenMinter: "0xE7Ed1fa7f45D05C508232aa32649D89b73b8bA48",
        USDCERC20: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
    },
    [Chains.Base]: {
        TokenMessenger: "0x1682Ae6375C4E4A97e4B583BC394c861A46D8962",
        MessageTransmitter: "0xAD09780d193884d503182aD4588450C416D6F9D4",
        TokenMinter: "0xe45B133ddc64bE80252b0e9c75A8E74EF280eEd6",
        USDCERC20: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
    },
    [Chains.PolygonPoS]: {
        TokenMessenger: "0x9daF8c91AEFAE50b9c0E69629D3F6Ca40cA3B3FE",
        MessageTransmitter: "0xF3be9355363857F3e001be68856A2f96b4C39Ba9",
        TokenMinter: "0x10f7835F827D6Cf035115E10c50A853d7FB2D2EC",
        USDCERC20: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359"
    },
}