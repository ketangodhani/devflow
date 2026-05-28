"use server";

import { cookies } from "next/headers";

export async function clearWorkspaceCookie() {
  (await cookies()).delete("workspaceId");

}