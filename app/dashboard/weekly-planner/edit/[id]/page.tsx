import { notFound } from "next/navigation";

import WeeklyPlannerForm from "@/components/weekly-planner/WeeklyPlannerForm";

import {
  getWeeklyPlannerById,
} from "@/lib/services/weekly-planner.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditWeeklyPlannerPage({
  params,
}: Props) {
  const { id } = await params;

  const planner =
    await getWeeklyPlannerById(id);

  if (!planner) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Weekly Task
        </h1>

        <p className="text-muted-foreground">
          Update your weekly task.
        </p>
      </div>

      <WeeklyPlannerForm
        planner={planner}
        isEdit
      />
    </div>
  );
}