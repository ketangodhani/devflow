import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-56 rounded-xl" />

        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, column) => (
          <div
            key={column}
            className="space-y-4 rounded-2xl border border-border bg-card p-4"
          >
            <Skeleton className="h-6 w-24 rounded-lg" />

            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, card) => (
                <Skeleton
                  key={card}
                  className="h-28 rounded-xl"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}