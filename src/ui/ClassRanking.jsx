import React from 'react';
import { FaTrophy } from 'react-icons/fa'; // Import biểu tượng cúp từ Font Awesome

function ClassRankingCard() {
    const rankingData = [
        {
            className: '11B2',
            score: '86',
            rank: '2',
            bgColor: 'bg-gray-200',
            textColor: 'text-gray-700',
            iconColor: 'text-gray-500',
            height: 'h-[86%]'
        },
        {
            className: '12A1',
            score: 90,
            rank: '1',
            bgColor: 'bg-yellow-300',
            textColor: 'text-white',
            iconColor: 'text-white',
            height: `h-[100%]`
        },
        {
            className: '10A3',
            score: '70',
            rank: '3',
            bgColor: 'bg-orange-400',
            textColor: 'text-white',
            iconColor: 'text-orange-700',
            height: 'h-[70%]'
        },
    ];

    return (
        <div className='relative w-full h-full bg-white rounded-2xl shadow-md'>
            <div className='flex justify-around items-center w-full h-1/6 mb-5 '>
                <p className='text-lg text-start bg'>Xếp hạng thi đua</p>
                <select id="LevelViolate"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 ">
                    <option value="1">Theo tuần</option>
                    <option value="2">Theo tháng</option>
                    <option value="3">Theo kỳ</option>
                    <option value="4">Theo năm</option>
                </select>
                <select id="LevelViolate"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 ">
                    <option value="1">Tổng điểm</option>
                    <option value="2">Điểm nề nếp</option>
                    <option value="3">Điểm học tập</option>
                    <option value="4">Hoạt động</option>
                </select>
            </div>
            <div className='flex w-full h-[75%]  justify-center px-6 items-start'>
                <div className="flex w-full h-full  justify-center gap-5  pl-5 items-end ">
                    {rankingData.map((data, index) => (
                        <div
                            key={index}
                            className={`w-full ${data.bgColor} ${data.height} overflow-hidden rounded-lg p-8 flex flex-col items-center shadow-md`}
                        >
                            <FaTrophy className={`w-8 h-8 mb-2 ${data.iconColor}`} />
                            <span className={`text-xl font-semibold ${data.textColor}`}>{data.className}</span>
                            <span className={`text-2xl font-bold ${data.textColor}`}>{data.score}</span>
                            <span className={`text-md ${data.textColor}`}>#{data.rank}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ClassRankingCard;