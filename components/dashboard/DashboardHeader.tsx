import { getGreeting } from "@/lib/greeting";

export default function DashboardHeader() {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        👋 {getGreeting()}
      </h1>

      <p className="text-muted-foreground">
        Welcome back to <span className="font-medium">Personal Task</span>.
      </p>
    </section>
  );
}
