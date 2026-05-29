import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Settings,
  Handshake,
} from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Members",
    href: "/members",
    icon: Handshake,
  }
];