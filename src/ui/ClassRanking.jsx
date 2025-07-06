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
            height: `h-[90%]`
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
        <div className='relative w-full h-full bg-white rounded-lg shadow-md'>
            <div className='flex justify-around items-center w-full h-1/6 '>
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
            <div className='flex w-full h-4/5  justify-center  px-5 items-end  '>
                <div className='relative flex w-[7%] flex-col-reverse  justify-between h-[102.75%] border-l-2 '>
                    <p className=''>- 0</p>
                    <p className=''>- 10</p>
                    <p className=''>- 20</p>
                    <p className=''>- 30</p>
                    <p className=''>- 40</p>
                    <p className=''>- 50</p>
                    <p className=''>- 60</p>
                    <p className=''>- 70</p>
                    <p className=''>- 80</p>
                    <p className=''>- 90</p>
                    <p className=''>- 100</p>
                </div>
            <div className="flex w-full h-full  justify-center gap-4  px-8 items-end ">
                {rankingData.map((data, index) => (
                    <div
                        key={index}
                        className={`w-full ${data.bgColor} ${data.height} overflow-hidden rounded-lg p-7 flex flex-col items-center shadow-md`}
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