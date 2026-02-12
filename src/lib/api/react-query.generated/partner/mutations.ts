/* AUTO-GENERATED: partner/mutations.ts */
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
export type IPostPartnerSignupResponse =
  Types.DefaultResponsePartnerAccountSignupResponse;
export type IPostPartnerLoginResponse =
  Types.DefaultResponsePartnerAccountLoginResponse;
export type IPostPartnerLoginVerifyEmailResponse =
  Types.DefaultResponsePartnerVerifyEmailResponse;
export type IPostPartnerLoginSendEmailResponse = Types.DefaultResponseObject;

// ===== Init types (per route) =====
export type IPostPartnerSignupInit = {
  body: Types.PartnerSignupForm;
};
export type IPostPartnerLoginInit = {
  body: Types.PartnerLoginForm;
};
export type IPostPartnerLoginVerifyEmailInit = {
  body: Types.PartnerVerifyEmailForm;
};
export type IPostPartnerLoginSendEmailInit = {
  body: Types.PartnerSendEmailForm;
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
  postPartnerSignup: ["postPartnerSignup"],
  postPartnerLogin: ["postPartnerLogin"],
  postPartnerLoginVerifyEmail: ["postPartnerLoginVerifyEmail"],
  postPartnerLoginSendEmail: ["postPartnerLoginSendEmail"],
};

export const mutationFns = {
  postPartnerSignup: (
    init: IPostPartnerSignupInit,
  ): Promise<IPostPartnerSignupResponse> => {
    const { body } = init as any;
    const __url = `/v1/partner/signup`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postPartnerLogin: (
    init: IPostPartnerLoginInit,
  ): Promise<IPostPartnerLoginResponse> => {
    const { body } = init as any;
    const __url = `/v1/partner/login`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postPartnerLoginVerifyEmail: (
    init: IPostPartnerLoginVerifyEmailInit,
  ): Promise<IPostPartnerLoginVerifyEmailResponse> => {
    const { body } = init as any;
    const __url = `/v1/partner/login/verify-email`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postPartnerLoginSendEmail: (
    init: IPostPartnerLoginSendEmailInit,
  ): Promise<IPostPartnerLoginSendEmailResponse> => {
    const { body } = init as any;
    const __url = `/v1/partner/login/send-email`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
};

export const mutations = {
  postPartnerSignup: {
    mutationKey: mutationKeys.postPartnerSignup,
    mutationFn: mutationFns.postPartnerSignup,
  },
  postPartnerLogin: {
    mutationKey: mutationKeys.postPartnerLogin,
    mutationFn: mutationFns.postPartnerLogin,
  },
  postPartnerLoginVerifyEmail: {
    mutationKey: mutationKeys.postPartnerLoginVerifyEmail,
    mutationFn: mutationFns.postPartnerLoginVerifyEmail,
  },
  postPartnerLoginSendEmail: {
    mutationKey: mutationKeys.postPartnerLoginSendEmail,
    mutationFn: mutationFns.postPartnerLoginSendEmail,
  },
};
