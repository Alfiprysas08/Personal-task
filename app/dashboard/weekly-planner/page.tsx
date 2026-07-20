import WeeklyPlannerList from "@/components/weekly-planner/WeeklyPlannerList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WeeklyPlannerPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold sm:text-3xl">Weekly Planner</h1>
          <p className="text-muted-foreground">
            Manage your weekly tasks.
          </p>
        </div>

        <Link href="/dashboard/weekly-planner/create">
          <Button className="w-full sm:w-auto">Add Task</Button>
        </Link>
      </div>

      {/* List */}
      <WeeklyPlannerList />
    </div>
  );
}
