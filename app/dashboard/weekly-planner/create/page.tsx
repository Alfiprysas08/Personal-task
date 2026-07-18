import WeeklyPlannerForm from "@/components/weekly-planner/WeeklyPlannerForm";

export default function CreateWeeklyPlannerPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Create Weekly Task
      </h1>

      <WeeklyPlannerForm />
    </div>
  );
}