/**
 * SEVERITY ENGINE
 * ───────────────────────────────────────
 * Assigns deterministic severity scores and selects the highest-priority
 * condition when multiple rules match. Pure function. No randomness.
 *
 * Override rules (respiratory-failure, unconscious-person) map to critical
 * severity so single strong signals always surface as emergencies.
 */

import { Severity, RuleMatch, Language } from '../types';

export interface SeverityResult {
  severity: Severity;
  score: number;
  rank: number;
  label: Record<Language, string>;
  color: string;
}

// Deterministic severity mapping per scenario
const scenarioSeverityMap: Record<string, SeverityResult> = {
  'cardiac-arrest':      { severity: 'critical', score: 100, rank: 1,  label: { en: 'CRITICAL — CARDIAC ARREST',     ar: 'حرج — توقف القلب',          fr: 'CRITIQUE — ARRÊT CARDIAQUE' },      color: '#ef4444' },
  'respiratory-failure': { severity: 'critical', score: 96,  rank: 2,  label: { en: 'CRITICAL — NOT BREATHING',      ar: 'حرج — لا يتنفس',            fr: 'CRITIQUE — NE RESPIRE PAS' },       color: '#ef4444' },
  'severe-bleeding':     { severity: 'critical', score: 95,  rank: 3,  label: { en: 'CRITICAL — SEVERE BLEEDING',    ar: 'حرج — نزيف حاد',            fr: 'CRITIQUE — HÉMORRAGIE' },           color: '#ef4444' },
  'unconscious-person':  { severity: 'critical', score: 94,  rank: 4,  label: { en: 'CRITICAL — UNCONSCIOUS',        ar: 'حرج — فاقد الوعي',          fr: 'CRITIQUE — INCONSCIENT' },          color: '#ef4444' },
  'choking':             { severity: 'critical', score: 92,  rank: 5,  label: { en: 'CRITICAL — CHOKING',            ar: 'حرج — اختناق',              fr: 'CRITIQUE — ÉTOUFFEMENT' },          color: '#ef4444' },
  'allergic-reaction':   { severity: 'critical', score: 93,  rank: 6,  label: { en: 'CRITICAL — ANAPHYLAXIS',        ar: 'حرج — صدمة تحسسية',         fr: 'CRITIQUE — ANAPHYLAXIE' },          color: '#ef4444' },
  'stroke':              { severity: 'critical', score: 90,  rank: 7,  label: { en: 'CRITICAL — STROKE',             ar: 'حرج — سكتة دماغية',         fr: 'CRITIQUE — AVC' },                  color: '#ef4444' },
  'electric-shock':      { severity: 'critical', score: 91,  rank: 8,  label: { en: 'CRITICAL — ELECTRIC SHOCK',     ar: 'حرج — صدمة كهربائية',       fr: 'CRITIQUE — CHOC ÉLECTRIQUE' },      color: '#ef4444' },
  'heart-attack':        { severity: 'critical', score: 88,  rank: 9,  label: { en: 'CRITICAL — HEART ATTACK',       ar: 'حرج — ذبحة صدرية',          fr: 'CRITIQUE — INFARCTUS' },            color: '#ef4444' },
  'drowning':            { severity: 'critical', score: 89,  rank: 10, label: { en: 'CRITICAL — DROWNING',           ar: 'حرج — غرق',                 fr: 'CRITIQUE — NOYADE' },               color: '#ef4444' },
  'seizure':             { severity: 'critical', score: 85,  rank: 11, label: { en: 'CRITICAL — SEIZURE',            ar: 'حرج — نوبة صرع',            fr: 'CRITIQUE — CRISE' },                color: '#ef4444' },
  'poisoning':           { severity: 'critical', score: 84,  rank: 12, label: { en: 'CRITICAL — POISONING',          ar: 'حرج — تسمم',                fr: 'CRITIQUE — EMPOISONNEMENT' },       color: '#ef4444' },
  'burns':               { severity: 'moderate', score: 60,  rank: 13, label: { en: 'MODERATE — BURNS',              ar: 'متوسط — حروق',              fr: 'MODÉRÉ — BRÛLURES' },               color: '#f59e0b' },
  'fracture':            { severity: 'moderate', score: 55,  rank: 14, label: { en: 'MODERATE — FRACTURE',           ar: 'متوسط — كسر',               fr: 'MODÉRÉ — FRACTURE' },               color: '#f59e0b' },
  'fainting':            { severity: 'moderate', score: 50,  rank: 15, label: { en: 'MODERATE — FAINTING',           ar: 'متوسط — إغماء',             fr: 'MODÉRÉ — ÉVANOUISSEMENT' },         color: '#f59e0b' },
  'heat-exhaustion':     { severity: 'moderate', score: 52,  rank: 16, label: { en: 'MODERATE — HEAT',               ar: 'متوسط — حرارة',             fr: 'MODÉRÉ — CHALEUR' },                color: '#f59e0b' },
  'hypothermia':         { severity: 'moderate', score: 52,  rank: 17, label: { en: 'MODERATE — COLD',               ar: 'متوسط — برد',               fr: 'MODÉRÉ — FROID' },                  color: '#f59e0b' },
  'nosebleed':           { severity: 'minor',    score: 30,  rank: 18, label: { en: 'MINOR — NOSEBLEED',             ar: 'بسيط — نزيف أنف',           fr: 'MINEUR — SAIGNEMENT NEZ' },         color: '#10b981' },
  'insufficient-data':   { severity: 'minor',    score: 0,   rank: 99, label: { en: 'CHECK SYMPTOMS CAREFULLY',      ar: 'افحص الأعراض بعناية',       fr: 'VÉRIFIEZ LES SYMPTÔMES' },          color: '#f59e0b' },
  'normal-condition':    { severity: 'minor',    score: 5,   rank: 100,label: { en: 'NO EMERGENCY DETECTED',         ar: 'لم يتم رصد حالة طارئة',     fr: 'AUCUNE URGENCE DÉTECTÉE' },         color: '#10b981' },
};

/**
 * Given a list of rule matches, select the single highest-priority condition.
 */
export function selectTopCondition(matches: RuleMatch[]): {
  scenarioId: string;
  severityResult: SeverityResult;
  allMatches: RuleMatch[];
} | null {
  if (matches.length === 0) return null;

  // Group by scenario, keep highest score per scenario
  const bestPerScenario = new Map<string, RuleMatch>();
  for (const match of matches) {
    const existing = bestPerScenario.get(match.scenarioId);
    if (!existing || match.score > existing.score) {
      bestPerScenario.set(match.scenarioId, match);
    }
  }

  // Pick scenario with highest severityResult score
  let bestScenarioId = '';
  let bestSeverityScore = -1;

  for (const [scenarioId] of bestPerScenario) {
    const sev = scenarioSeverityMap[scenarioId];
    if (!sev) continue;
    if (sev.score > bestSeverityScore) {
      bestSeverityScore = sev.score;
      bestScenarioId = scenarioId;
    }
  }

  if (!bestScenarioId) return null;

  return {
    scenarioId: bestScenarioId,
    severityResult: scenarioSeverityMap[bestScenarioId],
    allMatches: Array.from(bestPerScenario.values()),
  };
}

/**
 * Get severity info for a specific scenario ID.
 */
export function getSeverityForScenario(scenarioId: string): SeverityResult | null {
  return scenarioSeverityMap[scenarioId] || null;
}
