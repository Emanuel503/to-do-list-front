import { NextResponse } from 'next/server';

export function middleware(request) {

    const token = request.cookies.get('token')
    const { pathname } = request.nextUrl;
    
    //If the user has a token they cannot access the login
    if (pathname == '/login' && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    //If the user not has a token they cannot access the app, they will return to the login
    if (pathname !== '/login' && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login'],
}