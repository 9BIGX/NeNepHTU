import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaEdit, FaTrashAlt, FaPlus, FaSave } from 'react-icons/fa';

// Giả định dữ liệu ban đầu
const initialLocations = [
  { MaDD: 'DD01', TenDD: 'Phòng học 101' },
  { MaDD: 'DD02', TenDD: 'Sân bóng đá' },
  { MaDD: 'DD03', TenDD: 'Phòng thí nghiệm' },
  { MaDD: 'DD04', TenDD: 'Thư viện' },
];

const LocationTable = ({isSidebarOpen , toggleSidebar}) => {
  const [data, setData] = useState(initialLocations);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLocation, setNewLocation] = useState({ MaDD: '', TenDD: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation({ ...newLocation, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newLocation.MaDD || !newLocation.TenDD) {
      alert('Mã Địa điểm và Tên Địa điểm không được để trống.');
      return;
    }
    setData([...data, newLocation]);
    setNewLocation({ MaDD: '', TenDD: '' });
    setShowAddForm(false);
  };

  const handleEdit = (MaDD) => {
    alert(`Bạn muốn sửa địa điểm có mã: ${MaDD}`);
  };

  const handleDelete = (MaDD) => {
    const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa địa điểm có mã: ${MaDD}?`);
    if (isConfirmed) {
      setData(data.filter((item) => item.MaDD !== MaDD));
      alert(`Đã xóa địa điểm: ${MaDD}`);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
      <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
      <div className="flex flex-col flex-1 z-2">
        <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Danh mục địa điểm"} />
        <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
          {/* content */}

          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Bổ sung các địa điểm thường dùng </h1>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors duration-200 flex items-center text-md"
              >
                <FaPlus className="mr-2" /> Thêm địa điểm
              </button>
            </div>

            {showAddForm && (
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-xl font-semibold mb-3">Thêm Địa Điểm Mới</h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="MaDD"
                    value={newLocation.MaDD}
                    onChange={handleInputChange}
                    placeholder="Mã Địa điểm"
                    className="p-2 border border-gray-300 rounded text-md"
                    required
                  />
                  <input
                    type="text"
                    name="TenDD"
                    value={newLocation.TenDD}
                    onChange={handleInputChange}
                    placeholder="Tên Địa điểm"
                    className="p-2 border border-gray-300 rounded text-md"
                    required
                  />
                  <div className="col-span-1 md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center text-md"
                    >
                      <FaSave className="mr-2" /> Lưu
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full table-auto text-md">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left">Mã Địa điểm</th>
                    <th className="py-3 px-6 text-left">Tên Địa điểm</th>
                    <th className="py-3 px-6 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {data.map((item, index) => (
                    <tr
                      key={item.MaDD}
                      className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? '' : 'bg-gray-50'
                        }`}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">{item.MaDD}</td>
                      <td className="py-3 px-6 text-left">{item.TenDD}</td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(item.MaDD)}
                            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                            title="Sửa"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.MaDD)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200"
                            title="Xóa"
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
        </div>
      </div>
    </div>
  );
};

export default LocationTable;