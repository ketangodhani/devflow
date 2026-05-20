"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskDueDate(
  taskId: string,
  dueDate: Date | null,
  projectId: string
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      dueDate,
    },
  });

  revalidatePath(
    `/projects/${projectId}/tasks/${taskId}`
  );
}