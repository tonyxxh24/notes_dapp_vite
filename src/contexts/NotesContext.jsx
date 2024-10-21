import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [notes, setNotes] = useState([]);

    useEffect (() => { 
        setNotes([
            {
                title: '1st Note',
                content: 'This is the content of the note.',
            },
            {
                title: '2nd Note',
                content: 'This is the content of the note.',
            },
            {
                title: '3nd Note',
                content: 'This is the content of the note.',
            },
            {
                title: '4th Note',
                content: 'This is the content of the note.',
            },
            {
                title: '5th Note',
                content: 'This is the content of the note.',
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
