/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserModifyForm {
  /**
   * 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 성별
   * @example "MALE"
   */
  gender: "NONE" | "MALE" | "FEMALE";
  /**
   * 생년월일
   * @format date
   */
  birthDT: string;
  /**
   * Client 식별자
   * @example "caredoc-web"
   */
  clientId: string;
}

export interface DefaultResponseObject {
  statusCd?: string;
  statusMsg?: string;
  data?: object;
}

export interface UserSignupForm {
  /**
   * 소셜 로그인 타입
   * @example "KAKAO"
   */
  socialType: "NONE" | "KAKAO" | "APPLE" | "KB_OCARE" | "EMAIL" | "CAREDOC_WEB";
  /**
   * 소셜 로그인시 발급받은 token, code, idToken
   * @example "ya29.a0AWY7Ckm8FLcJJ-9tpiKaGCqFUBBdRqjgIsIzaXZd7gKTTlFW5nYs7-5HL8shX7hyz6cCXqm2C7EV6O1oNwzcb7Y3TJGw0uXBqwbyP1V8npo-34LXIMeKEYuAM_lG1m70KFSh823EZmfgmwvDYViIO6O0Zp-5aCgYKARgSARMSFQG1tDrp8JhAJgYsWj_5LDSC98LM1Q0163"
   */
  token: string;
  /**
   * 이메일
   * @pattern ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
   * @example "test@example.com"
   */
  email: string;
  /** 이메일 인증 토큰 */
  emailToken?: string;
  /**
   * 휴대폰 번호
   * @example "01012341234"
   */
  phoneNumber: string;
  /** 휴대폰 번호 인증 토큰 */
  phoneNumberToken?: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 성별
   * @example "MALE"
   */
  gender: "NONE" | "MALE" | "FEMALE";
  /**
   * 생년월일
   * @format date
   */
  birthDT: string;
  /**
   * Client 식별자
   * @example "caredoc-web"
   */
  clientId: string;
  /** 약관 동의 항목 */
  termsSeqs?: number[];
}

export interface DefaultResponseUserAccountSignupResponse {
  statusCd?: string;
  statusMsg?: string;
  /** 통합 계정 회원가입 Response */
  data?: UserAccountSignupResponse;
}

/** 통합 계정 회원가입 Response */
export interface UserAccountSignupResponse {
  /**
   * 성공 여부
   * @example true
   */
  isSuccess: boolean;
  /** 실패 응답 메시지 */
  failMessage?: string;
  /** 이름 */
  name?: string;
}

export interface UserLoginForm {
  clientId?: string;
  providerType?: "KAKAO" | "APPLE" | "EMAIL" | "PHONE";
  token?: string;
}

export interface DefaultResponseUserAccountLoginResponse {
  statusCd?: string;
  statusMsg?: string;
  /** 통합 계정 로그인 Response */
  data?: UserAccountLoginResponse;
}

/**
 * 성별
 * @example "MALE"
 */
export interface EnumResponseGenderType {
  text?: string;
  value?: "NONE" | "MALE" | "FEMALE";
}

/** 소셜 타입 */
export interface EnumResponseSocialType {
  text?: string;
  value?: "NONE" | "KAKAO" | "APPLE" | "KB_OCARE" | "EMAIL" | "CAREDOC_WEB";
}

/** 통합 계정 로그인 Response */
export interface UserAccountLoginResponse {
  /**
   * 로그인 상태
   * @example "LOGIN_SUCCESS"
   */
  status: "LOGIN_SUCCESS" | "NEED_SIGNUP";
  /** 통합 계정 Response */
  userAccount?: UserAccountResponse;
  /** 유저 정보 */
  userProfile?: UserProfileResponse;
}

/** 통합 계정 Response */
export interface UserAccountResponse {
  /**
   * 구분값
   * @format int64
   * @example 1
   */
  seq: number;
  /**
   * uid
   * @example "U2001500T05E2"
   */
  uid: string;
  /**
   * 이메일
   * @example "caredoc@caredoc.k"
   */
  email?: string;
  /**
   * 연락처
   * @example "01012345678"
   */
  phoneNumber?: string;
  /**
   * 등록일자
   * @format date-time
   */
  createdDT?: string;
  /** 소셜 타입 */
  socialType: EnumResponseSocialType;
}

