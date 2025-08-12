import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaEdit, FaTrashAlt, FaPlus, FaSave } from 'react-icons/fa';
import CriteriaData from '../data/Criteria';
import AchievementData from '../data/Achievement';

const CriteriaAchievementPage = ({ isSidebarOpen, toggleSidebar }) => {
  const [initialAchievementGroups, setinitialAchievementGroups] = useState([
    { MaNhom: 'NTT01', TenNhom: 'Học tập', MoTa: 'Thành tích về học tập', TrangThai: 'Hoạt động' },
    { MaNhom: 'NTT02', TenNhom: 'Thể thao', MoTa: 'Thành tích về thể dục thể thao', TrangThai: 'Hoạt động' },
    { MaNhom: 'NTT03', TenNhom: 'Văn nghệ', MoTa: 'Thành tích về văn hóa văn nghệ', TrangThai: 'Hoạt động' },
    { MaNhom: 'NTT04', TenNhom: 'Hoạt động xã hội', MoTa: 'Thành tích về hoạt động xã hội', TrangThai: 'Hoạt động' },
    { MaNhom: 'NTT05', TenNhom: 'Kỹ năng sống', MoTa: 'Thành tích về kỹ năng sống', TrangThai: 'Hoạt động' },
  ]);

  const [initialDetailData, setInitialDetailData] = useState([
    { MaLoai: 'TT01', TenLoai: 'Giải Nhất Toán', LoiMoTa: 'Đạt giải Nhất Toán', DiemCong: 10, MaNhom: 'NTT01', TenNhom: 'Học tập', CapDo: 'Tỉnh/Thành phố', TrangThai: 'Hoạt động' },
    { MaLoai: 'TT02', TenLoai: 'HCV Bóng đá', LoiMoTa: 'Huy chương vành bóng đá', DiemCong: 8, MaNhom: 'NTT02', TenNhom: 'Thể thao', CapDo: 'Quận/Huyện', TrangThai: 'Hoạt động' },
    { MaLoai: 'TT03', TenLoai: 'Học sinh giỏi', LoiMoTa: 'Đạt danh hiệu học sinh giỏi', DiemCong: 15, MaNhom: 'NTT01',  TenNhom: 'Học tập', CapDo: 'Trường', TrangThai: 'Hoạt động' },
    { MaLoai: 'TT04', TenLoai: 'Tình nguyện viên xuất sắc', LoiMoTa: 'Tham gia tích cực công tác tình nguyện', DiemCong: 5, MaNhom: 'NTT04', TenNhom: 'Hoạt động xã hội', CapDo: 'Trường', TrangThai: 'Hoạt động' },
    { MaLoai: 'TT05', TenLoai: 'Lớp trưởng gương mẫu', LoiMoTa: 'Thực hiện tốt các nhiệm vụ của lớp trưởng', DiemCong: 3, MaNhom: 'NTT05', TenNhom: 'Kỹ năng sống', CapDo: 'Lớp', TrangThai: 'Hoạt động' },
  ])

  const [form, setForm] = useState({ type: 'Tiêu chí', level: 'Lớp', name: '', point: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddGroupForm, setShowAddGroupForm] = useState(false);
  const [newGroup, setNewGroup] = useState({
    MaNhom: '',
    TenNhom: '',
    MoTa: '',
    TrangThai: 'Hoạt động',
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    MaLoai: '',
    TenLoai: '',
    LoiMoTa: '',
    DiemCong: 0,
    MaNhom: '',
    CapDo: '',
    TrangThai: 'Hoạt động',
  });

  const handleInputGroupChange = (e) => {
    const { name, value } = e.target;
    setNewGroup({ ...newGroup, [name]: value });
  };

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!newGroup.MaNhom || !newGroup.TenNhom) {
      alert('Mã Nhóm và Tên Nhóm không được để trống.');
      return;
    }
    setinitialAchievementGroups([...initialAchievementGroups, newGroup]);
    setNewGroup({ MaNhom: '', TenNhom: '', MoTa: '', TrangThai: 'Hoạt động' });
    setShowAddGroupForm(false);
  };

  const handleEdit = (MaNhom) => {
    alert(`Bạn muốn sửa nhóm thành tích có mã: ${MaNhom}`);
  };

  const handleGroupDelete = (MaNhom) => {
    const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa nhóm thành tích có mã: ${MaNhom}?`);
    if (isConfirmed) {
      setinitialAchievementGroups(data.filter((item) => item.MaNhom !== MaNhom));
      alert(`Đã xóa nhóm: ${MaNhom}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAchievement({ ...newAchievement, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAchievement.MaLoai || !newAchievement.TenLoai) {
      alert('Mã Loại và Tên Loại không được để trống.');
      return;
    }
    setData([...data, newAchievement]);
    setNewAchievement({
      MaLoai: '',
      TenLoai: '',
      LoiMoTa: '',
      DiemCong: 0,
      MaNhom: '',
      CapDo: '',
      TrangThai: 'Hoạt động',
    });
    setShowAddForm(false);
  };

  const handleDelete = (MaLoai) => {
    const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa thành tích có mã: ${MaLoai}?`);
    if (isConfirmed) {
      setData(data.filter((item) => item.MaLoai !== MaLoai));
      alert(`Đã xóa thành tích: ${MaLoai}`);
    }
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

  const getSortedItems = (filtered) => {
    if (!sortConfig.key) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = removeAccents(a[sortConfig.key].toString().toLowerCase());
      const bVal = removeAccents(b[sortConfig.key].toString().toLowerCase());
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };


  return (
    <div className="flex bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
      <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
      <div className="flex flex-col flex-1 z-2">
        <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Danh mục tiêu chí / thành tích"} />
        <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto m-5">
          <div className="container mx-auto ">
            <h1 className="text-2xl font-bold mb-2">Bảng Nhóm Thành Tích</h1>
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowAddGroupForm(!showAddGroupForm)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center"
              >
                <FaPlus className="mr-2" /> Thêm nhóm thành tích
              </button>
            </div>

            {showAddGroupForm && (
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-xl font-semibold mb-3">Thêm Nhóm Mới</h2>
                <form onSubmit={handleAddGroup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="MaNhom"
                    value={newGroup.MaNhom}
                    onChange={handleInputGroupChange}
                    placeholder="Mã Nhóm"
                    className="p-2 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="TenNhom"
                    value={newGroup.TenNhom}
                    onChange={handleInputGroupChange}
                    placeholder="Tên Nhóm"
                    className="p-2 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="MoTa"
                    value={newGroup.MoTa}
                    onChange={handleInputGroupChange}
                    placeholder="Mô Tả"
                    className="p-2 border border-gray-300 rounded col-span-full"
                  />
                  <div className="col-span-full flex justify-end">
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

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200 text-gray-600 uppercase text-md leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left">Mã Nhóm</th>
                    <th className="py-3 px-6 text-left">Tên Nhóm</th>
                    <th className="py-3 px-6 text-left">Mô Tả</th>
                    <th className="py-3 px-6 text-left">Trạng Thái</th>
                    <th className="py-3 px-6 text-center">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-md font-light">
                  {initialAchievementGroups.map((item, index) => (
                    <tr
                      key={item.MaNhom}
                      className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? '' : 'bg-gray-50'
                        }`}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">{item.MaNhom}</td>
                      <td className="py-3 px-6 text-left">{item.TenNhom}</td>
                      <td className="py-3 px-6 text-left">{item.MoTa}</td>
                      <td className="py-3 px-6 text-left">
                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                          {item.TrangThai}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(item.MaNhom)}
                            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                            title="Sửa"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleGroupDelete(item.MaNhom)}
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
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-2">Bảng Thành Tích Chi Tiết</h1>
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center"
                >
                  <FaPlus className="mr-2" /> Thêm thành tích
                </button>
              </div>

              {showAddForm && (
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h2 className="text-xl font-semibold mb-3">Thêm Thành Tích Mới</h2>
                  <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="MaLoai"
                      value={newAchievement.MaLoai}
                      onChange={handleInputChange}
                      placeholder="Mã Loại"
                      className="p-2 border border-gray-300 rounded"
                      required
                    />
                    <input
                      type="text"
                      name="TenLoai"
                      value={newAchievement.TenLoai}
                      onChange={handleInputChange}
                      placeholder="Tên Loại"
                      className="p-2 border border-gray-300 rounded"
                      required
                    />
                    <input
                      type="text"
                      name="LoiMoTa"
                      value={newAchievement.LoiMoTa}
                      onChange={handleInputChange}
                      placeholder="Mô Tả"
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      name="DiemCong"
                      value={newAchievement.DiemCong}
                      onChange={handleInputChange}
                      placeholder="Điểm Cộng"
                      className="p-2 border border-gray-300 rounded"
                    />
                    <select
                      name="MaNhom"
                      value={newAchievement.MaNhom}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="">-- Chọn Nhóm --</option>
                      {initialAchievementGroups.map((group) => (
                        <option key={group.MaNhom} value={group.MaNhom}>{group.TenNhom}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="CapDo"
                      value={newAchievement.CapDo}
                      onChange={handleInputChange}
                      placeholder="Cấp Độ"
                      className="p-2 border border-gray-300 rounded"
                    />
                    <div className="md:col-span-2 lg:col-span-3 flex justify-end">
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

              <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-200 text-gray-600 uppercase text-md leading-normal">
                    <tr>
                      <th className="py-3 px-6 text-left">Mã Loại</th>
                      <th className="py-3 px-6 text-left">Tên Loại</th>
                      <th className="py-3 px-6 text-left">Mô Tả</th>
                      <th className="py-3 px-6 text-center">Điểm Cộng</th>
                      <th className="py-3 px-6 text-left">Mã Nhóm</th>
                      <th className="py-3 px-6 text-left">Cấp Độ</th>
                      <th className="py-3 px-6 text-left">Trạng Thái</th>
                      <th className="py-3 px-6 text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-md font-light">
                    {initialDetailData.map((item, index) => (
                      <tr
                        key={item.MaLoai}
                        className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? '' : 'bg-gray-50'
                          }`}
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">{item.MaLoai}</td>
                        <td className="py-3 px-6 text-left">{item.TenLoai}</td>
                        <td className="py-3 px-6 text-left">{item.LoiMoTa}</td>
                        <td className="py-3 px-6 text-center font-bold text-green-500">{item.DiemCong}</td>
                        <td className="py-3 px-6 text-left">
                          <span className="font-semibold text-blue-600">{item.TenNhom}</span>
                        </td>
                        <td className="py-3 px-6 text-left">{item.CapDo}</td>
                        <td className="py-3 px-6 text-left">
                          <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                            {item.TrangThai}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center space-x-2">
                            <button
                              onClick={() => handleEdit(item.MaLoai)}
                              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                              title="Sửa"
                            >
                              <FaEdit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.MaLoai)}
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
    </div>
  );
};

export default CriteriaAchievementPage;
