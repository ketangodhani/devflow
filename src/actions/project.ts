"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createProjectSchema } from "@/lib/validations/project";
import { logActivity } from "@/lib/activity";
import { getActiveWorkspace } from "@/features/workspaces/lib/get-active-workspace";
import { requireAuth, verifyWorkspaceAccess } from "@/lib/auth-guard";

export async function createProject(formData: FormData) {
  const user = await requireAuth();

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const validatedFields = createProjectSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const errorMessage =
      validatedFields.error.issues?.[0]?.message || "Invalid fields";
    throw new Error(errorMessage);
  }

  const workspace = await getActiveWorkspace();
  if (!workspace) {
    throw new Error("No active workspace found");
  }

  await verifyWorkspaceAccess(workspace.id, user.id);

  const { title, description } = validatedFields.data;

  const project = await prisma.project.create({
    data: {
      title,
      description,
      userId: user.id,
      workspaceId: workspace.id,
    },
  });

  await logActivity({
    action: "Created",
    entityType: "Project",
    entityTitle: project.title,
    userId: user.id,
    projectId: project.id,
  });

  revalidatePath("/projects");
  revalidatePath("/dashboard");
}