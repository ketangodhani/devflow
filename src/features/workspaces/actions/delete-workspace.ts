"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteWorkspaceAction(
  workspaceId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const membership =
    await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: session.user.id,
        },
      },
    });

  if (!membership || membership.role !== "OWNER") {
    throw new Error(
      "Only workspace owner can delete workspace"
    );
  }

  await prisma.workspace.delete({
    where: {
      id: workspaceId,
    },
  });

  const nextWorkspace =
    await prisma.workspaceMember.findFirst({
      where: {
        userId: session.user.id,
      },

      select: {
        workspaceId: true,
      },
    });

  const cookieStore = await cookies();

  if (nextWorkspace) {
    cookieStore.set(
      "workspaceId",
      nextWorkspace.workspaceId
    );
  } else {
    cookieStore.delete("workspaceId");
  }

  revalidatePath("/dashboard");
  revalidatePath("/projects");
}