// import ScrollToTop from "./scrollToTop ";
// import {fetchAllUsersData} from "@/app/lib/api";
//
// //TODO put in DB
// const role = 'Barbers';
//
// export default async function Navbar() {
//   // שליפת הנתונים בצד השרת
//   let {success, data, message} = await fetchAllUsersData();
//   // טיפול במקרה של שגיאה בהשגת נתונים
//   const names = success && data.length ? data.map(user => user.fullName) : []; // אם לא הצליח, שולח מערך ריק
//
//   if (!success) {
//     console.error(message);
//   }
//
//   return (
//       <div className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-xl backdrop-opacity-50 z-10">
//         <div className="navbar flex justify-between items-center px-4 py-2">
//           <div className="flex-1">
//             <ScrollToTop/>
//           </div>
//           <div className="flex-none relative">
//             <ul className="menu menu-horizontal px-1">
//               <li className="relative">
//                 <details>
//                   <summary className="text-gray-900 dark:text-white text-shadow-2xl">{role}</summary>
//                   {/* טשטוש חזק יותר */}
//                   <ul className="absolute bg-transparent backdrop-blur-3xl backdrop-opacity-90 rounded-t-none p-2 mt-1 shadow-lg flex-wrap">
//                     {names.length > 0 ? (
//                         names.map((name) => (
//                             <li key={name} className="flex-shrink-0 mr-2">
//                               <a
//                                   href={`/pages/${name}`}
//                                   className="text-gray-800 dark:text-gray-200 hover:underline whitespace-nowrap"
//                               >
//                                 {name}
//                               </a>
//                             </li>
//                         ))
//                     ) : (
//                         <li className="text-gray-600 dark:text-gray-400">לא נמצאו משתמשים</li>
//                     )}
//                   </ul>
//                 </details>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { fetchAllUsersData } from "@/app/lib/api";
import ScrollToTop from "@/app/components/scrollToTop ";

const role = "Barbers";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let { success, data, message } = await fetchAllUsersData();
      if (success && data.length) {
        setNames(data.map((user) => user.fullName));
      } else {
        console.error(message);
        setNames([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // הסתרה בגלילה מטה
      } else {
        setIsVisible(true); // הצגה בגלילה מעלה
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
      <div
          className={`fixed top-0 left-0 w-full bg-transparent backdrop-blur-xl backdrop-opacity-50 z-10 transition-transform duration-300 ${
              isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="navbar flex justify-between items-center px-4 py-2">
          <div className="flex-1">
            <ScrollToTop />
          </div>
          <div className="flex-none relative">
            <ul className="menu menu-horizontal px-1">
              <li className="relative">
                <details>
                  <summary className="text-gray-900 dark:text-white text-shadow-2xl">
                    {role}
                  </summary>
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
                        <li className="text-gray-600 dark:text-gray-400">
                          לא נמצאו משתמשים
                        </li>
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
