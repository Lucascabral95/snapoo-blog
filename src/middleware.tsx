import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (session) {
    if (
      req.nextUrl.pathname === "/feed/login" ||
      req.nextUrl.pathname === "/feed/register"
    ) {
      return NextResponse.redirect(new URL("/feed", req.url));
    }
  }

  if (!session) {
    if (
      req.nextUrl.pathname.startsWith("/feed/perfil") ||
      req.nextUrl.pathname.startsWith("/feed/ajustes")
    ) {
      return NextResponse.redirect(new URL("/feed/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/feed/login",
    "/feed/register",
    "/feed/perfil/:path*",
    "/feed/ajustes",
  ],
};
