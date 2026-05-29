"use server";

import { prisma } from "@/lib/prisma";

import { auth } from "@/lib/auth";

interface InviteMemberProps {
  email: string;
  workspaceId: string;
}

export async function inviteMember({
  email,
  workspaceId,
}: InviteMemberProps) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized",
      };
    }

    // Check current user membership
    const membership =
      await prisma.workspaceMember.findFirst({
        where: {
          workspaceId,
          userId: session.user.id,
        },
      });

    if (!membership) {
      return {
        error: "Unauthorized",
      };
    }

    // Find invited user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    // Prevent duplicate membership
    const existingMember =
      await prisma.workspaceMember.findUnique({
        where: {
          workspaceId_userId: {
            workspaceId,
            userId: user.id,
          },
        },
      });

    if (existingMember) {
      return {
        error: "User already in workspace",
      };
    }

    await prisma.workspaceMember.create({
      data: {
        workspaceId,
        userId: user.id,
      },
    });

    return {
      success: "Member invited",
    };

  } catch (error) {
    console.error(error);

    return {
      error: "Something went wrong",
    };
  }
}