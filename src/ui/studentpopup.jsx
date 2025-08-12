import React, { useState, useEffect } from 'react';

import { FiUser, FiCalendar, FiMapPin, FiBookOpen, FiClipboard, FiPhone, FiInfo, FiAward, FiUsers, FiEdit3 } from 'react-icons/fi';
import { motion, AnimatePresence } from "framer-motion";

const genderOptions = ['Nam', 'Nữ', 'Khác'];
const statusOptions = ['Đang học', 'Nghỉ học', 'Chuyển trường', 'Tốt nghiệp'];

const StudentInfoPopup = ({ student, onClose, onSave }) => {
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ ...student });
    const [isClosing, setIsClosing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

    };

    const handleCancel = () => {
        setForm({ ...student });
        setEditMode(false);
    };

    const handleSave = () => {
        const NewForm = {
            MaHS: form.MaHS,
            TenHS: form.TenHS,
            MaKhoi: form.MaKhoi,
            MaLop: form.MaLop,
            TenKhoi: form.TenKhoi,
            TenLop: form.TenLop,
            XepLoai: form.XepLoai,
            TongDiem: form.TongDiem
        }
        onSave(NewForm);
        setEditMode(false);
    };

    const calculateAge = (dob) => {
        if (!dob) return 'N/A';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const getInitials = (name) => {
        if (!name) return '?';
        const nameParts = name.split(' ');
        return nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    };

    useEffect(() => {
        // Khi component được render (sidebar mở ra)
        // -> Thêm class để ẩn thanh cuộn của body
        document.body.style.overflow = 'hidden';

        // Hàm cleanup này sẽ được gọi khi component bị unmount (sidebar đóng lại)
        return () => {
            // -> Gỡ class để thanh cuộn của body hoạt động lại bình thường
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleClose = () => {
        setIsClosing(true); // Kích hoạt trạng thái "đang đóng" để chạy animation "out"

        // Đợi animation chạy xong (300ms) rồi mới gọi hàm onClose thật
        setTimeout(() => {
            onClose();
        }, 300); // Thời gian này phải khớp với thời gian của animation
    };


    const InfoRow = ({ label, value, name, editMode, onChange, type = 'text', options = [] }) => {
        return (
            <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-sm font-medium text-gray-500">{label}</span>
                {editMode ? (
                    type === 'select' ? (
                        <select
                            name={name}
                            value={value || ''}
                            onChange={onChange}
                            className="w-1/2 p-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        >
                            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    ) : (
                        <input
                            type={type}
                            name={name}
                            value={value || ''}
                            onChange={onChange}
                            className="w-1/2 p-1 border border-gray-300 rounded-md text-sm text-right focus:ring-2 focus:ring-blue-500"
                        />
                    )
                ) : (
                    <span className="text-sm font-semibold text-gray-800 text-right">{value || 'Chưa cập nhật'}</span>
                )}
            </div>
        );
    };

    return (

        <AnimatePresence>
            {!isClosing && (
                <motion.div
                    key="sidebar"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className=" fixed top-0 right-0 w-full max-w-md h-full shadow-2xl z-50 flex flex-col animate-slideInRight"
                >
                    {/* Lớp phủ nền mờ */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={handleClose}
                    ></div>

                    {/* Nội dung Sidebar */}
                    <div
                        className="fixed top-0 right-0 w-full max-w-md h-full bg-gray-50 shadow-2xl z-50 flex flex-col animate-slideInRight"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header với nút đóng */}
                        <div className="p-4 flex justify-between items-center border-b bg-white">
                            <h2 className="text-xl font-bold text-gray-800">Thông tin chi tiết</h2>
                            <button
                                onClick={handleClose} // Dùng hàm đóng mới
                                className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-5 space-y-5">
                            {/* Thẻ thông tin chính */}
                            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg text-center">
                                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-4 border-4 border-blue-400">
                                    <span className="text-5xl font-bold text-blue-600">{getInitials(form.TenHS)}</span>
                                </div>
                                <h3 className="text-2xl font-bold">{form.TenHS}</h3>
                                <p className="text-blue-200">{form.MaHS} • {form.TenLop}</p>
                                <div className="mt-4 inline-block bg-white/25 px-4 py-2 rounded-full text-sm font-semibold">
                                    Tổng điểm: {form.TongDiem} – Xếp loại: {form.XepLoai}
                                </div>
                            </div>

                            {/* Thẻ thông tin cơ bản */}
                            <div className="bg-white p-5 rounded-2xl shadow-md">
                                <h4 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2"><FiClipboard />Thông tin cơ bản</h4>
                                <InfoRow label="Họ và tên" value={form.TenHS} name="TenHS" editMode={editMode} onChange={handleChange} />
                                <InfoRow label="Ngày sinh" value={new Date(form.NgaySinh).toLocaleDateString('vi-VN')} name="NgaySinh" editMode={editMode} onChange={handleChange} type="date" />
                                <InfoRow label="Tuổi" value={calculateAge(form.NgaySinh)} />
                                <InfoRow label="Giới tính" value={form.GioiTinh} name="GioiTinh" editMode={editMode} onChange={handleChange} type="select" options={genderOptions} />
                                <InfoRow label="Địa chỉ" value={form.DiaChi} name="DiaChi" editMode={editMode} onChange={handleChange} />
                            </div>

                            {/* Thẻ thông tin học tập */}
                            <div className="bg-white p-5 rounded-2xl shadow-md">
                                <h4 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2"><FiBookOpen />Thông tin học tập</h4>
                                <InfoRow label="Khối" value={form.TenKhoi} name="TenKhoi" editMode={editMode} onChange={handleChange} />
                                <InfoRow label="Lớp" value={form.TenLop} name="TenLop" editMode={editMode} onChange={handleChange} />
                                <InfoRow label="Ngày nhập học" value={new Date(form.NgayNhapHoc).toLocaleDateString('vi-VN')} name="NgayNhapHoc" editMode={editMode} onChange={handleChange} type="date" />
                                <InfoRow label="Trạng thái" value={form.TrangThai} name="TrangThai" editMode={editMode} onChange={handleChange} type="select" options={statusOptions} />
                            </div>

                            {/* Thẻ thông tin phụ huynh */}
                            <div className="bg-white p-5 rounded-2xl shadow-md">
                                <h4 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2"><FiUsers />Thông tin phụ huynh</h4>
                                <InfoRow label="Tên Bố" value={form.TenBo} name="TenBo" editMode={editMode} onChange={handleChange} />
                                <InfoRow label="SĐT Bố" value={form.SoDienThoaiBo} name="SoDienThoaiBo" editMode={editMode} onChange={handleChange} />
                                <InfoRow label="Tên Mẹ" value={form.TenMe} name="TenMe" editMode={editMode} onChange={handleChange} />
                                <InfoRow label="SĐT Mẹ" value={form.SoDienThoaiMe} name="SoDienThoaiMe" editMode={editMode} onChange={handleChange} />
                                <InfoRow label="Người giám hộ" value={form.TenNguoiGiamHo} name="TenNguoiGiamHo" editMode={editMode} onChange={handleChange} />
                                <InfoRow label="SĐT NGH" value={form.SoDienThoaiNGH} name="SoDienThoaiNGH" editMode={editMode} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Footer với các nút hành động */}
                        <div className="p-4 bg-white border-t flex justify-end gap-3">
                            {editMode ? (
                                <>
                                    <button onClick={handleSave} className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition-all">💾 Lưu</button>
                                    <button onClick={handleCancel} className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 shadow transition-all">✖ Hủy</button>
                                </>
                            ) : (
                                <button onClick={() => setEditMode(true)} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow transition-all flex items-center gap-2"><FiEdit3 />Chỉnh sửa</button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>


    );
};

export default StudentInfoPopup;
