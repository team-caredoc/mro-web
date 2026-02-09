"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useUA } from "@/hooks/ua/UAProviderClient";
import { useAuth } from "@/hooks/use-auth";

import { AUTH_REDIRECT_URI } from "@/constants/auth";

interface CaredocLoginProps {
  authUrl?: string;
  fallbackUrl?: string;
  redirectUri?: string;
  onSuccess?: () => void;
  asChild?: boolean;
  children?: ReactNode;
}
const isDev = process.env.NODE_ENV === "development";

export const useLogin = ({
  fallbackUrl: propFallbackUrl,
  authUrl = `${process.env.NEXT_PUBLIC_AUTH_URL}`,
  redirectUri: propsRedirectUri,
  onSuccess,
}: CaredocLoginProps = {}) => {
  const fallbackUrl =
    propFallbackUrl ||
    (typeof window !== "undefined" ? window.location.href : undefined);

  const router = useRouter();
  const ua = useUA();
  const { refetch } = useAuth();
  const onSubmit = async () => {
    const options =
      "width=600, height=1000,top=50, left=100, scrollbars=yes, status=no, menubar=no, toolbar=no, resizable=no";

    const url = `${authUrl}/member/login?fallbackUrl=${fallbackUrl}&redirect_uri=${propsRedirectUri || AUTH_REDIRECT_URI}`;
    if (ua.platform === "native") {
      window.location.href = url;
    } else {
      const urlWithPopup =
        url + (url.includes("?") ? "&" : "?") + "usePopup=true";
      window.open(urlWithPopup, "_blank", options);
    }
  };
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const listener = (event: MessageEvent) => {
      let parsedData;
      if (typeof event.data === "string") {
        try {
          parsedData = JSON.parse(event.data);
        } catch (e) {
          parsedData = event.data;
        }
      } else {
        parsedData = event.data;
      }
      if (parsedData.type === "caredoc-auth" && parsedData.status === 200) {
        refetch();
        onSuccess?.();
        if (typeof parsedData.fallbackUrl === "string") {
          try {
            const fallbackUrl = new URL(parsedData.fallbackUrl);
            router.replace(fallbackUrl.href);
          } catch (e) {
            console.error("Invalid fallbackUrl", parsedData.fallbackUrl, e);
          }
        }
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);
  return { onSubmit };
};
