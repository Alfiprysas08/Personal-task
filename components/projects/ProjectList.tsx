import ProjectCard from "./ProjectCard";
import { Project } from "@/lib/services/project.service";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({
  projects,
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <h3 className="text-lg font-semibold">
          No projects found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first project to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id!}
          name={project.name}
          description={project.description}
          status={project.status}
          progress={project.progress}
          dueDate={project.dueDate}
        />
      ))}
    </div>
  );
}