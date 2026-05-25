import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-800/90 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/40 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800/80 text-cyan-300 transition group-hover:bg-cyan-400/10">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm leading-7 text-slate-400">{description}</p>
    </div>
  );
}
