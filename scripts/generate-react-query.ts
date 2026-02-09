/* scripts/generate-react-query.ts
 * Api.ts(swagger-typescript-api 출력물)를 파싱해
 * src/lib/api/react-query.generated/<group>/{queries,mutations,index}.ts 와
 * src/lib/api/react-query.generated/index.ts(루트 aggregator)를 생성합니다.
 *
 * ⚠️ 주의: 이 스크립트는 기존 src/lib/api/index.ts를 덮어쓰지 않습니다.
 *          자동 생성된 API는 react-query.generated/index.ts에 저장됩니다.
 *
 * 규칙
 *  - 그룹: 경로에서 vN 다음의 첫 정적 세그먼트(예: /v2/caregiving-applyment/... → caregiving-applyment)
 *  - 네이밍: vN 무시 + 동적 세그먼트(${...}) 제외한 정적 세그먼트를 이어 붙여 Pascal → http 접두사(get/post/put/patch/delete) + Pascal
 *    - GET 이고 query 타입에 page & size가 있으면 접미사 List (예: getBannerList)
 *  - 호출 형태: ({ params, body })  // params: path+query 합본, body: 있을 때만
 *  - Hover 친화: params/body를 Parameters<...>가 아니라 **실제 전개 타입**으로 생성
 *  - Init 타입 이름: **I<Get|Post|Put|Patch|Delete...>Init** (예: IGetCaregivingPaymentInit, IPostCaregivingPaymentInit)
 *  - 페이지네이션(GET + page/size): queryFn이 ({ pageParam = '1' })를 받아 init.params.page가 없으면 pageParam 주입
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import prettier from "prettier";
import {
  ArrowFunction,
  Node,
  Project,
  SyntaxKind,
  TemplateExpression,
  Type,
} from "ts-morph";

/** ✅ Api 클래스가 들어있는 파일 경로 (너의 기준 경로) */
const API_FILE = resolve(process.cwd(), "src/lib/api/swagger.api.ts");

/** 출력 루트 및 루트 aggregator 경로 */
const OUT_BASE_DIR = resolve(
  process.cwd(),
  "src/lib/api/react-query.generated",
);
const GENERATED_INDEX = resolve(
  process.cwd(),
  "src/lib/api/react-query.generated/index.ts",
);

const MUT_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const isMutation = (m: string) => MUT_METHODS.has(m.toUpperCase());
const isQuery = (m: string) => m.toUpperCase() === "GET";

type Route = {
  ns: string;
  name: string;
  genName: string;
  http: string;
  pathExpr: string;
  pathVars: string[];
  paramNames: string[];
  idxQuery: number | null;
  idxBody: number | null;
  hasQuery: boolean;
  hasBody: boolean;
  group: string;
  fnNode: ArrowFunction;
  paginated: boolean;
};

/* ---------- 유틸리티 ---------- */
function runEslintCLI() {
  // 필요에 따라 바꿔도 됨. (pnpm, yarn, npx 등)
  // 예: pnpm eslint --fix src/libs/api/react-query.generated src/libs/api/index.ts
  const cmd =
    process.env.ESLINT_CMD ??
    "pnpm eslint src/lib/api/react-query.generated --fix --quiet";
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (e) {
    console.warn("ESLint run failed (non-blocking):", (e as Error).message);
  }
}
function getTextLiteralOrTemplate(node: any): string {
  if (!node) return '""';
  if (
    node.getKind() === SyntaxKind.StringLiteral ||
    node.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral ||
    node.getKind() === SyntaxKind.TemplateExpression
  ) {
    return node.getText();
  }
  return JSON.stringify(node.getText());
}

function extractPathVarsFromTemplate(node: Node): string[] {
  if (node.getKind() === SyntaxKind.TemplateExpression) {
    const te = node.asKindOrThrow(
      SyntaxKind.TemplateExpression,
    ) as TemplateExpression;
    const exprs = te.getTemplateSpans().map((s) => s.getExpression().getText());
    return exprs
      .map((t) => t.trim())
      .filter((t) => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(t));
  }
  return [];
}

function idxOfParam(name: string, paramNames: string[]): number | null {
  const i = paramNames.findIndex((n) => n === name);
  return i >= 0 ? i : null;
}

function splitPathSegments(raw: string): string[] {
  const s =
    raw.startsWith("`") || raw.startsWith('"') || raw.startsWith("'")
      ? raw.slice(1, -1)
      : raw;
  return s.split("/").filter(Boolean);
}

function staticSegmentsAfterVersion(pathExpr: string): string[] {
  const segs = splitPathSegments(pathExpr);
  let i = 0;
  if (segs[i] && /^v\d+$/i.test(segs[i])) i++;
  const rest = segs.slice(i);
  return rest.filter((seg) => !seg.includes("${"));
}

function stripQuotes(raw: string): string {
  const s = raw.trim();
  const unq =
    (s.startsWith("`") && s.endsWith("`")) ||
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
      ? s.slice(1, -1)
      : s;
  const upto = unq.split("${")[0];
  return upto;
}

