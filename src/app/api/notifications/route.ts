import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL));
  }
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: session?.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },

      take: 10,
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error(error);

    return NextResponse.json([]);
  }
}
