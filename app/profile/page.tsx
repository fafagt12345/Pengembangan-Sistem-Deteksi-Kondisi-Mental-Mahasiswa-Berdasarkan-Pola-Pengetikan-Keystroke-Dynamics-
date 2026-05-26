'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, CreditCard, ShieldCheck, User2, Loader2, Save, X } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/useTranslation";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    prodi: "",
    semester: "",
    role: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setProfileData(userDoc.data() as any);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleUpdate = async () => {
    if (!user?.uid) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        displayName: profileData.displayName,
        prodi: profileData.prodi,
        semester: profileData.semester,
      });
      setIsEditing(false);
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Gagal memperbarui profil.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-3xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{t("profile") || "Profil"}</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Kelola Akun Anda</h1>
            </div>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant="outline" 
              className="rounded-full border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-100"
            >
              {isEditing ? <><X className="mr-2 h-4 w-4" /> Batal</> : "Edit Profil"}
            </Button>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-400">Nama Lengkap</Label>
                    <Input value={profileData.displayName} onChange={(e) => setProfileData({...profileData, displayName: e.target.value})} className="bg-slate-950 border-slate-800 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400">Program Studi</Label>
                    <Input value={profileData.prodi} onChange={(e) => setProfileData({...profileData, prodi: e.target.value})} className="bg-slate-950 border-slate-800 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400">Semester</Label>
                    <Input type="number" value={profileData.semester} onChange={(e) => setProfileData({...profileData, semester: e.target.value})} className="bg-slate-950 border-slate-800 text-white" />
                  </div>
                  <Button onClick={handleUpdate} disabled={saving} className="w-full bg-cyan-600 hover:bg-cyan-500">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Simpan Perubahan
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-800 text-cyan-300">
                      <User2 className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Akun Mahasiswa</p>
                      <h2 className="mt-3 text-2xl font-semibold text-white">{profileData.displayName || "User"}</h2>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4 text-slate-300">
                    <p>Email: <span className="text-white">{profileData.email}</span></p>
                    <p>Prodi: <span className="text-white">{profileData.prodi || "-"}</span></p>
                    <p>Semester: <span className="text-white">{profileData.semester || "-"}</span></p>
                    <p>Peran: <span className="text-cyan-300 uppercase">{profileData.role || "mahasiswa"}</span></p>
                  </div>
                </>
              )}
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
