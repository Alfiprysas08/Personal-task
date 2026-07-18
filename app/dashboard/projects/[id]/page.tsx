import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";

import { getProjectById } from "@/lib/services/project.service";
import { getChecklists } from "@/lib/services/checklist.service";

import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/projects/ProjectCard";
import DeleteProjectDialog from "@/components/projects/DeleteProjectDialog";

import ChecklistForm from "@/components/checklist/ChecklistForm";
import ChecklistList from "@/components/checklist/ChecklistList";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const checklists = await getChecklists(id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href="/dashboard/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="flex gap-3">
          <Button asChild>
            <Link href={`/dashboard/projects/${project.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>

          <DeleteProjectDialog projectId={project.id!} />
        </div>
      </div>

      {/* Project Information */}
      <ProjectCard
        id={project.id!}
        name={project.name}
        description={project.description}
        status={project.status}
        progress={project.progress}
        dueDate={project.dueDate}
      />

      {/* Checklist */}
      <div className="rounded-xl border p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">
            Project Checklist
          </h2>

          <p className="text-sm text-muted-foreground">
            Track everything you've completed for this project.
          </p>
        </div>

        <ChecklistForm projectId={project.id!} />

        <ChecklistList checklists={checklists} />
      </div>
    </div>
  );
}