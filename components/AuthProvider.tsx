"use client";

import { useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, setRole, loading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data()?.role) {
          setRole(userDoc.data()?.role);
        }
      } else {
        setUser(null);
        setRole(null);
        if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
          router.push("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [setUser, setRole, router, pathname]);

  if (loading && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};