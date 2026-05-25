"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { TaskStatus } from "@prisma/client";
import { logActivity } from "@/lib/activity";
import { auth } from "@/lib/auth";
import { formatStatus } from "@/lib/formatter";
import { notify } from "@/lib/notify";

export async function updateTaskStatusAction(
  taskId: string,
  status: TaskStatus,
  projectId: string,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
    },
  });

  if (task.assigneeId) {
    await notify({
      userId: task.assigneeId,

      title: `Task moved to ${status}`,

      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }

  await logActivity({
    action: `Changed status to ${formatStatus(status)}`,
    entityType: "task",
    entityTitle: task.title,
    userId: session!.user!.id,
    projectId: task.projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
}
