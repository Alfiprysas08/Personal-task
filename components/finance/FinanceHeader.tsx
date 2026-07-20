import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FinanceHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Finance
        </h1>

        <p className="text-muted-foreground">
          Manage your income, expenses, and savings.
        </p>
      </div>

      <Button asChild className="w-full sm:w-auto">
        <Link href="/dashboard/finance/create">
          + New Transaction
        </Link>
      </Button>
    </div>
  );
}
