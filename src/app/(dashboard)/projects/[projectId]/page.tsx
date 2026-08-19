import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ActivityFeed } from "@/components/activity/activity-feed";
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { getActiveWorkspace } from "@/features/workspaces/lib/get-active-workspace";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  CircleDot,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { projectId } = await params;

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      workspace: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
    },
    include: {
      workspace: true,
      tasks: {
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          comments: {
            select: {
              id: true,
            },
          },
          attachments: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      activities: {
        orderBy: {
          createdAt: "desc",
        },
        take: 8,
      },
    },
  });

  if (!project) {
    redirect("/projects");
  }

  const workspace = await getActiveWorkspace();

  const members = await prisma.workspaceMember.findMany({
    where: {
      workspaceId: workspace?.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const users = members.map((m) => m.user);

  // Calculate project metrics
  const totalTasks = project.tasks.length;
  const todoTasks = project.tasks.filter((t) => t.status === "TODO").length;
  const inProgressTasks = project.tasks.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;
  const doneTasks = project.tasks.filter((t) => t.status === "DONE").length;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  // Transform tasks for TaskCardData
  const taskCards = project.tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    projectId: task.projectId,
    priority: task.priority,
    labels: task.labels,
    dueDate: task.dueDate,
    assignee: task.assignee,
    commentsCount: task.comments.length,
    attachmentsCount: task.attachments.length,
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 py-6 lg:px-8">
      {/* Breadcrumbs & Project Header */}
      <div className="space-y-4 border-b border-border/40 pb-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            href="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            {project.workspace?.name || workspace?.name || "Workspace"}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href="/projects"
            className="hover:text-foreground transition-colors"
          >
            Projects
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">{project.title}</span>
        </div>

        {/* Title & Description */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              {project.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              {project.description ||
                "Collaborative Kanban sprint space and backlog management."}
            </p>
          </div>

          {/* Mini Velocity Chip */}
          <div className="flex items-center gap-3 p-3 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                Sprint Velocity
              </span>
              <p className="text-lg font-bold text-foreground leading-none mt-0.5">
                {completionRate}%
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Visual Task Distribution Meter */}
        <div className="pt-2">
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden flex shadow-inner">
            <div
              style={{
                width: `${totalTasks === 0 ? 0 : (todoTasks / totalTasks) * 100}%`,
              }}
              className="bg-zinc-400 dark:bg-zinc-600 transition-all duration-300"
              title={`Todo: ${todoTasks}`}
            />
            <div
              style={{
                width: `${totalTasks === 0 ? 0 : (inProgressTasks / totalTasks) * 100}%`,
              }}
              className="bg-indigo-500 transition-all duration-300"
              title={`In Progress: ${inProgressTasks}`}
            />
            <div
              style={{
                width: `${totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100}%`,
              }}
              className="bg-emerald-500 transition-all duration-300"
              title={`Done: ${doneTasks}`}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-zinc-400" />
                <span>To Do: {todoTasks}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <span>In Progress: {inProgressTasks}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Done: {doneTasks}</span>
              </span>
            </div>
            <span className="font-semibold text-foreground">
              {totalTasks} total tasks
            </span>
          </div>
        </div>
      </div>

      {/* Main Kanban & List View Engine */}
      <KanbanBoard
        tasks={taskCards}
        projectId={project.id}
        users={users}
      />

      {/* Recent Project Activity Audit Log */}
      {project.activities.length > 0 && (
        <div className="pt-8 border-t border-border/60 space-y-4">
          <div>
            <h3 className="text-base font-bold tracking-tight text-foreground">
              Recent Project Activity
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live audit trail of task transitions and updates.
            </p>
          </div>
          <div className="rounded-3xl border border-border/80 bg-card/60 p-6 backdrop-blur-xl">
            <ActivityFeed activities={project.activities} />
          </div>
        </div>
      )}
    </div>
  );
}
