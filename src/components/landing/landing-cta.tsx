"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, FolderKanban, ShieldCheck } from "lucide-react";

export function LandingCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-background p-8 sm:p-14 text-center overflow-hidden shadow-2xl backdrop-blur-2xl">
          {/* Glowing Radial Background Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ready to transform your sprint velocity?</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Start building with DevFlow today.
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Join hundreds of engineering teams delivering clean code with zero sprint friction. Free forever for up to 3 projects.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Create Free Workspace</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold border border-border bg-card/60 text-foreground hover:bg-muted transition-all duration-200"
              >
                <span>Existing Member Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
