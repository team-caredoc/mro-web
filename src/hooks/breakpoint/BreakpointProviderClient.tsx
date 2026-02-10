"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

import useMounted from "@/hooks/use-mounted";

export type BreakpointValue = "desktop" | "mobile" | "";

export const BreakpointContext = createContext<BreakpointValue>("");
export const useBreakpointContext = () => useContext(BreakpointContext);
export function BreakpointProviderClient({
  value,
  children,
}: {
  children: React.ReactNode;
  value: BreakpointValue;
}) {
  const [breakpoint, setBreakpoint] = useState<BreakpointValue>(value);
  const mounted = useMounted();
  useEffect(() => {
    if (!mounted) return;
    const mql = window.matchMedia("(max-width: 1199px)");

    const updateBreakpoint = () => {
      const newValue = mql.matches ? "mobile" : "desktop";
      setBreakpoint(newValue);
      Cookies.set("breakpoint", newValue, { expires: 60 * 60 * 24 * 365 });
    };
    const newValue = mql.matches ? "mobile" : "desktop";

    if (newValue !== value) {
      updateBreakpoint();
    }
    // 리사이즈 이벤트 리스너 등록
    mql.addEventListener("change", updateBreakpoint);

    // cleanup 함수는 컴포넌트에서 처리
    return () => {
      mql.removeEventListener("change", updateBreakpoint);
    };
  }, [mounted]);
  return (
    <BreakpointContext.Provider value={breakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
}
