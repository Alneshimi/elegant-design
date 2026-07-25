import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

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

  // Protect ONLY admin routes
  if (pathname.startsWith("/admin")) {
    return (authMiddleware as any)(req);
  }

  // Don't apply internationalization to login or API
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api")
  ) {
    return;
  }

  // Public pages
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
  ],
};