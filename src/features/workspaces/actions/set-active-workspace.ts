"use server";

import { cookies } from "next/headers";

export async function setActiveWorkspace(
  workspaceId: string
) {
  (await cookies()).set("workspaceId", workspaceId);
}