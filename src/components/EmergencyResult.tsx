import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Phone, Volume2, VolumeX, ChevronRight, ChevronLeft, AlertTriangle, Siren, CheckCircle2 } from 'lucide-react';
import { Language, EngineResult, Step, Severity } from '../types';

interface Props {
  result: EngineResult;
  language: Language;
  onBack: () => void;
  onCallEmergency: () => void;
  onViewFullGuide?: () => void;
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
    warning: 'URGENT',
    actNow: 'Act Immediately',
    viewGuide: 'View Full Guide',
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
    warning: 'عاجل',
    actNow: 'تحرك فوراً',
    viewGuide: 'عرض الدليل الكامل',
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
    warning: 'URGENT',
    actNow: 'Agissez Immédiatement',
    viewGuide: 'Voir le Guide Complet',
  },
};

const severityMeta: Record<Severity, { badge: string; border: string; bg: string; pulse: string }> = {
  critical: {
    badge: 'bg-red-600 text-white',
    border: 'border-red-600',
    bg: 'bg-red-950/80',
    pulse: 'animate-pulse',
  },
  moderate: {
    badge: 'bg-amber-500 text-white',
    border: 'border-amber-500',
    bg: 'bg-amber-950/70',
    pulse: '',
  },
  minor: {
    badge: 'bg-emerald-500 text-white',
    border: 'border-emerald-500',
    bg: 'bg-emerald-950/60',
    pulse: '',
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

export default function EmergencyResult({ result, language, onBack, onCallEmergency, onViewFullGuide }: Props) {
  const t = tx[language];
  const isRTL = language === 'ar';
  const sev = severityMeta[result.severity];
  const steps = result.steps;
  const total = steps.length;

  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const { speaking, speak, stop } = useTTS(language);

  // Auto-play first step on mount for critical
  useEffect(() => {
    if (result.severity === 'critical' && steps.length > 0) {
      setAutoPlay(true);
      speak(steps[0].text[language]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = () => {
    stop();
    if (currentStep < total - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (autoPlay) speak(steps[next].text[language]);
    }
  };

  const goPrev = () => {
    stop();
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      if (autoPlay) speak(steps[prev].text[language]);
    }
  };

  const toggleSpeak = () => {
    if (speaking) {
      stop();
      setAutoPlay(false);
    } else {
      setAutoPlay(true);
      speak(steps[currentStep].text[language]);
    }
  };

  const progress = total > 0 ? ((currentStep + 1) / total) * 100 : 0;
  const step: Step = steps[currentStep];

  return (
    <div className={`min-h-screen bg-slate-950 text-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Thin progress bar at very top */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-slate-800">
        <motion.div className="h-full bg-red-500" animate={{ width: `${progress}%` }} transition={{ duration: 0.25 }} />
      </div>

      {/* ─── ALERT HEADER ─── */}
      <div className={`${sev.bg} border-b ${sev.border} ${sev.pulse}`}>
        <div className="max-w-3xl mx-auto px-4 pt-6 pb-4">
          {/* Severity badge */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-black px-3 py-1 rounded-full tracking-widest uppercase ${sev.badge}`}>
              {result.severity === 'critical' ? (language === 'en' ? 'CRITICAL' : language === 'ar' ? 'حرج' : 'CRITIQUE')
                : result.severity === 'moderate' ? (language === 'en' ? 'MODERATE' : language === 'ar' ? 'متوسط' : 'MODÉRÉ')
                : (language === 'en' ? 'MINOR' : language === 'ar' ? 'بسيط' : 'MINEUR')}
            </span>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-white/50 hover:text-white transition-colors uppercase tracking-wide"
            >
              {language === 'en' ? 'Close' : language === 'ar' ? 'إغلاق' : 'Fermer'}
            </button>
          </div>

          {/* Condition title — MASSIVE */}
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            {result.conditionTitle[language]}
          </h1>

          {/* Subtitle */}
          <p className="text-red-300 font-bold text-sm mt-2 uppercase tracking-wide">
            {t.actNow}
          </p>
        </div>
      </div>

      {/* ─── WARNING PANEL ─── */}
      {result.warning && (
        <div className="bg-red-600">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
            <p className="text-white font-bold text-sm leading-snug">
              {result.warning}
            </p>
          </div>
        </div>
      )}

      {/* ─── MAIN CONTENT ─── */}
      <main className="max-w-3xl mx-auto px-4 pt-6 pb-40">
        {/* Progress text */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            {t.step} {currentStep + 1} {t.of} {total}
          </span>
          <button
            onClick={toggleSpeak}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              speaking
                ? 'bg-red-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            {speaking ? t.stopSpeak : t.speak}
          </button>
        </div>

        {/* ONE STEP — dominates the screen */}
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
          {/* Step number circle */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black ${
              step.highlight ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'
            }`}>
              {currentStep + 1}
            </div>
            {step.highlight && (
              <span className="flex items-center gap-1.5 text-red-400 text-xs font-black uppercase tracking-wider">
                <Siren className="w-4 h-4" />
                {language === 'en' ? 'CRITICAL STEP' : language === 'ar' ? 'خطوة حرجة' : 'ÉTAPE CRITIQUE'}
              </span>
            )}
          </div>

          {/* Action text — BIG */}
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
          {/* Emergency call — ALWAYS visible for critical, prominent for others */}
          {result.callEmergency && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onCallEmergency}
              className="w-full bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-xl py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="text-base font-black tracking-wide">{t.callNow}</span>
            </motion.button>
          )}

          {/* Navigation row */}
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
                onClick={onBack}
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

          {/* View full guide link */}
          {onViewFullGuide && (
            <button
              onClick={onViewFullGuide}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-300 py-1 transition-colors font-medium"
            >
              {t.viewGuide}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
