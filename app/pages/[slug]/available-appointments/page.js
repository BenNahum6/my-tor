// app/[slug]/available-appointments/page.js
import Navbar from "@/app/components/Navbar";

export default function showAppointments() {
    return (
        <div>
            <Navbar />
            <h1>פגישות זמינות</h1>
        </div>
    );
}