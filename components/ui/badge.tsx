import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "secondary";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]",
        variant === "default" && "bg-cyan-400/10 text-cyan-200",
        variant === "outline" && "border border-slate-700 bg-transparent text-slate-300",
        variant === "secondary" && "bg-slate-800/80 text-slate-300",
        className,
      )}
      {...props}
    />
  );
}
