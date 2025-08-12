import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaEdit, FaTrash, FaTrashAlt, FaPlus, FaSave } from 'react-icons/fa';
import ViolateData from '../data/Violate';

const ViolateCRUDPage = ({ isSidebarOpen, toggleSidebar }) => {
  const [initialDetailData, setinitialDetailData] = useState(
    [
      {
        MaLoai: 'VP01',
        TenLoai: 'Đi học muộn',
        LoiMoTa: 'Đến lớp sau giờ quy định',
        DiemTru: 2,
        MaNhom: 'NVP01',
        TenNhom: 'Nề nếp',
        MucPhat: 'Nhắc nhở, ghi vào sổ',
        TrangThai: 'Hoạt động',
      },
      {
        MaLoai: 'VP02',
        TenLoai: 'Vô lễ với thầy cô',
        LoiMoTa: 'Có thái độ thiếu tôn trọng',
        DiemTru: 8,
        MaNhom: 'NVP02',
        TenNhom: 'Hành vi',
        MucPhat: 'Viết kiểm điểm, gọi phụ huynh',
        TrangThai: 'Hoạt động',
      },
      {
        MaLoai: 'VP03',
        TenLoai: 'Không đồng phục',
        LoiMoTa: 'Không mặc đồng phục',
        DiemTru: 1,
        MaNhom: 'NVP03',
        TenNhom: 'Trang phục',
        MucPhat: 'Nhắc nhở',
        TrangThai: 'Hoạt động',
      },
      {
        MaLoai: 'VP04',
        TenLoai: 'Không làm bài tập',
        LoiMoTa: 'Không hoàn thành bài tập được giao',
        DiemTru: 3,
        MaNhom: 'NVP04',
        TenNhom: 'Học tập',
        MucPhat: 'Làm bù bài tập, nhắc nhở',
        TrangThai: 'Hoạt động',
      },
      {
        MaLoai: 'VP05',
        TenLoai: 'Đánh nhau',
        LoiMoTa: 'Xô xát, đánh nhau trong trường',
        DiemTru: 15,
        MaNhom: 'NVP02',
        TenNhom: 'Hành vi',
        MucPhat: 'Đình chỉ học tập, gặp phụ huynh',
        TrangThai: 'Hoạt động',
      },
    ]
  );
  const [ViolateList, setViolateList] = useState(
    [
      {
        MaNhom: 'NVP01',
        TenNhom: 'Nề nếp',
        MoTa: 'Vi phạm về thời gian, tác phong',
        MucDoNghiemTrong: 'Nhẹ',
        TrangThai: 'Hoạt động',
      },
      {
        MaNhom: 'NVP02',
        TenNhom: 'Hành vi',
        MoTa: 'Vi phạm về đạo đức, hành vi',
        MucDoNghiemTrong: 'Nặng',
        TrangThai: 'Hoạt động',
      },
      {
        MaNhom: 'NVP03',
        TenNhom: 'Trang phục',
        MoTa: 'Vi phạm về đồng phục, trang phục',
        MucDoNghiemTrong: 'Nhẹ',
        TrangThai: 'Hoạt động',
      },
      {
        MaNhom: 'NVP04',
        TenNhom: 'Học tập',
        MoTa: 'Vi phạm về học tập, bài tập',
        MucDoNghiemTrong: 'Trung bình',
        TrangThai: 'Hoạt động',
      },
      {
        MaNhom: 'NVP05',
        TenNhom: 'An toàn',
        MoTa: 'Vi phạm về an toàn trường học',
        MucDoNghiemTrong: 'Rất nặng',
        TrangThai: 'Hoạt động',
      },
    ]
  );
  const [form, setForm] = useState({ type: 'Tiêu chí', level: 'Lớp', name: '', point: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.name === 'point' ? Number(e.target.value) : e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || form.point === null) return alert('Vui lòng nhập đầy đủ thông tin.');

    const updated = [...items];
    if (isEditing && editIndex !== null) {
      updated[editIndex] = { ...form };
    } else {
      updated.push({ ...form });
    }
    setItems(updated);
    setForm({ type: 'Tiêu chí', level: 'Lớp', name: '', point: 0 });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setForm(items[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleCancel = () => {
    setForm({ type: 'Tiêu chí', level: 'Lớp', name: '', point: 0 });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
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

  const ViolationTable = () => {
    const [data, setData] = useState(ViolateList);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newViolationGroup, setNewViolationGroup] = useState({
      MaNhom: '',
      TenNhom: '',
      MoTa: '',
      MucDoNghiemTrong: 'Nhẹ', // Mặc định là Nhẹ
      TrangThai: 'Hoạt động',
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewViolationGroup({ ...newViolationGroup, [name]: value });
    };

    const handleAdd = (e) => {
      e.preventDefault();
      if (!newViolationGroup.MaNhom || !newViolationGroup.TenNhom) {
        alert('Mã Nhóm và Tên Nhóm không được để trống.');
        return;
      }
      setData([...data, newViolationGroup]);
      setNewViolationGroup({
        MaNhom: '',
        TenNhom: '',
        MoTa: '',
        MucDoNghiemTrong: 'Nhẹ',
        TrangThai: 'Hoạt động',
      });
      setShowAddForm(false);
    };

    const handleEdit = (MaNhom) => {
      alert(`Bạn muốn sửa nhóm có mã: ${MaNhom}`);
    };

    const handleDelete = (MaNhom) => {
      const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa nhóm có mã: ${MaNhom}?`);
      if (isConfirmed) {
        setData(data.filter((item) => item.MaNhom !== MaNhom));
        alert(`Đã xóa nhóm: ${MaNhom}`);
      }
    };

    const getSeverityColor = (severity) => {
      switch (severity) {
        case 'Nhẹ':
          return 'text-green-500';
        case 'Trung bình':
          return 'text-yellow-500';
        case 'Nặng':
          return 'text-red-500';
        case 'Rất nặng':
          return 'text-red-700 font-bold';
        default:
          return 'text-gray-500';
      }
    };

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Bảng Nhóm Vi Phạm</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center"
          >
            <FaPlus className="mr-2" /> Thêm nhóm vi phạm
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-3">Thêm Nhóm Vi Phạm Mới</h2>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                name="MaNhom"
                value={newViolationGroup.MaNhom}
                onChange={handleInputChange}
                placeholder="Mã Nhóm"
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="TenNhom"
                value={newViolationGroup.TenNhom}
                onChange={handleInputChange}
                placeholder="Tên Nhóm"
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="MoTa"
                value={newViolationGroup.MoTa}
                onChange={handleInputChange}
                placeholder="Mô Tả"
                className="p-2 border border-gray-300 rounded"
              />
              <select
                name="MucDoNghiemTrong"
                value={newViolationGroup.MucDoNghiemTrong}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="Nhẹ">Nhẹ</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Nặng">Nặng</option>
                <option value="Rất nặng">Rất nặng</option>
              </select>
              <div className="md:col-span-2 lg:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
                >
                  <FaSave className="mr-2" /> Lưu
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ... Phần bảng hiển thị dữ liệu (giữ nguyên) */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Mã Nhóm</th>
                <th className="py-3 px-6 text-left">Tên Nhóm</th>
                <th className="py-3 px-6 text-left">Mô Tả</th>
                <th className="py-3 px-6 text-left">Mức Độ Nghiêm Trọng</th>
                <th className="py-3 px-6 text-left">Trạng Thái</th>
                <th className="py-3 px-6 text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {data.map((item, index) => (
                <tr
                  key={item.MaNhom}
                  className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? '' : 'bg-gray-50'
                    }`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">{item.MaNhom}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{item.TenNhom}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{item.MoTa}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className={`font-semibold ${getSeverityColor(item.MucDoNghiemTrong)}`}>
                      {item.MucDoNghiemTrong}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs`}
                    >
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
                        onClick={() => handleDelete(item.MaNhom)}
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
    );
  };

  const ViolationDetailTable = () => {
    const [data, setData] = useState(initialDetailData);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newViolation, setNewViolation] = useState({
      MaLoai: '',
      TenLoai: '',
      LoiMoTa: '',
      DiemTru: '',
      MaNhom: '',
      MucPhat: '',
      TrangThai: 'Hoạt động',
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewViolation({ ...newViolation, [name]: value });
    };

    const handleAdd = (e) => {
      e.preventDefault();
      if (!newViolation.MaLoai || !newViolation.TenLoai) {
        alert('Mã Loại và Tên Loại không được để trống.');
        return;
      }
      setData([...data, newViolation]);
      setNewViolation({
        MaLoai: '',
        TenLoai: '',
        LoiMoTa: '',
        DiemTru: '',
        MaNhom: '',
        MucPhat: '',
        TrangThai: 'Hoạt động',
      });
      setShowAddForm(false);
    };

    const handleEdit = (MaLoai) => {
      alert(`Bạn muốn sửa vi phạm có mã: ${MaLoai}`);
    };

    const handleDelete = (MaLoai) => {
      const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa vi phạm có mã: ${MaLoai}?`);
      if (isConfirmed) {
        setData(data.filter((item) => item.MaLoai !== MaLoai));
        alert(`Đã xóa vi phạm: ${MaLoai}`);
      }
    };

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Bảng Vi Phạm Chi Tiết</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center"
          >
            <FaPlus className="mr-2" /> Thêm mới vi phạm
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-3">Thêm Vi Phạm Mới</h2>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                name="MaLoai"
                value={newViolation.MaLoai}
                onChange={handleInputChange}
                placeholder="Mã Loại"
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="TenLoai"
                value={newViolation.TenLoai}
                onChange={handleInputChange}
                placeholder="Tên Loại"
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="LoiMoTa"
                value={newViolation.LoiMoTa}
                onChange={handleInputChange}
                placeholder="Mô Tả Lỗi"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="DiemTru"
                value={newViolation.DiemTru}
                onChange={handleInputChange}
                placeholder="Điểm Trừ"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="MaNhom"
                value={newViolation.MaNhom}
                onChange={handleInputChange}
                placeholder="Mã Nhóm"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="MucPhat"
                value={newViolation.MucPhat}
                onChange={handleInputChange}
                placeholder="Mức Phạt"
                className="p-2 border border-gray-300 rounded"
              />
              <div className="md:col-span-2 lg:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
                >
                  <FaSave className="mr-2" /> Lưu
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ... Phần bảng hiển thị dữ liệu (giữ nguyên) */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Mã Loại</th>
                <th className="py-3 px-6 text-left">Tên Loại</th>
                <th className="py-3 px-6 text-left">Mô Tả Lỗi</th>
                <th className="py-3 px-6 text-center">Điểm Trừ</th>
                <th className="py-3 px-6 text-left">Tên Nhóm</th>
                <th className="py-3 px-6 text-left">Mức Phạt</th>
                <th className="py-3 px-6 text-left">Trạng Thái</th>
                <th className="py-3 px-6 text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {data.map((item, index) => (
                <tr
                  key={item.MaLoai}
                  className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? '' : 'bg-gray-50'
                    }`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">{item.MaLoai}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{item.TenLoai}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{item.LoiMoTa}</span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span className="font-bold text-red-500">{item.DiemTru}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="font-semibold text-blue-600">{item.TenNhom}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{item.MucPhat}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs`}
                    >
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
    );
  };

  const renderTable = () => {
    const filtered = items.filter(i => {
      const searchTermNormalized = removeAccents(searchTerm.toLowerCase());
      const itemNameNormalized = removeAccents(i.name.toLowerCase());
      return itemNameNormalized.includes(searchTermNormalized);
    });

    const sorted = getSortedItems(filtered);
    return (
      <table className="w-full text-lg border mb-8">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('level')}>Cấp {renderSortIcon('level')}</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('type')}>Loại {renderSortIcon('type')}</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>Nội dung {renderSortIcon('name')}</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('point')}>Điểm {renderSortIcon('point')}</th>
            <th className="p-2 text-right">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-200">
              <td className="p-2 text-gray-700">{item.level}</td>
              <td className="p-2 text-gray-700">{item.type}</td>
              <td className="p-2 text-gray-800">{item.name}</td>
              <td className="p-2 text-center">{item.point}</td>
              <td className="p-2 text-right space-x-2">
                <button onClick={() => handleEdit(items.indexOf(item))} className="text-blue-600 hover:text-blue-800" title="Sửa">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(items.indexOf(item))} className="text-red-600 hover:text-red-800" title="Xoá">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500 italic">Không có dữ liệu nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
      <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
      <div className="flex flex-col flex-1 z-2">
        <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Danh mục vi phạm"} />
        <div className="flex flex-col mt-8 gap-4 p-5 rounded-lg shadow overflow-y-auto ">
          <div className='w-full bg-gray-50 rounded-2xl'>
            {ViolationTable()}
          </div>
          <div className=" bg-gray-50 rounded-2xl w-full">
            {ViolationDetailTable()}
            {/* <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold text-purple-700 mb-6">Quản lý vi phạm</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded-md w-full">
                  <option value="Tiêu chí">Tiêu chí</option>
                  <option value="Thành tích">Thành tích</option>
                </select>
                <select name="level" value={form.level} onChange={handleChange} className="border p-2 rounded-md w-full">
                  <option value="Lớp">Lớp</option>
                  <option value="Khối">Khối</option>
                  <option value="Trường">Trường</option>
                </select>
                <input type="text" name="name" placeholder="Nhập nội dung..." value={form.name} onChange={handleChange} className="border p-2 rounded-md w-full" />
                <input type="number" name="point" placeholder="Điểm" value={form.point} onChange={handleChange} className="border p-2 rounded-md w-full" />
              </div>

              <div className="mb-4">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Cập nhật</button>
                    <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Huỷ</button>
                  </div>
                ) : (
                  <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Thêm mới</button>
                )}
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Danh sách tiêu chí</h3>
              {renderTable()}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolateCRUDPage;
