import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface Project {
  id?: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  dueDate: string;
  progress: number;
}

const projectCollection = collection(db, "projects");

/**
 * Create Project
 */
export async function createProject(
  project: Project
): Promise<string> {
  const docRef = await addDoc(projectCollection, {
    ...project,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Get All Projects
 */
export async function getProjects(): Promise<Project[]> {
  const q = query(
    projectCollection,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      status: data.status,
      startDate: data.startDate,
      dueDate: data.dueDate,
      progress: data.progress ?? 0,
    };
  });
}

/**
 * Get Project By ID
 */
export async function getProjectById(
  id: string
): Promise<Project | null> {
  const docRef = doc(db, "projects", id);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    name: data.name,
    description: data.description,
    status: data.status,
    startDate: data.startDate,
    dueDate: data.dueDate,
    progress: data.progress ?? 0,
  };
}

/**
 * Update Project
 */
export async function updateProject(
  id: string,
  project: Project
): Promise<void> {
  const docRef = doc(db, "projects", id);

  await updateDoc(docRef, {
    name: project.name,
    description: project.description,
    status: project.status,
    startDate: project.startDate,
    dueDate: project.dueDate,
    progress: project.progress,
    updatedAt: serverTimestamp(),
  });
}
/**
 * Get Active Projects Count
 */
export async function getActiveProjectsCount(): Promise<number> {
  const projects = await getProjects();

  return projects.filter(
    (project) => project.status !== "Completed"
  ).length;
}

/**
 * Delete Project
 */
export async function deleteProject(
  id: string
): Promise<void> {
  const docRef = doc(db, "projects", id);

  await deleteDoc(docRef);
}

/**
 * Update Project Progress Automatically
 */
export async function updateProjectProgress(
  projectId: string
): Promise<void> {
  const checklistCollection = collection(
    db,
    "checklists"
  );

  const totalSnapshot = await getCountFromServer(
    query(
      checklistCollection,
      where("projectId", "==", projectId)
    )
  );

  const completedSnapshot = await getCountFromServer(
    query(
      checklistCollection,
      where("projectId", "==", projectId),
      where("completed", "==", true)
    )
  );

  const total = totalSnapshot.data().count;
  const completed = completedSnapshot.data().count;

  const progress =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const projectRef = doc(db, "projects", projectId);

  await updateDoc(projectRef, {
    progress,
    updatedAt: serverTimestamp(),
  });
}