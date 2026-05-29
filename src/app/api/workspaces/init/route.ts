import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.redirect(
      new URL("/login", process.env.NEXTAUTH_URL)
    );
  }

  const workspaceMember =
    await prisma.workspaceMember.findFirst({
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
    return NextResponse.redirect(
      new URL("/dashboard", process.env.NEXTAUTH_URL)
    );
  }

  const response = NextResponse.redirect(
    new URL("/dashboard", process.env.NEXTAUTH_URL)
  );

  response.cookies.set(
    "workspaceId",
    workspaceMember.workspace.id,
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    }
  );

  return response;
}