"use client";

import { LogOut, ChevronDown, User2 } from "lucide-react";
import { Sun, Moon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { clearWorkspaceCookie } from "@/actions/clear-workspace-cookie";

export function UserDropdown() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const name = session?.user?.name || "User";

  const email = session?.user?.email || "";

  const initial = name.charAt(0).toUpperCase();

  async function handleLogout() {
    await clearWorkspaceCookie();

    await signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-base font-semibold text-background shadow-sm">
          {initial}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 rounded-2xl border border-border bg-card/95 p-2 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 rounded-xl px-3 py-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-base font-semibold text-background shadow-sm">
            {initial}
          </div>

          <div className="overflow-hidden">
            <p className="truncate font-medium text-foreground">{name}</p>

            <p className="truncate text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem className="mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm text-foreground transition focus:bg-muted">
          <User2 className="h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm text-foreground transition focus:bg-muted"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}

          {theme === "dark" ? "Light mode" : "Dark mode"}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleLogout}
          className="mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition focus:bg-red-500/10 focus:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
