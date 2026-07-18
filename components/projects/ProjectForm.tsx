"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createProject,
  updateProject,
  Project,
} from "@/lib/services/project.service";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ProjectFormProps {
  project?: Project;
  isEdit?: boolean;
}

export default function ProjectForm({
  project,
  isEdit = false,
}: ProjectFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Project>({
    name: "",
    description: "",
    status: "Planning",
    startDate: "",
    dueDate: "",
    progress: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      // Progress sekarang otomatis dari checklist
      const payload: Project = {
        ...formData,
        progress: project?.progress ?? 0,
      };

      if (isEdit && project?.id) {
        await updateProject(project.id, payload);
      } else {
        await createProject(payload);
      }

      router.push("/dashboard/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Project Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Name
            </label>

            <Input
              name="name"
              placeholder="Website Sekolah"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Write project description..."
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
            >
              <option value="Planning">
                Planning
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Archived">
                Archived
              </option>
            </select>
          </div>

          {/* Dates */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Start Date
              </label>

              <Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Due Date
              </label>

              <Input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Project"
              : "Create Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}