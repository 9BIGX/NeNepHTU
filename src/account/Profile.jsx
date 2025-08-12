import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaEdit, FaSave, FaCamera } from 'react-icons/fa';

const sampleProfile = {
  avatar: 'https://via.placeholder.com/150', // Replace with a real avatar URL or handle it
  name: 'Nguyễn Văn A',
  id: 'HS001',
  grade: '10',
  className: '10A1',
  role: 'Học sinh',
  email: 'nguyenvana@gmail.com',
  phone: '0912345678',
  gender: 'Nam',
  address: '123 Đường ABC, Quận 1, TP. HCM',
  parentName: 'Nguyễn Văn B',
  parentPhone: '0987654321',
};

const UserProfilePage = ({ isSidebarOpen, toggleSidebar }) => {
  const [profile, setProfile] = useState(sampleProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Logic to save data to backend, e.g., saveProfile(profile);
      console.log('Saving profile:', profile);
    }
  };

  const handleAvatarChange = () => {
    // Logic to open file uploader
    alert('Đổi ảnh đại diện...');
  };

  return (
    <>
      <div className="flex bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
        <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
        <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
        <div className="flex flex-col flex-1 z-2">
          <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Thông tin cá nhân"} />
          <div className="h-full flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
            <div className="bg-gray-100 py-10 px-4">
              <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">Thông tin cá nhân</h2>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center">
                    {profile.avatar ? (
                      <div className="relative group">
                        <img
                          src={profile.avatar}
                          alt="avatar"
                          className="w-40 h-40 bg-gray-200 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        <button
                          onClick={handleAvatarChange}
                          className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          title="Đổi ảnh đại diện"
                        >
                          <FaCamera size={30} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-40 h-40 bg-gray-200 text-gray-500 rounded-full border-4 border-white shadow-md">
                        <FaCamera size={40} />
                      </div>
                    )}
                    <button
                      onClick={handleAvatarChange}
                      className='mt-4 px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200'
                      type="button"
                    >
                      Đổi ảnh
                    </button>
                  </div>

                  {/* Profile Details Section */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full">
                    {/* Display non-editable info */}
                    {[
                      { label: 'Tên học sinh', value: profile.name },
                      { label: 'Mã học sinh', value: profile.id },
                      { label: 'Khối', value: profile.grade },
                      { label: 'Lớp', value: profile.className },
                      { label: 'Chức vụ', value: profile.role },
                    ].map((field, index) => (
                      <div key={index} className="flex flex-col">
                        <label className="font-semibold text-gray-700 text-sm mb-1">{field.label}</label>
                        <p className="w-full border border-gray-300 p-3 rounded-md text-gray-800 bg-gray-100 font-medium">
                          {field.value}
                        </p>
                      </div>
                    ))}

                    {/* Display editable info */}
                    {[
                      { label: 'Email', name: 'email', value: profile.email, type: 'email' },
                      { label: 'Số điện thoại', name: 'phone', value: profile.phone, type: 'text' },
                      { label: 'Giới tính', name: 'gender', value: profile.gender, type: 'text' },
                      { label: 'Phụ huynh', name: 'parentName', value: profile.parentName, type: 'text' },
                      { label: 'SĐT phụ huynh', name: 'parentPhone', value: profile.parentPhone, type: 'text' },
                    ].map((field, index) => (
                      <div key={index} className="flex flex-col">
                        <label className="font-semibold text-gray-700 text-sm mb-1">{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={field.value}
                          onChange={handleChange}
                          className={`w-full border border-gray-300 p-3 rounded-md text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                          disabled={!isEditing}
                        />
                      </div>
                    ))}

                    {/* Address Field (full width) */}
                    <div className="md:col-span-2 flex flex-col">
                      <label className="font-semibold text-gray-700 text-sm mb-1">Địa chỉ</label>
                      <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        className={`w-full border border-gray-300 p-3 rounded-md text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 text-right">
                  <button
                    onClick={handleEditToggle}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-colors duration-200
              ${isEditing
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-purple-600 hover:bg-purple-700'
                      }`}
                  >
                    {isEditing ? <FaSave /> : <FaEdit />}
                    <span>{isEditing ? 'Lưu thay đổi' : 'Chỉnh sửa'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>

  );
};

export default UserProfilePage;
