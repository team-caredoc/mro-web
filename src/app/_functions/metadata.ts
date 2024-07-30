import { Metadata } from "next";

// TODO Metadata
const APP_NAME = "케어닥 커뮤니티";
const APP_DEFAULT_TITLE = "커뮤니티";
const APP_TITLE_TEMPLATE = "%s - 케어닥 커뮤니티";
const APP_DESCRIPTION =
  "우리 부모님 질환 궁금증부터 케어 고민까지! 여기저기 찾지 말고 케어닥 커뮤니티에서 해결하세요!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  metadataBase: new URL(`https://${process.env.NEXT_PUBLIC_DOMAIN}`),
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    url: new URL(`https://${process.env.NEXT_PUBLIC_DOMAIN}`),
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    images: "/og-img.png",
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    images: "/og-img.png",
    description: APP_DESCRIPTION,
  },
};
