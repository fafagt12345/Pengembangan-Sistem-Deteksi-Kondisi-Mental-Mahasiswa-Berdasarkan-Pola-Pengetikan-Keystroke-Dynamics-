"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import { useAuthStore } from "@/store/useAuthStore";

export function MarketingNavbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();

  const navItems = [
    { label: t("home"), href: "/" },
    ...(user ? [
      { label: t("dashboard"), href: "/dashboard" },
      { label: t("history"), href: "/history" },
    ] : []),
    { label: t("about"), href: "/about" },
    { label: t("research"), href: "/about#research" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-violet-500/20 text-cyan-300 shadow-glow">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-300">Keystroke AI</p>
            <p className="text-sm text-slate-400">Dinamika Mental</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 xl:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-cyan-300">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {!user ? (
            <>
              <Link href="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">
                {t("login")}
              </Link>
              <Link href="/register" className="rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-500/20 px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:from-cyan-300/40 hover:to-violet-400/40">
                {t("getStarted")}
              </Link>
            </>
          ) : (
            <Link href="/profile" className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {user.displayName || "User"}
            </Link>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="xl:hidden text-slate-300">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-800/80 bg-slate-950/95 xl:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-800/80 hover:text-cyan-300" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <Link href="/login" className="rounded-2xl border border-slate-700 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300" onClick={() => setOpen(false)}>
                  {t("login")}
                </Link>
                <Link href="/register" className="rounded-2xl bg-gradient-to-r from-cyan-400/20 to-violet-500/20 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:from-cyan-300/40 hover:to-violet-400/40" onClick={() => setOpen(false)}>
                  {t("getStarted")}
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
