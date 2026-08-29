"use client";

import { useTransition, useState } from "react";
import { CalendarIcon, X, Loader2, AlertTriangle } from "lucide-react";
import { format, addDays, isPast, isToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateTaskDueDate } from "@/actions/task/update-task-due-date";
import { toast } from "sonner";

interface Props {
  taskId: string;
  dueDate: Date | null;
  projectId: string;
}

export default function TaskDueDatePicker({
  taskId,
  dueDate,
  projectId,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function handleSelect(date: Date | undefined) {
    setOpen(false);
    startTransition(async () => {
      try {
        await updateTaskDueDate(taskId, date || null, projectId);
        toast.success(
          date
            ? `Due date set to ${format(date, "MMM d, yyyy")}`
            : "Due date cleared"
        );
      } catch {
        toast.error("Failed to update due date");
      }
    });
  }

  function setPreset(daysToAdd: number) {
    const targetDate = addDays(new Date(), daysToAdd);
    handleSelect(targetDate);
  }

  function clearDate(e: React.MouseEvent) {
    e.stopPropagation();
    handleSelect(undefined);
  }

  const isOverdue =
    dueDate && isPast(new Date(dueDate)) && !isToday(new Date(dueDate));

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Due Date
        </label>
        {pending && (
          <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
        )}
      </div>

      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs font-medium transition ${isOverdue
                ? "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                : "border-border/80 bg-background/60 text-foreground hover:bg-muted/40"
              }`}
          >
            <div className="flex items-center gap-2 truncate">
              {isOverdue ? (
                <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0" />
              ) : (
                <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              )}
              <span className="truncate">
                {dueDate
                  ? format(new Date(dueDate), "MMM d, yyyy")
                  : "No due date"}
              </span>
            </div>

            {dueDate && (
              <span
                onClick={clearDate}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 ml-1"
                title="Clear date"
              >
                <X className="h-3.5 w-3.5" />
              </span>
            )}
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-auto p-3 border-border bg-card text-foreground rounded-2xl shadow-2xl space-y-3"
          >
            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 border-b border-border/60 pb-2.5">
              <button
                type="button"
                onClick={() => setPreset(0)}
                className="flex-1 rounded-lg bg-muted px-2 py-1 text-[11px] font-medium text-foreground hover:bg-muted/80 transition text-center"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setPreset(1)}
                className="flex-1 rounded-lg bg-muted px-2 py-1 text-[11px] font-medium text-foreground hover:bg-muted/80 transition text-center"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => setPreset(7)}
                className="flex-1 rounded-lg bg-muted px-2 py-1 text-[11px] font-medium text-foreground hover:bg-muted/80 transition text-center"
              >
                In 1 Week
              </button>
            </div>

            <Calendar
              mode="single"
              selected={dueDate ? new Date(dueDate) : undefined}
              onSelect={handleSelect}

            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}