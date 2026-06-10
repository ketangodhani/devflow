import { Skeleton } from "@/components/ui/skeleton";

export default function MembersLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 py-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <Skeleton className="h-9 w-56" />
          <Skeleton className="mt-2 h-4 w-96 max-w-full" />
        </div>

        <div className="shrink-0">
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>
      </div>

      {/* Members Card */}
      <div className="rounded-2xl border border-border/80 bg-card shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 items-center px-6 py-3 bg-muted/40 border-b border-border/60">
          <Skeleton className="h-4 w-28 col-span-6" />

          <div className="col-span-3">
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="col-span-3 flex justify-end">
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Member Rows */}
        <div className="divide-y divide-border/60">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-12 sm:items-center p-6 gap-4 sm:gap-0"
            >
              {/* Profile */}
              <div className="flex items-center gap-4 col-span-6">
                <Skeleton className="h-11 w-11 rounded-xl shrink-0" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-10 rounded-md" />
                  </div>

                  <Skeleton className="h-3 w-52" />
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center justify-between sm:justify-start col-span-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-border/40">
                <Skeleton className="h-8 w-28 rounded-xl" />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between sm:justify-end col-span-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-border/40">
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-6 border-t border-border/80 space-y-4">
        <div>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="mt-2 h-3 w-72" />
        </div>

        <div className="rounded-2xl border border-red-500/20 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-3 w-full max-w-xl" />
            <Skeleton className="h-3 w-5/6 max-w-lg" />
          </div>

          <div className="shrink-0">
            <Skeleton className="h-10 w-40 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}