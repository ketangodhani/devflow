"use client";

import { useState, useTransition } from "react";
import { Plus, FolderPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createProject } from "@/actions/project";
import { toast } from "sonner";

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Project title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    startTransition(async () => {
      try {
        await createProject(formData);
        toast.success("Project created successfully");
        setTitle("");
        setDescription("");
        setOpen(false);
      } catch (error: any) {
        toast.error(error.message || "Failed to create project");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-500/20 cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[480px] rounded-3xl border-border bg-card p-6 shadow-2xl">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-500">
            <div className="h-8 w-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <FolderPlus className="h-4 w-4" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Create New Project
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Initialize a new collaborative development space for your workspace.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Mobile iOS Client, API Core V2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Description (Optional)
            </label>
            <textarea
              placeholder="Brief overview of project goals and scope..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
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
                "Create Project"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
