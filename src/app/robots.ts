import { MetadataRoute } from "next";

// TODO ROBOTS
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_ENV === "DEVELOPMENT") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
