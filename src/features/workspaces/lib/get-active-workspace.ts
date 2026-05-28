import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

export async function getActiveWorkspace() {
  const workspaceId = (await cookies()).get("workspaceId")?.value;

  if (!workspaceId) {
    return null;
  }

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  });

  return workspace;
}