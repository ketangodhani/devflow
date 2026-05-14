"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { TaskStatus } from "@prisma/client";

import { updateTaskStatus } from "@/actions/task";

import { KanbanColumn } from "./kanban-column";
import { useOptimistic } from "react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
}

interface KanbanBoardProps {
  tasks: Task[];
}

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;

    const newStatus = over.id as TaskStatus;

    setOptimisticTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );

    await updateTaskStatus(taskId, newStatus);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid gap-6 lg:grid-cols-3">
        <KanbanColumn
          title="Todo"
          status={TaskStatus.TODO}
          tasks={optimisticTasks.filter(
            (task) => task.status === TaskStatus.TODO,
          )}
        />

        <KanbanColumn
          title="In Progress"
          status={TaskStatus.IN_PROGRESS}
          tasks={optimisticTasks.filter(
            (task) => task.status === TaskStatus.IN_PROGRESS,
          )}
        />

        <KanbanColumn
          title="Done"
          status={TaskStatus.DONE}
          tasks={optimisticTasks.filter(
            (task) => task.status === TaskStatus.DONE,
          )}
        />
      </div>
    </DndContext>
  );
}
