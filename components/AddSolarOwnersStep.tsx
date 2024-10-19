import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface AddSolarOwnersStepProps {
  ownersCount: number;
  addressList: string[];
  fractionalPartList: number[];
  setAddressList: React.Dispatch<React.SetStateAction<string[]>>;
  setFractionalPartList: React.Dispatch<React.SetStateAction<number[]>>;
  onBack: () => void;
  onClose: () => void;
  onMintSolar: () => void;
}

const AddSolarOwnersStep: React.FC<AddSolarOwnersStepProps> = ({
  ownersCount,
  addressList,
  fractionalPartList,
  setAddressList,
  setFractionalPartList,
  onBack,
  onClose,
  onMintSolar,
}) => {
  const [minting, setMinting] = useState<boolean>(false);

  const handleBack = () => {
    onBack();
  };

  const handleMintSolar = async () => {
    setMinting(true);

    try {
      await onMintSolar();
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="overflow-y-auto h-full">
      {/* Close button */}
      <button
        className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={onClose}
        disabled={minting}
      >
        <FaTimes />
      </button>
      {/* Content */}
      <h2 className="text-xl font-bold mb-2">Add Solar Owners</h2>
      {/* Add Solar address and fraction part fields for ownersCount using loop */}
      {[...Array(ownersCount)].map((_, index) => (
        <div key={index} className="mb-6">
          <div className='font-bold'>Owner {index + 1}</div>
          <div className="mb-4">
            <label htmlFor={`address-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Address:
            </label>
            <input
              type="text"
              id={`address-${index}`}
              className="w-full border border-gray-300 p-2"
              value={addressList[index] || ''}
              onChange={(e) => {
                const updatedList = [...addressList];
                updatedList[index] = e.target.value;
                setAddressList(updatedList);
              }}
              disabled={minting}
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`fractionalPart-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Fractional Share (%):
            </label>
            <input
              type="number"
              id={`fractionalPart-${index}`}
              className="w-full border border-gray-300 p-2"
              value={fractionalPartList[index] || ''}
              onChange={(e) => {
                const updatedList = [...fractionalPartList];
                updatedList[index] = Number(e.target.value);
                setFractionalPartList(updatedList);
              }}
              disabled={minting}
            />
          </div>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue mr-2"
        onClick={handleBack}
        disabled={minting}
      >
        Back
      </button>
      <button
        className={`bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline-green mb-10 ${
          minting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleMintSolar}
        disabled={minting}
      >
        {minting ? 'Minting...' : 'Mint Solar'}
      </button>
    </div>
  );
};

export default AddSolarOwnersStep;
