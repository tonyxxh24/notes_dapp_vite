import { useEffect, useContext } from 'react';

import { Layout } from 'antd';

import AppHeader from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import AppContent from '../layouts/Content';
import AppFooter from '../layouts/Footer';
import { NotesContext } from '../contexts/NotesContext';
import { initProvider, initNotesContract } from '../services/notesServices';


const HomePage = () => {
  const { setAccount } = useContext(NotesContext);

  useEffect(() => {
    const initialize = async () => {
      await initProvider();
      // await initNotesContract(handleContractEvent);

      // Wallet account change (locking the wallet also triggers this)
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    
    initialize();
    
    async function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        console.log("Wallet locked or no accounts connected.");
        window.location.reload();
      } else {
        console.log("Accounts available:", accounts);
        // Get the first account from the updated list of accounts
        setAccount(accounts[0]);
        console.log("Switched to account:", accounts[0]);
        
        // Get new contract instance
        // await initNotesContract(handleContractEvent);
      }
    }

    const handleContractEvent = (message) => {
      alert(message);
    };
    
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [setAccount]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </Layout>
    </Layout>
  );
};
export default HomePage;