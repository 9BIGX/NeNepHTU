import React, { useState } from 'react';
import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/outline';

function HeadViolate() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <header className="bg-red-500 text-white pt-12 pb-4 px-4 relative rounded-b-xl">
      <div className="flex justify-between items-center mb-4">
        <ChevronLeftIcon className="h-6 w-6" />
        <div className="text-center">
          <h1 className="text-lg font-bold">Quản Lý Sư Vụ</h1>
          <p className="text-sm opacity-90">Vi phạm & thành tích học sinh</p>
        </div>
        <PlusIcon className="h-6 w-6" />
      </div>
      <div className="flex justify-around bg-red-600 rounded-lg p-1 mx-auto max-w-sm absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)]">
        <button
          className={`flex-1 py-2 text-center rounded-md text-sm font-medium ${
            activeTab === 'all' ? 'bg-white text-red-600 shadow' : 'text-white/80'
          }`}
          onClick={() => setActiveTab('all')}
        >
          Tất cả
        </button>
        <button
          className={`flex-1 py-2 text-center rounded-md text-sm font-medium ${
            activeTab === 'violations' ? 'bg-white text-red-600 shadow' : 'text-white/80'
          }`}
          onClick={() => setActiveTab('violations')}
        >
          Vi phạm
        </button>
        <button
          className={`flex-1 py-2 text-center rounded-md text-sm font-medium ${
            activeTab === 'achievements' ? 'bg-white text-red-600 shadow' : 'text-white/80'
          }`}
          onClick={() => setActiveTab('achievements')}
        >
          Thành tích
        </button>
      </div>
    </header>
  );
}

export default HeadViolate;