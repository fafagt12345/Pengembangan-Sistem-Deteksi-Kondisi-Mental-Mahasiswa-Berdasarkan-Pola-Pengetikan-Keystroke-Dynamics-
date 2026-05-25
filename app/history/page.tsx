"use client";

import Link from "next/link";
import { Clock3, FileSearch, LayoutList, Users } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";

const entries = [
  { date: "2025-05-14", score: "86%", insight: "Mengetik stabil dengan variabilitas ringan" },
  { date: "2025-05-09", score: "81%", insight: "Frekuensi jeda yang meningkat" },
  { date: "2025-05-03", score: "88%", insight: "Konsistensi dan kontrol yang kuat" },
];

export default function HistoryPage() {
  const { t } = useTranslation();

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{t("history")}</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">{t("viewHistoryDesc")}</h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-5 text-slate-300">
                <div className="flex items-center gap-3 text-cyan-300">
                  <Clock3 className="h-5 w-5" />
                  <p className="text-sm uppercase tracking-[0.24em]">Aktivitas Terbaru</p>
                </div>
                <p className="mt-4 text-2xl font-semibold text-white">3 sesi</p>
              </div>
              <div className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-5 text-slate-300">
                <div className="flex items-center gap-3 text-violet-300">
                  <Users className="h-5 w-5" />
                  <p className="text-sm uppercase tracking-[0.24em]">Peserta</p>
                </div>
                <p className="mt-4 text-2xl font-semibold text-white">Kohor Siswa</p>
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-800/90 bg-slate-900/90 shadow-xl shadow-slate-950/20">
            <div className="grid gap-4 p-6 sm:grid-cols-[1.2fr_1fr_2fr] bg-slate-950/95 text-sm uppercase tracking-[0.2em] text-slate-500">
              <span>Tanggal</span>
              <span>Skor</span>
              <span>Wawasan</span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {entries.map((entry) => (
                <div key={entry.date} className="grid gap-4 p-6 sm:grid-cols-[1.2fr_1fr_2fr] text-slate-300">
                  <span>{entry.date}</span>
                  <span className="font-semibold text-white">{entry.score}</span>
                  <span>{entry.insight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
              <div className="flex items-center gap-3 text-cyan-300">
                <FileSearch className="h-5 w-5" />
                <p className="text-sm uppercase tracking-[0.24em]">Tinjauan Mendalam</p>
              </div>
              <p className="mt-4 text-slate-300 leading-7">
                Gunakan tampilan riwayat lengkap untuk mengidentifikasi pola dari waktu ke waktu, menghubungkan perubahan dengan fase studi, dan mendukung keputusan konseling berbasis bukti.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
              <div className="flex items-center gap-3 text-violet-300">
                <LayoutList className="h-5 w-5" />
                <p className="text-sm uppercase tracking-[0.24em]">Langkah Selanjutnya</p>
              </div>
              <p className="mt-4 text-slate-300 leading-7">
                Ingin memperluas penelitian? Bandingkan catatan sesi ini dengan faktor kontekstual dan jadwalkan penilaian lanjutan untuk peningkatan berkelanjutan.
              </p>
              <Link href="/analysis" className="mt-6 inline-flex rounded-full bg-cyan-400/20 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/30">
                Tinjau Analisis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
