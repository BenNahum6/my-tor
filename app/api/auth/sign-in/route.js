import { supabase } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Error during sign-in:', error);
            return NextResponse.json(
                { success: false, error: 'Unable to process the request' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'User signed in successfully!',
            user: data.user, // מחזיר את פרטי המשתמש (ללא סיסמה)
            session: data.session, // מחזיר את ה-session (JWT token)
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json(
            { success: false, error: 'Unable to process the request' },
            { status: 500 }
        );
    }
}
