import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getActiveWorkspace() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }
  const workspaceId = (await cookies()).get("workspaceId")?.value;

  if (workspaceId) {
    const workspace = await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
    });

    if (workspace) {
      return workspace;
    }
  }

  // Fallback to first available workspace if cookie is missing or points to an inaccessible workspace
  const membership = await prisma.workspaceMember.findFirst({
    where: {
      userId: session.user.id,
    },
    include: {
      workspace: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return membership?.workspace || null;
}
