import FinanceHeader from "@/components/finance/FinanceHeader";
import BalanceCard from "@/components/finance/BalanceCard";
import BudgetCard from "@/components/finance/BudgetCard";
import IncomeExpenseChart from "@/components/finance/IncomeExpenseChart";
import RecentTransactions from "@/components/finance/RecentTransactions";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <FinanceHeader />

      <div className="grid gap-6 lg:grid-cols-2">
        <BalanceCard />
        <BudgetCard />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <IncomeExpenseChart />
        <RecentTransactions />
      </div>
    </div>
  );
}