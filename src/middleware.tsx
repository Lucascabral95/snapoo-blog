// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (session) {
//     if (
//       req.nextUrl.pathname === "/feed/login" ||
//       req.nextUrl.pathname === "/feed/register"
//     ) {
//       return NextResponse.redirect(new URL("/feed", req.url));
//     }
//   }

//   if (!session) {
//     if (
//       req.nextUrl.pathname.startsWith("/usuario/perfil/") ||
//       req.nextUrl.pathname.startsWith("/feed/ajustes")
//     ) {
//       return NextResponse.redirect(new URL("/feed/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/usuario/perfil/:path*",
//     "/feed/register",
//     "/feed/perfil/:path*",
//     "/feed/ajustes"
//   ],
// };

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PUBLIC_AUTH_ROUTES,
  PROTECTED_ROUTES,
  REDIRECT_ROUTES,
} from "@/infrastructure/config/routes.config";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (session && isPublicAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(REDIRECT_ROUTES.FEED, req.url));
  }

  if (!session && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL(REDIRECT_ROUTES.LOGIN, req.url));
  }

  return NextResponse.next();
}

function isPublicAuthRoute(pathname: string): boolean {
  return PUBLIC_AUTH_ROUTES.some((route) => pathname === route);
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

export const config = {
  matcher: [
    "/usuario/perfil/:path*",
    "/feed/register",
    "/feed/perfil/:path*",
    "/feed/ajustes",
  ],
};
