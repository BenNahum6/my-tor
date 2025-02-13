import { supabase } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(req) {
    // בודק אם הטוקן מגיע מה-Authorization Header או מעוגיה (HttpOnly)
    const token = req.headers.get('Authorization')?.split(' ')[1] || req.cookies['jwt']; // אם הטוקן בעוגיה, נשלוף אותו כאן

    if (!token) {
        console.error('Invalid token error: ', token);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // בודק אם הטוקן תקף ומחזיר את פרטי המשתמש
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
        console.error('Invalid token error: ', error);
        return NextResponse.json({ error: 'Authorization' }, { status: 401 });
    }

    return NextResponse.json({ user: data.user });
}
