import Navbar from "@/app/components/Navbar";
import PresentsAppointments from "@/app/components/PresentsAppointments";

// קומפוננטה שמבצעת קריאת API בצד השרת (בלי `getServerSideProps`)
const AvailableAppointments = async ({ params }) => {
    const { slug, date } = params;

    const apiUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/appointments/getAllAvailableAppointments`
        : 'http://localhost:3000/api/appointments/getAllAvailableAppointments';

    // Making an HTTP call to a server-side API
    let appointments = [];
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: date }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        appointments = data; // The information received from the API
        console.log('Appointments are available for', date, ':', appointments);
    } catch (error) {
        console.error('Error sending request:', error);
    }

    return (
        <div>
            <Navbar />
            <PresentsAppointments date={date} data={appointments} /> {/* שולח את הנתונים לקומפוננטה */}
        </div>
    );
};

export default AvailableAppointments;