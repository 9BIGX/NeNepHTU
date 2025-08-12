import { React, useState, useEffect } from 'react'

export default function Chart() {
    const [data, setData] = useState([10, 10, 5]);
    const [label, setLabel] = useState(["Khối 10", "Khối 11", "Khối 12"]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getChartOptions = () => {
        return {
            series: data,
            colors: [],
            chart: {
                height: 400,
                width: "100%",
                type: "pie",
            },
            stroke: {
                colors: ["white"],
                lineCap: "",
            },
            plotOptions: {
                pie: {
                    labels: {
                        show: true,
                    },
                    size: "100%",
                    dataLabels: {
                        offset: -20
                    }
                },
            },
            labels: label,
            dataLabels: {
                enabled: true,
                style: {
                    fontFamily: "Saira Condensed, sans-serif",
                },
            },
            legend: {
                position: "bottom",
                fontFamily: "Saira Condensed, sans-serif",
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value
                    },
                },
            },
            xaxis: {
                labels: {
                    formatter: function (value) {
                        return value
                    },
                },
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
        }
    }
    useEffect(() => {
        let chart = null;
        const chartEl = document.getElementById("pie-chart");

        if (chartEl && typeof ApexCharts !== 'undefined') {
            chart = new ApexCharts(chartEl, getChartOptions());
            chart.render();
        }

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);
    return (
        <>
            <div className="w-full bg-white rounded-2xl shadow-sm p-2 md:p-6">
                <div className="flex justify-between items-start w-full">
                    <div className="w-full flex justify-around items-center">
                        <h5 className="w-1/2 text-lg font-bold leading-none text-gray-900 me-1 text-start">Chi tiết vi phạm</h5>
                        <select id="LevelViolate"
                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 ">
                            <option value="1">Theo tuần</option>
                            <option value="2">Theo tháng</option>
                            <option value="3">Theo kỳ</option>
                            <option value="4">Theo năm</option>
                        </select>
                    </div>
                </div >

                < div className="py-6" id="pie-chart" >
                    <div className="grid grid-cols-2 items-center border-gray-200 border-t justify-between ">
                        <div className="flex justify-around items-center pt-5 ">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2 12 4-4-4-4" />
                        </div>
                    </div>
                </div >
            </div>

        </>
    )

}