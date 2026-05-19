"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { TaskPriority } from "@prisma/client";

export async function updateTaskPriority(
  taskId: string,
  priority: TaskPriority,
  projectId: string
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      priority,
    },
  });

  revalidatePath(
    `/projects/${projectId}/tasks/${taskId}`
  );
}