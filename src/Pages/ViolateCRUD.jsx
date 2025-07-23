import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ViolateData from '../data/Violate';

const ViolateCRUDPage = ({ isSidebarOpen, toggleSidebar }) => {
  const [items, setItems] = useState(ViolateData);

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
    <div className="flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
      <div className="flex flex-col flex-1 p-2 h-screen">
        <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Danh mục tiêu chí / thành tích"} />
        <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">

          <div className=" bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolateCRUDPage;
