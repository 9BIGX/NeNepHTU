import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SummaryCards from '../ui/SumaryCard';
import EventList from '../ui/EventStudent';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function VerifyViolatePage({ isSidebarOpen, toggleSidebar }) {

  const [activeTab, setActiveTab] = useState('tatca');
  const [events, setEvents] = useState([
    {
      id: 1,
      type: 'vi_pham',
      status: 'da_xac_minh',
      studentName: 'Nguyễn Văn An',
      url:"avatars/student.jpg",
      studentId: 'HS001',
      studentClass: '10A1',
      description: 'Đi học muộn 15 phút không có lý do chính đáng',
      time: '2024-01-15 07:15',
      points: -2,
      relatedPerson: 'Bảo vệ Nguyễn Văn D',
    },
    {
      id: 2,
      type: 'thanh_tich',
      status: 'da_xac_minh',
      studentName: 'Trần Thị Bình',
      url:"avatars/student.jpg",
      studentId: 'HS002',
      studentClass: '10A2',
      description: 'Phát biểu tích cực xây dựng trong giờ học Văn',
      time: '2024-01-15 08:30',
      points: 3,
      relatedPerson: 'GV Nguyễn Thị E',
    },
    {
      id: 3,
      type: 'vi_pham',
      status: 'cho_xac_minh',
      studentName: 'Lê Văn Cường',
      url:"avatars/student.jpg",
      studentId: 'HS003',
      studentClass: '10A1',
      description: 'Quên phù hiệu học sinh',
      time: '2024-01-15 09:00',
      points: -1,
      relatedPerson: 'GV Nguyễn Thị E',
    },
    {
      id: 4,
      type: 'vi_pham',
      status: 'cho_xac_minh',
      studentName: 'Lê Văn Cường',
      url:"avatars/student.jpg",
      studentId: 'HS003',
      studentClass: '10A1',
      description: 'Quên phù hiệu học sinh',
      time: '2024-01-15 09:00',
      points: -1,
      relatedPerson: 'GV Nguyễn Thị E',
    },
    {
      id: 5,
      type: 'thanh_tich',
      status: 'cho_xac_minh',
      studentName: 'Lê Văn Cường',
      url:"avatars/student.jpg",
      studentId: 'HS003',
      studentClass: '10A1',
      description: 'Quên phù hiệu học sinh',
      time: '2024-01-15 09:00',
      points: -1,
      relatedPerson: 'GV Nguyễn Thị E',
    },
    {
      id: 6,
      type: 'thanh_tich',
      status: 'cho_xac_minh',
      studentName: 'Lê Văn Cường',
      url:"avatars/student.jpg",
      studentId: 'HS003',
      studentClass: '10A1',
      description: 'Quên phù hiệu học sinh',
      time: '2024-01-15 09:00',
      points: -1,
      relatedPerson: 'GV Nguyễn Thị E',
    }
  ]);

  const [AmountEvent, setAmountEvent] = useState({
    tatca: events.length,
    vi_pham: 0,
    thanh_tich: 0,
    cho_xac_minh: 0,
  });
  useEffect(() => {
    setAmountEvent({
      tatca: events.length,
      vi_pham: events.filter((event) => event.type === 'vi_pham').length,
      thanh_tich: events.filter((event) => event.type === 'thanh_tich').length,
      cho_xac_minh: events.filter((event) => event.status === 'cho_xac_minh').length,
    });
  }, [events]);

  const [SelectEvent, setSelectEvent] = useState(events);
  useEffect(() => {
    if (activeTab === 'tatca') {
      setSelectEvent(events);
    } else if (activeTab === 'vipham') {
      setSelectEvent(events.filter((event) => event.type === 'vi_pham'));
    } else if (activeTab === 'thanhtich') {
      setSelectEvent(events.filter((event) => event.type === 'thanh_tich'));
    } else {
      setSelectEvent(events.filter((event) => event.status === 'cho_xac_minh'));
    }
  }, [activeTab, events]);

  const VerifyViolate = (id) => {
    const UpdateEvent = events.map((event) => {
      if (event.id === id) {
        return { ...event, status: 'da_xac_minh' };
      }
      return event;
    });
    setEvents(UpdateEvent)
  }
  const CancelViolate = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  }



  return (
    <>
      <div className="flex bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
        <div className="flex flex-col flex-1 p-2 h-screen">
          <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Liệt kê / Xác minh vi phạm"} />
          <div className={`flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto`}>
            <div className='flex justify-around border-b-2 border-gray-400 pb-2'>
              <p
                onClick={() => setActiveTab('tatca')}
                className={`cursor-pointer pb-2 ${activeTab === 'tatca' ? 'border-b-2 border-blue-500 font-semibold' : ''
                  }`}
              >
                Tất cả
              </p>
              <p
                onClick={() => setActiveTab('vipham')}
                className={`cursor-pointer pb-2 ${activeTab === 'vipham' ? 'border-b-2 border-red-500 font-semibold' : ''
                  }`}
              >
                Vi phạm
              </p>
              <p
                onClick={() => setActiveTab('thanhtich')}
                className={`cursor-pointer pb-2 ${activeTab === 'thanhtich' ? 'border-b-2 border-green-500 font-semibold' : ''
                  }`}
              >
                Thành tích
              </p>
              <p
                onClick={() => setActiveTab('choxacminh')}
                className={`cursor-pointer pb-2 ${activeTab === 'choxacminh' ? 'border-b-2 border-yellow-500 font-semibold' : ''
                  }`}
              >
                Chờ xác minh
              </p>
            </div>
            <div className="relative mt-8 mb-6">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sự vụ, học sinh..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <SummaryCards AmountEvent={AmountEvent} />
            <EventList events={SelectEvent} VerifyCallBack={VerifyViolate} CancelCallBack={CancelViolate} />
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyViolatePage;