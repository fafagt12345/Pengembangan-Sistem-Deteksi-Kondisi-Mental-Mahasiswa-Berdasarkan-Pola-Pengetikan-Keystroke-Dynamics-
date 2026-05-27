"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Brain, Keyboard, Activity, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/lib/useTranslation';

export const KeystrokeEngine = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const router = useRouter();
  const [text, setText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [metrics, setMetrics] = useState({ dwell: 0, flight: 0, wpm: 0, backspaces: 0 });
  const logs = useRef<any[]>([]);

  const analyzeMentalState = (m: any) => {
    if (m.wpm > 40) return { status: t("normal"), level: "Green" };
    if (m.wpm > 20) return { status: t("cognitiveFatigue"), level: "Yellow" };
    return { status: t("highStress"), level: "Red" };
  };

  const handleSave = async () => {
    if (!user?.uid) {
      alert("Sesi login tidak ditemukan. Silakan login kembali.");
      return;
    }

    setIsSaving(true);
    try {
      await addDoc(collection(db, "typing_sessions"), {
        userId: user.uid,
        metrics,
        rawLogs: logs.current,
        analysis: analyzeMentalState(metrics),
        timestamp: serverTimestamp(),
      });

      alert(t("saveSuccess") || "Data berhasil disimpan!");
      router.refresh();
      router.push("/history");
    } catch (error) {
      console.error("Error saving session:", error);
      alert("Gagal menyimpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  const analysis = analyzeMentalState(metrics);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-slate-900 border-slate-800 text-white">
          <p className="text-xs text-slate-400">{t("typingSpeed")}</p>
          <p className="text-xl font-bold">{metrics.wpm} WPM</p>
        </Card>
        <Card className="p-4 bg-slate-900 border-slate-800 text-white">
          <p className="text-xs text-slate-400">{t("stressIndicator")}</p>
          <p className={`text-xl font-bold ${
            analysis.level === "Red" ? "text-red-400" :
            analysis.level === "Yellow" ? "text-yellow-400" :
            "text-emerald-400"
          }`}>
            {analysis.status}
          </p>
        </Card>
        <Card className="p-4 bg-slate-900 border-slate-800 text-white">
          <p className="text-xs text-slate-400">Status Sensor</p>
          <div className="flex items-center gap-2 mt-1 text-emerald-400">
            <Brain className="h-5 w-5" />
            <span className="text-sm font-medium">Sistem Aktif</span>
          </div>
        </Card>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("typingPlaceholder")}
          className="w-full h-64 p-6 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving || text.length < 5}
            className="flex items-center gap-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-cyan-900/20"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Activity className="h-4 w-4" />
            )}
            Simpan Hasil
          </button>
        </div>
      </div>
    </div>
  );
};
