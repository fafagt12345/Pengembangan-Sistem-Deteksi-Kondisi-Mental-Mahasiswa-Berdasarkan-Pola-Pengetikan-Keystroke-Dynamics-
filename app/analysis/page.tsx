import Link from "next/link";
import { CircleDashed, FileCheck, PieChart, SlidersHorizontal } from "lucide-react";

export default function AnalysisPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Analisis</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Tinjau hasil keystroke terbaru Anda.</h1>
            </div>
            <div className="rounded-3xl bg-slate-900/90 px-5 py-4 text-slate-300">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Status</p>
              <p className="mt-2 text-lg font-semibold text-white">Selesai</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              { label: "Konsistensi Fokus", value: "82%", icon: CircleDashed },
              { label: "Sinyal Stres", value: "41%", icon: SlidersHorizontal },
              { label: "Keterlibatan", value: "69%", icon: PieChart },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 text-slate-300">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-cyan-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/30">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Interpretasi</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Apa yang data sarankan</h2>
                </div>
                <FileCheck className="h-6 w-6 text-violet-300" />
              </div>
              <div className="mt-8 space-y-6 text-slate-300">
                <p>
                  Penilaian menunjukkan kecepatan mengetik yang stabil dengan penanda stres sedang. Panduan adaptif dapat membantu menyeimbangkan beban kognitif sambil menjaga kesejahteraan siswa.
                </p>
                <p>
                  Fokus pada kecepatan pemulihan dan konsistensi selama sesi mengetik yang lebih lama untuk mengurangi gesekan dan meningkatkan ketahanan di seluruh penilaian berulang.
                </p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/30">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Tindakan yang Direkomendasikan</p>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-5">
                  <p className="font-semibold text-white">Dorong istirahat terjadwal selama tugas.</p>
                  <p className="mt-2 text-sm text-slate-400">Interval jeda pendek membantu mempertahankan kejelasan mental dan mengurangi ketegangan mengetik.</p>
                </li>
                <li className="rounded-3xl border border-slate-800/90 bg-slate-900/90 p-5">
                  <p className="font-semibold text-white">Bandingkan data tren di seluruh sesi.</p>
                  <p className="mt-2 text-sm text-slate-400">Identifikasi peningkatan atau lonjakan stres melalui perbandingan mingguan.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/history" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">
              Lihat Riwayat
            </Link>
            <Link href="/settings" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400/20 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/30">
              Sesuaikan Pengaturan Privasi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
