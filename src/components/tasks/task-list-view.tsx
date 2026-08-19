"use client";

import { useState, useTransition } from "react";
import { TaskStatus, TaskPriority } from "@prisma/client";
import { TaskCardData } from "./task-card";
import { updateTaskStatus } from "@/actions/task";
import {
  Calendar,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  Clock,
  CircleDot,
  ArrowUpRight,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface TaskListViewProps {
  tasks: TaskCardData[];
  projectId: string;
}

export function TaskListView({ tasks, projectId }: TaskListViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    startTransition(async () => {
      try {
        await updateTaskStatus(taskId, newStatus);
        toast.success(`Task moved to ${newStatus}`);
      } catch (error) {
        toast.error("Failed to update task status");
      }
    });
  };

  const priorityMeta: Record<TaskPriority, { label: string; style: string }> = {
    LOW: { label: "Low", style: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
    MEDIUM: { label: "Medium", style: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    HIGH: { label: "High", style: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    URGENT: { label: "Urgent", style: "bg-red-500/10 text-red-500 border-red-500/20" },
  };

  if (tasks.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center">
        <p className="text-sm text-muted-foreground">No matching tasks found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 items-center px-6 py-3 bg-muted/40 border-b border-border/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="col-span-5">Task Details</span>
        <span className="col-span-2">Status</span>
        <span className="col-span-2">Priority</span>
        <span className="col-span-2">Assignee & Due</span>
        <span className="col-span-1 text-right">Action</span>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-border/40">
        {tasks.map((task) => {
          const priority = priorityMeta[task.priority] || priorityMeta.MEDIUM;
          const formattedDueDate = task.dueDate
            ? new Date(task.dueDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })
            : null;

          return (
            <div
              key={task.id}
              className="flex flex-col md:grid md:grid-cols-12 md:items-center p-4 md:px-6 gap-3 md:gap-0 hover:bg-muted/20 transition-colors"
            >
              {/* Task Details (Takes 5/12 cols) */}
              <div
                onClick={() => router.push(`/projects/${projectId}/tasks/${task.id}`)}
                className="col-span-5 cursor-pointer space-y-1 pr-4"
              >
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-foreground hover:text-indigo-500 transition-colors line-clamp-1">
                    {task.title}
                  </h4>
                  {task.commentsCount && task.commentsCount > 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <MessageSquare className="h-3 w-3" /> {task.commentsCount}
                    </span>
                  ) : null}
                  {task.attachmentsCount && task.attachmentsCount > 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Paperclip className="h-3 w-3" /> {task.attachmentsCount}
                    </span>
                  ) : null}
                </div>

                {task.labels && task.labels.length > 0 && (
                  <div className="flex items-center gap-1">
                    {task.labels.map((l) => (
                      <span
                        key={l}
                        className="px-1.5 py-0.2 rounded text-[10px] bg-muted text-muted-foreground"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Selector (Takes 2/12 cols) */}
              <div className="col-span-2">
                <select
                  value={task.status}
                  disabled={isPending}
                  onChange={(e) =>
                    handleStatusChange(task.id, e.target.value as TaskStatus)
                  }
                  className="rounded-xl border border-border/70 bg-background px-2.5 py-1 text-xs font-medium text-foreground outline-none transition focus:border-indigo-500 cursor-pointer"
                >
                  <option value={TaskStatus.TODO}>To Do</option>
                  <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                  <option value={TaskStatus.DONE}>Done</option>
                </select>
              </div>

              {/* Priority Tag (Takes 2/12 cols) */}
              <div className="col-span-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${priority.style}`}
                >
                  {priority.label}
                </span>
              </div>

              {/* Assignee & Due Date (Takes 2/12 cols) */}
              <div className="col-span-2 flex items-center gap-3 text-xs text-muted-foreground">
                {task.assignee ? (
                  <div
                    title={task.assignee.name || task.assignee.email || "User"}
                    className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-[10px] text-white flex items-center justify-center font-bold shadow-xs shrink-0"
                  >
                    {task.assignee.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                ) : (
                  <div
                    title="Unassigned"
                    className="h-6 w-6 rounded-full bg-muted border border-dashed border-border/80 flex items-center justify-center text-muted-foreground text-[10px] shrink-0"
                  >
                    <User className="h-3 w-3" />
                  </div>
                )}

                {formattedDueDate && (
                  <span className="flex items-center gap-1 text-[11px]">
                    <Calendar className="h-3 w-3" /> {formattedDueDate}
                  </span>
                )}
              </div>

              {/* Action Button (Takes 1/12 cols) */}
              <div className="col-span-1 text-right">
                <button
                  onClick={() => router.push(`/projects/${projectId}/tasks/${task.id}`)}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-indigo-500 transition-colors"
                  title="View Task Details"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
