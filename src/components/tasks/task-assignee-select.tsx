"use client";

import { useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateTaskAssignee } from "@/actions/task/update-task-assignee";

interface User {
  id: string;
  name: string | null;
  email: string | null;
}

interface Props {
  taskId: string;
  currentAssigneeId: string | null;
  users: User[];
  projectId: string;
}

export default function TaskAssigneeSelect({
  taskId,
  currentAssigneeId,
  users,
  projectId,
}: Props) {
  const [pending, startTransition] = useTransition();

  function handleChange(value: string | null) {
    startTransition(async () => {
      await updateTaskAssignee(
        taskId,
        value === "unassigned" || value === null ? null : value,
        projectId,
      );
    });
  }

  const selectedUser = users.find((user) => user.id === currentAssigneeId);

  return (
    <div className="space-y-2">
      <p className="text-sm text-zinc-500">Assignee</p>

      <Select
        defaultValue={currentAssigneeId || "unassigned"}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-full border-zinc-800 bg-zinc-900 text-white">
          <SelectValue>
            {selectedUser
              ? selectedUser.name || selectedUser.email
              : "Unassigned"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="border-zinc-800 bg-zinc-950 text-white">
          <SelectItem value="unassigned">Unassigned</SelectItem>

          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name || user.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {pending && <p className="text-xs text-zinc-500">Updating...</p>}
    </div>
  );
}
