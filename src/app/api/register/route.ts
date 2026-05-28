import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createWorkspace } from "@/features/workspaces/lib/create-worksapce";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await createWorkspace(user.id, `${user.name}'s Workspace`);

    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
