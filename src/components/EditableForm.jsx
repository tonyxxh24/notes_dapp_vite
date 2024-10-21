import { useState } from 'react';
import { Form, Input, Button, Typography} from 'antd';

const { Paragraph } = Typography;

const EditableForm = ({ onDelete, note, setNote, setIsModalOpen}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Handle clicking the edit icon to enable editing
  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(note);  // Load current note values into the form
  };

  // Handle save action
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        setNote(values);  // Save the new values
        setIsEditing(false);  // Disable editing mode
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  // Handle cancel action
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
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
            <Input.TextArea placeholder="Enter the content" rows={4} />
          </Form.Item>

          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form>
      ) : (
        <>
          <div className="flex items-center">
            <Paragraph strong className="mr-2">
              {note.title}
            </Paragraph>
          </div>
          <Paragraph>
            {note.content}
          </Paragraph>
        </>
      )}
      <div className="flex justify-end">
        <Button onClick={handleEdit}>
              Edit
        </Button>
        <Button danger onClick={onDelete} className="ml-2">
          Delete
        </Button>
      </div>
    </>
  );
};

export default EditableForm;
