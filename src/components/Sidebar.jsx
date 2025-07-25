import React, { useState } from 'react';
import {
  MdDashboard,
  MdWork,
  MdAssignment,
  MdMail,
  MdInbox,
  MdCalendarToday,
  MdCampaign,
  MdSettings,
  MdTune,
  MdMoreHoriz,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown
} from 'react-icons/md';
import { IoWarning } from "react-icons/io5";

import { NavLink , Link } from 'react-router-dom';
import Logo from '../assets/Logo.webp';
const menuItems = [
  {
    name: 'Bảng Điều Khiển',
    icon: MdDashboard,
    subItems: [
      { name: 'Chính', link: '/Dashboard/Main' },
      { name: 'Phân Tích', link: '#' },
      { name: 'Thống kê / Báo cáo', link: '/DashBoard/Statistics' },
    ],
  },
  {
    name: 'Quản lý danh mục',
    icon: MdWork,
    subItems: [
      { name: 'Danh mục học sinh', link: '/Category/StudentCRUD' },
      { name: 'Nhóm tiêu chí / thành tích', link: '/Category/Criteria' },
      { name: 'Nhóm vi phạm', link: '/Category/Violate' },
      { name: 'Phân Quyền', link: '/Category/Roles' },
    ],
  },
  { name: 'Ghi nhận sự vụ', icon: MdInbox,
    subItems: [
      { name: 'Vi phạm', link: '/Pages/Violate' },
      { name: 'Thành tích', link: '/Pages/Achievement' },
    ], 
  },
  { name: 'Xác minh sự vụ', icon: MdAssignment, link: '/Pages/VerifyViolate' },
  {
    name: 'Chat',
    icon: MdMail,
    link: '/Pages/Chat',
    badge: 4,
    badgeColor: 'bg-purple-500 text-white',
  },
  {
    name: 'Cài Đặt',
    icon: MdSettings,
    subItems: [
      { name: 'Chung', link: '#' },
      { name: 'Bảo Mật', link: '#' },
    ],
  },
  {
    name: 'Tiện Ích',
    icon: MdTune,
    subItems: [
      { name: 'Trợ Giúp', link: '/Utilities/Support' },
      { name: 'Câu Hỏi Thường Gặp', link: '/Utilities/FAQ' },
    ],
  },
  {
    name: 'Báo lỗi',
    icon: MdCampaign,
    link: '/AlertError', // Nếu chưa có route này, bạn nên thêm
    badgeColor: 'bg-red-500 text-white',
  },
];


const Sidebar = ({ isOpen , Close}) => {
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (itemName) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="w-64 bg-white shadow-lg h-screen overflow-y-auto p-6 flex flex-col "   >
      <div className="flex items-center mb-6 px-3">
        <img src={Logo} alt="Logo" className="w-10 h-10 rounded-full" />
        <span className="text-xl font-semibold ml-8 text-gray-800">Nề Nếp HTU</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              {item.subItems ? (
                // Menu item with sub-items
                <>
                  <button
                    onClick={() => toggleSubMenu(item.name)}
                    className="flex items-center justify-between w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3 text-gray-500" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`ml-auto px-2 py-0.5 text-xs font-semibold rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                    {openSubMenus[item.name] ? (
                      <MdKeyboardArrowUp className="ml-2 h-4 w-4 text-gray-400" />
                    ) : (
                      <MdKeyboardArrowDown className="ml-2 h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  {openSubMenus[item.name] && (
                    <ul className="pl-10 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink to={subItem.link} 
                            className={`block p-2 text-sm rounded-lg transition-colors duration-20 text-gray-600 hover:text-purple-500 text-left
                              `}
                          >
                            {subItem.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Regular menu item without sub-items
                <NavLink
                  to={item.link} 
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <item.icon className="h-5 w-5 mr-3 text-gray-500" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`ml-auto px-2 py-0.5 text-xs font-semibold rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* More Section */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <NavLink
          to="/Utilities/About"
          className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <MdMoreHoriz className="h-5 w-5 mr-3 text-gray-500" />
          <span>MORE</span>
        </NavLink>
        <ul className="pl-10 mt-1 space-y-1">
          <li>
            <NavLink to="#" className="block p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-50">
              Authentication
            </NavLink>
          </li>
          {/* Add other "More" sub-items here if needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;