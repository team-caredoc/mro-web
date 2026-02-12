/* AUTO-GENERATED: carecoordi/mutations.ts */
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

// ===== Init types (per route) =====

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

export const mutationKeys = {};

export const mutationFns = {};

export const mutations = {};
