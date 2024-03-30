import Web3 from 'web3';

export function getWeb3HttpInstance(httpUrl?: string){
    if(!httpUrl){
        return null;
    }
    const web3 = new Web3();
    web3.setProvider(new Web3.providers.HttpProvider(httpUrl))
    return web3;
}

export function getWeb3WsInstance(wsUrl: string){
    const web3 = new Web3();
    web3.setProvider(new Web3.providers.WebsocketProvider(wsUrl))
    return web3;
}