import { promises as fs } from "fs";
import path from "path";

export const SITE_URL = "https://www.caredoc.kr";

const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, "src/app");
let sitemaps: string[] = [];

/** 안전한 URL 조인: 중복 슬래시 제거(프로토콜의 // 제외) */
function joinUrl(...parts: Array<string | undefined | null>): string {
  const cleaned = parts
    .filter((p): p is string => !!p && p.length > 0)
    .map((p) => p.replace(/^\/+|\/+$/g, "")); // 앞/뒤 슬래시 제거

  if (cleaned.length === 0) return "";

  let url = cleaned.join("/");
  url = url.replace(/^(https?:)\/+/, "$1//"); // 프로토콜 보존

  return url;
}

/****
 * @ref https://github.com/vercel/next.js/pull/61391#issuecomment-1988643966
 * sitemapindex 기능이 없어 직접 구현해야함
 */
async function main() {
  try {
    const sitemaps = await findSitemapFolders(APP_DIR);
    const SITEMAP_INDEX_PATH = path.join(ROOT_DIR, "public", "sitemap.xml");

    const createSitemap = (url: string) => /* XML */ `  <sitemap>
    <loc>${url}</loc>
  </sitemap>`;

    const createSitemapIndex = (
      urls: string[],
    ) => /* XML */ `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(createSitemap).join("\n")}
</sitemapindex>`;

    // 중복 제거 및 정렬
    const uniqueSorted = Array.from(new Set(sitemaps)).sort();
    const xml = createSitemapIndex(uniqueSorted);
    await fs.mkdir(path.dirname(SITEMAP_INDEX_PATH), { recursive: true });
    await fs.writeFile(SITEMAP_INDEX_PATH, xml.trim() + "\n");

    console.log(
      `✅ Sitemap index generated with ${uniqueSorted.length} entries.`,
    );
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
}

/**
 * 🔎 sitemap.xml 폴더명을 찾아서 해당 경로 기준으로 sitemap URL을 생성
 *    - dynamic-sitemap-example/sitemap.xml/sitemap.xml 처럼 중복되지 않게
 *    - 항상 https://www.caredoc.kr 도메인으로 시작
 */
async function findSitemapFolders(dir: string): Promise<string[]> {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        if (!file.name.startsWith("_")) {
          // 폴더명이 sitemap.xml 인 경우
          if (file.name === "sitemap.xml.gz") {
            const relativePathArr = path
              .relative(APP_DIR, fullPath)
              .split(path.sep)
              .filter((segment) => !/^[([@]/.test(segment)); // Next.js 특수폴더 제외

            // 이미 마지막이 sitemap.xml이면 중복 방지
            let urlPath = relativePathArr.join("/");
            if (!urlPath.endsWith("sitemap.xml.gz")) {
              urlPath = urlPath + "/sitemap.xml.gz";
            } else {
              // 이미 sitemap.xml로 끝나면 그대로
            }

            // 항상 도메인 붙이기
            const url = joinUrl(SITE_URL, urlPath);
            sitemaps.push(url);
          } else {
            // 재귀적으로 하위 폴더 탐색
            const nestedSitemaps = await findSitemapFolders(fullPath);
            sitemaps = sitemaps.concat(nestedSitemaps);
          }
        }
      }
    }
  } catch (error) {
    console.error("❌ Error finding sitemap folders:", error);
  }
  return sitemaps;
}

main();
