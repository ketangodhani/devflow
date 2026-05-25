"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { formatPriority } from "@/lib/formatter";
import { TaskPriority } from "@prisma/client";
import { notify } from "@/lib/notify";

export async function updateTaskPriority(
  taskId: string,
  priority: TaskPriority,
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
      priority,
    },
  });
  if (task.assigneeId) {
    await notify({
      userId: task.assigneeId,

      title: `Priority changed to ${priority}`,

      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }
  await logActivity({
    action: `Changed priority to ${formatPriority(priority)}`,
    entityType: "task",
    entityTitle: task.title,
    userId: session!.user!.id,
    projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
}
