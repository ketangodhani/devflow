import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { getActiveWorkspace } from "@/features/workspaces/lib/get-active-workspace";

import { InviteMemberDialog } from "@/components/workspaces/invite-member-dialog";

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

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">
            Members
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage workspace members.
          </p>
        </div>

        <InviteMemberDialog
          workspaceId={workspace.id}
        />
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

              <div className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                {member.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}