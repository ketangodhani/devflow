
import TaskHeader from "./task-header";
import TaskDescription from "./task-description";
import TaskActivity from "./task-activity";
import TaskSidebar from "./task-sidebar";
import CommentList from "../comments/comment-list";
import CommentForm from "../comments/comment-form";
import TaskAttachmentsSection from "../attachments/task-attachment-section";

interface Props {
  task: any;
  users: {
    id: string;
    name: string | null;
    email: string | null;
  }[];
}

export default function TaskDetailsContent({ task, users }: Props) {
  return (
    <div className="grid min-h-screen gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-8">
        <TaskHeader task={task} />

        <TaskDescription task={task} />
        <div className="mt-10 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Comments</h2>
 
            <p className="mt-1 text-sm text-zinc-500">
              Collaborate with your team.
            </p>
          </div>

          <CommentForm taskId={task.id} projectId={task.projectId} users={users} />
          <div className="mt-10 space-y-6">
            <TaskAttachmentsSection
              taskId={task.id}
              projectId={task.projectId}
              initialAttachments={task.attachments}
            />

            {/* <AttachmentList attachments={task.attachments} onDelete={() => {}} /> */}
          </div>

          <CommentList comments={task.comments} projectId={task.projectId} taskId={task.id} />
        </div>

        <TaskActivity activities={task.activities} />
      </div>

      <TaskSidebar task={task} users={users} />
    </div>
  );
}
