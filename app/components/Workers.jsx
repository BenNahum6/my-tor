import Image from 'next/image';
import Link from 'next/link';
import {fetchAllUsersData} from "@/app/lib/api";

export default async function Workers() {
    // שליפת הנתונים בצד השרת
    let {success, data, message} = await fetchAllUsersData();
    // טיפול במקרה של שגיאה בהשגת נתונים
    const names = success && data.length ? data.map(user => user.fullName) : []; // אם לא הצליח, שולח מערך ריק

    if (!success) {
        console.error(message);
    }

    return (
        <div className="min-h-screen bg-base-200">
            {data.map((worker, index) => (
                <div key={index} className="hero bg-base-100 my-4 flex items-center border-b-2 border-gray-300 pb-6">
                    {/* תצוגת התמונה בגודל מותאם */}
                    <a href={`/pages/${worker.fullName}`} className="block">
                        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-2xl transition-transform duration-200 hover:scale-105">
                            <Image
                                src={worker.imageURL}
                                alt={worker.fullName}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </a>

                    <div className="flex-1 flex flex-col items-center text-center ml-4">
                        <h1 className="text-4xl font-bold mb-4">{worker.fullName}</h1>
                        <p className="py-6 mb-4">{worker.aboutMyself}</p>
                        <Link href={`/pages/${worker.fullName}`} passHref>
                            <button
                                className="btn btn-primary hover:scale-110 hover:shadow-lg transition-all duration-300 transform">
                                Get Started
                            </button>
                        </Link>
                    </div>
                    {/* קו הפרדה אחרי כל עובד */}
                </div>
            ))}
        </div>

    );
}
