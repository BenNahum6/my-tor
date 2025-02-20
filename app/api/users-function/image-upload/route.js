import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        // Receiving the file from the request
        const formData = await req.formData();
        const file = formData.get("image");

        if (!file) {
            return NextResponse.json({ error: "No image received." }, { status: 400 });
        }

        // Reading as a Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const safeFileName = await getUserName();  // Getting the user's name from the session
        const safeNameURL = safeFileName.replace(/\s+/g, ''); // Remove all spaces
        const filePath = `UserImages/${safeNameURL}`;

        // מחיקת הקובץ הישן לפני ההעלאה החדשה
        await supabase.storage.from("Images").remove([filePath]);

        // Sending the file to Supabase Storage
        const { data, error } = await supabase.storage
            .from("Images")
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: true,
                cacheControl: "0",
            });

        if (error) {
            console.error("Error uploading to Supabase:", error);
            return NextResponse.json({ error: `Error uploading to Supabase: ${error.message}` }, { status: 500 });
        }


        const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/${filePath}`;

        const { data: userData, error: userError } = await supabase
            .from('Users')
            .update({
                imageURL: publicUrl,
            })
            .eq('fullName', safeFileName)
            .eq('exists', true)
            .select('*');

        return NextResponse.json({ message: "The file has been uploaded!", url: publicUrl }, { status: 200 });

    } catch (error) {
        console.error("General error:", error);
        return NextResponse.json({ error: `General error: ${error.message}` }, { status: 500 });
    }
}

/* GET user's name from the session  */
export async function getUserName() {
    const cookieStore = cookies();
    const cookieToken = cookieStore.get('jwt')?.value;

    if (!cookieToken) {
        return new Response(JSON.stringify({ error: 'Token is missing' }), { status: 401 });
    }

    const { data, error } = await supabase.auth.getUser(cookieToken);

    if (error) {
        return NextResponse.json({ error: 'Unable to fetch user data' }, { status: 401 });
    }

    return data.user.user_metadata.fullName;
}
