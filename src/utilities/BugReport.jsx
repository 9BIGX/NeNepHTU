import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaBug, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';
import { MdOutlineTextFields, MdOutlineDescription, MdAttachFile } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';

const API_URL = import.meta.env.VITE_API_URL;

function BugReportPage({ isSidebarOpen, toggleSidebar }) {
    const [reportType, setReportType] = useState('Lỗi chức năng');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reportTypes = [
        'Lỗi chức năng',
        'Lỗi giao diện (UI/UX)',
        'Lỗi hiệu suất (chậm/đơ)',
        'Lỗi bảo mật',
        'Đề xuất cải tiến'
    ];

    const renderOptions = (array) => {
        return array.map((option, index) => (
            <option key={index} value={option}>
                {option}
            </option>
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const file = document.getElementById('screenshot').files[0];
        
        const formData = new FormData();
        formData.append('reportType', reportType);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('contactEmail', contactEmail);
        if (file) {
            formData.append('screenshot', file);
        }

        try {
            const response = await fetch(API_URL + '/api/bug-report', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Báo cáo của bạn đã được gửi thành công. Chúng tôi sẽ sớm xem xét!');
                // Reset form
                setReportType('Lỗi chức năng');
                setTitle('');
                setDescription('');
                setContactEmail('');
                document.getElementById('screenshot').value = '';
            } else {
                const errorData = await response.json();
                alert(`Lỗi: ${errorData.message || 'Không thể gửi báo cáo lỗi.'}`);
            }
        } catch (error) {
            console.error('Lỗi khi gửi báo cáo:', error);
            alert('Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setReportType('Lỗi chức năng');
        setTitle('');
        setDescription('');
        setContactEmail('');
        document.getElementById('screenshot').value = '';
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
            <div className="absolute w-full bg-blue-500 min-h-85 z-1"></div>
            <div className="flex flex-col flex-1 z-2">
                <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Báo cáo lỗi hệ thống"} />
                <div className="p-4 md:p-8 flex flex-col items-center">
                    <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center flex items-center justify-center">
                            <FaBug className="mr-3 text-purple-600" /> Báo cáo lỗi
                        </h2>
                        <p className="text-center text-gray-500 mb-6">Giúp chúng tôi cải thiện hệ thống tốt hơn!</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                {/* Loại báo cáo */}
                                <div>
                                    <label htmlFor="reportType" className="block mb-2 text-sm font-medium text-gray-700">Loại báo cáo</label>
                                    <div className='relative'>
                                        <BiCategory className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <select
                                            id="reportType"
                                            value={reportType}
                                            onChange={(e) => setReportType(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            required
                                        >
                                            {renderOptions(reportTypes)}
                                        </select>
                                    </div>
                                </div>
                                {/* Tiêu đề báo cáo */}
                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Tiêu đề</label>
                                    <div className='relative'>
                                        <MdOutlineTextFields className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="text"
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            placeholder="Ví dụ: Nút 'Lưu' không hoạt động"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Email liên hệ */}
                                <div className="lg:col-span-2">
                                    <label htmlFor="contactEmail" className="block mb-2 text-sm font-medium text-gray-700">Email liên hệ (Không bắt buộc)</label>
                                    <div className='relative'>
                                        <FaEnvelope className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                        <input
                                            type="email"
                                            id="contactEmail"
                                            value={contactEmail}
                                            onChange={(e) => setContactEmail(e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                            placeholder="Nhập email của bạn để chúng tôi có thể liên hệ"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Mô tả chi tiết */}
                            <div className="mb-6">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Mô tả chi tiết lỗi</label>
                                <div className='relative'>
                                    <MdOutlineDescription className='absolute top-3 left-3 text-gray-400 text-xl' />
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="6"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none"
                                        placeholder="Mô tả cụ thể lỗi bạn gặp phải: các bước để tái hiện lỗi, lỗi xảy ra ở đâu, và những gì bạn mong đợi."
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            {/* Đính kèm ảnh/video */}
                            <div className="mb-6">
                                <label htmlFor="screenshot" className="block mb-2 text-sm font-medium text-gray-700">Đính kèm ảnh/video (Khuyến khích)</label>
                                <div className='relative'>
                                    <MdAttachFile className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl' />
                                    <input
                                        type="file"
                                        id="screenshot"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Ảnh chụp màn hình hoặc video ngắn giúp chúng tôi hiểu lỗi nhanh hơn.</p>
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
                                    disabled={isSubmitting}
                                    className={`px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-200 font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Đang gửi...' : 'Gửi báo cáo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default BugReportPage;