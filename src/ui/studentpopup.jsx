import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import { FaUser, FaTransgender, FaBirthdayCake, FaHome, FaPhoneAlt } from 'react-icons/fa';
import { MdSchool, MdOutlineScore, MdOutlineGrade, MdSupervisorAccount, MdCalendarToday, MdUpdate } from 'react-icons/md';


const genderOptions = ['Nam', 'Nữ', 'Khác'];
const statusOptions = ['Đang học', 'Nghỉ học', 'Chuyển trường', 'Tốt nghiệp'];

const iconMap = {
  MaHS: <FaUser />,
  TenHS: <FaUser />,
  TenKhoi: <MdSchool />,
  TenLop: <MdSchool />,
  TongDiem: <MdOutlineScore />,
  XepLoai: <MdOutlineGrade />,
  NgaySinh: <FaBirthdayCake />,
  GioiTinh: <FaTransgender />,
  DiaChi: <FaHome />,
  TenBo: <FaUser />,
  SoDienThoaiBo: <FaPhoneAlt />,
  TenMe: <FaUser />,
  SoDienThoaiMe: <FaPhoneAlt />,
  TenNguoiGiamHo: <MdSupervisorAccount />,
  SoDienThoaiNGH: <FaPhoneAlt />,
  TrangThai: <MdUpdate />,
  NgayNhapHoc: <MdCalendarToday />,
};



const StudentInfoPopup = ({ student, onClose, onSave }) => {
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ ...student });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

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

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={onClose}>
            <div
                className="bg-white  p-5 rounded-2xl shadow-xl "
                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 border-b-2 pr-1">Thông tin học sinh</h2>
                    <button onClick={onClose} className="text-red-500 hover:text-red-700">✖</button>
                </div>

                <div className="grid grid-cols-4 gap-5 text-gray-800 ">
                    {[
                        { label: 'Mã HS', name: 'MaHS' },
                        { label: 'Tên HS', name: 'TenHS' },
                        { label: 'Khối', name: 'TenKhoi' },
                        { label: 'Lớp', name: 'TenLop' },
                        { label: 'Tổng điểm', name: 'TongDiem' },
                        { label: 'Xếp Loại', name: 'XepLoai' },
                        { label: 'Ngày Sinh', name: 'NgaySinh', type: 'date' },
                        { label: 'Giới Tính', name: 'GioiTinh', type: 'select', options: genderOptions },
                        { label: 'Địa Chỉ', name: 'DiaChi' },
                        { label: 'Tên Bố', name: 'TenBo' },
                        { label: 'SĐT Bố', name: 'SoDienThoaiBo' },
                        { label: 'Tên Mẹ', name: 'TenMe' },
                        { label: 'SĐT Mẹ', name: 'SoDienThoaiMe' },
                        { label: 'Người Giám Hộ', name: 'TenNguoiGiamHo' },
                        { label: 'SĐT NGH', name: 'SoDienThoaiNGH' },
                        { label: 'Trạng Thái', name: 'TrangThai', type: 'select', options: statusOptions },
                        { label: 'Ngày Nhập Học', name: 'NgayNhapHoc', type: 'date' },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className=" text-sm font-medium flex items-center gap-1">
                                {iconMap[field.name] || null}
                                {field.label}
                            </label>


                            {editMode ? (
                                field.type === 'select' ? (
                                    <select
                                        name={field.name}
                                        value={form[field.name] || ''}
                                        onChange={handleChange}
                                        className="mt-1 w-full p-2 border rounded"
                                    >
                                        {field.options.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type || 'text'}
                                        name={field.name}
                                        value={form[field.name] || ''}
                                        onChange={handleChange}
                                        className="mt-1 w-full p-2 border rounded"
                                    />
                                )
                            ) : (
                                <div className="mt-1 p-2 bg-gray-100 rounded">{form[field.name]}</div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    {!editMode ? (
                        <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Chỉnh sửa</button>
                    ) : (
                        <>
                            <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Lưu</button>
                            <button onClick={() => { setEditMode(false); setForm({ ...student }) }} className="px-4 py-2 bg-gray-400 text-white rounded">Hủy</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentInfoPopup;
