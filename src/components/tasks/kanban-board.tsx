"use client";

import { useState, useOptimistic } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { TaskStatus, TaskPriority } from "@prisma/client";
import { updateTaskStatus } from "@/actions/task";
import { KanbanColumn } from "./kanban-column";
import { TaskListView } from "./task-list-view";
import { KanbanFilterBar } from "./kanban-filter-bar";
import { TaskCardData } from "./task-card";

interface UserOption {
  id: string;
  name: string | null;
  email: string | null;
}

interface KanbanBoardProps {
  tasks: TaskCardData[];
  projectId: string;
  users?: UserOption[];
}

export function KanbanBoard({ tasks, projectId, users = [] }: KanbanBoardProps) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [assigneeFilter, setAssigneeFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState<"board" | "list">("board");

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
          : task
      )
    );

    await updateTaskStatus(taskId, newStatus);
  }

  // Filter tasks based on search, priority, and assignee
  const filteredTasks = optimisticTasks.filter((task) => {
    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(query);
      const descMatch = task.description?.toLowerCase().includes(query);
      const labelMatch = task.labels?.some((l) => l.toLowerCase().includes(query));
      if (!titleMatch && !descMatch && !labelMatch) {
        return false;
      }
    }

    // 2. Priority Filter
    if (priorityFilter !== "ALL" && task.priority !== priorityFilter) {
      return false;
    }

    // 3. Assignee Filter
    if (assigneeFilter === "UNASSIGNED" && task.assignee) {
      return false;
    }
    if (
      assigneeFilter !== "ALL" &&
      assigneeFilter !== "UNASSIGNED" &&
      task.assignee?.id !== assigneeFilter
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Interactive Filter & View Toolbar */}
      <KanbanFilterBar
        projectId={projectId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        assigneeFilter={assigneeFilter}
        onAssigneeChange={setAssigneeFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        users={users}
      />

      {/* Board View or List View */}
      {viewMode === "board" ? (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid gap-6 md:grid-cols-3">
            <KanbanColumn
              title="To Do"
              status={TaskStatus.TODO}
              tasks={filteredTasks.filter((t) => t.status === TaskStatus.TODO)}
              projectId={projectId}
              users={users}
            />

            <KanbanColumn
              title="In Progress"
              status={TaskStatus.IN_PROGRESS}
              tasks={filteredTasks.filter(
                (t) => t.status === TaskStatus.IN_PROGRESS
              )}
              projectId={projectId}
              users={users}
            />

            <KanbanColumn
              title="Done"
              status={TaskStatus.DONE}
              tasks={filteredTasks.filter((t) => t.status === TaskStatus.DONE)}
              projectId={projectId}
              users={users}
            />
          </div>
        </DndContext>
      ) : (
        <TaskListView tasks={filteredTasks} projectId={projectId} />
      )}
    </div>
  );
}
