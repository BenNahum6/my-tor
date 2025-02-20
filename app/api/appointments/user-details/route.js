import { supabase } from "@/app/lib/supabase";
import { cookies } from 'next/headers';

export async function POST(req, res) {
    const cookieStore = cookies();
    const cookieToken = cookieStore.get('jwt')?.value;

    if (!cookieToken) {
        return new Response(JSON.stringify({ error: 'Token is missing' }), { status: 401 });
    }

    // שליפת המידע של המשתמש לפי הטוקן
    const { data: userData, error: authError } = await supabase.auth.getUser(cookieToken);

    if (authError) {
        return new Response(JSON.stringify({ error: 'Unable to fetch user data' }), { status: 401 });
    }

    // שליפת ה-ID של המשתמש
    const userId = userData.user.id;

    // כעת יש לגשת לטבלה 'users' ולשלוף את המידע של המשתמש
    const { data: userDetails, error: userError } = await supabase
        .from('Users')
        .select('*') // או תוכל לבחור עמודות ספציפיות אם אתה צריך
        .eq('id', userId) // שליפה לפי ה-ID של המשתמש
        .single(); // אם אתה מצפה לתוצאה אחת בלבד

    if (userError) {
        return new Response(JSON.stringify({ error: 'Unable to fetch user details from the users table' }), { status: 500 });
    }

    // מחזירים את פרטי המשתמש
    return new Response(JSON.stringify(userDetails), { status: 200 });
}

