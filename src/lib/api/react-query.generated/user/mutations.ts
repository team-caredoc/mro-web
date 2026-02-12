/* AUTO-GENERATED: user/mutations.ts */
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
export type IPutUserModifyResponse = Types.DefaultResponseObject;
export type IPostUserSignupResponse =
  Types.DefaultResponseUserAccountSignupResponse;
export type IPostUserLoginResponse =
  Types.DefaultResponseUserAccountLoginResponse;
export type IPostUserLoginVerifyPhoneNumberResponse =
  Types.DefaultResponseUserVerifyPhoneNumberResponse;
export type IPostUserLoginVerifyEmailResponse =
  Types.DefaultResponseUserVerifyEmailResponse;
export type IPostUserLoginSendPhoneNumberResponse = Types.DefaultResponseObject;
export type IPostUserLoginSendEmailResponse = Types.DefaultResponseObject;
export type IPostUserChangeVerifyPhoneNumberResponse =
  Types.DefaultResponseUserVerifyPhoneNumberResponse;
export type IPostUserChangeVerifyEmailResponse =
  Types.DefaultResponseUserVerifyEmailResponse;
export type IPostUserChangeSendPhoneNumberResponse =
  Types.DefaultResponseObject;
export type IPostUserChangeSendEmailResponse = Types.DefaultResponseObject;
export type IPostUserChangePhoneNumberResponse =
  Types.DefaultResponseUserChangePhoneNumberResponse;
export type IPostUserChangeEmailResponse =
  Types.DefaultResponseUserChangeEmailResponse;
export type IDeleteUserDeleteResponse = Types.DefaultResponseObject;

// ===== Init types (per route) =====
export type IPutUserModifyInit = {
  body: Types.UserModifyForm;
};
export type IPostUserSignupInit = {
  body: Types.UserSignupForm;
};
export type IPostUserLoginInit = {
  body: Types.UserLoginForm;
};
export type IPostUserLoginVerifyPhoneNumberInit = {
  body: Types.UserVerifyPhoneNumberForm;
};
export type IPostUserLoginVerifyEmailInit = {
  body: Types.UserVerifyEmailForm;
};
export type IPostUserLoginSendPhoneNumberInit = {
  body: Types.UserSendPhoneNumberForm;
};
export type IPostUserLoginSendEmailInit = {
  body: Types.UserSendEmailForm;
};
export type IPostUserChangeVerifyPhoneNumberInit = {
  body: Types.UserVerifyPhoneNumberForm;
};
export type IPostUserChangeVerifyEmailInit = {
  body: Types.UserVerifyEmailForm;
};
export type IPostUserChangeSendPhoneNumberInit = {
  body: Types.UserSendPhoneNumberForm;
};
export type IPostUserChangeSendEmailInit = {
  body: Types.UserSendEmailForm;
};
export type IPostUserChangePhoneNumberInit = {
  body: Types.UserChangePhoneNumberForm;
};
export type IPostUserChangeEmailInit = {
  body: Types.UserChangeEmailForm;
};
export type IDeleteUserDeleteInit = void;

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
  putUserModify: ["putUserModify"],
  postUserSignup: ["postUserSignup"],
  postUserLogin: ["postUserLogin"],
  postUserLoginVerifyPhoneNumber: ["postUserLoginVerifyPhoneNumber"],
  postUserLoginVerifyEmail: ["postUserLoginVerifyEmail"],
  postUserLoginSendPhoneNumber: ["postUserLoginSendPhoneNumber"],
  postUserLoginSendEmail: ["postUserLoginSendEmail"],
  postUserChangeVerifyPhoneNumber: ["postUserChangeVerifyPhoneNumber"],
  postUserChangeVerifyEmail: ["postUserChangeVerifyEmail"],
  postUserChangeSendPhoneNumber: ["postUserChangeSendPhoneNumber"],
  postUserChangeSendEmail: ["postUserChangeSendEmail"],
  postUserChangePhoneNumber: ["postUserChangePhoneNumber"],
  postUserChangeEmail: ["postUserChangeEmail"],
  deleteUserDelete: ["deleteUserDelete"],
};

