import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

const authMiddleware = withAuth({
  pages: {
    signIn: "/login",
  },
});

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // NextAuth API
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Login page
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // Protect admin only
  if (pathname.startsWith("/admin")) {
    return (authMiddleware as any)(req);
  }

  // Public localized pages
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\..*).*)",
  ],
};