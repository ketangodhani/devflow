import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createWorkspace } from "@/features/workspaces/lib/create-worksapce";

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let workspaceMember = await prisma.workspaceMember.findFirst({
    where: {
      userId: session.user.id,
    },
    include: {
      workspace: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!workspaceMember?.workspace) {
    try {
      const newWorkspace = await createWorkspace(
        session.user.id,
        `${session.user.name || "My"}'s Workspace`
      );
      workspaceMember = {
        id: "temp",
        workspaceId: newWorkspace.id,
        userId: session.user.id,
        role: "OWNER",
        createdAt: new Date(),
        workspace: newWorkspace,
      };
    } catch (e) {
      console.error("Failed to auto-create workspace in init route:", e);
    }
  }

  const response = NextResponse.redirect(new URL("/dashboard", req.url));

  if (workspaceMember?.workspace) {
    response.cookies.set("workspaceId", workspaceMember.workspace.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  return response;
}