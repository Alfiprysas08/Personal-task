"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createTransaction,
  updateTransaction,
  Transaction,
} from "@/lib/services/finance.service";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface TransactionFormProps {
  transaction?: Transaction;
  isEdit?: boolean;
}

export default function TransactionForm({
  transaction,
  isEdit = false,
}: TransactionFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Transaction>(
    transaction ?? {
      type: "expense",
      category: "",
      amount: 0,
      note: "",
      date: "",
    }
  );

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      if (isEdit && transaction?.id) {
        await updateTransaction(
          transaction.id,
          formData
        );

        alert("Transaction updated!");
      } else {
        await createTransaction(formData);

        alert("Transaction created!");
      }

      router.push("/dashboard/finance");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Type */}
          <div>
            <label className="text-sm font-medium">
              Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-md border p-2 mt-1"
            >
              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">
              Category
            </label>

            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm font-medium">
              Amount
            </label>

            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium">
              Date
            </label>

            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Note */}
          <div>
            <label className="text-sm font-medium">
              Note
            </label>

            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Transaction"
              : "Save Transaction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
