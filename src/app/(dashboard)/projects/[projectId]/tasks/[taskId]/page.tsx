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
      project: {
        include: {
          workspace: true,
        },
      },
      activities: {
        where: {
          taskId: taskId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
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
      attachments: {
        include: {
          uploadedBy: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
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
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      })
    : [];

  const users = members.map((member) => ({
    id: member.user.id,
    name: member.user.name,
    email: member.user.email,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <TaskDetailsContent
        task={task}
        users={users}
        currentUserId={session.user.id}
      />
    </div>
  );
}


