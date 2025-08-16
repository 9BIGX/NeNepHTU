
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatList from '../ui/ChatList';
import ChatBox from '../ui/ChatBox';


const users = [
    { id: 1, name: 'Nguyễn Văn A' },
    { id: 2, name: 'Trần Thị B' },
    { id: 3, name: 'Lê Văn C' },
];

export default function ChatPage({ isSidebarOpen, toggleSidebar }) {

    const chatGroups = [
        {
            id: 1,
            name: "Học sinh – Ban Nề nếp",
            description: "Trao đổi giữa học sinh và ban quản lý nề nếp",
            members: 245,
            icon: "🎓",
        },
        {
            id: 2,
            name: "Đội Cờ Đỏ – Ban Nề nếp",
            description: "Phối hợp giữa đội cờ đỏ và ban nề nếp",
            members: 35,
            icon: "🚩",
        },
        {
            id: 3,
            name: "Nhóm Chung",
            description: "Trao đổi của tất cả giáo viên và cán bộ",
            members: 78,
            icon: "👥",
        },
        {
            id: 4,
            name: "Đội cờ đỏ riêng",
            description: "Thảo luận nội bộ của đội cờ đỏ",
            members: 12,
            icon: "🏠",
        },
    ];

    const [selectedGroup, setSelectedGroup] = useState(chatGroups[0]);


    return (
        <>
            <div className="flex bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
                <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
                <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
                <div className="flex flex-col flex-1 z-2">
                    <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Trang Chat"} />
                    <div className="flex flex-col mt-8 bg-gray-100 rounded-lg shadow overflow-y-auto ">
                        <div className=" flex bg-white p-5 rounded-lg shadow">
                            <ChatList
                                chatGroups={chatGroups}
                                onSelect={setSelectedGroup}
                                selectedId={selectedGroup?.id}
                            />
                            <ChatBox selectedGroup={selectedGroup} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
