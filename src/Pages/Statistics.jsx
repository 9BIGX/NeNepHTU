import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BoxShowTotal from '../ui/BoxLayout';
import { FaPeopleGroup, FaSchool, FaTrophy } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { IoWarning } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import ClassPointData from '../data/ClassPoint';
import Chart from '../ui/Chart';

function StatisticsPage({ isSidebarOpen, toggleSidebar }) {
  const [AllClassData, setAllClassData] = useState(ClassPointData);
  const [activeTab, setActiveTab] = useState('tongquan');
  const [events, setEvents] = useState([])
  const [TotalClass, setTotalClass] = useState(25);
  const [TotalStudent, setTotalStudent] = useState(0);
  const [TotalViolate, setTotalViolate] = useState(0);
  const [TotalAchievement, setTotalAchievement] = useState(0);
  const [SelectEvent, setSelectEvent] = useState(events);

  const SetTotalStudent = () =>{
    for (const grade in AllClassData) {
      const classes = Object.values(AllClassData[grade]);
      const totalStudentsGrade = classes.reduce((total, currentClass) => {
        setTotalStudent((prev) => prev + currentClass.TotalStudent);
      }, 0);
      const TotalClassCriteria = classes.reduce((total, currentClass) => {
        setTotalViolate((prev) => prev + currentClass.TotalCriteria);
      }, 0);
      const TotalAchievementCriteria = classes.reduce((total, currentClass) => {
        setTotalAchievement((prev) => prev + currentClass.TotalAchievement);
      }, 0);
    }
  }
  useEffect(() => {
    SetTotalStudent();
  }, [AllClassData]);

  const LoopData = () => {
    if (!AllClassData) return null;
    return (
      <>
        {Object.keys(AllClassData).map((grade) => {
          const Class = Object.values(AllClassData[grade]);
          const Violate = Class.reduce((total, currentClass) => {
            return total + currentClass.TotalCriteria;
          }, 0);
          const Achievement = Class.reduce((total, currentClass) => {
            return total + currentClass.TotalAchievement;
          }, 0);
          const TotalPoint = Class.reduce((total, currentClass) => {
            return total + currentClass.TotalPoint;
          }, 0);
          return (
            <div key={grade}>
              <div className='flex gap-4 bg-white p-4 rounded-lg shadow-md justify-between'>
                <div className='flex gap-5 items-center'>
                  <p className='flex text-2xl text-purple-700 items-center justify-center bg-purple-100 w-15 h-15 rounded-full'>{grade}</p>
                  <div className='flex flex-col justify-between items-start gap-2'>
                    <p className='text-xl'>Khối {grade}</p>
                    <div className='flex gap-4 text-gray-500 text-sm'>
                      <p className='bg-red-100 text-red-500 p-1 rounded-lg'>{Violate} vi pham</p>
                      <p className='bg-green-100 text-green-500 p-1 rounded-md'>{Achievement} thanh tich</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-between mx-5'>
                  <p className='text-yellow-400 text-3xl'>{TotalPoint / Class.length}</p>
                  <p>Điểm trung bình</p>
                </div>
              </div>
            </div>
          );
        })
        }
      </>
    );
  };

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
                    TotalAmount={TotalStudent.toLocaleString()}
                    Icon={<FaUserGraduate className="text-5xl text-green-500 bg-green-100 p-3 rounded-md " />}
                    ColorAmount={"text-green-500"}
                    Headtext={"Tổng số Học sinh"}
                  />
                  <BoxShowTotal
                    TotalAmount={TotalViolate.toLocaleString()}
                    Icon={<IoWarning className="text-5xl text-red-500 bg-red-100 p-3 rounded-md " />}
                    ColorAmount={"text-red-500"}
                    Headtext={"Vi phạm"}
                  />
                  <BoxShowTotal
                    TotalAmount={TotalAchievement.toLocaleString()}
                    Icon={<FaTrophy className="text-5xl text-yellow-500 bg-yellow-100 p-3 rounded-md " />}
                    ColorAmount={"text-yellow-500"}
                    Headtext={"Thành tích"}
                  />
                </div>
                <div className='flex gap-4 w-full p-1 flex-col mt-5'>
                  {LoopData()}
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