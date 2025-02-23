import { getUserName } from "@/app/api/users-function/image-upload/route";  // יבוא הפונקציה לקבלת שם המשתמש
import { NextResponse } from 'next/server';
import { supabase } from "@/app/lib/supabase";
import { cookies } from 'next/headers';  // יבוא ה-cookies מ-next/headers

export async function POST() {
    const userName = await getUserName();  // קבלת שם המשתמש מה-Session

    if (!userName) {
        console.error("No user name found!");
        return new NextResponse(JSON.stringify({ error: 'userName is missing' }), { status: 401 });
    }

    try {
        // ביצוע התנתקות ב-Supabase
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log('Error during sign out:', error.message);
            return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
        } else {
            console.log('User signed out successfully');
        }

        // מחיקת העוגיות
        cookies().delete('jwt', {
            path: '/',
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0), // תאריך תפוגה לעבר, כדי שהדפדפן ימחק את העוגיה
        });

        // יצירת תשובה עם הצלחה
        return NextResponse.json({ message: 'User logged out and cookies deleted successfully' });

    } catch (error) {
        console.error("Error during sign-out:", error);
        return NextResponse.json({ error: 'Error during sign-out' }, { status: 500 });
    }
}
