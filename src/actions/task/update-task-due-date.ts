"use server";

import { logActivity } from "@/lib/activity";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskDueDate(
  taskId: string,
  dueDate: Date | null,
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
      dueDate,
    },
  });
  await logActivity({
    action: dueDate ? "Updated due date" : "Removed due date",
    entityType: "task",
    entityTitle: task.title,
    userId: session!.user!.id,
    projectId: task.projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
}
