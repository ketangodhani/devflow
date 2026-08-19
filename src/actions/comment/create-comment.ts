"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";
import { notify } from "@/lib/notify";
import { requireAuth, verifyTaskAccess } from "@/lib/auth-guard";

interface Props {
  taskId: string;
  content: string;
  projectId: string;
}

export async function createComment({ taskId, content, projectId }: Props) {
  const user = await requireAuth();

  if (!content.trim()) return;

  const { task } = await verifyTaskAccess(taskId, user.id);

  const comment = await prisma.comment.create({
    data: {
      content,
      taskId,
      userId: user.id,
    },
  });

  if (task.assigneeId && task.assigneeId !== user.id) {
    await notify({
      userId: task.assigneeId,
      title: `${user.name || "A teammate"} commented on task "${task.title}"`,
      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }

  await logActivity({
    action: "Added a comment",
    entityType: "task",
    entityTitle: task.title,
    userId: user.id,
    projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
  return comment;
}
