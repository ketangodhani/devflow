import { prisma } from "@/lib/prisma";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import { CreateProjectForm } from "@/components/projects/create-project-form";

import { ProjectCard } from "@/components/projects/project-card";

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8 ">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Projects
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your development projects.
        </p>
      </div>

      <CreateProjectForm />

      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-800 p-12 text-center">

          <h2 className="text-2xl font-semibold text-white">
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