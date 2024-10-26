import { useState, useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';
import { Modal, Input, Button, Form, FloatButton } from 'antd';
import { createNote, getEncryptedNotes, getNoteIds } from '../services/notesServices';

const NoteCreatorModal = () => {
  const { setNotes, encryptionKey } = useContext(NotesContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSave = () => {
    form
      .validateFields()
      .then( async (newContent) => {
        //disable save button
        setIsSaving(true);

        console.log('Attempting to create note:', newContent);
        const result = await createNote(newContent, encryptionKey);

        if(result){
          //get updated notes
          const noteIds = await getNoteIds();
          const newNotes = await getEncryptedNotes(noteIds);
          setNotes(newNotes);
        }

        //close modal
        setIsModalOpen(false);

        //enable save button
        setIsSaving(false);

        form.resetFields();
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  return (
    <>
      <FloatButton onClick={showModal}/>
      <Modal
        title="Create New Note"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={isSaving}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave} disabled={isSaving}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input placeholder="Enter the title" disabled={isSaving}/>
          </Form.Item>

          <Form.Item
            label="Text"
            name="text"
            rules={[{ required: true, message: 'Please enter the content' }]}
          >
            <Input.TextArea
              placeholder="Enter the content"
              rows={6}
              disabled={isSaving}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NoteCreatorModal;
