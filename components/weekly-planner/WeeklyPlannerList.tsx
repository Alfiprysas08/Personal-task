"use client";

import { useEffect, useState } from "react";

import {
  WeeklyPlanner,
  getWeeklyPlanners,
} from "@/lib/services/weekly-planner.service";

import WeeklyPlannerCard from "./WeeklyPlannerCard";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeeklyPlannerList() {
  const [planners, setPlanners] = useState<
    WeeklyPlanner[]
  >([]);

  async function loadData() {
    const data = await getWeeklyPlanners();
    setPlanners(data);
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialData() {
      const data = await getWeeklyPlanners();
      if (!ignore) setPlanners(data);
    }

    void loadInitialData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {days.map((day) => {
        const dayTasks = planners.filter(
          (planner) => planner.day === day
        );

        return (
          <Card key={day}>
            <CardHeader>
              <CardTitle>{day}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {dayTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No tasks yet.
                </p>
              ) : (
                dayTasks.map((planner) => (
                  <WeeklyPlannerCard
                    key={planner.id}
                    planner={planner}
                    onRefresh={loadData}
                  />
                ))
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
