"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { TaskStatus } from "@prisma/client";
import { logActivity } from "@/lib/activity";
import { formatStatus } from "@/lib/formatter";
import { notify } from "@/lib/notify";
import { requireAuth, verifyTaskAccess } from "@/lib/auth-guard";

export async function updateTaskStatusAction(
  taskId: string,
  status: TaskStatus,
  projectId: string,
) {
  const user = await requireAuth();

  await verifyTaskAccess(taskId, user.id);

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
    },
  });

  if (task.assigneeId && task.assigneeId !== user.id) {
    await notify({
      userId: task.assigneeId,
      title: `Task "${task.title}" was moved to ${formatStatus(status)}`,
      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }

  await logActivity({
    action: `Changed status to ${formatStatus(status)}`,
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

