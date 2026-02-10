import { metadata, Pretendard, viewport } from "./_functions";

import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import BreakpointProvider from "@/hooks/breakpoint/BreakpointProvider";
import UAProvider from "@/hooks/ua/UAProvider";

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
        <UAProvider>
          <BreakpointProvider>
            <Providers>
              <NuqsAdapter>{children}</NuqsAdapter>
            </Providers>
          </BreakpointProvider>
        </UAProvider>
      </body>
    </html>
  );
}
