// components/SolarCard.tsx
import React, { useState } from 'react';
import SolarDetailModal from './SolarDetailModal';
import TransferSolarModal from './TransferLSolarModal';
import {abi, contractAddress} from '../utils/constants';
import Web3 from 'web3';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface SolarCardProps {
  SolarId: string;
  name: string;
  description: string;
  viewerAddress: string;
  addresses: string[];
  sharePercentages: number[];
}

const SolarCard: React.FC<SolarCardProps> = ({SolarId,  name, description, viewerAddress, addresses, sharePercentages }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const calculateSharePercentage = () => {
    let index = addresses.indexOf(viewerAddress);
    return ((sharePercentages[index]).toString()).slice(0, 2) + "." + ((sharePercentages[index]).toString()).slice(2) + '%';
  }

  const handleMoreInfoClick = () => {
    setShowDetail(true);
  }

  const handleCloseDetail = () => {
    setShowDetail(false);
  }

  const handleTransferClick = () => {
    setShowTransferModal(true);
  }

  const handleCloseTransferModal = () => {
    setShowTransferModal(false);
  }

  const handleTransfer = async (to: string, amount: number) => {
    try {
      let index = addresses.indexOf(viewerAddress);
      let share = sharePercentages[index];
      amount = amount * 100;
  
      if (amount > share) {
        toast.error('You cannot transfer more than your share.');
        return;
      }
  
      const web3Instance = new Web3((window as any).ethereum);
  
      // Request account access if not available
      await (window as any).ethereum.enable();
  
      const contract = new web3Instance.eth.Contract(abi, contractAddress);
  
      // Create transaction data
      const data = contract.methods.transferFractionalOwnership(to, SolarId, amount).encodeABI();
  
      // Send the transaction
      const transactionObject = {
        from: viewerAddress, // Specify the sender (msg.sender) address
        to: contractAddress,
        gas: 200000, // adjust gas limit accordingly
        data,
      };
  
      const transactionReceipt = await web3Instance.eth.sendTransaction(transactionObject);
  
      // Check the transaction receipt for success
      if (transactionReceipt.status) {
        toast.success('Transfer successful!');
      } else {
        toast.error('Transfer failed.');
      }
    } catch (error) {
      toast.error('Error transferring Solar. Please try again.');
    }
  };
  

  return (
    <div className="bg-black p-6 rounded-lg shadow-[0_0_8px_theme('colors.purple.400')] w-full max-w-md mx-auto mb-8 overflow-hidden">
      <h2 className="text-xl text-white font-bold mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {name}
      </h2>
      <p className="text-gray-500 mb-4 overflow-hidden overflow-ellipsis">
        {description}
      </p>
      <p className="text-sm text-gray-400 mb-4">Share Percentage: {calculateSharePercentage()}</p>
      <div className="flex space-x-4">
        <button 
          className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700 focus:outline-none focus:shadow-outline-blue"
          onClick={handleTransferClick}
        >
          Transfer Solar
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
          onClick={handleMoreInfoClick}
        >
          More Info
        </button>
      </div>
      {showDetail && (
        <SolarDetailModal
          name={name}
          description={description}
          viewerAddress={viewerAddress}
          addresses={addresses}
          sharePercentages={sharePercentages}
          onClose={handleCloseDetail}
        />
      )}
      {showTransferModal && (
        <TransferSolarModal
          SolarId={Number(SolarId)}
          onClose={handleCloseTransferModal}
          onTransfer={handleTransfer}
        />
      )}
    </div>
  );
};

export default SolarCard;
