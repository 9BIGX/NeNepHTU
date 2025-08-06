import React from 'react';

const SessionExpiredModal = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center animate-fade-in-up">
        <h2 className="text-xl font-semibold text-red-600 mb-2">phiên đăng nhập đã hết hạn</h2>
        <p className="text-gray-700 mb-6"></p>
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
