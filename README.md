# Web3 Wave

Send me a hello through the blockchain!

This is my project for the course [Build a Web3 App with Solidity + Ethereum Smart Contracts](https://buildspace.so/solidity) at [Buildspace](https://buildspace.so/).

NFT for completeing this course [Link to NFT]()

## Prerequisites

- Node.js v14+
- MetaMask browser extension, set to the Rinkeby Network


## Running the Frontend

Follow the steps below to run the frontend locally:

- cd into `front_end`
- Install dependencies: `yarn install`
- Run the application locally: `yarn start`
- Access the application at http://localhost:3000/

## Running the Backend

Follow the steps below to deploy the backend:

- cd into `back_end`
- Install dependencies: `npm install`
- List test accounts from your local hardhat node: `npx hardhat accounts`
- Compile smart contracts: `npx hardhat compile`
- Test contract: `npx hardhat run scripts/run.js`

### Local deployment

- Start your local hardhat node: `npx hardhat node`
- Deploy contract to local hardhat node: `npx hardhat run scripts/deploy.js --network localhost`

### Testnet deployment

- Deploy contract to rinkeby testnet: `npx hardhat run scripts/deploy.js --network rinkeby`

The above script will deploy your contract to the rinkeby testnet, however to interact with your contract in your app you'll need to copy the deployed `WavePortal` contract address to your `front_end/.env` file.

Terminal output for the above command should look something like this:

```
Compiling 1 file with 0.8.4
Compilation finished successfully
Deploying contracts with the account: 0xdF1D45cD1D2Ef4FD42C64a18E09563b0dcD6d591
Account balance: 8835324875309980186
WavePortal address: 0x6c753E676DEf417623C135aABc9Fd01C282CbD42
```

Also, FYI, there is a function call in `deploy.js` that copies the json representation of the contract from the backend to the frontend. You should not need to copy that json file manually, but you could if you wanted to.