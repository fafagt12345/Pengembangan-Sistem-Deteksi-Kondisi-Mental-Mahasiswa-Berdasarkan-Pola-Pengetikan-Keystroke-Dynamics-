import React from "react";

interface GlassCardProps {
  title: string;
  value: string;
  description: string;
  accent?: string;
}

export function GlassCard({ title, value, description, accent }: GlassCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className={`rounded-2xl px-3 py-1 text-xs font-semibold uppercase ${accent ?? "bg-cyan-400/10 text-cyan-300"}`}>
          {description}
        </div>
      </div>
    </div>
  );
}
