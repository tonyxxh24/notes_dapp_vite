// src/ethers.js
import { BrowserProvider, Contract } from "ethers";
import Notes from "../contracts/Notes.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
let provider;
let notesContract;

export const initializeProvider = async () => {
  if (window.ethereum) {

    // Request account access if needed
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Create a provider using the BrowserProvider
    provider = new BrowserProvider(window.ethereum);

    const blockNumber = await provider.getBlockNumber();
    console.log("Connected to network. Latest block number:", blockNumber);
    
    return provider;
  } else {
    console.error("Ethereum object not found in window.");
  }
};

export const getNotesContract = async (provider) => {
  try {
    // Get the signer
    const signer = await provider.getSigner();

    // Replace with your contract's deployed address
    notesContract = new Contract(
      contractAddress,
      Notes.abi,
      signer
    );

    return { notesContract };
  } catch (error) {
    console.error("Error connecting to the network. Make sure the Hardhat node is running:", error);
    return { notesContract: undefined };
  } 
};



export { notesContract };