import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Detektor Keystroke Kesehatan Mental",
  description: "Pengembangan Sistem Deteksi Kondisi Mental Mahasiswa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="font-sans antialiased text-slate-100 bg-slate-950 min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
