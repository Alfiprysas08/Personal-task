import Link from "next/link";
import { Plus } from "lucide-react";

import { getProjects } from "@/lib/services/project.service";

import { Button } from "@/components/ui/button";
import ProjectList from "@/components/projects/ProjectList";


export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Projects
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage all your personal projects in one place.
          </p>
        </div>

        <Button asChild>
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