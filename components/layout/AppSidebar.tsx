"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { menuItems } from "@/constants/menu";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
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
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <Separator className="bg-zinc-800" />

      <div className="p-4">
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