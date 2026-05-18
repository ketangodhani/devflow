import { prisma } from "@/lib/prisma";
import TaskDetailsModal from "@/components/tasks/task-details-modal";

interface Props {
  params: Promise<{
    projectId: string;
    taskId: string;
  }>;
}

export default async function TaskModalPage({ params }: Props) {
  const { taskId } = await params;

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      project: true,
      activities: {
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
    },
  });

  if (!task) {
    return null;
  }

  return <TaskDetailsModal task={task} />;
}
