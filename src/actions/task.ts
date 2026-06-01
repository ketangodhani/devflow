"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createTaskSchema } from "@/lib/validations/task";
import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { logActivity } from "../lib/activity";
import { notify } from "../lib/notify";

export async function createTask(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const rowData = {
    title: formData.get("title"),
    description: formData.get("description"),
    projectId: formData.get("projectId"),
  };
  const validated = createTaskSchema.safeParse(rowData);
  if (!validated.success) {
    throw new Error("Invalid fields");
  }
  const { title, description, projectId } = validated.data;
  const task = await prisma.task.create({
    data: {
      title,
      description,
      projectId,
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
      title: `${session.user.name} created task "${task.title}"`,
      link: `/projects/${projectId}`,
    });
  }
  await logActivity({
    action: "Created",
    entityType: "Task",
    entityTitle: task.title,

    userId: session.user.id,

    projectId: task.projectId,
  });
  revalidatePath(`/projects/${projectId}`);
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
