"use client";

import { useState } from "react";
import { MessageSquare, Paperclip, Activity, Sparkles } from "lucide-react";
import CommentForm from "@/components/comments/comment-form";
import CommentList from "@/components/comments/comment-list";
import TaskAttachmentsSection from "@/components/attachments/task-attachment-section";
import TaskActivity from "./task-activity";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image?: string | null;
}

interface Props {
  taskId: string;
  projectId: string;
  comments: any[];
  attachments: any[];
  activities: any[];
  users: User[];
  currentUserId?: string;
}

type TabType = "comments" | "attachments" | "activity";

export default function TaskTabsSection({
  taskId,
  projectId,
  comments,
  attachments,
  activities,
  users,
  currentUserId,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("comments");

  return (
    <div className="rounded-3xl border border-border/80 bg-card/60 p-6 backdrop-blur-xl shadow-xs space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-1.5 rounded-2xl bg-muted/70 p-1 border border-border/60">
          <button
            type="button"
            onClick={() => setActiveTab("comments")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === "comments"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
            <span>Comments</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === "comments"
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "bg-muted-foreground/20 text-muted-foreground"
              }`}
            >
              {comments.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("attachments")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === "attachments"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Paperclip className="h-3.5 w-3.5 text-purple-400" />
            <span>Attachments</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === "attachments"
                  ? "bg-purple-500/15 text-purple-400"
                  : "bg-muted-foreground/20 text-muted-foreground"
              }`}
            >
              {attachments.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("activity")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === "activity"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>Activity</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === "activity"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-muted-foreground/20 text-muted-foreground"
              }`}
            >
              {activities.length}
            </span>
          </button>
        </div>

        <div className="text-xs text-muted-foreground hidden sm:block">
          {activeTab === "comments" && "Collaborate and leave notes with your team"}
          {activeTab === "attachments" && "Manage design files, screenshots, and assets"}
          {activeTab === "activity" && "Audit log of task history & state transitions"}
        </div>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "comments" && (
          <div className="space-y-6">
            <CommentForm
              taskId={taskId}
              projectId={projectId}
              users={users}
            />

            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Discussion ({comments.length})
              </h3>
              <CommentList
                comments={comments}
                projectId={projectId}
                taskId={taskId}
                currentUserId={currentUserId}
              />
            </div>
          </div>
        )}

        {activeTab === "attachments" && (
          <TaskAttachmentsSection
            taskId={taskId}
            projectId={projectId}
            initialAttachments={attachments}
          />
        )}

        {activeTab === "activity" && (
          <div className="pt-2">
            <TaskActivity activities={activities} />
          </div>
        )}
      </div>
    </div>
  );
}
