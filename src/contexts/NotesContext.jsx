import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// import { createSampleNotes } from '../utils/create_sample_notes.js';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [notes, setNotes] = useState([]);
    const [encryptionKey, setEncryptionKey] = useState('');
    const [isContractInitialized, setIsContractInitialized] = useState(false);

    return (
        <NotesContext.Provider 
            value={{
                account, 
                setAccount, 
                notes, 
                setNotes, 
                encryptionKey, 
                setEncryptionKey, 
                isContractInitialized, 
                setIsContractInitialized
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};

NotesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
