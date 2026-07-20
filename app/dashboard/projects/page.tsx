import Link from "next/link";
import { Plus } from "lucide-react";

import { getProjects } from "@/lib/services/project.service";

import { Button } from "@/components/ui/button";
import ProjectList from "@/components/projects/ProjectList";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Projects
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage all your personal projects in one place.
          </p>
        </div>

        <Button asChild className="w-full sm:w-auto">
          <Link href="/dashboard/projects/create">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <ProjectList projects={projects} />
    </div>
  );
}
