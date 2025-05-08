/* eslint-disable unused-imports/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return NextResponse.json({ message: "Server is running" }, { status: 200 });
};
