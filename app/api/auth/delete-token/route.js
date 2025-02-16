import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
    try {
        // מחיקת העוגיה
        cookies().delete('jwt', {
            path: '/',
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === 'production',
        });

        return NextResponse.json({ message: 'Token deleted successfully' });

    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
