import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Mon", value1: 30, value2: 40 },
    { name: "Tue", value1: 20, value2: 15 },
    { name: "Wed", value1: 50, value2: 10 },
    { name: "Thu", value1: 70, value2: 45 },
    { name: "Fri", value1: 20, value2: 90 },
    { name: "Sat", value1: 60, value2: 55 },
    { name: "Sun", value1: 35, value2: 25 },
];

export default function Statistics({ appointmentsData }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <div
                        className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
                        <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                            <path
                                d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
                            <path
                                d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
                        </svg>
                    </div>
                    <div>
                        <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">3.4k</h5>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Leads generated per week</p>
                    </div>
                </div>
            </div>
            <div
                dir="rtl"
                className="grid grid-cols-2 border-b border-gray-200 dark:border-gray-700 mb-10"
            >
                <dl className="flex items-center">
                    <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">
                        אחוזי ניצול תורים:
                    </dt>
                    <dd className="text-gray-900 text-sm dark:text-white font-semibold">
                        1.2%
                    </dd>
                </dl>
                <dl className="flex items-center justify-end">
                    <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">
                        רווח:
                    </dt>
                    <dd className="text-gray-900 text-sm dark:text-white font-semibold">
                        $3,232
                    </dd>
                </dl>
            </div>

            {/* גרף סטטיסטיקות */}
            <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#ccc"/>
                        <YAxis stroke="#ccc"/>
                        <Tooltip/>
                        <Bar dataKey="value1" fill="#1E40AF" radius={[5, 5, 0, 0]}/>
                        <Bar dataKey="value2" fill="#FBBF24" radius={[5, 5, 0, 0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="relative mt-4">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                        type="button">
                    Last 7 days
                    <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                {isDropdownOpen && (
                    <div
                        className="absolute bottom-full left-0 mb-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li><a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                            </li>
                            <li><a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                            </li>
                            <li><a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last
                                7 days</a></li>
                            <li><a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last
                                30 days</a></li>
                            <li><a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last
                                90 days</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
