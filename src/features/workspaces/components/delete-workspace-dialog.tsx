"use client";

import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { deleteWorkspaceAction } from "../actions/delete-workspace";

interface Props {
  workspaceId: string;
  workspaceName: string;
}

export function DeleteWorkspaceDialog({
  workspaceId,
  workspaceName,
}: Props) {
  const [open, setOpen] = useState(false);

  const [pending, startTransition] =
    useTransition();

  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteWorkspaceAction(
          workspaceId
        );

        toast.success(
          "Workspace deleted"
        );

        setOpen(false);

        router.push("/projects");
        router.refresh();
      } catch {
        toast.error(
          "Failed to delete workspace"
        );
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <Button
          variant="destructive"
        >
          Delete Workspace
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Workspace
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This will permanently delete{" "}
            <strong>
              {workspaceName}
            </strong>
            .
          </p>

          <p className="text-sm text-red-500">
            Projects, tasks,
            activities, and members
            will be removed forever.
          </p>

          <Button
            variant="destructive"
            className="w-full"
            disabled={pending}
            onClick={handleDelete}
          >
            {pending
              ? "Deleting..."
              : "Delete Workspace"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}