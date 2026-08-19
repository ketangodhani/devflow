"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Loader2, Building2 } from "lucide-react"; // Icons for premium look

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
import { Label } from "@/components/ui/label"; // Imported Label for professional form structure

import { createWorkspaceAction } from "../actions/create-workspace";
import { setActiveWorkspace } from "../actions/set-active-workspace";

export function CreateWorkspaceDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleCreate() {
    if (!name.trim()) {
      toast.error("Workspace name cannot be empty");
      return;
    }

    startTransition(async () => {
      try {
        const workspace = await createWorkspaceAction(name);
        await setActiveWorkspace(workspace.id);

        toast.success("Workspace created successfully!");
        setName("");
        setOpen(false);
        router.refresh();
      } catch {
        toast.error("Failed to create workspace");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 rounded-xl border-dashed border-border/80 hover:border-foreground/30 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            <span>Create Workspace</span>
          </Button>
        }
      />

      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border border-border/60 bg-card shadow-2xl rounded-2xl">
        {/* Header Section with subtle background tint */}
        <DialogHeader className="pt-6 px-6 pb-4 bg-muted/30 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
                Create new workspace
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Workspaces hold your projects, team, and billing.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="workspace-name" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Workspace Name
            </Label>
            <Input
              id="workspace-name"
              placeholder="e.g. Acme Corp, Pied Piper"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={pending}
              className="h-10 rounded-xl border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-foreground transition-all"
              maxLength={32}
            />
            {name.trim().length > 0 && (
              <p className="text-xs text-muted-foreground/80 px-1 transition-all">
                Your workspace URL will be: <span className="font-medium text-foreground">devflow.com/{name.toLowerCase().replace(/\s+/g, '-')}</span>
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions: Standard SaaS Cancel/Submit Layout */}
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
            onClick={handleCreate} 
            disabled={pending || !name.trim()} 
            className="rounded-xl px-4 text-sm font-medium shadow-sm transition-all"
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Workspace"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}