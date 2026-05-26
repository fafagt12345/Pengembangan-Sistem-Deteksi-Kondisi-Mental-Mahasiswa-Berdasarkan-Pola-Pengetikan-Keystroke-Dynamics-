'use client';

import { useLanguageStore } from '@/store/useLanguageStore'; // Pastikan ini mengimpor store yang benar
import { translations } from '@/lib/translations';

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, language };
}
