import { supabase } from '@/app/lib/supabase';
import {NextResponse} from "next/server";

export async function POST(req) {
    const { email, password, fullName } = await req.json();
    // שלב 1: עדכון ה-DB אם התנאים מתקיימים
    const { data, error: dbError } = await supabase
        .from('Users')
        .update({
            fullName: fullName,
            exists: true,
        })
        .eq('email', email)
        .eq('exists', false)
        .select();

    if (dbError) {
        console.error('Error checking/updating user in DB:', dbError);
        return NextResponse.json(
            { success: false, error: 'Unable to process the request' },
            { status: 500 }
        );
    }

    // שלב 2: אם אין שורות מעודכנות, האימייל כבר רשום, אז נחזיר תשובה מתאימה
    if (data.length === 0) {
        console.error("Email already registered or exists is true");
        return NextResponse.json(
            { success: false, error: "Unable to process the request" },
            { status: 400 }
        );
    }

    // שלב 3: אם התנאים התקיימו, נבצע את ההרשמה ב-Supabase.auth
    const { data: user, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { fullName },
        },
    });

    if (authError) {
        console.error('Error during Supabase.auth.signUp:', authError);
        return NextResponse.json(
            { success: false, error: 'Unable to process the request' },
            { status: 500 }
        );
    }

    return NextResponse.json({
        success: true,
        message: 'User registered successfully!',
    });
}
