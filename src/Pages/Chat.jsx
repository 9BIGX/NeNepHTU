
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const users = [
    { id: 1, name: 'Nguyễn Văn A' },
    { id: 2, name: 'Trần Thị B' },
    { id: 3, name: 'Lê Văn C' },
];

export default function ChatPage({ isSidebarOpen, toggleSidebar }) {
    const [selectedUser, setSelectedUser] = useState(users[0]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
      
    const handleSend = () => {
        if (newMessage.trim() === '') return;
        setMessages([...messages, { from: 'me', text: newMessage }]);
        setNewMessage('');
    };

    return (
        <>
            <div className="flex bg-gray-100">
                <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
                <div className="flex-1 p-6">
                    <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Trang Chu"} />
                    <div className="mt-8 bg-white p-5 rounded-lg shadow">
                        
                    </div>
                </div>
            </div>
        </>
    );
}
