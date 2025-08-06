import React, { useState, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import StudentData from '../data/Student';
import StudentPopup from '../ui/studentpopup';
import { useNavigate } from 'react-router-dom';
import { FaFileImport } from 'react-icons/fa';
import LoadingPopUp from '../ui/Loading';
function StudentCRUD({ isSidebarOpen, toggleSidebar }) {
    const ApiUrl = import.meta.env.VITE_API_URL
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [filterClass, setFilterClass] = useState('');
    const [grade, setGrade] = useState('');
    const [className, setClassName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [score, setScore] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editInfo, setEditInfo] = useState({ grade: '', className: '', index: -1 });
    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(false); // ตัวแปรโหลด

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const res = await fetch(ApiUrl + '/api/GetStudents', {
                    method: 'POST',
                    credentials: 'include', // đoạn này tự động lấy cookie (dành cho web)
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const result = await res.json();
                setData(result);
                setLoading(false)

            } catch (error) {
                console.error("Fetch error:", error);
            }
        };


        fetchData();
    }, []);
    const navigate = useNavigate();


    const handleOpenPopup = async (studentIndex) => {
        const Student = data[studentIndex].MaHS
        try {
            const res = await fetch(ApiUrl + '/api/GetStudentInfo', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ MaHS: Student }),
            })

            const result = await res.json()
            setSelectedStudent(result);
            setShowPopup(true);
        }
        catch (err) {
            console.log('Error', err.message)
        }
    };

    const handleEditInfo = (studentData) => {
        console.log("Chỉnh sửa học sinh:", studentData);
        // Mở form chỉnh sửa hoặc chuyển trang
        setShowPopup(false);
    };

    const saveData = (newForm) => {
        const newData = newForm
        const _data = [...data]
        const index = data.findIndex(studentId => studentId.MaHS === newData.MaHS);
        if (index !== -1) {
            _data[index] = newData;
            setData(_data)
        }

    }
    const getAllClasses = () => {
        return Array.from(
            new Set(
                data
                    .filter(s => s.TenKhoi && s.MaLop)
                    .map(s => `${s.TenKhoi.replace('Khối ', '')}-${s.MaLop}`)
            )
        );
    };


    const getSortedStudents = (students) => {
        if (!sortConfig.key) return students;

        return [...students].sort((a, b) => {
            let aVal = a[sortConfig.key];
            let bVal = b[sortConfig.key];

            if (typeof aVal === 'string') aVal = aVal.toLowerCase();
            if (typeof bVal === 'string') bVal = bVal.toLowerCase();

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return '⇅';
        return sortConfig.direction === 'asc' ? '▲' : '▼';
    };

    const removeAccents = (str) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    };

    const filteredStudents = () => {
        const searchLower = removeAccents(searchTerm.toLowerCase());

        return data
            .map((s, index) => ({ ...s, index })) // thêm index cho việc edit/delete
            .filter((s) => {
                const fullClass = `${s.TenKhoi.replace('Khối ', '')}-${s.MaLop}`;
                if (filterClass && filterClass !== fullClass) return false;

                const nameNoAccent = removeAccents(s.TenHS.toLowerCase());
                const idNoAccent = removeAccents(s.MaHS.toLowerCase());

                const matchesSearch =
                    !searchTerm || idNoAccent.includes(searchLower) || nameNoAccent.includes(searchLower);

                return matchesSearch;
            });
    };


    const RenderTable = () => {
        const grouped = {};

        data.forEach((s, index) => {
            const khoi = s.TenKhoi;
            const lop = s.TenLop;

            if (!grouped[khoi]) grouped[khoi] = {};
            if (!grouped[khoi][lop]) grouped[khoi][lop] = [];

            grouped[khoi][lop].push({ ...s, index });
        });


        if (loading) return(<LoadingPopUp/>)

        return Object.entries(grouped).map(([khoi, classes]) => (
            <div key={khoi} className="mb-6 p-4 rounded-lg shadow-md border border-gray-300">
                <h3 className="text-xl font-bold text-gray-700 mb-2">{khoi}</h3>
                {Object.entries(classes).map(([lop, students]) => (
                    <div key={lop} className="mb-4 border-t border-gray-300 pt-2">
                        <h4 className="font-semibold text-gray-600 mb-3">{lop}</h4>
                        <table className="w-full text-lg border">
                            <thead className="bg-blue-200 border">
                                <tr>
                                    <th className="p-2">Mã</th>
                                    <th className="p-2">Tên</th>
                                    <th className="p-2 text-center">Tổng điểm</th>
                                    <th className="p-2 text-center">Xếp Loại</th>
                                    <th className="p-2 text-right">Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s, i) => (
                                    <tr key={i} className="border-t">
                                        <td className="p-2">{s.MaHS}</td>
                                        <td className="p-2">{s.TenHS}</td>
                                        <td className="p-2 text-center">{s.TongDiem}</td>
                                        <td className="p-2 text-center">{s.XepLoai}</td>
                                        <td className="p-2 text-right space-x-2">
                                            <button
                                                onClick={() => handleOpenPopup(s.index)}
                                                className=" mr-3 text-blue-600 hover:text-blue-800"
                                                title="Xem thông tin chi tiết"
                                            >
                                                <GiHamburgerMenu />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        ));
    }

    return (
        <>
            {showPopup && (
                <StudentPopup
                    student={selectedStudent}
                    onClose={() => setShowPopup(false)}
                    onEdit={handleEditInfo}
                    onSave={saveData}
                />
            )}
            <div className="flex bg-gray-50">
                <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
                <div className="flex flex-col flex-1 p-2 h-screen">
                    <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Danh mục học sinh"} />
                    <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
                        <div className="min-h-screen bg-gray-100 p-6">
                            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-2xl font-bold text-purple-700 mb-4">Quản lý học sinh</h2>
                                {/* Search */}
                                <div className="mt-6">
                                    <input
                                        type="text"
                                        placeholder="🔍 Tìm theo tên hoặc mã học sinh..."
                                        className={`w-full border p-2 rounded-md ${searchTerm || filterClass ? 'border-purple-500 ring-1 ring-purple-300' : ''
                                            }`}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <div className='flex items-center justify-between '>
                                        <div className="mt-4 flex items-center gap-2">
                                            <label className="font-semibold">Lọc theo lớp:</label>
                                            <select
                                                value={filterClass}
                                                onChange={(e) => setFilterClass(e.target.value)}
                                                className="border p-2 rounded-md"
                                            >
                                                <option value="">Tất cả lớp</option>
                                                {getAllClasses().map((cls) => (
                                                    <option key={cls} value={cls}>
                                                        {cls}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-center mt-4 ">
                                            <button
                                                onClick={() => navigate('/import')}
                                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
                                            >
                                                <FaFileImport />
                                                Import / Cập nhật Danh sách
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Danh sách */}
                                <div className="mt-6">
                                    {searchTerm || filterClass ? (
                                        <>
                                            <h3 className="text-lg font-bold text-gray-700 mb-2">Kết quả tìm kiếm:</h3>
                                            <table className="w-full text-lg border">
                                                <thead className="bg-blue-200">
                                                    <tr>
                                                        <th className="p-2 cursor-pointer" onClick={() => handleSort('id')}>
                                                            Mã {renderSortIcon('id')}
                                                        </th>
                                                        <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>
                                                            Tên {renderSortIcon('name')}
                                                        </th>
                                                        <th className="p-2">Khối</th>
                                                        <th className="p-2">Lớp</th>
                                                        <th className="p-2 cursor-pointer text-center" onClick={() => handleSort('score')}>
                                                            Tổng điểm {renderSortIcon('score')}
                                                        </th>
                                                        <th className='p-2'>Xếp loại</th>
                                                        <th className="p-2 text-right">Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getSortedStudents(filteredStudents()).map((s, i) => (
                                                        <tr key={i} className="border-t">
                                                            <td className="p-2">{s.MaHS}</td>
                                                            <td className="p-2">{s.TenHS}</td>
                                                            <td className="p-2">{s.TenKhoi}</td>
                                                            <td className="p-2">{s.TenLop}</td>
                                                            <td className="p-2 text-center">{s.TongDiem}</td>
                                                            <td className="p-2">{s.XepLoai}</td>
                                                            <td className="p-2 text-right space-x-2">
                                                                <button
                                                                    onClick={() => handleOpenPopup(s.index)}
                                                                    className=" mr-3 text-blue-600 hover:text-blue-800"
                                                                    title="Xem thông tin chi tiết"
                                                                >
                                                                    <GiHamburgerMenu />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>
                                    ) : (
                                        RenderTable()
                                    )
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentCRUD;
