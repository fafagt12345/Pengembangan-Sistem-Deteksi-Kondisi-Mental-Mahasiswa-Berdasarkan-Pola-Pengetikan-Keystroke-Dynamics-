'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export default function LoginPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Periksa apakah data pengguna sudah ada di Firestore, jika belum, buat
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: "mahasiswa", // Peran default untuk pendaftaran Google baru
          createdAt: serverTimestamp(),
        });
      }
      router.push("/dashboard");

    } catch (error: any) {
      console.error("Google Login Error:", error);
      alert(t("loginFailed") + ": " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      // Validasi apakah data di Firestore ada
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (!userDoc.exists()) {
        console.warn("Data profil tambahan tidak ditemukan di Firestore");
      }

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login Error:", error);
      let errorMessage = error.message;
      if (error.code === 'auth/user-not-found') errorMessage = "Email tidak terdaftar";
      if (error.code === 'auth/wrong-password') errorMessage = "Password salah";
      if (error.code === 'auth/invalid-credential') errorMessage = "Email atau password salah";
      alert(t("loginFailed") + ": " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.1),_transparent_40%)]" />
      <Card className="relative w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-white">{t("login")}</CardTitle>
          <p className="text-slate-400 text-sm">Masuk ke akun penelitian Anda</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" {...register("email")} className="bg-slate-950 border-slate-800 text-white" />
              {errors.email && <p className="text-xs text-red-400">{errors.email.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input id="password" type="password" {...register("password")} className="bg-slate-950 border-slate-800 text-white" />
              {errors.password && <p className="text-xs text-red-400">{errors.password.message as string}</p>}
            </div>
            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white transition-all" disabled={loading}>
              {loading ? "Loading..." : t("login")}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-800" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Atau lanjut dengan</span>
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
            Belum punya akun?{" "}
            <Link href="/register" className="text-cyan-400 hover:underline">{t("register")}</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}