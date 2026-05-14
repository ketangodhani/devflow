"use client";

import { Menu, Search } from "lucide-react";
import { ThemeToggle } from "../shared/theme-toggle";
import { UserDropdown } from "./user-dropdown";
import { CommandMenu } from "./command-menu";

interface NavbarProps {
  projects?: {
    id: string;
    title: string;
  }[];
}

export function Navbar({ projects }: NavbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
      <div className="flex items-center gap-4">
        <CommandMenu projects={projects} />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserDropdown />
      </div>
    </header>
  );
}
