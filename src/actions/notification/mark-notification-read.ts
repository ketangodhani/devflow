"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-guard";

export async function markNotificationRead(id: string) {
  const user = await requireAuth();

  await prisma.notification.updateMany({
    where: {
      id,
      userId: user.id,
    },
    data: {
      read: true,
    },
  });

  revalidatePath("/");
}