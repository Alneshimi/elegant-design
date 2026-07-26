import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

export default withAuth(
  function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Skip NextAuth API routes
    if (pathname.startsWith("/api/auth")) {
      return;
    }

    // Skip login page
    if (pathname === "/login") {
      return;
    }

    // Apply next-intl only to public localized pages
    if (
      pathname.startsWith("/en") ||
      pathname.startsWith("/ar")
    ) {
      return intlMiddleware(req);
    }

    return;
  },
  {
    secret: process.env.AUTH_SECRET,

    pages: {
      signIn: "/login",
    },

    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Protect admin pages only
        if (
          pathname.startsWith("/admin") ||
          pathname.startsWith("/en/admin") ||
          pathname.startsWith("/ar/admin")
        ) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\..*).*)",
  ],
};