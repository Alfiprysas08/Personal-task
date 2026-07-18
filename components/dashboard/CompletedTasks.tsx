import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeeklyPlanner } from "@/lib/services/weekly-planner.service";
import { CheckCircle2 } from "lucide-react";

interface CompletedTasksProps {
  tasks: WeeklyPlanner[];
}

export default function CompletedTasks({
  tasks,
}: CompletedTasksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Tasks</CardTitle>
      </CardHeader>

      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No completed tasks.
          </p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium line-through">
                    {task.title}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {task.day}
                  </p>
                </div>

                <Badge
                  className="flex items-center gap-1"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  Done
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}