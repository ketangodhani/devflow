"use server";

import { prisma } from "@/lib/prisma";

import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";

import { UTApi } from "uploadthing/server";

import { logActivity } from "@/lib/activity";

const utapi = new UTApi();

export async function deleteAttachment(
  attachmentId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const attachment =
    await prisma.attachment.findUnique({
      where: {
        id: attachmentId,
      },

      include: {
        task: true,
      },
    });

  if (!attachment) {
    throw new Error("Attachment not found");
  }

  await utapi.deleteFiles(
    attachment.fileKey
  );

  await prisma.attachment.delete({
    where: {
      id: attachmentId,
    },
  });

  await logActivity({
    action: "Deleted attachment",
    entityType: "task",
    entityTitle: attachment.name,
    userId: session.user.id,
    projectId:
      attachment.task.projectId,
    taskId: attachment.taskId,
  });

  revalidatePath(
    `/projects/${attachment.task.projectId}/tasks/${attachment.taskId}`
  );
}