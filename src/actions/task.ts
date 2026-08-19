"use server";

import { prisma } from "@/lib/prisma";
import { createTaskSchema } from "@/lib/validations/task";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";
import { notify } from "@/lib/notify";
import { requireAuth, verifyProjectAccess, verifyTaskAccess } from "@/lib/auth-guard";
import { formatStatus } from "@/lib/formatter";

export async function createTask(formData: FormData) {
  const user = await requireAuth();

  const rawLabels = formData.get("labels");
  const parsedLabels = rawLabels
    ? String(rawLabels)
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean)
    : [];

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    projectId: formData.get("projectId"),
    status: formData.get("status") || "TODO",
    priority: formData.get("priority") || "MEDIUM",
    assigneeId: formData.get("assigneeId") || null,
    dueDate: formData.get("dueDate") || null,
    labels: parsedLabels,
  };

  const validated = createTaskSchema.safeParse(rawData);
  if (!validated.success) {
    const errorMessage =
      validated.error.issues?.[0]?.message || "Invalid task fields";
    throw new Error(errorMessage);
  }

  const { title, description, projectId, status, priority, assigneeId, dueDate, labels } =
    validated.data;

  // Verifies that caller is a member of the project's workspace
  const { project } = await verifyProjectAccess(projectId, user.id);

  const task = await prisma.task.create({
    data: {
      title,
      description: description || null,
      projectId,
      status: status as TaskStatus,
      priority: priority as TaskPriority,
      assigneeId: assigneeId || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      labels: labels || [],
    },
  });

  if (
    project.workspace?.ownerId &&
    project.workspace.ownerId !== user.id
  ) {
    await notify({
      userId: project.workspace.ownerId,
      title: `${user.name || "A member"} created task "${task.title}"`,
      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }

  if (assigneeId && assigneeId !== user.id) {
    await notify({
      userId: assigneeId,
      title: `${user.name || "A teammate"} assigned you to task "${task.title}"`,
      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }

  await logActivity({
    action: "Created",
    entityType: "Task",
    entityTitle: task.title,
    userId: user.id,
    projectId: task.projectId,
    taskId: task.id,
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath(`/projects`);
  revalidatePath(`/dashboard`);
}


export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  const user = await requireAuth();

  // Verifies that caller is a member of the task's workspace
  const { task: existingTask } = await verifyTaskAccess(taskId, user.id);

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
    },
  });

  if (task.assigneeId && task.assigneeId !== user.id) {
    await notify({
      userId: task.assigneeId,
      title: `Task "${task.title}" was moved to ${formatStatus(status)}`,
      link: `/projects/${task.projectId}/tasks/${task.id}`,
    });
  }

  await logActivity({
    action: `Moved to ${formatStatus(status)}`,
    entityType: "Task",
    entityTitle: task.title,
    userId: user.id,
    projectId: task.projectId,
    taskId: task.id,
  });

  revalidatePath(`/projects/${task.projectId}`);
  revalidatePath(`/projects/${task.projectId}/tasks/${task.id}`);
  revalidatePath(`/projects`);
  revalidatePath(`/dashboard`);

  return task;
}

