"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { TaskStatus } from "@prisma/client";

export async function updateTaskStatusAction(
  taskId: string,
  status: TaskStatus,
  projectId: string
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
    },
  });

  revalidatePath(
    `/projects/${projectId}/tasks/${taskId}`
  );
}