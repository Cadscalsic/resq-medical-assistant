/**
 * TEXT NORMALIZER
 * ───────────────────────────────────────
 * Normalizes emergency text input for deterministic entity extraction.
 * Handles case folding, punctuation removal, diacritic normalization,
 * and whitespace standardization.
 *
 * SAFETY: No semantic changes. Only surface-level normalization.
 */

import { Language } from '../types';

/* ── Language-specific normalizers ── */

interface NormalizerOptions {
  lowercase: boolean;
  removePunctuation: boolean;
  normalizeDiacritics: boolean;
  collapseWhitespace: boolean;
}

const defaultOptions: NormalizerOptions = {
  lowercase: true,
  removePunctuation: true,
  normalizeDiacritics: true,
  collapseWhitespace: true,
};

/* ── Arabic-specific normalization ── */

const arabicNormalizations: [RegExp, string][] = [
  // Normalize alef variants
  [/[آأإ]/g, 'ا'], // hamza-on-alef, hamza-below-alef, alef-maksura → alef
  // Normalize ta marbuta
  [/[ة]/g, 'ه'], // ta marbuta → ha
  // Normalize ya
  [/[ى]/g, 'ي'], // alef maksura → ya
  // Remove tatweel (kashida)
  [/[ـ]/g, ''],
  // Normalize hamza
  [/[ؤئ]/g, 'ء'], // hamza-on-waw, hamza-on-ya → hamza
];

/* ── French-specific normalization ── */

const frenchNormalizations: [RegExp, string][] = [
  // Convert common contractions
  [/\bn'\s*/gi, 'ne '],
  [/\bd'\s*/gi, 'de '],
  [/\bl'\s*/gi, 'le '],
  [/\bj'\s*/gi, 'je '],
  [/\bt'\s*/gi, 'te '],
  [/\bm'\s*/gi, 'me '],
  [/\bs'\s*/gi, 'se '],
  [/\bc'\s*/gi, 'ce '],
  [/\bqu'\s*/gi, 'que '],
  // Normalize accents for matching
  [/[éèêë]/gi, 'e'], // é è ê ë → e
  [/[àâ]/gi, 'a'],       // à â → a
  [/[ïî]/gi, 'i'],       // ï î → i
  [/[ô]/gi, 'o'],            // ô → o
  [/[üû]/gi, 'u'],       // ü û → u
  [/[ç]/gi, 'c'],            // ç → c
];

/* ── Core normalization functions ── */

function normalizeArabic(text: string): string {
  let result = text;
  for (const [pattern, replacement] of arabicNormalizations) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function normalizeFrench(text: string): string {
  let result = text;
  for (const [pattern, replacement] of frenchNormalizations) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function removePunctuation(text: string): string {
  // Keep Arabic and French characters, letters, numbers, spaces
  // Remove: .,;:!?()[]{}"'-_+=*/<>@#$%^&~`|\ and other punctuation
  return text.replace(/[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u060C\u061B\u061F]/g, ' ');
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/* ── Public API ── */

/**
 * Normalize emergency text for signal extraction.
 * Language-aware normalization preserves semantic content
 * while standardizing orthographic variants.
 */
export function normalizeText(
  text: string,
  language: Language,
  options: Partial<NormalizerOptions> = {}
): string {
  const opts = { ...defaultOptions, ...options };
  let result = text;

  // Step 1: Language-specific normalization
  if (language === 'ar') {
    result = normalizeArabic(result);
  } else if (language === 'fr') {
    result = normalizeFrench(result);
  }

  // Step 2: Case folding (not for Arabic which has no case)
  if (opts.lowercase && language !== 'ar') {
    result = result.toLowerCase();
  }

  // Step 3: Remove punctuation
  if (opts.removePunctuation) {
    result = removePunctuation(result);
  }

  // Step 4: Collapse whitespace
  if (opts.collapseWhitespace) {
    result = collapseWhitespace(result);
  }

  return result;
}

/**
 * Quick normalization for keyword matching.
 * Applies all standard normalizations.
 */
export function normalizeForMatching(text: string, language: Language): string {
  return normalizeText(text, language, {
    lowercase: true,
    removePunctuation: true,
    normalizeDiacritics: true,
    collapseWhitespace: true,
  });
}

/**
 * Extract tokens from normalized text.
 * Returns array of meaningful words.
 */
export function tokenize(text: string, language: Language): string[] {
  const normalized = normalizeText(text, language);

  if (language === 'ar') {
    // Arabic: split on whitespace, filter common particles
    const particles = new Set(['و', 'في', 'من', 'إلى', 'عن', 'على', 'ب', 'ل', 'ك', 'ه', 'ذا', 'هذا']);
    return normalized
      .split(/\s+/)
      .filter((t) => t.length >= 2 && !particles.has(t));
  }

  if (language === 'fr') {
    // French: split on whitespace, filter common articles/conjunctions
    const stopWords = new Set(['le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'ou', 'mais', 'donc', 'car', 'ni', 'que', 'qui', 'quoi', 'dont', 'où']);
    return normalized
      .split(/\s+/)
      .filter((t) => t.length >= 2 && !stopWords.has(t));
  }

  // English
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'has', 'have', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about']);
  return normalized
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !stopWords.has(t));
}
