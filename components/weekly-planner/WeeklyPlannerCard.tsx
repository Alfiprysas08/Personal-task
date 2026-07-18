"use client";

import Link from "next/link";

import {
  WeeklyPlanner,
  deleteWeeklyPlanner,
  toggleWeeklyPlanner,
} from "@/lib/services/weekly-planner.service";

import { Button } from "@/components/ui/button";

import {
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  planner: WeeklyPlanner;
  onRefresh: () => void;
}

export default function WeeklyPlannerCard({
  planner,
  onRefresh,
}: Props) {
  async function handleDelete() {
    if (!confirm("Delete this task?")) return;

    await deleteWeeklyPlanner(planner.id!);

    onRefresh();
  }

  async function handleToggle() {
    await toggleWeeklyPlanner(
      planner.id!,
      !planner.completed
    );

    onRefresh();
  }

  return (
    <div className="flex items-center justify-between rounded-lg border bg-zinc-900 p-3 transition hover:bg-zinc-800">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={planner.completed}
          onChange={handleToggle}
        />

        <span
          className={
            planner.completed
              ? "line-through text-zinc-500"
              : "text-white"
          }
        >
          {planner.title}
        </span>
      </div>

      <div className="flex gap-1">
        <Link
          href={`/dashboard/weekly-planner/edit/${planner.id}`}
        >
          <Button
            size="icon"
            variant="ghost"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </Link>

        <Button
          size="icon"
          variant="ghost"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}