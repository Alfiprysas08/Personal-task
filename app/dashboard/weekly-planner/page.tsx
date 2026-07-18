import WeeklyPlannerList from "@/components/weekly-planner/WeeklyPlannerList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WeeklyPlannerPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Weekly Planner</h1>
          <p className="text-muted-foreground">
            Manage your weekly tasks.
          </p>
        </div>

        <Link href="/dashboard/weekly-planner/create">
          <Button>Add Task</Button>
        </Link>
      </div>

      {/* List */}
      <WeeklyPlannerList />
    </div>
  );
}