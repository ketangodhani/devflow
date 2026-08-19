import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { WorkspaceRole } from "@prisma/client";

export class AuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AuthError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Access denied: Insufficient permissions") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * Ensures user is authenticated and returns session user.
 */
export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new AuthError("Unauthorized: Please sign in to continue");
  }

  return session.user as { id: string; name?: string | null; email?: string | null };
}

/**
 * Verifies that the user belongs to the workspace and optionally has specific roles.
 */
export async function verifyWorkspaceAccess(
  workspaceId: string,
  userId: string,
  allowedRoles?: WorkspaceRole[]
) {
  const membership = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
    include: {
      workspace: true,
    },
  });

  if (!membership) {
    throw new ForbiddenError("Access denied: You are not a member of this workspace");
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(membership.role)) {
    throw new ForbiddenError("Access denied: You do not have permission to perform this action");
  }

  return membership;
}

/**
 * Verifies that a project exists and user has workspace membership.
 */
export async function verifyProjectAccess(
  projectId: string,
  userId: string,
  allowedRoles?: WorkspaceRole[]
) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      workspace: {
        include: {
          members: {
            where: { userId },
          },
        },
      },
    },
  });

  if (!project) {
    throw new NotFoundError("Project not found");
  }

  if (!project.workspace) {
    throw new ForbiddenError("Project is not associated with a workspace");
  }

  const membership = project.workspace.members?.[0];
  if (!membership) {
    throw new ForbiddenError("Access denied: You are not a member of this workspace");
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(membership.role)) {
    throw new ForbiddenError("Access denied: Insufficient role permissions");
  }

  return { project, membership };
}

/**
 * Verifies that a task exists and user has workspace membership.
 */
export async function verifyTaskAccess(
  taskId: string,
  userId: string,
  allowedRoles?: WorkspaceRole[]
) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      project: {
        include: {
          workspace: {
            include: {
              members: {
                where: { userId },
              },
            },
          },
        },
      },
    },
  });

  if (!task) {
    throw new NotFoundError("Task not found");
  }

  if (!task.project?.workspace) {
    throw new ForbiddenError("Task is not associated with an active workspace");
  }

  const membership = task.project.workspace.members?.[0];
  if (!membership) {
    throw new ForbiddenError("Access denied: You are not a member of this workspace");
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(membership.role)) {
    throw new ForbiddenError("Access denied: Insufficient role permissions");
  }

  return { task, membership };
}

/**
 * Verifies that a comment exists and user has workspace membership.
 * If requireAuthorOrAdmin is true, verifies that the user is the comment author OR a workspace OWNER/ADMIN.
 */
export async function verifyCommentAccess(
  commentId: string,
  userId: string,
  requireAuthorOrAdmin = false
) {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      task: {
        include: {
          project: {
            include: {
              workspace: {
                include: {
                  members: {
                    where: { userId },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!comment) {
    throw new NotFoundError("Comment not found");
  }

  if (!comment.task?.project?.workspace) {
    throw new ForbiddenError("Comment is not associated with an active workspace");
  }

  const membership = comment.task.project.workspace.members?.[0];
  if (!membership) {
    throw new ForbiddenError("Access denied: You are not a member of this workspace");
  }

  if (requireAuthorOrAdmin) {
    const isAuthor = comment.userId === userId;
    const isOwnerOrAdmin = membership.role === WorkspaceRole.OWNER || membership.role === WorkspaceRole.ADMIN;

    if (!isAuthor && !isOwnerOrAdmin) {
      throw new ForbiddenError("Access denied: You can only modify your own comments");
    }
  }

  return { comment, membership };
}

/**
 * Verifies that an attachment exists and user has workspace membership.
 * If requireUploaderOrAdmin is true, verifies that user is the uploader OR a workspace OWNER/ADMIN.
 */
export async function verifyAttachmentAccess(
  attachmentId: string,
  userId: string,
  requireUploaderOrAdmin = false
) {
  const attachment = await prisma.attachment.findUnique({
    where: { id: attachmentId },
    include: {
      task: {
        include: {
          project: {
            include: {
              workspace: {
                include: {
                  members: {
                    where: { userId },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!attachment) {
    throw new NotFoundError("Attachment not found");
  }

  if (!attachment.task?.project?.workspace) {
    throw new ForbiddenError("Attachment is not associated with an active workspace");
  }

  const membership = attachment.task.project.workspace.members?.[0];
  if (!membership) {
    throw new ForbiddenError("Access denied: You are not a member of this workspace");
  }

  if (requireUploaderOrAdmin) {
    const isUploader = attachment.uploadedById === userId;
    const isOwnerOrAdmin = membership.role === WorkspaceRole.OWNER || membership.role === WorkspaceRole.ADMIN;

    if (!isUploader && !isOwnerOrAdmin) {
      throw new ForbiddenError("Access denied: You do not have permission to delete this attachment");
    }
  }

  return { attachment, membership };
}

