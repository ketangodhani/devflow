"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth, verifyCommentAccess, ForbiddenError } from "@/lib/auth-guard";

interface Props {
  commentId: string;
  content: string;
  projectId: string;
  taskId: string;
}

export async function updateComment({
  commentId,
  content,
  projectId,
  taskId,
}: Props) {
  const user = await requireAuth();

  if (!content.trim()) return;

  const { comment } = await verifyCommentAccess(commentId, user.id);

  if (comment.userId !== user.id) {
    throw new ForbiddenError("Access denied: You can only edit your own comments");
  }

  await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });

  revalidatePath(
    `/projects/${projectId}/tasks/${taskId}`
  );

  return { success: true };
}