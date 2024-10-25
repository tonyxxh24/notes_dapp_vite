// src/ethers.js
import { BrowserProvider, Contract } from "ethers";
import Notes from "../contracts/Notes.json";
import { decryptNoteData, encryptNoteData } from "../utils/decrypt_encrypt";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
let provider = null;
let notesContract = null;

const initProvider = async () => {
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

const getProvider = () => {
  if(provider) {
    return provider;
  } else {
    throw new Error("Provider is null or undefined. Please pass a valid provider.");
  }
};

const initNotesContract = async (onEventCallback) => {
  try {
    // Remove listeners from the old contract instance if it exists
    if (notesContract) {
      notesContract.removeAllListeners();  // Clean up old listeners
      notesContract = null;                // Dereference the old instance
    }

    // Check if the provider is valid
    if (!provider) {
      throw new Error("Provider is null or undefined. Please pass a valid provider.");
    }

    // Create a new contract instance
    // Get the signer
    const signer = await provider.getSigner();

    // Replace with your contract's deployed address
    notesContract = new Contract(
      contractAddress,
      Notes.abi,
      signer
    );

    notesContract.on("NoteCreated", (id, owner) => {
      console.log(`NoteCreated Event: NoteId=${id}, owner=${owner.toString()}`);
      onEventCallback(`NoteCreated Event: NoteId=${id}, owner=${owner.toString()}`);
    });
    notesContract.on("NoteUpdated", (id) => { 
      console.log(`NoteUpdated Event: NoteId=${id}`);
      onEventCallback(`NoteUpdated Event: NoteId=${id}`);
    });
    notesContract.on("NoteDeleted", (id) => {
      console.log(`NoteDeleted Event: NoteId=${id}`);
      onEventCallback(`NoteDeleted Event: NoteId=${id}`);
    });

    return { notesContract };
  } catch (error) {
    console.error("Error connecting to the network. Make sure the Hardhat node is running:", error);
    return { notesContract: undefined };
  } 
};

const getNotesContract = () => {
  if(notesContract) {
    return notesContract;
  } else {
    console.error("NotesContract is null or undefined.");
  }
};


const getNoteIds = async () => {
  try {
    const notesList = await notesContract.getMyNotes();
    return notesList;
  } catch (error) {
    console.error("Error getting notes:", error);
    return [];
  }
};

const getEncryptedNotebyId = async (id) => {
  try {
    const encryptedContent = await notesContract.getNote(id);
    return encryptedContent; 
  } catch(error) {
    console.error("Error getting note by Id:", error);
    return "";
  }
};


const getDecryptedNotes = async (noteIds, key) => {
  try {
    const notes = await Promise.all(
      noteIds.map(async (id) =>{
        const encryptedNote = await getEncryptedNotebyId(id);
        const decryptedNote = decryptNoteData(encryptedNote, key);
        return { id: id.toString(), content: JSON.parse(decryptedNote)};
      })
    );
    return notes;
  } catch (error) { 
    console.error("Error getting decrypted notes:", error);
  }
};

const createNote = async (contentObject, key) => {
  try {
    const encryptedContent = encryptNoteData(JSON.stringify(contentObject), key);
    const tx = await notesContract.createNote(encryptedContent);
    await tx.wait();
  } catch (error) {
    console.error("Error creating note:", error);
  }
};

const deleteNote = async (id) => {  
  try {
    const tx = await notesContract.deleteNote(id);
    await tx.wait();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};


const updateNote = async (id, content, key) => {
  try {
    const encryptedContent = encryptNoteData(JSON.stringify(content), key);
    const tx = await notesContract.updateNote(id, encryptedContent);
    await tx.wait();
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

export { 
  initProvider,
  getProvider,
  initNotesContract,
  getNotesContract, 
  
  getNoteIds, 
  getEncryptedNotebyId,
  getDecryptedNotes,
  createNote,
  deleteNote,
  updateNote
};