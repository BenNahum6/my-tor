// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { supabase } from '@/app/lib/supabase';
//
//
// export default NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 const { data, error } = await supabase.auth.signInWithPassword({
//                     email: credentials.email,
//                     password: credentials.password,
//                 });
//
//                 if (error) {
//                     throw new Error(error.message);
//                 }
//
//                 return data.user;
//             },
//         }),
//     ],
//     pages: {
//         signIn: "/auth/signin",
//     },
//     session: {
//         strategy: "jwt",
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// });
