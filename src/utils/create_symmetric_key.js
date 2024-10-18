import { Wallet } from 'ethers';

// Create a new random wallet
const wallet = Wallet.createRandom();

// Get the private key
const privateKey = wallet.privateKey;
console.log('Your symmetric key for Encryption / Decryption:', privateKey);
console.log('Created by ethers.Wallet.createRandom()');

// // Optionally, get the public key and address
// const publicKey = wallet.publicKey;
// const address = wallet.address;

// console.log('Public Key:', publicKey);
// console.log('Address:', address);
