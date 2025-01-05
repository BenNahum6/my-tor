// // "use client"; // כדי לוודא שהקומפוננטה רצה בצד הלקוח
//
// // async function fetchUsers(props) {
// //   console.log(props.day)
// //   try {
// //     const response = await fetch("/api/new_user", {
// //       method: 'GET',
// //     });
//
// //     if (!response.ok) {
// //       throw new Error('Network response was not ok');
// //     }
//
// //     const users = await response.json();
// //     console.log(users);
// //   } catch (error) {
// //     console.error('Error:', error);
// //   }
// // }
//
// import React, { useEffect } from 'react';
//
// const GetEvailebelTor = ({ year, month, day }) => {
//
//   useEffect(() => {
//     const fetchUsers = async () => {
//       console.log(day); // לוג התאריך
//       try {
//         const response = await fetch("/api/get_available_dates", {
//           method: 'GET',
//         });
//
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//
//         const users = await response.json();
//         console.log(users);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
//
//     if (day) {
//       fetchUsers(); // קרא לפונקציה רק אם יש יום
//     }
//   }, [day]); // התאם את ה-effect כך שיתעדכן כאשר day משתנה
//
//   return (
//     <div>
//       <p>Year: {year}, Month: {month}, Day: {day}</p>
//       {/* תוכל להוסיף כאן תוכן נוסף שתרצה להציג */}
//     </div>
//   );
// };
//
// export default GetEvailebelTor;
