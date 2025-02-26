import Navbar from "@/app/components/Navbar";
import PresentsAppointments from "@/app/components/PresentsAppointments";
import { fetchAvailableAppointments } from "@/app/lib/api"; // ייבוא הפונקציה

// הפונקציה בצד השרת
export default async function AvailableAppointments({ params }) {
    const { slug, date } = params;

    // קריאה ל-API כדי להחזיר את הנתונים
    const timeData = await fetchAvailableAppointments(slug, date);

    if (!timeData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col items-center p-6">
            <Navbar />
            {/* שולח את הנתונים שנאספו */}
            <PresentsAppointments slug={slug} date={date} data={timeData} />
        </div>
    );
}
