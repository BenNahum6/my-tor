import Navbar from "@/app/components/Navbar";
import Calendar from "@/app/components/Calendar";

export default function works(){

    return(
        <>
            <Navbar />
            <div className="mt-24">
                <Calendar/>
            </div>
        </>
    );
}