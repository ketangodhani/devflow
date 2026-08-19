"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getActiveWorkspace } from "@/features/workspaces/lib/get-active-workspace";

export async function searchEverything(
  query: string
) {
  const session = await auth();

  if (!session?.user?.id || !query.trim()) {
    return {
      projects: [],
      tasks: [],
    };
  }

  const workspace = await getActiveWorkspace();

  if (!workspace) {
    return {
      projects: [],
      tasks: [],
    };
  }

  const [projects, tasks] = await Promise.all([
    prisma.project.findMany({
      where: {
        workspaceId: workspace.id,
        title: {
          contains: query.trim(),
          mode: "insensitive",
        },
      },
      take: 5,
    }),
    prisma.task.findMany({
      where: {
        project: {
          workspaceId: workspace.id,
        },
        title: {
          contains: query.trim(),
          mode: "insensitive",
        },
      },
      include: {
        project: true,
      },
      take: 5,
    }),
  ]);

  return {
    projects,
    tasks,
  };
}