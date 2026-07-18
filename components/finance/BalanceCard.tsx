"use client";

import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getFinanceSummary } from "@/lib/services/finance.service";

interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function BalanceCard() {
  const [summary, setSummary] = useState<FinanceSummary>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const data = await getFinanceSummary();
        setSummary(data);
      } catch (error) {
        console.error("Failed to load finance summary:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  return (
    <Card>
      <CardContent className="flex items-center justify-between pt-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Total Balance
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {loading
              ? "Loading..."
              : new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(summary.balance)}
          </h2>
        </div>

        <div className="rounded-full bg-primary/10 p-3">
          <Wallet className="h-7 w-7 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}