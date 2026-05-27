"use client";

import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./task-card";
import { TaskPriority, TaskStatus } from "@prisma/client";

interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  projectId: string;
  priority: TaskPriority;
  labels: string[];
}
interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}
export function KanbanColumn({ title, status, tasks }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });
  return (
    <div
      ref={setNodeRef}
      className="space-y-4 rounded-3xl border border-border bg-card p-6 min-h-125"
    >
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description ?? null}
          status={task.status}
          projectId={task.projectId}
          priority={task.priority}
          labels={task.labels}
        />
      ))}
    </div>
  );
}
