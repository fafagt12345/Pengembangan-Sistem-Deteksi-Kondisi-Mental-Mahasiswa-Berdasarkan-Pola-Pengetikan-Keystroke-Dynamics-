'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/lib/useTranslation';
import { auth } from '@/lib/firebase'; // Import auth untuk signOut
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button'; // Asumsi Anda memiliki komponen Button
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Asumsi Anda menggunakan shadcn/ui dropdown
import { User2, LogOut, Settings } from 'lucide-react'; // Icons

export default function Navbar() {
  const { t } = useTranslation();
  const { user, setUser, authInitialized } = useAuthStore(); // Ambil user, setUser, dan authInitialized dari store
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Hapus user dari Zustand store
      router.push('/login'); // Redirect ke halaman login
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  // Tampilkan loading atau null jika auth belum diinisialisasi
  if (!authInitialized) {
    return null; // Atau tampilkan spinner loading jika diinginkan
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-white text-xl font-bold">
              {t("appName") || "Cek Mental Mahasiswa"}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-slate-800">
                    <User2 className="h-5 w-5" />
                    <span>{user.displayName || user.email || "Akun Saya"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-900 border-slate-700 text-white">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <User2 className="mr-2 h-4 w-4" />
                      <span>{t("profile") || "Profil"}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{t("settings") || "Pengaturan"}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-red-400 hover:text-red-300">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("logout") || "Logout"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:bg-slate-800">
                    {t("login") || "Login"}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-violet-600 hover:bg-violet-500 text-white">
                    {t("getStarted") || "Mulai"}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}