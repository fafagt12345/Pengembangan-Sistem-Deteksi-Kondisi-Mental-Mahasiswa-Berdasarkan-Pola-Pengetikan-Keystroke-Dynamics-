import Link from "next/link";
import { BookOpen, Code2, LayoutList } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Dokumentasi</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Temukan detail untuk setiap alur kerja.</h1>
            </div>
            <Link href="/register" className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100">
              Mulai Uji Coba
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-6 text-slate-300">
              <BookOpen className="h-6 w-6 text-cyan-300" />
              <h2 className="mt-4 text-xl font-semibold text-white">Memulai</h2>
              <p className="mt-3 text-sm text-slate-400">Cara mendaftar, menjalankan penilaian, dan menginterpretasikan laporan.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-6 text-slate-300">
              <Code2 className="h-6 w-6 text-violet-300" />
              <h2 className="mt-4 text-xl font-semibold text-white">Integrasi</h2>
              <p className="mt-3 text-sm text-slate-400">Catatan desain antarmuka, aliran data, dan panduan ekspor.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-6 text-slate-300">
              <LayoutList className="h-6 w-6 text-emerald-300" />
              <h2 className="mt-4 text-xl font-semibold text-white">Pola UX</h2>
              <p className="mt-3 text-sm text-slate-400">Halaman yang direkomendasikan, perilaku mobile, dan alur kerja tinjauan.</p>
            </div>
          </div>

          <div className="mt-10 space-y-6 rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h2 className="text-xl font-semibold text-white">Alur Platform</h2>
                <p className="mt-3 text-slate-300 leading-7">Dari login hingga analisis, UI memandu pengguna menggunakan navigasi yang jelas, bantuan kontekstual, dan sinyal visual yang tenang.</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Gambaran Keamanan</h2>
                <p className="mt-3 text-slate-300 leading-7">Dokumentasi mencakup pengaturan privasi, pemberitahuan persetujuan, dan kontrol akses untuk data penelitian.</p>
              </div>
            </div>
            <Link href="/about" className="inline-flex rounded-full bg-cyan-400/20 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/30">
              Jelajahi Detail Penelitian
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
