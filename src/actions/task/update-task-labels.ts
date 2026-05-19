"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskLabels(
  taskId: string,
  labels: string[],
  projectId: string
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      labels,
    },
  });

  revalidatePath(
    `/projects/${projectId}/tasks/${taskId}`
  );
}