/** 유저 정보 */
export interface UserProfileResponse {
  /** 소셜 타입 */
  socialType: EnumResponseSocialType;
  /**
   * 이메일
   * @example "caredoc@caredoc.k"
   */
  email?: string;
  /**
   * 연락처
   * @example "01012345678"
   */
  phoneNumber?: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name?: string;
  /** 성별 */
  gender?: EnumResponseGenderType;
  /**
   * 생년월일
   * @format date
   */
  birthDT?: string;
}

export interface UserVerifyPhoneNumberForm {
  /**
   * 인증코드 6자리
   * @minLength 6
   * @maxLength 6
   * @example "123456"
   */
  code: string;
  /**
   * 휴대폰 번호
   * @example "01012341234"
   */
  phoneNumber: string;
}

export interface DefaultResponseUserVerifyPhoneNumberResponse {
  statusCd?: string;
  statusMsg?: string;
  /** 휴대폰 번호 검증 Response */
  data?: UserVerifyPhoneNumberResponse;
}

/** 휴대폰 번호 검증 Response */
export interface UserVerifyPhoneNumberResponse {
  /**
   * 성공여부
   * @example true
   */
  isSuccess: boolean;
  /** 실패 응답 메시지 */
  failMessage?: string;
  /**
   * 휴대폰 번호
   * @example "01012341234"
   */
  phoneNumber: string;
  /** 인증토큰 */
  token?: string;
}

export interface UserVerifyEmailForm {
  /**
   * 인증코드 6자리
   * @minLength 6
   * @maxLength 6
   * @example "123456"
   */
  code: string;
  /**
   * 이메일
   * @pattern ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
   * @example "test@example.com"
   */
  email: string;
}

export interface DefaultResponseUserVerifyEmailResponse {
  statusCd?: string;
  statusMsg?: string;
  /** 이메일 검증 Response */
  data?: UserVerifyEmailResponse;
}

/** 이메일 검증 Response */
export interface UserVerifyEmailResponse {
  /**
   * 성공여부
   * @example true
   */
  isSuccess: boolean;
  /** 실패 응답 메시지 */
  failMessage?: string;
  /**
   * 이메일
   * @example "test@example.com"
   */
  email: string;
  /** 인증토큰 */
  token?: string;
}

export interface UserSendPhoneNumberForm {
  /**
   * 휴대폰 번호
   * @example "01012341234"
   */
  phoneNumber: string;
}

export interface UserSendEmailForm {
  /**
   * 이메일
   * @pattern ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
   * @example "test@example.com"
   */
  email: string;
}

export interface UserChangePhoneNumberForm {
  /** 인증토큰 */
  token: string;
  /**
   * 휴대폰 번호
   * @example "01012341234"
   */
  phoneNumber: string;
}

export interface DefaultResponseUserChangePhoneNumberResponse {
  statusCd?: string;
  statusMsg?: string;
  /** 휴대폰 번호 변경 Response */
  data?: UserChangePhoneNumberResponse;
}

/** 휴대폰 번호 변경 Response */
export interface UserChangePhoneNumberResponse {
  /**
   * 성공여부
   * @example true
   */
  isSuccess: boolean;
  /** 실패 응답 메시지 */
  failMessage?: string;
  /**
   * 휴대폰 번호
   * @example "01012341234"
   */
  phoneNumber: string;
}

export interface UserChangeEmailForm {
  /** 인증토큰 */
  token: string;
  /**
   * 이메일
   * @pattern ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
   * @example "test@example.com"
   */
  email: string;
}

export interface DefaultResponseUserChangeEmailResponse {
  statusCd?: string;
  statusMsg?: string;
  /** 이메일 변경 Response */
  data?: UserChangeEmailResponse;
}

/** 이메일 변경 Response */
export interface UserChangeEmailResponse {
  /**
   * 성공여부
   * @example true
   */
  isSuccess: boolean;
  /** 실패 응답 메시지 */
  failMessage?: string;
  /**
   * 이메일
   * @example "test@example.com"
   */
  email: string;
}

