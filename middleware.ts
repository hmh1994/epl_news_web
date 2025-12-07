import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/shared/config/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const trimmedPath = pathname !== "/" && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;

  if (trimmedPath === "/") {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}/home`, request.url));
  }

  const localeOnly = trimmedPath.match(/^\/(ko|en)$/);
  if (localeOnly?.[1]) {
    return NextResponse.redirect(new URL(`/${localeOnly[1]}/home`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ko|en)/:path*"],
};
