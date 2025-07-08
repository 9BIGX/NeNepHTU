import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaEdit, FaTrash } from 'react-icons/fa';
import StudentData from '../data/Student';
function StudentCRUD({ isSidebarOpen, toggleSidebar }) {

    const [data, setData] = useState(StudentData);
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

    const getAllClasses = () => {
        const result = [];
        Object.entries(data).forEach(([grade, classes]) => {
            Object.keys(classes).forEach((className) => {
                result.push(`${grade}-${className}`); // ví dụ: "10-10A1"
            });
        });
        return result;
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




    const handleAddOrEdit = () => {
        if (!grade || !className || !studentId || !studentName) {
            alert('Vui lòng nhập đầy đủ Khối, Lớp, Mã và Tên học sinh');
            return;
        }

        const updatedData = { ...data };

        if (!updatedData[grade]) updatedData[grade] = {};
        if (!updatedData[grade][className]) updatedData[grade][className] = [];

        const newStudent = {
            id: studentId,
            name: studentName,
            score: parseFloat(score) || 0
        };

        if (isEditing) {
            updatedData[editInfo.grade][editInfo.className][editInfo.index] = newStudent;
            setIsEditing(false);
        } else {
            updatedData[grade][className].push(newStudent);
        }

        setData(updatedData);
        setGrade('');
        setClassName('');
        setStudentId('');
        setStudentName('');
        setScore('');
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setGrade('');
        setClassName('');
        setStudentId('');
        setStudentName('');
        setScore('');
    };

    const handleEdit = (g, c, index) => {
        const student = data[g][c][index];
        setStudentId(student.id);
        setStudentName(student.name);
        setGrade(g);
        setClassName(c);
        setIsEditing(true);
        setEditInfo({ grade: g, className: c, index });
        setScore(student.score.toString());
    };

    const handleDelete = (g, c, index) => {
        const updatedData = { ...data };
        updatedData[g][c].splice(index, 1);
        if (updatedData[g][c].length === 0) delete updatedData[g][c];
        if (Object.keys(updatedData[g]).length === 0) delete updatedData[g];
        setData(updatedData);
    };

    const filteredStudents = () => {
        const results = [];
        Object.entries(data).forEach(([g, classes]) => {
            Object.entries(classes).forEach(([c, students]) => {
                const fullClass = `${g}-${c}`;
                if (filterClass && filterClass !== fullClass) return;

                students.forEach((s, index) => {
                    const searchLower = searchTerm.toLowerCase();
                    const matchesSearch =
                        s.id.toLowerCase().includes(searchLower) ||
                        s.name.toLowerCase().includes(searchLower);
                    if (!searchTerm || matchesSearch) {
                        results.push({ ...s, grade: g, className: c, index });
                    }
                });
            });
        });
        return results;
    };


    return (
        <>
            <div className="flex bg-gray-50">
                <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
                <div className="flex flex-col flex-1 p-2 h-screen">
                    <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Danh mục học sinh"} />
                    <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
                        <div className="min-h-screen bg-gray-100 p-6">
                            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-2xl font-bold text-purple-700 mb-4">Quản lý học sinh</h2>

                                {/* Form nhập */}
                                <div className="flex flex-wrap gap-4 mb-4 w-full ">
                                    <input
                                        type="text"
                                        placeholder="Khối (VD: 10)"
                                        value={grade}
                                        onChange={(e) => setGrade(e.target.value)}
                                        className="border p-2 rounded-md  min-w-40"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Lớp (VD: 10A1)"
                                        value={className}
                                        onChange={(e) => setClassName(e.target.value)}
                                        className="border p-2 rounded-md  min-w-45"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Mã học sinh"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                        className="border p-2 rounded-md  min-w-45"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Tên học sinh"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        className="border p-2 rounded-md  min-w-45"
                                    />
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="100"
                                        placeholder="Tổng điểm nề nếp"
                                        value={score || ''}
                                        onChange={(e) => setScore(e.target.value)}
                                        className="border p-2 rounded-md  min-w-45"
                                    />

                                </div>
                                {isEditing ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={handleAddOrEdit}
                                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                                        >
                                            Cập nhật học sinh
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                                        >
                                            Huỷ chỉnh sửa
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleAddOrEdit}
                                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                                    >
                                        Thêm học sinh
                                    </button>
                                )}

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
                                    <div className="mt-4 flex items-center gap-2">
                                        <label className="font-semibold">Lọc theo lớp:</label>
                                        <select
                                            value={filterClass}
                                            onChange={(e) => setFilterClass(e.target.value)}
                                            className="border p-2 rounded-md"
                                        >
                                            <option value="">-- Tất cả lớp --</option>
                                            {getAllClasses().map((cls) => (
                                                <option key={cls} value={cls}>
                                                    {cls}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>

                                {/* Danh sách */}
                                <div className="mt-6">
                                    {searchTerm || filterClass ? (
                                        <>
                                            <h3 className="text-lg font-bold text-gray-700 mb-2">Kết quả tìm kiếm:</h3>
                                            <table className="w-full text-lg border">
                                                <thead className="bg-gray-200">
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
                                                        <th className="p-2 text-right">Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getSortedStudents(filteredStudents()).map((s, i) => (
                                                        <tr key={i} className="border-t">
                                                            <td className="p-2">{s.id}</td>
                                                            <td className="p-2">{s.name}</td>
                                                            <td className="p-2">{s.grade}</td>
                                                            <td className="p-2">{s.className}</td>
                                                            <td className="p-2 text-center">{s.score}</td>
                                                            <td className="p-2 text-right space-x-2">
                                                                <button
                                                                    onClick={() => handleEdit(s.grade, s.className, s.index)}
                                                                    className="text-blue-600 hover:text-blue-800"
                                                                    title="Sửa"
                                                                >
                                                                    <FaEdit />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(s.grade, s.className, s.index)}
                                                                    className="text-red-600 hover:text-red-800"
                                                                    title="Xóa"
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>
                                    ) : (
                                        Object.entries(data).map(([g, classes]) => (
                                            <div key={g} className="mb-6  p-4 rounded-lg shadow-md border border-gray-300">
                                                <h3 className="text-xl font-bold text-gray-700 mb-2">Khối {g}</h3>
                                                {Object.entries(classes).map(([c, students]) => (
                                                    <div key={c} className="mb-4 border-t border-gray-300 pt-2">
                                                        <h4 className="font-semibold text-gray-600 mb-3">Lớp {c}</h4>
                                                        <table className="w-full text-md border">
                                                            <thead className="bg-gray-200">
                                                                <tr>
                                                                    <th className="p-2 cursor-pointer" onClick={() => handleSort('id')}>
                                                                        Mã {renderSortIcon('id')}
                                                                    </th>
                                                                    <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>
                                                                        Tên {renderSortIcon('name')}
                                                                    </th>
                                                                    <th className="p-2 cursor-pointer text-center" onClick={() => handleSort('score')}>
                                                                        Tổng điểm {renderSortIcon('score')}
                                                                    </th>
                                                                    <th className="p-2 text-right">Hành động</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {getSortedStudents(students).map((s, index) => (
                                                                    <tr key={index} className="border-t">
                                                                        <td className="p-2">{s.id}</td>
                                                                        <td className="p-2">{s.name}</td>
                                                                        <td className="p-2 text-center">{s.score}</td>
                                                                        <td className="p-2 text-right space-x-2">
                                                                            <button
                                                                                onClick={() => handleEdit(g, c, index)}
                                                                                className="text-blue-600 hover:text-blue-800"
                                                                                title="Sửa"
                                                                            >
                                                                                <FaEdit />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDelete(g, c, index)}
                                                                                className="text-red-600 hover:text-red-800"
                                                                                title="Xóa"
                                                                            >
                                                                                <FaTrash />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ))}
                                            </div>
                                        ))
                                    )}
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