"use server";

import { logActivity } from "@/lib/activity";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth, verifyTaskAccess } from "@/lib/auth-guard";

export async function updateTaskDescription(
  taskId: string,
  description: string,
  projectId: string,
) {
  const user = await requireAuth();

  await verifyTaskAccess(taskId, user.id);

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      description: description.trim() || null,
    },
  });

  await logActivity({
    action: "Updated description",
    entityType: "task",
    entityTitle: task.title,
    userId: user.id,
    projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
  return task;
}

