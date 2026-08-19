"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Play,
  FolderKanban,
  CheckCircle2,
  Users2,
  Layers,
  Activity,
  CheckSquare,
  Clock,
  Flame,
  ShieldCheck,
  TrendingUp,
  GripVertical,
} from "lucide-react";

export function LandingHero() {
  const [activeTab, setActiveTab] = useState<"kanban" | "analytics" | "activity">("kanban");

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] md:w-[900px] md:h-[450px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Floating Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-medium backdrop-blur-md shadow-sm animate-in fade-in zoom-in-95 duration-500">
          <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" />
          <span>The Next-Gen Developer Workspace Platform</span>
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span className="font-semibold">DevFlow 2.0</span>
        </div>

        {/* Hero Main Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Manage projects like a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              modern engineering team.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Eliminate Jira friction. DevFlow unites agile Kanban sprints, isolated multi-tenant workspaces, lightning-fast keyboard workflows, and real-time team collaboration.
          </p>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Start Building Free</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-medium border border-border bg-card/60 backdrop-blur text-foreground hover:bg-muted transition-all duration-200 hover:-translate-y-0.5"
          >
            <Play className="h-4 w-4 text-indigo-500 fill-indigo-500" />
            <span>Interactive Demo</span>
          </a>
        </div>

        {/* Social Proof Trust Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Multi-Tenant RBAC</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-amber-500" />
            <span>Zero Configuration Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-indigo-500" />
            <span>Keyboard First (Ctrl + K)</span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE LIVE PRODUCT PREVIEW WIDGET
            ========================================================================= */}
        <div className="pt-8 max-w-5xl mx-auto">
          <div className="rounded-3xl border border-border/80 bg-card/90 backdrop-blur-2xl shadow-2xl overflow-hidden p-2 sm:p-4 text-left">
            {/* Mock Window Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 py-2 border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-2">
                  devflow.app/workspace/hyperflow/sprint-14
                </span>
              </div>

              {/* Tab Switcher Controls */}
              <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/50 text-xs">
                <button
                  onClick={() => setActiveTab("kanban")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === "kanban"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FolderKanban className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Kanban Board</span>
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === "analytics"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Velocity Metrics</span>
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === "activity"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Activity className="h-3.5 w-3.5 text-purple-500" />
                  <span>Live Stream</span>
                </button>
              </div>
            </div>

            {/* Live Interactive Tab Content */}
            <div className="p-4 sm:p-6 bg-background/50 rounded-2xl min-h-[380px]">
              {/* TAB 1: KANBAN BOARD */}
              {activeTab === "kanban" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-300">
                  {/* Column 1: TODO */}
                  <div className="rounded-2xl border border-border/70 bg-card/60 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                        <span className="h-2 w-2 rounded-full bg-zinc-400" />
                        <span>TO DO</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
                        3
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-3.5 rounded-xl border border-border/80 bg-background shadow-xs hover:border-indigo-500/50 transition-all cursor-pointer group">
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-semibold text-foreground group-hover:text-indigo-500 transition-colors">
                            Migrate Next.js App Router v16
                          </span>
                          <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div className="mt-2.5 flex items-center justify-between text-[11px]">
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                            HIGH
                          </span>
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Tomorrow
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-border/80 bg-background shadow-xs hover:border-indigo-500/50 transition-all cursor-pointer group">
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-semibold text-foreground group-hover:text-indigo-500 transition-colors">
                            Add Resend OAuth Magic Links
                          </span>
                          <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div className="mt-2.5 flex items-center justify-between text-[11px]">
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 font-medium">
                            MEDIUM
                          </span>
                          <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-[10px] text-white flex items-center justify-center font-bold">
                            K
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: IN PROGRESS */}
                  <div className="rounded-2xl border border-border/70 bg-card/60 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        <span>IN PROGRESS</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
                        2
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-3.5 rounded-xl border border-indigo-500/40 bg-indigo-500/[0.03] shadow-xs hover:border-indigo-500 transition-all cursor-pointer group">
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-semibold text-foreground group-hover:text-indigo-500 transition-colors">
                            Realtime Kanban Drag & Drop
                          </span>
                          <GripVertical className="h-3.5 w-3.5 text-indigo-500" />
                        </div>
                        <div className="mt-2.5 flex items-center justify-between text-[11px]">
                          <span className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-500 font-medium">
                            URGENT
                          </span>
                          <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-[10px] text-white flex items-center justify-center font-bold">
                            M
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: DONE */}
                  <div className="rounded-2xl border border-border/70 bg-card/60 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>DONE</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
                        4
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-3.5 rounded-xl border border-border/80 bg-background/60 opacity-90 shadow-xs">
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-semibold text-muted-foreground line-through">
                            PostgreSQL Multi-Tenant Sharding
                          </span>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        </div>
                        <div className="mt-2.5 flex items-center justify-between text-[11px]">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                            COMPLETED
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ANALYTICS & VELOCITY */}
              {activeTab === "analytics" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl border border-border/70 bg-card">
                      <span className="text-xs text-muted-foreground">Sprint Velocity</span>
                      <p className="text-2xl font-bold text-foreground mt-1">94%</p>
                      <span className="text-[11px] text-emerald-500 font-medium">+18% vs last week</span>
                    </div>
                    <div className="p-4 rounded-xl border border-border/70 bg-card">
                      <span className="text-xs text-muted-foreground">Active Tasks</span>
                      <p className="text-2xl font-bold text-foreground mt-1">28</p>
                      <span className="text-[11px] text-indigo-500 font-medium">Across 4 spaces</span>
                    </div>
                    <div className="p-4 rounded-xl border border-border/70 bg-card">
                      <span className="text-xs text-muted-foreground">Cycle Time</span>
                      <p className="text-2xl font-bold text-foreground mt-1">1.8d</p>
                      <span className="text-[11px] text-emerald-500 font-medium">Top 5% speed</span>
                    </div>
                    <div className="p-4 rounded-xl border border-border/70 bg-card">
                      <span className="text-xs text-muted-foreground">Team Members</span>
                      <p className="text-2xl font-bold text-foreground mt-1">12</p>
                      <span className="text-[11px] text-purple-500 font-medium">Active now</span>
                    </div>
                  </div>

                  {/* Visual Progress Meter */}
                  <div className="p-4 rounded-xl border border-border/70 bg-card space-y-3">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Sprint 14 Completion Distribution</span>
                      <span className="text-emerald-500 font-bold">82% Shipped</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex shadow-inner">
                      <div style={{ width: "20%" }} className="bg-zinc-500" />
                      <div style={{ width: "30%" }} className="bg-indigo-500" />
                      <div style={{ width: "50%" }} className="bg-emerald-500" />
                    </div>
                    <div className="flex justify-between text-[11px] text-muted-foreground pt-1">
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-zinc-500" /> Todo (20%)</span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-500" /> In Progress (30%)</span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Done (50%)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: LIVE RECENT ACTIVITY */}
              {activeTab === "activity" && (
                <div className="space-y-3 animate-in fade-in duration-300 max-w-2xl mx-auto">
                  <div className="flex items-start gap-3 p-3 rounded-xl border border-border/70 bg-card">
                    <div className="h-8 w-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      AK
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <p className="text-foreground">
                        <span className="font-semibold">Alex Kim</span> moved task{" "}
                        <span className="font-medium text-indigo-500">&quot;OAuth Auth.js v5 Setup&quot;</span> to{" "}
                        <span className="font-semibold text-emerald-500">DONE</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground">2 minutes ago • Core Engine Project</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl border border-border/70 bg-card">
                    <div className="h-8 w-8 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      SR
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <p className="text-foreground">
                        <span className="font-semibold">Sarah Rivera</span> uploaded attachment{" "}
                        <span className="font-medium text-purple-400">&quot;system-architecture-v2.pdf&quot;</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground">14 minutes ago • Infrastructure</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl border border-border/70 bg-card">
                    <div className="h-8 w-8 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      KG
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <p className="text-foreground">
                        <span className="font-semibold">Ketan</span> created workspace{" "}
                        <span className="font-semibold text-foreground">&quot;Frontend Core Platform&quot;</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground">1 hour ago • Workspace Hub</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
