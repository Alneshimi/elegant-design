import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Skip login and auth API
    if (
      pathname.startsWith("/login") ||
      pathname.startsWith("/api/auth")
    ) {
      return;
    }

    return intlMiddleware(req);
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdmin = req.nextUrl.pathname.startsWith("/admin");

        // Only protect /admin
        if (isAdmin) {
          return !!token;
        }

        // Everything else is public
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};