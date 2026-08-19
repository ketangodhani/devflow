"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createTaskSchema } from "@/lib/validations/task";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { logActivity } from "../lib/activity";
import { notify } from "../lib/notify";

export async function createTask(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const rawLabels = formData.get("labels");
  const parsedLabels = rawLabels
    ? String(rawLabels)
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean)
    : [];

  const rowData = {
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    projectId: formData.get("projectId"),
    status: formData.get("status") || "TODO",
    priority: formData.get("priority") || "MEDIUM",
    assigneeId: formData.get("assigneeId") || null,
    dueDate: formData.get("dueDate") || null,
    labels: parsedLabels,
  };

  const validated = createTaskSchema.safeParse(rowData);
  if (!validated.success) {
    throw new Error("Invalid task fields");
  }

  const { title, description, projectId, status, priority, assigneeId, dueDate, labels } =
    validated.data;

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

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      workspace: true,
    },
  });

  if (!project?.workspace) {
    throw new Error("Workspace not found");
  }

  if (
    project?.workspace.ownerId &&
    project.workspace.ownerId !== session.user.id
  ) {
    await notify({
      userId: project.workspace.ownerId,
      title: `${session.user.name || "A member"} created task "${task.title}"`,
      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }

  if (assigneeId && assigneeId !== session.user.id) {
    await notify({
      userId: assigneeId,
      title: `${session.user.name || "A teammate"} assigned you to task "${task.title}"`,
      link: `/projects/${projectId}/tasks/${task.id}`,
    });
  }

  await logActivity({
    action: "Created",
    entityType: "Task",
    entityTitle: task.title,
    userId: session.user.id,
    projectId: task.projectId,
    taskId: task.id,
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath(`/projects`);
  revalidatePath(`/dashboard`);
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
    },
  });
  await logActivity({
    action: `moved to ${status}`,
    entityType: "Task",
    entityTitle: task.title,

    userId: session.user.id,

    projectId: task.projectId,
  });
  revalidatePath(`/projects`);
}
