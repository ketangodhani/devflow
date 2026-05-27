"use client";

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

        <div className="h-10 w-10 rounded-full bg-zinc-800" />

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="border-border bg-card text-foreground"
      >
        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer"
        >
          Logout
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}