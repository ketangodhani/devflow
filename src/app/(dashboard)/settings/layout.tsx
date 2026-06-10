
import { getUserWorkspaces } from "@/features/workspaces/queries/get-user-workspace";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";
export default async function SettingsLayout({
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
  const projects = await prisma.project.findMany({
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
  });
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        workspaces={workspaces}
        activeWorkspaceId={effectiveWorkspaceId}
      />
      <div className="flex flex-1 flex-col">
        <Navbar projects={projects} />

        <main className="flex-1 p-6">
          <>{children}</>
        </main>
      </div>
    </div>
  );
}
