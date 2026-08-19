"use client";

import { useState } from "react";
import {
  FolderKanban,
  Shield,
  Command,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Lock,
  Unlock,
  Users2,
  Flame,
  Search,
  Check,
  Send,
  AtSign,
  Paperclip,
  Clock,
  Tag,
} from "lucide-react";

export function LandingBentoGrid() {
  // Feature 1 State: Kanban View Mode
  const [kanbanMode, setKanbanMode] = useState<"status" | "priority" | "assignee">("status");

  // Feature 2 State: RBAC Role Simulator
  const [activeRole, setActiveRole] = useState<"OWNER" | "ADMIN" | "MEMBER">("OWNER");

  // Feature 3 State: Command Palette Preset Filter
  const [activeCmd, setActiveCmd] = useState<"project" | "task" | "workspace">("task");

  // Feature 4 State: Interactive Reactions
  const [reactions, setReactions] = useState<{ [key: string]: number }>({
    rocket: 12,
    fire: 8,
    thumbsUp: 15,
  });
  const [hasReacted, setHasReacted] = useState<{ [key: string]: boolean }>({});

  const toggleReaction = (key: string) => {
    setHasReacted((prev) => ({ ...prev, [key]: !prev[key] }));
    setReactions((prev) => ({
      ...prev,
      [key]: hasReacted[key] ? prev[key] - 1 : prev[key] + 1,
    }));
  };

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Everything your team needs to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              ship 10x faster.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Built from first principles for modern developer ergonomics. Test each interactive feature below.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* =========================================================================
              BENTO CARD 1: Agile Kanban Sprint Board (Takes 7 / 12 columns)
              ========================================================================= */}
          <div className="md:col-span-7 rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6 group hover:border-indigo-500/40 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <FolderKanban className="h-5 w-5" />
                </div>

                {/* Interactive Toggle Control for Kanban Mode */}
                <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60 text-xs">
                  <button
                    onClick={() => setKanbanMode("status")}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      kanbanMode === "status"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Status
                  </button>
                  <button
                    onClick={() => setKanbanMode("priority")}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      kanbanMode === "priority"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Priority
                  </button>
                  <button
                    onClick={() => setKanbanMode("assignee")}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      kanbanMode === "assignee"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Assignee
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  Dynamic Kanban Sprint Engine
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Drag, reorder, and triage tasks effortlessly with optimistic UI updates and custom workflow filters.
                </p>
              </div>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="rounded-2xl border border-border/70 bg-background/60 p-4 space-y-3">
              {kanbanMode === "status" && (
                <div className="grid grid-cols-3 gap-2 text-xs animate-in fade-in duration-200">
                  <div className="p-2.5 rounded-xl bg-card border border-border/70 space-y-2">
                    <span className="font-semibold text-muted-foreground flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-zinc-400" /> Todo
                    </span>
                    <div className="p-2 rounded-lg bg-muted/40 border border-border/40 text-[11px] font-medium">
                      OAuth v5 Callback
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card border border-indigo-500/30 space-y-2">
                    <span className="font-semibold text-indigo-500 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" /> Doing
                    </span>
                    <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-[11px] font-medium text-indigo-500">
                      Bento Grid UI
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card border border-emerald-500/30 space-y-2">
                    <span className="font-semibold text-emerald-500 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Done
                    </span>
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      Prisma Schema
                    </div>
                  </div>
                </div>
              )}

              {kanbanMode === "priority" && (
                <div className="grid grid-cols-3 gap-2 text-xs animate-in fade-in duration-200">
                  <div className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                    <span className="font-semibold text-red-500">🔴 URGENT</span>
                    <div className="p-2 rounded-lg bg-card border border-red-500/20 text-[11px] font-medium">
                      API Latency Fix
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                    <span className="font-semibold text-amber-500">🟡 HIGH</span>
                    <div className="p-2 rounded-lg bg-card border border-amber-500/20 text-[11px] font-medium">
                      Stripe Webhooks
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-2">
                    <span className="font-semibold text-blue-500">🔵 MEDIUM</span>
                    <div className="p-2 rounded-lg bg-card border border-blue-500/20 text-[11px] font-medium">
                      Dark Mode Tweak
                    </div>
                  </div>
                </div>
              )}

              {kanbanMode === "assignee" && (
                <div className="grid grid-cols-3 gap-2 text-xs animate-in fade-in duration-200">
                  <div className="p-2.5 rounded-xl bg-card border border-border/70 space-y-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <div className="h-4 w-4 rounded-full bg-indigo-500 text-[9px] text-white flex items-center justify-center font-bold">K</div>
                      Ketan
                    </span>
                    <div className="p-2 rounded-lg bg-muted/40 text-[11px]">3 Tasks Assigned</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card border border-border/70 space-y-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <div className="h-4 w-4 rounded-full bg-purple-500 text-[9px] text-white flex items-center justify-center font-bold">A</div>
                      Alex
                    </span>
                    <div className="p-2 rounded-lg bg-muted/40 text-[11px]">2 Tasks Assigned</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-card border border-border/70 space-y-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <div className="h-4 w-4 rounded-full bg-pink-500 text-[9px] text-white flex items-center justify-center font-bold">S</div>
                      Sarah
                    </span>
                    <div className="p-2 rounded-lg bg-muted/40 text-[11px]">4 Tasks Assigned</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              BENTO CARD 2: Multi-Tenant RBAC & Isolation (Takes 5 / 12 columns)
              ========================================================================= */}
          <div className="md:col-span-5 rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6 group hover:border-purple-500/40 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                  <Shield className="h-5 w-5" />
                </div>

                {/* Role Switcher Toggle */}
                <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60 text-xs">
                  {(["OWNER", "ADMIN", "MEMBER"] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setActiveRole(role)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        activeRole === role
                          ? "bg-purple-600 text-white shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  Multi-Tenant RBAC Security
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Scoped data isolation with fine-grained team member permissions.
                </p>
              </div>
            </div>

            {/* Permission Matrix Live Preview */}
            <div className="rounded-2xl border border-border/70 bg-background/60 p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Workspace Deletion</span>
                {activeRole === "OWNER" ? (
                  <span className="flex items-center gap-1 text-emerald-500 font-medium">
                    <Check className="h-3.5 w-3.5" /> Full Access
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500 font-medium">
                    <Lock className="h-3.5 w-3.5" /> Restricted
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Member Invitations</span>
                {activeRole === "MEMBER" ? (
                  <span className="flex items-center gap-1 text-red-500 font-medium">
                    <Lock className="h-3.5 w-3.5" /> Restricted
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-500 font-medium">
                    <Check className="h-3.5 w-3.5" /> Authorized
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Task Creation & Move</span>
                <span className="flex items-center gap-1 text-emerald-500 font-medium">
                  <Check className="h-3.5 w-3.5" /> Allowed
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              BENTO CARD 3: Lightning Command Bar (Ctrl + K) (Takes 5 / 12 columns)
              ========================================================================= */}
          <div className="md:col-span-5 rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6 group hover:border-pink-500/40 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500">
                  <Command className="h-5 w-5" />
                </div>

                <kbd className="px-2 py-1 rounded-md border border-border bg-muted text-xs font-mono text-muted-foreground">
                  Ctrl + K
                </kbd>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  Global Command Bar
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Navigate projects, search backlogs, and trigger actions without lifting your hands from the keyboard.
                </p>
              </div>
            </div>

            {/* Interactive Command Presets */}
            <div className="rounded-2xl border border-border/70 bg-background/60 p-4 space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-card border border-border/80 text-xs text-muted-foreground">
                <Search className="h-3.5 w-3.5" />
                <span>Quick search commands...</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  onClick={() => setActiveCmd("project")}
                  className={`p-1.5 rounded-lg text-[11px] font-medium border text-center transition-all ${
                    activeCmd === "project"
                      ? "bg-pink-500/10 border-pink-500/40 text-pink-500 font-semibold"
                      : "border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  📁 Projects
                </button>
                <button
                  onClick={() => setActiveCmd("task")}
                  className={`p-1.5 rounded-lg text-[11px] font-medium border text-center transition-all ${
                    activeCmd === "task"
                      ? "bg-pink-500/10 border-pink-500/40 text-pink-500 font-semibold"
                      : "border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ⚡ Tasks
                </button>
                <button
                  onClick={() => setActiveCmd("workspace")}
                  className={`p-1.5 rounded-lg text-[11px] font-medium border text-center transition-all ${
                    activeCmd === "workspace"
                      ? "bg-pink-500/10 border-pink-500/40 text-pink-500 font-semibold"
                      : "border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🏢 Spaces
                </button>
              </div>

              <div className="p-2 rounded-lg bg-card border border-border/50 text-[11px] text-foreground flex items-center justify-between animate-in fade-in">
                <span>
                  {activeCmd === "project" && "Jump to: Mobile iOS App Sprint"}
                  {activeCmd === "task" && "Jump to: Task #104 (Fix OAuth Flow)"}
                  {activeCmd === "workspace" && "Switch to: Enterprise Dev Team"}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">↵ Enter</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              BENTO CARD 4: Team Discussion Stream & Attachments (Takes 7 / 12 columns)
              ========================================================================= */}
          <div className="md:col-span-7 rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6 group hover:border-emerald-500/40 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <MessageSquare className="h-5 w-5" />
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Paperclip className="h-3.5 w-3.5 text-emerald-500" />
                  <span>UploadThing Integrated</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  Threaded Discussions & Smart Mentions
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Collaborate in real time with @mentions, rich task attachments, and interactive reaction chips.
                </p>
              </div>
            </div>

            {/* Interactive Comment & Reaction Simulator */}
            <div className="rounded-2xl border border-border/70 bg-background/60 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  K
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">Ketan Godhani</span>
                    <span className="text-[10px] text-muted-foreground">Just now</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-indigo-500 font-medium">@sarah</span> The new PostgreSQL migration and NextAuth v5 session tokens are merged into staging.
                  </p>

                  {/* Interactive Reaction Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => toggleReaction("rocket")}
                      className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 border transition-all ${
                        hasReacted.rocket
                          ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-500"
                          : "border-border/60 hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      🚀 {reactions.rocket}
                    </button>
                    <button
                      onClick={() => toggleReaction("fire")}
                      className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 border transition-all ${
                        hasReacted.fire
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-500"
                          : "border-border/60 hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      🔥 {reactions.fire}
                    </button>
                    <button
                      onClick={() => toggleReaction("thumbsUp")}
                      className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 border transition-all ${
                        hasReacted.thumbsUp
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-500"
                          : "border-border/60 hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      👍 {reactions.thumbsUp}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
