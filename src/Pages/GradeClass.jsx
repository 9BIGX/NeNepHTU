import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LoadingPopUp from '../ui/Loading';
import { FaEdit, FaTrashAlt, FaPlus, FaSave } from 'react-icons/fa';
function GradeClassPage({ isSidebarOpen, toggleSidebar }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [grades, setGrades] = useState([]);
  const [classes, setClasses] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [showAddGradeForm, setShowAddGradeForm] = useState(false);
  const [showAddClassForm, setShowAddClassForm] = useState(false);

  const [newGrade, setNewGrade] = useState({
    MaKhoi: '',
    TenKhoi: '',
    TongSoLop: 0,
    TongSoHS: 0,
  });

  const [newClass, setNewClass] = useState({
    MaKhoi: '',
    MaLop: '',
    TenLop: '',
    TenGV: '',
    TongSoHS: 0,
    NamHoc: '2025-2026',
  });


  const ApiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const SelectClass = classes.filter(item => item.MaKhoi === selectedGrade);
    setSelectedClass(SelectClass)
    console.log(SelectClass)
  }, [selectedGrade])


  useEffect(() => {
    setLoading(false)
    const fetchData = async () => {
      try {
        const res = await fetch(ApiUrl + '/api/GetKhoi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const result = await res.json();
        setGrades(result.Khoi);
        setClasses(result.ChiTiet)
        setLoading(false)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khối:", error);
      }
    }
    fetchData();
  }, [])

  const handleAddGrade = (e) => {
    e.preventDefault();
    if (!newGrade.MaKhoi || !newGrade.TenKhoi) {
      alert('Mã Khối và Tên Khối không được để trống.');
      return;
    }
    setGrades([...grades, newGrade]);
    setNewGrade({ MaKhoi: '', TenKhoi: '', TongSoLop: 0, TongSoHS: 0 });
    setShowAddGradeForm(false);
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    if (!newClass.MaKhoi || !newClass.MaLop || !newClass.TenLop) {
      alert('Mã Khối, Mã Lớp và Tên Lớp không được để trống.');
      return;
    }

    // 1. Cập nhật danh sách lớp
    // Sử dụng callback function để đảm bảo state được cập nhật dựa trên giá trị mới nhất
    setClasses(prevClasses => [...prevClasses, newClass]);

    // 2. Cập nhật danh sách khối
    setGrades(prevGrades => {
      // Dùng map để tạo một mảng mới thay vì thay đổi mảng cũ
      return prevGrades.map(grade => {
        // Tìm khối tương ứng với lớp vừa được thêm
        if (grade.MaKhoi === newClass.MaKhoi) {
          // Trả về một object mới với số lớp được cập nhật
          return { ...grade, TongSoLop: grade.TongSoLop + 1 , 
            TongSoHS: Number(grade.TongSoHS) + Number(newClass.TongSoHS) };
        }
        // Với các khối khác, giữ nguyên
        return grade;
      });
    });

    // 3. Reset form và đóng form
    setNewClass({ MaKhoi: '', MaLop: '', TenLop: '', TenGV: '', TongSoHS: 0, NamHoc: '2025-2026' });
    setShowAddClassForm(false);
  };
  const getFilteredClasses = () => {
    if (selectedGrade) {
      return classes.filter(cls => cls.MaKhoi === selectedGrade);
    }
    return classes;
  };



  return (
    <>
      <div className="flex bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
        <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
        <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
        <div className="flex flex-col flex-1 z-2">
          <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Danh mục khối / lớp"} />
          <div className="min-h-[85vh] flex flex-col mt-4 p-5 rounded-lg overflow-y-auto ">
            <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Card Tổng số khối */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-blue-700">Tổng số khối</h2>
                  <button
                    onClick={() => setShowAddGradeForm(!showAddGradeForm)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
                  >
                    <FaPlus className="mr-2" /> Thêm Khối
                  </button>
                </div>
                <p className="text-4xl font-extrabold text-blue-900 mb-4">{grades.length}</p>

                {showAddGradeForm && (
                  <div className="bg-white p-4 rounded-lg shadow-inner mb-4">
                    <h3 className="text-lg font-semibold mb-2">Thêm Khối Mới</h3>
                    <form onSubmit={handleAddGrade} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="MaKhoi"
                        value={newGrade.MaKhoi}
                        onChange={(e) => setNewGrade({ ...newGrade, MaKhoi: e.target.value })}
                        placeholder="Mã Khối"
                        className="p-2 border border-gray-300 rounded text-md"
                        required
                      />
                      <input
                        type="text"
                        name="TenKhoi"
                        value={newGrade.TenKhoi}
                        onChange={(e) => setNewGrade({ ...newGrade, TenKhoi: e.target.value })}
                        placeholder="Tên Khối"
                        className="p-2 border border-gray-300 rounded text-md"
                        required
                      />
                      <div className="col-span-1 md:col-span-2 flex justify-end">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
                        >
                          <FaSave className="mr-2" /> Lưu
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full table-auto text-md">
                    <thead className="bg-blue-200 text-blue-800 uppercase">
                      <tr>
                        <th className="px-4 py-3 text-left">Mã Khối</th>
                        <th className="px-4 py-3 text-left">Tên Khối</th>
                        <th className="px-4 py-3 text-center">Số Lớp</th>
                        <th className="px-4 py-3 text-center">Tổng học sinh</th>
                        <th className="px-4 py-3 text-center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                      {grades.map((grade) => (
                        <tr
                          className='bg-white border-t border-gray-200 hover:bg-gray-100 transition-colors duration-200'
                          key={grade.MaKhoi}
                        >
                          <td className="px-4 py-2">{grade.MaKhoi}</td>
                          <td className="px-4 py-2">{grade.TenKhoi}</td>
                          <td className="px-4 py-2 text-center">{grade.TongSoLop}</td>
                          <td className="px-4 py-2 text-center">{grade.TongSoHS}</td>
                          <td className="px-4 py-2 text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => alert(`Sửa khối: ${grade.MaKhoi}`)}
                                className="text-blue-500 hover:text-blue-700"
                                title="Sửa"
                              >
                                <FaEdit size={16} />
                              </button>
                              <button
                                onClick={() => alert(`Xóa khối: ${grade.MaKhoi}`)}
                                className="text-red-500 hover:text-red-700"
                                title="Xoá"
                              >
                                <FaTrashAlt size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card Chi tiết lớp học */}
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-green-700">Chi tiết lớp học</h2>
                  <button
                    onClick={() => setShowAddClassForm(!showAddClassForm)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center"
                  >
                    <FaPlus className="mr-2" /> Thêm Lớp
                  </button>
                </div>

                {showAddClassForm && (
                  <div className="bg-white p-4 rounded-lg shadow-inner mb-4">
                    <h3 className="text-lg font-semibold mb-2">Thêm Lớp Mới</h3>
                    <form onSubmit={handleAddClass} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <select
                        name="MaKhoi"
                        value={newClass.MaKhoi}
                        onChange={(e) => setNewClass({ ...newClass, MaKhoi: e.target.value })}
                        className="p-2 border border-gray-300 rounded text-md"
                        required
                      >
                        <option value="">-- Chọn Khối --</option>
                        {grades.map((grade) => (
                          <option key={grade.MaKhoi} value={grade.MaKhoi}>{grade.TenKhoi}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="MaLop"
                        value={newClass.MaLop}
                        onChange={(e) => setNewClass({ ...newClass, MaLop: e.target.value })}
                        placeholder="Mã Lớp"
                        className="p-2 border border-gray-300 rounded text-md"
                        required
                      />
                      <input
                        type="text"
                        name="TenLop"
                        value={newClass.TenLop}
                        onChange={(e) => setNewClass({ ...newClass, TenLop: e.target.value })}
                        placeholder="Tên Lớp"
                        className="p-2 border border-gray-300 rounded text-md"
                        required
                      />
                      <input
                        type="text"
                        name="TenGV"
                        value={newClass.TenGV}
                        onChange={(e) => setNewClass({ ...newClass, TenGV: e.target.value })}
                        placeholder="Tên Giáo viên"
                        className="p-2 border border-gray-300 rounded text-md"
                      />
                      <input
                        type="number"
                        name="TongSoHS"
                        value={newClass.TongSoHS}
                        onChange={(e) => setNewClass({ ...newClass, TongSoHS: e.target.value })}
                        placeholder="Tổng số học sinh"
                        className="p-2 border border-gray-300 rounded text-md"
                      />
                      <div className="col-span-1 md:col-span-2 flex justify-end">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
                        >
                          <FaSave className="mr-2" /> Lưu
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <select
                  name="SelectGrade"
                  id="grade-select"
                  className='w-full p-2 border border-gray-300 rounded-lg mb-4 bg-white text-md'
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                >
                  <option value="">Tất cả khối</option>
                  {grades.map((grade) => (
                    <option key={grade.MaKhoi} value={grade.MaKhoi}>
                      {grade.TenKhoi}
                    </option>
                  ))}
                </select>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className='min-w-full table-auto text-md'>
                    <thead className='bg-green-200 text-green-800 uppercase'>
                      <tr>
                        <th className="px-4 py-3 text-left">Mã Lớp</th>
                        <th className="px-4 py-3 text-left">Tên Lớp</th>
                        <th className="px-4 py-3 text-left">Tên Giáo viên</th>
                        <th className="px-4 py-3 text-center">Tổng học sinh</th>
                        <th className="px-4 py-3 text-left">Năm học</th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                      {getFilteredClasses().map((cls) => (
                        <tr
                          key={cls.MaLop}
                          className='bg-white border-t border-gray-200 hover:bg-gray-100 transition-colors duration-200'
                        >
                          <td className="px-4 py-2">{cls.MaLop}</td>
                          <td className="px-4 py-2">{cls.TenLop}</td>
                          <td className="px-4 py-2">{cls.TenGV}</td>
                          <td className="px-4 py-2 text-center">{cls.TongSoHS}</td>
                          <td className="px-4 py-2">{cls.NamHoc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default GradeClassPage;