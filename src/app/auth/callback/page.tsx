"use client";

import CaredocLoginCallback from "@team-caredoc/auth/callback";

const Page = () => {
  return (
    <CaredocLoginCallback
      onError={() => {}}
      onSuccess={() => {
        window.opener?.postMessage?.(
          JSON.stringify({ status: 200, type: "caredoc-auth" }),
          "*",
        );
        window.close();
      }}
    />
  );
};

export default Page;
