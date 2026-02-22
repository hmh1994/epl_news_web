import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/shared/config/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const CANONICAL_HOST = "infootball.kr";

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  // vercel.app 또는 다른 프리뷰 URL → 커스텀 도메인으로 301 리디렉트
  if (host !== CANONICAL_HOST && host.endsWith(".vercel.app")) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

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
