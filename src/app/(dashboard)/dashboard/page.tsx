import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>

        <p className="mt-2 text-zinc-400">Welcome back to DevFlow</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Projects" value="12" />

        <DashboardCard title="Tasks" value="48" />

        <DashboardCard title="Completed" value="32" />

        <DashboardCard title="Teams" value="3" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 xl:col-span-2">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-xl font-semibold text-white">Quick Stats</h2>
        </div>
      </div>
    </div>
  );
}
