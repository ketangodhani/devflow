export default function LoadingProjectsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-3xl bg-card"
        />
      ))}

    </div>
  );
}