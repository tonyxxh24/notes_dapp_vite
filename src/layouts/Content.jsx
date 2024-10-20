import { useRef, useState, useContext, useEffect } from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Col, Row, Input, Button } from 'antd';

import NoteCard from '../components/NoteCard';
import NoteCreatorModal from '../components/NoteCreatorModal';
import { NotesContext } from '../contexts/NotesContext';

const { Content } = Layout;
const AppContent = () => {
    const [encryptionKey, setEncryptionKey] = useState('');
    const inputRef = useRef(null);
    const { notes, setNotes } = useContext(NotesContext);

    useEffect(() => { 
      
    }, []);

    const handleKeySubmit = () => {
      if(inputRef.current)
        setEncryptionKey(inputRef.current.input.value);
    }

    const handleResetKey = () => {
      setEncryptionKey('');
    }

    return (   
        <Content className="p-4">
          <div className="flex justify-between">
            <Breadcrumb 
              className="mb-4"
              items={[
                {
                  title: 'Home',
                },
              ]}
            />
            <Button color="danger" variant="outlined" onClick={handleResetKey}>Reset Key</Button>
          </div>
          {!encryptionKey ? (
            <div className="w-full h-full bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col justify-center items-center">
              <label className="text-lg font-semibold mb-2" htmlFor="encryptionKey">Your Encryption key</label>
              <div>
                <Input ref={inputRef} id="encryptionKey" className="w-64 mr-2" placeholder="Enter your encryption key" />
                <Button color="default" variant="solid" onClick={handleKeySubmit}>Submit</Button>
              </div>
            </div>
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {notes.map((note, index) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={index}>
                    <NoteCard noteData={note} />
                  </Col>
                ))}
              </Row>

              <NoteCreatorModal />
            </>
          )}
        </Content>
    );
};

export default AppContent;