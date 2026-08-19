"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { motion } from "framer-motion";
import {
  GripVertical,
  Calendar,
  MessageSquare,
  Paperclip,
  Clock,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface TaskUser {
  id: string;
  name: string | null;
  email: string | null;
  image?: string | null;
}

export interface TaskCardData {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  projectId: string;
  priority: TaskPriority;
  labels: string[];
  dueDate?: Date | string | null;
  assignee?: TaskUser | null;
  commentsCount?: number;
  attachmentsCount?: number;
}

interface TaskCardProps {
  task: TaskCardData;
}

export function TaskCard({ task }: TaskCardProps) {
  const { id, title, description, projectId, priority, labels, dueDate, assignee, commentsCount = 0, attachmentsCount = 0 } =
    task;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const router = useRouter();

  const priorityStyles: Record<TaskPriority, { bg: string; text: string; label: string }> = {
    LOW: {
      bg: "bg-zinc-500/10 border-zinc-500/20",
      text: "text-zinc-400",
      label: "Low",
    },
    MEDIUM: {
      bg: "bg-blue-500/10 border-blue-500/20",
      text: "text-blue-500 dark:text-blue-400",
      label: "Medium",
    },
    HIGH: {
      bg: "bg-amber-500/10 border-amber-500/20",
      text: "text-amber-500 dark:text-amber-400",
      label: "High",
    },
    URGENT: {
      bg: "bg-red-500/10 border-red-500/20",
      text: "text-red-500 dark:text-red-400",
      label: "Urgent",
    },
  };

  const currentPriority = priorityStyles[priority] || priorityStyles.MEDIUM;

  const formattedDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : null;

  const isOverdue =
    dueDate &&
    new Date(dueDate) < new Date() &&
    task.status !== TaskStatus.DONE;

  return (
    <motion.div
      layout
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-2xl border border-border/80 bg-background/95 p-4 shadow-xs hover:shadow-md hover:border-indigo-500/40 transition-all duration-200 ${
        isDragging ? "opacity-40 shadow-2xl ring-2 ring-indigo-500 z-50" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Main Card Clickable Body */}
        <div
          onClick={() => router.push(`/projects/${projectId}/tasks/${id}`)}
          className="flex-1 cursor-pointer space-y-2.5"
        >
          {/* Priority & Labels Row */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Priority Badge */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${currentPriority.bg} ${currentPriority.text}`}
            >
              {currentPriority.label}
            </span>

            {/* Labels */}
            {labels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-muted text-muted-foreground border border-border/50"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Task Title */}
          <h4 className="text-sm font-semibold text-foreground group-hover:text-indigo-500 transition-colors leading-snug line-clamp-2">
            {title}
          </h4>

          {/* Description Snippet */}
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Card Footer: Due Date, Assignee, Comments, Attachments */}
          <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
            {/* Left Info: Due Date or Attachment/Comment Badges */}
            <div className="flex items-center gap-3">
              {formattedDueDate && (
                <span
                  className={`flex items-center gap-1 font-medium ${
                    isOverdue ? "text-red-500 font-semibold" : "text-muted-foreground"
                  }`}
                  title={isOverdue ? "Overdue" : "Due date"}
                >
                  <Calendar className="h-3 w-3" />
                  <span>{formattedDueDate}</span>
                </span>
              )}

              {commentsCount > 0 && (
                <span className="flex items-center gap-1 hover:text-foreground">
                  <MessageSquare className="h-3 w-3" />
                  <span>{commentsCount}</span>
                </span>
              )}

              {attachmentsCount > 0 && (
                <span className="flex items-center gap-1 hover:text-foreground">
                  <Paperclip className="h-3 w-3" />
                  <span>{attachmentsCount}</span>
                </span>
              )}
            </div>

            {/* Right: Assignee Avatar */}
            {assignee ? (
              <div
                title={`Assigned to ${assignee.name || assignee.email}`}
                className="h-5 w-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-[10px] text-white flex items-center justify-center font-bold shadow-xs ring-1 ring-background"
              >
                {assignee.name?.charAt(0).toUpperCase() || "U"}
              </div>
            ) : (
              <div
                title="Unassigned"
                className="h-5 w-5 rounded-full bg-muted/60 border border-dashed border-border/80 flex items-center justify-center text-muted-foreground/60 text-[9px]"
              >
                <User className="h-2.5 w-2.5" />
              </div>
            )}
          </div>
        </div>

        {/* Drag Handle */}
        <button
          {...listeners}
          {...attributes}
          className="cursor-grab text-muted-foreground/40 hover:text-foreground active:cursor-grabbing p-1 rounded-md hover:bg-muted transition-colors shrink-0 mt-0.5"
          aria-label="Drag task"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
