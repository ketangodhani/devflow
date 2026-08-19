"use server";

import { logActivity } from "@/lib/activity";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notify } from "@/lib/notify";
import { requireAuth, verifyTaskAccess } from "@/lib/auth-guard";

export async function updateTaskAssignee(
  taskId: string,
  assigneeId: string | null,
  projectId: string,
) {
  const user = await requireAuth();

  await verifyTaskAccess(taskId, user.id);

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      assigneeId,
    },
  });

  if (assigneeId && assigneeId !== user.id) {
    await notify({
      userId: assigneeId,
      title: `${user.name || "A teammate"} assigned you to task "${task.title}"`,
      link: `/projects/${projectId}/tasks/${taskId}`,
    });
  }

  await logActivity({
    action: assigneeId ? "Assigned task" : "Unassigned task",
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

