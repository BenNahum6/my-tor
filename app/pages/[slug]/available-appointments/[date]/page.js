import Navbar from "@/app/components/Navbar";
import PresentsAppointments from "@/app/components/PresentsAppointments";

// Calling the POST API to get the available hours on a specific date
const AvailableAppointments = async ({ params }) => {
    const { slug, date } = params;

    console.log(' pageeeeee - process.env.NEXT_PUBLIC_API_URL: ', process.env.NEXT_PUBLIC_API_URL);// delete
    const apiUrl = process.env.NODE_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/getAllAvailableAppointments`
        : 'http://localhost:3000/api/appointments/getAllAvailableAppointments';

    console.log(' api url: ', apiUrl);// delete

    // Making an HTTP call to a server-side API
    let timeData = []
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
        timeData = data
        console.log('Page available-appointments - Appointments are available for', date, ':', timeData);
    } catch (error) {
        console.error('Error sending request:', error);
    }

    return (
        <div>
            <Navbar />
            {/*Sends the date and available times on that date*/}
            <PresentsAppointments date={date} data={timeData} />
        </div>
    );
};

export default AvailableAppointments;