"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";

const registerSchema = z.object({
  fullName: z.string().min(2, "Nama terlalu pendek"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export default function RegisterPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Google Register Error:", error);
      alert(t("registerFailed") + ": " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: data.fullName });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: data.fullName,
        createdAt: serverTimestamp(),
      });

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Registration Error:", error);
      let errorMessage = error.message;
      if (error.code === 'auth/email-already-in-use') errorMessage = t("emailAlreadyInUse");
      alert(t("registerFailed") + ": " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.1),_transparent_40%)]" />
      <Card className="relative w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-white">{t("getStarted")}</CardTitle>
          <p className="text-slate-400">Buat akun untuk memulai analisis</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input id="fullName" {...register("fullName")} className="bg-slate-950 border-slate-800 text-white" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" {...register("email")} className="bg-slate-950 border-slate-800 text-white" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input id="password" type="password" {...register("password")} className="bg-slate-950 border-slate-800 text-white" required />
            </div>
            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-500 text-white transition-all" disabled={loading}>
              {loading ? "Mendaftarkan..." : t("register")}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-800" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Daftar dengan</span>
            </div>
          </div>

          <Button 
            variant={"outline" as any} 
            className="w-full border-slate-700 hover:bg-slate-800 text-slate-200" 
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Google
          </Button>

          <p className="text-center text-sm text-slate-400">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-violet-400 hover:underline">{t("login")}</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}