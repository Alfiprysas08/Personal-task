import ProjectForm from "@/components/projects/ProjectForm";

export default function CreateProjectPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Create Project
        </h1>

        <p className="mt-2 text-muted-foreground">
          Add a new project to your workspace.
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}
