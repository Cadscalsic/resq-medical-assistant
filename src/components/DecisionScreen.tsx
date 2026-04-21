import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ChevronRight
} from 'lucide-react';
import { Language, StructuredInput, EngineResult } from '../types';
import { processStructured, getActiveQuestions } from '../engine/decisionEngine';
import EmergencyResult from './EmergencyResult';

const optionColors: Record<string, string> = {
  red: 'bg-red-600 hover:bg-red-500 border-red-500',
  amber: 'bg-amber-600 hover:bg-amber-500 border-amber-500',
  green: 'bg-emerald-600 hover:bg-emerald-500 border-emerald-500',
  blue: 'bg-blue-600 hover:bg-blue-500 border-blue-500',
};

interface Props {
  language: Language;
  onBack: () => void;
  onCallEmergency: () => void;
}

export default function DecisionScreen({ language, onBack, onCallEmergency }: Props) {
  const [answers, setAnswers] = useState<Partial<StructuredInput>>({ symptoms: [] });
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<EngineResult | null>(null);

  const activeQuestions = useMemo(
    () => getActiveQuestions(answers as Record<string, string>, language),
    [answers, language]
  );
  const currentQuestion = activeQuestions[currentQIndex];
  const progress = activeQuestions.length > 0 ? (currentQIndex / activeQuestions.length) * 100 : 0;
  const isRTL = language === 'ar';

  const t = {
    en: {
      title: 'Quick Diagnosis',
      subtitle: 'Answer a few questions to identify the emergency.',
      question: 'Question',
      of: 'of',
      analyzing: 'Analyzing...',
      result: 'Result',
      confidence: 'Confidence',
      steps: 'Instructions',
      warning: 'Urgent Warning',
      callNow: 'Call Emergency Now',
      restart: 'Start Over',
      back: 'Back',
      next: 'Next',
      noMatch: 'Unable to determine. Call emergency services immediately.',
      step: 'Step',
    },
    ar: {
      title: 'التشخيص السريع',
      subtitle: 'أجب على بعض الأسئلة لتحديد الحالة الطارئة.',
      question: 'سؤال',
      of: 'من',
      analyzing: 'جاري التحليل...',
      result: 'النتيجة',
      confidence: 'الثقة',
      steps: 'التعليمات',
      warning: 'تحذير عاجل',
      callNow: 'اتصل بالطوارئ الآن',
      restart: 'البدء من جديد',
      back: 'رجوع',
      next: 'التالي',
      noMatch: 'تعذر التحديد. اتصل بالطوارئ فوراً.',
      step: 'خطوة',
    },
    fr: {
      title: 'Diagnostic Rapide',
      subtitle: 'Répondez à quelques questions pour identifier l\'urgence.',
      question: 'Question',
      of: 'sur',
      analyzing: 'Analyse en cours...',
      result: 'Résultat',
      confidence: 'Confiance',
      steps: 'Instructions',
      warning: 'Avertissement Urgent',
      callNow: 'Appeler les Secours',
      restart: 'Recommencer',
      back: 'Retour',
      next: 'Suivant',
      noMatch: 'Impossible de déterminer. Appelez les secours immédiatement.',
      step: 'Étape',
    },
  }[language];

  const handleAnswer = useCallback((value: string) => {
    if (!currentQuestion) return;

    const newAnswers = { ...answers };
    (newAnswers as Record<string, unknown>)[currentQuestion.id] = value;
    setAnswers(newAnswers);

    const nextIndex = currentQIndex + 1;
    if (nextIndex < activeQuestions.length) {
      setCurrentQIndex(nextIndex);
    } else {
      // Run decision engine
      const structured: StructuredInput = {
        conscious: newAnswers.conscious as 'yes' | 'no' | 'unknown',
        breathing: newAnswers.breathing as 'yes' | 'no' | 'labored' | 'unknown',
        bleeding: newAnswers.bleeding as 'none' | 'minor' | 'severe' | 'unknown',
        chestPain: newAnswers.chestPain as 'yes' | 'no' | 'unknown',
        choking: newAnswers.choking as 'yes' | 'no' | 'unknown',
        seizure: newAnswers.seizure as 'yes' | 'no' | 'unknown',
        burn: newAnswers.burn as 'yes' | 'no' | 'chemical' | 'electrical' | 'unknown',
        electricShock: newAnswers.electricShock as 'yes' | 'no' | 'unknown',
        drowning: newAnswers.drowning as 'yes' | 'no' | 'unknown',
        allergicReaction: newAnswers.allergicReaction as 'yes' | 'no' | 'unknown',
        poisoning: newAnswers.poisoning as 'yes' | 'no' | 'unknown',
        strokeSymptoms: newAnswers.strokeSymptoms as 'yes' | 'no' | 'unknown',
        symptoms: [],
      };
      const engineResult = processStructured(structured, language);
      setResult(engineResult);
      setShowResult(true);
    }
  }, [answers, currentQIndex, activeQuestions, currentQuestion, language]);

  const handleRestart = () => {
    setAnswers({ symptoms: [] });
    setCurrentQIndex(0);
    setShowResult(false);
    setResult(null);
  };

  const handleBackQuestion = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  if (showResult && result) {
    return (
      <EmergencyResult
        result={result}
        language={language}
        onBack={handleRestart}
        onCallEmergency={onCallEmergency}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-slate-950 text-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-sm font-medium">{t.back}</span>
          </button>
          <h1 className="text-lg font-bold">{t.title}</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 text-sm text-slate-400">
            <span>{t.question} {currentQIndex + 1} {t.of} {activeQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-red-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white leading-relaxed">
                  {currentQuestion.question[language]}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((opt, i) => (
                  <motion.button
                    key={opt.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(opt.value)}
                    className={`p-5 rounded-xl border-2 text-left font-semibold text-white transition-all ${
                      optionColors[opt.color || 'blue']
                    } bg-opacity-20 hover:bg-opacity-30 border-opacity-50 hover:border-opacity-100`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt.label[language]}</span>
                      <ChevronRight className={`w-5 h-5 opacity-60 ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {currentQIndex > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleBackQuestion}
              className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              {language === 'en' ? 'Previous question' : language === 'ar' ? 'السؤال السابق' : 'Question précédente'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
