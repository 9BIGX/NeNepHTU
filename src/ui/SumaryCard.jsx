import React from 'react';
// import { DocumentTextIcon, ExclamationTriangleIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline'; // Hoặc các icon tương ứng
import { FaStar , FaClipboardList , FaUserClock  } from "react-icons/fa";
import { IoWarning } from "react-icons/io5"


function SummaryCards(props) {
    const {AmountEvent} = props;
  const cards = [
    {
      label: 'Tổng sự vụ',
      count: AmountEvent.tatca,
      icon: <FaClipboardList className="h-7 w-7 text-blue-500" />,
      color: 'bg-blue-100',
      TextColor: 'text-blue-500',
    },
    {
      label: 'Vi phạm',
      count: AmountEvent.vi_pham,
      icon: <IoWarning className="h-7 w-7 text-red-500" />,
      color: 'bg-red-100',
      TextColor: 'text-red-500',
    },
    {
      label: 'Thành tích',
      count: AmountEvent.thanh_tich,
      icon: <FaStar className="h-7 w-7 text-green-500" />,
      color: 'bg-green-100',
      TextColor: 'text-green-500',
    },
    {
      label: 'Chờ xử lý',
      count: AmountEvent.cho_xac_minh,
      icon: <FaUserClock className="h-7 w-7 text-yellow-500" />,
      color: 'bg-yellow-50',
      TextColor: 'text-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={`rounded-xl p-4 flex flex-col items-start shadow-sm ${card.color}`}>
          <div className="flex items-center justify-center p-1 rounded-full mb-2">
            {card.icon}
          </div>
          <span className={`text-3xl font-bold mx-1 ${card.TextColor}`}>{card.count}</span>
          <p className="text-gray-600 text-sm m-1 ">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;