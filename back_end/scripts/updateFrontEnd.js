'use strict';

const fs = require('fs');
const path = require('path');

function updateFrontEnd() {
    // Path configured to be executed with `npx hardhat run scripts/deploy.js` from the `back_end/` dir
    const sourcePath = './artifacts/contracts/WavePortal.sol/WavePortal.json';
    const destPath = '../front_end/src/contracts/WavePortal.json';
    
    let deployedJSON = JSON.parse(fs.readFileSync(sourcePath));
    let data = JSON.stringify(deployedJSON);
    fs.writeFileSync(destPath, data);
}

module.exports = { updateFrontEnd };
