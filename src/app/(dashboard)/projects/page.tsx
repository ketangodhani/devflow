import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProjectCard } from "@/components/projects/project-card";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { getActiveWorkspace } from "@/features/workspaces/lib/get-active-workspace";
import { FolderKanban, Sparkles } from "lucide-react";

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const workspace = await getActiveWorkspace();

  if (!workspace) {
    redirect("/dashboard");
  }

  const projects = await prisma.project.findMany({
    where: {
      workspaceId: workspace.id,
    },
    include: {
      tasks: {
        select: {
          id: true,
          status: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 py-6 lg:px-8">
      {/* Upper Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-500/10">
              <Sparkles className="h-3 w-3" /> {workspace.name}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mt-1">
            Projects
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your engineering spaces, sprints, and task repositories.
          </p>
        </div>

        <div className="shrink-0">
          <CreateProjectDialog />
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center space-y-4 max-w-lg mx-auto my-12">
          <div className="h-12 w-12 rounded-2xl bg-muted/60 border border-border/80 flex items-center justify-center mx-auto text-muted-foreground">
            <FolderKanban className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-foreground">
              No projects created yet
            </h2>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Get started by creating your first project space to track sprints and organize tasks.
            </p>
          </div>
          <div className="pt-2">
            <CreateProjectDialog />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const completedCount = project.tasks.filter(
              (t) => t.status === "DONE"
            ).length;

            return (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                createdAt={project.createdAt}
                totalTasks={project.tasks.length}
                completedTasks={completedCount}
                creatorName={project.user?.name}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
