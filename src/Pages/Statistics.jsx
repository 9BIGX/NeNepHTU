import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BoxShowTotal from '../ui/BoxLayout';
import { FaPeopleGroup, FaSchool, FaTrophy } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import ClassPointData from '../data/ClassPoint';
import Chart from '../ui/Chart';

function StatisticsPage({ isSidebarOpen, toggleSidebar }) {
  const [AllClassData, setAllClassData] = useState(ClassPointData);
  const [activeTab, setActiveTab] = useState('tongquan');
  const [events, setEvents] = useState([])
  const [TotalClass, setTotalClass] = useState(25);
  const [TotalStudent, setTotalStudent] = useState(150);
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


  return (
    <>
      <div className="flex bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
        <div className="flex flex-col flex-1 p-2 h-screen">
          <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Thống kê / báo cáo"} />
          <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
            <div className='flex justify-around border-b-2 border-gray-400 pb-2'>
              <p
                onClick={() => setActiveTab('tongquan')}
                className={`cursor-pointer pb-2 ${activeTab === 'tongquan' ? 'border-b-2 border-blue-500 font-semibold' : ''
                  }`}
              >
                Tổng quan
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
                onClick={() => setActiveTab('xuhuong')}
                className={`cursor-pointer pb-2 ${activeTab === 'xuhuong' ? 'border-b-2 border-yellow-500 font-semibold' : ''
                  }`}
              >
                Xu hướng
              </p>
            </div>
            <div className='flex w-full mt-5 gap-2'>
              <div className='w-1/2'>
                <div className='flex gap-4 w-full p-1'>
                  <BoxShowTotal
                    TotalAmount={TotalClass.toLocaleString()}
                    Icon={<SiGoogleclassroom className="text-5xl text-blue-500 bg-blue-100 p-3 rounded-md " />}
                    ColorAmount={"text-blue-500"}
                    Headtext={"Tổng số lớp"}

                  />
                  <BoxShowTotal
                    TotalAmount={TotalClass.toLocaleString()}
                    Icon={<FaPeopleGroup className="text-5xl text-green-500 bg-green-100 p-3 rounded-md " />}
                    ColorAmount={"text-green-500"}
                    Headtext={"Tổng số Học sinh"}
                  />
                  <BoxShowTotal
                    TotalAmount={TotalClass.toLocaleString()}
                    Icon={<FaPeopleGroup className="text-5xl text-green-500 bg-green-100 p-3 rounded-md " />}
                    ColorAmount={"text-green-500"}
                    Headtext={"Tổng số Học sinh"}
                  />
                  <BoxShowTotal
                    TotalAmount={TotalClass.toLocaleString()}
                    Icon={<FaPeopleGroup className="text-5xl text-green-500 bg-green-100 p-3 rounded-md " />}
                    ColorAmount={"text-green-500"}
                    Headtext={"Tổng số Học sinh"}
                  />
                </div>

                <div className='flex gap-4 w-full p-1'>

                </div>
              </div>
              <div className='w-1/2'>
                <Chart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default StatisticsPage;