import { prisma } from "@/lib/prisma";
import TaskDetailsContent from "@/components/tasks/task-details-content";

interface Props {
  params: Promise<{
    projectId: string;
    taskId: string;
  }>;
}

export default async function TaskPage({ params }: Props) {
  const { projectId, taskId } = await params;
  console.log(projectId);
  console.log(taskId);

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
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
    },
  });
   if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="p-6">
      <TaskDetailsContent task={task} />
    </div>
  );
}