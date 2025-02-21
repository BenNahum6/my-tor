import { supabase } from "@/app/lib/supabase";
import { getUserName } from "@/app/api/users-function/image-upload/route";

export async function GET() {
    const userName = await getUserName();  // Getting the user's name from the session

    if (!userName) {
        console.error("No user name found!");
        return new Response(JSON.stringify({ error: 'userName is missing' }), { status: 401 });
    }


    const { data, error } = await supabase
        .from('Users')
        .select('imageURL, fullName, email')
        .eq('fullName', userName)
        .eq('exists', true)
        .single();

    if (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({ error: `Unable to fetch user details: ${error.message}` }), { status: 500 });
    }

    if (!data) {
        console.error('No user data found! ', data);
        return new Response(JSON.stringify({ error: 'No user data found' }), { status: 404 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}
