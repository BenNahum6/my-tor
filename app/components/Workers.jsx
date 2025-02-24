// import Image from 'next/image';
// import Link from 'next/link';
//
// export default function Workers({ usersData }) {
//     // בדיקה אם נתונים קיימים
//     if (!usersData || usersData.length === 0) {
//         return <div>No workers found</div>;  // הצג הודעה אם אין עובדים
//     }
//
//     console.log('usersDataaaa: ', usersData);
//
//     return (
//         <div className="min-h-screen bg-base-200">
//             {usersData.map((worker, index) => (
//                 <div key={index} className="hero bg-base-100 my-4 flex items-center">
//                     {/* תצוגת התמונה בגודל מותאם */}
//                     <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-64 sm:h-80 md:h-96">
//                         <Image
//                             src={worker.imageURL}  // נתיב התמונה
//                             alt={worker.fullName}   // שם העובד
//                             layout="fill"           // התמונה תמלא את כל ה-container
//                             objectFit="cover"       // התמונה תתאים לגודל מבלי לעוות
//                             className="rounded-lg shadow-2xl"
//                         />
//                     </div>
//                     <div className="flex-1 flex flex-col items-center text-center ml-4">
//                         {/* קרבה יותר לתמונה */}
//                         <h1 className="text-4xl font-bold mb-4">{worker.fullName}</h1> {/* שם העובד */}
//                         <p className="py-6 mb-4">{worker.email}</p> {/* כתובת דוא"ל */}
//                         <Link href={`/pages/${worker.fullName}`} passHref>
//                             <button className="btn btn-primary">Get Started</button>
//                         </Link>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

import Image from 'next/image';
import Link from 'next/link';

export default function Workers({ usersData }) {
    // בדיקה אם נתונים קיימים
    if (!usersData || usersData.length === 0) {
        return <div>No workers found</div>;  // הצג הודעה אם אין עובדים
    }

    return (
        <div className="min-h-screen bg-base-200">
            {usersData.map((worker, index) => (
                <div key={index} className="hero bg-base-100 my-4 flex items-center">
                    {/* תצוגת התמונה בגודל מותאם */}
                    <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-64 sm:h-80 md:h-96">
                        <Image
                            src={worker.imageURL}
                            alt={worker.fullName}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // הוספת sizes
                            className="rounded-lg shadow-2xl"
                        />

                    </div>
                    <div className="flex-1 flex flex-col items-center text-center ml-4">
                        {/* קרבה יותר לתמונה */}
                        <h1 className="text-4xl font-bold mb-4">{worker.fullName}</h1> {/* שם העובד */}
                        <p className="py-6 mb-4">{worker.email}</p> {/* כתובת דוא"ל */}
                        <Link href={`/pages/${worker.fullName}`} passHref>
                            <button className="btn btn-primary">Get Started</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
