"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { formatPriority } from "@/lib/formatter";
import { TaskPriority } from "@prisma/client";

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
