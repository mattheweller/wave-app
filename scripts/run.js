const main = async () => {
    const owner = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed to: ", owner.address);

    let waveCount = await waveContract.getTotalWaves();
    let accounts = await hre.ethers.getSigners();

    for (let i = 0; i < accounts.length; i++) {
        let randWaveTxn = await waveContract.connect(accounts[i]).wave();
        await randWaveTxn.wait();
    }

    waveCount = await waveContract.getTotalWaves();
    const asedf = () => {
      
    }
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();