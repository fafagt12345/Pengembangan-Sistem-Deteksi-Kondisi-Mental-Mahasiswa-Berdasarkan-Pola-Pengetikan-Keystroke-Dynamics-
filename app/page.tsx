"use client";

import Link from "next/link";
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { GlassCard } from "@/components/GlassCard";
import { useTranslation } from "@/lib/useTranslation";
import { useAuthStore } from "@/store/useAuthStore";

export default function HomePage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const features = [
    {
      title: t("realtimeKeystroke"),
      description: t("realTimeDesc"),
      icon: Sparkles,
    },
    {
      title: t("evidenceDriven"),
      description: t("evidenceDesc"),
      icon: ShieldCheck,
    },
    {
      title: t("secureStudent"),
      description: t("secureDesc"),
      icon: HeartHandshake,
    },
  ];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_24%)]" />
      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-28 sm:pt-24">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 shadow-glow">
              <Sparkles className="h-4 w-4" />
              {t("keystrokeAI")}
            </div>
            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                {t("transformTyping")}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {t("saasInterface")}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href={user ? "/dashboard" : "/register"} className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-500/20 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:from-cyan-300/40 hover:to-violet-400/40">
                {t("startAssessment")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300">
                {t("learnResearch")}
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <GlassCard title={t("fastAnalysis")} value="2s" description={t("perSample")} />
              <GlassCard title={t("accuracy")} value="94%" description={t("confidence")} accent="bg-emerald-500/15 text-emerald-300" />
              <GlassCard title={t("students")} value="120+" description={t("pilotUsers")} accent="bg-violet-500/15 text-violet-300" />
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
            <div className="absolute -top-10 right-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-slate-400">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800/80 text-cyan-300">01</span>
                <p className="text-sm uppercase tracking-[0.25em]">{t("consumptionSnapshot")}</p>
              </div>

              <div className="rounded-[1.75rem] border border-slate-800/80 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{t("latestSample")}</p>
                <div className="mt-6 space-y-3">
                  <div className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-5">
                    <p className="text-sm text-slate-400">{t("typingSpeed")}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">165 WPM</p>
                  </div>
                  <div className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-5">
                    <p className="text-sm text-slate-400">{t("stressIndicator")}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{t("medium")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{t("mainAnalysisMarkers")}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[t("latencyShift"), t("keyHoldTime"), t("errorPattern"), t("recoverySpeed")].map((item) => (
                    <div key={item} className="rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{t("engagement")}</span>
                  <span>78%</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800/80">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <SectionHeading
              badge={t("platform")}
              title={t("designerFirst")}
              subtitle={t("dashboardSubtitle")}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/70 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
            <SectionHeading
              badge={t("research")}
              title={t("builtForAcademic")}
              subtitle={t("combineKeystroke")}
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                { label: t("pilotStudies"), value: "12" },
                { label: t("institutions"), value: "5" },
                { label: t("dataPoints"), value: "24k+" },
                { label: t("insightsDelivered"), value: "320+" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-6 text-white">
                  <p className="text-3xl font-semibold text-cyan-300">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 rounded-[2rem] border border-slate-800/90 bg-slate-950/70 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-3xl">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/90">{t("appliedScience")}</p>
              <h3 className="text-3xl font-semibold text-white">{t("designedForTrusted")}</h3>
              <p className="max-w-2xl text-slate-400 leading-7">
                {t("interfaceBuilt")}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[t("secureStorage"), t("adaptiveReporting"), t("responsiveDashboards"), t("collaborativeInsights")].map((item) => (
                <div key={item} className="rounded-3xl bg-slate-900/90 p-5 text-slate-200">
                  <p className="font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{t("readyToExplore")}</p>
              <h2 className="text-4xl font-semibold text-white">{t("seeYourStudent")}</h2>
              <p className="max-w-xl text-slate-400 leading-7">
                {t("moveFromStatic")}
              </p>
            </div>
            <div className="space-y-4 rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-8">
              <div className="rounded-3xl bg-slate-950/90 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{t("launchYourEvaluation")}</p>
                <p className="mt-3 text-lg font-semibold text-white">{t("registerAndStart")}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/register" className="rounded-full bg-cyan-400/15 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25">
                  {t("beginAssessment")}
                </Link>
                <Link href="/docs" className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-200">
                  {t("viewDocs")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
