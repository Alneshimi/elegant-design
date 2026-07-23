import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/login");
  const isApi = pathname.startsWith("/api");

  // Skip internationalization for admin, login, and API routes
  if (isAdmin || isLogin || isApi) {
    return NextResponse.next();
  }

  // Apply internationalization to public routes
  return intlMiddleware(req);
}

export default withAuth(middleware, {
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*).*)",
  ],
};