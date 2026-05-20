"use server";

import { prisma } from "@/lib/prisma";

import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";

import { logActivity } from "@/lib/activity";

interface Props {
  taskId: string;
  content: string;
  projectId: string;
}

export async function createComment({
  taskId,
  content,
  projectId,
}: Props) {
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

  await logActivity({
    action: "commented on",
    entityType: "task",
    entityTitle: "a task",
    userId: session.user.id,
    projectId,
  });

  revalidatePath(
    `/projects/${projectId}/tasks/${taskId}`
  );
}