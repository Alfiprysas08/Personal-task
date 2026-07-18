import { Checklist } from "@/lib/services/checklist.service";

import ChecklistItem from "./ChecklistItem";

interface ChecklistListProps {
  checklists: Checklist[];
}

export default function ChecklistList({
  checklists,
}: ChecklistListProps) {
  if (checklists.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <h3 className="text-lg font-semibold">
          No checklist yet
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Add your first checklist item to start tracking your progress.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {checklists.map((checklist) => (
        <ChecklistItem
          key={checklist.id}
          checklist={checklist}
        />
      ))}
    </div>
  );
}