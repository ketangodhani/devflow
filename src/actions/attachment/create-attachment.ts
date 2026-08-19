"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";
import { notify } from "@/lib/notify";
import { requireAuth, verifyTaskAccess } from "@/lib/auth-guard";

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
  const user = await requireAuth();

  const { task } = await verifyTaskAccess(taskId, user.id);

  const attachment = await prisma.attachment.create({
    data: {
      name,
      url,
      taskId,
      fileKey,
      uploadedById: user.id,
    },
  });

  if (task.assigneeId && task.assigneeId !== user.id) {
    await notify({
      userId: task.assigneeId,
      title: `${user.name || "A teammate"} attached "${name}" to task "${task.title}"`,
      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }

  await logActivity({
    action: "Uploaded attachment",
    entityType: "task",
    entityTitle: name,
    userId: user.id,
    projectId,
    taskId,
  });

  revalidatePath(`/projects/${projectId}/tasks/${taskId}`);
  return attachment;
}

