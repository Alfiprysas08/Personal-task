"use client";

import { useSyncExternalStore } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";

interface BalanceStatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}

const STORAGE_KEY = "dashboard-balance-visible";
const STORAGE_EVENT = "dashboard-balance-visibility-change";
const HIDDEN_VALUE = "Rp ******";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
};

const getSnapshot = () => localStorage.getItem(STORAGE_KEY) ?? "true";

const getServerSnapshot = () => "true";

export default function BalanceStatsCard({
  title,
  value,
  description,
  icon,
  iconColor,
}: BalanceStatsCardProps) {
  const isVisible =
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) !== "false";

  const toggleVisibility = () => {
    localStorage.setItem(STORAGE_KEY, String(!isVisible));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  };

  const ToggleIcon = isVisible ? EyeOff : Eye;

  return (
    <div className="relative">
      <StatsCard
        title={title}
        value={isVisible ? value : HIDDEN_VALUE}
        description={description}
        icon={icon}
        iconColor={iconColor}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={isVisible ? "Hide balance" : "Show balance"}
        className="absolute right-4 top-4 h-8 w-8"
        onClick={toggleVisibility}
      >
        <ToggleIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
