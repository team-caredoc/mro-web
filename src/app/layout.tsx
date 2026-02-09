import { metadata, Pretendard, viewport } from "./_functions";

import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Providers } from "@/providers";

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={Pretendard.variable} lang="ko">
      <body>
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}
