import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <div className={cn("h-3 overflow-hidden rounded-full bg-slate-800/80", className)} {...props}>
      <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}
