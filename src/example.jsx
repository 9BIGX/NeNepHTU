import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function WorkPage({ isSidebarOpen, toggleSidebar }) {

  return (
    <>
      <div className="flex bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
        <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
        <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
        <div className="flex flex-col flex-1 z-2">
          <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={""} />
          <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto ">
            {/* content */}
          </div>
        </div>
      </div>
    </>

  );
}

export default WorkPage;