const { updateFrontEnd } = require('./updateFrontEnd');

async function main() {
	const [deployer] = await hre.ethers.getSigners();
	console.log("Deploying contracts with the account:", deployer.address);

	const balance = await deployer.getBalance();
	console.log("Account balance:", balance.toString());

	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
	const contractFunds = hre.ethers.utils.parseEther("1.1");
	const waveContract = await waveContractFactory.deploy({
		value: contractFunds,
	});
	await waveContract.deployed();

	console.log("WavePortal address:", waveContract.address);
}

main()
	.then(() => {
		updateFrontEnd();
		process.exit(0);
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
