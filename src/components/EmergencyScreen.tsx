import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Phone, ChevronRight, ChevronLeft, AlertTriangle,
  Siren, Volume2, VolumeX, CheckCircle2
} from 'lucide-react';
import { EmergencyScenario, Language, Severity } from '../types';

interface Props {
  scenario: EmergencyScenario;
  language: Language;
  onBack: () => void;
  onCallEmergency: () => void;
}

const tx: Record<Language, Record<string, string>> = {
  en: {
    step: 'STEP',
    of: 'OF',
    next: 'NEXT',
    prev: 'BACK',
    done: 'DONE',
    callNow: 'CALL EMERGENCY NOW',
    speak: 'Read Aloud',
    stopSpeak: 'Stop',
    warning: 'URGENT WARNING',
    actNow: 'Act Immediately',
    callServices: 'CALL EMERGENCY SERVICES',
  },
  ar: {
    step: 'خطوة',
    of: 'من',
    next: 'التالي',
    prev: 'رجوع',
    done: 'انتهى',
    callNow: 'اتصل بالطوارئ الآن',
    speak: 'اقرأ بصوت عالٍ',
    stopSpeak: 'أوقف',
    warning: 'تحذير عاجل',
    actNow: 'تحرك فوراً',
    callServices: 'اتصل بخدمات الطوارئ',
  },
  fr: {
    step: 'ÉTAPE',
    of: 'SUR',
    next: 'SUIVANT',
    prev: 'RETOUR',
    done: 'TERMINÉ',
    callNow: 'APPELER LES SECOURS',
    speak: 'Lire à voix haute',
    stopSpeak: 'Arrêter',
    warning: 'AVERTISSEMENT URGENT',
    actNow: 'Agissez Immédiatement',
    callServices: 'APPELEZ LES SECOURS',
  },
};

const severityMeta: Record<Severity, { badge: string; border: string; bg: string; pulse: string; bar: string }> = {
  critical: {
    badge: 'bg-red-600 text-white',
    border: 'border-red-600',
    bg: 'bg-red-950/80',
    pulse: 'animate-pulse',
    bar: 'bg-red-500',
  },
  moderate: {
    badge: 'bg-amber-500 text-white',
    border: 'border-amber-500',
    bg: 'bg-amber-950/70',
    pulse: '',
    bar: 'bg-amber-500',
  },
  minor: {
    badge: 'bg-emerald-500 text-white',
    border: 'border-emerald-500',
    bg: 'bg-emerald-950/60',
    pulse: '',
    bar: 'bg-emerald-500',
  },
};

function useTTS(language: Language) {
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : 'fr-FR';
    u.rate = 0.82;
    u.pitch = 1;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  }, [language]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);

  useEffect(() => () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }, []);

  return { speaking, speak, stop };
}

