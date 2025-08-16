import React from 'react';

const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  const handleOutsideClick = (e) => {
    // Nếu click vào lớp phủ (div ngoài cùng) chứ không phải ảnh, thì đóng modal
    if (e.target.id === 'image-modal-overlay') {
      onClose();
    }
  };

  return (
    // Thêm id cho div ngoài cùng để xác định khi click vào lớp phủ
    <div
      id="image-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOutsideClick}
    >
      <div className="relative max-w-4xl max-h-[90vh]">
        {/* Nút X được đặt ra ngoài khung ảnh */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-4xl font-bold p-2 z-50 hover:text-red-500 transition-colors duration-200"
          aria-label="Đóng"
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Hình ảnh xem chi tiết"
          className="rounded-xl shadow-2xl max-h-[90vh] w-auto mx-auto"
        />
      </div>
    </div>
  );
};
export default ImageModal;
