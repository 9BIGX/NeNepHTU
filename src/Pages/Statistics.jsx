import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BoxShowTotal from '../ui/BoxLayout';
import ExportToExcel from '../utilities/ExportExcel';
import { SiGoogleclassroom } from "react-icons/si";
import { IoWarning } from "react-icons/io5";
import { FaUserGraduate, FaTrophy } from "react-icons/fa6";
import Chart from '../ui/Chart';
// Import dữ liệu mới
import ClassPointData from '../data/ClassPoint';

// Dữ liệu giả định chi tiết (vẫn giữ nguyên để minh họa)
const violationData = [
  { id: 1, studentId: 'HS101', studentName: 'Nguyễn Văn A', type: 'Sử dụng điện, nước', level: 'Trung bình', date: '2025-08-10', block: '10', class: '10A1', point: -3 },
  { id: 2, studentId: 'HS112', studentName: 'Phạm Thị B', type: 'Vệ sinh', level: 'Nhẹ', date: '2025-08-09', block: '11', class: '11B2', point: -1 },
  { id: 3, studentId: 'HS123', studentName: 'Lê Văn C', type: 'Về học tập', level: 'Nặng', date: '2025-08-08', block: '12', class: '12C3', point: -5 },
  { id: 4, studentId: 'HS104', studentName: 'Trần Thị D', type: 'Sử dụng điện, nước', level: 'Trung bình', date: '2025-08-07', block: '10', class: '10A2', point: -3 },
  { id: 5, studentId: 'HS111', studentName: 'Trần Văn E', type: 'Về học tập', level: 'Nặng', date: '2025-08-06', block: '11', class: '11B1', point: -5 },
  { id: 6, studentId: 'HS103', studentName: 'Võ Thị G', type: 'Sử dụng điện, nước', level: 'Trung bình', date: '2025-08-05', block: '10', class: '10A3', point: -3 },
  { id: 7, studentId: 'HS122', studentName: 'Phan Văn H', type: 'Vệ sinh', level: 'Nhẹ', date: '2025-08-04', block: '12', class: '12C2', point: -1 },
  { id: 8, studentId: 'HS105', studentName: 'Đặng Thị K', type: 'Trang phục, tác phong', level: 'Nhẹ', date: '2025-08-03', block: '10', class: '10A4', point: -1 },
  { id: 9, studentId: 'HS116', studentName: 'Nguyễn Văn L', type: 'Trang phục, tác phong', level: 'Nhẹ', date: '2025-08-02', block: '11', class: '11B3', point: -1 },
  { id: 10, studentId: 'HS127', studentName: 'Hoàng Thị M', type: 'Vệ sinh', level: 'Trung bình', date: '2025-08-01', block: '12', class: '12C4', point: -3 },
  { id: 11, studentId: 'HS108', studentName: 'Lý Văn N', type: 'Sử dụng điện, nước', level: 'Nhẹ', date: '2025-07-31', block: '10', class: '10A5', point: -1 },
  { id: 12, studentId: 'HS119', studentName: 'Nguyễn Thị O', type: 'Vệ sinh', level: 'Trung bình', date: '2025-07-30', block: '11', class: '11B4', point: -3 },
  { id: 13, studentId: 'HS120', studentName: 'Phạm Văn P', type: 'Về học tập', level: 'Nặng', date: '2025-07-29', block: '12', class: '12C5', point: -5 },
  { id: 14, studentId: 'HS101', studentName: 'Nguyễn Văn A', type: 'Trang phục, tác phong', level: 'Nhẹ', date: '2025-07-28', block: '10', class: '10A1', point: -1 },
  { id: 15, studentId: 'HS113', studentName: 'Vũ Thị Q', type: 'Sử dụng điện, nước', level: 'Nhẹ', date: '2025-07-27', block: '11', class: '11B2', point: -1 },
  { id: 16, studentId: 'HS119', studentName: 'Trương Văn R', type: 'Vệ sinh', level: 'Trung bình', date: '2025-07-26', block: '12', class: '12C3', point: -3 },
  { id: 17, studentId: 'HS106', studentName: 'Bùi Thị S', type: 'Về học tập', level: 'Nặng', date: '2025-07-25', block: '10', class: '10A2', point: -5 },
  { id: 18, studentId: 'HS117', studentName: 'Đinh Văn T', type: 'Trang phục, tác phong', level: 'Nhẹ', date: '2025-07-24', block: '11', class: '11B1', point: -1 },
  { id: 19, studentId: 'HS128', studentName: 'Hoàng Văn U', type: 'Sử dụng điện, nước', level: 'Trung bình', date: '2025-07-23', block: '12', class: '12C4', point: -3 },
  { id: 20, studentId: 'HS109', studentName: 'Lê Thị V', type: 'Vệ sinh', level: 'Nhẹ', date: '2025-07-22', block: '10', class: '10A3', point: -1 },
  { id: 21, studentId: 'HS118', studentName: 'Mai Văn X', type: 'Về học tập', level: 'Nặng', date: '2025-07-21', block: '11', class: '11B3', point: -5 },
  { id: 22, studentId: 'HS129', studentName: 'Nguyễn Văn Y', type: 'Sử dụng điện, nước', level: 'Trung bình', date: '2025-07-20', block: '12', class: '12C5', point: -3 },
  { id: 23, studentId: 'HS102', studentName: 'Phạm Thị Z', type: 'Trang phục, tác phong', level: 'Nhẹ', date: '2025-07-19', block: '10', class: '10A4', point: -1 },
  { id: 24, studentId: 'HS115', studentName: 'Trần Văn A1', type: 'Vệ sinh', level: 'Trung bình', date: '2025-07-18', block: '11', class: '11B4', point: -3 },
  { id: 25, studentId: 'HS126', studentName: 'Đặng Thị B1', type: 'Về học tập', level: 'Nặng', date: '2025-07-17', block: '12', class: '12C3', point: -5 },
];

