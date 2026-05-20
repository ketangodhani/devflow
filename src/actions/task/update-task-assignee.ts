"use server";

import { logActivity } from "@/lib/activity";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskAssignee(
  taskId: string,
  assigneeId: string | null,
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
      assigneeId,
    },
  });
  await logActivity({
    action: assigneeId ? "Assigned task" : "Unassigned task",
    entityType: "task",
    entityTitle: task.title,
    userId: session!.user!.id,
    projectId: task.projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
}
