"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";
import { requireAuth, verifyTaskAccess } from "@/lib/auth-guard";

export async function deleteTask(
  taskId: string,
  projectId: string
) {
  const user = await requireAuth();

  const { task } = await verifyTaskAccess(taskId, user.id);

  await logActivity({
    action: "Deleted",
    entityType: "Task",
    entityTitle: task.title,
    userId: user.id,
    projectId: task.projectId,
  });

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath(`/projects`);
  revalidatePath(`/dashboard`);

  return {
    success: true,
  };
}