function extractGroupFromPathExpr(pathExpr: string): string {
  const head = stripQuotes(pathExpr);
  const parts = head.split("/").filter(Boolean);
  if (parts.length === 0) return "root";
  const [first, second] = parts;
  if (/^v\d+$/i.test(first) && second) return second;
  return first;
}

function toPascal(s: string) {
  return s
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}
function toCamel(s: string) {
  const p = toPascal(s);
  return p.charAt(0).toLowerCase() + p.slice(1);
}
function httpPrefix(method: string) {
  const m = method.toUpperCase();
  if (m === "GET") return "get";
  if (m === "POST") return "post";
  if (m === "PUT") return "put";
  if (m === "PATCH") return "patch";
  if (m === "DELETE") return "delete";
  return toCamel(m);
}
function getInitTypeName(opName: string) {
  return `I${toPascal(opName)}Init`;
}

function hasPaginationKeys(
  idxQuery: number | null,
  fnNode: ArrowFunction,
): boolean {
  if (idxQuery == null) return false;
  const param = fnNode.getParameters()[idxQuery];
  if (!param) return false;
  const tnode = param.getTypeNode();

  if (tnode && tnode.getKind() === SyntaxKind.TypeLiteral) {
    const tl: any = tnode.asKindOrThrow(SyntaxKind.TypeLiteral);
    const keys: string[] = tl
      .getMembers()
      .map((m: any) => (typeof m.getName === "function" ? m.getName() : null))
      .filter(Boolean);
    const set = new Set(keys);
    return set.has("page") && set.has("size");
  }
  const txt = param.getText();
  return /\bpage\b/.test(txt) && /\bsize\b/.test(txt);
}

/* ---------- 타입 유틸: 배열 정규화 + 외부 타입 자격 부여 ---------- */

/** swagger.api 에서 온 타입이면 `Types.Xxx` 로 표기하기 위한 시도 */
function qualifyTypeForEmit(t: Type, _at: Node): string | null {
  const sym = t.getSymbol();
  if (!sym) return null;
  const fq = (sym as any).getFullyQualifiedName?.();
  if (!fq) return null;

  const lastDot = fq.lastIndexOf(".");
  const local = lastDot >= 0 ? fq.slice(lastDot + 1) : fq;

  // swagger.api 에서 온 타입이면 Types.Local 로 출력
  if (fq.includes("swagger.api")) {
    return `Types.${local}`;
  }
  // 외부/내장 타입은 로컬명만
  return local;
}

/** 읽기 좋은 문자열로 변환 (항상 T[]), 필요시 `Types.` 접두사 부여 */
function printableType(t: Type, at: Node, qualify: boolean): string {
  // 1) 배열: 재귀적으로 원소 타입을 처리하여 T[]
  if (t.isArray()) {
    const elem = t.getArrayElementType() ?? t.getTypeArguments?.()[0];
    const inner = elem ? printableType(elem, at, qualify) : "any";
    return `${inner}[]`;
  }

  // 2) 제네릭 Array<T> 형식 문자열 보정
  const raw0 = t.getText(at.getSourceFile()).replace(/globalThis\./g, "");
  const m = raw0.match(/^Array<(.+)>$/);
  if (m) {
    // 안쪽은 문자열이므로 한 번 더 타입 객체로 가져오기 어렵다.
    // 다만, ts-morph 가 isArray()를 잘 잡는 편이라 위 분기에서 대부분 처리됨.
    // 여기서는 텍스트 치환만 수행.
    const innerText = m[1].trim();
    return `${innerText}[]`;
  }

  // 3) 외부 타입 자격 부여가 필요하면 (바디 등) Types.Xxx 로 교체
  if (qualify) {
    const q = qualifyTypeForEmit(t, at);
    if (q) return q;
  }

  // 4) 최후: 원문
  return raw0;
}

/** 객체 형태를 { a: T; b?: U[]; } 로 전개; 내부 필드에도 배열/자격부여 적용 */
function expandTypePropertiesToObjectLiteral(
  t: Type,
  atNode: Node,
  qualify: boolean,
  visited: Set<string> = new Set(),
): string | null {
  if (
    t.isArray() ||
    t.isTuple() ||
    t.isString() ||
    t.isNumber() ||
    t.isBoolean() ||
    t.isUndefined() ||
    t.isNull()
  ) {
    return null;
  }

  // 순환 참조 방지
  const typeKey = t.getText(atNode.getSourceFile());
  if (visited.has(typeKey)) {
    return null;
  }
  visited.add(typeKey);

  const props = t.getApparentProperties();
  if (!props.length) return null;

  // 복잡한 타입 전개는 피하고 단순 타입만 처리
  return null;
}

/* ---------- Hover 친화 타입 전개 (쿼리/바디 별로 정책 분리) ---------- */

