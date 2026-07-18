import WeeklyPlannerForm from "@/components/weekly-planner/WeeklyPlannerForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditWeeklyPlannerPage({
  params,
}: PageProps) {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Edit Weekly Task
      </h1>

      <WeeklyPlannerForm id={params.id} />
    </div>
  );
}