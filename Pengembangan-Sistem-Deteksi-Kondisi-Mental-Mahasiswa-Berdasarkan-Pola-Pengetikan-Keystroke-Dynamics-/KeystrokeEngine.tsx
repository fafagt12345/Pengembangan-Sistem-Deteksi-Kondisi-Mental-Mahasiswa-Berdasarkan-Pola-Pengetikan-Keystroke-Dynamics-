"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Keyboard, Activity } from 'lucide-react';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthStore } from '@/store/useAuthStore';

interface KeyLog {
  key: string;
  pressTime: number;
  releaseTime?: number;
}

export const KeystrokeEngine = () => {
  const { user } = useAuthStore();
  const [text, setText] = useState("");
  const [metrics, setMetrics] = useState({ dwell: 0, flight: 0, wpm: 0 });
  const keyMap = useRef<Map<string, number>>(new Map());
  const logs = useRef<KeyLog[]>([]);
  const lastReleaseTime = useRef<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
      setMetrics(prev => ({ ...prev, dwell: dwellTime }));
    }
  };

  const analyzeMentalState = (metrics: any) => {
    // Simulasi Heuristic Analysis untuk Skripsi
    if (metrics.dwell > 150) return { status: "Kelelahan", level: "Yellow" };
    if (metrics.flight > 300) return { status: "Stress Tinggi", level: "Red" };
    return { status: "Normal", level: "Green" };
  };

  const saveSession = async () => {
    if (!user) return;
    const analysis = analyzeMentalState(metrics);
    await addDoc(collection(db, "typing_sessions"), {
      userId: user.uid,
      metrics,
      analysis,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg"><Keyboard className="text-blue-400" /></div>
            <div>
              <p className="text-xs text-slate-400">Avg Dwell Time</p>
              <p className="text-xl font-bold text-white">{metrics.dwell.toFixed(2)} ms</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg"><Activity className="text-purple-400" /></div>
            <div>
              <p className="text-xs text-slate-400">Avg Flight Time</p>
              <p className="text-xl font-bold text-white">{metrics.flight.toFixed(2)} ms</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg"><Brain className="text-emerald-400" /></div>
            <div>
              <p className="text-xs text-slate-400">Mental Indicator</p>
              <p className="text-xl font-bold text-emerald-400">{analyzeMentalState(metrics).status}</p>
            </div>
          </div>
        </Card>
      </div>

      <textarea
        className="w-full h-64 p-6 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        placeholder="Mulailah mengetik di sini untuk melakukan analisis kesehatan mental..."
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onChange={(e) => setText(e.target.value)}
      />
      
      <button 
        onClick={saveSession}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
      >
        Simpan Hasil Analisis
      </button>
    </div>
  );
};