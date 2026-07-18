import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface Transaction {
  id?: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  note: string;
  date: string;
}

const financeCollection = collection(db, "finance");

/**
 * Create Transaction
 */
export async function createTransaction(
  transaction: Transaction
): Promise<string> {
  const docRef = await addDoc(financeCollection, {
    ...transaction,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Get All Transactions
 */
export async function getTransactions(): Promise<Transaction[]> {
  const q = query(
    financeCollection,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      type: data.type,
      category: data.category,
      amount: data.amount,
      note: data.note,
      date: data.date,
    };
  });
}

/**
 * Get Transaction By ID
 */
export async function getTransactionById(
  id: string
): Promise<Transaction | null> {
  const docRef = doc(db, "finance", id);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    type: data.type,
    category: data.category,
    amount: data.amount,
    note: data.note,
    date: data.date,
  };
}

/**
 * Update Transaction
 */
export async function updateTransaction(
  id: string,
  transaction: Transaction
): Promise<void> {
  const docRef = doc(db, "finance", id);

  await updateDoc(docRef, {
    type: transaction.type,
    category: transaction.category,
    amount: transaction.amount,
    note: transaction.note,
    date: transaction.date,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete Transaction
 */
export async function deleteTransaction(
  id: string
): Promise<void> {
  const docRef = doc(db, "finance", id);

  await deleteDoc(docRef);
}

/**
 * Get Finance Summary
 */
export async function getFinanceSummary() {
  const transactions = await getTransactions();

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
}
/**
 * Get Current Month Finance Summary
 */
export async function getCurrentMonthSummary() {
  const transactions = await getTransactions();

  const now = new Date();

  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);

    const sameMonth =
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (!sameMonth) return;

    if (transaction.type === "income") {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }
  });

  return {
    income,
    expense,
    balance: income - expense,
  };
}