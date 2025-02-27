import TodayAppointmentsList from "@/app/components/dashboard/presenting-appointments/TodayAppointmentsList";

export default function MainBord({ appointmentsData }) {

    return (
        <div className="sm:ml-64">
            <div className="p-4 border-gray-200 rounded-lg dark:border-gray-700 mt-14 h-[33vh]">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
                    התורים של היום
                </h2>
                <div className="flex justify-center mb-4 rounded-sm border-2 bg-gray-50 dark:bg-gray-800 h-full w-screen max-w-full">
                    <TodayAppointmentsList appointmentsData={appointmentsData} />
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


