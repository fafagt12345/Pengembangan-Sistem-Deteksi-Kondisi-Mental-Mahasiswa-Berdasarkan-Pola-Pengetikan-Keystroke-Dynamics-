export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="animate-pulse rounded-3xl border border-slate-800/90 bg-slate-900/80 px-10 py-8 text-center shadow-xl shadow-slate-950/30">
        <p className="text-lg font-semibold">Menyiapkan ruang kerja Anda...</p>
        <p className="mt-2 text-slate-400">Memuat analitik dan tata letak halaman.</p>
      </div>
    </div>
  );
}
