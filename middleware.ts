import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authUser = request.cookies.get("auth-user");
  const authUserValue = authUser ? JSON.parse(authUser.value) : null;
  const access_token = authUserValue?.access_token;
  const refresh_token = authUserValue?.refresh_token;
  const protectedRoutes = [
    "/dashboard",
    "/schedule",
    "/schedule/pickup",
    "/wallet",
    "/wallet/donate",
    "/notifications",
    "/profile",
    "/services",
    "/contact",
    "/settings",
  ];
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  if (isProtected && !access_token && !refresh_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  // :path* also matches sub-pages, e.g. /wallet/donate/<id>
  matcher: [
    "/dashboard/:path*",
    "/schedule/:path*",
    "/wallet/:path*",
    "/notifications/:path*",
    "/profile/:path*",
    "/services/:path*",
    "/contact/:path*",
    "/settings/:path*",
  ],
};
