import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // שליפת הטוקן מה-Authorization Header בבקשה
        const token = req.headers.get('Authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        // שמירת הטוקן בעוגיה HttpOnly
        const cookieStore = cookies();
        cookieStore.set('jwt', token, {
            httpOnly: true, // מאפשר רק לשרת לגשת לעוגיה
            // Secure: true,
            secure: process.env.NODE_ENV === 'production', // אם ב-https אז הכנס Secure
            sameSite: 'Strict', // מונע שליחה של העוגיה לאתרים אחרים
            maxAge: 24 * 60 * 60 * 1000, // זמן חיים של העוגיה (למשל, 24 שעות)
        });

        // מחזירים תשובה שהטוקן נשמר בהצלחה
        return NextResponse.json({ message: 'Token saved successfully' });
    } catch (error) {
        console.error('Error saving token:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
