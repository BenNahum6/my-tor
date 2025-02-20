import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/app/lib/supabase';

/* Checks if a token exists in the cookie and is valid, then skips the login page */
export async function dashboardRedirectMiddleware(req) {
    const cookieStore = cookies();
    const cookieToken = cookieStore.get('jwt')?.value;

    if (req.nextUrl.pathname === '/dashboard') {
        if (!cookieToken) {
            return NextResponse.next();
        }

        // If there is a token, we will verify that it is valid.
        const { data, error } = await supabase.auth.getUser(cookieToken);

        if (error) {
            console.error('Token validation failed:', error);

            // Delete expiry token
            const response = NextResponse.next();
            response.cookies.delete('jwt');
            // return NextResponse.redirect(new URL('/dashboard', req.url));
            return response;
        }

        // If the token is valid, a reference to the dashboard/panel
        return NextResponse.redirect(new URL('/dashboard/panel', req.url));
    }

    // If we are not on the /dashboard page, continue as usual
    return NextResponse.next();
}

/* Checks if access permission is granted to sub-addresses /dashboard/... */
export async function dashboardAccessMiddleware(req) {
    const cookieStore = cookies();
    const cookieToken = cookieStore.get('jwt')?.value;

    // console.log('Request Path:', req.nextUrl.pathname);
    // console.log('Cookie Token:', cookieToken);

    if (req.nextUrl.pathname.startsWith('/dashboard/')) {
        if (!cookieToken) {
            console.error('No token found, redirecting to /dashboard');
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        const { data, error } = await supabase.auth.getUser(cookieToken);

        if (error) {
            console.error('Token validation failed:', error);
            const response = NextResponse.next();
            response.cookies.delete('jwt');
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        // console.log('Token is valid, proceeding...');
        return NextResponse.next();
    }

    return NextResponse.next();
}

/* Checks that the path contains the correct slug */
function validateSlug(req) {
    const { pathname } = req.nextUrl;

    if (!pathname.startsWith('/pages/')) {
        // console.log("Path does not match criteria, proceeding...");
        return NextResponse.next();
    }

    const parts = pathname.split('/');
    const slug = parts[2];

    const allowedSlugs = ['Bibi', 'Itamar', 'Kahana', 'Michael'];

    if (!allowedSlugs.includes(slug)) {
        // console.log("Invalid slug, redirecting to 404...");
        return NextResponse.redirect(new URL('/404', req.url));
    }

    // console.log("Valid slug, proceeding...");
    return NextResponse.next();
}

export function middleware(req) {

    if (req.nextUrl.pathname === '/dashboard') {
        return dashboardRedirectMiddleware(req);
    }

    if (req.nextUrl.pathname.startsWith('/dashboard/')) {
        return dashboardAccessMiddleware(req);
    }

    if (req.nextUrl.pathname.startsWith('/pages/')) {
        return validateSlug(req);
    }

    return NextResponse.next();
}

// Determining the characteristics for each of the middleware
export const config = {
    matcher: ['/dashboard/:path*', '/pages/:slug*'],
};