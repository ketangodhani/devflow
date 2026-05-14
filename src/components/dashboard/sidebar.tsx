"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants/sidebar";

import clsx from "clsx";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r border-zinc-800 bg-black lg:flex">

      <div className="border-b border-zinc-800 p-6">
        <h1 className="text-2xl font-bold text-white">
          DevFlow
        </h1>
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
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />

              {link.label}
            </Link>
          );
        })}

      </nav>
    </aside>
  );
}