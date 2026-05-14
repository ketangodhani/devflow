"use server";

import { auth } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

export async function searchEverything(
  query: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      projects: [],
      tasks: [],
    };
  }

  if (!query) {
    return {
      projects: [],
      tasks: [],
    };
  }

  const projects =
    await prisma.project.findMany({
      where: {
        userId: session.user.id,

        title: {
          contains: query,
          mode: "insensitive",
        },
      },

      take: 5,
    });

  const tasks = await prisma.task.findMany({
    where: {
      project: {
        userId: session.user.id,
      },

      title: {
        contains: query,
        mode: "insensitive",
      },
    },

    include: {
      project: true,
    },

    take: 5,
  });

  return {
    projects,
    tasks,
  };
}