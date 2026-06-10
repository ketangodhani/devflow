
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getActiveWorkspace } from "@/features/workspaces/lib/get-active-workspace";
import { DeleteWorkspaceDialog } from "@/features/workspaces/components/delete-workspace-dialog";
export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const workspace = await getActiveWorkspace();

  if (!workspace) {
    redirect("/dashboard");
  }
  const membership = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: session.user.id,
      },
    },
  });
  return (
    <div className="space-y-8 ">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Settings</h1>
        <p className="mt-2 text-zinc-400">Manage your account settings.</p>
      </div>
      {/* Danger Zone Separation */}
      {membership?.role === "OWNER" && (
        <div className="pt-6 border-t border-border/80 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Danger Zone
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Irreversible destructive actions regarding this workspace.
            </p>
          </div>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.02] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-foreground">
                Delete this workspace
              </h4>
              <p className="text-xs text-muted-foreground max-w-xl">
                Once deleted, all repositories, settings, members, and data
                associated with this workspace will be gone forever. Please
                proceed with utmost caution.
              </p>
            </div>
            <div className="shrink-0">
              <DeleteWorkspaceDialog
                workspaceId={workspace.id}
                workspaceName={workspace.name}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
