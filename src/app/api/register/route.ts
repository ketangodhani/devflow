import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createWorkspace } from "@/features/workspaces/lib/create-worksapce";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return Response.json(
        { error: validation.error.issues?.[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }


    const { name, email, password } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return Response.json({ error: "User already exists with this email" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    await createWorkspace(user.id, `${user.name || "My"}'s Workspace`);

    return Response.json(user, { status: 201 });
  } catch (error) {
    console.error("REGISTER_ERROR:", error);
    return Response.json({ error: "Something went wrong during registration" }, { status: 500 });
  }
}

