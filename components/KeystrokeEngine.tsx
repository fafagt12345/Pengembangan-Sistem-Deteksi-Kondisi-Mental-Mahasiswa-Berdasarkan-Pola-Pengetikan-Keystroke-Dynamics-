"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Brain, Keyboard, Activity } from 'lucide-react';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/lib/useTranslation';

interface KeyLog {
  key: string;
  pressTime: number;
  releaseTime?: number;
}

export const KeystrokeEngine = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const router = useRouter();
  const [text, setText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [metrics, setMetrics] = useState({ dwell: 0, flight: 0, wpm: 0, backspaces: 0 });
  const keyMap = useRef<Map<string, number>>(new Map());
  const logs = useRef<KeyLog[]>([]);
  const lastReleaseTime = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!startTime.current) startTime.current = performance.now();
    
    if (e.key === "Backspace") {
      setMetrics(prev => ({ ...prev, backspaces: prev.backspaces + 1 }));
    }

    if (!keyMap.current.has(e.key)) {
      const now = performance.now();
      keyMap.current.set(e.key, now);
      
      if (lastReleaseTime.current) {
        const flightTime = now - lastReleaseTime.current;
        setMetrics(prev => ({ ...prev, flight: flightTime }));
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    const pressTime = keyMap.current.get(e.key);
    if (pressTime) {
      const releaseTime = performance.now();
      const dwellTime = releaseTime - pressTime;
      lastReleaseTime.current = releaseTime;
      keyMap.current.delete(e.key);

      logs.current.push({ key: e.key, pressTime, releaseTime });
      
      const currentText = (e.target as HTMLTextAreaElement).value;
      const words = currentText.trim() === "" ? 0 : currentText.trim().split(/\s+/).length;
      const elapsedMinutes = (performance.now() - (startTime.current ? startTime.current : performance.now())) / 60000;
      const wpm = elapsedMinutes > 0.01 ? Math.round(words / elapsedMinutes) : 0; 

      setMetrics(prev => ({ ...prev, dwell: dwellTime, wpm }));
    }
  };

  const analyzeMentalState = (m: typeof metrics) => {
    if (m.backspaces > 20 || (m.flight > 500 && m.wpm < 20)) 
      return { status: t("highStress"), level: "Red" };
    if (m.dwell > 200 || m.backspaces > 10) 
      return { status: t("cognitiveFatigue"), level: "Yellow" };
    return { status: t("normal"), level: "Green" };
  };

  const saveSession = async () => {
    if (!user) {
      alert("Anda harus login terlebih dahulu untuk menyimpan hasil.");
      return;
    }
    const analysis = analyzeMentalState(metrics);
    setIsSaving(true);
    try {
      await addDoc(collection(db, "typing_sessions"), {
        userId: user.uid,
        metrics,
        rawLogs: logs.current,
        analysis,
        timestamp: serverTimestamp(),
      });

      alert(t("saveSuccess") || "Data berhasil disimpan!");
      router.push("/dashboard");
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
          <p className="text-xs text-slate-400">Backspace</p>
          <p className="text-xl font-bold">{metrics.backspaces}</p>
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
      </div>

      <textarea
        className="w-full h-64 p-6 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder={t("typingPlaceholder")}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onChange={(e) => setText(e.target.value)}
      />
      
      <button 
        onClick={saveSession}
        disabled={isSaving}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? "Menyimpan..." : "Simpan Hasil Analisis"}
      </button>
    </div>
  );
};