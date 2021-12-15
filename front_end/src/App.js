import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";

export default function App() {
  
  const contractAddress = process.env.REACT_APP_WAVE_CONTRACT_ADDRESS;
  const contractABI = abi.abi;
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [waveCount, setWaveCount] = useState(0);
  const [message, setMessage] = useState("");
  

  const getAllWaves = async () => {
    const { ethereum } = window;
  
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const waves = await wavePortalContract.getAllWaves();
  
        const wavesCleaned = waves.map(wave => {
          return {
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          };
        });
  
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  /**
   * Listen in for emitter events!
   */
  useEffect(() => {
    let wavePortalContract;
  
    const onNewWave = (from, timestamp, message) => {
      console.log('NewWave', from, timestamp, message);
      setAllWaves(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };
  
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      wavePortalContract.on('NewWave', onNewWave);
    }
  
    return () => {
      if (wavePortalContract) {
        wavePortalContract.off('NewWave', onNewWave);
      }
    };
  }, [contractABI, contractAddress]);

  const checkIfWalletIsConnected = () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you're logged into your MetaMask wallet");
        return;
      } else {
        console.log("We have the ethereum object: ", ethereum);
      }

      ethereum.request({ method: 'eth_accounts' })
      .then(accounts => {
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account: ", account);
          setCurrentAccount(account);
        } else {
          console.log("No Authorized account found")
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      ethereum.request({ method: "eth_requestAccounts" })
      .then(accounts => {
        console.log("Connected: ", accounts[0]);
        setCurrentAccount(accounts[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractABI = abi.abi;
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let waveCount = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", waveCount.toNumber());

        const waveTxn = await wavePortalContract.wave("message", { gasLimit: 300000});
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        waveCount = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", waveCount.toNumber());
        setWaveCount(waveCount.toNumber())
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])


  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        My name is Matt and I worked in Web2, but I want the world to own their digital personas! Connect your Ethereum wallet and wave at me!
        <br /><br />
        This contract can be viewed here: https://rinkeby.etherscan.io/address/{contractAddress}
        
        </div>
        <br /><br />
        Current Number of waves: {waveCount}
        
        <form className="message" >
          <label>
            Add a message:
            <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)}/>
          </label>
        </form>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px"}}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
}
