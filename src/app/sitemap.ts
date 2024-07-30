import { MetadataRoute } from "next";

//TODO 여기 수정 const url = "https://케어닥.도메인";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (process.env.NEXT_PUBLIC_ENV === "DEVELOPMENT") {
    return [];
  }
  // Google's limit is 50,000 URLs per sitemap
  return [
    // {
    //   url,
    //   changeFrequency: "always",
    //   priority: 1,
    // },
    // {
    //   url: `${url}/auth`,
    //   changeFrequency: "always",
    //   priority: 1,
    // },
    // {
    //   url: `${url}/search`,
    //   changeFrequency: "always",
    //   priority: 1,
    // },
  ];
}
