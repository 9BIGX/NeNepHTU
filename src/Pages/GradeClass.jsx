import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LoadingPopUp from '../ui/Loading';
function GradeClassPage({ isSidebarOpen, toggleSidebar }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [grades, setGrades] = useState([]);
  const [classes, setClasses] = useState([]);
  const [Loading, setLoading] = useState(false)


  const ApiUrl = import.meta.env.VITE_API_URL;

  const FilterCLass = (Grade) => {
    const SelectClass = classes.filter(item => item.MaKhoi === Grade);
    return SelectClass;
  }
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
        setData(result.Khoi);
        setClasses(result.ChiTiet)
        setLoading(false)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khối:", error);
      }
    }
    fetchData();
  }, [])



  return (
    <>

      <div className="flex bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
        <div className="flex flex-col flex-1 p-2 h-screen">
          <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Danh mục khối / lớp"} />
          <div className="min-h-[85vh] flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Danh mục khối / lớp</h1>
              <p className="text-gray-600 mb-6">Quản lý các khối và lớp học trong hệ thống.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow grid grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">Tổng số khoi</h2>
                <p className="text-3xl font-bold text-blue-900">{data.length}</p>
                {Loading ? <LoadingPopUp /> : ''}
                <table className='w-full mt-4 border'>
                  <thead className='bg-gray-100 '>
                    <tr>
                      <th className="px-4 py-2">Mã Khối</th>
                      <th className="px-4 py-2">Tên Khối</th>
                      <th className="px-4 py-2">Số Lớp</th>
                      <th className="px-4 py-2">Tổng học sinh</th>
                      <th className="px-4 py-2">Hành động</th>
                    </tr>
                  </thead>
                  <tbody >
                    {data && data.map((grade) => (
                      <tr className='bg-white border-t' key={grade.MaKhoi}>
                        <td className=" px-4 py-2">{grade.MaKhoi}</td>
                        <td className=" px-4 py-2">{grade.TenKhoi}</td>
                        <td className=" px-4 py-2">{grade.TongSoLop}</td>
                        <td className=" px-4 py-2">{grade.TongSoHS}</td>
                        <td className=" px-4 py-2">
                          <button className="text-blue-500 hover:underline">Sửa</button>
                          <button className="text-red-500 hover:underline ml-2">Xoá</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-green-700 mb-2">Chi tiết khói</h2>
                <select name="SelectGrade" id="" className='w-full p-2 border border-gray-300 rounded-lg mb-4 bg-white' value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                  <option value="">Tất cả khối</option>
                  {data.map((grade) => (
                    <option key={grade.MaKhoi} value={grade.MaKhoi}>
                      {grade.TenKhoi}
                    </option>
                  ))}
                </select>
                {Loading ? <LoadingPopUp /> : ''}
                <table className='w-full border'>
                  <thead className='bg-gray-100 '>
                    <tr>
                      <th className="px-4 py-2">Mã Lớp</th>
                      <th className="px-4 py-2">Tên Lớp</th>
                      <th className="px-4 py-2">Tên Giáo viên</th>
                      <th className="px-4 py-2">Tổng học sinh</th>
                      <th className="px-4 py-2">Năm học</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(!selectedGrade) && classes && classes.map((Class) => (
                      <tr key={Class.MaLop} className='bg-white border-t'>
                        <td className=" px-4 py-2">{Class.MaLop}</td>
                        <td className=" px-4 py-2">{Class.TenLop}</td>
                        <td className=" px-4 py-2">{Class.TenGV}</td>
                        <td className=" px-4 py-2">{Class.TongSoHS}</td>
                        <td className=" px-4 py-2">{Class.NamHoc}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tbody>
                    {(selectedGrade) && selectedClass.map((Class) => (
                      <tr key={Class.MaLop} className='bg-white border-t'>
                        <td className=" px-4 py-2">{Class.MaLop}</td>
                        <td className=" px-4 py-2">{Class.TenLop}</td>
                        <td className=" px-4 py-2">{Class.TenGV}</td>
                        <td className=" px-4 py-2">{Class.TongSoHS}</td>
                        <td className=" px-4 py-2">{Class.NamHoc}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default GradeClassPage;