import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [notes, setNotes] = useState([]);

    useEffect (() => { 
        setNotes([
            {
                id: 1,
                content: { 
                    title: '1st Note',
                    text: 'This is the content of the note.'
                }
            },
            {
                id: 3,
                content: { 
                    title: '32st Note',
                    text: 'This is the content of the note.'
                }
            },
            {
                id: 5,
                content: { 
                    title: '523rst Note',
                    text: 'This is the content of the note.'
                }
            },
            {
                id: 7,
                content: { 
                    title: '73r2st Note',
                    text: 'This is the content of the note.'
                }
            },
            {
                id: 9,
                content: { 
                    title: '13rst Note',
                    text: 'This is the content of the note.'
                }
            },
        ]);
    }, [account]);

    return (
        <NotesContext.Provider value={{account, setAccount, notes, setNotes}}>
            {children}
        </NotesContext.Provider>
    );
};

NotesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
