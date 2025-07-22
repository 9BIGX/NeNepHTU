import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoCalendarSharp, IoWarning } from "react-icons/io5"
import { SiAnytype } from "react-icons/si";
import { MdClass } from "react-icons/md";
import { IoMdPerson  } from "react-icons/io";
import { ImFilePicture } from "react-icons/im";
import { MdOutlineTextFields } from "react-icons/md";


function ViolatePage({ isSidebarOpen, toggleSidebar }) {
    const [LevelViolate, setLevelViolet] = useState(['Nhẹ', 'Trung Bình', 'Nặng', 'Rất Nặng']);
    const [TypeViolate, setTypeViolet] = useState(['Điện', 'Nước', 'Khác']);
    const [selectedLevelViolate, setSelectLevelViolate] = useState('');
    const [selectedTypeViolate, setSelectTypeViolate] = useState('');
    const OpTion = (Array) => {
        return (
            Array.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))
        )
    }
    const handleChange = (CallBack) => (e) => {
        CallBack(e.target.value);
    };

    const getTodayVN = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localTime = new Date(now.getTime() - offset * 60000);
        return localTime.toISOString().split('T')[0];
    };

    const [dateViolate, setDateViolate] = useState(getTodayVN);


    return (
        <>
            <div className="flex bg-gray-50">
                <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
                <div className="flex flex-col flex-1 p-2 h-screen">
                    <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Ghi nhận Vi Phạm"} />
                    <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
                        <h1></h1>
                        <form>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div >
                                    <label htmlFor="StudentCode" className="block mb-2 text-lg font-medium text-gray-900 ">Mã số học sinh</label>
                                    <div className='flex relative'>
                                        <IoMdPerson className='absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-900 text-2xl' />
                                        <input type="text" id="StudentCode" className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="123456789" required />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="LevelViolate" className="block mb-2 text-lg font-medium text-gray-900 ">Muc do vi pham</label>
                                    <div className='flex relative'>
                                        <IoWarning className='absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-900 text-2xl' />
                                        <select id="LevelViolate" value={selectedLevelViolate}
                                            onChange={handleChange(setSelectLevelViolate)}
                                            className="px-10 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                            <option value="">Chọn mức độ</option>
                                            {OpTion(LevelViolate)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="TypeViolate" className="block mb-2 text-lg font-medium text-gray-900 ">Loại vi phạm</label>
                                    <div className='flex relative'>
                                        <SiAnytype className='absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-900 text-2xl' />
                                        <select id="TypeViolate" value={selectedTypeViolate}
                                            onChange={handleChange(setSelectTypeViolate)}
                                            className="px-10 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                            <option value="">Chọn Loại vi phạm</option>
                                            {OpTion(TypeViolate)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="date" className="block mb-2 text-lg font-medium text-gray-900 ">Ngày vi phạm ( Tháng / Ngày / Năm )</label>
                                    <div className='flex relative'>
                                        <IoCalendarSharp className='absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-900 text-2xl' />
                                        <input type="date" value={dateViolate} onChange={(e) => { setDateViolate(e.target.value) }} id="date" className="px-10 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Chọn ngày" required />
                                    </div>
                                </div>
                                <div >
                                    <label htmlFor="TitleInfo" className="block mb-2 text-lg font-medium text-gray-900 ">Tiêu đề vi phạm</label>
                                    <div className='flex relative'>
                                        <MdOutlineTextFields className='absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-900 text-2xl' />
                                        <input type="text" id="TitleInfo" className="px-10 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nhập tiêu đề vi phạm" required />
                                    </div>
                                </div>
                                {/* input file */}
                                <div>
                                    <label htmlFor="file" className="block mb-2 text-lg font-medium text-gray-900 ">Ảnh xác minh</label>
                                    <div className='flex relative'>
                                        <ImFilePicture className='absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-900 text-2xl' />
                                        <input type="file" id="file" className="px-10 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='asdad'/>
                                        {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Chọn file</button> */}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="Description" className="block mb-2 text-lg font-medium text-gray-900 ">Mô tả vi phạm</label>
                                <div className='flex relative'>
                                    <MdOutlineTextFields className='absolute top-1/6 left-2 transform -translate-y-1/2 text-gray-900 text-2xl' />
                                    <textarea id="Description" rows="5" className="px-10 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nhập mô tả vi phạm"></textarea>
                                </div>
                            </div>
                            <div className='flex justify-center gap-5'>
                                <button type="reset" onClick={() => { setDateViolate(new Date().toISOString().split('T')[0]) }} className="mt-10  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center ">Reset</button>
                                <button type="submit" className="mt-10 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center ">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViolatePage;