import React from 'react';

const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative max-w-3xl w-full px-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-5xl font-bold hover:text-red-400"
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Popup"
          className="max-h-[90vh] w-auto mx-auto rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

export default ImageModal;
