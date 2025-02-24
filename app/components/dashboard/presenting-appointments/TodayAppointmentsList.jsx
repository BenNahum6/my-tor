export default function TodayAppointmentsList({ appointmentsData }) {
    console.log("Appointments Data in TodayAppointmentsList:", appointmentsData); // בדוק אם הנתונים מגיעים

    if (!appointmentsData || appointmentsData.length === 0) {
        return <p>אין פגישות להציג</p>;
    }


    return (
        <div className="relative overflow-x-auto w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400 bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th scope="col" className="px-6 py-3">First Name</th>
                    <th scope="col" className="px-6 py-3">Last Name</th>
                    <th scope="col" className="px-6 py-3">Phone Number</th>
                    <th scope="col" className="px-6 py-3">Time</th>
                </tr>
                </thead>
                <tbody>
                {appointmentsData.map((appointment, index) => (
                    <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">{appointment.firstName || 'N/A'}</td>
                        <td className="px-6 py-4">{appointment.lastName || 'N/A'}</td>
                        <td className="px-6 py-4">{appointment.phoneNumber || 'N/A'}</td>
                        <td className="px-6 py-4">{appointment.time}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
}

