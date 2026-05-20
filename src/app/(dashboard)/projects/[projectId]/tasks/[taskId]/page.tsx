import { prisma } from "@/lib/prisma";
import TaskDetailsContent from "@/components/tasks/task-details-content";

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
          taskId: taskId
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
    },
  });
  if (!task) {
    return <div>Task not found</div>;
  }
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return (
    <div className="p-6">
      <TaskDetailsContent task={task} users={users} />
    </div>
  );
}
