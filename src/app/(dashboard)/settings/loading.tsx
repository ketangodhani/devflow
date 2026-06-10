
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Skeleton className="h-10 w-56" />
        <Skeleton className="mt-3 h-4 w-72" />
      </div>

      {/* Danger Zone */}
      <div className="pt-6 border-t border-border/80 space-y-4">
        <div>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="mt-2 h-3 w-80" />
        </div>

        <div className="rounded-2xl border border-border p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-full max-w-xl" />
            <Skeleton className="h-4 w-5/6 max-w-lg" />
          </div>

          <Skeleton className="h-10 w-36 shrink-0 rounded-md" />
        </div>
      </div>
    </div>
  );
}