import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Web3 from 'web3';
import SolarCard from './SolarCard';
import AddSolarModal from './AddSolarModal'; // Import the new modal component
import { abi, contractAddress } from '../utils/constants';
import { set } from 'zod';
import { toast } from 'react-toastify';

const Home: React.FC<{ address: string }> = ({ address }) => {
  const [Solars, setSolars] = useState<any[]>([]);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewerAddress, setViewerAddress] = useState<string>('');
  const [showAddSolarModal, setShowAddSolarModal] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ownersCount, setOwnersCount] = useState<number>(0);
  const [addressList, setAddressList] = useState<string[]>([]);
  const [fractionalPartList, setFractionalPartList] = useState<number[]>([]);

  const ownerAddress = '0x2d71c1B9BB603a735bf8a8247da890ce26567B1f';
  const isOwner = address === ownerAddress;

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if ((window as any).ethereum) {
          const web3Instance = new Web3((window as any).ethereum);
          setWeb3(web3Instance);
          const contract = new web3Instance.eth.Contract(abi, contractAddress);
          const accounts = await web3Instance.eth.getAccounts();
          setViewerAddress(accounts[0]);
          const result = (await contract.methods.getDetailedFractionOwnership().call({ from: accounts[0] })) as any;
          setSolars(result);
        } else {
          console.error('Web3 provider not detected');
        }
      } catch (error) {
        console.error('Error initializing Web3:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    initWeb3();
  }, []);

  const handleAddSolar = () => {
    setShowAddSolarModal(true);
  };

  const handleCloseAddSolarModal = () => {
    setName('');
    setDescription('');
    setOwnersCount(0);
    setAddressList([]);
    setFractionalPartList([]);
    setShowAddSolarModal(false);
  };
  const handleMintSolar = async () => {
      try {
        // Validate owners count
        if (ownersCount < 1) {
          toast.error('Owners count should be at least 1');
          return;
        }
        if(fractionalPartList.length !== ownersCount){
          toast.error('Please enter fractional parts for all owners');
          return;
        }

        if(addressList.length !== ownersCount){
          toast.error('Please enter addresses for all owners');
          return;
        }
    
        // Validate sum of fractional parts
        const sum = fractionalPartList.reduce((acc, curr) => acc + curr, 0);
        if (sum !== 100) {
          toast.error('Sum of fractional parts should be 100');
          return;
        }

        toast.info('Minting Solar... Please wait.');
    
        // Convert fractional parts to percentages (multiply by 100)
        const fractionalPartsInPercentage = fractionalPartList.map((fraction) => fraction * 100);
    
        const web3Instance = new Web3((window as any).ethereum);
    
        // Request account access if not available
        await (window as any).ethereum.enable();
    
        const contract = new web3Instance.eth.Contract(abi, contractAddress);
        
    
        // Create a transaction to call the mintSolar function in the contract
        const data = contract.methods.mint( addressList, fractionalPartsInPercentage, name, description).encodeABI();
        
        const transactionObject = {
          from: viewerAddress, // Specify the sender (msg.sender) address
          to: contractAddress, // Contract address
          data, // Transaction data
        };

        // Send the transaction
        const transactionReceipt = await web3Instance.eth.sendTransaction(transactionObject);
       
    
        // Check the transaction receipt for success
        if (transactionReceipt.status) {
          toast.success('Solar minted successfully!');
          handleCloseAddSolarModal();
          // You may want to refresh the Solars data after minting a new Solar
          // Call the necessary functions to refresh Solars data here if needed
        } else {
          toast.error('Minting Solar failed. Please check the transaction status.');
        }
      } catch (error) {
        console.error('Minting Solar failed:', error);
        toast.error('Minting Solar failed. Please check the console for error details.');
      }
    };
  

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between p-4 w-full">
      <header className="bg-black">
  <nav className="flex justify-between items-center p-4">
    <div>
      <p className="text-xl text-white" style={{ fontWeight: 'bold' }}>
        FractionalSolar
      </p>
    </div>
    <div className="hidden md:block"> {/* Hide on small screens */}
      <ul className="flex items-center gap-4">
        <li className='text-white'> User <span style={{ fontWeight: 'bold' }}>{address}</span></li>
      </ul>
    </div>
    <div className="md:hidden"> {/* Show on small screens */}
      {isOwner && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
          onClick={handleAddSolar}
        >
          <FaPlus className="mr-2" />
          Mint Solar
        </button>
      )}
    </div>
  </nav>
</header>

  
  {isOwner && (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
      onClick={handleAddSolar}
    >
      <FaPlus className="mr-2" />
      Mint Solar
    </button>
  )}
</div>


      {loading ? (
        <p className="text-center" style={{ fontWeight: 'bold' }}>
          Loading Solars NFTs...
        </p>
      ) : Solars.length === 0 ? (
        <p className="text-center " style={{ fontWeight: 'bold' }}>
          No Solar NFTs found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {Solars.map((Solar: any) => (
            <SolarCard
              key={Solar[0]} // Add a unique key for each SolarCard
              SolarId={Solar[0]}
              name={Solar[1]}
              description={Solar[2]}
              viewerAddress={viewerAddress}
              addresses={Solar[3]}
              sharePercentages={Solar[4]}
            />
          ))}
        </div>
      )}

      {showAddSolarModal && (
        <AddSolarModal
          name={name}
          description={description}
          ownersCount={ownersCount}
          addressList={addressList}
          fractionalPartList={fractionalPartList}
          setName={setName}
          setDescription={setDescription}
          setOwnersCount={setOwnersCount}
          setAddressList={setAddressList}
          setFractionalPartList={setFractionalPartList}
          onClose={handleCloseAddSolarModal}
          onMintSolar={handleMintSolar}
        />
      )}
    </div>
  );
};

export default Home;
