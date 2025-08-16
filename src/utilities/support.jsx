import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ContactBlock from '../ui/ContactBlock';
import {
    MdHeadsetMic,
    MdEmail,
    MdPhone,
    MdOutlineBugReport,
    MdFeedback,
    MdApartment
} from 'react-icons/md';
import { HiPhone } from 'react-icons/hi';
import { IoIosCall } from 'react-icons/io';
import { IoLocationSharp } from "react-icons/io5";
import { PiBuildingApartment } from "react-icons/pi";

function SupportPage({ isSidebarOpen, toggleSidebar }) {

    const phoneSupportData = {
        title: 'Hỗ trợ qua điện thoại',
        icon: <IoIosCall />,
        color: 'text-purple-600',
        contacts: [
            {
                label: 'Hotline 24/7',
                value: '1900-xxxx',
                icon: <HiPhone />,
                copy: true,
            },
            {
                label: 'Hỗ trợ kỹ thuật',
                value: '(028) 1234-5678',
                icon: <MdHeadsetMic />,
                copy: true,

            },
            {
                label: 'Tư vấn sử dụng',
                value: '(028) 8765-4321',
                icon: <MdHeadsetMic />,
                copy: true,

            },
        ],
    };

    const emailSupportData = {
        title: 'Hỗ trợ qua Email',
        icon: <MdEmail />,
        color: 'text-purple-600',
        contacts: [
            {
                label: 'Hỗ trợ chung',
                value: 'support@quanlynenep.com',
                icon: <MdEmail />,
                copy: true,

            },
            {
                label: 'Báo lỗi',
                value: 'bug@quanlynenep.com',
                icon: <MdOutlineBugReport />,
                copy: true,
            },
            {
                label: 'Góp ý',
                value: 'feedback@quanlynenep.com',
                icon: <MdFeedback />,
                copy: true,
            },
        ],
    };

    const addressSupportData = {
        title: 'Địa chỉ',
        icon: <IoLocationSharp />,
        color: 'text-purple-600',
        contacts: [
            {
                label: 'Trụ sở chính',
                value: '123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh',
                icon: <MdApartment />,
                copy: true,
            },
            {
                label: 'Giờ làm việc',
                value: 'Thứ 2 - Thứ 6, 8:00 - 17:30 / Thứ 7, 8:00 - 12:00',
                icon: <MdHeadsetMic />,
                copy: false,
            },
        ],
    };

    return (
        <>
            <div className="flex bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
                <Sidebar isOpen={isSidebarOpen} Close={toggleSidebar} />
                <div class="absolute w-full bg-blue-500 min-h-85 z-1"></div>
                <div className="flex flex-col flex-1 z-2">
                    <Header Theme={"light"} isOpen={isSidebarOpen} toggleSideBar={toggleSidebar} namePage={"Liên hệ / hỗ trợ"} />
                    <div className="flex flex-col mt-8 bg-gray-100 p-5 rounded-lg shadow overflow-y-auto">
                        <div className="min-w-200 mx-auto bg-gradient-to-b bg-white p-4 rounded-lg shadow-md">
                            {/* Header */}
                            <div className="flex flex-col items-center text-black my-8">
                                <div className="bg-white p-4 rounded-2xl shadow-md">
                                    <MdHeadsetMic className="text-5xl text-purple-600" />
                                </div>
                                <h1 className="text-2xl font-bold mt-4">Liên hệ hỗ trợ</h1>
                                <p className="text-sm">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
                            </div>

                            {/* Contact summary */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-green-200 p-4 rounded-xl flex items-center shadow-md">
                                    <MdPhone className="text-green-500 text-3xl mr-4" />
                                    <div>
                                        <p className="text-start text-sm text-gray-500">Hotline</p>
                                        <p className="text-md font-semibold">{phoneSupportData.contacts[0].value}</p>
                                    </div>
                                </div>
                                <div className="bg-blue-200 p-4 rounded-xl flex items-center shadow-md">
                                    <MdEmail className="text-blue-500 text-3xl mr-4" />
                                    <div>
                                        <p className="text-sm text-start text-gray-500">Email</p>
                                        <p className="text-md font-semibold">{emailSupportData.contacts[0].value}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Reusable Contact Blocks */}
                            <ContactBlock {...phoneSupportData} />
                            <ContactBlock {...emailSupportData} />
                            <ContactBlock {...addressSupportData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SupportPage;