import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import TaskDetailsContent from "@/components/tasks/task-details-content";

interface Props {
  params: Promise<{
    projectId: string;
    taskId: string;
  }>;
}

export default async function TaskPage({ params }: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { taskId, projectId } = await params;

  if (!taskId) {
    notFound();
  }

  // Ensures only users belonging to the task's workspace can view the task details
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      projectId: projectId,
      project: {
        workspace: {
          members: {
            some: {
              userId: session.user.id,
            },
          },
        },
      },
    },
    include: {
      project: true,
      activities: {
        where: {
          taskId: taskId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
      assignee: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      attachments: true,
    },
  });

  if (!task) {
    notFound();
  }

  const members = task.project?.workspaceId
    ? await prisma.workspaceMember.findMany({
        where: {
          workspaceId: task.project.workspaceId,
        },
        include: {
          user: true,
        },
      })
    : [];

  const users = members.map((member) => ({
    id: member.user.id,
    name: member.user.name,
    email: member.user.email,
  }));

  return (
    <div className="px-6">
      <TaskDetailsContent task={task} users={users} />
    </div>
  );
}


