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
  const [pending, startTransition] =
    useTransition();

  function handleChange(value: TaskPriority | null) {
    if (!value) return;

    startTransition(async () => {
      await updateTaskPriority(
        taskId,
        value,
        projectId
      );
    });
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-zinc-500">
        Priority
      </p>

      <Select
        defaultValue={currentPriority}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-full border-zinc-800 bg-zinc-900 text-white">
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="border-zinc-800 bg-zinc-950 text-white">
          <SelectItem value="LOW">
            Low
          </SelectItem>

          <SelectItem value="MEDIUM">
            Medium
          </SelectItem>

          <SelectItem value="HIGH">
            High
          </SelectItem>

          <SelectItem value="URGENT">
            Urgent
          </SelectItem>
        </SelectContent>
      </Select>

      {pending && (
        <p className="text-xs text-zinc-500">
          Updating...
        </p>
      )}
    </div>
  );
}