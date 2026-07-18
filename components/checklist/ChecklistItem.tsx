"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
  Checklist,
  deleteChecklist,
  toggleChecklist,
} from "@/lib/services/checklist.service";

interface ChecklistItemProps {
  checklist: Checklist;
}

export default function ChecklistItem({
  checklist,
}: ChecklistItemProps) {
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);

    await toggleChecklist(
      checklist.id!,
      !checklist.completed
    );

    window.location.reload();
  }

  async function handleDelete() {
    setLoading(true);

    await deleteChecklist(checklist.id!);

    window.location.reload();
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={checklist.completed}
          onCheckedChange={handleToggle}
        />

        <span
          className={
            checklist.completed
              ? "line-through text-muted-foreground"
              : ""
          }
        >
          {checklist.title}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        disabled={loading}
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}