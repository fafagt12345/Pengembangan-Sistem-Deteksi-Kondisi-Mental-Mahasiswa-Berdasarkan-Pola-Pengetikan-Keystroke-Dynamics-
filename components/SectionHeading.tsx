import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
}

export function SectionHeading({ title, subtitle, description, badge }: SectionHeadingProps) {
  return (
    <div className="space-y-4 text-center">
      {badge ? <span className="inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-300 shadow-sm shadow-cyan-500/10">{badge}</span> : null}
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        {subtitle ? <p className="mx-auto max-w-2xl text-slate-400 sm:text-lg">{subtitle}</p> : null}
      </div>
      {description ? <p className="mx-auto max-w-3xl text-slate-500">{description}</p> : null}
    </div>
  );
}
