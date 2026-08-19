"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteTask } from "@/actions/task/delete-task";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  taskId: string;
  projectId: string;
  taskTitle: string;
}

export default function DeleteTaskDialog({
  taskId,
  projectId,
  taskTitle,
}: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const router = useRouter();


  function handleDelete() {

    startTransition(async () => {
      try {
        await deleteTask(taskId, projectId);

        toast.success("Task deleted successfully");

        setOpen(false);

        router.push(`/projects/${projectId}`);
        router.refresh();
      } catch {
        toast.error("Failed to delete task");
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          toast.dismiss();
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="destructive"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500/20 disabled:opacity-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Task
          </Button>
        }
      />

      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border border-red-500/30 rounded-2xl">
        {/* Header */}
        <DialogHeader className="pt-6 px-6 pb-4 bg-gradient-to-b from-red-500/10 to-transparent border-b border-red-500/10">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-red-600 dark:text-red-400">
                Delete Task
              </DialogTitle>

              <DialogDescription className="mt-1 text-xs">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="rounded-xl bg-muted/50 border-l-4 border-l-red-500 border-y border-r border-border/60 p-4">
            <p className="text-sm text-muted-foreground">
              You are about to permanently delete:
            </p>

            <p className="mt-2 font-semibold text-foreground">
              {taskTitle}
            </p>

            <ul className="mt-3 list-disc list-inside text-xs text-muted-foreground space-y-1">
              <li>Task details and description</li>
              <li>Comments and activity history</li>
              <li>Attachments associated with this task</li>
              <li>All linked task data</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t bg-muted/30">
          <Button
            variant="ghost"
            disabled={pending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDelete}
            disabled={pending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Permanently Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}