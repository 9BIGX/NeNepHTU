import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoMdPerson, } from 'react-icons/io';
import { SiAnytype } from 'react-icons/si';
import { IoCalendarSharp, IoWarning } from 'react-icons/io5';
import { MdOutlineTextFields, MdOutlineDescription, MdLocationOn } from 'react-icons/md';
import { FaImage } from 'react-icons/fa'; // Sử dụng FaImage thay vì ImFilePicture

const API_URL = import.meta.env.VITE_API_URL;
function ViolatePage({ isSidebarOpen, toggleSidebar }) {
    const [LevelViolate, setLevelViolet] = useState(['Nhẹ', 'Trung Bình', 'Nặng', 'Rất Nặng']);
    const [TypeViolate, setTypeViolet] = useState(['Điện', 'Nước', 'Khác']);
    const [Locations, setLocations] = useState(['Sân bóng', 'Phòng học 101', 'Thư viện']);

    const [selectedLevelViolate, setSelectLevelViolate] = useState('');
    const [selectedTypeViolate, setSelectTypeViolate] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    const OpTion = (Array) => {
        return Array.map((option, index) => (
            <option key={index} value={option}>
                {option}
            </option>
        ));
    };

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

    const handleSubmit = async () => {
        const file = document.getElementById('file').files[0];
        if (!file) return alert('Vui lòng chọn ảnh xác minh!');

        const formData = new FormData();
        formData.append('image', file);

        await fetch(API_URL+'/api/upload', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
            .then(res => res.json())
            .then(data => { 

                alert('Đã lưu vi phạm thành công!');
            });


    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
            <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
            <div className="flex flex-col flex-1 z-2">
                <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Ghi nhận Vi Phạm"} />
                <div className="p-4 md:p-8 flex flex-col items-center">
                    <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Ghi nhận Vi Phạm</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                {/* Mã số học sinh */}
                                <div>
                                    <label htmlFor="StudentCode" className="block mb-2 text-sm font-medium text-gray-700">Mã số học sinh</label>
                                    <div className='relative'>
                                        <IoMdPerson className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="text"
                                            id="StudentCode"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            placeholder="Nhập mã số học sinh"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Nhóm vi phạm */}
                                <div>
                                    <label htmlFor="LevelViolate" className="block mb-2 text-sm font-medium text-gray-700">Mức độ vi phạm</label>
                                    <div className='relative'>
                                        <IoWarning className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <select
                                            id="LevelViolate"
                                            value={selectedLevelViolate}
                                            onChange={handleChange(setSelectLevelViolate)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                        >
                                            <option value="">Chọn mức độ vi phạm</option>
                                            {OpTion(LevelViolate)}
                                        </select>
                                    </div>
                                </div>
                                {/* Loại vi phạm */}
                                <div>
                                    <label htmlFor="TypeViolate" className="block mb-2 text-sm font-medium text-gray-700">Loại vi phạm</label>
                                    <div className='relative'>
                                        <SiAnytype className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <select
                                            id="TypeViolate"
                                            value={selectedTypeViolate}
                                            onChange={handleChange(setSelectTypeViolate)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                        >
                                            <option value="">Chọn loại vi phạm</option>
                                            {OpTion(TypeViolate)}
                                        </select>
                                    </div>
                                </div>
                                {/* Loại vi phạm khác */}
                                <div>
                                    <label htmlFor="OtherTypeViolate" className="block mb-2 text-sm font-medium text-gray-700">Loại vi phạm khác</label>
                                    <div className='relative'>
                                        <MdOutlineTextFields className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="text"
                                            id="OtherTypeViolate"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            placeholder="Nhập loại vi phạm"
                                            required={selectedTypeViolate === 'Khác'}
                                        />
                                    </div>
                                </div>
                                {/* Ngày vi phạm */}
                                <div>
                                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">Ngày vi phạm</label>
                                    <div className='relative'>
                                        <IoCalendarSharp className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="date"
                                            value={dateViolate}
                                            onChange={(e) => setDateViolate(e.target.value)}
                                            id="date"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Địa điểm */}
                                <div>
                                    <label htmlFor="Location" className="block mb-2 text-sm font-medium text-gray-700">Địa điểm</label>
                                    <div className='relative'>
                                        <MdLocationOn className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <select
                                            id="Location"
                                            value={selectedLocation}
                                            onChange={handleChange(setSelectedLocation)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                        >
                                            <option value="">Chọn địa điểm</option>
                                            {OpTion(Locations)}
                                        </select>
                                    </div>
                                </div>
                                {/* Địa điểm khác */}
                                <div>
                                    <label htmlFor="OtherLocation" className="block mb-2 text-sm font-medium text-gray-700">Địa điểm khác</label>
                                    <div className='relative'>
                                        <MdOutlineTextFields className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="text"
                                            id="OtherLocation"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            placeholder="Nhập địa điểm"
                                            required={selectedLocation === 'Khác'}
                                        />
                                    </div>
                                </div>
                                {/* Tiêu đề vi phạm */}
                                <div>
                                    <label htmlFor="TitleInfo" className="block mb-2 text-sm font-medium text-gray-700">Tiêu đề vi phạm</label>
                                    <div className='relative'>
                                        <MdOutlineTextFields className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="text"
                                            id="TitleInfo"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            placeholder="Nhập tiêu đề vi phạm"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Mô tả vi phạm */}
                            <div className="mb-6">
                                <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-700">Mô tả vi phạm (không bắt buộc)</label>
                                <div className='relative'>
                                    <MdOutlineDescription className='absolute top-3 left-3 text-gray-400 text-xl' />
                                    <textarea
                                        id="Description"
                                        rows="4"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none"
                                        placeholder="Nhập mô tả vi phạm chi tiết"
                                    ></textarea>
                                </div>
                            </div>
                            {/* Ảnh xác minh */}
                            <div className="mb-6">
                                <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-700">Ảnh xác minh</label>
                                <div className='relative'>
                                    <FaImage className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                    <input
                                        type="file"
                                        id="file"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                    />
                                </div>
                            </div>
                            <div className='flex justify-end gap-4'>
                                <button
                                    type="reset"
                                    onClick={() => {
                                        setDateViolate(getTodayVN());
                                        // Thêm logic reset các state khác ở đây
                                    }}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200 font-medium"
                                >
                                    Reset
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleSubmit();
                                    }}
                                    className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-200 font-medium"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViolatePage;