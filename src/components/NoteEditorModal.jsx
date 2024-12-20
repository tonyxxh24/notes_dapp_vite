import { useState, useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';
import { deleteNote, getEncryptedNotebyId, updateNote } from '../services/notesServices';

import { Modal, Form, Input, Button, Typography} from 'antd';
const { Paragraph } = Typography;

const NoteEditorModal = ({ note, closeEditorModal }) => { 
    const { setNotes, encryptionKey } = useContext(NotesContext);

    const {id, content} = note;
    const [localContent, setLocalContent] = useState(content);
    const [isEditing, setIsEditing] = useState(false);
    const [isSendingTx, setIsSendingTx] = useState(false);
    const [form] = Form.useForm();

    // Handle clicking the edit icon to enable editing
    const handleEdit = () => {
        setIsEditing(true);
        form.setFieldsValue({
            title: localContent.title,
            text: localContent.text,
        });  // Load current note values into the form
    };

    // Handle save action
    const handleSave = () => {
        form
        .validateFields()
        .then( async (newContent) => {
            setIsSendingTx(true);
            console.log(`Attempting to update note ${id}: ${newContent}`);
            const result = await updateNote(id, newContent, encryptionKey);

            if(result) {
                //get updated encrypted note
                const updatedNote = await getEncryptedNotebyId(id);
                setNotes((prevNotes) => prevNotes.map((n) => n.id === id ? updatedNote : n));

                //update current content on editor
                setLocalContent(newContent);
            }
            
            setIsEditing(false);  // Disable editing mode
            setIsSendingTx(false);
        })
        .catch((info) => {
            console.log('Validation Failed:', info);
        });
    };

    const handleDelete = async () => {
        setIsSendingTx(true);
        const userConfirmed = confirm("Are you sure you wanna delete this note?");
        if(!userConfirmed) {
            setIsSendingTx(false);
            return;
        }
        const result = await deleteNote(id);
        if(result) setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
        closeEditorModal();
        setIsSendingTx(false);
    };

    // Handle cancel action
    const handleEditCancel = () => {
        setIsEditing(false);
    };

  return (
    <>
      <Modal
        open={true}
        footer={null}
        onCancel={closeEditorModal}
      >
        {isEditing ? (
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter the title' }]}
                >
                    <Input placeholder="Enter the title" disabled={isSendingTx} />
                </Form.Item>

                <Form.Item
                    label="Text"
                    name="text"
                    rules={[{ required: true, message: 'Please enter the content' }]}
                >
                    <Input.TextArea placeholder="Enter the content" rows={4} disabled={isSendingTx} />
                </Form.Item>

                <Button type="primary" onClick={handleSave} disabled={isSendingTx}>
                    Save
                </Button>
                <Button onClick={handleEditCancel} style={{ marginLeft: 8 }} disabled={isSendingTx}>
                    Cancel
                </Button>
            </Form>
        ) : (
            <>
                <div className="flex items-center justify-between">
                    <Paragraph strong className="mr-2">
                        {localContent.title}
                    </Paragraph>
                    <Typography.Text type="secondary" className="mr-8">
                        [ID: {id.toString()}]
                    </Typography.Text>
                </div>
                <Paragraph>
                    {localContent.text}
                </Paragraph>
            </>
        )}
        <div className="flex justify-end">
            <Button onClick={handleEdit} disabled={isSendingTx || isEditing}>
                Edit
            </Button>
            <Button danger onClick={handleDelete} className="ml-2" disabled={isSendingTx || isEditing}>
                Delete
            </Button>
        </div>
      </Modal>
    </>
  );
}

export default NoteEditorModal;