export interface PartnerSignupForm {
  /**
   * 이메일
   * @pattern ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
   * @example "test@example.com"
   */
  email: string;
  /** 이메일 인증 토큰 */
  emailToken?: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 휴대폰 번호
   * @example "01012341234"
   */
  phoneNumber: string;
  /**
   * Client 식별자
   * @example "mro-web"
   */
  clientId: string;
}

export interface DefaultResponsePartnerAccountSignupResponse {
  statusCd?: string;
  statusMsg?: string;
  /** 파트너 도메인 통합 계정 회원가입 Response */
  data?: PartnerAccountSignupResponse;
}

/** 파트너 도메인 통합 계정 회원가입 Response */
export interface PartnerAccountSignupResponse {
  /**
   * 성공 여부
   * @example true
   */
  isSuccess: boolean;
  /** 실패 응답 메시지 */
  failMessage?: string;
  /** 이름 */
  name?: string;
}

export interface PartnerLoginForm {
  /**
   * 이메일
   * @pattern ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
   * @example "test@example.com"
   */
  email: string;
  /** 이메일 인증 토큰 */
  emailToken?: string;
  /**
   * Client 식별자
   * @example "mro-web"
   */
  clientId: string;
}

export interface DefaultResponsePartnerAccountLoginResponse {
  statusCd?: string;
  statusMsg?: string;
  /** 파트너 도메인 통합 계정 로그인 Response */
  data?: PartnerAccountLoginResponse;
}

/** 파트너 도메인 통합 계정 로그인 Response */
export interface PartnerAccountLoginResponse {
  /**
   * 로그인 상태
   * @example "LOGIN_SUCCESS"
   */
  status: "LOGIN_SUCCESS" | "LOGIN_FAILED" | "NEED_SIGNUP";
}

export interface PartnerVerifyEmailForm {
  /**
   * 인증코드 6자리
   * @minLength 6
   * @maxLength 6
   * @example "123456"
   */
  code: string;
  /**
   * 이메일
   * @pattern ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
   * @example "test@example.com"
   */
  email: string;
}

export interface DefaultResponsePartnerVerifyEmailResponse {
  statusCd?: string;
  statusMsg?: string;
  /** 파트너 이메일 검증 Response */
  data?: PartnerVerifyEmailResponse;
}

/** 파트너 이메일 검증 Response */
export interface PartnerVerifyEmailResponse {
  /**
   * 성공여부
   * @example true
   */
  isSuccess: boolean;
  /** 실패 응답 메시지 */
  failMessage?: string;
  /**
   * 이메일
   * @example "test@example.com"
   */
  email: string;
  /** 인증토큰 */
  token?: string;
}

export interface PartnerSendEmailForm {
  /**
   * 이메일
   * @pattern ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
   * @example "test@example.com"
   */
  email: string;
}

export interface SignupForm {
  /**
   * 이메일
   * @example "dev@caredoc.kr"
   */
  email: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 비밀번호
   * @example "password"
   */
  password: string;
  /**
   * Client 식별자
   * @example "analytics-web"
   */
  clientId: string;
}

export interface ChangePasswordForm {
  /**
   * 이메일
   * @example "dev@caredoc.kr"
   */
  email: string;
  /**
   * 현재 비밀번호
   * @example "currentPassword"
   */
  currentPassword: string;
  /**
   * 새 비밀번호
   * @example "newPassword"
   */
  newPassword: string;
  /**
   * Client 식별자
   * @example "analytics-web"
   */
  clientId: string;
}

export interface DefaultResponseUserAccountDetailResponse {
  statusCd?: string;
  statusMsg?: string;
  /** 통합 계정 Response */
  data?: UserAccountDetailResponse;
}

/** 케어클라이언트 */
export interface UserAccountDetailCareclientResponse {
  /**
   * 케어클라이언트 seq
   * @format int64
   */
  seq: number;
  /** 이름 */
  name: string;
  /** 이메일 */
  email: string;
  /** 연락처 */
  phoneNumber: string;
  /** 성별 */
  gender?: EnumResponseGenderType;
  /**
   * 생년월일
   * @format date
   */
  birthDT?: string;
  /** 소셜 타입 */
  socialType: EnumResponseSocialType;
}

