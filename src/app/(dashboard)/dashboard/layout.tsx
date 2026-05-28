import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {getUserWorkspaces} from "@/features/workspaces/queries/get-user-workspace";
import {cookies} from "next/headers"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const workspaces = await getUserWorkspaces();

  const activeWorkspaceId = (await cookies()).get("workspaceId")?.value

  return (
    <div className="flex h-screen overflow-hidden bg-background">

      <Sidebar workspaces={workspaces} activeWorkspaceId={activeWorkspaceId}/>

      <div className="flex flex-1 flex-col overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>

    </div>
  );
}