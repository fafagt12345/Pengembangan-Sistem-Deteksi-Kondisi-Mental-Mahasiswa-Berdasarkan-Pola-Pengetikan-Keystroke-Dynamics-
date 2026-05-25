import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-white font-bold text-lg">Keystroke Dynamics</h3>
            <p className="text-slate-400 text-sm">Sistem Deteksi Kondisi Mental Mahasiswa</p>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Universitas Negeri Surabaya. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-blue-400 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Dokumentasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
};