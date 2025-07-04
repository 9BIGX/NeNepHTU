import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function MainPage({isSidebarOpen, toggleSidebar}) {
  return (
    <div className="flex bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
      <div className="flex-1 p-6">
        <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Trang Chu"} />
        <div className="mt-8 bg-white p-5 rounded-lg shadow">
          <p>Trang chu</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;