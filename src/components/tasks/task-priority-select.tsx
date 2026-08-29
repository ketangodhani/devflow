"use client";

import { useTransition } from "react";
import { TaskPriority } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTaskPriority } from "@/actions/task/update-task-priority";
import { Flame, ArrowUp, ArrowRight, ArrowDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  taskId: string;
  currentPriority: TaskPriority;
  projectId: string;
}

export default function TaskPrioritySelect({
  taskId,
  currentPriority,
  projectId,
}: Props) {
  const [pending, startTransition] = useTransition();

  function handleChange(value: TaskPriority | null) {
    if (!value) return;

    startTransition(async () => {
      try {
        await updateTaskPriority(taskId, value, projectId);
        toast.success(`Priority updated to ${value.toLowerCase()}`);
      } catch {
        toast.error("Failed to update priority");
      }
    });
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Priority
        </label>
        {pending && (
          <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
        )}
      </div>

      <Select defaultValue={currentPriority} onValueChange={handleChange}>
        <SelectTrigger className="w-full rounded-xl border-border/80 bg-background/60 text-foreground transition hover:bg-muted/40">
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="border-border bg-card text-foreground rounded-2xl shadow-xl">
          <SelectItem value="LOW">
            <div className="flex items-center gap-2">
              <ArrowDown className="h-3.5 w-3.5 text-zinc-400" />
              <span>Low</span>
            </div>
          </SelectItem>

          <SelectItem value="MEDIUM">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-3.5 w-3.5 text-sky-400" />
              <span>Medium</span>
            </div>
          </SelectItem>

          <SelectItem value="HIGH">
            <div className="flex items-center gap-2">
              <ArrowUp className="h-3.5 w-3.5 text-amber-500" />
              <span>High</span>
            </div>
          </SelectItem>

          <SelectItem value="URGENT">
            <div className="flex items-center gap-2">
              <Flame className="h-3.5 w-3.5 text-rose-500" />
              <span className="font-semibold text-rose-400">Urgent</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}