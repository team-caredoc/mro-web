import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        resourceQuery: /url/,
        test: /\.svg$/i, // *.svg?url
      },
      // convert all other *.svg imports to React components
      {
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [
            ...(fileLoaderRule.resourceQuery.not
              ? fileLoaderRule.resourceQuery.not
              : []),
            /url/,
          ],
        },
        test: /\.svg$/i, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
