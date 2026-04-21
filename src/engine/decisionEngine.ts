/**
 * DECISION ENGINE — MAIN ORCHESTRATOR
 * ───────────────────────────────────────
 * Single entry point. Receives input → normalizes → maps symptoms →
 * evaluates rules → scores severity → builds response.
 *
 * DEBUG LOGGING:
 *   Logs NLP output, decision input signals, rule matches, and final
 *   classification to console for tracing every decision path.
 *
 * SAFETY:
 *   • Override rules catch single strong signals (not breathing, unconscious, severe bleeding).
 *   • Compound rules (cardiac arrest) score higher and win when multiple signals align.
 *   • All outputs pulled ONLY from pre-validated dataset.
 */

import { StructuredInput, EngineResult, Language, DecisionQuestion, SignalMap } from '../types';
import { normalizeInput } from './inputProcessor';
import { evaluateRules } from './ruleEngine';
import { selectTopCondition, getSeverityForScenario } from './severityEngine';
import { buildResponse } from './responseBuilder';

export interface DecisionLog {
  timestamp: number;
  input: string | StructuredInput;
  language: Language;
  nlpOutput?: SignalMap;
  decisionInput: { signals: SignalMap; symptoms: string[] };
  ruleMatches: { ruleName: string; scenarioId: string; score: number; triggers: string[] }[];
  topCondition: string | null;
  elapsedMs: number;
}

let lastDecisionLog: DecisionLog | null = null;

export function getLastDecisionLog(): DecisionLog | null {
  return lastDecisionLog;
}

/**
 * Primary API: process any input (structured text or natural language)
 * and return the life-saving instructions.
 */
export function processEmergency(
  input: StructuredInput | string,
  language: Language
): EngineResult {
  const start = performance.now();

  // STEP 1: Normalize
  const normalized = normalizeInput(input, language);

  // STEP 2: Evaluate rules (override + compound)
  const matches = evaluateRules(normalized.signals, normalized.symptoms, language);

  // STEP 3: Select top condition
  const top = selectTopCondition(matches);

  // Build log
  const log: DecisionLog = {
    timestamp: Date.now(),
    input,
    language,
    decisionInput: normalized,
    ruleMatches: matches.map((m) => ({
      ruleName: m.ruleName,
      scenarioId: m.scenarioId,
      score: m.score,
      triggers: m.triggers,
    })),
    topCondition: top?.scenarioId || null,
    elapsedMs: 0,
  };

  let result: EngineResult;

  if (!top) {
    // FALLBACK: insufficient data with safe guidance
    result = buildResponse(
      'insufficient-data',
      getSeverityForScenario('insufficient-data')!,
      [],
      language,
      0
    );
  } else {
    // Standard: build from dataset
    result = buildResponse(
      top.scenarioId,
      top.severityResult,
      top.allMatches,
      language,
      top.severityResult.score
    );
  }

  const elapsed = performance.now() - start;
  log.elapsedMs = Math.round(elapsed * 100) / 100;
  lastDecisionLog = log;

  // DEBUG LOGGING
  // eslint-disable-next-line no-console
  console.log('[ResQ DecisionEngine]', {
    input: typeof input === 'string' ? input.slice(0, 100) : 'structured',
    language,
    signals: normalized.signals,
    symptoms: normalized.symptoms,
    matchedRules: matches.length,
    topRule: matches[0]?.ruleName || null,
    topScore: matches[0]?.score || 0,
    topCondition: top?.scenarioId || 'insufficient-data',
    elapsedMs: log.elapsedMs,
  });

  if (elapsed > 200) {
    // eslint-disable-next-line no-console
    console.warn(`[ResQ] Decision engine slow: ${elapsed.toFixed(2)}ms`);
  }

  return result;
}

/**
 * Process natural-language text directly.
 */
export function processText(text: string, language: Language): EngineResult {
  return processEmergency(text, language);
}

/**
 * Process structured input directly.
 */
export function processStructured(input: StructuredInput, language: Language): EngineResult {
  return processEmergency(input, language);
}

/**
 * Get the guided decision-flow questions for step-by-step assessment.
 */
