import { useState, useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';
import { Modal, Input, Button, Form, FloatButton } from 'antd';

const NoteCreatorModal = () => {
  const { setNotes } = useContext(NotesContext);
  const [ idCount, setIdCount] = useState(100);

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      .then((newContent) => {
        console.log('Saved Note:', newContent);
        setNotes((prevNotes) => [...prevNotes, {id: idCount, content: newContent}]);
        setIdCount(idCount + 1);
        setIsModalOpen(false);
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
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
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
            <Input placeholder="Enter the title" />
          </Form.Item>

          <Form.Item
            label="Text"
            name="text"
            rules={[{ required: true, message: 'Please enter the content' }]}
          >
            <Input.TextArea
              placeholder="Enter the content"
              rows={6}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NoteCreatorModal;
