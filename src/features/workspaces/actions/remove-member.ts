"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function removeMember(
  memberId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const member =
    await prisma.workspaceMember.findUnique({
      where: {
        id: memberId,
      },
    });

  if (!member) {
    throw new Error("Member not found");
  }

  const currentUserMembership =
    await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId: member.workspaceId,
          userId: session.user.id,
        },
      },
    });

  if (currentUserMembership?.role !== "OWNER") {
    throw new Error(
      "Only owner can remove members"
    );
  }

  if (member.role === "OWNER") {
    throw new Error(
      "Owner cannot be removed"
    );
  }

  await prisma.workspaceMember.delete({
    where: {
      id: memberId,
    },
  });

  revalidatePath("/members");
}