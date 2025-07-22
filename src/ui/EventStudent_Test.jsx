import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const EventTablePage = (props) => {
  const { events , setEvents , VerifyCallBack , CancelCallBack } = props;
  const handleEdit = (index) => {
    alert(`Sửa sự kiện: ${events[index].description}`);
  };

  const handleDelete = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
    CancelCallBack(updated[index].id);
  };

  const handleVerify = (index) => {
    const updated = [...events];
    updated[index].status = 'da_xac_minh';
    setEvents(updated);
    VerifyCallBack(updated[index].id);
  };

  const renderTable = () => (
    <table className="w-full border mb-8 text-md">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Loại</th>
          <th className="p-2">Tên học sinh</th>
          <th className="p-2">Mã • Lớp</th>
          <th className="p-2 ">Mô tả</th>
          <th className="p-2">Thời gian</th>
          <th className="p-2">Người liên quan</th>
          <th className="p-2">Điểm</th>
          <th className="p-2">Trạng thái</th>
          <th className="p-2 text-right">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e, i) => (
          <tr key={e.id} className={`border-t  ${e.type === 'vi_pham' ? 'bg-red-100' : 'bg-green-200'}`}>
            <td className="p-2 text-gray-700">{e.type === 'vi_pham' ? 'Vi phạm' : 'Thành tích'}</td>
            <td className="p-2 text-gray-800">{e.studentName}</td>
            <td className="p-2 text-gray-800">{e.studentId} • {e.studentClass}</td>
            <td className="p-2 text-gray-700 max-w-[200px]">{e.description}</td>
            <td className="p-2 text-gray-700">{e.time}</td>
            <td className="p-2 text-gray-700">{e.relatedPerson}</td>
            <td className={`p-2 font-bold ${e.points < 0 ? 'text-red-600' : 'text-green-600'}`}>{e.points > 0 ? `+${e.points}` : e.points}</td>
            <td className="p-2 text-gray-700">{e.status === 'da_xac_minh' ? 'Đã xác minh' : 'Chờ xác minh'}</td>
            <td className="p-2 text-right space-x-2">
              {e.status !== 'da_xac_minh' && (
                <button onClick={() => handleVerify(i)} className="text-green-600 hover:text-green-800" title="Xác minh">
                  <FaCheck />
                </button>
              )}
              <button onClick={() => handleEdit(i)} className="text-blue-600 hover:text-blue-800" title="Sửa">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(i)} className="text-red-600 hover:text-red-800" title="Xoá">
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Danh sách sự vụ học sinh</h2>
        {renderTable()}
      </div>
    </div>
  );
};

export default EventTablePage;
