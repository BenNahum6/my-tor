import {supabase} from "@/app/lib/supabase";

export async function GET(res) {
    try {
        const { data, error } = await supabase
            .from('Users')
            .select('*')
            .eq('exists', true);

        if (error) {
            console.error('Error fetching users:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
        }

        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error) {
        console.error('Error in API handler:', error);
        return new Response(JSON.stringify({ error: 'Error in API handler:' }), { status: 500 });
    }
}
