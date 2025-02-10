import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import bcrypt from 'bcryptjs';

// Set runtime as nodejs
export const runtime = 'nodejs';

export async function POST(req) {
    try {
        const { email, password, fullName } = await req.json();

        // Password encryption with bcryptjs (nodejs compatible)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data, error } = await supabase
            .from('Users')
            .update({
                fullName: fullName,
                password: hashedPassword,
                exists: true,
            })
            .eq('email', email)
            .eq('exists', false)
            .select();

        if (error) {
            console.error('Error updating user:', error);
            return NextResponse.json(
                { success: false, error: 'Error updating user' },
                { status: 500 }
            );
        }

        // Check if an update has not been performed
        if (data.length === 0) {
            console.log('No rows were updated, because exists was already true');
            return NextResponse.json({
                success: false,
                error: 'No rows were updated because exists was already true',
            });
        }

        return NextResponse.json({
            success: true,
            message: 'User updated successfully.',
        });

    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            { success: false, error: 'Error processing the request' },
            { status: 500 }
        );
    }
}
