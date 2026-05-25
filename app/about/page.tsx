import Link from "next/link";
import { BookOpen, MessageCircle, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Tentang penelitian</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Pahami ilmu di balik model keystroke.</h1>
            </div>
            <Link href="/docs" className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100">
              Lihat Dokumentasi
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-6 text-slate-300">
              <BookOpen className="h-6 w-6 text-cyan-300" />
              <h2 className="mt-4 text-xl font-semibold text-white">Berbasis Bukti</h2>
              <p className="mt-3 text-sm text-slate-400">Dibangun dari metrik yang diinformasikan oleh peer dan metodologi studi yang divalidasi.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-6 text-slate-300">
              <Users className="h-6 w-6 text-violet-300" />
              <h2 className="mt-4 text-xl font-semibold text-white">Berfokus pada Siswa</h2>
              <p className="mt-3 text-sm text-slate-400">Dirancang untuk menjaga privasi sambil memberikan umpan balik yang membantu kepada siswa.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-6 text-slate-300">
              <MessageCircle className="h-6 w-6 text-emerald-300" />
              <h2 className="mt-4 text-xl font-semibold text-white">Kolaboratif</h2>
              <p className="mt-3 text-sm text-slate-400">Memungkinkan peneliti, konselor, dan siswa untuk bekerja dari wawasan yang sama.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
              <h2 className="text-2xl font-semibold text-white">Tujuan Penelitian</h2>
              <p className="mt-4 text-slate-300 leading-7">
                Jelajahi bagaimana pola keystroke selaras dengan beban kerja mental, stres, dan perhatian. Buat kerangka evaluasi yang aman yang dapat tertanam dalam sistem dukungan kampus.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
              <h2 className="text-2xl font-semibold text-white">Yang Diharapkan</h2>
              <div className="mt-5 space-y-4 text-slate-300">
                <p>Dokumentasi yang jelas, metodologi beranotasi, dan sampel dasbor berpusat pengguna untuk tinjauan pemangku kepentingan.</p>
                <p>Temuan yang mengutamakan privasi, dengan berbagi selektif dan kontrol yang siap kepatuhan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
