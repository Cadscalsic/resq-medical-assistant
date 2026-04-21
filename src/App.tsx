import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EmergencyScenario, Language } from './types';
import HomeScreen from './components/HomeScreen';
import EmergencyScreen from './components/EmergencyScreen';
import SystemInfo from './components/SystemInfo';
import DecisionScreen from './components/DecisionScreen';
import NaturalLanguageScreen from './components/NaturalLanguageScreen';

type Screen = 'home' | 'emergency' | 'info' | 'decision' | 'nlu';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedScenario, setSelectedScenario] = useState<EmergencyScenario | null>(null);

  // Detect browser language on first load
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ar')) {
      setLanguage('ar');
    } else if (browserLang.startsWith('fr')) {
      setLanguage('fr');
    }
  }, []);

  // Update document direction for RTL
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'en' ? 'en' : language === 'ar' ? 'ar' : 'fr';
  }, [language]);

  const handleSelectEmergency = (scenario: EmergencyScenario) => {
    setSelectedScenario(scenario);
    setScreen('emergency');
  };

  const handleBack = () => {
    setSelectedScenario(null);
    setScreen('home');
  };

  const handleShowInfo = () => {
    setScreen('info');
  };

  const handleShowDecision = () => {
    setScreen('decision');
  };

  const handleShowNLU = () => {
    setScreen('nlu');
  };

  const handleCallEmergency = () => {
    // Try to call emergency number
    window.location.href = 'tel:911';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HomeScreen
              language={language}
              onLanguageChange={setLanguage}
              onSelectEmergency={handleSelectEmergency}
              onCallEmergency={handleCallEmergency}
              onShowInfo={handleShowInfo}
              onShowDecision={handleShowDecision}
              onShowNLU={handleShowNLU}
            />
          </motion.div>
        )}

        {screen === 'emergency' && selectedScenario && (
          <motion.div
            key="emergency"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <EmergencyScreen
              scenario={selectedScenario}
              language={language}
              onBack={handleBack}
              onCallEmergency={handleCallEmergency}
            />
          </motion.div>
        )}

        {screen === 'info' && (
          <motion.div
            key="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SystemInfo
              language={language}
              onBack={handleBack}
            />
          </motion.div>
        )}

        {screen === 'decision' && (
          <motion.div
            key="decision"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DecisionScreen
              language={language}
              onBack={handleBack}
              onCallEmergency={handleCallEmergency}
            />
          </motion.div>
        )}

        {screen === 'nlu' && (
          <motion.div
            key="nlu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <NaturalLanguageScreen
              language={language}
              onBack={handleBack}
              onCallEmergency={handleCallEmergency}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
