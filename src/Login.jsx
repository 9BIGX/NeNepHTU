import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
// import './login.css'; // Assuming you have a CSS file htmlFor styling
function LoginPage({ isSidebarOpen, toggleSidebar }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nevigate = useNavigate();
  const ApiUrl = import.meta.env.VITE_API_URL;
  // Handle htmlForm submission
  const handleSubmit = async (e) => {
    await fetch(ApiUrl + '/api/LoginPc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (!data.success) return alert('Đăng nhập thất bại: ' + data.message);
        nevigate('/Dashboard/Main');
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });

  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 
                flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">

        {/* Logo */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-in">
          <img className="mx-auto h-40 w-auto rounded-2xl transform transition duration-300 hover:scale-105"
            src="/IconNoBG.png" alt="Workflow" />
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">
            Hệ thống quản lý nề nếp
          </h2>
          <p className="mt-2 text-center text-sm text-blue-500">
            <a href="#" className="hover:underline">Đăng nhập tài khoản</a>
          </p>
        </div>

        {/* Form */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-slide-up">
          <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-100 
                    hover:shadow-blue-200 transition-shadow duration-500">
            <form>
              {/* Username */}
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Tên đăng nhập / mã học sinh, giảng viên
              </label>
              <div className="mt-1 relative">
                <input id="username" name="username" placeholder="user / 12345" onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                            transition duration-300" />
                <svg className="h-5 w-5 text-red-500 absolute right-3 top-2 animate-pulse"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 
                  11-2 0 1 1 0 012 0zm-1-9a1 1 0 
                  00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"></path>
                </svg>
              </div>

              {/* Password */}
              <label htmlFor="password" className="mt-6 block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <input id="password" name="password" type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                          transition duration-300" />

              {/* Forgot password */}
              <div className="mt-4 text-right">
                <a href="#" className="text-blue-500 hover:underline">Quên mật khẩu?</a>
              </div>

              {/* Button */}
              <button type="button" onClick={handleSubmit}
                disabled={!username || !password}
                className="mt-6 w-full py-2 px-4 text-sm font-semibold rounded-md text-white
                           bg-gradient-to-r from-blue-500 to-blue-600
                           hover:from-blue-600 hover:to-blue-700
                           shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-200
                           transform transition-all duration-300 hover:scale-[1.02]">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </>

  );
}

export default LoginPage;