import { redirect } from "next/navigation";
import {
  FolderKanban,
  CheckCircle2,
  Users2,
  ClipboardList,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
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
    prisma.project.count({ where: { workspaceId: workspace.id } }),
    prisma.task.count({ where: { project: { workspaceId: workspace.id } } }),
    prisma.workspaceMember.count({ where: { workspaceId: workspace.id } }),
    prisma.task.count({
      where: { status: "DONE", project: { workspaceId: workspace.id } },
    }),
    prisma.task.count({
      where: { status: "TODO", project: { workspaceId: workspace.id } },
    }),
    prisma.task.count({
      where: { status: "IN_PROGRESS", project: { workspaceId: workspace.id } },
    }),
    prisma.project.findMany({
      where: { workspaceId: workspace.id },
      orderBy: { createdAt: "desc" },
      take: 4, // 4 items fit standard widgets cleanly
    }),
    prisma.activity.findMany({
      where: { project: { workspaceId: workspace.id } },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Math percentages for our visual task pipeline segment
  const todoPercent =
    totalTasks === 0 ? 0 : Math.round((todoTasks / totalTasks) * 100);
  const inProgressPercent =
    totalTasks === 0 ? 0 : Math.round((inProgressTasks / totalTasks) * 100);
  const donePercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 py-6 lg:px-8">
      {/* Premium Header Profile Block */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-500/10">
              <Sparkles className="h-3 w-3" /> Workspace
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mt-1">
            {workspace.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time health, progression velocity, and workspace analytics.
          </p>
        </div>
      </div>

      {/* 📊 Main High-Level Analytics Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Active Projects"
          value={String(totalProjects)}
          icon={<FolderKanban className="h-4 w-4" />}
          description="Total active spaces initialized"
        />
        <DashboardCard
          title="Total Backlog Tasks"
          value={String(totalTasks)}
          icon={<ClipboardList className="h-4 w-4" />}
          description="Cumulative tasks across scopes"
        />
        <DashboardCard
          title="Team Strength"
          value={String(totalMembers)}
          icon={<Users2 className="h-4 w-4" />}
          description="Collaborators in workspace"
        />
        <DashboardCard
          title="Velocity Rate"
          value={`${completionRate}%`}
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          description={`${completedTasks} of ${totalTasks} tasks finalized`}
          className="bg-emerald-500/[0.01] border-emerald-500/10"
        />
      </div>

      {/* 🛠️ Modern Executive Tasks Split Panel */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-6">
        <div>
          <h3 className="font-semibold text-base text-foreground tracking-tight">
            Task Distribution Pipeline
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Visual split ratio of current task management operational states.
          </p>
        </div>

        {/* Triple Stacked Colored Progress Meter */}
        <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${todoPercent}%` }}
            className="bg-zinc-400 dark:bg-zinc-600 transition-all duration-500"
            title={`Todo: ${todoPercent}%`}
          />
          <div
            style={{ width: `${inProgressPercent}%` }}
            className="bg-indigo-500 transition-all duration-500"
            title={`In Progress: ${inProgressPercent}%`}
          />
          <div
            style={{ width: `${donePercent}%` }}
            className="bg-emerald-500 transition-all duration-500"
            title={`Done: ${donePercent}%`}
          />
        </div>

        {/* Labels Box */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border/40 text-center sm:text-left">
          <div className="space-y-0.5">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>To Do</span>
            </div>
            <p className="text-xl font-bold text-foreground pl-4">
              {todoTasks}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                ({todoPercent}%)
              </span>
            </p>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              <span>In Progress</span>
            </div>
            <p className="text-xl font-bold text-foreground pl-4">
              {inProgressTasks}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                ({inProgressPercent}%)
              </span>
            </p>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Completed</span>
            </div>
            <p className="text-xl font-bold text-foreground pl-4">
              {completedTasks}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                ({donePercent}%)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 🔄 Splitted Feed Widgets */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left Side: Recent Activity Feed */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm lg:col-span-2 flex flex-col h-[460px]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Recent Activity
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Audit log of system actions taken inside projects.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-border">
            <ActivityFeed activities={activities} />
          </div>
        </div>

        {/* Right Side: Recent Projects Widget */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm flex flex-col h-[460px]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Recent Projects
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Quick jump to recently initiated repositories.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-border">
            {recentProjects.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-border/60 rounded-xl bg-muted/20">
                <p className="text-xs text-muted-foreground">
                  No active workspace projects detected.
                </p>
              </div>
            ) : (
              recentProjects.map((project) => (
                <Link
                  href={`/projects/${project.id}`}
                  key={project.id}
                  className="group flex items-start justify-between p-3.5 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-border transition-all duration-200 cursor-pointer"
                >
                  <div className="space-y-1 max-w-[85%]">
                    <h3 className="text-sm font-medium text-foreground tracking-tight group-hover:text-indigo-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {project.description ||
                        "No project documentation description specified."}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-0.5" />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
