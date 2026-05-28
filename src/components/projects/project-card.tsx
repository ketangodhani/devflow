import Link from "next/link";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string | null;
}

export function ProjectCard({ id, title, description }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${id}`}
    >
      <div className="rounded-3xl border border-border bg-card p-6 transition hover:border-zinc-700">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>

        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
