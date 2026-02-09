import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { AUTH, AUTH_REDIRECT_URI } from "@/constants/auth";

const isDev = process.env.NODE_ENV === "development";

/**
 * 단일 페이지를 등록할때는 정확히 일치하는 경로를 등록합니다.
 * 하위 모든페이지 또는 동적 페이지를 등록할때는 와일드카드(*)를 사용합니다.
 */
const PROTECTED_ROUTES = [] as const;

/***
 *  PROTECTED_ROUTES 페이지 내에 예외페이지를 등록할때는 PUBLIC_ROUTES에 등록합니다.
 */
const PUBLIC_ROUTES = [] as const;

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const cookieStore = request.cookies;

  const AUTH_API = process.env.AUTH_API_URL as string;
  const AUTH_BASIC_KEY = process.env.CAREDOC_WEB_OAUTH_KEY as string;

  const accessToken = cookieStore.get(AUTH.ACCESS_TOKEN)?.value;
  const refreshToken = cookieStore.get(AUTH.REFRESH_TOKEN)?.value;

  // CSRF 토큰 설정
  const response = NextResponse.next();
  if (!cookieStore.get("caredoc-csrf-token")) {
    response.cookies.set("caredoc-csrf-token", crypto.randomUUID(), {
      secure: true,
    });
  }

  // 토큰 만료
  if (!accessToken && refreshToken) {
    const params = new URLSearchParams();

    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken as string);
    params.append(
      "redirect_uri",
      `${isDev ? "http://localhost:3000" : `${process.env.NEXT_PUBLIC_DOMAIN}`}/auth/callback` as string,
    );
    const tokenResponse = await fetch(`${AUTH_API}/oauth2/token`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${AUTH_BASIC_KEY}`,
      },
      body: params.toString(),
    });

    const clear = () => {
      const rewrittenResponse = NextResponse.redirect(
        isDev ? "http://localhost:3000" : `${process.env.NEXT_PUBLIC_DOMAIN}`,
      );

      const option = {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_HOST
            : undefined,
      };
      rewrittenResponse.cookies.set(AUTH.ACCESS_TOKEN, "", {
        ...option,
      });
      rewrittenResponse.cookies.set(AUTH.REFRESH_TOKEN, "", option);
      rewrittenResponse.cookies.set(AUTH.ACCESS_TOKEN_EXPIRES, "", option);
      rewrittenResponse.cookies.set(AUTH.TOKEN_TYPE, "", option);
      return rewrittenResponse;
    };

    if (!tokenResponse.ok) {
      console.error("[MIDDLEWARE] REQUEST", `${AUTH_API}/oauth2/token`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${AUTH_BASIC_KEY}`,
        },
        body: params.toString(),
      });
      console.error("[MIDDLEWARE] accessToken", accessToken);
      console.error("[MIDDLEWARE] refreshToken", refreshToken);
      return clear();
    }
    const res = await tokenResponse.json();

    if (!res?.access_token) {
      console.error("[MIDDLEWARE] res", res);
      return clear();
    }
    console.error("[MIDDLEWARE] OK", res);

    const option = {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_HOST
          : undefined,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    response.cookies.set(AUTH.ACCESS_TOKEN, res.access_token, {
      ...option,
      expires: res.expires_at,
    });
    response.cookies.set(AUTH.REFRESH_TOKEN, res.refresh_token, option);
    response.cookies.set(AUTH.ACCESS_TOKEN_EXPIRES, `${res.expires_at}`, {
      secure: process.env.NODE_ENV === "production",
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_HOST
          : undefined,
      expires: res.expires_at,
    });
    return response;
  }

  // 공개 경로 체크 (예외 처리)
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    matchesRoute(route, pathname, search),
  );

  if (isPublicRoute) {
    response.headers.set("x-current-path", pathname);
    response.headers.set("x-authenticated", accessToken ? "true" : "false");
    return response;
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    matchesRoute(route, pathname, search),
  );

  if (isProtectedRoute && !accessToken) {
    const fallbackUrl = isDev
      ? `http://localhost:3000${pathname}${search}`
      : `${process.env.NEXT_PUBLIC_DOMAIN}${pathname}${search}`;
    const referer = isDev
      ? "http://localhost:3000"
      : `${process.env.NEXT_PUBLIC_DOMAIN}`;
    const loginUrl = `${process.env.NEXT_PUBLIC_AUTH_URL}/member/login?fallbackUrl=${encodeURIComponent(fallbackUrl)}&redirect_uri=${AUTH_REDIRECT_URI}&referer=${referer}`;
    return NextResponse.redirect(new URL(loginUrl));
  }

  // 헤더 설정 (기존 로직 유지)
  response.headers.set("x-current-path", pathname);
  response.cookies.set("authenticated", refreshToken ? "true" : "false");

  return response;
}

export const config = {
  matcher: [
    "/((?!api|auth|_next/static|_next/image|images|assets|favicon.ico|.well-known|icon.png|mockServiceWorker.js).*)",
  ],
};

function matchesRoute(
  route: string,
  pathname: string,
  search: string,
): boolean {
  const [routePathname, routeSearch] = route.split("?");
  const routeSearchParams = routeSearch
    ? new URLSearchParams(routeSearch)
    : null;

  const requestSearchParams = search ? new URLSearchParams(search) : null;

  // 와일드카드 패턴 매칭
  if (routePathname.includes("*")) {
    const pattern = routePathname.replace(/\*/g, ".*").replace(/\//g, "\\/");
    const regex = new RegExp(`^${pattern}$`);

    if (!regex.test(pathname)) {
      return false;
    }
  } else {
    if (pathname !== routePathname) {
      return false;
    }
  }

  // search 파라미터가 없는 경우 pathname만 일치하면 통과
  if (!routeSearchParams) {
    return true;
  }

  // search 파라미터가 있는 경우, 모든 route의 search 파라미터가 요청에 포함되어 있는지 확인
  return Array.from(routeSearchParams.entries()).every(
    ([key, value]) => requestSearchParams?.get(key) === value,
  );
}
