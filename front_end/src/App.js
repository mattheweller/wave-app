import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";

export default function App() {
  
  const [currentAccount, setCurrentAccount] = useState("");
  const [value, setValue] = useState(0);

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
        const contractAddress = process.env.REACT_APP_WAVE_CONTRACT_ADDRESS;
        const contractABI = abi.abi;
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let waveCount = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", waveCount.toNumber());

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        waveCount = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", waveCount.toNumber());
        setValue(waveCount.toNumber())
        
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
        Current Number of waves: {value}
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
