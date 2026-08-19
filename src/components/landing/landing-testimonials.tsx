"use client";

import { Star, Sparkles, Quote } from "lucide-react";

export function LandingTestimonials() {
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "VP of Engineering at CloudScale",
      avatar: "MV",
      color: "from-indigo-500 to-blue-500",
      content:
        "DevFlow replaced both Jira and Notion for our sprint tracking. The keyboard shortcuts and instantaneous Kanban drag-and-drop saved our team at least 4 hours every week.",
      rating: 5,
    },
    {
      name: "Elena Rostova",
      role: "CTO at Nexus AI",
      avatar: "ER",
      color: "from-purple-500 to-pink-500",
      content:
        "The multi-tenant workspace architecture is rock solid. We have 6 distinct product squads operating inside their own isolated spaces without any cross-talk confusion.",
      rating: 5,
    },
    {
      name: "Liam O'Connor",
      role: "Lead Full-Stack Architect",
      avatar: "LO",
      color: "from-emerald-500 to-teal-500",
      content:
        "Next.js 16 + React 19 performance makes DevFlow feel faster than desktop software. The UI aesthetics are stunning in obsidian dark mode.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-muted/10 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            Social Proof
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Loved by fast-shipping{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              engineering teams.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Here is what engineering leaders and founders are saying about DevFlow.
          </p>
        </div>

        {/* Testimonials 3 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl p-8 flex flex-col justify-between space-y-6 shadow-lg hover:border-pink-500/30 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &quot;{item.content}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <div
                  className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${item.color} text-white font-bold text-xs flex items-center justify-center shadow-md`}
                >
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