const achievementData = [
  { id: 1, studentId: 'HS105', studentName: 'Đinh Thị D', type: 'Văn nghệ', level: 'Trường', date: '2025-08-12', block: '10', class: '10A4', point: 2 },
  { id: 2, studentId: 'HS113', studentName: 'Hoàng Văn E', type: 'Thể thao', level: 'Khu vực', date: '2025-08-11', block: '11', class: '11B2', point: 5 },
  { id: 3, studentId: 'HS124', studentName: 'Trần Thị G', type: 'Hoạt động xã hội', level: 'Trường', date: '2025-08-10', block: '12', class: '12C3', point: 2 },
  { id: 4, studentId: 'HS113', studentName: 'Hoàng Văn E', type: 'Văn nghệ', level: 'Trường', date: '2025-08-09', block: '11', class: '11B2', point: 2 },
  { id: 5, studentId: 'HS106', studentName: 'Nguyễn Văn H', type: 'Hoạt động xã hội', level: 'Trường', date: '2025-08-08', block: '10', class: '10A2', point: 2 },
  { id: 6, studentId: 'HS128', studentName: 'Lê Văn P', type: 'Học tập', level: 'Trường', date: '2025-08-07', block: '12', class: '12C4', point: 2 },
  { id: 7, studentId: 'HS119', studentName: 'Mai Thị Q', type: 'Học tập', level: 'Trường', date: '2025-08-06', block: '11', class: '11B4', point: 2 },
  { id: 8, studentId: 'HS109', studentName: 'Vũ Văn T', type: 'Thể thao', level: 'Trường', date: '2025-08-05', block: '10', class: '10A3', point: 2 },
  { id: 9, studentId: 'HS121', studentName: 'Phạm Thị U', type: 'Hoạt động xã hội', level: 'Trường', date: '2025-08-04', block: '12', class: '12C1', point: 2 },
  { id: 10, studentId: 'HS102', studentName: 'Nguyễn Thị V', type: 'Học tập', level: 'Tỉnh', date: '2025-08-03', block: '10', class: '10A4', point: 10 },
  { id: 11, studentId: 'HS115', studentName: 'Trần Văn X', type: 'Văn nghệ', level: 'Trường', date: '2025-08-02', block: '11', class: '11B4', point: 2 },
  { id: 12, studentId: 'HS126', studentName: 'Đặng Thị Y', type: 'Thể thao', level: 'Khu vực', date: '2025-08-01', block: '12', class: '12C3', point: 5 },
  { id: 13, studentId: 'HS107', studentName: 'Hoàng Văn Z', type: 'Hoạt động xã hội', level: 'Trường', date: '2025-07-31', block: '10', class: '10A5', point: 2 },
  { id: 14, studentId: 'HS118', studentName: 'Lý Văn A2', type: 'Học tập', level: 'Trường', date: '2025-07-30', block: '11', class: '11B3', point: 2 },
  { id: 15, studentId: 'HS129', studentName: 'Mai Thị B2', type: 'Thể thao', level: 'Trường', date: '2025-07-29', block: '12', class: '12C5', point: 2 },
  { id: 16, studentId: 'HS103', studentName: 'Nguyễn Văn C2', type: 'Học tập', level: 'Tỉnh', date: '2025-07-28', block: '10', class: '10A3', point: 10 },
  { id: 17, studentId: 'HS114', studentName: 'Phạm Thị D2', type: 'Văn nghệ', level: 'Trường', date: '2025-07-27', block: '11', class: '11B1', point: 2 },
  { id: 18, studentId: 'HS125', studentName: 'Trần Văn E2', type: 'Học tập', level: 'Khu vực', date: '2025-07-26', block: '12', class: '12C2', point: 5 },
  { id: 19, studentId: 'HS101', studentName: 'Nguyễn Văn A', type: 'Văn nghệ', level: 'Trường', date: '2025-07-25', block: '10', class: '10A1', point: 2 },
  { id: 20, studentId: 'HS112', studentName: 'Phạm Thị B', type: 'Thể thao', level: 'Trường', date: '2025-07-24', block: '11', class: '11B2', point: 2 },
  { id: 21, studentId: 'HS123', studentName: 'Lê Văn C', type: 'Học tập', level: 'Tỉnh', date: '2025-07-23', block: '12', class: '12C3', point: 10 },
  { id: 22, studentId: 'HS104', studentName: 'Trần Thị D', type: 'Hoạt động xã hội', level: 'Trường', date: '2025-07-22', block: '10', class: '10A2', point: 2 },
  { id: 23, studentId: 'HS111', studentName: 'Trần Văn E', type: 'Văn nghệ', level: 'Trường', date: '2025-07-21', block: '11', class: '11B1', point: 2 },
  { id: 24, studentId: 'HS122', studentName: 'Phan Văn H', type: 'Thể thao', level: 'Trường', date: '2025-07-20', block: '12', class: '12C2', point: 2 },
  { id: 25, studentId: 'HS105', studentName: 'Đặng Thị K', type: 'Học tập', level: 'Khu vực', date: '2025-07-19', block: '10', class: '10A4', point: 5 },
  { id: 26, studentId: 'HS116', studentName: 'Nguyễn Văn L', type: 'Văn nghệ', level: 'Trường', date: '2025-07-18', block: '11', class: '11B3', point: 2 },
  { id: 27, studentId: 'HS127', studentName: 'Hoàng Thị M', type: 'Hoạt động xã hội', level: 'Trường', date: '2025-07-17', block: '12', class: '12C4', point: 2 },
  { id: 28, studentId: 'HS108', studentName: 'Lý Văn N', type: 'Học tập', level: 'Tỉnh', date: '2025-07-16', block: '10', class: '10A5', point: 10 },
  { id: 29, studentId: 'HS119', studentName: 'Nguyễn Thị O', type: 'Thể thao', level: 'Trường', date: '2025-07-15', block: '11', class: '11B4', point: 2 },
  { id: 30, studentId: 'HS120', studentName: 'Phạm Văn P', type: 'Văn nghệ', level: 'Khu vực', date: '2025-07-14', block: '12', class: '12C5', point: 5 },
];

