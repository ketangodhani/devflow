"use server";

import { logActivity } from "@/lib/activity";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth, verifyTaskAccess } from "@/lib/auth-guard";

export async function updateTaskDueDate(
  taskId: string,
  dueDate: Date | null,
  projectId: string,
) {
  const user = await requireAuth();

  await verifyTaskAccess(taskId, user.id);

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      dueDate,
    },
  });

  await logActivity({
    action: dueDate ? "Updated due date" : "Removed due date",
    entityType: "task",
    entityTitle: task.title,
    userId: user.id,
    projectId: task.projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
  revalidatePath(`/projects/${projectId}`);
  return task;
}

