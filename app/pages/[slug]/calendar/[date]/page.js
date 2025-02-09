import Navbar from "@/app/components/Navbar";
import PresentsAppointments from "@/app/components/PresentsAppointments";
import { fetchAvailableAppointments } from "@/app/lib/api"; // ייבוא הפונקציה

// הפונקציה בצד השרת
export default async function AvailableAppointments({ params }) {
    const { date } = params;

    // קריאה ל-API כדי להחזיר את הנתונים
    const timeData = await fetchAvailableAppointments(date);

    if (!timeData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            {/* שולח את הנתונים שנאספו */}
            <PresentsAppointments date={date} data={timeData} />
        </div>
    );
}
