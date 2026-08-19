"use client";

import { useDroppable } from "@dnd-kit/core";
import { TaskCard, TaskCardData } from "./task-card";
import { TaskStatus } from "@prisma/client";
import { Plus, CheckCircle2, Clock, CircleDot } from "lucide-react";
import { CreateTaskDialog } from "./create-task-dialog";

interface UserOption {
  id: string;
  name: string | null;
  email: string | null;
}

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: TaskCardData[];
  projectId: string;
  users?: UserOption[];
}

export function KanbanColumn({
  title,
  status,
  tasks,
  projectId,
  users = [],
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const columnMeta = {
    [TaskStatus.TODO]: {
      icon: <CircleDot className="h-3.5 w-3.5 text-zinc-400" />,
      badge: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
      dot: "bg-zinc-400",
    },
    [TaskStatus.IN_PROGRESS]: {
      icon: <Clock className="h-3.5 w-3.5 text-indigo-500" />,
      badge: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      dot: "bg-indigo-500",
    },
    [TaskStatus.DONE]: {
      icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />,
      badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      dot: "bg-emerald-500",
    },
  }[status];

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-3xl border border-border/80 bg-card/60 p-4 transition-colors min-h-[500px] backdrop-blur-xl ${
        isOver ? "ring-2 ring-indigo-500/40 bg-indigo-500/[0.02]" : ""
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${columnMeta.dot}`} />
          <h3 className="text-sm font-bold tracking-tight text-foreground">
            {title}
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-muted text-muted-foreground">
            {tasks.length}
          </span>
        </div>

        {/* Quick Add Button */}
        <CreateTaskDialog
          projectId={projectId}
          defaultStatus={status}
          users={users}
          trigger={
            <button
              className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title={`Add task to ${title}`}
            >
              <Plus className="h-4 w-4" />
            </button>
          }
        />
      </div>

      {/* Column Task Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-0.5">
        {tasks.length === 0 ? (
          <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-dashed border-border/60 rounded-2xl bg-muted/10">
            <p className="text-xs text-muted-foreground">No tasks in {title.toLowerCase()}</p>
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
