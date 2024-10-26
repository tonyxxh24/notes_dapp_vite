import { useEffect, useContext } from 'react';

import { Layout } from 'antd';

import AppHeader from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import AppContent from '../layouts/Content';
import AppFooter from '../layouts/Footer';
import { NotesContext } from '../contexts/NotesContext';
import { initProvider, initNotesContract } from '../services/notesServices';


const HomePage = () => {
  const { account, setAccount, setIsContractInitialized, setEncryptionKey } = useContext(NotesContext);

  useEffect(() => {
    const init = async () => {
      setEncryptionKey('');
      setIsContractInitialized(false);
      await initProvider();
      await initNotesContract(handleContractEvent);
      setIsContractInitialized(true);
    }
    init();

    const handleContractEvent = (message) => {
      alert(message);
    };

  }, [account, setEncryptionKey, setIsContractInitialized]);

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        console.log("Wallet locked or no accounts connected.");
        window.location.reload();
      } else {
        console.log("Accounts available:", accounts);
        // Get the first account from the updated list of accounts
        setAccount(accounts[0]);
        console.log("Switched to account:", accounts[0]);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

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