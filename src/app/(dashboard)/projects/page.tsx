import { prisma } from "@/lib/prisma";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import { CreateProjectForm } from "@/components/projects/create-project-form";

import { ProjectCard } from "@/components/projects/project-card";

import { getActiveWorkspace } from "@/features/workspaces/lib/get-active-workspace";

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
  const workspace = await getActiveWorkspace();
  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
      workspaceId: workspace?.id
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8 ">
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          Projects
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your development projects.
        </p>
      </div>

      <CreateProjectForm />

      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">

          <h2 className="text-2xl font-semibold text-foreground">
            No projects yet
          </h2>

          <p className="mt-2 text-zinc-400">
            Create your first project to get started.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
            />
          ))}

        </div>
      )}

    </div>
  );
}