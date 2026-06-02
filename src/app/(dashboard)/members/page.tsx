import { redirect } from "next/navigation";

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
    where: {
      workspaceId: workspace.id,
    },

    include: {
      user: true,
    },

    orderBy: {
      createdAt: "asc",
    },
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
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Members</h1>

          <p className="mt-2 text-muted-foreground">
            Manage workspace members.
          </p>
        </div>

        <InviteMemberDialog workspaceId={workspace.id} />
      </div>

      <div className="rounded-3xl border border-border bg-card">
        <div className="divide-y divide-border">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-white">
                  {member.user.name?.charAt(0)}
                </div>

                <div>
                  <p className="font-medium text-foreground">
                    {member.user.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {member.user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {member.role === "OWNER" ? (
                  <span className="rounded-full border px-3 py-1 text-xs font-medium">
                    OWNER
                  </span>
                ) : (
                  <>
                    <MemberRoleSelect memberId={member.id} role={member.role} />

                    <RemoveMemberButton memberId={member.id} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {membership?.role === "OWNER" && (
        <DeleteWorkspaceDialog
          workspaceId={workspace.id}
          workspaceName={workspace.name}
        />
      )}
    </div>
  );
}
