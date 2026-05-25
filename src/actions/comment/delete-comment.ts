"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

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
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  revalidatePath(
    `/projects/${projectId}/tasks/${taskId}`
  );
}