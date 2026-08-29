"use client";

import { useTransition } from "react";
import { TaskStatus } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTaskStatusAction } from "@/actions/task/update-task-status";
import { CircleDot, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  taskId: string;
  currentStatus: TaskStatus;
  projectId: string;
}

export default function TaskStatusSelect({
  taskId,
  currentStatus,
  projectId,
}: Props) {
  const [pending, startTransition] = useTransition();

  function handleChange(value: TaskStatus | null) {
    if (!value) return;

    startTransition(async () => {
      try {
        await updateTaskStatusAction(taskId, value, projectId);
        toast.success(`Status updated to ${value.replace("_", " ")}`);
      } catch {
        toast.error("Failed to update status");
      }
    });
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Status
        </label>
        {pending && (
          <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
        )}
      </div>

      <Select defaultValue={currentStatus} onValueChange={handleChange}>
        <SelectTrigger className="w-full rounded-xl border-border/80 bg-background/60 text-foreground transition hover:bg-muted/40">
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="border-border bg-card text-foreground rounded-2xl shadow-xl">
          <SelectItem value="TODO">
            <div className="flex items-center gap-2">
              <CircleDot className="h-3.5 w-3.5 text-zinc-400" />
              <span>To Do</span>
            </div>
          </SelectItem>

          <SelectItem value="IN_PROGRESS">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              <span>In Progress</span>
            </div>
          </SelectItem>

          <SelectItem value="DONE">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Done</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}