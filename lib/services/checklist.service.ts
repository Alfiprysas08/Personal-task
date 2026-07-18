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
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { updateProjectProgress } from "./project.service";

export interface Checklist {
  id?: string;
  projectId: string;
  title: string;
  completed: boolean;
}

const checklistCollection = collection(db, "checklists");

/**
 * Create Checklist
 */
export async function createChecklist(
  checklist: Checklist
): Promise<string> {
  const docRef = await addDoc(checklistCollection, {
    ...checklist,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await updateProjectProgress(checklist.projectId);

  return docRef.id;
}

/**
 * Get Checklists by Project
 */
export async function getChecklists(
  projectId: string
): Promise<Checklist[]> {
  const q = query(
    checklistCollection,
    where("projectId", "==", projectId),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      projectId: data.projectId,
      title: data.title,
      completed: data.completed ?? false,
    };
  });
}

/**
 * Toggle Checklist
 */
export async function toggleChecklist(
  id: string,
  completed: boolean
): Promise<void> {
  const docRef = doc(db, "checklists", id);

  await updateDoc(docRef, {
    completed,
    updatedAt: serverTimestamp(),
  });

  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    const data = snapshot.data();

    await updateProjectProgress(data.projectId);
  }
}

/**
 * Update Checklist Title
 */
export async function updateChecklist(
  id: string,
  title: string
): Promise<void> {
  const docRef = doc(db, "checklists", id);

  await updateDoc(docRef, {
    title,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete Checklist
 */
export async function deleteChecklist(
  id: string
): Promise<void> {
  const docRef = doc(db, "checklists", id);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return;
  }

  const data = snapshot.data();

  await deleteDoc(docRef);

  await updateProjectProgress(data.projectId);
}