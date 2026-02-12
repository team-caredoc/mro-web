import type { NextRequest } from "next/server";

import { refreshTokenHandler } from "@team-caredoc/auth/middleware";
import { NextResponse } from "next/server";

import { AUTH } from "@/constants/auth";

const isDev = process.env.NODE_ENV === "development";

export async function proxy(request: NextRequest) {
  const cookieStore = request.cookies;

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
    return refreshTokenHandler({
      refresh_token: refreshToken,
      fallback_uri: `${process.env.NEXT_PUBLIC_DOMAIN}`,
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|auth|_next/static|_next/image|images|assets|favicon.ico|.well-known|icon.png|mockServiceWorker.js).*)",
  ],
};
