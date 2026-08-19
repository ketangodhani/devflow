"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";
import { formatPriority } from "@/lib/formatter";
import { TaskPriority } from "@prisma/client";
import { notify } from "@/lib/notify";
import { requireAuth, verifyTaskAccess } from "@/lib/auth-guard";

export async function updateTaskPriority(
  taskId: string,
  priority: TaskPriority,
  projectId: string,
) {
  const user = await requireAuth();

  await verifyTaskAccess(taskId, user.id);

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      priority,
    },
  });

  if (task.assigneeId && task.assigneeId !== user.id) {
    await notify({
      userId: task.assigneeId,
      title: `Priority on "${task.title}" changed to ${formatPriority(priority)}`,
      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }

  await logActivity({
    action: `Changed priority to ${formatPriority(priority)}`,
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

