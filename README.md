

---

## FractionalSolar DApp

Overview
The Fractional Solar DApp is a decentralized platform designed for solar farm owners to tokenize and register their solar energy generation capacity as fractionalized NFTs. These NFTs represent ownership shares in the solar energy produced by a farm. Investors can purchase fractional shares of the solar NFTs, creating a transparent and decentralized market for renewable energy investment.

The platform allows solar farm owners to:
- Mint fractionalized NFTs representing a share of their solar farm.
- Manage the transfer of fractional ownership between users.
- Provide a transparent way to track and trade fractional solar energy ownership.

This decentralized application is built on the **Arbitrum Sepolia testnet** and governed by smart contracts that ensure transparency and automation in the issuance, ownership, and transfer of these solar energy NFTs.

---

## Problem Statement
There is a growing demand for renewable energy investments, but the market is often restricted to large-scale investors or centralized systems that lack transparency. Small-scale investors and individuals interested in renewable energy are often excluded from directly participating in these markets. 

Additionally, current energy markets do not fully utilize decentralized technologies, which can provide more secure, transparent, and efficient systems for energy production and consumption.

---

## Solution
The Fractional Solar DApp solves these issues by enabling fractional ownership of solar energy through blockchain technology. Solar farm owners can mint NFTs that represent shares of their solar energy production. These NFTs are fractionalized, allowing multiple owners to hold a stake in the solar farm’s energy generation. 

The platform automates and governs all processes through smart contracts:
- Solar NFT Minting: Solar farm owners register and tokenize their solar farms into NFTs.
- Fractional Ownership: Multiple users can own fractional parts of a single solar NFT.
- P2P Trading: Fractional solar NFTs can be traded or transferred between users seamlessly.
- Transparency & Security: All transactions are recorded on the blockchain, ensuring transparency and reducing the need for intermediaries.

---

## Current Status
The Fractional Solar DApp has been deployed on the **Arbitrum Sepolia testnet**, and the following features have been implemented:
- Solar NFT Registration: Solar farm owners can register their solar farms as NFTs and assign fractional ownership shares.
- Ownership Transfer: Users can transfer their fractional ownership of solar NFTs to other users.
- Fractional Ownership Tracking: Investors can view the solar NFTs they own, along with their fractional share of each solar project.
- Burning Ownership: Solar farm owners can revoke fractional ownership if necessary.

---

## Smart Contract Overview
The core functionality of the Fractional Solar DApp is powered by the `SolarRegistration` smart contract, written in Solidity. Here’s a brief overview of the contract's key features:

- Minting Solar NFTs: Solar farm owners mint NFTs that represent their farm’s energy generation capacity. They can assign multiple owners to fractionalized shares of these NFTs.
- Fractional Ownership Management: Each NFT can have multiple fractional owners, tracked through a mapping system.
- Ownership Transfer: Users can transfer fractional ownership to other users through a secure function that updates both the sender's and recipient's ownership records.
- Burning Ownership: Owners can burn or revoke fractional ownership shares, updating the overall ownership structure of the NFT.



## How to Use the DApp
1. Mint Solar NFTs: Solar farm owners can mint new solar NFTs, providing the names, descriptions, and the fractional ownership distribution.
2. Transfer Ownership: Users can transfer fractional ownership to other addresses through the platform’s user interface or directly through the smart contract.
3. View Fractional Ownership: Users can view their current ownership stakes and details about the solar NFTs they own.

---

## Future Enhancements
- Energy Production Tracking: Integrating IoT devices to track real-time energy production and linking it to NFTs for automatic updates.
- DeFi Integration: Allowing users to use their fractional solar NFTs as collateral in decentralized finance (DeFi) platforms.
- Cross-Chain Compatibility: Enabling cross-chain transfers and trading of solar NFTs on other blockchains like Ethereum and Tezos.



## Live Demo

Watch the [live demo on Vimeo](https://vimeo.com/1021342143#t=0).


Watch the [live demo on YouTube](https://youtu.be/qRMcwQ4q_Es).



## Steps to Test the Fractional Solar DApp

To run the DApp locally and test its functionality, follow the steps below:

1. Clone the Repository
   
   Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

2. Deploy the Smart Contract

   - Deploy the `SolarRegistration.sol` contract on the Arbitrum Sepolia Testnet.
   - After successful deployment, copy the contract address for the next step.

3. Update Contract Address

   - Open the `UTILS/Constant.tsx` file in your project directory.
   - Replace the existing contract address with the one from your deployment.
   - Similarly, update the owner address(put your address) in the `Components/HOME.tsx` file.

4. Install Dependencies

   Run the following command to install all necessary dependencies:
   ```bash
   npm install
   ```

5. Start the Development Server

   To run the DApp locally, use the following command:
   ```bash
   npm run dev
   ```

6. Access the DApp

   Open your browser and navigate to `http://localhost:3000` to access the DApp.




