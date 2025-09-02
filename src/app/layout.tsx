import { metadata, Pretendard, viewport } from "./_functions";

import "./globals.css";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