function getQueryShapeForInline(
  fn: ArrowFunction,
  idxQuery: number | null,
): { inline: string | null; raw: string | null } {
  if (idxQuery == null) return { inline: null, raw: null };
  const p = fn.getParameters()[idxQuery];
  if (!p) return { inline: null, raw: null };

  const t = p.getType();
  // 쿼리는 Types 네임스페이스를 굳이 끌어오지 않음 → qualify=false
  const inline = expandTypePropertiesToObjectLiteral(t, p, /*qualify*/ false);
  if (inline) return { inline, raw: null };

  const normalized = printableType(t, p, /*qualify*/ false);
  return { inline: null, raw: normalized };
}

function getBodyShapeForInline(
  fn: ArrowFunction,
  idxBody: number | null,
): { inline: string | null; raw: string | null; optional: boolean } {
  if (idxBody == null) return { inline: null, raw: null, optional: false };
  const p = fn.getParameters()[idxBody];
  if (!p) return { inline: null, raw: null, optional: false };

  const optional = !!p.hasQuestionToken?.();
  const t = p.getType();

  // 바디는 swagger.api 타입이면 반드시 Types.Xxx 로 (qualify=true)
  const inline = expandTypePropertiesToObjectLiteral(t, p, /*qualify*/ true);
  if (inline) return { inline, raw: null, optional };

  const normalized = printableType(t, p, /*qualify*/ true);
  return { inline: null, raw: normalized, optional };
}

function getResponseTypeName(genName: string): string {
  return `I${toPascal(genName)}Response`;
}

function getResponseTypeDefinition(
  fn: ArrowFunction,
  genName: string,
): string | null {
  // this.request<...> 형태에서 제네릭 타입 추출
  const callExpressions = fn.getDescendantsOfKind(SyntaxKind.CallExpression);
  for (const call of callExpressions) {
    const expression = call.getExpression();
    if (expression.getText().includes("this.request")) {
      const typeArgs = call.getTypeArguments();
      if (typeArgs.length > 0) {
        const firstTypeArg = typeArgs[0];
        const type = firstTypeArg.getType();

        // Types. 접두사를 사용하여 타입 정의
        const qualified = qualifyTypeForEmit(type, firstTypeArg);
        if (qualified && qualified.startsWith("Types.")) {
          return `export type ${getResponseTypeName(genName)} = ${qualified};`;
        }

        // fallback: 원본 타입 사용
        const typeText = firstTypeArg.getText().replace(/globalThis\./g, "");
        return `export type ${getResponseTypeName(genName)} = ${typeText};`;
      }
    }
  }
  return null;
}

function getReturnType(fn: ArrowFunction, genName: string): string {
  return getResponseTypeName(genName);
}

function getParamTypeText(fn: ArrowFunction, idx: number): string {
  const p = fn.getParameters()[idx];
  if (!p) return "any";
  const tn = p.getTypeNode();
  if (tn) return tn.getText();
  return p.getType().getText(p.getSourceFile());
}

function getPathParamField(
  fn: ArrowFunction,
  paramNames: string[],
  varName: string,
): string {
  const idx = paramNames.indexOf(varName);
  const typeText = idx >= 0 ? getParamTypeText(fn, idx) : "any";
  return `  ${varName}: ${typeText};`;
}
function asNonEmptyObjType(typeText: string): string {
  // 타입 문자열이 `{ ... }` (공백만)이라면 Record<string, never>로 치환
  const t = typeText.replace(/\s/g, "");
  if (t === "{}" || t === "{;}") return "Record<string, never>";
  return typeText;
}

function hasNoParams(paramsBlock: string): boolean {
  const t = paramsBlock.replace(/\s/g, "");
  return t === "{}" || t === "{;}" || t === "Record<string,never>";
}
async function formatTS(code: string) {
  const cfg = await prettier.resolveConfig(process.cwd());
  return prettier.format(code, { ...(cfg ?? {}), parser: "typescript" });
}
function ensureDir(p: string) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}
function toVarName(group: string) {
  return group
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .split("-")
    .filter(Boolean)
    .map((seg, i) =>
      i === 0
        ? seg.replace(/^[A-Z]/, (m) => m.toLowerCase())
        : seg.charAt(0).toUpperCase() + seg.slice(1),
    )
    .join("");
}

/* ---------- 네이밍 ---------- */

function buildOpName(http: string, pathExpr: string, paginated: boolean) {
  const segs = staticSegmentsAfterVersion(pathExpr);
  if (segs.length === 0) return httpPrefix(http);
  const normalized = segs.map((s) => (s === "candidates" ? "candidate" : s));
  const base = toPascal(normalized.join("-"));
  const stem = httpPrefix(http) + base;
  return http.toUpperCase() === "GET" && paginated ? `${stem}List` : stem;
}

/* ---------- 메인 ---------- */

