import React from 'react';
import { FaUser, FaClock } from "react-icons/fa";

function EventList({ events, VerifyCallBack , CancelCallBack }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'da_xac_minh':
                return 'bg-green-100 text-green-700';
            case 'cho_xac_minh':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getPointsColor = (points) => {
        if (points > 0) return 'text-green-600';
        if (points < 0) return 'text-red-600';
        return 'text-gray-600';
    };

    const getEventTypeLabel = (type) => {
        return type === 'vi_pham' ? 'Vi phạm' : 'Thành tích';
    };

    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Danh sách sự vụ ({events.length})</h2>
            <div className="grid grid-cols-2 gap-5">
                {events.map((event) => (
                    <div key={event.id} className="bg-white rounded-xl shadow-sm p-4 relative">
                        <div
                            className={`absolute top-0 right-0 rounded-bl-xl rounded-tr-xl px-3 py-1 text-xs font-semibold ${event.type === 'vi_pham' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                                }`}
                        >
                            {getEventTypeLabel(event.type)}
                        </div>

                        <div className="flex items-center mb-2">
                            <img src={event.url} className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-lg font-bold mr-3 object-cover ${event.type === 'vi_pham' ? 'bg-red-400' : 'bg-green-400'}`}/>
                            <div>
                                <p className="font-semibold text-gray-800">{event.studentName}</p>
                                <p className="text-sm text-gray-500">{event.studentId} • {event.studentClass}</p>
                            </div>
                        </div>

                        <p className="text-gray-700 mb-2">{event.description}</p>
                        <div className='flex items-end justify-between'>
                            <div>
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                    <FaClock className="h-4 w-4 mr-1" />
                                    <span>{event.time}</span>
                                </div>

                                {event.relatedPerson && (
                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                        <FaUser className="h-4 w-4 mr-1" />
                                        <span>{event.relatedPerson}</span>
                                    </div>
                                )}
                            </div>
                            {event.status !== 'da_xac_minh' && (
                                <div className='flex gap-2'>
                                    <button onClick={() => CancelCallBack(event.id)} className="bg-red-500 text-white px-6 py-1 rounded-lg text-sm hover:bg-red-600" >Hủy</button>
                                    <button onClick={() => VerifyCallBack(event.id)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600">Xác minh</button>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                                {event.status === 'da_xac_minh' ? 'Đã xác minh' : 'Chờ xác minh'}
                            </span>
                            <span className={`text-lg font-bold ${getPointsColor(event.points)}`}>
                                {event.points > 0 ? `+${event.points}` : event.points} điểm
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventList;