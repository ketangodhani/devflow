"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export function LandingPricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      name: "Starter",
      description: "For individual builders and solo engineers launching side projects.",
      priceMonthly: 0,
      priceAnnual: 0,
      badge: "Free Forever",
      highlight: false,
      cta: "Start for Free",
      href: "/register",
      features: [
        "1 Personal Workspace",
        "Up to 3 Active Projects",
        "Unlimited Kanban Tasks",
        "Basic Activity Feed",
        "UploadThing 100MB Storage",
        "Community Support",
      ],
    },
    {
      name: "Pro Team",
      description: "For fast-moving startups and high-growth engineering teams.",
      priceMonthly: 19,
      priceAnnual: 15,
      badge: "Most Popular",
      highlight: true,
      cta: "Claim 14-Day Free Trial",
      href: "/register",
      features: [
        "Unlimited Workspaces & Projects",
        "Unlimited Team Collaborators",
        "Role-Based Access Control (RBAC)",
        "Global Command Bar (Ctrl+K)",
        "UploadThing 10GB Storage",
        "Real-Time Audit Log & Mentions",
        "Priority Support",
      ],
    },
    {
      name: "Enterprise",
      description: "For scaling organizations requiring custom security and compliance.",
      priceMonthly: 49,
      priceAnnual: 39,
      badge: "Custom Scale",
      highlight: false,
      cta: "Contact Sales",
      href: "/register",
      features: [
        "Everything in Pro Team",
        "Dedicated Database Isolation",
        "SAML SSO & Custom Auth Providers",
        "Unlimited Upload Storage",
        "Custom SLA & 99.99% Uptime",
        "Dedicated Account Engineer",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Simple pricing for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500">
              ambitious engineering teams.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Zero hidden fees. Start free and upgrade seamlessly as your team expands.
          </p>

          {/* Monthly / Annual Toggle Switch */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 rounded-2xl bg-muted/60 border border-border">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  billingCycle === "annual"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px] font-bold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const price =
              billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={index}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.highlight
                    ? "border-2 border-indigo-500 bg-card/90 shadow-2xl shadow-indigo-500/10 scale-105 z-10"
                    : "border border-border/80 bg-card/60 backdrop-blur-xl shadow-lg hover:border-border"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-foreground">
                        {plan.name}
                      </h3>
                      {!plan.highlight && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">
                      ${price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      / user / month
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/60">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <Link
                    href={plan.href}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                      plan.highlight
                        ? "bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white hover:opacity-95 shadow-lg shadow-indigo-500/25"
                        : "border border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
