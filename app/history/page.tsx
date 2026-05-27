"use client";

import React, { useEffect, useState } from "react";
import { Clock3, FileSearch, LayoutList, Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";

export default function HistoryPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      // Jika user belum login atau store belum siap, jangan fetch dulu
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "typing_sessions"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSessions(data);
      } catch (error) {
        console.error("Error fetching history:", error);
        setError(t("fetchError") || "Gagal memuat data. Sistem sedang menyiapkan indeks database, mohon tunggu sebentar.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{t("historyTitle")}</h1>
              <p className="mt-2 text-slate-400">{t("viewHistoryDesc")}</p>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <p className="text-slate-400">Memuat riwayat...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-full bg-red-500/10 p-4 mb-4">
                  <FileSearch className="h-10 w-10 text-red-500" />
                </div>
                <p className="text-red-400 max-w-md">{error}</p>
              </div>
            ) : sessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <FileSearch className="h-16 w-16 text-slate-700 mb-4" />
                <h3 className="text-xl font-semibold text-white">Belum ada data</h3>
                <p className="text-slate-400 max-w-xs mt-2">
                  Anda belum melakukan tes analisis ketikan. Mulailah sekarang untuk melihat hasilnya di sini.
                </p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-sm font-medium text-slate-400">
                    <th className="pb-4 pr-4">Tanggal</th>
                    <th className="pb-4 px-4">WPM</th>
                    <th className="pb-4 px-4">Status</th>
                    <th className="pb-4 pl-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {sessions.map((session) => (
                    <tr key={session.id} className="group">
                      <td className="py-5 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-slate-900 p-2">
                            <Clock3 className="h-5 w-5 text-blue-400" />
                          </div>
                          <span className="font-medium text-slate-200">
                            {session.timestamp?.toDate ? 
                              session.timestamp.toDate().toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) : 'Baru saja'}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-4 font-mono text-slate-300">
                        {session.metrics?.wpm || 0}
                      </td>
                      <td className="py-5 px-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          session.analysis?.level === "Red" ? "bg-red-400/10 text-red-400" :
                          session.analysis?.level === "Yellow" ? "bg-yellow-400/10 text-yellow-400" :
                          "bg-emerald-400/10 text-emerald-400"
                        }`}>
                          {session.analysis?.status || "Unknown"}
                        </span>
                      </td>
                      <td className="py-5 pl-4 text-right">
                        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
