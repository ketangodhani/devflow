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
  const [pending, startTransition] =
    useTransition();

  function handleChange(value: TaskStatus | null) {
    if (!value) return;

    startTransition(async () => {
      await updateTaskStatusAction(
        taskId,
        value,
        projectId
      );
    });
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-zinc-500">
        Status
      </p>

      <Select
        defaultValue={currentStatus}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-full border-zinc-800 bg-zinc-900 text-white">
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="border-zinc-800 bg-zinc-950 text-white">
          <SelectItem value="TODO">
            Todo
          </SelectItem>

          <SelectItem value="IN_PROGRESS">
            In Progress
          </SelectItem>

          <SelectItem value="DONE">
            Done
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