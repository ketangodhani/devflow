import slugify from "slugify";

import { prisma } from "@/lib/prisma";

export async function createWorkspace(
  userId: string,
  name: string
) {
  const slug = `${slugify(name, {
    lower: true,
    strict: true,
  })}-${Date.now()}`;
 const workspace = await prisma.workspace.create({
    data: {
      name,
      slug,
      ownerId: userId,

      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
  });

  return workspace;
}