const violationColumns = [
  { header: 'Mã học sinh', accessor: 'studentId', sortable: true },
  { header: 'Tên học sinh', accessor: 'studentName', sortable: true },
  { header: 'Khối', accessor: 'block', sortable: true },
  { header: 'Lớp', accessor: 'class', sortable: true },
  { header: 'Loại', accessor: 'type' },
  { header: 'Mức độ', accessor: 'level' },
  { header: 'Ngày', accessor: 'date', sortable: true },
  { header: 'Điểm trừ', accessor: 'point', sortable: true },
];

// Định nghĩa cấu trúc cột cho bảng Thành tích
const achievementColumns = [
  { header: 'Mã học sinh', accessor: 'studentId', sortable: true },
  { header: 'Tên học sinh', accessor: 'studentName', sortable: true },
  { header: 'Khối', accessor: 'block', sortable: true },
  { header: 'Lớp', accessor: 'class', sortable: true },
  { header: 'Loại', accessor: 'type' },
  { header: 'Cấp độ', accessor: 'level' },
  { header: 'Ngày', accessor: 'date', sortable: true },
  { header: 'Điểm cộng', accessor: 'point', sortable: true },
];

const ColorHeaderTable = {
  ['Vipham']: 'bg-red-500',
  ['Thanhtich']: 'bg-green-500',
  ['Xuhuong']: 'bg-yellow-500',
}

