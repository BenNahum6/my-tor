// "use client";
// import TodayAppointmentsList from "@/app/components/dashboard/presenting-appointments/TodayAppointmentsList";
//
// export default function MainBord({ appointmentsData }) {
//
//     return (
//         <div className="p-4 sm:ml-64">
//             <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 h-[33vh] overflow-auto">
//                 <div className="flex items-center justify-center h-full mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
//                     <TodayAppointmentsList appointments={appointmentsData} />
//                 </div>
//                 {/*<div className="grid grid-cols-2 gap-4 mb-4">*/}
//                 {/*    {Array.from({ length: 4 }).map((_, index) => (*/}
//                 {/*        <div*/}
//                 {/*            key={index}*/}
//                 {/*            className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800"*/}
//                 {/*        >*/}
//                 {/*            <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
//                 {/*                <svg*/}
//                 {/*                    className="w-3.5 h-3.5"*/}
//                 {/*                    aria-hidden="true"*/}
//                 {/*                    xmlns="http://www.w3.org/2000/svg"*/}
//                 {/*                    fill="none"*/}
//                 {/*                    viewBox="0 0 18 18"*/}
//                 {/*                >*/}
//                 {/*                    <path*/}
//                 {/*                        stroke="currentColor"*/}
//                 {/*                        strokeLinecap="round"*/}
//                 {/*                        strokeLinejoin="round"*/}
//                 {/*                        strokeWidth={2}*/}
//                 {/*                        d="M9 1v16M1 9h16"*/}
//                 {/*                    />*/}
//                 {/*                </svg>*/}
//                 {/*            </p>*/}
//                 {/*        </div>*/}
//                 {/*    ))}*/}
//                 {/*</div>*/}
//                 {/*<div className="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">*/}
//                 {/*    <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
//                 {/*        <svg*/}
//                 {/*            className="w-3.5 h-3.5"*/}
//                 {/*            aria-hidden="true"*/}
//                 {/*            xmlns="http://www.w3.org/2000/svg"*/}
//                 {/*            fill="none"*/}
//                 {/*            viewBox="0 0 18 18"*/}
//                 {/*        >*/}
//                 {/*            <path*/}
//                 {/*                stroke="currentColor"*/}
//                 {/*                strokeLinecap="round"*/}
//                 {/*                strokeLinejoin="round"*/}
//                 {/*                strokeWidth={2}*/}
//                 {/*                d="M9 1v16M1 9h16"*/}
//                 {/*            />*/}
//                 {/*        </svg>*/}
//                 {/*    </p>*/}
//                 {/*</div>*/}
//             </div>
//         </div>
//     );
// }

import TodayAppointmentsList from "@/app/components/dashboard/presenting-appointments/TodayAppointmentsList";

export default function MainBord({ appointmentsData }) {
    console.log("Appointments Data in MainBord:", appointmentsData);  // כדי לבדוק אם הנתונים קיימים

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-gray-200 rounded-lg dark:border-gray-700 mt-14 h-[33vh]">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
                    התורים של היום
                </h2>
                <div className="flex justify-center mb-4 rounded-sm border-2 bg-gray-50 dark:bg-gray-800 h-full w-full">
                    {/* מעביר את appointmentsData כפרופס */}
                    <TodayAppointmentsList appointmentsData={appointmentsData}/>
                </div>
            </div>

            {/*<div className="p-4 border-gray-200 rounded-lg dark:border-gray-700 mt-14 h-[33vh]">*/}
            {/*    <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">*/}
            {/*        סטטיסטיקה*/}
            {/*    </h2>*/}
            {/*    <div className="flex justify-center mb-4 rounded-sm border-2 bg-gray-50 dark:bg-gray-800 h-full w-full">*/}
            {/*        /!* מעביר את appointmentsData כפרופס *!/*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}


