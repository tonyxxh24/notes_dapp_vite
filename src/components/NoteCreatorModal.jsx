import { useState } from 'react';
import { Modal, Input, Button, Form, FloatButton } from 'antd';

const NoteCreatorModal = () => {
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
      .then((values) => {
        console.log('Saved Note:', values);
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
            label="Content"
            name="content"
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
