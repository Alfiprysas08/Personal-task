import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
}: StatsCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="flex items-start justify-between gap-4 p-4 sm:p-6">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 break-words text-2xl font-bold sm:text-3xl">
            {value}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div
          className={`shrink-0 rounded-xl bg-muted p-3 sm:p-4 ${iconColor}`}
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
      </CardContent>
    </Card>
  );
}
