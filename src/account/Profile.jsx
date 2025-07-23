import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const defaultProfile = {
  id: 'HS12345',
  name: 'Nguyễn Văn A',
  avatar: 'avatars/user.jpg',
  email: 'nguyenvana@example.com',
  phone: '0123456789',
  dob: '2008-05-15',
  gender: 'Nam',
  grade: '10',
  className: '10A1',
  role: 'Học sinh',
  address: '123 Đường ABC, Quận XYZ, TP. HCM',
  parentName: 'Nguyễn Văn B',
  parentPhone: '0987654321'
};

const UserProfilePage = ({ isSidebarOpen, toggleSidebar }) => {
  const [profile, setProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
        <div className="flex flex-col flex-1 p-2 h-screen">
          <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Thông tin cá nhân"} />
          <div className="h-full flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
            <div className=" bg-gray-100 py-10 px-4">
              <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md py-10">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col gap-5 items-center">
                    {profile.avatar ? (
                      <>
                      <img
                        src={profile.avatar}
                        alt="avatar"
                        className="w-32 h-32 bg-gray-200 rounded-full object-cover"
                      />
                      <button className='px-4 py-1 rounded-lg bg-purple-500 text-white' type="button">Đổi ảnh</button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-500">
                        No Image
                      </div>
                    )}
                    
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-medium">Tên học sinh:</label>
                      <p className={`w-full border p-2 rounded-md text-start 
                        ${isEditing ? 'bg-red-200' : ''}`}>
                        {profile.name}</p>
                    </div>

                    <div>
                      <label className="font-medium">Mã học sinh:</label>
                      <p className={`w-full border p-2 rounded-md text-start 
                        ${isEditing ? 'bg-red-200' : ''}`}>
                        {profile.id}</p>
                    </div>

                    <div>
                      <label className="font-medium">Khối:</label>
                      <p className={`w-full border p-2 rounded-md text-start 
                        ${isEditing ? 'bg-red-200' : ''}`}>{profile.grade}</p>
                    </div>

                    <div>
                      <label className="font-medium">Lớp:</label>
                      <p className={`w-full border p-2 rounded-md text-start 
                        ${isEditing ? 'bg-red-200' : ''}`}>{profile.className}</p>
                    </div>

                    <div>
                      <label className="font-medium">Chức vụ:</label>
                      <p className={`w-full border p-2 rounded-md text-start 
                        ${isEditing ? 'bg-red-200' : ''}`}>{profile.role}</p>
                    </div>

                    <div>
                      <label className="font-medium">Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="font-medium">Số điện thoại:</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="font-medium">Giới tính:</label>
                      <input
                        type="text"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="font-medium">Địa chỉ:</label>
                      <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="font-medium">Phụ huynh:</label>
                      <input
                        type="text"
                        name="parentName"
                        value={profile.parentName}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="font-medium">SĐT phụ huynh:</label>
                      <input
                        type="text"
                        name="parentPhone"
                        value={profile.parentPhone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-right">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded text-white transition ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
                      }`}
                  >
                    <FaEdit /> {isEditing ? 'Lưu thay đổi' : 'Chỉnh sửa'}
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
