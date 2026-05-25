'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'id' | 'en';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'id' as Language,
      setLanguage: (lang: Language) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);
