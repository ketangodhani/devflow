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
    <div className="flex h-screen overflow-hidden bg-black">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar projects={projects} />

        <main className="flex-1 overflow-y-auto p-6">
          <>
            {children}
          </>
        </main>
      </div>
    </div>
  );
}
