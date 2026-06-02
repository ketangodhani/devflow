import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 py-6 lg:px-8">
      
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-9 w-64 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded" />
        </div>
      </div>

      {/* 4 Analytics Cards Skeleton */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 space-y-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-8 w-8 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-16 rounded-lg" />
              <Skeleton className="h-3 w-36 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Task Distribution Pipeline Skeleton */}
      <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 rounded" />
          <Skeleton className="h-3 w-80 rounded" />
        </div>
        
        {/* Full-width Progress Bar Skeleton */}
        <Skeleton className="h-3 w-full rounded-full" />
        
        {/* Metric Breakdowns */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border/40">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2 pl-4">
              <Skeleton className="h-3 w-16 rounded" />
              <Skeleton className="h-6 w-20 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Feeds Split */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        
        {/* Left Side: Activity Feed Box */}
        <div className="rounded-2xl border border-border/60 bg-card p-6 h-[460px] lg:col-span-2 flex flex-col space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="h-3 w-56 rounded" />
          </div>
          
          <div className="flex-1 space-y-5 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-3.5 w-3/4 rounded" />
                  <Skeleton className="h-3 w-1/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Recent Projects Box */}
        <div className="rounded-2xl border border-border/60 bg-card p-6 h-[460px] flex flex-col space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36 rounded" />
            <Skeleton className="h-3 w-48 rounded" />
          </div>
          
          <div className="flex-1 space-y-3 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 rounded-xl border border-border/40 space-y-2">
                <Skeleton className="h-4 w-1/2 rounded" />
                <Skeleton className="h-3 w-5/6 rounded" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}