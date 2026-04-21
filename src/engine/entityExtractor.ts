/**
 * ENTITY EXTRACTOR
 * ───────────────────────────────────────
 * Extracts structured emergency signals from normalized text using
 * deterministic keyword matching against pre-validated multilingual
 * keyword maps.
 *
 * SAFETY: Never infers. Only extracts what is explicitly stated.
 * Confidence levels: strong = exact keyword match, moderate = partial
 * match, weak = related term.
 */

import {
  Language,
  SignalMap,
  ExtractedEntity,
  NLUResult,
  DetectedLanguage,
} from '../types';
import { getKeywordMap } from './keywordMaps';
import { normalizeForMatching } from './textNormalizer';

/* ── Default signal map ── */

function createDefaultSignals(): SignalMap {
  return {
    consciousness: 'unknown',
    breathing: 'unknown',
    bleeding: 'unknown',
    chestPain: false,
    choking: false,
    seizure: false,
    burn: 'none',
    electricShock: false,
    drowning: false,
    allergicReaction: false,
    poisoning: false,
    strokeSymptoms: false,
  };
}

/* ── Negation detection ── */

/**
 * Check if a keyword match is negated in context.
 * Looks for negation markers within a window of 3 tokens before the match.
 */
function isNegated(
  text: string,
  matchIndex: number,
  negationMarkers: string[]
): boolean {
  const windowStart = Math.max(0, matchIndex - 25);
  const beforeText = text.slice(windowStart, matchIndex);
  return negationMarkers.some((marker) => beforeText.includes(marker));
}

/* ── Entity extraction ── */

function extractEntities(
  normalizedText: string,
  language: Language
): { entities: ExtractedEntity[]; symptoms: string[] } {
  const keywordMap = getKeywordMap(language);
  const entities: ExtractedEntity[] = [];
  const symptoms: string[] = [];
  const seenTypes = new Set<string>();

  for (const entry of keywordMap.entities) {
    let matched = false;
    let matchConfidence: 'strong' | 'moderate' | 'weak' = entry.confidence;
    const matchedKeywords: string[] = [];

    for (const synonym of entry.synonyms) {
      const normalizedSynonym = language === 'ar'
        ? synonym
        : synonym.toLowerCase();

      // Check for exact match (multi-word phrases)
      if (normalizedText.includes(normalizedSynonym)) {
        const matchIndex = normalizedText.indexOf(normalizedSynonym);
        const negated = isNegated(
          normalizedText,
          matchIndex,
          keywordMap.negationMarkers
        );

        if (!negated) {
          matched = true;
          matchedKeywords.push(synonym);
          // Boost confidence for exact multi-word matches
          if (normalizedSynonym.includes(' ')) {
            matchConfidence = 'strong';
          }
        }
      }
    }

    if (matched) {
      // Handle conflicts: if we already have a strong signal for this type, prefer it
      if (seenTypes.has(entry.entityType)) {
        const existing = entities.find((e) => e.type === entry.entityType);
        if (existing && existing.confidence === 'strong' && matchConfidence !== 'strong') {
          continue; // Keep the stronger signal
        }
        if (existing && existing.confidence === matchConfidence) {
          // Merge matched keywords
          existing.matchedKeywords = [...new Set([...existing.matchedKeywords, ...matchedKeywords])];
          continue;
        }
      }

      // Remove existing entity of same type if present (we'll replace with this one)
      const existingIndex = entities.findIndex((e) => e.type === entry.entityType);
      if (existingIndex >= 0) {
        entities.splice(existingIndex, 1);
      }

      entities.push({
        type: entry.entityType,
        value: entry.entityValue,
        confidence: matchConfidence,
        matchedKeywords,
      });
      seenTypes.add(entry.entityType);

      // Add to symptoms list
      if (!symptoms.includes(entry.canonical)) {
        symptoms.push(entry.canonical);
      }
    }
  }

  return { entities, symptoms };
}

/* ── Signal map builder ── */

function buildSignalMap(entities: ExtractedEntity[]): SignalMap {
  const signals = createDefaultSignals();

  for (const entity of entities) {
    switch (entity.type) {
      case 'consciousness':
        if (entity.value === 'unconscious' || entity.value === 'conscious') {
          signals.consciousness = entity.value as SignalMap['consciousness'];
        }
        break;
      case 'breathing':
        if (['not_breathing', 'labored', 'breathing'].includes(entity.value as string)) {
          signals.breathing = entity.value as SignalMap['breathing'];
        }
        break;
      case 'bleeding':
        if (['severe', 'minor', 'none'].includes(entity.value as string)) {
          signals.bleeding = entity.value as SignalMap['bleeding'];
        }
        break;
      case 'chestPain':
        signals.chestPain = entity.value === true;
        break;
      case 'choking':
        signals.choking = entity.value === true;
        break;
      case 'seizure':
        signals.seizure = entity.value === true;
        break;
      case 'burn':
        if (['thermal', 'chemical', 'electrical', 'none'].includes(entity.value as string)) {
          signals.burn = entity.value as SignalMap['burn'];
        }
        break;
      case 'electricShock':
        signals.electricShock = entity.value === true;
        break;
      case 'drowning':
        signals.drowning = entity.value === true;
        break;
      case 'allergicReaction':
        signals.allergicReaction = entity.value === true;
        break;
      case 'poisoning':
        signals.poisoning = entity.value === true;
        break;
      case 'strokeSymptoms':
        signals.strokeSymptoms = entity.value === true;
        break;
      // Note: fracture, fainting, heat, cold, nosebleed are symptoms only
      // The decision engine maps these via the symptoms array
    }
  }

  return signals;
}