function StatisticsPage({ isSidebarOpen, toggleSidebar }) {
  const [AllClassData] = useState(ClassPointData); // Dùng ClassPointData mới
  const [activeTab, setActiveTab] = useState('tongquan');

  // Tính toán tổng quan sử dụng .reduce()
  const TotalClass = AllClassData.length;
  const TotalStudent = AllClassData.reduce((sum, cls) => sum + cls.totalStudent, 0);
  const TotalViolate = AllClassData.reduce((sum, cls) => sum + cls.totalCriteria, 0);
  const TotalAchievement = AllClassData.reduce((sum, cls) => sum + cls.totalAchievement, 0);

  const getBlockStats = (data) => {
    // Dùng Set để lấy danh sách các khối duy nhất
    const blocks = [...new Set(data.map(item => item.block))];
    const stats = {};
    const totalEvents = data.length;

    blocks.forEach(block => {
      const blockData = data.filter(item => item.block === block);
      const blockCount = blockData.length;
      const percentage = ((blockCount / totalEvents) * 100).toFixed(1);

      const types = {};
      blockData.forEach(item => {
        types[item.type] = (types[item.type] || 0) + 1;
      });

      stats[block] = { count: blockCount, percentage, types };
    });

    return stats;
  };

  const blockViolationStats = getBlockStats(violationData);
  const blockAchievementStats = getBlockStats(achievementData);

  // Gom nhóm dữ liệu ClassPointData theo khối
  const groupedByGrade = AllClassData.reduce((acc, currentClass) => {
    const grade = currentClass.grade;
    if (!acc[grade]) {
      acc[grade] = [];
    }
    acc[grade].push(currentClass);
    return acc;
  }, {});

  // Giả sử data là danh sách vi phạm
  const calculateClassSummary = (data) => {
    const classSummary = {};

    data.forEach(item => {
      const className = item.class; // Hoặc item['Lớp'] tùy vào dữ liệu
      const studentName = item.studentName; // Hoặc item['Tên học sinh']
      const studentCode = item.studentId; // Hoặc item['Mã học sinh']
      const point = Number(item.point) || 0; // Hoặc item['Điểm trừ']

      if (!classSummary[className]) {
        classSummary[className] = {
          totalPoints: 0,
          students: []
        };
      }

      classSummary[className].totalPoints += point;
      classSummary[className].students.push({
        code: studentCode,
        name: studentName,
        point: point
      });
    });

    // Chuyển thành mảng kết quả
    return Object.entries(classSummary).map(([className, classData]) => ({
      'Lớp': className,
      'Tổng điểm': classData.totalPoints,
      'Ghi chú': classData.students
        .map(s => `${s.code}: ${s.name}`)
        .join(', ')
    }));
  };

  // Sử dụng:



  const removeAccents = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  const DataTable = ({ data, columns, colorHeader, fileName, title }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const itemsPerPage = 10;

    // --- Logic tìm kiếm và sắp xếp ---

    // 1. Lọc dữ liệu theo searchTerm
    const filteredData = data.filter(item => {
      const searchLower = removeAccents(searchTerm.toLowerCase());
      const searchFields = columns.map(col => item[col.accessor]);

      return searchFields.some(field => {
        if (typeof field === 'string' || typeof field === 'number') {
          return removeAccents(String(field).toLowerCase()).includes(searchLower);
        }
        return false;
      });
    });

    // 2. Sắp xếp dữ liệu đã lọc
    const sortedData = [...filteredData].sort((a, b) => {
      if (!sortConfig.key) return 0;

      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (typeof aVal === 'string') aVal = removeAccents(aVal.toLowerCase());
      if (typeof bVal === 'string') bVal = removeAccents(bVal.toLowerCase());

      if (aVal < bVal) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    // 3. Phân trang dữ liệu đã sắp xếp
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    // --- Các hàm xử lý sự kiện ---

    const handleSort = (key) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

    const renderSortIcon = (key) => {
      if (sortConfig.key !== key) {
        return <span className='text-gray-400'>&#x2195;</span>; // Biểu tượng lên-xuống
      }
      return sortConfig.direction === 'asc' ? <span className='text-blue-500'>&#x25B2;</span> : <span className='text-blue-500'>&#x25BC;</span>; // Mũi tên lên hoặc xuống
    };

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
    const totalItems = sortedData.length;
    const totalCountByBlock = sortedData.reduce((acc, item) => {
      acc[`- Khối ${item.block}`] = (acc[`- Khối ${item.block}`] || 0) + 1;
      return acc;
    }, {});


    // Gộp dữ liệu tổng hợp
    const summaryData = {
      'Tổng số học sinh': totalItems,
      ...totalCountByBlock
    };

    const handleExport = async () => {
      const classSummary = calculateClassSummary(sortedData);
      console.log('Class Summary:', classSummary);

      const dataToExport = sortedData.map(item => {
        const exportItem = {};
        columns.forEach(col => {
          exportItem[col.header] = item[col.accessor];
        });
        return exportItem;
      });

      await ExportToExcel(
        dataToExport,
        fileName,
        title,
        summaryData,
        columns,
        classSummary
      );
    };

    // --- Giao diện (JSX) ---

    return (
      <div className='w-full'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-bold text-gray-800'>Danh sách</h3>
          <div className='flex items-center space-x-4'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className='p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              onClick={handleExport}
              className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors'
            >
              Xuất Excel
            </button>
          </div>
        </div>
        <div className='overflow-x-auto bg-white rounded-lg shadow-md'>
          <table className='w-full text-left table-auto'>
            <thead>
              <tr className={` ${colorHeader ? colorHeader + '' : 'bg-gray-500 text-gray-600'} text-white  uppercase text-md`}>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className='py-3 px-6 cursor-pointer hover:bg-gray-100/50 transition-colors'
                    onClick={() => col.sortable && handleSort(col.accessor)}
                  >
                    <div className='flex items-center justify-between'>
                      <span>{col.header}</span>
                      {col.sortable && renderSortIcon(col.accessor)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={item.id} className='border-b border-gray-200 hover:bg-gray-50'>
                    {columns.map((col, index) => (
                      <td key={index} className='py-3 px-6'>{item[col.accessor]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className='text-center py-4 text-gray-500'>
                    Không tìm thấy dữ liệu phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Phân trang */}
        {totalPages > 1 && (
          <div className='flex justify-center mt-4 space-x-2'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='px-3 py-1 border rounded-md disabled:opacity-50'
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='px-3 py-1 border rounded-md disabled:opacity-50'
            >
              Tiếp
            </button>
          </div>
        )}
      </div>
    );
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case 'tongquan':
        return (
          <div className='flex w-full gap-8 items-start mt-5'>
            <div className='w-1/2 flex flex-col'>
              <div className='grid lg:grid-cols-4 grid-cols-2 gap-4 w-full p-1'>
                <BoxShowTotal TotalAmount={TotalClass.toLocaleString()} Icon={<SiGoogleclassroom className="text-5xl text-blue-500 bg-blue-100 p-3 rounded-md" />} ColorAmount={"text-blue-500"} Headtext={"Tổng số lớp"} />
                <BoxShowTotal TotalAmount={TotalStudent.toLocaleString()} Icon={<FaUserGraduate className="text-5xl text-green-500 bg-green-100 p-3 rounded-md" />} ColorAmount={"text-green-500"} Headtext={"Tổng số Học sinh"} />
                <BoxShowTotal TotalAmount={TotalViolate.toLocaleString()} Icon={<IoWarning className="text-5xl text-red-500 bg-red-100 p-3 rounded-md" />} ColorAmount={"text-red-500"} Headtext={"Vi phạm"} />
                <BoxShowTotal TotalAmount={TotalAchievement.toLocaleString()} Icon={<FaTrophy className="text-5xl text-yellow-500 bg-yellow-100 p-3 rounded-md" />} ColorAmount={"text-yellow-500"} Headtext={"Thành tích"} />
              </div>
              <div className='w-full mt-8'>
                <h3 className='text-2xl font-bold text-gray-800 mb-4'>Thống kê tổng quan theo khối</h3>
                <div className='overflow-x-auto bg-white rounded-lg shadow-md p-4'>
                  <table className='w-full text-left table-auto'>
                    <thead className='bg-gray-200 text-gray-600 uppercase text-sm'>
                      <tr>
                        <th className='py-3 px-6'>Khối</th>
                        <th className='py-3 px-6 text-center'>Số lớp</th>
                        <th className='py-3 px-6 text-center'>Số học sinh</th>
                        <th className='py-3 px-6 text-center'>Vi phạm</th>
                        <th className='py-3 px-6 text-center'>Thành tích</th>
                        <th className='py-3 px-6 text-center'>Điểm TB</th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                      {Object.keys(groupedByGrade).map(grade => {
                        const classesInGrade = groupedByGrade[grade];
                        const totalStudents = classesInGrade.reduce((total, current) => total + current.totalStudent, 0);
                        const totalViolations = classesInGrade.reduce((total, current) => total + current.totalCriteria, 0);
                        const totalAchievements = classesInGrade.reduce((total, current) => total + current.totalAchievement, 0);
                        const totalPoints = classesInGrade.reduce((total, current) => total + current.totalPoint, 0);
                        const averagePoint = (totalPoints / classesInGrade.length).toFixed(1);

                        return (
                          <tr key={grade} className='border-b border-gray-200 hover:bg-gray-50'>
                            <td className='py-3 px-6 font-semibold'>Khối {grade}</td>
                            <td className='py-3 px-6 text-center'>{classesInGrade.length}</td>
                            <td className='py-3 px-6 text-center'>{totalStudents}</td>
                            <td className='py-3 px-6 text-center text-red-500'>{totalViolations}</td>
                            <td className='py-3 px-6 text-center text-green-500'>{totalAchievements}</td>
                            <td className='py-3 px-6 text-center text-yellow-500 font-bold'>{averagePoint}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='w-1/2'>
              <Chart data={AllClassData} />
            </div>
          </div>
        );
      case 'vipham':
        return (
          <div className='w-full mt-5'>
            <h3 className='text-2xl font-bold text-gray-800 mb-6'>Thống kê vi phạm theo khối</h3>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-8'>
              {Object.keys(blockViolationStats).map(block => (
                <div key={block} className='bg-white p-6 rounded-xl shadow-lg border border-red-200 transition-transform duration-300 hover:scale-105'>
                  <div className='flex items-center justify-between mb-4'>
                    <h4 className='text-xl font-extrabold text-red-700'>Khối {block}</h4>
                    <IoWarning className='text-red-500 text-3xl' />
                  </div>
                  <p className='text-gray-600 text-sm'>
                    Tổng số vi phạm: <span className='font-bold text-red-600 text-xl'>{blockViolationStats[block].count}</span>
                  </p>

                  {/* Thanh tiến trình để biểu thị phần trăm */}
                  <div className='w-full bg-gray-200 rounded-full h-2.5 mt-2'>
                    <div
                      className='bg-red-500 h-2.5 rounded-full'
                      style={{ width: `${blockViolationStats[block].percentage}%` }}
                    ></div>
                  </div>
                  <p className='text-right text-sm font-medium text-red-500 mt-1'>
                    {blockViolationStats[block].percentage}% tổng số vi phạm
                  </p>

                  <div className='mt-5 pt-4 border-t border-gray-200'>
                    <p className='font-bold text-gray-700 mb-2'>Chi tiết:</p>
                    <ul className='space-y-2 text-sm'>
                      {Object.keys(blockViolationStats[block].types).map(type => (
                        <li key={type} className='flex justify-between items-center bg-red-50 p-2 rounded-lg'>
                          <span className='text-gray-700 font-medium'>{type}</span>
                          <span className='font-bold text-red-600'>{blockViolationStats[block].types[type]} lần</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <h3 className='text-2xl font-bold text-gray-800 mb-4'>Danh sách vi phạm</h3>
            <DataTable data={violationData} columns={violationColumns} colorHeader={ColorHeaderTable.Vipham} fileName="Thong_ke_vi_pham" title={'DANH SÁCH HỌC SINH VI PHẠM'} />
          </div>
        );
      case 'thanhtich':
        return (
          <div className='w-full mt-5'>
            <h3 className='text-2xl font-bold text-gray-800 mb-6'>Thống kê thành tích theo khối</h3>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-8'>
              {Object.keys(blockAchievementStats).map(block => (
                <div key={block} className='bg-white p-6 rounded-xl shadow-lg border border-green-200 transition-transform duration-300 hover:scale-105'>
                  <div className='flex items-center justify-between mb-4'>
                    <h4 className='text-xl font-extrabold text-green-700'>Khối {block}</h4>
                    <FaTrophy className='text-green-500 text-3xl' />
                  </div>
                  <p className='text-gray-600 text-sm'>
                    Tổng số thành tích: <span className='font-bold text-green-600 text-xl'>{blockAchievementStats[block].count}</span>
                  </p>

                  {/* Progress bar to show percentage */}
                  <div className='w-full bg-gray-200 rounded-full h-2.5 mt-2'>
                    <div
                      className='bg-green-500 h-2.5 rounded-full'
                      style={{ width: `${blockAchievementStats[block].percentage}%` }}
                    ></div>
                  </div>
                  <p className='text-right text-sm font-medium text-green-500 mt-1'>
                    {blockAchievementStats[block].percentage}% tổng số thành tích
                  </p>

                  <div className='mt-5 pt-4 border-t border-gray-200'>
                    <p className='font-bold text-gray-700 mb-2'>Chi tiết:</p>
                    <ul className='space-y-2 text-sm'>
                      {Object.keys(blockAchievementStats[block].types).map(type => (
                        <li key={type} className='flex justify-between items-center bg-green-50 p-2 rounded-lg'>
                          <span className='text-gray-700 font-medium'>{type}</span>
                          <span className='font-bold text-green-600'>{blockAchievementStats[block].types[type]} lần</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <h3 className='text-2xl font-bold text-gray-800 mb-4'>Danh sách thành tích</h3>
            <DataTable data={achievementData} columns={achievementColumns} colorHeader={ColorHeaderTable.Thanhtich} fileName="Thong_ke_thanh_tich" title={'DANH SÁCH THÀNH TÍCH HỌC SINH'} />
          </div>
        );
      case 'xuhuong':
        return (
          <div className='w-full mt-10 p-8 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center text-center'>
            <h3 className='text-4xl font-extrabold text-blue-600 mb-4 tracking-wide'>
              📊 Xu Hướng Vi Phạm / Thành Tích 🏆
            </h3>
            <p className='text-lg text-gray-600 font-medium'>
              Tính năng này sẽ được ra mắt trong các phiên bản cập nhật sắp tới. Cảm ơn bạn đã chờ đợi!
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
      <div className="flex flex-col flex-1 z-2">
        <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Thống kê / Báo cáo"} />
        <div className="p-4 md:p-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className='flex justify-start border-b-2 border-gray-200 pb-2 mb-4 space-x-6'>
              <button onClick={() => setActiveTab('tongquan')} className={`pb-2 text-lg font-medium transition-colors duration-200 ${activeTab === 'tongquan' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Tổng quan</button>
              <button onClick={() => setActiveTab('vipham')} className={`pb-2 text-lg font-medium transition-colors duration-200 ${activeTab === 'vipham' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-red-600'}`}>Vi phạm</button>
              <button onClick={() => setActiveTab('thanhtich')} className={`pb-2 text-lg font-medium transition-colors duration-200 ${activeTab === 'thanhtich' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-600'}`}>Thành tích</button>
              <button onClick={() => setActiveTab('xuhuong')} className={`pb-2 text-lg font-medium transition-colors duration-200 ${activeTab === 'xuhuong' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500 hover:text-yellow-600'}`}>Xu hướng</button>
            </div>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;