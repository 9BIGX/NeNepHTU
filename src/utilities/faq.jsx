import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { LuClipboardType } from "react-icons/lu";
import { GrTrophy } from "react-icons/gr";
import { GiBugleCall } from "react-icons/gi";
import { MdContactSupport } from "react-icons/md";
import { SiVirustotal } from "react-icons/si";
import FAQItem from '../ui/FAQItem';

function FAQPage({ isSidebarOpen, toggleSidebar }) {

    const [ActiveBlock, setActiveBlock] = useState('')

    const faqData = [
        {
            category: "Tài khoản & Đăng nhập",
            icon: <FaRegUserCircle className='text-4xl text-blue-500 rounded-lg bg-gray-200/50 p-2' />,
            color: "bg-blue-300",
            questions: [
                {
                    question: "Làm thế nào để đăng nhập vào hệ thống?",
                    answer:
                        "Sử dụng tài khoản và mật khẩu được cấp bởi Ban Nề nếp hoặc Quản trị viên hệ thống. Nếu quên mật khẩu, vui lòng liên hệ với Quản trị viên để được hỗ trợ.",
                },
                {
                    question: "Tôi có thể thay đổi mật khẩu không?",
                    answer:
                        "Có, bạn có thể thay đổi mật khẩu trong phần Cài đặt > Đổi mật khẩu. Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.",
                },
                {
                    question: "Tài khoản bị khóa phải làm sao?",
                    answer:
                        "Tài khoản sẽ bị khóa sau 5 lần đăng nhập sai liên tiếp. Vui lòng liên hệ với Quản trị viên để được mở khóa tài khoản.",
                },
            ],
        },
        {
            category: "Ghi nhận sự vụ",
            icon: <LuClipboardType className='text-4xl text-red-500 rounded-lg bg-gray-200/50 p-2' />,
            color: "bg-red-300",
            questions: [
                {
                    question: "Làm thế nào để ghi nhận vi phạm của học sinh?",
                    answer:
                        'Vào mục "Ghi nhận sự vụ", chọn lớp, học sinh (nếu là vi phạm cá nhân), loại vi phạm, mô tả chi tiết và xác nhận. Hệ thống sẽ tự động tính điểm trừ.',
                },
                {
                    question: "Tôi có thể chỉnh sửa hoặc xóa sự vụ đã ghi nhận không?",
                    answer:
                        "Chỉ Ban Nề nếp mới có quyền chỉnh sửa hoặc xóa sự vụ đã được xác minh. Các thành viên khác chỉ có thể ghi nhận mới.",
                },
                {
                    question: "Làm thế nào để ghi nhận thành tích tốt?",
                    answer:
                        'Tương tự như ghi nhận vi phạm, nhưng chọn loại "Thành tích" và mô tả hành vi tích cực. Hệ thống sẽ tự động tính điểm cộng.',
                },
            ],
        },
        {
            category: "Chấm điểm & Xếp hạng",
            icon: <GrTrophy className='text-4xl text-yellow-500 rounded-lg bg-gray-200/50 p-2' />,
            color: "bg-yellow-400",
            questions: [
                {
                    question: "Điểm thi đua được tính như thế nào?",
                    answer:
                        "Điểm thi đua = Điểm chuẩn (thường là 100) + Điểm cộng (thành tích) - Điểm trừ (vi phạm). Mỗi loại vi phạm/thành tích có mức điểm khác nhau.",
                },
                {
                    question: "Khi nào điểm thi đua được cập nhật?",
                    answer:
                        "Điểm được cập nhật ngay sau khi sự vụ được xác minh bởi Ban Nề nếp. Bảng xếp hạng được cập nhật hàng tuần.",
                },
                {
                    question: "Làm thế nào để xem lịch sử điểm của lớp?",
                    answer:
                        'Vào mục "Báo cáo thống kê", chọn lớp và khoảng thời gian để xem chi tiết điểm số và lịch sử các sự vụ.',
                },
            ],
        },
        {
            category: "Báo cáo & Thống kê",
            icon: <GiBugleCall className='text-4xl text-green-700 rounded-lg bg-gray-200/50 p-2' />,
            color: "bg-green-300",
            questions: [
                {
                    question: "Làm thế nào để xuất báo cáo?",
                    answer:
                        'Vào mục "Báo cáo thống kê", chọn loại báo cáo, khoảng thời gian và nhấn nút "Xuất báo cáo". Báo cáo có thể xuất ra PDF hoặc Excel.',
                },
                {
                    question: "Tôi có thể xem thống kê của toàn trường không?",
                    answer:
                        "Tùy thuộc vào quyền hạn của bạn. Ban Nề nếp có thể xem toàn trường, GVCN chỉ xem được lớp mình phụ trách.",
                },
                {
                    question: "Biểu đồ thống kê hiển thị những gì?",
                    answer:
                        "Biểu đồ hiển thị xu hướng vi phạm, tỷ lệ các loại vi phạm phổ biến, so sánh điểm giữa các lớp và theo thời gian.",
                },
            ],
        },
        {
            category: "Kỹ thuật & Hỗ trợ",
            icon: <MdContactSupport className='text-4xl text-purple-500 rounded-lg bg-gray-200/50 p-2' />,
            color: "bg-purple-300",
            questions: [
                {
                    question: "Ứng dụng chạy chậm hoặc bị lỗi phải làm sao?",
                    answer:
                        "Thử đóng và mở lại ứng dụng. Nếu vẫn lỗi, vui lòng liên hệ với bộ phận kỹ thuật và mô tả chi tiết lỗi gặp phải.",
                },
                {
                    question: "Dữ liệu có được sao lưu không?",
                    answer:
                        "Có, hệ thống tự động sao lưu dữ liệu hàng ngày. Dữ liệu được lưu trữ tối thiểu 5 năm theo quy định.",
                },
                {
                    question: "Làm thế nào để liên hệ hỗ trợ kỹ thuật?",
                    answer:
                        'Vào mục Cài đặt > Liên hệ hỗ trợ hoặc gọi hotline: 1900-xxxx. Đội ngũ kỹ thuật sẽ hỗ trợ trong giờ hành chính.',
                },
            ],
        },
    ];


    return (
        <>
            <div className="flex bg-gray-50">
                <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
                <div className="flex flex-col flex-1 p-2 h-screen">
                    <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Câu hỏi thường gặp"} />
                    <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto">
                        <div>
                            <div className="relative mt-8 mb-6">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm các câu hỏi ..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                            </div>
                            <div className='flex flex-wrap  relative gap-5 w-full'>
                                <button className={`min-w-45 text-1xl flex gap-3 items-center p-2 px-5 pr-7 bg-pink-300  rounded-2xl shadow-md `}>
                                        <SiVirustotal className='text-4xl text-pink-500 rounded-lg bg-gray-200/50 p-2'/>
                                        Tất cả
                                    </button>
                                {faqData.map((Data , index) => (
                                    <button key={index} className={`min-w-50 text-1xl flex gap-3 items-center p-2 px-5 pr-7 ${Data.color} rounded-2xl shadow-md `}>
                                        {Data.icon}
                                        {Data.category}
                                    </button>
                                ))
                                }
                            </div>
                            <div className="flex flex-col max-w-5xl mx-auto bg-gray-50 shadow-md rounded-lg mt-5 gap-5 p-4">
                                {faqData.map((Data, index) => (
                                    <div key={index} className="p-6 shadow-md border-1 border-gray-200 rounded-lg ">
                                        <div  className={`${Data.color} flex items-center mb-6 p-3 rounded-lg shadow-md`}>
                                            {Data.icon}
                                            <div className="flex-1">
                                                <h2 className="text-xl font-semibold text-gray-900">{Data.category}</h2>
                                            </div>
                                            <span className="text-sm text-gray-500">{Data.questions.length} câu hỏi</span>
                                        </div>
                                        <div>
                                            {Data.questions.map((item, index) => (
                                                <FAQItem key={index} question={item.question} answer={item.answer} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FAQPage;