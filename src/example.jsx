import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function WorkPage({ isSidebarOpen, toggleSidebar }) {

  return (
    <>
      <div className="flex bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
        <div className="flex flex-col flex-1 p-2 h-screen">
          <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={""} />
          <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
          </div>
        </div>
      </div>
    </>

  );
}

export default WorkPage;