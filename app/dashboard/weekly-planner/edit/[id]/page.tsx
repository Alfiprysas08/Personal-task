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
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
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
