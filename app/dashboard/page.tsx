export const dynamic = "force-dynamic";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BalanceStatsCard from "@/components/dashboard/BalanceStatsCard";
import StatsCard from "@/components/dashboard/StatsCard";
import UpcomingTasks from "@/components/dashboard/UpcomingTasks";
import CompletedTasks from "@/components/dashboard/CompletedTasks";

import {
  FolderKanban,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { getActiveProjectsCount } from "@/lib/services/project.service";
import {
  getFinanceSummary,
  getCurrentMonthSummary,
} from "@/lib/services/finance.service";
import {
  getUpcomingTasks,
  getCompletedTasks,
} from "@/lib/services/weekly-planner.service";;

export default async function DashboardPage() {
  const [
    activeProjects,
    financeSummary,
    currentMonthSummary,
    upcomingTasks,
    completedTasks,
  ] = await Promise.all([
    getActiveProjectsCount(),
    getFinanceSummary(),
    getCurrentMonthSummary(),
    getUpcomingTasks(),
    getCompletedTasks(),
  ]);

  const currency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Active Projects"
          value={activeProjects}
          description="Currently Active"
          icon={FolderKanban}
          iconColor="text-blue-500"
        />

        <BalanceStatsCard
          title="Total Balance"
          value={currency(financeSummary.balance)}
          description="Current Balance"
          icon={Wallet}
          iconColor="text-emerald-500"
        />

        <StatsCard
          title="Income"
          value={currency(currentMonthSummary.income)}
          description="This Month"
          icon={TrendingUp}
          iconColor="text-green-500"
        />

        <StatsCard
          title="Expense"
          value={currency(currentMonthSummary.expense)}
          description="This Month"
          icon={TrendingDown}
          iconColor="text-red-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingTasks tasks={upcomingTasks} />
        <CompletedTasks tasks={completedTasks} />
      </div>
    </div>
  );
}
