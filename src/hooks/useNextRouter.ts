"use client";
import { UrlObject } from "url";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useMemo } from "react";

type Url = (
  url: Pick<UrlObject, "pathname" | "query"> | string,
  options?: {
    scroll?: boolean;
  },
) => void;
interface Router {
  push: Url;
  replace: Url;
  pathname: string;
  query: any;
}

export type UseNextRouter = Omit<
  ReturnType<typeof useRouter>,
  "push" | "replace"
> &
  Router;

export const useNextRouter = (): UseNextRouter => {
  const nextRouter = useRouter();
  const nextPathname = usePathname();
  const searchParams = useSearchParams();
  const router = useMemo(
    () =>
      new Proxy(nextRouter, {
        get(target: UseNextRouter, prop) {
          if (
            (prop === "push" || prop === "replace") &&
            typeof target[prop] === "function"
          ) {
            return (
              ...args: [
                Pick<UrlObject, "pathname" | "query"> | string,
                { scroll: boolean },
              ]
            ) => {
              const [url, options] = [...args];

              if (typeof url === "string") {
                return target[prop](...args);
              }
              const { pathname, query } = url;
              let path = pathname ?? "";
              if (query && !path) {
                if (nextPathname === "/") {
                  path = `?${qs.stringify(query)}`;
                } else {
                  path = `${nextPathname}?${qs.stringify(query)}`;
                }
              }

              if (query && pathname) {
                path = `${pathname}?${qs.stringify(query)}`;
              }
              target[prop](path, options);
            };
          }
          return (target as any)[prop] as unknown as UseNextRouter;
        },
      }),
    [nextRouter, nextPathname],
  );
  Reflect.set(router, "pathname", nextPathname);
  Reflect.set(router, "query", qs.parse(searchParams.toString()));

  return router as unknown as UseNextRouter;
};
