// app/providers/PlatformProviderClient.tsx
"use client";

import React, { useEffect } from "react";

import { getUAAction } from "@/app/actions/get-ua-action";
import { DeviceInfo } from "@/lib/get-ua";

const UAContext = React.createContext<DeviceInfo>({
  platform: "desktop",
  os: "unknown",
});

/** @example
 *  const device = useUA() // {"platform": "desktop", "os": "macos"}
 * * */
export function UAProviderClient({
  children,
  initialDevice,
  recheckOnMount = false, // 필요 시 마운트 때 다시 감지
}: {
  children: React.ReactNode;
  initialDevice: DeviceInfo;
  recheckOnMount?: boolean;
}) {
  const [ua, setUa] = React.useState<DeviceInfo>(initialDevice);

  useEffect(() => {
    if (!recheckOnMount) return;

    (async () => {
      const d = await getUAAction();
      if (JSON.stringify(d) !== JSON.stringify(ua)) setUa(d);
    })();
  }, [recheckOnMount]);

  return <UAContext.Provider value={ua}>{children}</UAContext.Provider>;
}

export function useUA() {
  return React.useContext(UAContext);
}
