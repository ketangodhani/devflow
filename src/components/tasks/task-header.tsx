import EditableTaskTitle from "./editable-task-title";
import { format, isPast, isToday } from "date-fns";
import {
  CircleDot,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Calendar as CalendarIcon,
  User as UserIcon,
  Tag,
} from "lucide-react";
import { TaskPriority, TaskStatus } from "@prisma/client";

interface Props {
  task: any;
}

export default function TaskHeader({ task }: Props) {
  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "DONE":
        return {
          label: "Done",
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
          className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        };
      case "IN_PROGRESS":
        return {
          label: "In Progress",
          icon: <Clock className="h-3.5 w-3.5" />,
          className: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        };
      case "TODO":
      default:
        return {
          label: "To Do",
          icon: <CircleDot className="h-3.5 w-3.5" />,
          className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
        };
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "URGENT":
        return {
          label: "Urgent",
          icon: <Flame className="h-3.5 w-3.5 text-rose-500" />,
          className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        };
      case "HIGH":
        return {
          label: "High",
          icon: <ArrowUp className="h-3.5 w-3.5 text-amber-500" />,
          className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
      case "MEDIUM":
        return {
          label: "Medium",
          icon: <ArrowRight className="h-3.5 w-3.5 text-sky-400" />,
          className: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        };
      case "LOW":
      default:
        return {
          label: "Low",
          icon: <ArrowDown className="h-3.5 w-3.5 text-zinc-400" />,
          className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
        };
    }
  };

  const statusBadge = getStatusBadge(task.status);
  const priorityBadge = getPriorityBadge(task.priority);

  const isOverdue =
    task.dueDate &&
    task.status !== "DONE" &&
    isPast(new Date(task.dueDate)) &&
    !isToday(new Date(task.dueDate));

  return (
    <div className="space-y-4 pb-2">
      {/* Title */}
      <EditableTaskTitle
        taskId={task.id}
        initialTitle={task.title}
        projectId={task.projectId}
      />

      {/* Meta Pills Row */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {/* Status Pill */}
        <div
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${statusBadge.className}`}
        >
          {statusBadge.icon}
          <span>{statusBadge.label}</span>
        </div>

        {/* Priority Pill */}
        <div
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${priorityBadge.className}`}
        >
          {priorityBadge.icon}
          <span>{priorityBadge.label}</span>
        </div>

        {/* Assignee Pill */}
        <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/60 px-3 py-1 text-xs font-medium text-foreground">
          {task.assignee ? (
            <>
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] font-bold text-indigo-400">
                {(task.assignee.name || task.assignee.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
              <span className="truncate max-w-[120px]">
                {task.assignee.name || task.assignee.email}
              </span>
            </>
          ) : (
            <>
              <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Unassigned</span>
            </>
          )}
        </div>

        {/* Due Date Pill */}
        {task.dueDate && (
          <div
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
              isOverdue
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-border/80 bg-muted/60 text-foreground"
            }`}
          >
            {isOverdue ? (
              <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
            ) : (
              <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            <span>
              {isOverdue ? "Overdue: " : "Due "}
              {format(new Date(task.dueDate), "MMM d, yyyy")}
            </span>
          </div>
        )}

        {/* Labels chips */}
        {task.labels && task.labels.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {task.labels.map((label: string) => (
              <span
                key={label}
                className="flex items-center gap-1 rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                <Tag className="h-3 w-3 text-indigo-400" />
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}