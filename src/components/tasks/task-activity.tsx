import { formatDistanceToNow, format } from "date-fns";
import {
  Activity as ActivityIcon,
  CircleDot,
  CheckCircle2,
  Clock,
  User,
  Tag,
  Paperclip,
  MessageSquare,
  Sparkles,
  History,
} from "lucide-react";

interface ActivityItem {
  id: string;
  action: string;
  entityType?: string;
  entityTitle?: string;
  createdAt: Date;
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

interface Props {
  activities: ActivityItem[];
}

export default function TaskActivity({ activities }: Props) {
  function getActivityIcon(action: string) {
    const act = action.toLowerCase();
    if (act.includes("done") || act.includes("completed")) {
      return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />;
    }
    if (act.includes("progress") || act.includes("started")) {
      return <Clock className="h-3.5 w-3.5 text-indigo-400" />;
    }
    if (act.includes("assigned") || act.includes("assignee")) {
      return <User className="h-3.5 w-3.5 text-sky-400" />;
    }
    if (act.includes("label") || act.includes("tag")) {
      return <Tag className="h-3.5 w-3.5 text-amber-400" />;
    }
    if (act.includes("attachment") || act.includes("file") || act.includes("uploaded")) {
      return <Paperclip className="h-3.5 w-3.5 text-purple-400" />;
    }
    if (act.includes("comment")) {
      return <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />;
    }
    if (act.includes("created")) {
      return <Sparkles className="h-3.5 w-3.5 text-emerald-400" />;
    }
    return <CircleDot className="h-3.5 w-3.5 text-muted-foreground" />;
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/30 py-8 px-4 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-2">
          <History className="h-5 w-5" />
        </div>
        <h4 className="text-xs font-semibold text-foreground">No recent activity</h4>
        <p className="text-[11px] text-muted-foreground mt-0.5 max-w-xs">
          Changes, updates, and milestones will be logged here in chronological order.
        </p>
      </div>
    );
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-border/70">
      {activities.map((activity) => (
        <div key={activity.id} className="relative group">
          {/* Timeline Dot */}
          <div className="absolute -left-6 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-card border border-border shadow-xs">
            {getActivityIcon(activity.action)}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <div className="flex items-center gap-2">
              {activity.user && (
                <span className="font-semibold text-xs text-foreground">
                  {activity.user.name || activity.user.email}
                </span>
              )}
              <span className="text-xs text-foreground/90 font-medium">
                {activity.action}
              </span>
            </div>

            <time
              className="text-[11px] text-muted-foreground shrink-0"
              title={format(new Date(activity.createdAt), "PPP p")}
            >
              {formatDistanceToNow(new Date(activity.createdAt), {
                addSuffix: true,
              })}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
}
