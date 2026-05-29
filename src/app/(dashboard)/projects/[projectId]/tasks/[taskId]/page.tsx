import { prisma } from "@/lib/prisma";
import TaskDetailsContent from "@/components/tasks/task-details-content";
import { getActiveWorkspace } from "@/features/workspaces/lib/get-active-workspace";

interface Props {
  params: Promise<{
    taskId: string;
  }>;
}

export default async function TaskPage({ params }: Props) {
  const { taskId } = await params;

  if (!taskId) {
    return <div>Invalid task</div>;
  }

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
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
    return <div>Task not found</div>;
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

  const users = members.map((member) => member.user);

  return (
    <div className="px-6">
      <TaskDetailsContent task={task} users={users} />
    </div>
  );
}
