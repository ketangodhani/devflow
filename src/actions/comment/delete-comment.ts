"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth, verifyCommentAccess } from "@/lib/auth-guard";

interface Props {
  commentId: string;
  projectId: string;
  taskId: string;
}

export async function deleteComment({
  commentId,
  projectId,
  taskId,
}: Props) {
  const user = await requireAuth();

  // Enforces that caller is comment author OR workspace OWNER/ADMIN
  await verifyCommentAccess(commentId, user.id, true);

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  revalidatePath(
    `/projects/${projectId}/tasks/${taskId}`
  );

  return { success: true };
}