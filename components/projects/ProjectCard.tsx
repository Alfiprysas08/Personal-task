import Link from "next/link";
import {
  CalendarDays,
  FolderKanban,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  dueDate: string;
}

export default function ProjectCard({
  id,
  name,
  description,
  status,
  progress,
  dueDate,
}: ProjectCardProps) {
  return (
    <Link href={`/dashboard/projects/${id}`}>
      <Card className="cursor-pointer transition-shadow hover:shadow-lg">
        <CardHeader>
          <div className="flex items-start gap-3">
            <FolderKanban className="mt-0.5 h-6 w-6 shrink-0 text-blue-500" />

            <div className="min-w-0">
              <CardTitle className="break-words">{name}</CardTitle>

              <p className="mt-1 break-words text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span>Status</span>

            <span className="break-words text-right font-medium">
              {status}
            </span>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Progress</span>

              <span>{progress}%</span>
            </div>

            <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 shrink-0" />

            <span>{dueDate}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
