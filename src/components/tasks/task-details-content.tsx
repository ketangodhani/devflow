"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ArrowLeft,
  Copy,
  Check,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import TaskHeader from "./task-header";
import TaskDescription from "./task-description";
import TaskSidebar from "./task-sidebar";
import TaskTabsSection from "./task-tabs-section";

interface Props {
  task: any;
  users: {
    id: string;
    name: string | null;
    email: string | null;
    image?: string | null;
  }[];
  currentUserId?: string;
}

export default function TaskDetailsContent({
  task,
  users,
  currentUserId,
}: Props) {
  const [copied, setCopied] = useState(false);

  function copyTaskLink() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Task link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const workspaceName =
    task.project?.workspace?.name || "Workspace";
  const projectTitle = task.project?.title || "Project";
  const shortTaskId = task.id.slice(-6).toUpperCase();

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Top Breadcrumbs & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Link
            href={`/projects/${task.projectId}`}
            className="flex items-center gap-1.5 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition -ml-1"
            title="Back to board"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <Link
            href="/dashboard"
            className="hover:text-foreground transition-colors font-medium"
          >
            {workspaceName}
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />

          <Link
            href="/projects"
            className="hover:text-foreground transition-colors font-medium"
          >
            Projects
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />

          <Link
            href={`/projects/${task.projectId}`}
            className="hover:text-foreground transition-colors font-medium flex items-center gap-1"
          >
            <FolderKanban className="h-3 w-3 text-indigo-400" />
            <span className="truncate max-w-[150px]">{projectTitle}</span>
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />

          <span className="font-semibold text-foreground font-mono text-[11px] bg-muted/80 px-2 py-0.5 rounded-md border border-border/60">
            TASK-{shortTaskId}
          </span>
        </div>

        {/* Top Right Action Bar */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyTaskLink}
            className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-card/60 px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted shadow-xs backdrop-blur-md"
            title="Copy link to task"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Grid */}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-start">
        {/* Left Column: Hero Header, Description, Collaboration Tabs */}
        <div className="space-y-6 min-w-0">
          <TaskHeader task={task} />

          <TaskDescription task={task} />

          <TaskTabsSection
            taskId={task.id}
            projectId={task.projectId}
            comments={task.comments || []}
            attachments={task.attachments || []}
            activities={task.activities || []}
            users={users}
            currentUserId={currentUserId}
          />
        </div>

        {/* Right Column: Properties & Metadata Inspector Sidebar */}
        <div className="min-w-0">
          <TaskSidebar task={task} users={users} />
        </div>
      </div>
    </div>
  );
}
