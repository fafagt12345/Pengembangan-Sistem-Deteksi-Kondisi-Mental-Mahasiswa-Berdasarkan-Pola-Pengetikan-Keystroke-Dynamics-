import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center font-sans">
      {/* Card Glassmorphism */}
      <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-3xl backdrop-blur-xl shadow-2xl max-w-md w-full">
        <div className="bg-red-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
          <AlertCircle className="text-red-500 w-10 h-10" />
        </div>
        
        <h1 className="text-6xl font-black text-white mb-2 tracking-tighter">404</h1>
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Halaman Tidak Ditemukan</h2>
        
        <p className="text-slate-400 mb-8 leading-relaxed">
          Maaf, sepertinya Anda mengakses jalur yang salah atau data telah dipindahkan untuk menjaga privasi penelitian.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/dashboard" passHref>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
              Kembali ke Dashboard
            </Button>
          </Link>
          
          <Link href="/login" passHref>
            <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-slate-800/50 gap-2">
              <ArrowLeft size={16} /> Ke Halaman Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

