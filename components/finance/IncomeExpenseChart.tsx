"use client";

import { useEffect, useState } from "react";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import { Card, CardContent } from "@/components/ui/card";
import { getFinanceSummary } from "@/lib/services/finance.service";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function IncomeExpenseChart() {
  const [summary, setSummary] =
    useState<FinanceSummary>({
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
    });

  useEffect(() => {
    async function loadSummary() {
      const data = await getFinanceSummary();
      setSummary(data);
    }

    loadSummary();
  }, []);

  const data = {
    labels: ["Income", "Expense"],

    datasets: [
      {
        data: [
          summary.totalIncome,
          summary.totalExpense,
        ],

        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="mb-6 text-lg font-semibold">
          Income vs Expense
        </h2>

        <Doughnut
          data={data}
          options={options}
        />
      </CardContent>
    </Card>
  );
}