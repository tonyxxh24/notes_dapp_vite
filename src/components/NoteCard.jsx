import { useState } from 'react';
import { Card, Modal, Button, Dropdown } from 'antd';
import { EllipsisOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditableForm from './EditableForm';
const NoteCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [note, setNote] = useState({
      title: 'My Note Title',
      content: 'This is the content of the note.',
    });

      // Show the edit modal
    const showCardModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Handle delete action (can be modified to fit your app's logic)
    const handleDelete = () => {
        alert('Card will be deleted'); // Replace this with your delete logic
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
          onClick: showCardModal,
        },
        {
          label: (
            <span style={{ color: 'red' }}>
              <DeleteOutlined style={{ color: 'red' }} /> Delete
            </span>
          ),
          key: 'delete',
          onClick: handleDelete,
        },
    ];

    return (
        <div>
          {/* Ant Design Card */}
          <Card
            title={note.title}
            hoverable={true}
            onClick={showCardModal}
            className="overflow-hidden h-48"
            extra={
                <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                    <Button
                        icon={<EllipsisOutlined />}
                        type="text"
                        onClick={(e) => e.stopPropagation()}  // Prevent event bubbling
                    />
                </Dropdown>
            }
          >
            <p className="overflow-hidden line-clamp-4">
              {note.content}
            </p>
          </Card>
    
          {/* Modal for editing content */}
          <Modal
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <EditableForm onDelete={handleDelete} note={note} setNote={setNote} setIsModalOpen={setIsModalOpen}/>
          </Modal>
        </div>
    );
};
export default NoteCard;