import { createSampleNotes } from '../utils/create_sample_notes.js';
import { decryptNoteData } from './decrypt_encrypt.js';


const key1 = '0x0123456789abcdef';
const key2 = '0xabcdef0123456789';
const encryptedSamples1 = createSampleNotes(key1);

const decryptedNotes = encryptedSamples1.map(note => ({...note, content: decryptNoteData(note.content, key1)}));
console.log(decryptedNotes);

const decryptedNotes2 = encryptedSamples1.map(note => ({...note, content: decryptNoteData(note.content, key2)}));
console.log(decryptedNotes2);