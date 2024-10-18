import React, { useState } from 'react';

import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    FileOutlined,
    FolderOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}
const items = [
    getItem('User', '1', <UserOutlined />),
    getItem('Folder1', 'sub1', <FolderOutlined />, [
      getItem('Note1', '3'),
      getItem('Note2', '4'),
      getItem('Note3', '5'),
    ]),
    getItem('Folder2', 'sub2', <FolderOutlined />, [
      getItem('Note4', '6'), 
      getItem('Note5', '8')
    ]),
    getItem('Files', '9', <FileOutlined />),
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    );
};

export default Sidebar;