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

export interface WeeklyPlanner {
  id?: string;
  title: string;
  day: string;
  completed: boolean;
}

const weeklyPlannerCollection = collection(
  db,
  "weekly-planner"
);

/**
 * Create Weekly Planner
 */
export async function createWeeklyPlanner(
  planner: WeeklyPlanner
): Promise<string> {
  const docRef = await addDoc(
    weeklyPlannerCollection,
    {
      ...planner,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );

  return docRef.id;
}

/**
 * Get All Weekly Planner
 */
export async function getWeeklyPlanners(): Promise<
  WeeklyPlanner[]
> {
  const q = query(
    weeklyPlannerCollection,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      day: data.day,
      completed: data.completed ?? false,
    };
  });
}

/**
 * Get Weekly Planner By ID
 */
export async function getWeeklyPlannerById(
  id: string
): Promise<WeeklyPlanner | null> {
  const docRef = doc(
    db,
    "weekly-planner",
    id
  );

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    title: data.title,
    day: data.day,
    completed: data.completed ?? false,
  };
}

/**
 * Update Weekly Planner
 */
export async function updateWeeklyPlanner(
  id: string,
  planner: WeeklyPlanner
): Promise<void> {
  const docRef = doc(
    db,
    "weekly-planner",
    id
  );

  await updateDoc(docRef, {
    title: planner.title,
    day: planner.day,
    completed: planner.completed,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Toggle Completed
 */
export async function toggleWeeklyPlanner(
  id: string,
  completed: boolean
): Promise<void> {
  const docRef = doc(
    db,
    "weekly-planner",
    id
  );

  await updateDoc(docRef, {
    completed,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete Weekly Planner
 */
export async function deleteWeeklyPlanner(
  id: string
): Promise<void> {
  const docRef = doc(
    db,
    "weekly-planner",
    id
  );

  await deleteDoc(docRef);
}
/**
 * Get Upcoming Tasks
 */
export async function getUpcomingTasks(
  limit = 5
): Promise<WeeklyPlanner[]> {
  const planners = await getWeeklyPlanners();

  return planners
    .filter((planner) => !planner.completed)
    .slice(0, limit);
}

/**
 * Get Completed Tasks
 */
export async function getCompletedTasks(
  limit = 5
): Promise<WeeklyPlanner[]> {
  const planners = await getWeeklyPlanners();

  return planners
    .filter((planner) => planner.completed)
    .slice(0, limit);
}

/**
 * Get Weekly Planner Summary
 */
export async function getWeeklyPlannerSummary() {
  const planners = await getWeeklyPlanners();

  const total = planners.length;
  const completed = planners.filter(
    (planner) => planner.completed
  ).length;

  return {
    total,
    completed,
    pending: total - completed,
  };
}