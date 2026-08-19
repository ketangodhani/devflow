"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does DevFlow handle multi-tenant workspaces?",
      a: "Every workspace is logically isolated at the PostgreSQL database layer. Workspace members, projects, Kanban tasks, comments, and notifications are scoped strictly to the authenticated workspace context with role-based access control (OWNER, ADMIN, MEMBER).",
    },
    {
      q: "Can I invite team members who don't have accounts yet?",
      a: "Yes! In our invitation workflow, you can invite team members directly. Once they sign up or log in via GitHub OAuth, they automatically receive membership into your workspace.",
    },
    {
      q: "How does the keyboard navigation (Ctrl + K) work?",
      a: "Pressing Ctrl + K (or Cmd + K on macOS) summons our global command bar. You can fuzzy-search projects, jump directly into specific backlog tasks, or switch active workspaces instantly without leaving your keyboard.",
    },
    {
      q: "Where are file attachments stored?",
      a: "Attachments are securely uploaded and stored via UploadThing with high-speed CDN delivery and strict file-size limits per workspace tier.",
    },
    {
      q: "Can I switch between Light and Dark Obsidian modes?",
      a: "Absolutely. DevFlow includes native system-aware theme switching powered by next-themes, tailored with a deep obsidian dark slate palette inspired by modern developer platforms.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5" />
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-muted-foreground">
            Everything you need to know about DevFlow platform architecture and features.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-base text-foreground hover:text-indigo-500 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-indigo-500" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed animate-in fade-in duration-200 border-t border-border/40 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
