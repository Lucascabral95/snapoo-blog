import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isProtectedRoute, isPublicOnlyRoute } from "@/infrastructure/auth/route-policy";
import { REDIRECT_ROUTES } from "@/infrastructure/config/routes.config";

export async function middleware(request: NextRequest) {
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    if (session && isPublicOnlyRoute(pathname)) {
        return NextResponse.redirect(new URL(REDIRECT_ROUTES.FEED, request.url));
    }

    if (!session && isProtectedRoute(pathname)) {
        return NextResponse.redirect(new URL(REDIRECT_ROUTES.LOGIN, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/register/:path*", "/feed/:path*", "/usuario/perfil/:path*"],
};
