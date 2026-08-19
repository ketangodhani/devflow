import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingBentoGrid } from "@/components/landing/landing-bento-grid";
import { LandingWorkflow } from "@/components/landing/landing-workflow";
import { LandingPricing } from "@/components/landing/landing-pricing";
import { LandingTestimonials } from "@/components/landing/landing-testimonials";
import { LandingFAQ } from "@/components/landing/landing-faq";
import { LandingCTA } from "@/components/landing/landing-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-indigo-500/20 selection:text-indigo-400">
      {/* Sticky Glassmorphic Navbar */}
      <LandingNavbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with Interactive Live Preview */}
        <LandingHero />

        {/* 2. Responsive 4-Feature Interactive Bento Grid */}
        <LandingBentoGrid />

        {/* 3. Engineering Workflow Pipeline */}
        <LandingWorkflow />

        {/* 4. Interactive Pricing Tiers */}
        <LandingPricing />

        {/* 5. Customer Testimonials & Social Proof */}
        <LandingTestimonials />

        {/* 6. FAQ Accordion */}
        <LandingFAQ />

        {/* 7. Bottom High-Impact CTA Banner */}
        <LandingCTA />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
