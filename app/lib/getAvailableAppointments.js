import { useRouter } from 'next/router';

export default function AvailableAppointments() {
    const router = useRouter();
    const { dateString, appointments } = router.query;

    const parsedAppointments = appointments ? JSON.parse(appointments) : [];

    return (
        <div>
            <h1>פגישות זמינות עבור {dateString}</h1>
            <ul>
                {parsedAppointments.map((appointment, index) => (
                    <li key={index}>{appointment}</li>
                ))}
            </ul>
        </div>
    );
}