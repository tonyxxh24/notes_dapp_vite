import { useContext, useEffect, useState } from 'react';
import { Card, Button, Dropdown } from 'antd';
import { EllipsisOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { NotesContext } from '../contexts/NotesContext';
import { decryptNoteData } from '../utils/decrypt_encrypt';
import { deleteNote } from '../services/notesServices';
const NoteCard = ({ note, setSelectedNote }) => {
    const { setNotes, encryptionKey } = useContext(NotesContext);
    const [ decryptedNote, setDecryptedNote ] = useState(note);

    useEffect(() => {
      try {
        // console.log(note.content);
        // console.log(encryptionKey);
        const contentString = decryptNoteData(note.content, encryptionKey);
        // console.log(contentString);
        setDecryptedNote({ ...note, content: JSON.parse(contentString)});
      } catch (e) {
        console.log('Error decrypting note:', e);
      } 
    }, [note, encryptionKey]);

    useEffect(() => {
      console.log(decryptedNote);
    }, [decryptedNote]);

    const handleOnClick = () => {
      setSelectedNote(decryptedNote);
    };

    const handleDelete = async (e) => {
      e.domEvent.stopPropagation(); // Stop event propagation to prevent card click
      const userConfirmed = confirm("Are you sure you wanna delete this note?");
      if(!userConfirmed) {
        return;
      }
      const result = await deleteNote(note.id);
      if(result) setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
    };

    // Dropdown menu items for the actions
    const menuItems = [
        {
          label: (
            <span style={{ color: '#1890ff' }}>
              <EditOutlined style={{ color: '#1890ff' }} /> Edit
            </span>
          ),
          key: 'edit',
          onClick: (e) => {
            e.domEvent.stopPropagation(); // Stop propagation from the edit button
            setSelectedNote(decryptedNote);
          },
        },
        {
          label: (
            <span style={{ color: 'red' }}>
              <DeleteOutlined style={{ color: 'red' }} /> Delete
            </span>
          ),
          key: 'delete',
          onClick: (e) => handleDelete(e),
        },
    ];

    return (
        <div>
          {/* Ant Design Card */}
          <Card
            title={decryptedNote.content?.title || 'Encrypted Note'}
            hoverable={true}
            onClick={decryptedNote.content.title && handleOnClick}
            className="overflow-hidden h-48"
            extra={ decryptedNote.content.title &&
                <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']} onClick={(e) => e.stopPropagation()}>
                    <Button
                        icon={<EllipsisOutlined />}
                        type="text"
                        onClick={(e) => e.stopPropagation()}  // Prevent event bubbling
                    />
                </Dropdown>
            }
          >
            <p className="overflow-hidden line-clamp-4">
              {decryptedNote.content?.text || note.content}
            </p>
          </Card>
        </div>
    );
};
export default NoteCard;