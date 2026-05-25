"use client";

import Link from "next/link";
import { BarChart3, ClipboardList, FileSearch, LayoutDashboard, Sparkles, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { useTranslation } from "@/lib/useTranslation";

export default function DashboardPage() {
  const { t } = useTranslation();

  const dashboardStats = [
    { title: t("activeSessions"), value: "42", description: t("today"), accent: "bg-cyan-400/15 text-cyan-300" },
    { title: t("engagementRate"), value: "78%", description: t("studentSignal"), accent: "bg-violet-500/15 text-violet-300" },
    { title: t("alertsPending"), value: "6", description: t("followUp"), accent: "bg-amber-500/15 text-amber-300" },
  ];

  const actions = [
    { title: t("runAssessment"), description: t("runAssessmentDesc"), icon: Sparkles, href: "/typing-test" },
    { title: t("viewHistory"), description: t("viewHistoryDesc"), icon: ClipboardList, href: "/history" },
    { title: t("researchNotes"), description: t("researchNotesDesc"), icon: FileSearch, href: "/about" },
  ];

  return (
    <div className="relative overflow-hidden py-12">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-3xl">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">{t("dashboard")}</p>
                  <h1 className="mt-4 text-4xl font-semibold text-white">{t("analyticsGlance")}</h1>
                </div>
                <div className="rounded-3xl bg-slate-900/90 px-4 py-3 text-sm text-slate-300">{t("safeMode")}</div>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {dashboardStats.map((stat) => (
                  <GlassCard key={stat.title} title={stat.title} value={stat.value} description={stat.description} accent={stat.accent} />
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/30 backdrop-blur-3xl">
                <div className="flex items-center justify-between gap-4 text-cyan-300">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em]">{t("latestInsights")}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">{t("typingRhythmTrend")}</h2>
                  </div>
                  <TrendingUp className="h-7 w-7" />
                </div>
                <div className="mt-8 h-72 rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-6">
                  <div className="flex h-full flex-col justify-between">
                    <p className="text-slate-400">{t("graphPreview")}</p>
                    <div className="h-32 rounded-[1.5rem] bg-gradient-to-r from-cyan-500/15 via-violet-500/15 to-slate-900/40 p-4">
                      <div className="h-full rounded-[1.5rem] bg-slate-950/70" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/30 backdrop-blur-3xl">
                <div className="flex items-center justify-between gap-4 text-violet-300">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em]">{t("activeSummary")}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">{t("sessionCoherence")}</h2>
                  </div>
                  <BarChart3 className="h-7 w-7" />
                </div>
                <div className="mt-8 space-y-4">
                  <div className="rounded-3xl bg-slate-900/90 p-5 text-slate-300">
                    <p className="text-sm text-slate-400">{t("behaviorChange")}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">+12% {t("lastWeek")}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/90 p-5 text-slate-300">
                    <p className="text-sm text-slate-400">{t("alertQuality")}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{t("highConfidence")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-3xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">{t("workflow")}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{t("actionNextSteps")}</h2>
                </div>
                <span className="rounded-full bg-slate-800/90 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">2 {t("newActions")}</span>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {actions.map((item) => (
                  <Link key={item.title} href={item.href} className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-5 text-slate-300 transition hover:border-cyan-400/40 hover:bg-slate-900/95">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-800 text-cyan-300">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/30 backdrop-blur-3xl">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Peringatan</p>
              <ul className="mt-6 space-y-4">
                {["Peristiwa stres yang dicurigai dalam sesi #23", "Latensi pengetikan melebihi ambang batas", "Ringkasan penelitian siap untuk ditinjau"].map((item) => (
                  <li key={item} className="rounded-3xl bg-slate-900/90 p-4 text-sm text-slate-300">{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/30 backdrop-blur-3xl">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Tautan Cepat</p>
              <div className="mt-6 grid gap-3">
                {[
                  { label: "Pengaturan Profil", href: "/profile" },
                  { label: "Laporan Masa Lalu", href: "/history" },
                  { label: "Konsol Admin", href: "/admin" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="rounded-3xl border border-slate-800/90 bg-slate-900/90 px-4 py-4 text-sm text-slate-300 transition hover:border-cyan-400/40 hover:bg-slate-900/95">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
