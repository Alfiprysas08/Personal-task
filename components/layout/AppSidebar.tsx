"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { menuItems } from "@/constants/menu";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-20 flex flex-col border-b border-zinc-800 bg-zinc-950 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      {/* Logo */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-lg sm:h-11 sm:w-11">
            <CheckSquare className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-tight text-white sm:text-xl">
              Personal Task
            </h1>

            <p className="text-xs text-zinc-400">
              Organize your work.
            </p>
          </div>
        </div>
      </div>

      <Separator className="bg-zinc-800" />

      {/* Menu */}
      <nav className="flex gap-2 overflow-x-auto p-3 lg:flex-1 lg:flex-col lg:space-y-2 lg:overflow-visible lg:p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 lg:gap-3 lg:px-4 lg:py-3 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <Separator className="hidden bg-zinc-800 lg:block" />

      <div className="hidden p-4 lg:block">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Today
        </p>

        <p className="mt-2 text-sm font-medium text-zinc-300">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </aside>
  );
}
