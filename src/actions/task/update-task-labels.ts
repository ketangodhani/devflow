"use server";

import { logActivity } from "@/lib/activity";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth, verifyTaskAccess } from "@/lib/auth-guard";

export async function updateTaskLabels(
  taskId: string,
  labels: string[],
  projectId: string,
) {
  const user = await requireAuth();

  await verifyTaskAccess(taskId, user.id);

  const task = await prisma.task.update({
    where: {
      id: taskId,
    }, 
    data: {
      labels,
    },
  });

  await logActivity({
    action: "Updated labels",
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

