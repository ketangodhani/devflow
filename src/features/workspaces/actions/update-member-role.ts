"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateMemberRole(
  memberId: string,
  role: "ADMIN" | "MEMBER"
) {
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

    // 🛡️ Security Check: Agar current user OWNER nahi hai toh error return karo, crash mat karo
    if (currentUserMembership?.role !== "OWNER") {
      return { error: "Access Denied: Only the Workspace Owner can modify roles." };
    }

    await prisma.workspaceMember.update({
      where: { id: memberId },
      data: { role },
    });

    revalidatePath("/members");
    return { success: true }; // ✅ Return standard success object

  } catch (error) {
    console.error("ROLE_UPDATE_ERROR", error);
    return { error: "Something went wrong. Please try again later." };
  }
}