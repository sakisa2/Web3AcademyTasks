# Lido Staking dApp (Sepolia Testnet)

This application allows users to stake ETH via the Lido protocol, display their stETH balance, and provides an explanation of the unstake process (currently emulated). The app uses **Lido smart contracts on the Sepolia testnet**.

## Features

- Connects to Metamask wallet
-  Stake 0.1 ETH via the `Lido.submit()` function
-  Displays the user's current `stETH` balance
-  Provides an explanation of the unstake process via a modal (simulation)
-  Tested on the Sepolia testnet

## Technologies

- React 
- Ethers.js v6
- Metamask
- Sepolia testnet
- Lido contracts

# Lido Unstake Explanation
Currently, Lido on the mainnet doesn't support direct unstaking of ETH. When users want to withdraw their ETH, they can use:

withdrawal requests (currently in the process of being rolled out)

peer-to-peer markets such as Curve/1inch to sell stETH for ETH

In this dApp simulation, clicking the “Unstake” button will display an alert with an explanation instead of performing a real transaction

Author:

Sandra Petrovic




