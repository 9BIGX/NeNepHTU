import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoMdPerson } from 'react-icons/io';
import { IoCalendarSharp } from 'react-icons/io5';
import { FaTrophy, FaLayerGroup, FaImage } from 'react-icons/fa';
import { MdOutlineTextFields, MdOutlineDescription, MdLocationOn } from 'react-icons/md';


function AchievementPage({ isSidebarOpen, toggleSidebar }) {
    // Đổi tên biến từ "Violate" thành "Achievement" để rõ ràng hơn
    const [achievementLevels, setAchievementLevels] = useState(['Cá nhân', 'Lớp', 'Trường', 'Khu vực', 'Toàn trường']);
    const [achievementTypes, setAchievementTypes] = useState(['Văn hóa', 'Thể thao', 'Nghệ thuật', 'Khác']);
    const [locations, setLocations] = useState(['Sân bóng', 'Phòng học 101', 'Thư viện']);

    // Đổi tên state để đồng bộ với các biến mới
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [studentCode, setStudentCode] = useState('');
    const [otherAchievementType, setOtherAchievementType] = useState('');
    const [otherLocation, setOtherLocation] = useState('');
    const [achievementTitle, setAchievementTitle] = useState('');
    const [achievementDescription, setAchievementDescription] = useState('');

    const getTodayVN = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localTime = new Date(now.getTime() - offset * 60000);
        return localTime.toISOString().split('T')[0];
    };
    const [achievementDate, setAchievementDate] = useState(getTodayVN);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Đã lưu thành tích thành công!');
        // Thêm logic xử lý lưu dữ liệu ở đây
    };

    const handleReset = () => {
        setStudentCode('');
        setSelectedLevel('');
        setSelectedType('');
        setSelectedLocation('');
        setOtherAchievementType('');
        setOtherLocation('');
        setAchievementTitle('');
        setAchievementDescription('');
        setAchievementDate(getTodayVN());
    };

    const OpTion = (Array) => {
        return Array.map((option, index) => (
            <option key={index} value={option}>
                {option}
            </option>
        ));
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
            <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
            <div className="flex flex-col flex-1 z-2">
                <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Ghi nhận Thành tích"} />
                <div className="p-4 md:p-8 flex flex-col items-center">
                    <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Ghi nhận Thành tích</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                {/* Mã số học sinh */}
                                <div>
                                    <label htmlFor="studentCode" className="block mb-2 text-sm font-medium text-gray-700">Mã số học sinh</label>
                                    <div className='relative'>
                                        <IoMdPerson className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="text"
                                            id="studentCode"
                                            value={studentCode}
                                            onChange={(e) => setStudentCode(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            placeholder="Nhập mã số học sinh"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Cấp độ thành tích */}
                                <div>
                                    <label htmlFor="achievementLevel" className="block mb-2 text-sm font-medium text-gray-700">Cấp độ thành tích</label>
                                    <div className='relative'>
                                        <FaLayerGroup className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <select
                                            id="achievementLevel"
                                            value={selectedLevel}
                                            onChange={(e) => setSelectedLevel(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                        >
                                            <option value="">Chọn cấp độ</option>
                                            {OpTion(achievementLevels)}
                                        </select>
                                    </div>
                                </div>
                                {/* Loại thành tích */}
                                <div>
                                    <label htmlFor="achievementType" className="block mb-2 text-sm font-medium text-gray-700">Loại thành tích</label>
                                    <div className='relative'>
                                        <FaTrophy className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <select
                                            id="achievementType"
                                            value={selectedType}
                                            onChange={(e) => setSelectedType(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                        >
                                            <option value="">Chọn loại thành tích</option>
                                            {OpTion(achievementTypes)}
                                        </select>
                                    </div>
                                </div>
                                {/* Loại thành tích khác */}
                                <div>
                                    <label htmlFor="otherAchievementType" className="block mb-2 text-sm font-medium text-gray-700">Loại thành tích khác</label>
                                    <div className='relative'>
                                        <MdOutlineTextFields className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="text"
                                            id="otherAchievementType"
                                            value={otherAchievementType}
                                            onChange={(e) => setOtherAchievementType(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            placeholder="Nhập loại thành tích"
                                            required={selectedType === 'Khác'}
                                        />
                                    </div>
                                </div>
                                {/* Ngày thực hiện */}
                                <div>
                                    <label htmlFor="achievementDate" className="block mb-2 text-sm font-medium text-gray-700">Ngày thực hiện</label>
                                    <div className='relative'>
                                        <IoCalendarSharp className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="date"
                                            value={achievementDate}
                                            onChange={(e) => setAchievementDate(e.target.value)}
                                            id="achievementDate"
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Địa điểm */}
                                <div>
                                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700">Địa điểm</label>
                                    <div className='relative'>
                                        <MdLocationOn className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <select
                                            id="location"
                                            value={selectedLocation}
                                            onChange={(e) => setSelectedLocation(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                        >
                                            <option value="">Chọn địa điểm</option>
                                            {OpTion(locations)}
                                        </select>
                                    </div>
                                </div>
                                {/* Địa điểm khác */}
                                <div>
                                    <label htmlFor="otherLocation" className="block mb-2 text-sm font-medium text-gray-700">Địa điểm khác</label>
                                    <div className='relative'>
                                        <MdOutlineTextFields className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="text"
                                            id="otherLocation"
                                            value={otherLocation}
                                            onChange={(e) => setOtherLocation(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            placeholder="Nhập địa điểm"
                                            required={selectedLocation === 'Khác'}
                                        />
                                    </div>
                                </div>
                                {/* Tiêu đề thành tích */}
                                <div>
                                    <label htmlFor="achievementTitle" className="block mb-2 text-sm font-medium text-gray-700">Tiêu đề thành tích</label>
                                    <div className='relative'>
                                        <MdOutlineTextFields className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="text"
                                            id="achievementTitle"
                                            value={achievementTitle}
                                            onChange={(e) => setAchievementTitle(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            placeholder="Nhập tiêu đề thành tích"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Mô tả thành tích */}
                            <div className="mb-6">
                                <label htmlFor="achievementDescription" className="block mb-2 text-sm font-medium text-gray-700">Mô tả thành tích (không bắt buộc)</label>
                                <div className='relative'>
                                    <MdOutlineDescription className='absolute top-3 left-3 text-gray-400 text-xl' />
                                    <textarea
                                        id="achievementDescription"
                                        rows="4"
                                        value={achievementDescription}
                                        onChange={(e) => setAchievementDescription(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none"
                                        placeholder="Nhập mô tả thành tích chi tiết"
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
                                    type="button"
                                    onClick={handleReset}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200 font-medium"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
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
export default AchievementPage;