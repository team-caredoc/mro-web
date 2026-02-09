export const AUTH = {
  ACCESS_TOKEN:
    process.env.NEXT_PUBLIC_ENV === "DEVELOPMENT"
      ? "dev_access_token"
      : "access_token",
  REFRESH_TOKEN:
    process.env.NEXT_PUBLIC_ENV === "DEVELOPMENT"
      ? "dev_refresh_token"
      : "refresh_token",
  ACCESS_TOKEN_EXPIRES:
    process.env.NEXT_PUBLIC_ENV === "DEVELOPMENT"
      ? "dev_expires_in"
      : "expires_in",
  TOKEN_TYPE:
    process.env.NEXT_PUBLIC_ENV === "DEVELOPMENT"
      ? "dev_token_type"
      : "token_type",
} as const;

export const AUTH_WEB_PATHNAME = {
  // 로그인 관련
  LOGIN: "/member/login",
  LOGIN_EMAIL: "/member/login/email",
  LOGIN_PHONE: "/member/login/phone",
  LOGIN_AUTH: "/member/login/auth",

  // 계정 연결 관련
  CONNECT: "/member/connect",
  CONNECT_EXISTING_ACCOUNT: "/member/connect/existing-account",

  // 회원가입
  REGISTER: "/member/register",

  VERIFICATION_EMAIL: "/member/verification/email",
  VERIFICATION_PHONE: "/member/verification/phone",
} as const;

const isDev = process.env.NODE_ENV === "development";
export const AUTH_REDIRECT_URI = `${isDev ? "http://localhost:3000" : `https://${process.env.NEXT_PUBLIC_DOMAIN}`}/member/login/callback`;
