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
        cookies().set('jwt', token, {
            httpOnly: true, // מונע גישה של JavaScript לעוגיה
            secure: process.env.NODE_ENV === 'production', // ב-HTTPS חובה
            sameSite: 'Strict', // מונע גישה מצד שלישי
            path: '/', // זמין לכל הנתיבים
            maxAge: 60 * 60 * 24, // 24 שעות (בשניות)
        });

        // החזרת תגובה שהטוקן נשמר בהצלחה
        return NextResponse.json({ message: 'Token saved successfully' });
    } catch (error) {
        console.error('Error saving token:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
