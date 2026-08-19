"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { deleteWorkspaceAction } from "../actions/delete-workspace";

interface Props {
  workspaceId: string;
  workspaceName: string;
}

export function DeleteWorkspaceDialog({ workspaceId, workspaceName }: Props) {
  const [open, setOpen] = useState(false);
  const [confirmName, setConfirmName] = useState(""); // Safety input state
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  // Agar user ka input workspace ke exact name se match nahi karta toh button disabled rahega
  // const isMatch = confirmName.trim().toLowerCase() === workspaceName.trim().toLowerCase();
  const isMatch = confirmName.trim() === "delete-my-workspace";

  function handleDelete() {
    if (!isMatch) return;

    startTransition(async () => {
      try {
        await deleteWorkspaceAction(workspaceId);

        toast.success("Workspace deleted successfully");
        setOpen(false);
        setConfirmName(""); // Reset input

        router.push("/projects");
        router.refresh();
      } catch {
        toast.error("Failed to delete workspace. Please try again.");
      }
    });
  }

 return (
  <Dialog open={open} onOpenChange={(val) => {
    setOpen(val);
    if (!val) setConfirmName("");
  }}>
    <DialogTrigger
      render={
        <Button 
          variant="destructive" 
          className="rounded-xl font-medium shadow-sm bg-red-600 hover:bg-red-700 active:bg-red-800 text-white transition-all duration-200"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Workspace
        </Button>
      }
    />

    {/* Added border-red-500/30 for container alert */}
    <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border border-red-500/30 bg-card shadow-2xl rounded-2xl">
      
      {/* 🔴 RED TOUCHPOINT 1: Premium Destructive Header Gradient */}
      <DialogHeader className="pt-6 px-6 pb-4 bg-gradient-to-b from-red-500/10 to-transparent border-b border-red-500/10">
        <div className="flex items-start gap-3">
          {/* Solid Red Icon Background for instant attention */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white shadow-sm shadow-red-500/20">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex flex-col text-left">
            <DialogTitle className="text-lg font-semibold tracking-tight text-red-600 dark:text-red-400">
              Delete workspace
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              This action is absolute and cannot be undone. You will lose access to all data.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="p-6 space-y-6">
        {/* 🔴 RED TOUCHPOINT 2: Warning Banner Left Border */}
        <div className="rounded-xl bg-muted/50 border-l-4 border-l-red-500 border-y border-r border-border/60 p-4 space-y-2 text-sm text-muted-foreground">
          <p>
            By deleting <strong className="text-foreground font-semibold">{workspaceName}</strong>, you will permanently remove:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-xs text-muted-foreground/90">
            <li>All projects and active repositories</li>
            <li>Tasks, issues, and sprint activities</li>
            <li>Team members and access permissions</li>
            <li>Billing history and subscription active plans</li>
          </ul>
        </div>

        {/* Safety Verification Input */}
        <div className="space-y-2.5">
          {/* Lowercase matching note with red badge */}
          <Label htmlFor="confirm-input" className="text-xs font-medium text-muted-foreground">
            To verify, type <span className="font-semibold text-red-600 dark:text-red-400 select-all bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">delete-my-workspace</span> below:
          </Label>
          <Input
            id="confirm-input"
            type="text"
            placeholder="Type 'delete-my-workspace' to confirm"
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
            disabled={pending}
            //  RED TOUCHPOINT 3: Dynamic Red Ring on Focus. This gives a clear visual cue that this input is critical.
            className="h-10 rounded-xl border-border bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:border-red-500 transition-all"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-2 px-6 py-4 bg-muted/30 border-t border-border/40">
        <Button
          variant="ghost"
          onClick={() => setOpen(false)}
          disabled={pending}
          className="rounded-xl text-sm"
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          disabled={pending || !isMatch}
          // Active state custom solid red button
          className="rounded-xl px-4 text-sm font-medium shadow-sm bg-red-600 hover:bg-red-700 text-white transition-all disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50"
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