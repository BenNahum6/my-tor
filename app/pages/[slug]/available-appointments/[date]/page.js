import Navbar from "@/app/components/Navbar";
// import PresentsAppointments from "@/app/components/PresentsAppointments";

// קומפוננטה שמבצעת קריאת API בצד השרת (בלי `getServerSideProps`)
const AvailableAppointments = async ({ params }) => {
    const { slug, date } = params;

    const apiUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/appointments/getAllAvailableAppointments`
        : 'http://localhost:3000/api/appointments/getAllAvailableAppointments';
    console.log("Using API URL:", apiUrl);  // הוספת לוג כאן

    // Making an HTTP call to a server-side API
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY,
            },
            body: JSON.stringify({ date: date }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // The information received from the API
        console.log('Appointments are available for', date, ':', data);
    } catch (error) {
        console.error('Error sending request:', error);
    }

    return (
        <div>
            <Navbar />
            {/*<PresentsAppointments date={date} data={appointments} /> /!* שולח את הנתונים לקומפוננטה *!/*/}
        </div>
    );
};

export default AvailableAppointments;