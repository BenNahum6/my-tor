import {supabase} from "@/app/lib/supabase";
import {getUserName} from "@/app/api/users-function/image-upload/route";

export async function GET(res) {
    try {
        const userName = await getUserName();  // Getting the user's name from the session

        if (!userName) {
            console.error("No user name found!");
            return new Response(JSON.stringify({ error: 'userName is missing' }), { status: 401 });
        }

        const { data, error } = await supabase
            .from(userName)
            .select('firstName, lastName, phoneNumber, date, time');

        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error) {
        console.error('Error in API handler:', error);
        return new Response(JSON.stringify({ error: 'Error in API handler:' }), { status: 500 });
    }
}
