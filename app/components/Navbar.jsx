// import ScrollToTop from "./scrollToTop ";
//
// //TODO put in DB
// const role = 'Brothers';
//
// export default function Navbar({ usersData }) {
//   return (
//     <div className="fixed top-0 left-0 w-full bg-base-100 z-50">
//       <div className="navbar flex justify-between items-center px-4 py-2">
//         <div className="flex-1">
//           <ScrollToTop />
//         </div>
//         <div className="flex-none relative">
//           <ul className="menu menu-horizontal px-1">
//             <li className="relative">
//               <details>
//                 <summary>{role}</summary>
//                 <ul className="absolute bg-base-100 rounded-t-none p-2 mt-1 shadow-lg flex-wrap">
//                   {usersData.map((name) => (
//                       <li key={name} className="flex-shrink-0 mr-2">
//                         <a href={`/pages/${name}`} className="hover:underline whitespace-nowrap">
//                           {name}
//                         </a>
//                       </li>
//                   ))}
//                 </ul>
//               </details>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// Navbar.jsx
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
      <div className="fixed top-0 left-0 w-full bg-base-100 z-50">
        <div className="navbar flex justify-between items-center px-4 py-2">
          <div className="flex-1">
            <ScrollToTop/>
          </div>
          <div className="flex-none relative">
            <ul className="menu menu-horizontal px-1">
              <li className="relative">
                <details>
                  <summary>{role}</summary>
                  <ul className="absolute bg-base-100 rounded-t-none p-2 mt-1 shadow-lg flex-wrap">
                    {names.length > 0 ? (
                        names.map((name) => (
                            <li key={name} className="flex-shrink-0 mr-2">
                              <a href={`/pages/${name}`} className="hover:underline whitespace-nowrap">
                                {name}
                              </a>
                            </li>
                        ))
                    ) : (
                        <li>לא נמצאו משתמשים</li>  // במקרה ואין נתונים
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
