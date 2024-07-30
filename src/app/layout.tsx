import { metadata, Pretendard, viewport } from "./_functions";

import "./globals.css";
import { Providers } from "@/providers";

export { viewport };
export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={Pretendard.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
