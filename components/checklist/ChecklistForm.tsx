"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createChecklist } from "@/lib/services/checklist.service";

interface ChecklistFormProps {
  projectId: string;
}

export default function ChecklistForm({
  projectId,
}: ChecklistFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);

      await createChecklist({
        projectId,
        title: title.trim(),
        completed: false,
      });

      setTitle("");

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <Input
        placeholder="Add new checklist..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      <Button
        type="submit"
        disabled={loading || !title.trim()}
        className="w-full sm:w-auto"
      >
        <Plus className="mr-2 h-4 w-4" />
        {loading ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
