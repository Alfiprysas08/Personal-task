"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  deleteTransaction,
  getTransactions,
  Transaction,
} from "@/lib/services/finance.service";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTransactions() {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTransaction(id);

      setTransactions((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Transaction deleted!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete transaction.");
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="mb-4 text-lg font-semibold">
          Recent Transactions
        </h2>

        {loading ? (
          <p className="text-sm text-muted-foreground">
            Loading...
          </p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No transactions found.
          </p>
        ) : (
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  {transaction.type === "income" ? (
                    <ArrowUpCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5 text-red-500" />
                  )}

                  <div>
                    <p className="font-medium">
                      {transaction.category}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {transaction.note}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {transaction.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`font-semibold ${
                      transaction.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(transaction.amount)}
                  </span>

                  <Link
                    href={`/dashboard/finance/${transaction.id}/edit`}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      handleDelete(transaction.id!)
                    }
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}