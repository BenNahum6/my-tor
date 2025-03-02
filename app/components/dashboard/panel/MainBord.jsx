import TodayAppointmentsList from "@/app/components/dashboard/presenting-appointments/TodayAppointmentsList";
import Statistics from "@/app/components/dashboard/panel/Statistics";

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

            <div
                className="p-6 border border-gray-200 rounded-lg dark:border-gray-700 mt-14 min-h-[300px] w-full max-w-full">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
                    סטטיסטיקה
                </h2>
                <div
                    className="flex justify-center items-center rounded-md border-2 bg-gray-50 dark:bg-gray-800 w-full h-auto min-h-[250px] overflow-hidden">
                    <Statistics appointmentsData={appointmentsData}/>
                </div>
            </div>


        </div>
    );
}


