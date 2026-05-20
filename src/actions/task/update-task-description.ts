"use server";

import { logActivity } from "@/lib/activity";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskDescription(
  taskId: string,
  description: string,
  projectId: string,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  if (!description.trim()) return;

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      description,
    },
  });
  await logActivity({
    action: "Updated description",
    entityType: "task",
    entityTitle: task.title,
    userId: session!.user!.id,
    projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
}
