import { prisma } from "@/lib/prisma";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import { ActivityFeed } from "@/components/activity/activity-feed";

import { CreateTaskForm } from "@/components/tasks/create-task-form";

import { KanbanBoard } from "@/components/tasks/kanban-board";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
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
      tasks: true,

      activities: {
        orderBy: {
          createdAt: "desc",
        },

        take: 10,
      },
    },
  });

  if (!project) {
    redirect("/projects");
  }

  return (
    <div className="space-y-8 ">
      <div>
        <h1 className="text-4xl font-bold text-foreground">{project.title}</h1>

        <p className="mt-2 text-muted-foreground">{project.description}</p>
      </div>

      <CreateTaskForm projectId={project.id} />

      <KanbanBoard tasks={project.tasks} />
      <ActivityFeed activities={project.activities} />
    </div>
  );
}
