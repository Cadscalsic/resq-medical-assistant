import { Language } from '../types';
import { Globe } from 'lucide-react';

interface Props {
  current: Language;
  onChange: (lang: Language) => void;
}

const languages: { code: Language; label: string; flag: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
];

export default function LanguageSelector({ current, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-slate-400" />
      <div className="flex bg-slate-800 rounded-lg p-1 gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onChange(lang.code)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              current === lang.code
                ? 'bg-red-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
            dir={lang.dir}
          >
            <span className={`${current === 'ar' ? 'ml-1' : 'mr-1'}`}>{lang.flag}</span>
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
