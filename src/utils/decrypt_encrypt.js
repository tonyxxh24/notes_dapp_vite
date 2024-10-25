import { isHexString } from 'ethers';
import CryptoJS from 'crypto-js';
import pako from 'pako';
export function encryptNoteData(noteJsonString, key) {
  try {
    // Convert string to Uint8Array using TextEncoder (browser-friendly alternative to Buffer)
    const encoder = new TextEncoder();
    const jsonBuffer = encoder.encode(noteJsonString); // Converts to Uint8Array

    // Compress the buffer using pako (browser-compatible zlib alternative)
    const compressedBuffer = pako.deflate(jsonBuffer);
    // console.log('compressedBuffer:', compressedBuffer);

    // Convert the compressed buffer to CryptoJS WordArray
    const compressed_wordArray = CryptoJS.lib.WordArray.create(compressedBuffer);
    // console.log('compressed_wordArray:', compressed_wordArray);

    // Encrypt the WordArray using AES encryption
    const encrypted_cipher_object = CryptoJS.AES.encrypt(compressed_wordArray, key);
    // console.log('encrypted cipher object:', encrypted_cipher_object);

    // Convert the encrypted object to Base64 string
    const encryptedBase64 = encrypted_cipher_object.toString();
    // console.log('encryptedBase64:', encryptedBase64);

    // Convert the Base64 string to a hex string
    const encryptedHex = '0x' + CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(encryptedBase64));
    // console.log('encryptedHex:', encryptedHex);
    
    // Validate the hex string
    if (!isHexString(encryptedHex)) {
        throw new Error('Invalid hex string');
    }

    console.log('Compressed and encrypted.');
    
    return encryptedHex;
  } catch (err) {
      console.error('Encryption Error:', err);
      return null;
  }
}

export function decryptNoteData(encryptedHex, key) {
  try {
    // Remove '0x' from the hex string if present
    const cleanHexString = encryptedHex.startsWith('0x') ? encryptedHex.slice(2) : encryptedHex;

    // Convert the hex string to a Base64 string using CryptoJS
    const receivedBase64String = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(cleanHexString));
    // console.log('receivedBase64String:', receivedBase64String);

    // Decrypt the Base64 string using AES decryption
    const decrypted_wordArray = CryptoJS.AES.decrypt(receivedBase64String, key);
    // console.log('decrypted wordArray:', decrypted_wordArray);

    // Convert the decrypted WordArray back to a Uint8Array (decompressed buffer)
    const decryptedBuffer = new Uint8Array(decrypted_wordArray.sigBytes);
    for (let i = 0; i < decrypted_wordArray.sigBytes; i++) {
      decryptedBuffer[i] = (decrypted_wordArray.words[i >>> 2] >>> ((3 - (i % 4)) * 8)) & 0xff;
    }
    // console.log('decryptedBuffer:', decryptedBuffer);

    // Decompress the buffer using pako
    const decompressedBuffer = pako.inflate(decryptedBuffer);
    // console.log('Decompressed:', decompressedBuffer);

    // Convert the decompressed buffer to a string using TextDecoder
    const decoder = new TextDecoder();
    const decompressedString = decoder.decode(decompressedBuffer);
    // console.log('Decompressed String:', decompressedString);

    console.log('Decrypted and decompressed.');

    return decompressedString;
  } catch (err) {
      console.error('Decryption Error:', err);
      return encryptedHex;
  }
}