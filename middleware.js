import { NextResponse } from 'next/server';

function validateSlug(req) {
    const { pathname } = req.nextUrl;
    console.log("Middleware is running!");
    console.log("Pathname:", pathname);

    if (!pathname.startsWith('/pages/')) {
        console.log("Path does not match criteria, proceeding...");
        return NextResponse.next();
    }

    const parts = pathname.split('/');
    const slug = parts[2];

    console.log("Extracted slug:", slug);

    const allowedSlugs = ['Bibi', 'Itamar', 'Kahana', 'Michael'];

    if (!allowedSlugs.includes(slug)) {
        console.log("Invalid slug, redirecting to 404...");
        return NextResponse.redirect(new URL('/404', req.url));
    }

    console.log("Valid slug, proceeding...");
    return NextResponse.next();
}

// The function that Next.js recognizes as middleware
export function middleware(req) {
    return validateSlug(req);
}

export const config = {
    matcher: '/pages/:slug*',
};
