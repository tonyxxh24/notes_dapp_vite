import { encryptNoteData } from "./decrypt_encrypt.js";

const key = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const note_samples = [
        {
            id: 1,
            content: {
                title: '1st Note',
                text: 'This is the content of the note.'
            }
        },
        {
            id: 2,
            content: {
                title: '2nd Note',
                text: 'Here is some additional content for the second note.'
            }
        },
        {
            id: 3,
            content: {
                title: '3rd Note',
                text: 'This note discusses various interesting topics.'
            }
        },
        {
            id: 4,
            content: {
                title: '4th Note',
                text: 'This is another note with different content inside.'
            }
        },
        {
            id: 5,
            content: {
                title: '5th Note',
                text: 'Here we have a note with yet more unique content.'
            }
        },
        {
            id: 6,
            content: {
                title: '6th Note',
                text: 'Exploring ideas in this sixth note, filled with content.'
            }
        },
        {
            id: 7,
            content: {
                title: '7th Note',
                text: 'Seventh note has some extra information and ideas.'
            }
        },
        {
            id: 8,
            content: {
                title: '8th Note',
                text: 'Content here might explore new concepts or ideas.'
            }
        },
        {
            id: 9,
            content: {
                title: '9th Note',
                text: 'This note goes into depth about certain subjects.'
            }
        },
        {
            id: 10,
            content: {
                title: '10th Note',
                text: 'A final example of a note with some concluding thoughts.'
            }
        }
    ];

export const createSampleNotes = (key) => {
    const encryptedNotes = note_samples.map(note => ({id: note.id, content: encryptNoteData(JSON.stringify(note.content), key)}));
    return encryptedNotes;
}

const encryptedSamples = createSampleNotes(key);
console.log(encryptedSamples);

