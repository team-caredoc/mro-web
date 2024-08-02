"use client";

import { useNextRouter } from "@/hooks/useNextRouter";

export default function Home() {
  const router = useNextRouter();
  console.log(router.query);
  console.log(router.pathname);
  return (
    <div
      onClick={() =>
        router.replace({ query: { asd: "asd" } }, { scroll: true })
      }
    >
      asadsa
    </div>
  );
}