/** 케어코디 */
export interface UserAccountDetailCarecoordiResponse {
  /**
   * 케어코디 seq
   * @format int64
   */
  seq: number;
  /** 이름 */
  name: string;
  /** 이메일 */
  email: string;
  /** 연락처 */
  phoneNumber: string;
  /** 성별 */
  gender?: EnumResponseGenderType;
  /**
   * 생년월일
   * @format date
   */
  birthDT?: string;
  /** 소셜 타입 */
  socialType: EnumResponseSocialType;
}

/** 통합 계정 Response */
export interface UserAccountDetailResponse {
  /**
   * 구분값
   * @format int64
   * @example 1
   */
  seq: number;
  /**
   * uid
   * @example "U2001500T05E2"
   */
  uid: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name?: string;
  /**
   * 이메일
   * @example "caredoc@caredoc.k"
   */
  email?: string;
  /**
   * 연락처
   * @example "01012345678"
   */
  phoneNumber?: string;
  /** 성별 */
  gender?: EnumResponseGenderType;
  /**
   * 생년월일
   * @format date
   */
  birthDT?: string;
  /**
   * 등록일자
   * @format date-time
   */
  createdDT?: string;
  /** 소셜 타입 */
  primarySocialType: EnumResponseSocialType;
  /** 케어클라이언트 */
  careclient?: UserAccountDetailCareclientResponse;
  /** 케어코디 */
  carecoordi?: UserAccountDetailCarecoordiResponse;
}

export interface DefaultResponsePartnerAccountDetailResponse {
  statusCd?: string;
  statusMsg?: string;
  /** 파트너 통합 계정 Response */
  data?: PartnerAccountDetailResponse;
}

/** 파트너 통합 계정 Response */
export interface PartnerAccountDetailResponse {
  /**
   * 구분값
   * @format int64
   * @example 1
   */
  seq: number;
  /**
   * uid
   * @example "P2001500T05E2"
   */
  uid: string;
  /**
   * 이름
   * @example "홍길동"
   */
  name?: string;
  /**
   * 이메일
   * @example "partner@example.com"
   */
  email?: string;
  /**
   * 연락처
   * @example "01012345678"
   */
  phoneNumber?: string;
  /**
   * 등록일자
   * @format date-time
   */
  createdDT?: string;
}

export interface DefaultResponseHashMapStringString {
  statusCd?: string;
  statusMsg?: string;
  data?: Record<string, string>;
}

