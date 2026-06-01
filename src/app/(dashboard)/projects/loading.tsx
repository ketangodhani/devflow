import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProjectsPage() {
  return (
    <div className="space-y-8">
      {/* Workspace badge */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-32 rounded-lg" />
      </div>

      {/* Header */}
      <div>
        <Skeleton className="h-10 w-56" />
        <Skeleton className="mt-3 h-5 w-80" />
      </div>

      {/* Create Project Form */}
      <div className="rounded-3xl border border-border p-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-border p-6"
          >
            <div className="space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />

              <div className="flex justify-between pt-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}