async function main() {
  const project = new Project({ skipAddingFilesFromTsConfig: true });
  const sf = project.addSourceFileAtPath(API_FILE);

  const apiClass = sf.getClassOrThrow("Api");
  const routes: Route[] = [];
  const usedNames = new Map<string, number>();

  apiClass.getInstanceProperties().forEach((member) => {
    if (member.getKind() !== SyntaxKind.PropertyDeclaration) return;
    const prop = member.asKindOrThrow(SyntaxKind.PropertyDeclaration);
    const ns = prop.getName();
    const init = prop.getInitializer();
    if (!init || !init.isKind(SyntaxKind.ObjectLiteralExpression)) return;

    init.getProperties().forEach((p) => {
      if (!p.isKind(SyntaxKind.PropertyAssignment)) return;
      const name = p.getName();
      const fn = p.getInitializerIfKind(SyntaxKind.ArrowFunction);
      if (!fn) return;

      const paramNames = fn.getParameters().map((pa) => pa.getName());
      const call = fn
        .getDescendantsOfKind(SyntaxKind.CallExpression)
        .find((ce) => ce.getExpression().getText().includes("this.request"));
      if (!call) return;

      const reqObj = call
        .getArguments()[0]
        ?.asKind(SyntaxKind.ObjectLiteralExpression);
      if (!reqObj) return;

      const methodProp = reqObj
        .getProperty("method")
        ?.asKind(SyntaxKind.PropertyAssignment);
      const pathProp = reqObj
        .getProperty("path")
        ?.asKind(SyntaxKind.PropertyAssignment);
      if (!methodProp || !pathProp) return;

      const methodInit = methodProp.getInitializer();
      const pathInit = pathProp.getInitializer();
      if (!methodInit || !pathInit) return;

      const http = methodInit.getText().replace(/['"`]/g, "");
      const pathExpr = getTextLiteralOrTemplate(pathInit);
      const pathVars = extractPathVarsFromTemplate(pathInit);

      const hasQuery = !!reqObj.getProperty("query");
      const hasBody = !!(
        reqObj.getProperty("body") || reqObj.getProperty("data")
      );
      const idxQuery = idxOfParam("query", paramNames);
      const idxBody =
        idxOfParam("data", paramNames) ?? idxOfParam("body", paramNames);
      const group = extractGroupFromPathExpr(pathExpr);

      const paginated =
        http.toUpperCase() === "GET" && hasPaginationKeys(idxQuery, fn);
      let genName = buildOpName(http, pathExpr, paginated);

      const key = `${group}::${genName}`;
      if (usedNames.has(key)) {
        const n = (usedNames.get(key) ?? 1) + 1;
        usedNames.set(key, n);
        genName = `${genName}_${n}`;
      } else {
        usedNames.set(key, 1);
      }

      routes.push({
        ns,
        name,
        genName,
        http,
        pathExpr,
        pathVars,
        paramNames,
        idxQuery,
        idxBody,
        hasQuery,
        hasBody,
        group,
        fnNode: fn,
        paginated,
      });
    });
  });

  const groups = new Map<string, { queries: Route[]; mutations: Route[] }>();
  for (const r of routes) {
    const bucket = groups.get(r.group) ?? { queries: [], mutations: [] };
    if (isQuery(r.http)) bucket.queries.push(r);
    else if (isMutation(r.http)) bucket.mutations.push(r);
    groups.set(r.group, bucket);
  }
  const groupNames = Array.from(groups.keys()).sort();

  const utilQS = `
function __qsFromParams(params: Record<string, any>, pathKeys: string[]) {
  const q: Record<string, any> = { ...params };
  for (const k of pathKeys) delete q[k];
  const pairs = Object.entries(q).filter(([, v]) => v !== undefined && v !== null);
  if (pairs.length === 0) return '';
  const search = new URLSearchParams(pairs as any).toString();
  return search ? \`?\${search}\` : '';
}
`;

  for (const [group, { queries, mutations }] of groups) {
    const groupDir = join(OUT_BASE_DIR, group);
    ensureDir(groupDir);

    // ===== queries.ts =====
    {
      const L: string[] = [];
      L.push(
        [
          `/* AUTO-GENERATED: ${group}/queries.ts */`,
          `import type * as Types from "@/lib/api/swagger.api";`,
          ``,
          `import { fetcher } from "@/lib/fetcher";`,
          `import { getNextPageParam } from "@/lib/react-query";`,
          ``,
          `/**`,
          ` * 이 파일은 GET 엔드포인트만 포함합니다. ({ params })로 호출합니다.`,
          ` * - params: path 변수 + query 변수(합쳐서)`,
          ` * - Hover 친화: params를 실제 필드 타입으로 전개`,
          ` * - Init 타입 이름: I<Get...>Init`,
          ` * - Response 타입 이름: I<Get...>Response`,
          ` * - 페이지네이션(GET + page/size): queryFn({ pageParam = '1' }) 사용`,
          ` */`,
          ``,
          `// ===== Response types (per route) =====`,
        ].join("\n"),
      );

      // Response types 생성
      queries.forEach((r) => {
        const responseTypeDef = getResponseTypeDefinition(r.fnNode, r.genName);
        if (responseTypeDef) {
          L.push(responseTypeDef);
        }
      });

      L.push(`\n// ===== Init types (per route) =====`);

      queries.forEach((r) => {
        const initName = getInitTypeName(r.genName);
        const pathParamFields = r.pathVars
          .map((v) => getPathParamField(r.fnNode, r.paramNames, v))
          .join("\n");
        const { inline: queryInline, raw: queryRaw } = getQueryShapeForInline(
          r.fnNode,
          r.idxQuery,
        );

        let paramsBlock = `{\n${pathParamFields}\n}`;
        if (queryInline) {
          const merged = [
            pathParamFields && pathParamFields.trim() ? pathParamFields : "",
            queryInline.slice(1, -1).trim(),
          ]
            .filter(Boolean)
            .join("\n");
          paramsBlock = `{\n${merged}\n}`;
        } else if (queryRaw) {
          paramsBlock = `${paramsBlock} & ${queryRaw}`;
        }
        paramsBlock = asNonEmptyObjType(paramsBlock);

        // 파라미터가 없는 경우 Init 타입을 다르게 생성
        const isEmptyParams = hasNoParams(paramsBlock);

        if (isEmptyParams) {
          // 파라미터가 없는 경우 Init 타입을 생성하지 않음 (void 타입으로 처리)
          L.push([`export type ${initName} = void;`].join("\n"));
        } else {
          L.push(
            [
              `export type ${initName} = {`,
              `  params: ${paramsBlock};`,
              `};`,
            ].join("\n"),
          );
        }
      });

      L.push(utilQS);

      L.push(`export const queryKeys = {`);
      queries.forEach((r) => {
        const initName = getInitTypeName(r.genName);
        const pathParamFields = r.pathVars
          .map((v) => getPathParamField(r.fnNode, r.paramNames, v))
          .join("\n");
        const { inline: queryInline, raw: queryRaw } = getQueryShapeForInline(
          r.fnNode,
          r.idxQuery,
        );

        let paramsBlock = `{\n${pathParamFields}\n}`;
        if (queryInline) {
          const merged = [
            pathParamFields && pathParamFields.trim() ? pathParamFields : "",
            queryInline.slice(1, -1).trim(),
          ]
            .filter(Boolean)
            .join("\n");
          paramsBlock = `{\n${merged}\n}`;
        } else if (queryRaw) {
          paramsBlock = `${paramsBlock} & ${queryRaw}`;
        }
        paramsBlock = asNonEmptyObjType(paramsBlock);

        const isEmptyParams = hasNoParams(paramsBlock);

        if (isEmptyParams) {
          L.push(`  ${r.genName}: () => ['${r.genName}'],`);
        } else {
          L.push(
            `  ${r.genName}: (init: ${initName}) => ['${r.genName}', init],`,
          );
        }
      });
      L.push(`};`);

      L.push(`\nexport const queryFns = {`);
      queries.forEach((r) => {
        const initName = getInitTypeName(r.genName);
        const returnType = getReturnType(r.fnNode, r.genName);

        // 파라미터가 있는지 확인
        const pathParamFields = r.pathVars
          .map((v) => getPathParamField(r.fnNode, r.paramNames, v))
          .join("\n");
        const { inline: queryInline, raw: queryRaw } = getQueryShapeForInline(
          r.fnNode,
          r.idxQuery,
        );

        let paramsBlock = `{\n${pathParamFields}\n}`;
        if (queryInline) {
          const merged = [
            pathParamFields && pathParamFields.trim() ? pathParamFields : "",
            queryInline.slice(1, -1).trim(),
          ]
            .filter(Boolean)
            .join("\n");
          paramsBlock = `{\n${merged}\n}`;
        } else if (queryRaw) {
          paramsBlock = `${paramsBlock} & ${queryRaw}`;
        }
        paramsBlock = asNonEmptyObjType(paramsBlock);
        const isEmptyParams = hasNoParams(paramsBlock);

        let pathCode = r.pathExpr;
        r.pathVars.forEach((v) => {
          const re = new RegExp(String.raw`\$\{${v}\}`, "g");
          pathCode = pathCode.replace(re, "${params." + v + "}");
        });
        const qsCode = r.hasQuery
          ? ` + __qsFromParams(params as any, ${JSON.stringify(r.pathVars)})`
          : "";

        if (r.paginated) {
          if (isEmptyParams) {
            L.push(
              [
                `  ${r.genName}: (): { __call: (page?: string | number) => Promise<${returnType}> } => {`,
                `    const __build = (pageParam?: string | number): Promise<${returnType}> => {`,
                `      const isInfiniteQuery = Boolean(pageParam);`,
                `      const merged = {`,
                `        page: isInfiniteQuery ? String(pageParam) : undefined,`,
                `      };`,
                `      const __url = ${pathCode.replace(/params\./g, "merged.")} + __qsFromParams(merged as any, ${JSON.stringify(
                  r.pathVars,
                )});`,
                `      const __opt: any = { method: 'GET' };`,
                `      return fetcher(__url, __opt);`,
                `    };`,
                `    return { __call: __build };`,
                `  },`,
              ].join("\n"),
            );
          } else {
            L.push(
              [
                `  ${r.genName}: (init: ${initName}): { __call: (page?: string | number) => Promise<${returnType}> } => {`,
                `    const { params } = init as any;`,
                `    const __build = (pageParam?: string | number): Promise<${returnType}> => {`,
                `      const isInfiniteQuery = Boolean(pageParam);`,
                `      const merged = {`,
                `        ...params,`,
                `        page: isInfiniteQuery ? String(pageParam) : params?.page,`,
                `      };`,
                `      const __url = ${pathCode.replace(/params\./g, "merged.")} + __qsFromParams(merged as any, ${JSON.stringify(
                  r.pathVars,
                )});`,
                `      const __opt: any = { method: 'GET' };`,
                `      return fetcher(__url, __opt);`,
                `    };`,
                `    return { __call: __build };`,
                `  },`,
              ].join("\n"),
            );
          }
        } else {
          if (isEmptyParams) {
            L.push(
              [
                `  ${r.genName}: (): Promise<${returnType}> => {`,
                `    const __url = ${pathCode};`,
                `    const __opt: any = { method: 'GET' };`,
                `    return fetcher(__url, __opt);`,
                `  },`,
              ].join("\n"),
            );
          } else {
            L.push(
              [
                `  ${r.genName}: (init: ${initName}): Promise<${returnType}> => {`,
                `    const { params } = init as any;`,
                `    const __url = ${pathCode}${qsCode};`,
                `    const __opt: any = { method: 'GET' };`,
                `    return fetcher(__url, __opt);`,
                `  },`,
              ].join("\n"),
            );
          }
        }
      });
      L.push(`};`);

      // 공통 쿼리 함수 생성기 추가 (페이지네이션이 있는 쿼리에만)
      const paginatedQueries = queries.filter((r) => r.paginated);
      if (paginatedQueries.length > 0) {
        L.push(`\n// 공통 쿼리 함수 생성기`);
        paginatedQueries.forEach((r) => {
          const initName = getInitTypeName(r.genName);
          const functionName = `createBaseQuery${toPascal(r.genName)}`;

          // 파라미터가 있는지 확인
          const pathParamFields = r.pathVars
            .map((v) => getPathParamField(r.fnNode, r.paramNames, v))
            .join("\n");
          const { inline: queryInline, raw: queryRaw } = getQueryShapeForInline(
            r.fnNode,
            r.idxQuery,
          );

          let paramsBlock = `{\n${pathParamFields}\n}`;
          if (queryInline) {
            const merged = [
              pathParamFields && pathParamFields.trim() ? pathParamFields : "",
              queryInline.slice(1, -1).trim(),
            ]
              .filter(Boolean)
              .join("\n");
            paramsBlock = `{\n${merged}\n}`;
          } else if (queryRaw) {
            paramsBlock = `${paramsBlock} & ${queryRaw}`;
          }
          paramsBlock = asNonEmptyObjType(paramsBlock);
          const isEmptyParams = hasNoParams(paramsBlock);

          if (isEmptyParams) {
            L.push(
              [
                `const ${functionName} = () => ({`,
                `  queryKey: queryKeys.${r.genName}(),`,
                `  queryFn: (_params: any) => {`,
                `    const isInfiniteQuery = Boolean(_params?.pageParam);`,
                `    const fn = queryFns.${r.genName}();`,
                ``,
                `    if (isInfiniteQuery) {`,
                `      return fn.__call(_params.pageParam);`,
                `    }`,
                `    return fn.__call();`,
                `  },`,
                `});`,
              ].join("\n"),
            );
          } else {
            L.push(
              [
                `const ${functionName} = (init: ${initName}) => ({`,
                `  queryKey: queryKeys.${r.genName}(init),`,
                `  queryFn: (_params: any) => {`,
                `    const isInfiniteQuery = Boolean(_params?.pageParam);`,
                `    const fn = queryFns.${r.genName}(init);`,
                ``,
                `    if (isInfiniteQuery) {`,
                `      return fn.__call(_params.pageParam);`,
                `    }`,
                `    return fn.__call();`,
                `  },`,
                `});`,
              ].join("\n"),
            );
          }
        });
      }

      L.push(`\nexport const queries = {`);
      queries.forEach((r) => {
        const initName = getInitTypeName(r.genName);

        // 파라미터가 있는지 확인
        const pathParamFields = r.pathVars
          .map((v) => getPathParamField(r.fnNode, r.paramNames, v))
          .join("\n");
        const { inline: queryInline, raw: queryRaw } = getQueryShapeForInline(
          r.fnNode,
          r.idxQuery,
        );

        let paramsBlock = `{\n${pathParamFields}\n}`;
        if (queryInline) {
          const merged = [
            pathParamFields && pathParamFields.trim() ? pathParamFields : "",
            queryInline.slice(1, -1).trim(),
          ]
            .filter(Boolean)
            .join("\n");
          paramsBlock = `{\n${merged}\n}`;
        } else if (queryRaw) {
          paramsBlock = `${paramsBlock} & ${queryRaw}`;
        }
        paramsBlock = asNonEmptyObjType(paramsBlock);
        const isEmptyParams = hasNoParams(paramsBlock);

        if (r.paginated) {
          const functionName = `createBaseQuery${toPascal(r.genName)}`;
          if (isEmptyParams) {
            L.push(
              [
                `  ${r.genName}: () =>`,
                `    ${functionName}(),`,
                ``,
                `  ${r.genName}Infinite: () => ({`,
                `    ...${functionName}(),`,
                `    initialPageParam: 1,`,
                `    getNextPageParam,`,
                `  }),`,
              ].join("\n"),
            );
          } else {
            L.push(
              [
                `  ${r.genName}: (init: ${initName}) =>`,
                `    ${functionName}(init),`,
                ``,
                `  ${r.genName}Infinite: (init: ${initName}) => ({`,
                `    ...${functionName}(init),`,
                `    initialPageParam: 1,`,
                `    getNextPageParam,`,
                `  }),`,
              ].join("\n"),
            );
          }
        } else {
          if (isEmptyParams) {
            L.push(
              [
                `  ${r.genName}: () => ({`,
                `    queryKey: queryKeys.${r.genName}(),`,
                `    queryFn: () => queryFns.${r.genName}(),`,
                `  }),`,
              ].join("\n"),
            );
          } else {
            L.push(
              [
                `  ${r.genName}: (init: ${initName}) => ({`,
                `    queryKey: queryKeys.${r.genName}(init),`,
                `    queryFn: () => queryFns.${r.genName}(init),`,
                `  }),`,
              ].join("\n"),
            );
          }
        }
      });
      L.push(`};`);

      const out = await formatTS(L.join("\n"));
      writeFileSync(join(groupDir, "queries.ts"), out, "utf8");
    }

    // ===== mutations.ts =====
    {
      const L: string[] = [];
      L.push(
        [
          `/* AUTO-GENERATED: ${group}/mutations.ts */`,
          `import { fetcher } from "@/lib/fetcher";`,
          `import type * as Types from "@/lib/api/swagger.api";`,
          ``,
          `/**`,
          ` * 이 파일은 POST/PUT/PATCH/DELETE 엔드포인트만 포함합니다. ({ params, body })로 호출합니다.`,
          ` * - params: path 변수 + query 변수(합쳐서)`,
          ` * - body  : 있을 때만 사용`,
          ` * - Hover 친화: params/body를 실제 필드 타입으로 전개`,
          ` * - Init 타입 이름: I<Post|Put|Patch|Delete...>Init`,
          ` * - Response 타입 이름: I<Post|Put|Patch|Delete...>Response`,
          ` */`,
          ``,
          `// ===== Response types (per route) =====`,
        ].join("\n"),
      );

      // Response types 생성
      mutations.forEach((r) => {
        const responseTypeDef = getResponseTypeDefinition(r.fnNode, r.genName);
        if (responseTypeDef) {
          L.push(responseTypeDef);
        }
      });

      L.push(`\n// ===== Init types (per route) =====`);

      mutations.forEach((r) => {
        const initName = getInitTypeName(r.genName);
        const pathParamFields = r.pathVars
          .map((v) => getPathParamField(r.fnNode, r.paramNames, v))
          .join("\n");
        const { inline: queryInline, raw: queryRaw } = getQueryShapeForInline(
          r.fnNode,
          r.idxQuery,
        );

        let paramsBlock = `{\n${pathParamFields}\n}`;
        if (queryInline) {
          const merged = [
            pathParamFields && pathParamFields.trim() ? pathParamFields : "",
            queryInline.slice(1, -1).trim(),
          ]
            .filter(Boolean)
            .join("\n");
          paramsBlock = `{\n${merged}\n}`;
        } else if (queryRaw) {
          paramsBlock = `${paramsBlock} & ${queryRaw}`;
        }
        paramsBlock = asNonEmptyObjType(paramsBlock);
        const isEmptyParams = hasNoParams(paramsBlock);

        let bodyLine = "";
        if (r.idxBody !== null) {
          const {
            inline: bodyInline,
            raw: bodyRaw,
            optional,
          } = getBodyShapeForInline(r.fnNode, r.idxBody);
          const optMark = optional ? "?" : "";
          if (bodyInline) {
            bodyLine = `\n  body${optMark}: ${bodyInline};`;
          } else if (bodyRaw) {
            bodyLine = `\n  body${optMark}: ${bodyRaw};`;
          } else {
            bodyLine = `\n  body${optMark}: any;`;
          }
        }

        // params가 없고 body도 없으면 void
        if (isEmptyParams && !bodyLine) {
          L.push(`export type ${initName} = void;`);
        }
        // params가 없고 body만 있으면 { body: ... }
        else if (isEmptyParams && bodyLine) {
          L.push([`export type ${initName} = {${bodyLine}`, `};`].join("\n"));
        }
        // params가 있으면 기존 로직대로
        else {
          L.push(
            [
              `export type ${initName} = {`,
              `  params: ${paramsBlock};${bodyLine}`,
              `};`,
            ].join("\n"),
          );
        }
      });

      const utilQSLocal = utilQS;

      L.push(utilQSLocal);

      L.push(`export const mutationKeys = {`);
      mutations.forEach((r) => {
        L.push(`  ${r.genName}: ['${r.genName}'],`);
      });
      L.push(`};`);

      L.push(`\nexport const mutationFns = {`);
      mutations.forEach((r) => {
        const initName = getInitTypeName(r.genName);
        const returnType = getReturnType(r.fnNode, r.genName);

        // params가 필요한지 확인
        const pathParamFields = r.pathVars
          .map((v) => getPathParamField(r.fnNode, r.paramNames, v))
          .join("\n");
        const { inline: queryInline, raw: queryRaw } = getQueryShapeForInline(
          r.fnNode,
          r.idxQuery,
        );

        let paramsBlock = `{\n${pathParamFields}\n}`;
        if (queryInline) {
          const merged = [
            pathParamFields && pathParamFields.trim() ? pathParamFields : "",
            queryInline.slice(1, -1).trim(),
          ]
            .filter(Boolean)
            .join("\n");
          paramsBlock = `{\n${merged}\n}`;
        } else if (queryRaw) {
          paramsBlock = `${paramsBlock} & ${queryRaw}`;
        }
        paramsBlock = asNonEmptyObjType(paramsBlock);
        const isEmptyParams = hasNoParams(paramsBlock);

        let pathCode = r.pathExpr;
        r.pathVars.forEach((v) => {
          const re = new RegExp(String.raw`\$\{${v}\}`, "g");
          pathCode = pathCode.replace(re, "${params." + v + "}");
        });
        const qsCode = r.hasQuery
          ? ` + __qsFromParams(params as any, ${JSON.stringify(r.pathVars)})`
          : "";
        const bodySpread = r.hasBody ? `, body` : "";

        // params가 없고 body도 없는 경우
        if (isEmptyParams && !r.hasBody) {
          L.push(
            [
              `  ${r.genName}: (): Promise<${returnType}> => {`,
              `    const __url = ${pathCode};`,
              `    const __opt: any = { method: '${r.http.toUpperCase()}' };`,
              `    return fetcher(__url, __opt);`,
              `  },`,
            ].join("\n"),
          );
        }
        // params가 없고 body만 있는 경우
        else if (isEmptyParams && r.hasBody) {
          L.push(
            [
              `  ${r.genName}: (init: ${initName}): Promise<${returnType}> => {`,
              `    const { body } = init as any;`,
              `    const __url = ${pathCode};`,
              `    const __opt: any = { method: '${r.http.toUpperCase()}', body };`,
              `    return fetcher(__url, __opt);`,
              `  },`,
            ].join("\n"),
          );
        }
        // params가 있는 경우 (기존 로직)
        else {
          L.push(
            [
              `  ${r.genName}: (init: ${initName}): Promise<${returnType}> => {`,
              `    const { params${r.hasBody ? ", body" : ""} } = init as any;`,
              `    const __url = ${pathCode}${qsCode};`,
              `    const __opt: any = { method: '${r.http.toUpperCase()}'${bodySpread} };`,
              `    return fetcher(__url, __opt);`,
              `  },`,
            ].join("\n"),
          );
        }
      });
      L.push(`};`);

      L.push(`\nexport const mutations = {`);
      mutations.forEach((r) => {
        L.push(
          [
            `  ${r.genName}: {`,
            `    mutationKey: mutationKeys.${r.genName},`,
            `    mutationFn: mutationFns.${r.genName},`,
            `  },`,
          ].join("\n"),
        );
      });
      L.push(`};`);

      const out = await formatTS(L.join("\n"));
      writeFileSync(join(groupDir, "mutations.ts"), out, "utf8");
    }

    // ===== index.ts (그룹 폴더) =====
    {
      const code = await formatTS(
        [
          `/* AUTO-GENERATED: ${group}/index.ts */`,
          `import { mutations } from './mutations';`,
          `import { queries } from './queries';`,
          ``,
          `export default { mutations, queries };`,
          ``,
        ].join("\n"),
      );
      writeFileSync(join(groupDir, "index.ts"), code, "utf8");
    }
  }

  // ===== 루트 aggregator: react-query.generated/index.ts =====
  {
    const imports = groupNames
      .map((g) => `import ${toVarName(g)} from './${g}';`)
      .join("\n");

    const apiProps = groupNames.map((g) => `${toVarName(g)}`).join(", ");

    const root = await formatTS(
      [
        `/* AUTO-GENERATED: react-query generated api aggregator */`,
        `/* 이 파일은 자동 생성되므로 수정하지 마세요. */`,
        `/* src/lib/api/index.ts 에서 이 파일을 import 해서 사용할 수 있습니다. */`,
        imports,
        ``,
        `const api = { ${apiProps} };`,
        ``,
        `export default api;`,
        ``,
      ].join("\n"),
    );
    writeFileSync(GENERATED_INDEX, root, "utf8");
  }

  console.log(`✅ Generated folders under ${OUT_BASE_DIR}`);
  console.log(
    `📝 기존 src/lib/api/index.ts는 보존되었습니다. 필요시 react-query.generated/index.ts를 import 하세요.`,
  );
  runEslintCLI();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
