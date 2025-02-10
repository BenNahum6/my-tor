import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import bcrypt from 'bcryptjs';

// Set runtime as nodejs
export const runtime = 'nodejs';

export async function POST(req) {
    console.log("helooo ben");
    try {
        const { email, password } = await req.json();

        // שלוף את הנתונים מה-DB לפי האימייל
        const { data, error } = await supabase
            .from('Users')
            .select('email, password')
            .eq('email', email)
            .single();

        if (error) {
            console.error('Error fetching user:', error);
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        // אם נמצא משתמש, השווה את הסיסמה שהוזנה לסיסמה המוצפנת ב-DB
        const isMatch = await bcrypt.compare(password, data.password);

        if (isMatch) {
            return NextResponse.json({
                success: true,
                message: 'User found and credentials are correct.',
            });
        } else {
            return NextResponse.json({
                success: false,
                error: 'Invalid email or password.',
            });
        }

    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            { success: false, error: 'Error processing the request' },
            { status: 500 }
        );
    }
}
