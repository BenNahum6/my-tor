import Navbar from "@/app/components/Navbar";
import AppointmentType from "@/app/components/AppointmentType";

export default function works(){

    return(
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col items-center p-6">
            <Navbar />
            <div className="mt-24 dark:bg-gray-800" >
                <AppointmentType/>
            </div>
        </div>
    );
}