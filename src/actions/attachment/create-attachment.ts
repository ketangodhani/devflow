"use server";

import { prisma } from "@/lib/prisma";

import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";

import { logActivity } from "@/lib/activity";
import { notify } from "@/lib/notify";

interface Props {
  taskId: string;
  projectId: string;

  name: string;
  url: string;
  fileKey: string;
}

export async function createAttachment({
  taskId,
  projectId,
  name,
  url,
  fileKey,
}: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const attachment = await prisma.attachment.create({
    data: {
      name,
      url,

      taskId,
      fileKey,
      uploadedById: session.user.id,
    },
  });
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },

    select: {
      id: true,
      assigneeId: true,
    },
  });

  if (task?.assigneeId) {
    await notify({
      userId: task.assigneeId,

      title: "New attachment added",

      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }
  await logActivity({
    action: "Uploaded attachment",
    entityType: "task",
    entityTitle: name,
    userId: session.user.id,
    projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
  return attachment;
}
