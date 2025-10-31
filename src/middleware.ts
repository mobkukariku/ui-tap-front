import {NextRequest, NextResponse} from "next/server";

const adminRoutes = [
    "/admin",
]

const managerRoutes = [
    "/manager",
]


export async function middleware(req:NextRequest) {
    const role = req.cookies.get('USER_ROLE')?.value;
    console.log(1)

    if(!role){
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    if (adminRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
        if(role === "ADMIN") {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    if(managerRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
        if(role === "MANAGER") {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL('/auth/login', req.url))
    }
}


export const config = {
    matcher: [
        '/admin/:path*',
        '/manager/:path*'
    ],
}