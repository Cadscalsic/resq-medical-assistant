/**
 * LANGUAGE DETECTOR
 * ───────────────────────────────────────
 * Detects input language using Unicode script analysis and
 * keyword matching.  Zero external APIs.  Deterministic.
 *
 * Detection pipeline:
 *   1. Script analysis (Arabic Unicode range → ar)
 *   2. Keyword fingerprinting (language-specific tokens)
 *   3. Fallback to provided/default language
 */

import { Language, DetectedLanguage } from '../types';

/* ── Script detection ── */

function hasArabicScript(text: string): boolean {
  // Arabic Unicode block: U+0600–U+06FF, U+0750–U+077F, U+08A0–U+08FF, U+FB50–U+FDFF, U+FE70–U+FEFF
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

/* ── Keyword fingerprints ── */

const languageFingerprints: Record<Language, string[]> = {
  en: [
    'the', 'and', 'not', 'breathing', 'bleeding', 'unconscious', 'chest', 'pain',
    'choking', 'burn', 'seizure', 'allergic', 'poison', 'drowning', 'fainted',
    'he', 'she', 'is', 'are', 'was', 'were', 'has', 'have', 'cant', "can't",
    'emergency', 'help', 'someone', 'person', 'hurt', 'injured', 'blood',
  ],
  ar: [
    'لا', 'يتنفس', 'نزيف', 'فاقد', 'الوعي', 'ألم', 'صدر', 'اختناق', 'حرق',
    'نوبة', 'حساسية', 'تسمم', 'غرق', 'إغماء', 'هو', 'هي', 'شخص', 'مساعدة',
    'إصابة', 'دم', 'جروح', 'توقف', 'تنفس', 'شديد', 'كثير', 'ينزف',
  ],
  fr: [
    'il', 'elle', 'ne', 'pas', 'respire', 'saignement', 'inconscient', 'douleur',
    'poitrine', 'étouffement', 'brûlure', 'crise', 'allergie', 'empoisonnement',
    'noyade', 'évanoui', 'urgence', 'aide', 'quelqu', 'un', 'blessé', 'sang',
    'sévère', 'grave', 'beaucoup', 'saigne', 'arrêt', 'respiratoire',
  ],
};

function countFingerprints(text: string, fingerprints: string[]): number {
  const lower = text.toLowerCase();
  return fingerprints.filter((word) => lower.includes(word)).length;
}

/* ── Public API ── */

/**
 * Detect language from raw emergency text.
 * Returns the most confident detection result.
 */
export function detectLanguage(
  text: string,
  fallback: Language = 'en'
): DetectedLanguage {
  if (!text || text.trim().length === 0) {
    return { code: fallback, confidence: 0, method: 'default' };
  }

  const trimmed = text.trim();

  /* Step 1: Script analysis (strongest signal) */
  if (hasArabicScript(trimmed)) {
    return { code: 'ar', confidence: 0.98, method: 'script' };
  }

  /* Step 2: Keyword fingerprinting */
  const enCount = countFingerprints(trimmed, languageFingerprints.en);
  const frCount = countFingerprints(trimmed, languageFingerprints.fr);
  // ar already handled by script

  const totalWords = trimmed.split(/\s+/).length;
  const enRatio = enCount / Math.max(totalWords, 1);
  const frRatio = frCount / Math.max(totalWords, 1);

  // French-specific strong signals (contraction words)
  const frStrongSignals = ['ne respire pas', 'noyade', 'évanoui', 'étouffement', 'brûlure', 'saignement', 'inconscient'];
  const hasFrStrong = frStrongSignals.some((s) => trimmed.toLowerCase().includes(s));

  // English-specific strong signals
  const enStrongSignals = ["can't breathe", 'not breathing', 'passed out', 'severe bleeding', 'chest pain', 'choking'];
  const hasEnStrong = enStrongSignals.some((s) => trimmed.toLowerCase().includes(s));

  if (hasFrStrong && !hasEnStrong) {
    return { code: 'fr', confidence: 0.95, method: 'keyword' };
  }
  if (hasEnStrong && !hasFrStrong) {
    return { code: 'en', confidence: 0.95, method: 'keyword' };
  }

  // Ratio-based decision
  if (frRatio > enRatio && frCount >= 2) {
    return { code: 'fr', confidence: Math.min(0.7 + frRatio * 0.3, 0.92), method: 'keyword' };
  }
  if (enRatio > frRatio && enCount >= 2) {
    return { code: 'en', confidence: Math.min(0.7 + enRatio * 0.3, 0.92), method: 'keyword' };
  }
  if (frCount > 0 && enCount === 0) {
    return { code: 'fr', confidence: 0.75, method: 'keyword' };
  }
  if (enCount > 0 && frCount === 0) {
    return { code: 'en', confidence: 0.75, method: 'keyword' };
  }

  // Default fallback
  return { code: fallback, confidence: 0.5, method: 'default' };
}
