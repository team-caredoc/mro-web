/* AUTO-GENERATED: auth/mutations.ts */
import { fetcher } from "@/lib/fetcher";
import type * as Types from "@/lib/api/swagger.api";

/**
 * 이 파일은 POST/PUT/PATCH/DELETE 엔드포인트만 포함합니다. ({ params, body })로 호출합니다.
 * - params: path 변수 + query 변수(합쳐서)
 * - body  : 있을 때만 사용
 * - Hover 친화: params/body를 실제 필드 타입으로 전개
 * - Init 타입 이름: I<Post|Put|Patch|Delete...>Init
 * - Response 타입 이름: I<Post|Put|Patch|Delete...>Response
 */

// ===== Response types (per route) =====
export type IPutAuthTokenExpiredResponse = void;
export type IPostAuthSignupResponse = Types.DefaultResponseObject;
export type IPostAuthChangePasswordResponse = Types.DefaultResponseObject;

// ===== Init types (per route) =====
export type IPutAuthTokenExpiredInit = void;
export type IPostAuthSignupInit = {
  body: Types.SignupForm;
};
export type IPostAuthChangePasswordInit = {
  body: Types.ChangePasswordForm;
};

function __qsFromParams(params: Record<string, any>, pathKeys: string[]) {
  const q: Record<string, any> = { ...params };
  for (const k of pathKeys) delete q[k];
  const pairs = Object.entries(q).filter(
    ([, v]) => v !== undefined && v !== null,
  );
  if (pairs.length === 0) return "";
  const search = new URLSearchParams(pairs as any).toString();
  return search ? `?${search}` : "";
}

export const mutationKeys = {
  putAuthTokenExpired: ["putAuthTokenExpired"],
  postAuthSignup: ["postAuthSignup"],
  postAuthChangePassword: ["postAuthChangePassword"],
};

export const mutationFns = {
  putAuthTokenExpired: (): Promise<IPutAuthTokenExpiredResponse> => {
    const __url = `/v1/auth/token/expired`;
    const __opt: any = { method: "PUT" };
    return fetcher(__url, __opt);
  },
  postAuthSignup: (
    init: IPostAuthSignupInit,
  ): Promise<IPostAuthSignupResponse> => {
    const { body } = init as any;
    const __url = `/v1/auth/signup`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postAuthChangePassword: (
    init: IPostAuthChangePasswordInit,
  ): Promise<IPostAuthChangePasswordResponse> => {
    const { body } = init as any;
    const __url = `/v1/auth/change-password`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
};

export const mutations = {
  putAuthTokenExpired: {
    mutationKey: mutationKeys.putAuthTokenExpired,
    mutationFn: mutationFns.putAuthTokenExpired,
  },
  postAuthSignup: {
    mutationKey: mutationKeys.postAuthSignup,
    mutationFn: mutationFns.postAuthSignup,
  },
  postAuthChangePassword: {
    mutationKey: mutationKeys.postAuthChangePassword,
    mutationFn: mutationFns.postAuthChangePassword,
  },
};
