import { cookies } from "next/headers";

import {
  BreakpointProviderClient,
  BreakpointValue,
} from "@/hooks/breakpoint/BreakpointProviderClient";

const BreakpointProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  return (
    <BreakpointProviderClient
      value={cookieStore.get("breakpoint")?.value as BreakpointValue}
    >
      {children}
    </BreakpointProviderClient>
  );
};

export default BreakpointProvider;