export default function EmergencyScreen({ scenario, language, onBack, onCallEmergency }: Props) {
  const t = tx[language];
  const isRTL = language === 'ar';
  const sev = severityMeta[scenario.severity];
  const total = scenario.steps.length;

  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const { speaking, speak, stop } = useTTS(language);

  // Auto-play first step on mount for critical
  useEffect(() => {
    if (scenario.severity === 'critical' && total > 0) {
      setAutoPlay(true);
      const first = scenario.steps[0].text[language];
      // Small delay so UI renders first
      const timer = setTimeout(() => speak(first), 400);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = () => {
    stop();
    if (currentStep < total - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (autoPlay) speak(scenario.steps[next].text[language]);
    }
  };

  const goPrev = () => {
    stop();
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      if (autoPlay) speak(scenario.steps[prev].text[language]);
    }
  };

  const toggleSpeak = () => {
    if (speaking) {
      stop();
      setAutoPlay(false);
    } else {
      setAutoPlay(true);
      speak(scenario.steps[currentStep].text[language]);
    }
  };

  const progress = total > 0 ? ((currentStep + 1) / total) * 100 : 0;
  const step = scenario.steps[currentStep];

  return (
    <div className={`min-h-screen bg-slate-950 text-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Progress bar — very top */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-slate-800">
        <motion.div className={`h-full ${sev.bar}`} animate={{ width: `${progress}%` }} transition={{ duration: 0.25 }} />
      </div>

      {/* ─── ALERT HEADER ─── */}
      <div className={`${sev.bg} border-b ${sev.border} ${sev.pulse}`}>
        <div className="max-w-3xl mx-auto px-4 pt-6 pb-4">
          {/* Top row: badge + back */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[10px] font-black px-3 py-1 rounded-full tracking-[0.2em] uppercase ${sev.badge}`}>
              {scenario.severity === 'critical'
                ? (language === 'en' ? 'CRITICAL' : language === 'ar' ? 'حرج' : 'CRITIQUE')
                : scenario.severity === 'moderate'
                ? (language === 'en' ? 'MODERATE' : language === 'ar' ? 'متوسط' : 'MODÉRÉ')
                : (language === 'en' ? 'MINOR' : language === 'ar' ? 'بسيط' : 'MINEUR')}
            </span>
            <button
              onClick={() => { stop(); onBack(); }}
              className="flex items-center gap-1 text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {language === 'en' ? 'Close' : language === 'ar' ? 'إغلاق' : 'Fermer'}
              </span>
            </button>
          </div>

          {/* Condition title — COMMANDING */}
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-[1.1]">
            {scenario.title[language]}
          </h1>

          {/* Call badge for critical */}
          {scenario.callEmergency && (
            <div className="mt-3 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span className="text-red-300 text-xs font-bold uppercase tracking-wider">
                {t.callServices}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ─── WARNING PANEL ─── */}
      {scenario.warning[language] && (
        <div className="bg-red-600">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-0.5">
                {t.warning}
              </p>
              <p className="text-white font-bold text-sm leading-snug">
                {scenario.warning[language]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-3xl mx-auto px-4 pt-6 pb-40">
        {/* Progress + TTS row */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            {t.step} {currentStep + 1} {t.of} {total}
          </span>
          <button
            onClick={toggleSpeak}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
              speaking
                ? 'bg-red-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            {speaking ? t.stopSpeak : t.speak}
          </button>
        </div>

        {/* ONE STEP — dominates screen */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 32 }}
          className={`rounded-3xl border-2 p-6 sm:p-8 ${
            step.highlight
              ? 'bg-red-950/60 border-red-500 shadow-lg shadow-red-900/20'
              : 'bg-slate-900 border-slate-700'
          }`}
        >
          {/* Step number + critical badge */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black ${
              step.highlight ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}>
              {currentStep + 1}
            </div>
            {step.highlight && (
              <span className="flex items-center gap-1.5 text-red-400 text-[10px] font-black uppercase tracking-wider">
                <Siren className="w-4 h-4" />
                {language === 'en' ? 'Critical Step' : language === 'ar' ? 'خطوة حرجة' : 'Étape Critique'}
              </span>
            )}
          </div>

          {/* Action text — MASSIVE, commanding */}
          <p className={`text-2xl sm:text-3xl font-bold leading-snug ${
            step.highlight ? 'text-white' : 'text-slate-100'
          }`}>
            {step.text[language]}
          </p>
        </motion.div>
      </main>

      {/* ─── STICKY BOTTOM BAR ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 py-3 space-y-2">
          {/* Emergency call — ALWAYS visible for critical, full width, commanding */}
          {scenario.callEmergency && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onCallEmergency}
              className="w-full bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-xl py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="text-base font-black tracking-wide">{t.callNow}</span>
            </motion.button>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              disabled={currentStep === 0}
              className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl py-3 flex items-center justify-center gap-1.5 transition-colors"
            >
              <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="text-sm font-bold">{t.prev}</span>
            </button>

            {currentStep === total - 1 ? (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => { stop(); onBack(); }}
                className="flex-[2] bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl py-3 flex items-center justify-center gap-1.5 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-black">{t.done}</span>
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={goNext}
                className="flex-[2] bg-white hover:bg-slate-200 active:bg-slate-300 text-slate-950 rounded-xl py-3 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="text-sm font-black">{t.next}</span>
                <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
