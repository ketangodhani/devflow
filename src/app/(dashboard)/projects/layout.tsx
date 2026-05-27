import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ReactNode } from "react";

interface ProjectsLayoutProps {
  children: ReactNode;
}

export default async function ProjectsLayout({
  children
}: ProjectsLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },

    select: {
      id: true,
      title: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar projects={projects} />

        <main className="flex-1 p-6">
          <>
            {children}
          </>
        </main>
      </div>
    </div>
  );
}
