import ScrollToTop from "./scrollToTop ";
import {fetchAllUsersData} from "@/app/lib/api";

//TODO put in DB
const role = 'Barbers';

export default async function Navbar() {
  // שליפת הנתונים בצד השרת
  let {success, data, message} = await fetchAllUsersData();
  // טיפול במקרה של שגיאה בהשגת נתונים
  const names = success && data.length ? data.map(user => user.fullName) : []; // אם לא הצליח, שולח מערך ריק

  if (!success) {
    console.error(message);
  }

  return (
      <div className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-xl backdrop-opacity-50 z-10">
        <div className="navbar flex justify-between items-center px-4 py-2">
          <div className="flex-1">
            <ScrollToTop/>
          </div>
          <div className="flex-none relative">
            <ul className="menu menu-horizontal px-1">
              <li className="relative">
                <details>
                  <summary className="text-gray-900 dark:text-white text-shadow-2xl">{role}</summary>
                  {/* טשטוש חזק יותר */}
                  <ul className="absolute bg-transparent backdrop-blur-3xl backdrop-opacity-90 rounded-t-none p-2 mt-1 shadow-lg flex-wrap">
                    {names.length > 0 ? (
                        names.map((name) => (
                            <li key={name} className="flex-shrink-0 mr-2">
                              <a
                                  href={`/pages/${name}`}
                                  className="text-gray-800 dark:text-gray-200 hover:underline whitespace-nowrap"
                              >
                                {name}
                              </a>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-600 dark:text-gray-400">לא נמצאו משתמשים</li>
                    )}
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}
