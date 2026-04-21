import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Droplets, Wind, Brain, Activity, Flame, Bone, Zap,
  AlertTriangle, AlertOctagon, Skull, Waves, Droplet, Thermometer, Snowflake,
  Search, Phone, ChevronRight, Siren, Info, MessageSquare
} from 'lucide-react';
import { EmergencyScenario, Language, Severity } from '../types';
import { emergencies, searchEmergencies } from '../data/emergencies';
import LanguageSelector from './LanguageSelector';

const iconMap: Record<string, React.ElementType> = {
  Heart, Droplets, Wind, Brain, Activity, Flame, Bone, Zap,
  AlertTriangle, AlertOctagon, Skull, Waves, Droplet, Thermometer, Snowflake
};

const severityColors: Record<Severity, { bg: string; border: string; text: string; badge: string }> = {
  critical: { bg: 'bg-red-950/60', border: 'border-red-700', text: 'text-red-100', badge: 'bg-red-600' },
  moderate: { bg: 'bg-amber-950/60', border: 'border-amber-600', text: 'text-amber-100', badge: 'bg-amber-600' },
  minor: { bg: 'bg-emerald-950/60', border: 'border-emerald-600', text: 'text-emerald-100', badge: 'bg-emerald-600' },
};

const severityLabels: Record<Severity, Record<Language, string>> = {
  critical: { en: 'CRITICAL', ar: 'حرج', fr: 'CRITIQUE' },
  moderate: { en: 'MODERATE', ar: 'متوسط', fr: 'MODÉRÉ' },
  minor: { en: 'MINOR', ar: 'بسيط', fr: 'MINEUR' },
};

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectEmergency: (scenario: EmergencyScenario) => void;
  onCallEmergency: () => void;
  onShowInfo: () => void;
  onShowDecision: () => void;
  onShowNLU: () => void;
}

