import React from 'react';
import { useLocation }  from 'react-router-dom';

import { Layout } from 'antd';

import AppHeader from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import AppContent from '../layouts/Content';
import AppFooter from '../layouts/Footer';
import NoteCreatorModal from '../components/NoteCreatorModal';

const HomePage = () => {
  const location = useLocation();
  const { account } = location.state;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <AppHeader account={account} onLogout={() => {}} />
        <AppContent />
        <AppFooter />
        <NoteCreatorModal />
      </Layout>
    </Layout>
  );
};
export default HomePage;