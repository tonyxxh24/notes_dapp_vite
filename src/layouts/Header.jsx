import React from 'react';
import { Layout, Button } from 'antd';

const { Header } = Layout;

const AppHeader = ({ account, onLogout }) => {
    return (
        <Header className="flex justify-between items-center px-4 bg-gray-100">
            <h1 className="text-4xl flex items-end">
                <span className="text-3xl font-bold ml-4">My Notes</span>
                <span className="text-base truncate max-w-xs inline-block bg-gray-200 p-1 rounded-lg ml-2">
                    {account}
                </span>
            </h1>
            <Button className="mr-4" type="default" onClick={onLogout}>
                Logout
            </Button>
        </Header>
    );
};

export default AppHeader;