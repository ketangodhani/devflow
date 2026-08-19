import Link from "next/link";
import {
  FolderKanban,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap,
  Command,
  Star,
} from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 relative overflow-hidden bg-background">
      {/* LEFT SHOWCASE PANEL (Visible on Desktop) */}
      <div className="hidden lg:flex flex-col justify-between border-r border-border/80 bg-gradient-to-br from-card via-background to-card p-12 text-foreground relative overflow-hidden">
        {/* Ambient Gradient Background Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between z-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="h-full w-full bg-background rounded-[10px] flex items-center justify-center">
                <FolderKanban className="h-5 w-5 text-indigo-500" />
              </div>
            </div>
            <span className="font-bold text-2xl tracking-tight text-foreground">
              DevFlow
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-xl border border-border/60 bg-muted/40 hover:bg-muted transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Center Main Value Proposition */}
        <div className="space-y-8 max-w-lg z-10 my-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>High-Velocity Engineering</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-foreground">
            Ship software without sprint friction.
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed">
            The modern Jira alternative engineered for fast-moving startups and product squads.
          </p>

          {/* Feature Highlights Pills */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 p-3 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md">
              <div className="h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                <Zap className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-foreground">Optimistic Kanban Workflow</span>
                <p className="text-muted-foreground">Instant visual response with zero latency.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md">
              <div className="h-8 w-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-foreground">Multi-Tenant RBAC</span>
                <p className="text-muted-foreground">Isolated team spaces with role security.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md">
              <div className="h-8 w-8 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0">
                <Command className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-foreground">Keyboard-First Productivity</span>
                <p className="text-muted-foreground">Navigate with Ctrl + K global commands.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof Quote */}
        <div className="p-4 rounded-2xl border border-border/60 bg-muted/20 backdrop-blur-sm z-10 space-y-2">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic">
            &quot;DevFlow replaced our entire Jira workflow. The velocity increase across our engineering team has been remarkable.&quot;
          </p>
          <p className="text-[11px] font-semibold text-foreground">
            Marcus Vance • VP of Engineering
          </p>
        </div>
      </div>

      {/* RIGHT AUTH FORM PANEL */}
      <div className="flex flex-col justify-between p-6 sm:p-12 relative min-h-screen">
        <div className="flex items-center justify-between w-full lg:justify-end">
          <Link
            href="/"
            className="lg:hidden inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-xl border border-border/60 bg-muted/40"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-center my-auto py-8">
          {children}
        </div>

        <div className="text-center text-xs text-muted-foreground py-2">
          Protected by enterprise security & NextAuth v5 session tokens
        </div>
      </div>
    </div>
  );
}