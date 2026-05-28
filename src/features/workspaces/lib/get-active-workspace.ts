import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getActiveWorkspace() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }
  const workspaceId = (await cookies()).get("workspaceId")?.value;

  if (!workspaceId) {
    return null;
  }

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId,
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
  });

  return workspace;
}
