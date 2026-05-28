"use client";

import { clearWorkspaceCookie } from "@/actions/clear-workspace-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "next-auth/react";

export function UserDropdown() {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger>

        <div className="h-10 w-10 rounded-full bg-muted" />

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="border-border bg-card text-foreground"
      >
        <DropdownMenuItem
          onClick={async () => {
            await clearWorkspaceCookie();
            await signOut({
              callbackUrl: "/login",
            });
          }}
          className="cursor-pointer"
        >
          Logout
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}