import { cn } from "@/lib/utils";
import React from "react";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex-center flex-col gap-y-4">
      <h1 className={cn("text-3xl font-semibold")}>🔐 Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
