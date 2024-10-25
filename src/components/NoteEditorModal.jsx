import { useState, useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';

import { Modal, Form, Input, Button, Typography} from 'antd';
const { Paragraph } = Typography;

const NoteEditorModal = ({ note, closeEditorModal }) => { 
    const { setNotes } = useContext(NotesContext);

    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();

    // Handle clicking the edit icon to enable editing
    const handleEdit = () => {
        setIsEditing(true);
        form.setFieldsValue({
            id: note.id,
            content: {
                title: note.content.title,
                text: note.content.text,
            }
        });  // Load current note values into the form
    };

    // Handle save action
    const handleSave = () => {
        form
        .validateFields()
        .then((values) => {
            setNotes(values);  // Save the new values
            setIsEditing(false);  // Disable editing mode
        })
        .catch((info) => {
            console.log('Validation Failed:', info);
        });
    };

    const handleDelete = () => {
        setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
        closeEditorModal();
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
                    name={['content', 'title']}
                    rules={[{ required: true, message: 'Please enter the title' }]}
                >
                    <Input placeholder="Enter the title" />
                </Form.Item>

                <Form.Item
                    label="Text"
                    name={['content', 'text']}
                    rules={[{ required: true, message: 'Please enter the content' }]}
                >
                    <Input.TextArea placeholder="Enter the content" rows={4} />
                </Form.Item>

                <Button type="primary" onClick={handleSave}>
                    Save
                </Button>
                <Button onClick={handleEditCancel} style={{ marginLeft: 8 }}>
                    Cancel
                </Button>
            </Form>
        ) : (
            <>
                <div className="flex items-center justify-between">
                    <Paragraph strong className="mr-2">
                        {note.content.title}
                    </Paragraph>
                    <Typography.Text type="secondary" className="mr-8">
                        [ID: {note.id}]
                    </Typography.Text>
                </div>
                <Paragraph>
                    {note.content.text}
                </Paragraph>
            </>
        )}
        <div className="flex justify-end">
            <Button onClick={handleEdit}>
                Edit
            </Button>
            <Button danger onClick={handleDelete} className="ml-2">
                Delete
            </Button>
        </div>
      </Modal>
    </>
  );
}

export default NoteEditorModal;