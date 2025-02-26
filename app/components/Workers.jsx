import Image from 'next/image';
import Link from 'next/link';
import {fetchAllUsersData} from "@/app/lib/api";

export default async function Workers() {
    // שליפת הנתונים בצד השרת
    let {success, data, message} = await fetchAllUsersData();
    // טיפול במקרה של שגיאה בהשגת נתונים
    const names = success && data.length ? data.map(user => user.fullName) : []; // אם לא הצליח, שולח מערך ריק
    console.log(data);

    if (!success) {
        console.error(message);
    }

    return (
        <div className="min-h-screen bg-base-200">
            {data.map((worker, index) => (
                <div key={index} className="hero bg-base-100 my-4 flex items-center border-b-2 border-gray-300 pb-6">
                    {/* תצוגת התמונה בגודל מותאם */}
                    <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-64 sm:h-80 md:h-96">
                        <Image
                            src={worker.imageURL}
                            alt={worker.fullName}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // הוספת sizes
                            className="rounded-full shadow-2xl object-cover"
                        />
                    </div>
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
