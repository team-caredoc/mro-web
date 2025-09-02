import { promises as fs } from "fs";
import path from "path";

export const SITE_URL = "";

const ROOT_DIR = process.cwd();
const APP_DIR = path.join(ROOT_DIR, "src/app");

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
    const sitemaps = await findSitemapFiles(APP_DIR);
    const SITEMAP_INDEX_PATH = path.join(ROOT_DIR, "public", "/sitemap.xml");

    const createSitemap = (url: string) => /* XML */ `  <sitemap>
    <loc>${url}</loc>
  </sitemap>`;

    const createSitemapIndex = (
      urls: string[],
    ) => /* XML */ `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(createSitemap).join("\n")}
</sitemapindex>`;

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
 * 🔎 Recursively finds 'sitemap.ts' files and extracts sitemap URLs.
 */
async function findSitemapFiles(dir: string): Promise<string[]> {
  let sitemaps: string[] = ["https://www.caredoc.kr/sitemap.xml"];
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        if (!file.name.startsWith("_")) {
          const nestedSitemaps = await findSitemapFiles(fullPath);
          sitemaps = sitemaps.concat(nestedSitemaps);
        }
      } else if (file.isFile() && file.name === "sitemap.ts") {
        const relativePath = path
          .relative(APP_DIR, dir)
          .split(path.sep)
          .filter((segment) => !/^[(\[@]/.test(segment)) // Next.js 특수폴더 제외
          .join("/");

        const sitemapFile = await import(fullPath);

        if (typeof sitemapFile.generateSitemaps === "function") {
          const result = await sitemapFile.generateSitemaps();
          result.forEach((item: { id: number }) => {
            sitemaps.push(
              joinUrl(SITE_URL, relativePath, "sitemap", `${item.id}.xml`),
            );
          });
        } else {
          sitemaps.push(joinUrl(SITE_URL, relativePath, "sitemap.xml"));
        }
      }
    }
  } catch (error) {
    console.error("❌ Error finding sitemaps:", error);
  }
  return sitemaps;
}

main();
