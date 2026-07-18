import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FinanceHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Finance
        </h1>

        <p className="text-muted-foreground">
          Manage your income, expenses, and savings.
        </p>
      </div>

      <Button asChild>
        <Link href="/dashboard/finance/create">
          + New Transaction
        </Link>
      </Button>
    </div>
  );
}