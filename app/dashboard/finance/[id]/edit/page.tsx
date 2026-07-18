import { notFound } from "next/navigation";

import TransactionForm from "@/components/finance/TransactionForm";

import {
  getTransactionById,
} from "@/lib/services/finance.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTransactionPage({
  params,
}: Props) {
  const { id } = await params;

  const transaction =
    await getTransactionById(id);

  if (!transaction) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Transaction
        </h1>

        <p className="text-muted-foreground">
          Update your transaction.
        </p>
      </div>

      <TransactionForm
        transaction={transaction}
        isEdit
      />
    </div>
  );
}