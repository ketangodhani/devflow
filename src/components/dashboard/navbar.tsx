"use client";

import { Menu, Search } from "lucide-react";
import { ThemeToggle } from "../shared/theme-toggle";
import { UserDropdown } from "./user-dropdown";
import { CommandMenu } from "./command-menu";
import NotificationBell from "../notifications/notification-bell";

interface NavbarProps {
  projects?: {
    id: string;
    title: string;
  }[];
}

export function Navbar({ projects }: NavbarProps) {
  return (
    // <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <CommandMenu projects={projects} />
      </div>

      <div className="flex items-center gap-4">
        <NotificationBell />
        <ThemeToggle />
        <UserDropdown />
      </div>
    </header>
  );
}
