"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskTitle(
  taskId: string,
  title: string,
  projectId: string
) {
  if (!title.trim()) return;

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title,
    },
  });

  revalidatePath(
    `/projects/${projectId}/tasks/${taskId}`
  );
}