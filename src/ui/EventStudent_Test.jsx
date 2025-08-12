import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";
import ImageModal from '../components/ImgPopup';

const EventTablePage = (props) => {
  const { events, setEvents, VerifyCallBack, CancelCallBack } = props;
  const [ImageUrl, setImageUrl] = useState(null);

  const handleDelete = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
    CancelCallBack(updated[index].id);
  };

  const handleVerify = (index) => {
    const updated = [...events];
    updated[index].status = 'da_xac_minh';
    setEvents(updated);
    VerifyCallBack(updated[index].id);
  };

  const renderTable = () => (
    <>
      <table className="w-full border mb-8 text-md rounded-xl overflow-hidden shadow-md">
        <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
          <tr>
            {["Loại", "Tên học sinh", "Mã • Lớp", "Mô tả", "Thời gian", "Người liên quan", "Điểm", "Trạng thái", "Hành động", "Ảnh xác minh"]
              .map(header => (
                <th key={header} className="p-3 font-semibold text-gray-700">{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {events.map((e, i) => (
            <tr
              key={e.id}
              className={`border-t transition-all duration-300 hover:bg-blue-50 ${e.type === "vi_pham" ? "bg-red-50" : "bg-green-50"
                }`}
            >
              <td className="p-2 text-gray-700">{e.type === "vi_pham" ? "Vi phạm" : "Thành tích"}</td>
              <td className="p-2 text-gray-800">{e.studentName}</td>
              <td className="p-2 text-gray-800">{e.studentId} • {e.studentClass}</td>
              <td className="p-2 text-gray-700 max-w-[200px]">{e.description}</td>
              <td className="p-2 text-gray-700">{e.time}</td>
              <td className="p-2 text-gray-700">{e.relatedPerson}</td>
              <td className={`p-2 font-bold ${e.points < 0 ? "text-red-600" : "text-green-600"}`}>
                {e.points > 0 ? `+${e.points}` : e.points}
              </td>
              <td className="p-2 text-gray-700">
                {e.status === "da_xac_minh" ? "Đã xác minh" : "Chờ xác minh"}
              </td>
              <td className="p-2 text-right space-x-2">
                {e.status !== "da_xac_minh" && (
                  <button
                    onClick={() => handleVerify(i)}
                    className="text-green-600 hover:text-green-800 hover:scale-110 transition-transform text-xl"
                    title="Xác minh"
                  >
                    <FaCheck />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(i)}
                  className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform text-xl"
                  title="Xoá"
                >
                  <MdCancel />
                </button>
              </td>
              <td className="p-2">
                {e.url && (
                  <button
                    onClick={() => setImageUrl(e.url)}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-200"
                  >
                    Xem ảnh
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {ImageUrl && <ImageModal imageUrl={ImageUrl} onClose={() => setImageUrl(null)} />}
    </>
  );

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Danh sách sự vụ học sinh</h2>
      {renderTable()}
    </div>
  );
};

export default EventTablePage;
