import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/shared/config/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const CANONICAL_HOST = "infootball.kr";

export default function middleware(request: NextRequest) {
  // x-forwarded-host가 있으면 nginx 같은 reverse proxy를 통한 요청
  // → 실제 사용자가 접근한 도메인 기준으로 판단
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host") ?? "";

  // vercel.app 직접 접근 → infootball.kr로 301 리디렉트 (nginx proxy 경유 시엔 x-forwarded-host가 infootball.kr이므로 여기 도달 안 함)
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
