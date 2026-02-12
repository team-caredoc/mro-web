/* AUTO-GENERATED: carecoordi/queries.ts */
import type * as Types from "@/lib/api/swagger.api";

import { fetcher } from "@/lib/fetcher";
import { getNextPageParam } from "@/lib/react-query";

/**
 * 이 파일은 GET 엔드포인트만 포함합니다. ({ params })로 호출합니다.
 * - params: path 변수 + query 변수(합쳐서)
 * - Hover 친화: params를 실제 필드 타입으로 전개
 * - Init 타입 이름: I<Get...>Init
 * - Response 타입 이름: I<Get...>Response
 * - 페이지네이션(GET + page/size): queryFn({ pageParam = '1' }) 사용
 */

// ===== Response types (per route) =====
export type IGetCarecoordiAuthTokenResponse = void;
export type IGetCarecoordiAuthGetaccesstokenResponse =
  Types.DefaultResponseHashMapStringString;

// ===== Init types (per route) =====
export type IGetCarecoordiAuthTokenInit = {
  params: {} & { code: string; socialType: string; name?: string };
};
export type IGetCarecoordiAuthGetaccesstokenInit = {
  params: {} & { email: string; seq: string };
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

export const queryKeys = {
  getCarecoordiAuthToken: (init: IGetCarecoordiAuthTokenInit) => [
    "getCarecoordiAuthToken",
    init,
  ],
  getCarecoordiAuthGetaccesstoken: (
    init: IGetCarecoordiAuthGetaccesstokenInit,
  ) => ["getCarecoordiAuthGetaccesstoken", init],
};

export const queryFns = {
  getCarecoordiAuthToken: (
    init: IGetCarecoordiAuthTokenInit,
  ): Promise<IGetCarecoordiAuthTokenResponse> => {
    const { params } = init as any;
    const __url =
      `/v1/carecoordi/auth/token` + __qsFromParams(params as any, []);
    const __opt: any = { method: "GET" };
    return fetcher(__url, __opt);
  },
  getCarecoordiAuthGetaccesstoken: (
    init: IGetCarecoordiAuthGetaccesstokenInit,
  ): Promise<IGetCarecoordiAuthGetaccesstokenResponse> => {
    const { params } = init as any;
    const __url =
      `/v1/carecoordi/auth/getaccesstoken` + __qsFromParams(params as any, []);
    const __opt: any = { method: "GET" };
    return fetcher(__url, __opt);
  },
};

export const queries = {
  getCarecoordiAuthToken: (init: IGetCarecoordiAuthTokenInit) => ({
    queryKey: queryKeys.getCarecoordiAuthToken(init),
    queryFn: () => queryFns.getCarecoordiAuthToken(init),
  }),
  getCarecoordiAuthGetaccesstoken: (
    init: IGetCarecoordiAuthGetaccesstokenInit,
  ) => ({
    queryKey: queryKeys.getCarecoordiAuthGetaccesstoken(init),
    queryFn: () => queryFns.getCarecoordiAuthGetaccesstoken(init),
  }),
};
