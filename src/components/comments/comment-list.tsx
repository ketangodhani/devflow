import { MessageSquareDashed } from "lucide-react";
import CommentCard from "./comment-card";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id?: string;
    name: string | null;
    email: string | null;
    image?: string | null;
  };
}

interface Props {
  comments: Comment[];
  projectId: string;
  taskId: string;
  currentUserId?: string;
}

export default function CommentList({
  comments,
  projectId,
  taskId,
  currentUserId,
}: Props) {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/30 py-10 px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-3">
          <MessageSquareDashed className="h-6 w-6" />
        </div>
        <h4 className="text-sm font-semibold text-foreground">No comments yet</h4>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Be the first to share an update, ask a question, or leave feedback on this task.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          projectId={projectId}
          taskId={taskId}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}
