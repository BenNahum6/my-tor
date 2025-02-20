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

        const userName = data.user.user_metadata?.fullName;
        if (!userName) {
            console.error('Full name is missing in user metadata');
            return NextResponse.json(
                { success: false, error: 'Full name is missing in user metadata' },
                { status: 400 }
            );
        }

        // console.log('Looking for user:', userName);

        let dataUsers = await fetchUserData(userName);

        if (!dataUsers) {
            console.error('No user data found for', userName);
            return NextResponse.json(
                { success: false, error: 'No user data found' },
                { status: 404 }
            );
        }
        const userURL= dataUsers[0].imageURL;
        // console.log('Fetched Data from DB:', userURL[0].imageURL);

        return NextResponse.json({
            success: true,
            message: 'User signed in successfully!',
            session: {
                access_token: data.session.access_token,
                user_URL: userURL,
            },
        });

    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json(
            { success: false, error: 'Unable to process the request' },
            { status: 500 }
        );
    }
}

export async function fetchUserData(userName) {
    try {
        const { data, error } = await supabase
            .from('Users')
            .select('*')
            .ilike('fullName', userName);

        // console.log('Response:', data);

        if (error) {
            console.error('Error fetching data:', error);
            return null;
        }

        return data;

    } catch (err) {
        console.error('Unexpected error in fetchUserData:', err);
        return null;
    }
}
