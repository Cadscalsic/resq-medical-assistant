import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Sparkles, Globe, Clock, Brain, CheckCircle2,
  Loader2, Type
} from 'lucide-react';
import { Language, NLUResult, EngineResult } from '../types';
import { parseEmergencyText, processEmergency } from '../engine';
import EmergencyResult from './EmergencyResult';

interface Props {
  language: Language;
  onBack: () => void;
  onCallEmergency: () => void;
}

export default function NaturalLanguageScreen({ language, onBack, onCallEmergency }: Props) {
  const [inputText, setInputText] = useState('');
  const [nluResult, setNluResult] = useState<NLUResult | null>(null);
  const [engineResult, setEngineResult] = useState<EngineResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const t = {
    en: {
      title: 'Describe Emergency',
      subtitle: 'Type what you see in your own words',
      placeholder: 'Example: "Person is unconscious and not breathing"',
      analyze: 'Analyze',
      analyzing: 'Analyzing...',
      detectedLang: 'Detected Language',
      extractedSignals: 'Extracted Signals',
      result: 'Emergency Detected',
      noResult: 'No clear emergency detected. Try describing symptoms more specifically.',
      callEmergency: 'Call Emergency Now',
      viewSteps: 'View Steps',
      examples: 'Examples:',
      example1: '"He is not breathing"',
      example2: '"Severe bleeding from leg"',
      example3: '"Chest pain and sweating"',
      processingTime: 'Processing time',
      confidence: 'Confidence',
      tryAgain: 'Try Again',
      back: 'Back',
    },
    ar: {
      title: 'صف الحالة الطارئة',
      subtitle: 'اكتب ما تراه بكلماتك الخاصة',
      placeholder: 'مثال: "الشخص فاقد الوعي ولا يتنفس"',
      analyze: 'تحليل',
      analyzing: 'جاري التحليل...',
      detectedLang: 'اللغة المكتشفة',
      extractedSignals: 'الإشارات المستخرجة',
      result: 'تم اكتشاف حالة طارئة',
      noResult: 'لم يتم اكتشاف حالة طارئة واضحة. حاول وصف الأعراض بشكل أكثر تحديداً.',
      callEmergency: 'اتصل بالطوارئ الآن',
      viewSteps: 'عرض الخطوات',
      examples: 'أمثلة:',
      example1: '"لا يتنفس"',
      example2: '"نزيف شديد من الساق"',
      example3: '"ألم صدر وتعرق"',
      processingTime: 'وقت المعالجة',
      confidence: 'الثقة',
      tryAgain: 'حاول مرة أخرى',
      back: 'رجوع',
    },
    fr: {
      title: 'Décrivez l\'Urgence',
      subtitle: 'Décrivez ce que vous voyez en vos propres mots',
      placeholder: 'Exemple: "La personne est inconsciente et ne respire pas"',
      analyze: 'Analyser',
      analyzing: 'Analyse en cours...',
      detectedLang: 'Langue Détectée',
      extractedSignals: 'Signaux Extraits',
      result: 'Urgence Détectée',
      noResult: 'Aucune urgence claire détectée. Essayez de décrire les symptômes plus spécifiquement.',
      callEmergency: 'Appeler les Secours',
      viewSteps: 'Voir les Étapes',
      examples: 'Exemples:',
      example1: '"Il ne respire pas"',
      example2: '"Saignement grave à la jambe"',
      example3: '"Douleur thoracique et sueurs"',
      processingTime: 'Temps de traitement',
      confidence: 'Confiance',
      tryAgain: 'Réessayer',
      back: 'Retour',
    },
  }[language];

  const isRTL = language === 'ar';

  const handleAnalyze = useCallback(() => {
    if (!inputText.trim() || isProcessing) return;

    setIsProcessing(true);
    setNluResult(null);
    setEngineResult(null);

    // Use setTimeout to allow UI to update before heavy processing
    setTimeout(() => {
      const nlu = parseEmergencyText(inputText);
      setNluResult(nlu);

      // Feed into decision engine
      const engine = processEmergency(inputText, language);
      setEngineResult(engine);
      setIsProcessing(false);
    }, 50);
  }, [inputText, isProcessing, language]);

  const handleExample = useCallback((example: string) => {
    setInputText(example);
    setNluResult(null);
    setEngineResult(null);
    textareaRef.current?.focus();
  }, []);

  const handleReset = useCallback(() => {
    setInputText('');
    setNluResult(null);
    setEngineResult(null);
  }, []);

  return (
    <div className={`min-h-screen bg-slate-950 text-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-violet-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">{t.title}</h1>
              <p className="text-xs text-slate-400">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Input Area */}
        <AnimatePresence mode="wait">
          {!engineResult && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="relative">
                <div className="absolute top-4 left-4 text-slate-500">
                  <Type className="w-5 h-5" />
                </div>
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAnalyze();
                    }
                  }}
                  placeholder={t.placeholder}
                  rows={4}
                  className={`w-full bg-slate-900 border-2 border-slate-700 rounded-2xl py-4 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none text-base leading-relaxed`}
                  disabled={isProcessing}
                />
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs text-slate-600">
                    {inputText.length > 0 ? `${inputText.length} chars` : ''}
                  </span>
                </div>
              </div>

              {/* Analyze Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAnalyze}
                disabled={!inputText.trim() || isProcessing}
                className={`w-full rounded-2xl p-5 flex items-center justify-center gap-3 shadow-xl transition-all ${
                  !inputText.trim() || isProcessing
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white shadow-violet-900/30'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-lg font-bold">{t.analyzing}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    <span className="text-lg font-bold">{t.analyze}</span>
                  </>
                )}
              </motion.button>

              {/* Examples */}
              {!inputText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <p className="text-sm text-slate-400 font-medium">{t.examples}</p>
                  <div className="flex flex-wrap gap-2">
                    {[t.example1, t.example2, t.example3].map((ex, i) => (
                      <button
                        key={i}
                        onClick={() => handleExample(ex.replace(/"/g, ''))}
                        className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-sm hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-all"
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing Indicator */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-violet-900/50 border-t-violet-500 animate-spin" />
                <Brain className="w-6 h-6 text-violet-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-slate-400">{t.analyzing}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NLU Results + Engine Results */}
        <AnimatePresence>
          {nluResult && engineResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              {/* Detected Language Badge */}
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400">{t.detectedLang}:</span>
                <span className="px-3 py-1 rounded-full bg-violet-600/20 text-violet-300 text-sm font-semibold border border-violet-600/30">
                  {nluResult.language.code.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500">
                  {Math.round(nluResult.language.confidence * 100)}%
                </span>
                <div className="flex items-center gap-1 ml-auto text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {nluResult.processingTimeMs.toFixed(1)}ms
                </div>
              </div>

              {/* Extracted Entities */}
              {nluResult.entities.length > 0 && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {t.extractedSignals}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {nluResult.entities.map((entity, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
                          entity.confidence === 'strong'
                            ? 'bg-emerald-900/30 border-emerald-700/50 text-emerald-300'
                            : entity.confidence === 'moderate'
                            ? 'bg-amber-900/30 border-amber-700/50 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {entity.type}: {String(entity.value)}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Engine Result */}
              {engineResult && (
                <EmergencyResult
                  result={engineResult}
                  language={language}
                  onBack={handleReset}
                  onCallEmergency={onCallEmergency}
                />
              )}

              {/* Try Again Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleReset}
                className="w-full py-4 rounded-xl border-2 border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all font-semibold"
              >
                {t.tryAgain}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
