import React from 'react'
import { FaArrowTrendUp } from "react-icons/fa6";

const BoxShowTotal = (prop) => {
    const { TotalAmount, ColorAmount, Icon, Headtext, DesText } = prop;
    return (
        <>
            <div className='flex flex-col items-start bg-white rounded-2xl p-5 shadow-md h-fit'>
                <div className='flex items-center justify-between w-4/4'>
                    {Icon}
                    <FaArrowTrendUp className="text-[1rem] text-gray-500" />
                </div>
                <p className={`text-3xl my-5 mb-2 ${ColorAmount}`}>{TotalAmount}</p>
                <p className="text-1xl ">{Headtext}</p>
                <p className='text-[.8rem] text-gray-600'>{DesText}</p>
            </div>
        </>
    )
}
export default BoxShowTotal