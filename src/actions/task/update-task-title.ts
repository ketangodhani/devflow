"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";
import { requireAuth, verifyTaskAccess } from "@/lib/auth-guard";

export async function updateTaskTitle(
  taskId: string,
  title: string,
  projectId: string,
) {
  const user = await requireAuth();

  if (!title.trim()) return;

  await verifyTaskAccess(taskId, user.id);

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title: title.trim(),
    },
  });

  await logActivity({
    action: "Updated title",
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

