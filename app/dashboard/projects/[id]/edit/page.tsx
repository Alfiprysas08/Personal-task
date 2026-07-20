import { notFound } from "next/navigation";

import ProjectForm from "@/components/projects/ProjectForm";
import { getProjectById } from "@/lib/services/project.service";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Edit Project
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update your project information.
        </p>
      </div>

      <ProjectForm
        project={project}
        isEdit
      />
    </div>
  );
}
