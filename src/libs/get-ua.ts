import { headers } from "next/headers";
import { cache } from "react";

type Platform = "native" | "mobile" | "desktop";
type OS = "ios" | "android" | "windows" | "macos" | "linux" | "unknown";

export interface DeviceInfo {
  platform: Platform;
  os: OS;
}

function detectOS(userAgent: string): OS {
  const ua = userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (/windows nt/.test(ua)) return "windows";
  if (/macintosh|mac os x/.test(ua)) return "macos";
  if (/linux/.test(ua)) return "linux";
  return "unknown";
}

export const getUA = cache(async (): Promise<DeviceInfo> => {
  const h = await headers();
  const userAgent = h.get("user-agent") || "";

  // Native 앱 감지 (예: Caredoc)
  if (userAgent.includes("Caredoc")) {
    // Caredoc이 iOS/Android 모두 있을 수 있으니 OS도 감지
    return {
      platform: "native",
      os: detectOS(userAgent),
    };
  }

  // 모바일 브라우저 감지
  if (
    /mobile|android|iphone|ipod|blackberry|iemobile|kindle|silk-accelerated|opera mini/i.test(
      userAgent,
    )
  ) {
    return {
      platform: "mobile",
      os: detectOS(userAgent),
    };
  }

  // 데스크탑
  return {
    platform: "desktop",
    os: detectOS(userAgent),
  };
});
export const isMobile = cache(async (): Promise<boolean> => {
  const ua = await getUA();
  return ua.platform === "mobile" || ua.platform === "native";
});
