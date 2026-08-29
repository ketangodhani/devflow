import { format } from "date-fns";
import Link from "next/link";
import { FolderKanban, Calendar, Clock, SlidersHorizontal, ShieldAlert, ExternalLink } from "lucide-react";
import DeleteTaskDialog from "./delete-task-dialog";
import TaskStatusSelect from "./task-select-status";
import TaskPrioritySelect from "./task-priority-select";
import TaskLabels from "./task-labels";
import TaskDueDatePicker from "./task-due-date-picker";
import TaskAssigneeSelect from "./task-assignee-select";

interface Props {
  task: any;
  users: {
    id: string;
    name: string | null;
    email: string | null;
  }[];
}

export default function TaskSidebar({ task, users }: Props) {
  return (
    <div className="space-y-4 lg:sticky lg:top-20">
      {/* 1. Main Properties Card */}
      <div className="rounded-3xl border border-border/80 bg-card/60 p-5 backdrop-blur-xl shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Properties
          </h3>
        </div>

        <TaskStatusSelect
          taskId={task.id}
          currentStatus={task.status}
          projectId={task.projectId}
        />

        <TaskPrioritySelect
          taskId={task.id}
          currentPriority={task.priority}
          projectId={task.projectId}
        />

        <TaskAssigneeSelect
          taskId={task.id}
          currentAssigneeId={task.assigneeId}
          users={users}
          projectId={task.projectId}
        />

        <TaskDueDatePicker
          taskId={task.id}
          dueDate={task.dueDate}
          projectId={task.projectId}
        />

        <TaskLabels
          taskId={task.id}
          initialLabels={task.labels}
          projectId={task.projectId}
        />
      </div>

      {/* 2. Project Context & Metadata Card */}
      <div className="rounded-3xl border border-border/80 bg-card/60 p-5 backdrop-blur-xl shadow-xs space-y-3">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Context & Dates
        </h3>

        {/* Project Link */}
        {task.project && (
          <div className="flex items-center justify-between py-1 text-xs">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <FolderKanban className="h-3.5 w-3.5 text-indigo-400" />
              Project
            </span>
            <Link
              href={`/projects/${task.projectId}`}
              className="font-medium text-foreground hover:text-indigo-400 transition flex items-center gap-1 group"
            >
              <span className="truncate max-w-[130px]">{task.project.title}</span>
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        )}

        {/* Created Date */}
        <div className="flex items-center justify-between py-1 text-xs">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground/80" />
            Created
          </span>
          <span className="font-medium text-foreground">
            {format(new Date(task.createdAt), "MMM d, yyyy")}
          </span>
        </div>

        {/* Updated Date */}
        <div className="flex items-center justify-between py-1 text-xs">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-muted-foreground/80" />
            Updated
          </span>
          <span className="font-medium text-foreground">
            {format(new Date(task.updatedAt), "MMM d, yyyy")}
          </span>
        </div>
      </div>

      {/* 3. Danger Zone Card */}
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-4 backdrop-blur-xl shadow-xs">
        <DeleteTaskDialog
          taskId={task.id}
          projectId={task.projectId}
          taskTitle={task.title}
        />
      </div>
    </div>
  );
}
