import Navbar from "@/app/components/Navbar";
import PresentsAppointments from "@/app/components/PresentsAppointments";
import { fetchAvailableAppointments } from "@/app/lib/api"; // ייבוא הפונקציה

// Calling the POST API to get the available hours on a specific date
const AvailableAppointments = async ({ params }) => {
    const { date } = params;

    // HTTP req
    const timeData = await fetchAvailableAppointments(date);

    return (
        <div>
            <Navbar />
            {/* Sends the date and available times on that date */}
            <PresentsAppointments date={date} data={timeData} />
        </div>
    );
};

export default AvailableAppointments;
