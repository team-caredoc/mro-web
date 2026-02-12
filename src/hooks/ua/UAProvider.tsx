import { ReactNode } from "react";

import { UAProviderClient } from "@/hooks/ua/UAProviderClient";

import { getUA } from "@/lib/get-ua";

/** @example
 * // Server Component
 * const ServerComponent = async () => {
 *  const ua = await getUA(); // {"platform": "desktop","os": "macos"}
 *  return <div>{ua.os}</div>
 * }
 * // Client Component
 * const ClientComponent = () => {
 *  const ua = useUA(); // {"platform": "desktop","os": "macos"}
 *  return <div>{ua.os}</div>
 * }
 * * */
export default async function UAProvider({
  children,
}: {
  children: ReactNode;
}) {
  const ua = await getUA();

  return <UAProviderClient initialDevice={ua}>{children}</UAProviderClient>;
}
