"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import { logActivity } from "@/lib/activity";
import { requireAuth, verifyAttachmentAccess } from "@/lib/auth-guard";

const utapi = new UTApi();

export async function deleteAttachment(attachmentId: string) {
  const user = await requireAuth();

  // Verifies that attachment exists, user is in workspace, and is uploader OR workspace OWNER/ADMIN
  const { attachment } = await verifyAttachmentAccess(attachmentId, user.id, true);

  if (attachment.fileKey) {
    try {
      await utapi.deleteFiles(attachment.fileKey);
    } catch (e) {
      console.error("Failed to delete file from uploadthing storage:", e);
    }
  }

  await prisma.attachment.delete({
    where: {
      id: attachmentId,
    },
  });

  await logActivity({
    action: "Deleted attachment",
    entityType: "task",
    entityTitle: attachment.name,
    userId: user.id,
    projectId: attachment.task.projectId,
    taskId: attachment.taskId,
  });

  revalidatePath(
    `/projects/${attachment.task.projectId}/tasks/${attachment.taskId}`
  );

  return { success: true };
}