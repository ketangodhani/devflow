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
import { User as UserIcon, UserMinus, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
    const newAssigneeId =
      value === "unassigned" || value === null ? null : value;

    startTransition(async () => {
      try {
        await updateTaskAssignee(taskId, newAssigneeId, projectId);
        const assigned = users.find((u) => u.id === newAssigneeId);
        toast.success(
          assigned
            ? `Assigned to ${assigned.name || assigned.email}`
            : "Task unassigned"
        );
      } catch {
        toast.error("Failed to update assignee");
      }
    });
  }

  const selectedUser = users.find((user) => user.id === currentAssigneeId);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Assignee
        </label>
        {pending && (
          <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
        )}
      </div>

      <Select
        defaultValue={currentAssigneeId || "unassigned"}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-full rounded-xl border-border/80 bg-background/60 text-foreground transition hover:bg-muted/40">
          <SelectValue>
            {selectedUser ? (
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] font-bold text-indigo-400">
                  {(selectedUser.name || selectedUser.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>
                <span className="truncate max-w-[170px]">
                  {selectedUser.name || selectedUser.email}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <UserIcon className="h-3.5 w-3.5" />
                <span>Unassigned</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="border-border bg-card text-foreground rounded-2xl shadow-xl">
          <SelectItem value="unassigned">
            <div className="flex items-center gap-2 text-muted-foreground">
              <UserMinus className="h-3.5 w-3.5" />
              <span>Unassigned</span>
            </div>
          </SelectItem>

          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] font-bold text-indigo-400">
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </div>
                <span className="truncate">
                  {user.name || user.email}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
