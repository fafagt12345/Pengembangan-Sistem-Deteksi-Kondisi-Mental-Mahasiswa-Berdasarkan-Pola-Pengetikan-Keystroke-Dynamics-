import Link from "next/link";
import { ShieldCheck, SlidersHorizontal, Users, Zap } from "lucide-react";

const controls = [
  { name: "Akses Pengguna", description: "Kelola peran dan izin.", icon: Users },
  { name: "Peringatan Risiko", description: "Tinjau penilaian yang ditandai.", icon: ShieldCheck },
  { name: "Pengaturan Model", description: "Sesuaikan ambang batas analisis.", icon: SlidersHorizontal },
  { name: "Kesehatan Sistem", description: "Pantau uptime dan kinerja.", icon: Zap },
];

export default function AdminPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Admin</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Pusat kontrol untuk pemangku kepentingan penelitian.</h1>
            </div>
            <Link href="/settings" className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100">
              Kelola pengaturan
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {controls.map((item) => (
              <div key={item.name} className="rounded-[1.75rem] border border-slate-800/90 bg-slate-900/90 p-6 text-slate-300 transition hover:border-cyan-400/40 hover:bg-slate-900/95">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-cyan-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-white">{item.name}</h2>
                <p className="mt-3 text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Pembaruan Tim</p>
              <div className="mt-6 space-y-4 text-slate-300">
                <p>Pendaftaran pilot baru sudah aktif. Tinjau catatan persetujuan dan alur kerja sebelum menjadwalkan sesi.</p>
                <p>Perbarui saluran notifikasi Anda untuk peringatan kritis dan ringkasan penelitian.</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Snapshot Sistem</p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-slate-900/90 p-5 text-slate-300">
                  <p className="font-semibold text-white">16 studi aktif</p>
                  <p className="mt-2 text-sm text-slate-400">Pemantauan langsung dan evaluasi.</p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 p-5 text-slate-300">
                  <p className="font-semibold text-white">99,9% uptime</p>
                  <p className="mt-2 text-sm text-slate-400">Lingkungan penelitian yang aman dan stabil.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
