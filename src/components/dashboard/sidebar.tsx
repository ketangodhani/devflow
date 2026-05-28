"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants/sidebar";
import { WorkspaceSwitcher } from "@/features/workspaces/components/workspace-switcher";

import clsx from "clsx";

interface SidebarProps {
  workspaces: {
    id: string;
    name: string;
  }[];

  activeWorkspaceId?: string;
}

export function Sidebar({ workspaces, activeWorkspaceId }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r border-border bg-background lg:flex">
      <div className="border-b border-border p-6">
        <h1 className="text-2xl font-bold text-foreground">DevFlow</h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                pathname === link.href
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />

              {link.label}
            </Link>
          );
        })}

        <WorkspaceSwitcher
          workspaces={workspaces}
          activeWorkspaceId={activeWorkspaceId}
        />
      </nav>
    </aside>
  );
}
