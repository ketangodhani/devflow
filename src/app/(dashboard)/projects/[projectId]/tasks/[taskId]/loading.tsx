import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-6">
      <div className="grid min-h-screen gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Task Header */}
          <div className="space-y-3">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-5 w-1/3" />
          </div>

          {/* Task Description */}
          <div className="rounded-2xl border border-border p-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </div>

          {/* Comments Section */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-7 w-32" />
              <Skeleton className="mt-2 h-4 w-48" />
            </div>

            {/* Comment Form */}
            <div className="rounded-2xl border border-border p-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="mt-4 h-10 w-28" />
            </div>

            {/* Attachments */}
            <div className="rounded-2xl border border-border p-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-4 h-24 w-full" />
            </div>

            {/* Comment List */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-xl border border-border p-4"
                >
                  <Skeleton className="h-10 w-10 rounded-full" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            <Skeleton className="h-7 w-36" />

            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-xl border border-border p-4"
              >
                <Skeleton className="h-8 w-8 rounded-full" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="rounded-2xl border border-border p-6 space-y-4">
            <Skeleton className="h-6 w-32" />

            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />

            <Skeleton className="h-px w-full" />

            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}