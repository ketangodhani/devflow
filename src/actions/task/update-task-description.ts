"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskDescription(
  taskId: string,
  description: string,
  projectId: string
) {
  if (!description.trim()) return;

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      description,
    },
  });

  revalidatePath(
    `/projects/${projectId}/tasks/${taskId}`
  );
}