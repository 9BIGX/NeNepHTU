import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BoxShowTotal from '../ui/BoxLayout';
import { FaPeopleGroup, FaSchool, FaTrophy } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import Chart from '../ui/Chart';
import ClassRankingCard from '../ui/ClassRanking';
import { AnimatePresence } from 'framer-motion';

function MainPage({ isSidebarOpen, toggleSidebar }) {
  const [TotalStudents, setTotalStudent] = useState(1500);
  const [TotalStudentViolate, setTotalStudentViolate] = useState(81);
  const [TotalStudentCheckIn, setTotalStudentCheckIn] = useState(1000);
  const [TotalClass, setTotalClass] = useState(25);
  const [ToTalClassExcelent, setToTalClassExcelet] = useState(10);

  function PercentStudentCheckIn() {
    const percent = (TotalStudentCheckIn / TotalStudents) * 100;
    return percent.toFixed(2);
  }
  return (
    <div className="flex bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
      <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
      <div className="flex flex-col flex-1 z-2">
        <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Trang Chủ"} />
        <div className="flex flex-col mt-5 p-2 rounded-lg overflow-y-auto ">
          <div className='grid lg:grid-cols-4 gap-3 grid-cols-2 p-3'>
            <BoxShowTotal
              TotalAmount={TotalStudents.toLocaleString()}
              Icon={<FaPeopleGroup className="text-5xl text-green-500 bg-green-100 p-3 rounded-md " />}
              ColorAmount={"text-green-500"}
              Headtext={"Tổng số Học sinh"}
              DesText={"Toàn trường"}
            />
            <BoxShowTotal
              TotalAmount={TotalStudentViolate.toLocaleString()}
              Icon={<IoWarning className="text-5xl text-red-500 bg-red-100 p-3 rounded-md " />}
              ColorAmount={"text-red-500"}
              Headtext={"Vi phạm tuần"}
              DesText={"Giảm 10%"}
            />
            <BoxShowTotal
              TotalAmount={PercentStudentCheckIn() + "%"}
              Icon={<FaSchool className="text-5xl text-blue-500 bg-blue-100 p-3 rounded-md " />}
              ColorAmount={"text-blue-500"}
              Headtext={"Điểm danh"}
              DesText={"Tăng 5%"}
            />
            <BoxShowTotal
              TotalAmount={ToTalClassExcelent + "/" + TotalClass}
              Icon={<FaTrophy className="text-5xl text-yellow-500 bg-yellow-100 p-3 rounded-md " />}
              ColorAmount={"text-yellow-400"}
              Headtext={"Tổng lớp xuất sắc"}
              DesText={"Tuần này"}
            />
          </div>
          <div className='grid lg:grid-cols-2 gap-5 mt-0 grid-cols-1 p-3'>
            <Chart />
            <ClassRankingCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;