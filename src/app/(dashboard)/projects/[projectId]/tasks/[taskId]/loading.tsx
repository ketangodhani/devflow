export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-1/3 rounded-xl bg-muted" />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="h-40 rounded-2xl bg-muted" />

          <div className="h-64 rounded-2xl bg-muted" />
        </div>

        <div className="space-y-4">
          <div className="h-72 rounded-2xl bg-muted" />
        </div>
      </div>
    </div>
  );
}