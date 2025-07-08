import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaEdit, FaTrash } from 'react-icons/fa';

function RolesPage({ isSidebarOpen, toggleSidebar }) {

  const roles = [
    'Học sinh',
    'Đội cờ đỏ',
    'Tưởng ban nề nếp',
    'Ban giám hiệu'
  ];

  const [accounts, setAccounts] = useState([
    { id: 'hs001', name: 'Nguyễn Văn A', role: 'Học sinh' },
    { id: 'cd001', name: 'Lê Thị B', role: 'Đội cờ đỏ' },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' })

  const [form, setForm] = useState({ id: '', name: '', role: 'Học sinh' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.name) return alert('Vui lòng điền đầy đủ thông tin');

    const updatedAccounts = [...accounts];
    if (isEditing && editIndex !== null) {
      updatedAccounts[editIndex] = { ...form };
    } else {
      updatedAccounts.push({ ...form });
    }
    setAccounts(updatedAccounts);
    setForm({ id: '', name: '', role: 'Học sinh' });
    setIsEditing(false);
    setEditIndex(null);
  };

  const getSortedAccounts = () => {
    if (!sortConfig.key) return accounts;

    return [...accounts].sort((a, b) => {
      const aVal = a[sortConfig.key].toLowerCase();
      const bVal = b[sortConfig.key].toLowerCase();
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

  const handleEdit = (index) => {
    setForm(accounts[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleCancel = () => {
    setForm({ id: '', name: '', role: 'Học sinh' });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updated = [...accounts];
    updated.splice(index, 1);
    setAccounts(updated);
  };


  return (
    <>
      <div className="flex bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
        <div className="flex flex-col flex-1 p-2 h-screen">
          <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={""} />
          <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
            <div className="min-h-screen bg-gray-100 p-6">
              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-purple-700 mb-4">Phân quyền tài khoản</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="id"
                    placeholder="Mã tài khoản"
                    value={form.id}
                    onChange={handleChange}
                    className="border p-2 rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Tên người dùng"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 rounded-md w-full"
                  />
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="border p-2 rounded-md w-full"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {isEditing ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Cập nhật
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Huỷ
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Thêm tài khoản
                  </button>
                )}

                <div className="mt-6">
                  <table className="w-full text-sm border">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-2">Mã</th>
                          <th
                            className="p-2 cursor-pointer"
                            onClick={() => handleSort('name')}
                          >
                            Tên {renderSortIcon('name')}
                          </th>
                          <th
                            className="p-2 cursor-pointer"
                            onClick={() => handleSort('role')}
                          >
                            Chức vụ {renderSortIcon('role')}
                          </th>
                          <th className="p-2 text-right">Hành động</th>
                        </tr>

                    </thead>
                    <tbody>
                      {getSortedAccounts().map((acc, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">{acc.id}</td>
                          <td className="p-2">{acc.name}</td>
                          <td className="p-2">{acc.role}</td>
                          <td className="p-2 text-right space-x-2">
                            <button
                              onClick={() => handleEdit(index)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Sửa"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-red-600 hover:text-red-800"
                              title="Xoá"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {accounts.length === 0 && (
                        <tr>
                          <td colSpan="4" className="p-2 text-center text-gray-500 italic">
                            Chưa có tài khoản nào
                          </td>
                        </tr>
                      )}
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

export default RolesPage;