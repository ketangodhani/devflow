"use server";

import { auth } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

import { createProjectSchema } from "@/lib/validations/project";
import { logActivity } from "@/lib/activity";
import { getActiveWorkspace } from "@/features/workspaces/lib/get-active-workspace";
export async function createProject(
  formData: FormData
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const validatedFields =
    createProjectSchema.safeParse(rawData);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const workspace = await getActiveWorkspace();
  if (!workspace) {
    throw new Error("No active workspace found");
  }

  const { title, description } = validatedFields.data;

  const project = await prisma.project.create({
    data: {
      title,
      description,
      userId: session.user.id,
      workspaceId: workspace.id,
    },
  });

  await logActivity({
    action: "Created",
    entityType: "Project",
    entityTitle: project.title,
    userId: session.user.id,
    projectId: project.id,
  });

  revalidatePath("/projects");
  revalidatePath("/dashboard");
}