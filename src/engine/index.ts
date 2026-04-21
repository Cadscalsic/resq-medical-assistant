/**
 * RESQ DECISION ENGINE — PUBLIC API
 * ───────────────────────────────────────
 * Deterministic, offline, rule-based emergency medical decision engine.
 *
 * Usage:
 *   import { processText, processStructured, getDecisionQuestions } from './engine';
 *   const result = processText("not breathing", "en");
 */

export {
  processEmergency,
  processText,
  processStructured,
  getDecisionQuestions,
  getActiveQuestions,
  getLastDecisionLog,
} from './decisionEngine';
export type {
  EngineResult,
  StructuredInput,
  NormalizedInput,
  SignalMap,
  RuleMatch,
  DecisionQuestion,
  DecisionLog,
} from '../types';

/* ─── NLU ENGINE EXPORTS ─── */

export { parseEmergencyText, parseEmergencyTextWithLanguage } from './entityExtractor';
export { detectLanguage } from './languageDetector';
export { normalizeText, normalizeForMatching, tokenize } from './textNormalizer';
export { getKeywordMap } from './keywordMaps';
export type {
  NLUResult,
  DetectedLanguage,
  ExtractedEntity,
  KeywordEntry,
  LanguageKeywordMap,
} from '../types';
