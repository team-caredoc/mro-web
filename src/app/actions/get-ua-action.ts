// app/actions/getDeviceAction.ts
"use server";

import { getUA } from "@/libs/get-ua";

export async function getUAAction() {
  const device = await getUA();

  return device;
}
