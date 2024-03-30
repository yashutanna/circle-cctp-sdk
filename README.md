# circle-cctp-sdk

## getting started
1) Rename `.env-sample` to `.env` and add RPC Urls for the chains you wish to interact with
2) Run
```
    yarn install
    yarn run example
```

The example will bridge 1 USDC from Avalanche to Ethereum using Circle's Cross Chain Transfer Protocol (CCTP): 
* Approving 1 USDC to be burnt by the TokenMessagerContract CCTP contract
* Burning 1 USDC on the Avalanche Chain
* Pinging Circle every second for an attestation for the Burning of 1 USDC
* Minting 1 USDC on Ethereum using the burn transaction's message and attestation from Circle