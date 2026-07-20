import WeeklyPlannerForm from "@/components/weekly-planner/WeeklyPlannerForm";

export default function CreateWeeklyPlannerPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">
        Create Weekly Task
      </h1>

      <WeeklyPlannerForm />
    </div>
  );
}
