import * as XLSX from "xlsx";
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
const ImportExcel = ({ isSidebarOpen, toggleSidebar }) => {
    const [data, setData] = useState([]);
    const [fileName, setFileName] = useState("");
    const [selectedColumns, setSelectedColumns] = useState(
        ["Mã học sinh", "Họ và tên học sinh", "Ngày sinh", 'Giới tính',
            'Lớp', 'Ngày vào trường', 'Địa chỉ thường trú', 'Họ và tên cha',
            'Số điện thoại của cha', 'Họ và tên mẹ', 'Số điện thoại của mẹ',
            'Họ tên người bảo hộ', 'Số điện thoại của người bảo hộ'
        ]); // เลือกเฉพาะ column ที่ต้องการ

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const workbook = XLSX.read(bstr, { type: "binary" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            const rawData = XLSX.utils.sheet_to_json(worksheet, { range: 3 }); // ข้ามแถวหัว

            const filtered = rawData.map((row) => {
                const f = {};
                selectedColumns.forEach((col) => f[col] = row[col]);
                return f;
            });

            setData(filtered);
        };

        reader.readAsBinaryString(file);
    };

    const handleGetList = () => {
        console.log("📋 Danh sách học sinh:", data);
        alert(`Đã lấy danh sách ${data.length} học sinh, kiểm tra console!`);
        // หรือจะส่งต่อให้ backend, lưuไว้ใน state อื่น ฯลฯ ก็ได้
    };

    const handleClear = () => {
        setData([]);
        setFileName("");
    };

    return (
        <div className="flex bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
            <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
            <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
            <div className="flex flex-col flex-1 z-2">
                <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={""} />
                <div className="flex flex-col mt-8  p-5 rounded-lg shadow overflow-y-auto ">
                    {/* content */}

                    <div className="max-w-full mx-auto p-6 bg-white rounded-xl shadow-md">
                        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">
                            📥 Import học sinh từ Excel
                        </h1>

                        <div
                            className="border-dashed border-2 border-purple-500 rounded-xl p-6 text-center hover:bg-purple-50 transition mb-6"
                            onDragOver={(e) => {
                                e.preventDefault(); // Ngăn hành vi mặc định của trình duyệt
                                e.stopPropagation();
                            }}
                            onDrop={(e) => {
                                e.preventDefault(); // Ngăn hành vi mặc định
                                e.stopPropagation();
                                const file = e.dataTransfer.files[0];
                                if (file) {
                                    // Gọi hàm xử lý file của bạn
                                    handleFileUpload({ target: { files: [file] } });
                                }
                            }}
                        >
                            <label htmlFor="fileInput" className="cursor-pointer text-purple-600 font-medium">
                                {fileName ? `📄 ${fileName}` : "Kéo thả hoặc nhấp để chọn file Excel (.xlsx)"}
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </div>

                        {data.length > 0 && (
                            <>
                                <div className="flex gap-4 mb-4 justify-end">
                                    <button
                                        onClick={handleGetList}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                    >
                                        📋 Lấy danh sách
                                    </button>
                                    <button
                                        onClick={handleClear}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                    >
                                        🗑️ Xóa dữ liệu
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-purple-400 rounded-md overflow-hidden shadow">
                                        <thead>
                                            <tr className="bg-purple-100 text-purple-700 text-left">
                                                {selectedColumns.map((col) => (
                                                    <th key={col} className="px-4 py-2 border border-purple-300">{col}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((row, i) => (
                                                <tr key={i} className="hover:bg-purple-50 transition">
                                                    {selectedColumns.map((col) => (
                                                        <td key={col} className="px-4 py-2 border border-purple-200">{row[col]}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="text-sm text-gray-500 mt-2">Đã import {data.length} dòng dữ liệu.</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportExcel;
