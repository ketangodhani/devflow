import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getActiveWorkspace } from "@/features/workspaces/lib/get-active-workspace";
import { ActivityFeed } from "@/components/activity/activity-feed";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  const workspace = await getActiveWorkspace();

  if (!workspace) {
    redirect("/projects");
  }
  const [
    totalProjects,
    totalTasks,
    totalMembers,
    completedTasks,
    todoTasks,
    inProgressTasks,
    recentProjects,
    activities,
  ] = await Promise.all([
    prisma.project.count({
      where: {
        workspaceId: workspace.id,
      },
    }),

    prisma.task.count({
      where: {
        project: {
          workspaceId: workspace.id,
        },
      },
    }),

    prisma.workspaceMember.count({
      where: {
        workspaceId: workspace.id,
      },
    }),

    prisma.task.count({
      where: {
        status: "DONE",

        project: {
          workspaceId: workspace.id,
        },
      },
    }),

    prisma.task.count({
      where: {
        status: "TODO",

        project: {
          workspaceId: workspace.id,
        },
      },
    }),

    prisma.task.count({
      where: {
        status: "IN_PROGRESS",

        project: {
          workspaceId: workspace.id,
        },
      },
    }),

    prisma.project.findMany({
      where: {
        workspaceId: workspace.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    }),

    prisma.activity.findMany({
      where: {
        project: {
          workspaceId: workspace.id,
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 10,
    }),
  ]);

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
  <div className="space-y-8">
    <div>
      <h1 className="text-4xl font-bold text-foreground">
        {workspace.name}
      </h1>

      <p className="mt-2 text-zinc-400">
        Workspace Overview
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        title="Projects"
        value={String(totalProjects)}
      />

      <DashboardCard
        title="Tasks"
        value={String(totalTasks)}
      />

      <DashboardCard
        title="Members"
        value={String(totalMembers)}
      />

      <DashboardCard
        title="Completed"
        value={String(completedTasks)}
      />
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        title="Todo"
        value={String(todoTasks)}
      />

      <DashboardCard
        title="In Progress"
        value={String(inProgressTasks)}
      />

      <DashboardCard
        title="Done"
        value={String(completedTasks)}
      />

      <DashboardCard
        title="Completion %"
        value={`${completionRate}%`}
      />
    </div>

    <div className="grid gap-6 xl:grid-cols-3">

      <div className="rounded-3xl border border-border bg-card p-6 xl:col-span-2">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Recent Activity
        </h2>

        <ActivityFeed
          activities={activities}
        />
      </div>

      <div className="rounded-3xl border border-border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Recent Projects
        </h2>

        <div className="space-y-4">
          {recentProjects.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No projects yet
            </p>
          ) : (
            recentProjects.map(
              (project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-border p-4"
                >
                  <h3 className="font-medium text-foreground">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.description ||
                      "No description"}
                  </p>
                </div>
              )
            )
          )}
        </div>
      </div>

    </div>
  </div>
);
}
