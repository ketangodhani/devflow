import {auth} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUserWorkspaces() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  const workspaces = await prisma.workspace.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return workspaces;
}