export const mutationFns = {
  putUserModify: (
    init: IPutUserModifyInit,
  ): Promise<IPutUserModifyResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/modify`;
    const __opt: any = { method: "PUT", body };
    return fetcher(__url, __opt);
  },
  postUserSignup: (
    init: IPostUserSignupInit,
  ): Promise<IPostUserSignupResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/signup`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postUserLogin: (
    init: IPostUserLoginInit,
  ): Promise<IPostUserLoginResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/login`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postUserLoginVerifyPhoneNumber: (
    init: IPostUserLoginVerifyPhoneNumberInit,
  ): Promise<IPostUserLoginVerifyPhoneNumberResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/login/verify-phone-number`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postUserLoginVerifyEmail: (
    init: IPostUserLoginVerifyEmailInit,
  ): Promise<IPostUserLoginVerifyEmailResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/login/verify-email`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postUserLoginSendPhoneNumber: (
    init: IPostUserLoginSendPhoneNumberInit,
  ): Promise<IPostUserLoginSendPhoneNumberResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/login/send-phone-number`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postUserLoginSendEmail: (
    init: IPostUserLoginSendEmailInit,
  ): Promise<IPostUserLoginSendEmailResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/login/send-email`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postUserChangeVerifyPhoneNumber: (
    init: IPostUserChangeVerifyPhoneNumberInit,
  ): Promise<IPostUserChangeVerifyPhoneNumberResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/change/verify-phone-number`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postUserChangeVerifyEmail: (
    init: IPostUserChangeVerifyEmailInit,
  ): Promise<IPostUserChangeVerifyEmailResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/change/verify-email`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postUserChangeSendPhoneNumber: (
    init: IPostUserChangeSendPhoneNumberInit,
  ): Promise<IPostUserChangeSendPhoneNumberResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/change/send-phone-number`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postUserChangeSendEmail: (
    init: IPostUserChangeSendEmailInit,
  ): Promise<IPostUserChangeSendEmailResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/change/send-email`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postUserChangePhoneNumber: (
    init: IPostUserChangePhoneNumberInit,
  ): Promise<IPostUserChangePhoneNumberResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/change/phone-number`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  postUserChangeEmail: (
    init: IPostUserChangeEmailInit,
  ): Promise<IPostUserChangeEmailResponse> => {
    const { body } = init as any;
    const __url = `/v1/user/change/email`;
    const __opt: any = { method: "POST", body };
    return fetcher(__url, __opt);
  },
  deleteUserDelete: (): Promise<IDeleteUserDeleteResponse> => {
    const __url = `/v1/user/delete`;
    const __opt: any = { method: "DELETE" };
    return fetcher(__url, __opt);
  },
};

export const mutations = {
  putUserModify: {
    mutationKey: mutationKeys.putUserModify,
    mutationFn: mutationFns.putUserModify,
  },
  postUserSignup: {
    mutationKey: mutationKeys.postUserSignup,
    mutationFn: mutationFns.postUserSignup,
  },
  postUserLogin: {
    mutationKey: mutationKeys.postUserLogin,
    mutationFn: mutationFns.postUserLogin,
  },
  postUserLoginVerifyPhoneNumber: {
    mutationKey: mutationKeys.postUserLoginVerifyPhoneNumber,
    mutationFn: mutationFns.postUserLoginVerifyPhoneNumber,
  },
  postUserLoginVerifyEmail: {
    mutationKey: mutationKeys.postUserLoginVerifyEmail,
    mutationFn: mutationFns.postUserLoginVerifyEmail,
  },
  postUserLoginSendPhoneNumber: {
    mutationKey: mutationKeys.postUserLoginSendPhoneNumber,
    mutationFn: mutationFns.postUserLoginSendPhoneNumber,
  },
  postUserLoginSendEmail: {
    mutationKey: mutationKeys.postUserLoginSendEmail,
    mutationFn: mutationFns.postUserLoginSendEmail,
  },
  postUserChangeVerifyPhoneNumber: {
    mutationKey: mutationKeys.postUserChangeVerifyPhoneNumber,
    mutationFn: mutationFns.postUserChangeVerifyPhoneNumber,
  },
  postUserChangeVerifyEmail: {
    mutationKey: mutationKeys.postUserChangeVerifyEmail,
    mutationFn: mutationFns.postUserChangeVerifyEmail,
  },
  postUserChangeSendPhoneNumber: {
    mutationKey: mutationKeys.postUserChangeSendPhoneNumber,
    mutationFn: mutationFns.postUserChangeSendPhoneNumber,
  },
  postUserChangeSendEmail: {
    mutationKey: mutationKeys.postUserChangeSendEmail,
    mutationFn: mutationFns.postUserChangeSendEmail,
  },
  postUserChangePhoneNumber: {
    mutationKey: mutationKeys.postUserChangePhoneNumber,
    mutationFn: mutationFns.postUserChangePhoneNumber,
  },
  postUserChangeEmail: {
    mutationKey: mutationKeys.postUserChangeEmail,
    mutationFn: mutationFns.postUserChangeEmail,
  },
  deleteUserDelete: {
    mutationKey: mutationKeys.deleteUserDelete,
    mutationFn: mutationFns.deleteUserDelete,
  },
};
