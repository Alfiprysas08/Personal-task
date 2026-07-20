import TransactionForm from "@/components/finance/TransactionForm";

export default function CreateTransactionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          New Transaction
        </h1>

        <p className="text-muted-foreground">
          Add a new income or expense.
        </p>
      </div>

      <TransactionForm />
    </div>
  );
}
