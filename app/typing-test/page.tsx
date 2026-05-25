"use client";

import Link from "next/link";
import { ArrowRight, Cpu, Keyboard } from "lucide-react";
import { KeystrokeEngine } from "@/components/KeystrokeEngine";
import { useTranslation } from "@/lib/useTranslation";

export default function TypingTestPage() {
  const { t } = useTranslation();

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-3xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Ruang Teduh & Refleksi Diri</p>
              <h1 className="text-4xl font-semibold text-white">Lepaskan segala ganjalan yang menyelimuti pikiranmu.</h1>
              <p className="max-w-3xl text-slate-400 leading-7">
                Selamat datang di ruang tenangmu. Ambil napas dalam-dalam dan biarkan ketegangan perlahan memudar. Tidak ada penilaian di sini; tidak ada benar atau salah. Gunakan kesempatan ini untuk mencurahkan segala keluh kesah, keresahan, atau beban yang selama ini kamu simpan sendiri. Biarkan jemarimu berbicara dan rasakan perasaanmu menjadi lebih ringan.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800/90 bg-slate-900/90 px-6 py-5 text-slate-300">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Langkah Menuju Ketenangan</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-sm text-slate-400">Tumpahkan semua emosi dan pikiran yang mengganjal di hati tanpa rasa takut.</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-sm text-slate-400">Rilekskan bahumu, tenangkan batinmu, dan menulislah dengan penuh kejujuran.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
              <div className="flex items-center gap-4 text-cyan-300">
                <Keyboard className="h-6 w-6" />
                <p className="text-sm uppercase tracking-[0.3em]">Antarmuka Penilaian</p>
              </div>
              <div className="mt-8">
                <KeystrokeEngine />
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
              <div className="flex items-center gap-4 text-violet-300">
                <Cpu className="h-6 w-6" />
                <p className="text-sm uppercase tracking-[0.3em]">Lingkungan Terpandu</p>
              </div>
              <ul className="mt-8 space-y-4 text-slate-300">
                <li className="rounded-3xl bg-slate-900/90 p-4">
                  <p className="font-semibold text-white">Pelepasan Beban Pikiran</p>
                  <p className="mt-2 text-sm text-slate-400">Sistem kami mendengarkan ritme perasaanmu melalui caramu mengetik, membantumu mengenali kondisi dirimu sendiri.</p>
                </li>
                <li className="rounded-3xl bg-slate-900/90 p-4">
                  <p className="font-semibold text-white">Kedamaian Batin</p>
                  <p className="mt-2 text-sm text-slate-400">Antarmuka yang tenang dirancang agar kamu bisa lebih fokus dan terhubung dengan kejujuran di dalam hatimu.</p>
                </li>
                <li className="rounded-3xl bg-slate-900/90 p-4">
                  <p className="font-semibold text-white">Kerahasiaan Sepenuhnya</p>
                  <p className="mt-2 text-sm text-slate-400">Setiap cerita dan keluh kesahmu dijaga dengan sangat aman, semata-mata untuk mendukung kesejahteraan mentalmu.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-3xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Sudah merasa lebih tenang?</h2>
                <p className="mt-2 text-slate-400">Jika kamu merasa sudah cukup bercerita, jangan lupa untuk menyimpan hasil refleksimu di atas.</p>
              </div>
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                Kembali ke Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
