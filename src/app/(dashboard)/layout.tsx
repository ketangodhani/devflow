import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserWorkspaces } from "@/features/workspaces/queries/get-user-workspace";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const workspaces = await getUserWorkspaces();

  const activeWorkspaceId = (await cookies()).get("workspaceId")?.value;
  const effectiveWorkspaceId = activeWorkspaceId || workspaces[0]?.id;

  const projects = effectiveWorkspaceId
    ? await prisma.project.findMany({
        where: {
          workspaceId: effectiveWorkspaceId,
        },
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        workspaces={workspaces}
        activeWorkspaceId={effectiveWorkspaceId}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar projects={projects} />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
