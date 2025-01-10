import Navbar from "@/app/components/Navbar";

// קומפוננטה שמבצעת קריאת API בצד השרת (בלי `getServerSideProps`)
const AvailableAppointments = async ({ params }) => {
    const { slug, date } = params;

    // ביצוע קריאת HTTP ל-API בצד השרת
    let appointments = [];
    try {
        const response = await fetch('http://localhost:3000/api/appointments/getAllAvailableAppointments', {
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
        appointments = data; // זהו המידע שהתקבל מה-API
        console.log('Appointments are available for', date, ':', appointments);
    } catch (error) {
        console.error('Error sending request:', error);
    }

    return (
        <div>
            <Navbar />
            <h1>Available Appointments</h1>
            <h2>Slug: {slug}</h2>
            <h2>Date: {date}</h2>

        </div>
    );
};

export default AvailableAppointments;