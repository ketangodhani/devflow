"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskAssignee(
  taskId: string,
  assigneeId: string | null,
  projectId: string
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      assigneeId,
    },
  });

  revalidatePath(
    `/projects/${projectId}/tasks/${taskId}`
  );
}