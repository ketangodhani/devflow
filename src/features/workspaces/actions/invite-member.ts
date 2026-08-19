"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return {
        error: "Email is required",
      };
    }

    // Check current user membership and role
    const membership = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: session.user.id,
        },
      },
    });

    if (!membership) {
      return {
        error: "Unauthorized: You are not a member of this workspace",
      };
    }

    // Only OWNER and ADMIN can invite new members
    if (membership.role !== "OWNER" && membership.role !== "ADMIN") {
      return {
        error: "Access Denied: Only workspace owners and admins can invite new members",
      };
    }

    // Find invited user
    const user = await prisma.user.findUnique({
      where: {
        email: cleanEmail,
      },
    });

    if (!user) {
      return {
        error: "No registered user found with this email. Please ask them to sign up first.",
      };
    }

    // Prevent duplicate membership
    const existingMember = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: user.id,
        },
      },
    });

    if (existingMember) {
      return {
        error: "User is already a member of this workspace",
      };
    }

    await prisma.workspaceMember.create({
      data: {
        workspaceId,
        userId: user.id,
        role: "MEMBER",
      },
    });

    revalidatePath("/members");
    revalidatePath("/dashboard");

    return {
      success: `${user.name || cleanEmail} was added to the workspace`,
    };
  } catch (error) {
    console.error("INVITE_MEMBER_ERROR:", error);

    return {
      error: "Something went wrong while inviting member",
    };
  }
}