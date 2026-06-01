import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div>
        <Skeleton className="h-10 w-72" />
        <Skeleton className="mt-3 h-5 w-125 max-w-full" />
      </div>

      <CreateTaskFormSkeleton />

      <KanbanBoardSkeleton />

      {/* Activity Feed */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />

        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 rounded-xl border border-border p-4"
          >
            <Skeleton className="h-10 w-10 rounded-full" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CreateTaskFormSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div>
        <Skeleton className="h-7 w-40" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>

      <Skeleton className="mt-4 h-14 w-full rounded-xl" />

      <Skeleton className="mt-2 h-32 w-full rounded-xl" />

      <Skeleton className="mt-4 h-12 w-32 rounded-xl" />
    </div>
  );
}

export function KanbanBoardSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {["Todo", "In Progress", "Done"].map((column) => (
        <div
          key={column}
          className="rounded-3xl border border-border bg-card p-4"
        >
          {/* Column Header */}
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-8 rounded-full" />
          </div>

          {/* Task Cards */}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-background p-4"
              >
                <Skeleton className="h-5 w-3/4" />

                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-2/3" />

                <div className="mt-4 flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}