import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';

function App() {
  const [address, setAddress] = useState(null);
  const [stETHBalance, setStETHBalance] = useState(null);

  const STETH_CONTRACT_ADDRESS = '0x3e3FE7dBc6B4C189E7128855dD526361c49b40Af';
  // stETH contract address on Sepolia testnet

  const STETH_ABI = useMemo(() => [
    "function balanceOf(address owner) view returns (uint256)"
  ], []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAddress(accounts[0]);
      } catch (err) {
        console.error("Error while connecting:", err);
      }
    } else {
      alert("Please install the Metamask extension to connect your wallet.");
    }
  };

  const fetchStETHBalance = useCallback(async () => {
    if (address) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(STETH_CONTRACT_ADDRESS, STETH_ABI, provider);
        const balance = await contract.balanceOf(address);
        setStETHBalance(ethers.formatUnits(balance, 18));
      } catch (err) {
        console.error("Error fetching stETH balance:", err);
      }
    }
  }, [address, STETH_ABI]);

  const stakeETH = async () => {
    if (!window.ethereum || !address) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const lidoContractAddress = "0x3e3FE7dBc6B4C189E7128855dD526361c49b40Af";
    const lidoAbi = [
      "function submit(address _referral) public payable returns (uint256)"
    ];

    const lidoContract = new ethers.Contract(lidoContractAddress, lidoAbi, signer);

    try {
      const tx = await lidoContract.submit(
        ethers.ZeroAddress,
        { value: ethers.parseEther("0.1") }
      );
      await tx.wait();
      alert("Staking successful!");
      fetchStETHBalance();
    } catch (error) {
      console.error("Staking failed:", error);
      alert("Staking failed. See console for details.");
    }
  };

  //Unstake simulation - explanantion
  const handleUnstake = () => {
    alert(`Unstaking stETH back to ETH is not yet directly available via Lido on Sepolia.

To exit stETH position on mainnet, users typically:
- Swap stETH to ETH on DEXs like Curve or 1inch,
- Or use Lido's native unstake once it's live.

This dApp only simulates the process for demonstration purposes.`);
  };

  useEffect(() => {
    if (address) {
      fetchStETHBalance();
    }
  }, [address, fetchStETHBalance]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Lido Staking dApp</h1>
      {address ? (
        <div>
          <p>Connected address: {address}</p>
          <p>stETH balance: {stETHBalance ? `${stETHBalance} stETH` : "Loading..."}</p>
          <button onClick={stakeETH} style={{ marginTop: '1rem', marginRight: '1rem' }}>
            Stake 0.1 ETH via Lido
          </button>
          <button onClick={handleUnstake} style={{ marginTop: '1rem' }}>
            Unstake (Simulate)
          </button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect your Wallet</button>
      )}
    </div>
  );
}

export default App;
