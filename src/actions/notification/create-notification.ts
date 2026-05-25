"use server";

import { prisma } from "@/lib/prisma";

interface Props {
  userId: string;

  title: string;

  link?: string;
}

export async function createNotification({
  userId,
  title,
  link,
}: Props) {
  return prisma.notification.create({
    data: {
      userId,
      title,
      link,
    },
  });
}