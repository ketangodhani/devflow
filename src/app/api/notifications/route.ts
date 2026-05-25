import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notifications =
      await prisma.notification.findMany({
        orderBy: {
          createdAt: "desc",
        },

        take: 10,
      });

    return NextResponse.json(
      notifications
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json([]);
  }
}