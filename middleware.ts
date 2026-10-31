import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BUSINESS_PORTAL = [
  "/business/dashboard",
  "/business/schedule",
  "/business/data",
  "/business/payments",
  "/business/reports",
];

export function middleware(request: NextRequest) {
  const authUser = request.cookies.get("auth-user");
  let authUserValue = null;
  try {
    authUserValue = authUser ? JSON.parse(authUser.value) : null;
  } catch {
    // Unreadable cookie: treat as logged out
  }
  const access_token = authUserValue?.access_token;
  const refresh_token = authUserValue?.refresh_token;
  const loggedIn = Boolean(access_token || refresh_token);
  const isBusiness = authUserValue?.role === "business";
  const { pathname } = request.nextUrl;
  const redirect = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));

  // Business portal: business accounts only
  if (BUSINESS_PORTAL.some((route) => pathname.startsWith(route))) {
    if (!loggedIn || !isBusiness) return redirect("/business/login");
    return NextResponse.next();
  }
  if (pathname === "/business/login" && loggedIn && isBusiness) {
    return redirect("/business/dashboard");
  }

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
    pathname.startsWith(route),
  );
  if (isProtected && !loggedIn) {
    return redirect("/login");
  }
  // Business accounts can't use the customer app
  if (isProtected && isBusiness) {
    return redirect("/business/dashboard");
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
    "/business/:path*",
  ],
};
