"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function removeMember(memberId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "You must be logged in to perform this action." };
    }

    const member = await prisma.workspaceMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      return { error: "Member not found in this workspace." };
    }

    const currentUserMembership = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId: member.workspaceId,
          userId: session.user.id,
        },
      },
    });

    // Security Check 1: Sirf OWNER hi members ko remove kar sakta hai
    if (currentUserMembership?.role !== "OWNER") {
      return { error: "Access Denied: Only the Workspace Owner can remove members." };
    }

    // Security Check 2: Owner khud ko list se remove nahi kar sakta (use delete workspace karna hoga)
    if (member.role === "OWNER") {
      return { error: "Action Forbidden: The Workspace Owner cannot be removed." };
    }

    await prisma.workspaceMember.delete({
      where: { id: memberId },
    });

    revalidatePath("/members");
    return { success: true };

  } catch (error) {
    console.error("REMOVE_MEMBER_ERROR", error);
    return { error: "Something went wrong while removing the member." };
  }
}