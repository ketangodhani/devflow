import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Breadcrumb & Action Toolbar Skeleton */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-7 rounded-lg" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-start">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Hero Title & Meta Badges */}
          <div className="space-y-3">
            <Skeleton className="h-10 w-3/4 rounded-2xl" />
            <div className="flex items-center gap-2 pt-1">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
          </div>

          {/* Task Description Card */}
          <div className="rounded-3xl border border-border/80 bg-card/60 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-lg" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Tabs Section */}
          <div className="rounded-3xl border border-border/80 bg-card/60 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <Skeleton className="h-9 w-64 rounded-2xl" />
              <Skeleton className="h-4 w-40 hidden sm:block" />
            </div>

            {/* Comment Form Skeleton */}
            <div className="rounded-2xl border border-border/80 bg-card/40 p-4 space-y-3">
              <Skeleton className="h-20 w-full rounded-xl" />
              <div className="flex justify-between items-center pt-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-28 rounded-xl" />
              </div>
            </div>

            {/* Comment List Placeholders */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-28 mb-3" />
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-2xl border border-border/80 bg-card/60 p-4"
                >
                  <Skeleton className="h-8 w-8 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Inspector Column */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-border/80 bg-card/60 p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Skeleton className="h-6 w-6 rounded-lg" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-9 w-full rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-9 w-full rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-9 w-full rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-9 w-full rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-9 w-full rounded-xl" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card/60 p-5 space-y-3">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>

          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-4">
            <Skeleton className="h-9 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}