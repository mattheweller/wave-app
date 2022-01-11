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
