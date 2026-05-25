'use client';

import Link from "next/link";
import { ShieldCheck, SlidersHorizontal, Zap, Globe } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function SettingsPage() {
  const { t } = useTranslation();
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const settingsItems = [
    { title: t("security"), description: t("securityDesc"), icon: ShieldCheck },
    { title: t("thresholds"), description: t("thresholdsDesc"), icon: SlidersHorizontal },
    { title: t("system"), description: t("systemDesc"), icon: Zap },
  ];

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{t("settings")}</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">{t("configureExperience")}</h1>
            </div>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100">
              {t("backToDashboard")}
            </Link>
          </div>

          {/* Language Switcher Section */}
          <div className="mt-10 rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-emerald-300" />
              <h2 className="text-2xl font-semibold text-white">{t("language")}</h2>
            </div>
            <p className="mt-3 text-slate-400">{t("selectLanguage")}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setLanguage("id")}
                className={`rounded-2xl border-2 px-6 py-4 text-left font-semibold transition ${
                  language === "id"
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-100"
                    : "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-cyan-400/40"
                }`}
              >
                🇮🇩 {t("indonesian")}
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`rounded-2xl border-2 px-6 py-4 text-left font-semibold transition ${
                  language === "en"
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-100"
                    : "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-cyan-400/40"
                }`}
              >
                🇺🇸 {t("english")}
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {settingsItems.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-6 text-slate-300 transition hover:border-cyan-400/40 hover:bg-slate-900/95">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-cyan-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">{t("privacy")}</p>
              <div className="mt-6 space-y-4 text-slate-300">
                <p>{t("privacyDesc")}</p>
                <p>{t("privacyFull")}</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-violet-300">{t("notifications")}</p>
              <div className="mt-6 space-y-4 text-slate-300">
                <p>{t("notificationsDesc")}</p>
                <p>{t("notificationsFull")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
