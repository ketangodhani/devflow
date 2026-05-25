"use server";

import { prisma } from "@/lib/prisma";

import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";

import { logActivity } from "@/lib/activity";
import { notify } from "@/lib/notify";

interface Props {
  taskId: string;
  content: string;
  projectId: string;
}

export async function createComment({ taskId, content, projectId }: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!content.trim()) return;

  await prisma.comment.create({
    data: {
      content,
      taskId,
      userId: session.user.id,
    },
  });

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (task?.assigneeId) {
    await notify({
      userId: task.assigneeId,

      title: "New comment on your task",

      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }

  await logActivity({
    action: "Added a comment",
    entityType: "task",
    entityTitle: "a task",
    userId: session.user.id,
    projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
}
