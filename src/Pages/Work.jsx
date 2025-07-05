import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function WorkPage({isSidebarOpen, toggleSidebar}) {
  return (
    <>  
    <div className="flex bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
      <div className="flex-1 p-6">
        <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Trang làm việc"} />
        <div className="mt-8 bg-white p-5 rounded-lg shadow">
          <p>trang lam viec</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default WorkPage;