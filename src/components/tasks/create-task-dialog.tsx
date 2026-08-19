"use client";

import { useState, useTransition } from "react";
import { Plus, CheckSquare, Loader2, Tag, Calendar, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createTask } from "@/actions/task";
import { toast } from "sonner";
import { TaskPriority, TaskStatus } from "@prisma/client";

interface UserOption {
  id: string;
  name: string | null;
  email: string | null;
}

interface CreateTaskDialogProps {
  projectId: string;
  defaultStatus?: TaskStatus;
  users?: UserOption[];
  trigger?: React.ReactNode;
}

export function CreateTaskDialog({
  projectId,
  defaultStatus = TaskStatus.TODO,
  users = [],
  trigger,
}: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [labels, setLabels] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }

    const formData = new FormData();
    formData.append("projectId", projectId);
    formData.append("title", title);
    if (description.trim()) formData.append("description", description);
    formData.append("status", status);
    formData.append("priority", priority);
    if (assigneeId) formData.append("assigneeId", assigneeId);
    if (dueDate) formData.append("dueDate", dueDate);
    if (labels.trim()) formData.append("labels", labels);

    startTransition(async () => {
      try {
        await createTask(formData);
        toast.success("Task created successfully");
        setTitle("");
        setDescription("");
        setLabels("");
        setDueDate("");
        setAssigneeId("");
        setOpen(false);
      } catch (error: any) {
        toast.error(error.message || "Failed to create task");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          (trigger as React.ReactElement) || (
            <Button className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-500/20 cursor-pointer">
              <Plus className="h-4 w-4" />
              <span>New Task</span>
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-[540px] rounded-3xl border-border bg-card p-6 shadow-2xl">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-500">
            <div className="h-8 w-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <CheckSquare className="h-4 w-4" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Create New Task
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Add a new backlog item or sprint task to your project workflow.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Implement WebSocket live sync"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Description (Optional)
            </label>
            <textarea
              placeholder="Add details, acceptance criteria, or context..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>

          {/* Grid Selectors: Status & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Status Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Column Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground outline-none transition focus:border-indigo-500"
              >
                <option value={TaskStatus.TODO}>To Do</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.DONE}>Done</option>
              </select>
            </div>

            {/* Priority Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground outline-none transition focus:border-indigo-500"
              >
                <option value={TaskPriority.LOW}>Low</option>
                <option value={TaskPriority.MEDIUM}>Medium</option>
                <option value={TaskPriority.HIGH}>High</option>
                <option value={TaskPriority.URGENT}>Urgent</option>
              </select>
            </div>
          </div>

          {/* Grid Selectors: Assignee & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Assignee */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Assignee
              </label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground outline-none transition focus:border-indigo-500"
              >
                <option value="">Unassigned</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name || user.email}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground outline-none transition focus:border-indigo-500"
              >
              </input>
            </div>
          </div>

          {/* Labels / Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Labels / Tags (Comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend, Auth, Bug"
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl border-border hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !title.trim()}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
