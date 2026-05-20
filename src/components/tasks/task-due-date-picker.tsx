"use client";

import { useTransition } from "react";

import { CalendarIcon, X } from "lucide-react";

import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { updateTaskDueDate } from "@/actions/task/update-task-due-date";

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
  const [pending, startTransition] =
    useTransition();

  function handleSelect(date: Date | undefined) {
    startTransition(async () => {
      await updateTaskDueDate(
        taskId,
        date || null,
        projectId
      );
    });
  }

  function clearDate() {
    startTransition(async () => {
      await updateTaskDueDate(
        taskId,
        null,
        projectId
      );
    });
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-zinc-500">
        Due Date
      </p>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger >
            <Button
              variant="outline"
              className="w-full justify-start border-zinc-800 bg-zinc-900 text-left text-white hover:bg-zinc-800"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />

              {dueDate
                ? format(dueDate, "PPP")
                : "Pick a due date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto border-zinc-800 bg-zinc-950 p-0">
            <Calendar
              mode="single"
              selected={dueDate || undefined}
              onSelect={handleSelect}
            />
          </PopoverContent>
        </Popover>

        {dueDate && (
          <button
            onClick={clearDate}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:bg-zinc-800"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {pending && (
        <p className="text-xs text-zinc-500">
          Updating...
        </p>
      )}
    </div>
  );
}