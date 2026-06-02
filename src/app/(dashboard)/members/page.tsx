import { redirect } from "next/navigation";
import { Shield } from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { getActiveWorkspace } from "@/features/workspaces/lib/get-active-workspace";

import { InviteMemberDialog } from "@/components/workspaces/invite-member-dialog";
import { DeleteWorkspaceDialog } from "@/features/workspaces/components/delete-workspace-dialog";
import { MemberRoleSelect } from "@/features/workspaces/components/member-role-select";
import { RemoveMemberButton } from "@/features/workspaces/components/remove-member-button";

export default async function MembersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const workspace = await getActiveWorkspace();

  if (!workspace) {
    redirect("/dashboard");
  }

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId: workspace.id },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: session.user.id,
      },
    },
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 py-6 lg:px-8">
      {/* Upper Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Team Members
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Manage who has access to this workspace and control their roles and
            permissions.
          </p>
        </div>
        <div className="shrink-0">
          <InviteMemberDialog workspaceId={workspace.id} />
        </div>
      </div>

      {/* Main Members Container Card */}
      <div className="rounded-2xl border border-border/80 bg-card shadow-sm overflow-hidden">
        {/* 🌟 FIX: Exact 3-Column Grid for Desktop Header */}
        <div className="hidden sm:grid grid-cols-12 items-center px-6 py-3 bg-muted/40 border-b border-border/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="col-span-6">Member Profile</span>
          <span className="col-span-3 text-center sm:text-left">
            Workspace Role
          </span>
          <span className="col-span-3 text-right">Actions</span>
        </div>

        {/* Dynamic Members Row List */}
        <div className="divide-y divide-border/60">
          {members.map((member) => {
            const isCurrentUser = member.user.id === session.user.id;

            return (
              <div
                key={member.id}
                // FIX: Match exact same 12-column grid layout for rows
                className="flex flex-col sm:grid sm:grid-cols-12 sm:items-center p-6 gap-4 sm:gap-0 hover:bg-muted/10 transition-colors"
              >
                {/* Profile Information details (Takes 6/12 columns) */}
                <div className="flex items-center gap-4 col-span-6">
                  {/* Premium Styled Avatar */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 text-sm font-semibold text-foreground border border-border/50 uppercase shadow-sm">
                    {member.user.name?.charAt(0) || "?"}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-foreground">
                        {member.user.name}
                      </p>
                      {isCurrentUser && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-foreground/10 text-foreground border border-foreground/10">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {member.user.email}
                    </p>
                  </div>
                </div>

                {/* FIX: Workspace Role (Takes 3/12 columns) */}
                <div className="flex items-center justify-between sm:justify-start col-span-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-border/40">
                  <span className="sm:hidden text-xs font-medium text-muted-foreground">
                    Role
                  </span>

                  {member.role === "OWNER" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 shadow-sm">
                      <Shield className="h-3.5 w-3.5" />
                      Owner
                    </span>
                  ) : (
                    <MemberRoleSelect memberId={member.id} role={member.role} />
                  )}
                </div>

                {/* FIX: Actions Button Group (Takes 3/12 columns and aligns right) */}
                <div className="flex items-center justify-between sm:justify-end col-span-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-border/40">
                  <span className="sm:hidden text-xs font-medium text-muted-foreground">
                    Actions
                  </span>
                  {member.role !== "OWNER" && (
                    <RemoveMemberButton
                      memberId={member.id}
                      memberName={member.user.name || "Member"}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
