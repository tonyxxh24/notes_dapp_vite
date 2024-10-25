import { useContext } from 'react';
import { Card, Button, Dropdown } from 'antd';
import { EllipsisOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { NotesContext } from '../contexts/NotesContext';
const NoteCard = ({ note, showEditorModal }) => {
    const { setNotes } = useContext(NotesContext);

    const handleDelete = (e) => {
      e.stopPropagation(); // Stop event propagation to prevent card click
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
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
            showEditorModal();
          },
        },
        {
          label: (
            <span style={{ color: 'red' }}>
              <DeleteOutlined style={{ color: 'red' }} /> Delete
            </span>
          ),
          key: 'delete',
          onClick: (e) => handleDelete(e.domEvent),
        },
    ];

    return (
        <div>
          {/* Ant Design Card */}
          <Card
            title={note.content.title}
            hoverable={true}
            onClick={showEditorModal}
            className="overflow-hidden h-48"
            extra={
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
              {note.content.text}
            </p>
          </Card>
        </div>
    );
};
export default NoteCard;