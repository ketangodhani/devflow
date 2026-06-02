"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import { createWorkspace } from "../lib/create-worksapce";

export async function createWorkspaceAction(
  name: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Workspace name is required");
  }

  const workspace = await createWorkspace(
    session.user.id,
    trimmedName
  );

  revalidatePath("/dashboard");
  revalidatePath("/projects");

  return workspace;
}