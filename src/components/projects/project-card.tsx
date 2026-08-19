import Link from "next/link";
import { FolderKanban, ArrowUpRight, CheckCircle2, ListTodo, Calendar, User } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date | string;
  totalTasks?: number;
  completedTasks?: number;
  creatorName?: string | null;
}

export function ProjectCard({
  id,
  title,
  description,
  createdAt,
  totalTasks = 0,
  completedTasks = 0,
  creatorName,
}: ProjectCardProps) {
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/projects/${id}`}
      className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/80 p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl"
    >
      <div className="space-y-4">
        {/* Header with Project Icon & Jump Arrow */}
        <div className="flex items-start justify-between gap-3">
          <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 group-hover:scale-105 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-200 shadow-xs">
            <FolderKanban className="h-5 w-5" />
          </div>

          <div className="h-8 w-8 rounded-full border border-border/60 bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:text-indigo-500 group-hover:border-indigo-500/40 transition-colors">
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Project Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-indigo-500 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed min-h-[32px]">
            {description || "No project documentation specified."}
          </p>
        </div>
      </div>

      {/* Progress Meter & Footer Info */}
      <div className="pt-6 space-y-3.5 border-t border-border/40 mt-6">
        {/* Task Completion Stats */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>Progress</span>
            </span>
            <span className="text-foreground font-semibold font-mono">
              {completionRate}% ({completedTasks}/{totalTasks})
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              style={{ width: `${completionRate}%` }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
            />
          </div>
        </div>

        {/* Meta Info: Creator & Date */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center font-bold text-[9px] text-foreground">
              {creatorName?.charAt(0).toUpperCase() || <User className="h-2.5 w-2.5" />}
            </div>
            <span className="truncate max-w-[110px]">{creatorName || "Member"}</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
