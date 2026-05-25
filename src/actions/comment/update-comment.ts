"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

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
}