export function getDecisionQuestions(language: Language): DecisionQuestion[] {
  const t: Record<Language, Record<string, string>> = {
    en: {
      qConscious: 'Is the person conscious and responsive?',
      qBreathing: 'Is the person breathing normally?',
      qBleeding: 'Is there bleeding? If yes, how severe?',
      qChestPain: 'Is the person experiencing chest pain?',
      qChoking: 'Is the person choking or unable to breathe?',
      qSeizure: 'Is the person having a seizure or convulsing?',
      qBurn: 'Is there a burn? What caused it?',
      qElectric: 'Was the person exposed to electricity?',
      qDrowning: 'Did the person almost drown or was submerged?',
      qAllergy: 'Is there swelling, hives, or known allergy?',
      qPoison: 'Did the person swallow something toxic or overdose?',
      qStroke: 'Is there face drooping, arm weakness, or slurred speech?',
      yes: 'Yes',
      no: 'No',
      unknown: 'Not sure',
      minor: 'Minor',
      severe: 'Severe',
      thermal: 'Fire / Hot water',
      chemical: 'Chemical',
      electrical: 'Electrical',
    },
    ar: {
      qConscious: 'هل الشخص واعٍ ويستجيب؟',
      qBreathing: 'هل الشخص يتنفس بشكل طبيعي؟',
      qBleeding: 'هل هناك نزيف؟ إذا نعم، ما شدته؟',
      qChestPain: 'هل يعاني الشخص من ألم في الصدر؟',
      qChoking: 'هل الشخص يختنق أو لا يستطيع التنفس؟',
      qSeizure: 'هل الشخص يعاني نوبة صرع أو ارتعاش؟',
      qBurn: 'هل هناك حرق؟ ما السبب؟',
      qElectric: 'هل تعرض الشخص للكهرباء؟',
      qDrowning: 'هل كاد الشخص أن يغرق أو غمره الماء؟',
      qAllergy: 'هل هناك تورم، شرى، أو حساسية معروفة؟',
      qPoison: 'هل ابتلع الشخص شيئاً ساماً أو جرعة زائدة؟',
      qStroke: 'هل هناك تدلي في الوجه، ضعف في الذراع، أو كلام متلعثم؟',
      yes: 'نعم',
      no: 'لا',
      unknown: 'غير متأكد',
      minor: 'بسيط',
      severe: 'حاد',
      thermal: 'نار / ماء ساخن',
      chemical: 'كيميائي',
      electrical: 'كهربائي',
    },
    fr: {
      qConscious: 'La personne est-elle consciente et réactive ?',
      qBreathing: 'La personne respire-t-elle normalement ?',
      qBleeding: 'Y a-t-il un saignement ? Si oui, à quel degré ?',
      qChestPain: 'La personne a-t-elle une douleur thoracique ?',
      qChoking: 'La personne étouffe-t-elle ou ne peut-elle pas respirer ?',
      qSeizure: 'La personne a-t-elle une crise ou des convulsions ?',
      qBurn: 'Y a-t-il une brûlure ? Quelle en est la cause ?',
      qElectric: 'La personne a-t-elle été exposée à l\'électricité ?',
      qDrowning: 'La personne a-t-il failli se noyer ou été submergée ?',
      qAllergy: 'Y a-t-il un gonflement, urticaire, ou allergie connue ?',
      qPoison: 'La personne a-t-elle avalé quelque chose de toxique ou fait un surdosage ?',
      qStroke: 'Y a-t-il une chute du visage, une faiblesse du bras, ou une parole confuse ?',
      yes: 'Oui',
      no: 'Non',
      unknown: 'Pas sûr',
      minor: 'Léger',
      severe: 'Sévère',
      thermal: 'Feu / Eau chaude',
      chemical: 'Chimique',
      electrical: 'Électrique',
    },
  };

  const l = t[language];

  return [
    {
      id: 'conscious',
      priority: 1,
      question: { en: l.qConscious, ar: l.qConscious, fr: l.qConscious },
      options: [
        { value: 'yes', label: { en: l.yes, ar: l.yes, fr: l.yes }, color: 'green' },
        { value: 'no', label: { en: l.no, ar: l.no, fr: l.no }, color: 'red' },
        { value: 'unknown', label: { en: l.unknown, ar: l.unknown, fr: l.unknown }, color: 'amber' },
      ],
    },
    {
      id: 'breathing',
      priority: 2,
      question: { en: l.qBreathing, ar: l.qBreathing, fr: l.qBreathing },
      options: [
        { value: 'yes', label: { en: l.yes, ar: l.yes, fr: l.yes }, color: 'green' },
        { value: 'no', label: { en: l.no, ar: l.no, fr: l.no }, color: 'red' },
        { value: 'labored', label: { en: 'Labored / Gasping', ar: 'متعب / يلهث', fr: 'Difficile / Haletant' }, color: 'amber' },
        { value: 'unknown', label: { en: l.unknown, ar: l.unknown, fr: l.unknown }, color: 'amber' },
      ],
    },
    {
      id: 'bleeding',
      priority: 3,
      question: { en: l.qBleeding, ar: l.qBleeding, fr: l.qBleeding },
      options: [
        { value: 'none', label: { en: 'No bleeding', ar: 'لا نزيف', fr: 'Pas de saignement' }, color: 'green' },
        { value: 'minor', label: { en: l.minor, ar: l.minor, fr: l.minor }, color: 'amber' },
        { value: 'severe', label: { en: l.severe, ar: l.severe, fr: l.severe }, color: 'red' },
      ],
    },
    {
      id: 'choking',
      priority: 4,
      question: { en: l.qChoking, ar: l.qChoking, fr: l.qChoking },
      options: [
        { value: 'yes', label: { en: l.yes, ar: l.yes, fr: l.yes }, color: 'red' },
        { value: 'no', label: { en: l.no, ar: l.no, fr: l.no }, color: 'green' },
      ],
      condition: (input) => input.breathing !== 'no',
    },
    {
      id: 'chestPain',
      priority: 5,
      question: { en: l.qChestPain, ar: l.qChestPain, fr: l.qChestPain },
      options: [
        { value: 'yes', label: { en: l.yes, ar: l.yes, fr: l.yes }, color: 'red' },
        { value: 'no', label: { en: l.no, ar: l.no, fr: l.no }, color: 'green' },
      ],
    },
    {
      id: 'seizure',
      priority: 6,
      question: { en: l.qSeizure, ar: l.qSeizure, fr: l.qSeizure },
      options: [
        { value: 'yes', label: { en: l.yes, ar: l.yes, fr: l.yes }, color: 'red' },
        { value: 'no', label: { en: l.no, ar: l.no, fr: l.no }, color: 'green' },
      ],
    },
    {
      id: 'allergicReaction',
      priority: 7,
      question: { en: l.qAllergy, ar: l.qAllergy, fr: l.qAllergy },
      options: [
        { value: 'yes', label: { en: l.yes, ar: l.yes, fr: l.yes }, color: 'red' },
        { value: 'no', label: { en: l.no, ar: l.no, fr: l.no }, color: 'green' },
      ],
    },
    {
      id: 'burn',
      priority: 8,
      question: { en: l.qBurn, ar: l.qBurn, fr: l.qBurn },
      options: [
        { value: 'none', label: { en: 'No burn', ar: 'لا حرق', fr: 'Pas de brûlure' }, color: 'green' },
        { value: 'thermal', label: { en: l.thermal, ar: l.thermal, fr: l.thermal }, color: 'amber' },
        { value: 'chemical', label: { en: l.chemical, ar: l.chemical, fr: l.chemical }, color: 'red' },
        { value: 'electrical', label: { en: l.electrical, ar: l.electrical, fr: l.electrical }, color: 'red' },
      ],
    },
    {
      id: 'electricShock',
      priority: 9,
      question: { en: l.qElectric, ar: l.qElectric, fr: l.qElectric },
      options: [
        { value: 'yes', label: { en: l.yes, ar: l.yes, fr: l.yes }, color: 'red' },
        { value: 'no', label: { en: l.no, ar: l.no, fr: l.no }, color: 'green' },
      ],
    },
    {
      id: 'drowning',
      priority: 10,
      question: { en: l.qDrowning, ar: l.qDrowning, fr: l.qDrowning },
      options: [
        { value: 'yes', label: { en: l.yes, ar: l.yes, fr: l.yes }, color: 'red' },
        { value: 'no', label: { en: l.no, ar: l.no, fr: l.no }, color: 'green' },
      ],
    },
    {
      id: 'poisoning',
      priority: 11,
      question: { en: l.qPoison, ar: l.qPoison, fr: l.qPoison },
      options: [
        { value: 'yes', label: { en: l.yes, ar: l.yes, fr: l.yes }, color: 'red' },
        { value: 'no', label: { en: l.no, ar: l.no, fr: l.no }, color: 'green' },
      ],
    },
    {
      id: 'strokeSymptoms',
      priority: 12,
      question: { en: l.qStroke, ar: l.qStroke, fr: l.qStroke },
      options: [
        { value: 'yes', label: { en: l.yes, ar: l.yes, fr: l.yes }, color: 'red' },
        { value: 'no', label: { en: l.no, ar: l.no, fr: l.no }, color: 'green' },
      ],
    },
  ];
}

/**
 * Return only the questions that are active based on current answers.
 */
export function getActiveQuestions(
  answers: Record<string, string>,
  language: Language
): DecisionQuestion[] {
  const all = getDecisionQuestions(language);
  return all.filter((q) => {
    if (!q.condition) return true;
    return q.condition(answers as Record<string, string>);
  });
}
