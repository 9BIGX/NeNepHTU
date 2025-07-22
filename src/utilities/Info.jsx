import React from 'react';
import { FaUsers, FaShieldAlt, FaBook, FaCheckCircle } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';


const features = [
    {
        icon: <FaUsers className="text-purple-600 text-3xl" />,
        title: 'Quản lý học sinh',
        desc: 'Theo dõi vi phạm, phân loại lớp, cập nhật thông tin học sinh dễ dàng.'
    },
    {
        icon: <FaShieldAlt className="text-purple-600 text-3xl" />,
        title: 'Chấm điểm nề nếp',
        desc: 'Ghi nhận điểm cộng/trừ nề nếp theo từng buổi và từng vi phạm cụ thể.'
    },
    {
        icon: <FaBook className="text-purple-600 text-3xl" />,
        title: 'Thống kê và báo cáo',
        desc: 'Xuất báo cáo vi phạm theo tuần, tháng, học kỳ để gửi Ban giám hiệu.'
    },
    {
        icon: <FaCheckCircle className="text-purple-600 text-3xl" />,
        title: 'Xét hạnh kiểm',
        desc: 'Tự động tổng hợp dữ liệu vi phạm để đề xuất mức hạnh kiểm cuối kỳ.'
    }
];

const DisciplineIntroPage = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div className="flex bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
            <div className="flex flex-col flex-1 p-2 h-screen">
                <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Về hệ thống"} />
                <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">

                    <div className=" bg-gray-50 py-10 px-4 rounded-2xl">
                        <div className="max-w-6xl mx-auto">
                            <section className="text-center mb-12">
                                <h1 className="text-4xl font-bold text-purple-700 mb-4">Hệ thống quản lý nề nếp học sinh</h1>
                                <p className="text-gray-600 text-lg">
                                    Nền tảng giúp nhà trường quản lý, chấm điểm và đánh giá hành vi nề nếp học sinh một cách chính xác, công bằng và hiện đại.
                                </p>
                            </section>

                            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                                {features.map((f, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-md transition duration-200"
                                    >
                                        <div className="mb-4">{f.icon}</div>
                                        <h3 className="text-2xl font-semibold mb-2 text-gray-800">{f.title}</h3>
                                        <p className="text-gray-600 text-lg">{f.desc}</p>
                                    </div>
                                ))}
                            </section>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-start '>
                                <section className="bg-white rounded-xl shadow p-6 mb-12 ">
                                    <h2 className="flex gap-5 text-2xl font-bold text-purple-700 mb-4">{features[3].icon} Phiên bản hiện tại</h2>
                                    <ul className="flex flex-col gap-2 list-disc pl-6 text-gray-700 text-lg">
                                        <ul>✅ Phiên bản: <strong>v1.0.0</strong></ul>
                                        <ul>✅ Cập nhật gần nhất: 08/07/2025</ul>
                                        <ul>✅ Thêm chức năng sắp xếp, lọc lớp, chỉnh sửa thông tin học sinh.</ul>
                                        <ul>🕒 Sắp tới: Thêm tính năng điểm danh và đánh giá theo tiêu chí mềm.</ul>
                                    </ul>
                                </section>

                                <section className="bg-white rounded-xl shadow p-6 mb-12">
                                    <h2 className="flex gap-5 text-2xl font-bold text-purple-700 mb-4">{features[2].icon} Chính sách & cam kết</h2>
                                    <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
                                        <ul>✅ Dữ liệu học sinh được bảo mật và chỉ có giáo viên/ban giám hiệu có quyền truy cập.</ul>
                                        <ul>✅ Không chia sẻ dữ liệu với bên thứ ba.</ul>
                                        <ul>✅ Mọi hành vi truy cập trái phép sẽ được ghi lại và cảnh báo.</ul>
                                        <ul>✅ Hệ thống sẽ cập nhật định kỳ để cải tiến tính năng và bảo mật.</ul>
                                    </ul>
                                </section>
                            </div>
                                <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisciplineIntroPage;
