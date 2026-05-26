"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  image: z.any().optional(),
});

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);
    
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      let photoURL = "https://ui-avatars.com/api/?name=" + data.name;
      if (data.image?.[0]) {
        photoURL = await uploadImage(data.image[0]);
      }

      await updateProfile(user, { displayName: data.name, photoURL });
      
      // Simpan Role ke Firestore (Default: mahasiswa)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: data.name,
        email: data.email,
        photoURL,
        role: "mahasiswa",
        createdAt: new Error().toISOString(), // Gunakan serverTimestamp di produksi
      });

      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Daftar Akun Mahasiswa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Lengkap</Label>
              <Input {...register("name")} className="bg-slate-800 border-slate-700" />
              {errors.name && <p className="text-red-400 text-xs">{(errors.name as any).message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" {...register("email")} className="bg-slate-800 border-slate-700" />
              {errors.email && <p className="text-red-400 text-xs">{(errors.email as any).message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" {...register("password")} className="bg-slate-800 border-slate-700" />
              {errors.password && <p className="text-red-400 text-xs">{(errors.password as any).message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Foto Profil (Opsional)</Label>
              <Input type="file" {...register("image")} className="bg-slate-800 border-slate-700" />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? "Mendaftar..." : "Sign Up"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-400">
            Sudah punya akun? <Link href="/login" className="text-blue-400">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}