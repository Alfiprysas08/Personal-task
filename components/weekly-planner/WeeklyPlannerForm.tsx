"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createWeeklyPlanner,
  updateWeeklyPlanner,
  WeeklyPlanner,
} from "@/lib/services/weekly-planner.service";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface WeeklyPlannerFormProps {
  planner?: WeeklyPlanner;
  isEdit?: boolean;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeeklyPlannerForm({
  planner,
  isEdit = false,
}: WeeklyPlannerFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(planner?.title ?? "");
  const [day, setDay] = useState(planner?.day ?? "Monday");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const data: WeeklyPlanner = {
      title,
      day,
      completed: planner?.completed ?? false,
    };

    if (isEdit && planner?.id) {
      await updateWeeklyPlanner(planner.id, data);
    } else {
      await createWeeklyPlanner(data);
    }

    router.push("/dashboard/weekly-planner");
    router.refresh();
  }

  return (
    <Card>
      <CardContent className="space-y-5 p-4 sm:p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="text-sm font-medium">
              Title
            </label>

            <Input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Belajar React"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Day
            </label>

            <select
              value={day}
              onChange={(e) =>
                setDay(e.target.value)
              }
              className="w-full border rounded-md p-2"
            >
              {days.map((day) => (
                <option key={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <Button className="w-full">
            {isEdit
              ? "Update Task"
              : "Create Task"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