export interface DefaultResponseMapStringString {
  statusCd?: string;
  statusMsg?: string;
  data?: Record<string, string>;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://auth-api.probe.caredoc.kr";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Auth API 명세서
 * @version v1
 * @baseUrl https://auth-api.probe.caredoc.kr
 *
 * Auth API 명세서
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 로드밸런서 헬스체크용 루트 응답
   *
   * @tags 토큰 생성(SNS 인증 Pass)
   * @name Health
   * @summary 루트 헬스체크
   * @request GET:/
   * @secure
   */
  health = (params: RequestParams = {}) =>
    this.request<DefaultResponseMapStringString, any>({
      path: `/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  v1 = {
    /**
     * @description 기본정보를 수정합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name ModifyUser
     * @summary 기본정보 수정
     * @request PUT:/v1/user/modify
     * @secure
     */
    modifyUser: (data: UserModifyForm, params: RequestParams = {}) =>
      this.request<DefaultResponseObject, any>({
        path: `/v1/user/modify`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Refresh Token 파기 처리 API Refresh Token을 Header에 담아 전송
     *
     * @tags 인증 관리
     * @name ExpiredRefreshToken
     * @summary 로그아웃시 Refresh Token 파기
     * @request PUT:/v1/auth/token/expired
     * @secure
     */
    expiredRefreshToken: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/auth/token/expired`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 통합 계정 회원을 등록 합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name Signup
     * @summary 회원 가입
     * @request POST:/v1/user/signup
     * @secure
     */
    signup: (data: UserSignupForm, params: RequestParams = {}) =>
      this.request<DefaultResponseUserAccountSignupResponse, any>({
        path: `/v1/user/signup`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 소셜 로그인 code 기반으로 회원을 인증하고 세션을 생성합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name Login
     * @summary 회원 로그인
     * @request POST:/v1/user/login
     * @secure
     */
    login: (data: UserLoginForm, params: RequestParams = {}) =>
      this.request<DefaultResponseUserAccountLoginResponse, any>({
        path: `/v1/user/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description [로그인] 휴대폰 번호 인증코드를 검증합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name VerifyPhoneNumber
     * @summary [로그인] 휴대폰 번호 인증코드 검증
     * @request POST:/v1/user/login/verify-phone-number
     * @secure
     */
    verifyPhoneNumber: (
      data: UserVerifyPhoneNumberForm,
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseUserVerifyPhoneNumberResponse, any>({
        path: `/v1/user/login/verify-phone-number`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description [로그인] 이메일 인증코드를 검증합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name VerifyEmailForLogin
     * @summary [로그인] 이메일 인증코드 검증
     * @request POST:/v1/user/login/verify-email
     * @secure
     */
    verifyEmailForLogin: (
      data: UserVerifyEmailForm,
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseUserVerifyEmailResponse, any>({
        path: `/v1/user/login/verify-email`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description [로그인] 휴대폰 번호 인증코드를 발송한다.
     *
     * @tags C2C 도메인 통합 계정
     * @name SendPhoneNumberVerification
     * @summary [로그인] 휴대폰 번호 인증코드 발송
     * @request POST:/v1/user/login/send-phone-number
     * @secure
     */
    sendPhoneNumberVerification: (
      data: UserSendPhoneNumberForm,
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseObject, any>({
        path: `/v1/user/login/send-phone-number`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description [로그인] 이메일 인증코드를 발송한다.
     *
     * @tags C2C 도메인 통합 계정
     * @name SendEmailVerificationForLogin
     * @summary [로그인] 이메일 인증코드 발송
     * @request POST:/v1/user/login/send-email
     * @secure
     */
    sendEmailVerificationForLogin: (
      data: UserSendEmailForm,
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseObject, any>({
        path: `/v1/user/login/send-email`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description [휴대폰 번호 변경] 휴대폰 번호 인증코드를 검증합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name VerifyPhoneNumberForChange
     * @summary [휴대폰 번호 변경] 휴대폰 번호 인증코드 검증
     * @request POST:/v1/user/change/verify-phone-number
     * @secure
     */
    verifyPhoneNumberForChange: (
      data: UserVerifyPhoneNumberForm,
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseUserVerifyPhoneNumberResponse, any>({
        path: `/v1/user/change/verify-phone-number`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description [이메일 변경] 이메일 인증코드를 검증합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name VerifyEmailForChange
     * @summary [이메일 변경] 이메일 인증코드 검증
     * @request POST:/v1/user/change/verify-email
     * @secure
     */
    verifyEmailForChange: (
      data: UserVerifyEmailForm,
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseUserVerifyEmailResponse, any>({
        path: `/v1/user/change/verify-email`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description [휴대폰 번호 변경] 휴대폰 번호 인증코드를 발송합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name SendPhoneNumberVerificationForChange
     * @summary [휴대폰 번호 변경] 휴대폰 번호 인증코드 발송
     * @request POST:/v1/user/change/send-phone-number
     * @secure
     */
    sendPhoneNumberVerificationForChange: (
      data: UserSendPhoneNumberForm,
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseObject, any>({
        path: `/v1/user/change/send-phone-number`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description [이메일 변경] 이메일 인증코드를 발송한다.
     *
     * @tags C2C 도메인 통합 계정
     * @name SendEmailVerificationForChange
     * @summary [이메일 변경] 이메일 인증코드 발송
     * @request POST:/v1/user/change/send-email
     * @secure
     */
    sendEmailVerificationForChange: (
      data: UserSendEmailForm,
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseObject, any>({
        path: `/v1/user/change/send-email`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 휴대폰 번호를 변경합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name ChangePhoneNumber
     * @summary 휴대폰 번호 변경
     * @request POST:/v1/user/change/phone-number
     * @secure
     */
    changePhoneNumber: (
      data: UserChangePhoneNumberForm,
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseUserChangePhoneNumberResponse, any>({
        path: `/v1/user/change/phone-number`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 이메일 변경합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name ChangeEmail
     * @summary 이메일 변경
     * @request POST:/v1/user/change/email
     * @secure
     */
    changeEmail: (data: UserChangeEmailForm, params: RequestParams = {}) =>
      this.request<DefaultResponseUserChangeEmailResponse, any>({
        path: `/v1/user/change/email`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 통합 계정 회원을 등록 합니다.
     *
     * @tags 파트너 도메인 통합 계정
     * @name Signup1
     * @summary 회원 가입
     * @request POST:/v1/partner/signup
     * @secure
     */
    signup1: (data: PartnerSignupForm, params: RequestParams = {}) =>
      this.request<DefaultResponsePartnerAccountSignupResponse, any>({
        path: `/v1/partner/signup`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 이메일 토큰으로 회원을 인증하고 세션을 생성합니다.
     *
     * @tags 파트너 도메인 통합 계정
     * @name Login1
     * @summary 회원 로그인
     * @request POST:/v1/partner/login
     * @secure
     */
    login1: (data: PartnerLoginForm, params: RequestParams = {}) =>
      this.request<DefaultResponsePartnerAccountLoginResponse, any>({
        path: `/v1/partner/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description [로그인] 이메일 인증코드를 검증합니다.
     *
     * @tags 파트너 도메인 통합 계정
     * @name VerifyEmailForLogin1
     * @summary [로그인] 이메일 인증코드 검증
     * @request POST:/v1/partner/login/verify-email
     * @secure
     */
    verifyEmailForLogin1: (
      data: PartnerVerifyEmailForm,
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponsePartnerVerifyEmailResponse, any>({
        path: `/v1/partner/login/verify-email`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description [로그인] 이메일 인증코드를 발송한다.
     *
     * @tags 파트너 도메인 통합 계정
     * @name SendEmailVerificationForLogin1
     * @summary [로그인] 이메일 인증코드 발송
     * @request POST:/v1/partner/login/send-email
     * @secure
     */
    sendEmailVerificationForLogin1: (
      data: PartnerSendEmailForm,
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseObject, any>({
        path: `/v1/partner/login/send-email`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 케어닥 계정을 등록합니다.
     *
     * @tags 인증 관리
     * @name Signup2
     * @summary 케어닥 계정 등록
     * @request POST:/v1/auth/signup
     * @secure
     */
    signup2: (data: SignupForm, params: RequestParams = {}) =>
      this.request<DefaultResponseObject, any>({
        path: `/v1/auth/signup`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 케어닥 계정 비밀번호를 등록합니다.
     *
     * @tags 인증 관리
     * @name ChangePassword
     * @summary 케어닥 계정 비밀번호 변경
     * @request POST:/v1/auth/change-password
     * @secure
     */
    changePassword: (data: ChangePasswordForm, params: RequestParams = {}) =>
      this.request<DefaultResponseObject, any>({
        path: `/v1/auth/change-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 내 정보를 조회합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name Me
     * @summary 내 정보 조회
     * @request GET:/v1/user/me
     * @secure
     */
    me: (params: RequestParams = {}) =>
      this.request<DefaultResponseUserAccountDetailResponse, any>({
        path: `/v1/user/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 내 정보를 조회합니다.
     *
     * @tags 파트너 도메인 통합 계정
     * @name Me1
     * @summary 내 정보 조회
     * @request GET:/v1/partner/me
     * @secure
     */
    me1: (params: RequestParams = {}) =>
      this.request<DefaultResponsePartnerAccountDetailResponse, any>({
        path: `/v1/partner/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 케어파트너스 로그인 후 Token 발행 처리 API
     *
     * @tags 로그인 관리
     * @name ExecuteCarepartnersLogin
     * @summary 케어파트너스 로그인 후 Token 발행
     * @request GET:/v1/carepartners/auth/token
     * @secure
     */
    executeCarepartnersLogin: (
      query: {
        /**
         * 아이디
         * @example "test"
         */
        uid: string;
        /**
         * 비밀번호
         * @example "test"
         */
        passwd: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/v1/carepartners/auth/token`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 케어파트너스 토큰 생성 처리 API
     *
     * @tags 토큰 생성(SNS 인증 Pass)
     * @name GetCarepartnersAccessToken
     * @summary 케어파트너스 토큰 생성
     * @request GET:/v1/carepartners/auth/getaccesstoken
     * @secure
     */
    getCarepartnersAccessToken: (
      query: {
        /**
         * 사용자 아이디
         * @example "test"
         */
        id: string;
        /**
         * 사용자 구분번호
         * @example 1
         */
        seq: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseHashMapStringString, any>({
        path: `/v1/carepartners/auth/getaccesstoken`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 케어코디 로그인 후 Token 발행 처리 API
     *
     * @tags 로그인 관리
     * @name ExecuteCarecoordiLogin
     * @summary 케어코디 로그인 후 Token 발행
     * @request GET:/v1/carecoordi/auth/token
     * @secure
     */
    executeCarecoordiLogin: (
      query: {
        /**
         * 소셜 로그인시 발급받은 토큰 혹은 코드
         * @example "ya29.a0AWY7Ckm8FLcJJ-9tpiKaGCqFUBBdRqjgIsIzaXZd7gKTTlFW5nYs7-5HL8shX7hyz6cCXqm2C7EV6O1oNwzcb7Y3TJGw0uXBqwbyP1V8npo-34LXIMeKEYuAM_lG1m70KFSh823EZmfgmwvDYViIO6O0Zp-5aCgYKARgSARMSFQG1tDrp8JhAJgYsWj_5LDSC98LM1Q0163"
         */
        code: string;
        /**
         * 소셜 로그인 타입 (APPLE, KAKAO)
         * @example "APPLE"
         */
        socialType: string;
        /**
         * 애플 계정 이름
         * @example "테스터"
         */
        name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/v1/carecoordi/auth/token`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 케어코디 토큰 생성(회원가입 성공이후 인증토큰 생성) 처리 API
     *
     * @tags 토큰 생성(SNS 인증 Pass)
     * @name GetCarecoordiAccessToken
     * @summary 케어코디 토큰 생성(회원가입 성공이후 인증토큰 생성)
     * @request GET:/v1/carecoordi/auth/getaccesstoken
     * @secure
     */
    getCarecoordiAccessToken: (
      query: {
        /**
         * 사용자 이메일
         * @example "test@gmail.com"
         */
        email: string;
        /**
         * 사용자 구분번호
         * @example 1
         */
        seq: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<DefaultResponseHashMapStringString, any>({
        path: `/v1/carecoordi/auth/getaccesstoken`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Token 유효성 체크 API
     *
     * @tags 인증 관리
     * @name ValidToken
     * @summary Token 유효성 체크
     * @request GET:/v1/auth/token/valid
     * @secure
     */
    validToken: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/auth/token/valid`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Access Token 재발행 처리 API Refresh Token을 Header에 담아 전송
     *
     * @tags 인증 관리
     * @name ReissueToken
     * @summary Access Token 재발행
     * @request GET:/v1/auth/token/reissue
     * @secure
     */
    reissueToken: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/auth/token/reissue`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Response Codes 명세 조회 [Front 참조용]
     *
     * @tags 공통
     * @name GetResponsecode
     * @summary Response Codes 명세 조회 [Front 참조용]
     * @request GET:/v1/auth/responsecodes
     * @secure
     */
    getResponsecode: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/v1/auth/responsecodes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 회원을 탈퇴합니다.
     *
     * @tags C2C 도메인 통합 계정
     * @name DeleteUser
     * @summary 회원 탈퇴
     * @request DELETE:/v1/user/delete
     * @secure
     */
    deleteUser: (params: RequestParams = {}) =>
      this.request<DefaultResponseObject, any>({
        path: `/v1/user/delete`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