/* ── Confidence scoring ── */

function calculateNLUConfidence(
  entities: ExtractedEntity[],
  detectedLang: DetectedLanguage
): number {
  if (entities.length === 0) return 0;

  let score = 0;
  let maxPossible = 0;

  for (const entity of entities) {
    const weight = entity.confidence === 'strong' ? 1.0 : entity.confidence === 'moderate' ? 0.6 : 0.3;
    score += weight;
    maxPossible += 1.0;
  }

  const entityScore = maxPossible > 0 ? score / maxPossible : 0;
  const langBonus = detectedLang.confidence >= 0.9 ? 0.1 : 0;

  return Math.min(entityScore + langBonus, 1.0);
}

/* ── Public API ── */

/**
 * Main NLU pipeline entry point.
 * Takes raw emergency text, detects language, normalizes, extracts entities,
 * and returns a structured NLU result ready for the Decision Engine.
 */
export function parseEmergencyText(rawText: string): NLUResult {
  const startTime = performance.now();

  // Step 1: Detect language
  const detectedLang = detectLanguageInternal(rawText);

  // Step 2: Normalize text
  const normalizedText = normalizeForMatching(rawText, detectedLang.code);

  // Step 3: Extract entities
  const { entities, symptoms } = extractEntities(normalizedText, detectedLang.code);

  // Step 4: Build signal map
  const signals = buildSignalMap(entities);

  // Step 5: Build result
  const processingTimeMs = performance.now() - startTime;

  return {
    language: detectedLang,
    entities,
    signals,
    symptoms,
    rawText,
    normalizedText,
    processingTimeMs,
    confidence: calculateNLUConfidence(entities, detectedLang),
  };
}

/**
 * Parse emergency text with a known language (skip detection).
 */
export function parseEmergencyTextWithLanguage(
  rawText: string,
  language: Language
): NLUResult {
  const startTime = performance.now();

  const detectedLang: DetectedLanguage = {
    code: language,
    confidence: 1.0,
    method: 'default',
  };

  const normalizedText = normalizeForMatching(rawText, language);
  const { entities, symptoms } = extractEntities(normalizedText, language);
  const signals = buildSignalMap(entities);
  const processingTimeMs = performance.now() - startTime;

  return {
    language: detectedLang,
    entities,
    signals,
    symptoms,
    rawText,
    normalizedText,
    processingTimeMs,
    confidence: calculateNLUConfidence(entities, detectedLang),
  };
}

/* ── Internal language detection (re-export for standalone use) ── */

function detectLanguageInternal(text: string): DetectedLanguage {
  // Inline simple detection to avoid circular deps with languageDetector
  // Arabic script detection
  if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text)) {
    return { code: 'ar', confidence: 0.98, method: 'script' };
  }

  const lower = text.toLowerCase();

  // French strong signals
  const frSignals = ['ne respire pas', 'noyade', 'évanoui', 'étouffement', 'brûlure', 'saignement', 'inconscient', 'douleur thoracique', 'crise cardiaque', 'arrêt respiratoire'];
  if (frSignals.some((s) => lower.includes(s))) {
    return { code: 'fr', confidence: 0.95, method: 'keyword' };
  }

  // French common words
  const frWords = ['il', 'elle', 'ne', 'pas', 'respire', 'saignement', 'inconscient', 'douleur', 'poitrine', 'brûlure', 'crise', 'allergie'];
  const frCount = frWords.filter((w) => lower.includes(w)).length;

  // English common words
  const enWords = ['the', 'not', 'breathing', 'bleeding', 'unconscious', 'chest', 'pain', 'burn', 'seizure', 'allergic', 'poison', 'drowning', 'cant', "can't"];
  const enCount = enWords.filter((w) => lower.includes(w)).length;

  if (frCount > enCount && frCount >= 2) {
    return { code: 'fr', confidence: 0.8, method: 'keyword' };
  }
  if (enCount > frCount && enCount >= 2) {
    return { code: 'en', confidence: 0.8, method: 'keyword' };
  }

  return { code: 'en', confidence: 0.5, method: 'default' };
}

/* ── Standalone exports for testing and debugging ── */

export { extractEntities, buildSignalMap, createDefaultSignals };
