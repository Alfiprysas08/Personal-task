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
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div
          className={`rounded-xl bg-muted p-4 ${iconColor}`}
        >
          <Icon className="h-7 w-7" />
        </div>
      </CardContent>
    </Card>
  );
}