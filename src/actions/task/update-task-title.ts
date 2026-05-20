"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";
import { auth } from "@/lib/auth";

export async function updateTaskTitle(
  taskId: string,
  title: string,
  projectId: string,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  if (!title.trim()) return;

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title,
    },
  });
  await logActivity({
    action: "Updated title",
    entityType: "task",
    entityTitle: task.title,
    userId: session!.user!.id,
    projectId: task.projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
}
