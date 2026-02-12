// app/actions/getDeviceAction.ts
"use server";

import { getUA } from "@/lib/get-ua";

export async function getUAAction() {
  const device = await getUA();

  return device;
}
