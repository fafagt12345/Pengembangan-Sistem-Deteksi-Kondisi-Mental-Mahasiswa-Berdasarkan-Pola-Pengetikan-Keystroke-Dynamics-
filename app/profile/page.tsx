import Link from "next/link";
import { Bell, CreditCard, ShieldCheck, User2 } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Profil</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Profil pengguna aman Anda.</h1>
            </div>
            <Link href="/settings" className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-100">
              Edit profil
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-800 text-cyan-300">
                  <User2 className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Akun Siswa</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Alya Nur</h2>
                </div>
              </div>
              <div className="mt-8 space-y-4 text-slate-300">
                <p>Email: <span className="text-white">alya@example.com</span></p>
                <p>Peran: <span className="text-cyan-300">Peserta penelitian</span></p>
                <p>Anggota sejak: <span className="text-slate-400">Oktober 2024</span></p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
              <div className="grid gap-4">
                {[
                  { icon: ShieldCheck, title: "Kontrol Privasi", description: "Kelola data apa yang dibagikan dan kapan." },
                  { icon: Bell, title: "Notifikasi", description: "Pilih peringatan yang penting bagi Anda." },
                  { icon: CreditCard, title: "Status Penagihan", description: "Akses penelitian disertakan dalam pilot." },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-5">
                    <div className="flex items-center gap-3 text-slate-200">
                      <item.icon className="h-5 w-5 text-cyan-300" />
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
