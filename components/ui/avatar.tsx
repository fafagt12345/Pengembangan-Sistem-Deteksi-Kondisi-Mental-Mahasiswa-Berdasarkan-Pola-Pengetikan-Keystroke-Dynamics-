import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
}

export function Avatar({ className, src, name, ...props }: AvatarProps) {
  return (
    <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-100", className)} {...props}>
      {src ? <img src={src} alt={name ?? "avatar"} className="h-full w-full rounded-2xl object-cover" /> : <span className="text-sm font-semibold">{name?.charAt(0).toUpperCase() ?? "A"}</span>}
    </div>
  );
}