export default function HomeScreen({ language, onLanguageChange, onSelectEmergency, onCallEmergency, onShowInfo, onShowDecision, onShowNLU }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | 'all'>('all');

  const translations = {
    en: {
      title: 'ResQ',
      tagline: 'Save Lives. Anytime. Anywhere.',
      search: 'Describe the emergency...',
      all: 'All',
      critical: 'Critical',
      moderate: 'Moderate',
      minor: 'Minor',
      noResults: 'No emergencies found. Try different words.',
      emergencyCall: 'Call Emergency Now',
      emergencyNumber: '911 / 112 / 999',
      quickAccess: 'Emergency Scenarios',
      tapCard: 'Tap for step-by-step guide',
      quickDiagnosis: 'Quick Diagnosis',
      quickDiagnosisSub: 'Answer a few questions',
      describeEmergency: 'Describe Emergency',
      describeEmergencySub: 'Type what you see',
    },
    ar: {
      title: 'ResQ',
      tagline: 'أنقذ حياة. في أي وقت. في أي مكان.',
      search: 'صف الحالة الطارئة...',
      all: 'الكل',
      critical: 'حرج',
      moderate: 'متوسط',
      minor: 'بسيط',
      noResults: 'لم يتم العثور على حالات طارئة. جرب كلمات مختلفة.',
      emergencyCall: 'اتصل بالطوارئ الآن',
      emergencyNumber: '911 / 112 / 999',
      quickAccess: 'سيناريوهات الطوارئ',
      tapCard: 'اضغط للحصول على دليل خطوة بخطوة',
      quickDiagnosis: 'التشخيص السريع',
      quickDiagnosisSub: 'أجب على بعض الأسئلة',
      describeEmergency: 'صف الحالة',
      describeEmergencySub: 'اكتب ما تراه',
    },
    fr: {
      title: 'ResQ',
      tagline: 'Sauvez des Vies. À tout Moment. Partout.',
      search: 'Décrivez l\'urgence...',
      all: 'Tous',
      critical: 'Critique',
      moderate: 'Modéré',
      minor: 'Mineur',
      noResults: 'Aucune urgence trouvée. Essayez d\'autres mots.',
      emergencyCall: 'Appeler les Secours',
      emergencyNumber: '911 / 112 / 999',
      quickAccess: 'Scénarios d\'Urgence',
      tapCard: 'Appuyez pour le guide étape par étape',
      quickDiagnosis: 'Diagnostic Rapide',
      quickDiagnosisSub: 'Répondez à quelques questions',
      describeEmergency: 'Décrire l\'Urgence',
      describeEmergencySub: 'Écrivez ce que vous voyez',
    },
  };

  const t = translations[language];

  const filtered = useMemo(() => {
    let result = emergencies;
    if (searchQuery.trim()) {
      const matches = searchEmergencies(searchQuery, language);
      result = matches.map(m => m.scenario);
    }
    if (selectedSeverity !== 'all') {
      result = result.filter(e => e.severity === selectedSeverity);
    }
    return result;
  }, [searchQuery, selectedSeverity, language]);

  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-slate-950 text-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
              <Siren className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{t.title}</h1>
              <p className="text-xs text-slate-400">{t.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onShowInfo}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title={language === 'en' ? 'System Info' : language === 'ar' ? 'معلومات النظام' : 'Infos Système'}
            >
              <Info className="w-5 h-5" />
            </button>
            <LanguageSelector current={language} onChange={onLanguageChange} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Emergency Call Banner */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onCallEmergency}
          className="w-full bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-2xl p-5 flex items-center justify-between shadow-xl shadow-red-900/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold">{t.emergencyCall}</p>
              <p className="text-red-200 text-sm">{t.emergencyNumber}</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white/60" />
        </motion.button>

        {/* Quick Diagnosis Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onShowDecision}
          className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-2xl p-5 flex items-center justify-between shadow-xl shadow-blue-900/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold">{t.quickDiagnosis}</p>
              <p className="text-blue-200 text-sm">{t.quickDiagnosisSub}</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white/60" />
        </motion.button>

        {/* Describe Emergency (NLU) Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onShowNLU}
          className="w-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 rounded-2xl p-5 flex items-center justify-between shadow-xl shadow-violet-900/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold">{t.describeEmergency}</p>
              <p className="text-violet-200 text-sm">{t.describeEmergencySub}</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white/60" />
        </motion.button>

        {/* Search */}
        <div className="relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${isRTL ? 'right-4' : 'left-4'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className={`w-full bg-slate-900 border border-slate-700 rounded-xl py-4 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all`}
          />
        </div>

        {/* Severity Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(['all', 'critical', 'moderate', 'minor'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                selectedSeverity === sev
                  ? sev === 'critical'
                    ? 'bg-red-600 text-white'
                    : sev === 'moderate'
                    ? 'bg-amber-600 text-white'
                    : sev === 'minor'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {sev === 'all' ? t.all : translations[language][sev as keyof typeof translations['en']]}
            </button>
          ))}
        </div>

        {/* Emergency Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Siren className="w-5 h-5 text-red-500" />
            {t.quickAccess}
          </h2>
          
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg">{t.noResults}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((scenario, i) => {
                  const Icon = iconMap[scenario.icon] || AlertTriangle;
                  const colors = severityColors[scenario.severity];
                  const label = severityLabels[scenario.severity][language];
                  
                  return (
                    <motion.button
                      key={scenario.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectEmergency(scenario)}
                      className={`relative text-left p-4 rounded-xl border ${colors.bg} ${colors.border} hover:brightness-110 transition-all group`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl ${colors.badge} bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${scenario.severity === 'critical' ? 'text-red-400' : scenario.severity === 'moderate' ? 'text-amber-400' : 'text-emerald-400'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.badge} text-white`}>
                              {label}
                            </span>
                            {scenario.callEmergency && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {language === 'en' ? 'CALL' : language === 'ar' ? 'اتصال' : 'APPEL'}
                              </span>
                            )}
                          </div>
                          <h3 className={`font-bold text-base ${colors.text} leading-tight`}>
                            {scenario.title[language]}
                          </h3>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-slate-500 group-hover:text-white transition-colors flex-shrink-0 mt-1 ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
