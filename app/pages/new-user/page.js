// app/new-user/page.js

"use client"; // כדי לוודא שהקומפוננטה רצה בצד הלקוח

import { useEffect } from "react";

async function fetchUsers() {
  try {
    const response = await fetch("/api/new_user", {
      method: 'GET',
    });

    if (!response.ok) {
    //   throw new Error('Network response was not ok');
    }

    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error('Error:', error);
  }
}

export default function NewUser() {
  // הפעלת הפונקציה בתוך useEffect
  useEffect(() => {
    fetchUsers();
  }, []); // הרצה רק פעם אחת בעת טעינת הקומפוננטה

  return (
    <h1 className="text-red-500">Helooooooooooooooooo</h1>
  );
}
