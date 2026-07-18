"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getFinanceSummary } from "@/lib/services/finance.service";

interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function BudgetCard() {
  const [summary, setSummary] =
    useState<FinanceSummary>({
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
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="mb-6 text-lg font-semibold">
          Financial Overview
        </h2>

        {loading ? (
          <p className="text-sm text-muted-foreground">
            Loading...
          </p>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-green-500" />
                <span>Total Income</span>
              </div>

              <span className="font-semibold text-green-500">
                {formatCurrency(summary.totalIncome)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowDownRight className="h-5 w-5 text-red-500" />
                <span>Total Expense</span>
              </div>

              <span className="font-semibold text-red-500">
                {formatCurrency(summary.totalExpense)}
              </span>
            </div>

            <div className="border-t pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <span>Net Balance</span>
              </div>

              <span className="font-bold text-primary">
                {formatCurrency(summary.balance)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}