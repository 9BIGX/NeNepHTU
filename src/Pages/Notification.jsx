import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaPaperPlane, FaEye, FaTrashAlt, FaTimes } from 'react-icons/fa';


const initialNotifications = [
  {
    MaThongBao: 'TB001',
    TieuDe: 'Thông báo nghỉ học',
    NoiDung: 'Học sinh toàn trường nghỉ học vào ngày 15/08/2025.',
    LoaiThongBao: 'Thông báo chung',
    NguoiGui: 'Ban Giám Hiệu',
    DoiTuongNhan: 'Tất cả',
    TrangThai: 'Đã gửi',
    NgayGui: '2025-08-13 10:00:00',
  },
  {
    MaThongBao: 'TB002',
    TieuDe: 'Thông báo về nội quy',
    NoiDung: 'Nhà trường yêu cầu tất cả học sinh thực hiện đúng nội quy về đồng phục.',
    LoaiThongBao: 'Vi phạm',
    NguoiGui: 'Phòng Công tác học sinh',
    DoiTuongNhan: 'Học sinh',
    TrangThai: 'Đã gửi',
    NgayGui: '2025-08-12 15:30:00',
  },
  {
    MaThongBao: 'TB003',
    TieuDe: 'Kết quả cuộc thi thể thao',
    NoiDung: 'Chúc mừng đội bóng lớp 10A1 đã giành giải nhất.',
    LoaiThongBao: 'Thành tích',
    NguoiGui: 'Đoàn trường',
    DoiTuongNhan: 'Lớp cụ thể',
    MaLop: '10A1',
    TrangThai: 'Chưa gửi',
    NgayGui: '',
  },
];
function NotificationPage({ isSidebarOpen, toggleSidebar }) {

  const [notifications, setNotifications] = useState(initialNotifications);
  const [newNotification, setNewNotification] = useState({
    TieuDe: '',
    NoiDung: '',
    LoaiThongBao: 'Thông báo chung',
    NguoiGui: 'Người dùng hiện tại',
    DoiTuongNhan: 'Tất cả',
    MaLop: '',
    MaHS: '',
  });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification({ ...newNotification, [name]: value });
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!newNotification.TieuDe || !newNotification.NoiDung) {
      alert('Tiêu đề và Nội dung không được để trống.');
      return;
    }
    const newId = `TB${String(notifications.length + 1).padStart(3, '0')}`;
    const sentNotification = {
      ...newNotification,
      MaThongBao: newId,
      TrangThai: 'Đã gửi',
      NgayGui: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    setNotifications([...notifications, sentNotification]);
    setNewNotification({
      TieuDe: '',
      NoiDung: '',
      LoaiThongBao: 'Thông báo chung',
      NguoiGui: 'Người dùng hiện tại',
      DoiTuongNhan: 'Tất cả',
      MaLop: '',
      MaHS: '',
    });
    alert('Thông báo đã được gửi thành công!');
  };

  const handleDeleteNotification = (MaThongBao) => {
    const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa thông báo có mã: ${MaThongBao}?`);
    if (isConfirmed) {
      setNotifications(notifications.filter((item) => item.MaThongBao !== MaThongBao));
      alert(`Đã xóa thông báo: ${MaThongBao}`);
    }
  };

  const handleViewDetails = (notification) => {
    setSelectedNotification(notification);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedNotification(null);
  };

  return (
    <>
      <div className="flex bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
        <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
        <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
        <div className="flex flex-col flex-1 z-2">
          <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Thông báo"} />
          <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
            {/* content */}
            <div className="container mx-auto p-4">
              <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 pb-2">
                Quản lý Thông báo
              </h1>

              {/* Form Tạo Thông Báo Mới */}
              {/* ... (phần code này giữ nguyên) ... */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Tạo Thông Báo Mới</h2>
                <form onSubmit={handleSendNotification} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                      <input
                        type="text"
                        name="TieuDe"
                        value={newNotification.TieuDe}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Loại thông báo</label>
                      <select
                        name="LoaiThongBao"
                        value={newNotification.LoaiThongBao}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="Vi phạm">Vi phạm</option>
                        <option value="Thành tích">Thành tích</option>
                        <option value="Thông báo chung">Thông báo chung</option>
                        <option value="Khẩn cấp">Khẩn cấp</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                    <textarea
                      name="NoiDung"
                      value={newNotification.NoiDung}
                      onChange={handleInputChange}
                      rows="4"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      required
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Đối tượng nhận</label>
                      <select
                        name="DoiTuongNhan"
                        value={newNotification.DoiTuongNhan}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="Tất cả">Tất cả</option>
                        <option value="Học sinh">Học sinh</option>
                        <option value="Giáo viên">Giáo viên</option>
                        <option value="Phụ huynh">Phụ huynh</option>
                        <option value="Lớp cụ thể">Lớp cụ thể</option>
                      </select>
                    </div>
                    {newNotification.DoiTuongNhan === 'Lớp cụ thể' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Mã Lớp</label>
                        <input
                          type="text"
                          name="MaLop"
                          value={newNotification.MaLop}
                          onChange={handleInputChange}
                          placeholder="Nhập mã lớp"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-white bg-purple-600 rounded-xl shadow-md hover:bg-purple-700 transition-colors duration-200 font-semibold"
                    >
                      <FaPaperPlane /> Gửi thông báo
                    </button>
                  </div>
                </form>
              </div>

              {/* Danh sách Thông báo */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Danh sách Thông báo</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <tr>
                        <th className="py-3 px-6 text-left">Mã TB</th>
                        <th className="py-3 px-6 text-left">Tiêu đề</th>
                        <th className="py-3 px-6 text-left">Người gửi</th>
                        <th className="py-3 px-6 text-left">Đối tượng</th>
                        <th className="py-3 px-6 text-center">Trạng thái</th>
                        <th className="py-3 px-6 text-center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                      {notifications.map((item, index) => (
                        <tr
                          key={item.MaThongBao}
                          className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? '' : 'bg-gray-50'
                            }`}
                        >
                          <td className="py-3 px-6 text-left whitespace-nowrap">{item.MaThongBao}</td>
                          <td className="py-3 px-6 text-left">{item.TieuDe}</td>
                          <td className="py-3 px-6 text-left">{item.NguoiGui}</td>
                          <td className="py-3 px-6 text-left">{item.DoiTuongNhan} {item.MaLop ? `(${item.MaLop})` : ''}</td>
                          <td className="py-3 px-6 text-center">
                            <span
                              className={`py-1 px-3 rounded-full text-xs font-semibold ${item.TrangThai === 'Đã gửi'
                                ? 'bg-green-200 text-green-600'
                                : 'bg-yellow-200 text-yellow-600'
                                }`}
                            >
                              {item.TrangThai}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center space-x-2">
                              <button
                                onClick={() => handleViewDetails(item)}
                                className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                                title="Xem chi tiết"
                              >
                                <FaEye size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteNotification(item.MaThongBao)}
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

              {/* Modal Xem chi tiết */}
              {showDetailModal && selectedNotification && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
                      <h3 className="text-2xl font-bold text-gray-800">
                        Chi tiết thông báo
                      </h3>
                      <button
                        onClick={handleCloseModal}
                        className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                        title="Đóng"
                      >
                        <FaTimes size={24} />
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 space-y-4 text-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-500">Mã TB</span>
                          <p className="font-semibold">{selectedNotification.MaThongBao}</p>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-500">Loại thông báo</span>
                          <span
                            className={`font-semibold py-1 px-3 rounded-full text-xs self-center
                ${selectedNotification.LoaiThongBao === 'Thông báo chung' ? 'bg-purple-100 text-purple-600' :
                                selectedNotification.LoaiThongBao === 'Vi phạm' ? 'bg-red-100 text-red-600' :
                                  selectedNotification.LoaiThongBao === 'Thành tích' ? 'bg-green-100 text-green-600' :
                                    'bg-yellow-100 text-yellow-600'}`}
                          >
                            {selectedNotification.LoaiThongBao}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500">Tiêu đề</span>
                        <p className="text-lg font-bold">{selectedNotification.TieuDe}</p>
                      </div>
                      <div className="flex flex-col bg-gray-50 p-4 rounded-lg">
                        <span className="text-sm font-medium text-gray-500">Nội dung</span>
                        <p className="mt-1 leading-relaxed whitespace-pre-wrap">{selectedNotification.NoiDung}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-500">Người gửi</span>
                          <p className="font-semibold">{selectedNotification.NguoiGui}</p>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-500">Ngày gửi</span>
                          <p className="font-semibold">{selectedNotification.NgayGui || 'Chưa gửi'}</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500">Đối tượng nhận</span>
                        <p className="font-semibold">
                          {selectedNotification.DoiTuongNhan}
                          {selectedNotification.MaLop && ` (${selectedNotification.MaLop})`}
                        </p>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-2 rounded-b-2xl">
                      <button
                        onClick={handleCloseModal}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default NotificationPage;