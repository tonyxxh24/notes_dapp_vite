import { useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';
import { Layout } from 'antd';

const { Header } = Layout;

const AppHeader = () => {
    const { account } = useContext(NotesContext);

    return (
        <Header className="flex justify-between items-center px-4 bg-gray-100">
            <h1 className="text-4xl flex items-end">
                <span className="text-3xl font-bold ml-4">My Notes</span>
                <span className="text-base truncate max-w-xs inline-block bg-gray-200 p-1 rounded-lg ml-2">
                    {account}
                </span>
            </h1>
        </Header>
    );
};

export default AppHeader;