"use client";

import { Sparkles, Layers, ArrowRight, CheckCircle2, Zap, Rocket } from "lucide-react";

export function LandingWorkflow() {
  const steps = [
    {
      step: "01",
      title: "Initialize Your Workspace",
      description:
        "Spin up isolated multi-tenant workspaces for your engineering teams in seconds with full role-based access control.",
      badge: "Step 1 • Setup",
      color: "from-blue-500 to-indigo-500",
    },
    {
      step: "02",
      title: "Organize Sprints & Backlog",
      description:
        "Structure tasks across customizable Kanban pipelines with optimistic drag-and-drop, priority flags, and due dates.",
      badge: "Step 2 • Sprint",
      color: "from-indigo-500 to-purple-500",
    },
    {
      step: "03",
      title: "Ship with Unmatched Velocity",
      description:
        "Accelerate cycle time with global keyboard navigation (Ctrl+K), real-time notifications, and automated audit logs.",
      badge: "Step 3 • Launch",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section id="workflow" className="py-24 relative overflow-hidden bg-muted/20 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" />
            Engineering Workflow
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            From initial backlog to production in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              three simple steps.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            A frictionless pipeline engineered to help dev teams focus on building rather than managing tools.
          </p>
        </div>

        {/* 3 Step Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl p-8 space-y-6 shadow-lg hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Step Counter Tag */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-muted text-muted-foreground border border-border/60">
                  {item.badge}
                </span>
                <span className="text-4xl font-extrabold text-muted-foreground/30 font-mono">
                  {item.step}
                </span>
              </div>

              {/* Glowing Icon Bar */}
              <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${item.color}`} />

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
