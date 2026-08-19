import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 py-6 lg:px-8">
      {/* Project Header Skeleton */}
      <div className="space-y-4 border-b border-border/40 pb-6">
        <Skeleton className="h-4 w-48" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
          <Skeleton className="h-14 w-36 rounded-2xl" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="flex items-center justify-between gap-4 p-3 rounded-2xl border border-border bg-card/60">
        <Skeleton className="h-9 w-64 rounded-xl" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24 rounded-xl" />
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
      </div>

      {/* Kanban Columns Skeleton */}
      <KanbanBoardSkeleton />
    </div>
  );
}

export function KanbanBoardSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {["To Do", "In Progress", "Done"].map((column) => (
        <div
          key={column}
          className="rounded-3xl border border-border bg-card/60 p-4 min-h-[400px] space-y-3"
        >
          {/* Column Header */}
          <div className="mb-4 flex items-center justify-between pb-3 border-b border-border/40">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-8 rounded-full" />
          </div>

          {/* Task Cards Skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-background p-4 space-y-2.5"
              >
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}