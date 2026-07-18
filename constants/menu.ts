import {
  Home,
  CalendarDays,
  FolderKanban,
  Wallet,
  Calendar,
  NotebookPen,
  Settings,
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Weekly Planner",
    href: "/dashboard/weekly-planner",
    icon: CalendarDays,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Finance",
    href: "/dashboard/finance",
    icon: Wallet,
  },

  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];