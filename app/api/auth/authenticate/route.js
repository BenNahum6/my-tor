import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET(req) {

    const cookieStore = cookies();
    const cookieToken = cookieStore.get('jwt')?.value;

    // קריאה של ה-Authorization Header (אם יש)
    const headerToken = req.headers.get('Authorization')?.split(' ')[1];

    // לוגיקה כדי לבחור את הטוקן
    const token = headerToken || cookieToken;  // אם יש טוקן בהדר - נשתמש בו, אחרת מהעוגיה

    if (!token) {
        console.error("No token found!"); // אם אין טוקן, מחזיר תשובה של Unauthorized
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // אימות הטוקן עם Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
        console.error('Authorization failed:', error); // במקרה של בעיה, מחזיר תשובת שגיאה
        return NextResponse.json({ error: 'Authorization failed' }, { status: 401 });
    }

    return NextResponse.json({ user: data.user });
}
