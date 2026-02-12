/* AUTO-GENERATED: user/queries.ts */
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
export type IGetUserMeResponse = Types.DefaultResponseUserAccountDetailResponse;

// ===== Init types (per route) =====
export type IGetUserMeInit = void;

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
  getUserMe: () => ["getUserMe"],
};

export const queryFns = {
  getUserMe: (): Promise<IGetUserMeResponse> => {
    const __url = `/v1/user/me`;
    const __opt: any = { method: "GET" };
    return fetcher(__url, __opt);
  },
};

export const queries = {
  getUserMe: () => ({
    queryKey: queryKeys.getUserMe(),
    queryFn: () => queryFns.getUserMe(),
  }),
};
