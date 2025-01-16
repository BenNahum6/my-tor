import Navbar from "@/app/components/Navbar";
// import PresentsAppointments from "@/app/components/PresentsAppointments";

// קומפוננטה שמבצעת קריאת API בצד השרת (בלי `getServerSideProps`)
const AvailableAppointments = async ({ params }) => {
    const { slug, date } = params;
    const apiKey = process.env.MY_API_KEY; // השתמש במפתח שהגדרת ב-Vercel

    // Making an HTTP call to a server-side API
    let appointments = [];
    try {
        // הגדרת כתובת בסיס מתוך משתנה סביבה
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        // שליחת הבקשה עם נתיב מלא
        const response = await fetch(`${baseUrl}/api/appointments/getAllAvailableAppointments`, {
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

        const data = await response.json();
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