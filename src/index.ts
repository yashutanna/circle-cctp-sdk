import { getWeb3HttpInstance } from "./blockchain/evm/web3-client";
import { Chains } from "./contracts/testnet";
import { createBurnUsdcTransaction } from "./transactions";

const address = "0x6734bb2461512DB4f736b8085Ef228B12aF7ffE9"
const privateKey = "c1957246fb7cdc73cddbafac8e7d21d4523dcf2dcd6ffabe3cefdd0045a6aab3";

const RPCUrls = {
    [Chains.Ethereum]: 'https://ethereum-sepolia-rpc.publicnode.com',
    [Chains.Arbitrum]: 'https://sepolia-rollup.arbitrum.io/rpc',
}

const web3Eth = getWeb3HttpInstance(RPCUrls[Chains.Ethereum]);
const web3Arb = getWeb3HttpInstance(RPCUrls[Chains.Arbitrum]);

async function bridgeFromEthToArb(){
    const transaction = await createBurnUsdcTransaction(
        web3Eth,
        address,
        Chains.Ethereum,
        address,
        Chains.Arbitrum,
        '1000000', // 1 USDC
        'testnet'
    );
    console.log({
        transaction
    })
}

bridgeFromEthToArb().then(() => console.log("done"))