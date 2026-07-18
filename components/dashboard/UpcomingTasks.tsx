import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeeklyPlanner } from "@/lib/services/weekly-planner.service";;
import { Clock } from "lucide-react";

interface UpcomingTasksProps {
  tasks: WeeklyPlanner[];
}

export default function UpcomingTasks({
  tasks,
}: UpcomingTasksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
      </CardHeader>

      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No upcoming tasks.
          </p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{task.title}</p>

                  <p className="text-sm text-muted-foreground">
                    {task.day}
                  </p>
                </div>

                <Badge
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <Clock className="h-3 w-3" />
                  Pending
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}