/**
 * RULE ENGINE — OVERRIDE + STRICT
 * ───────────────────────────────────────
 * Two-phase deterministic classifier:
 *   PHASE 1: OVERRIDE RULES — single strong signals trigger immediately.
 *   PHASE 2: COMPOUND RULES — multiple signals for precise classification.
 *
 * SAFETY PRINCIPLES:
 * 1. Single strong emergency signals (not breathing, unconscious, severe bleeding)
 *    ALWAYS trigger an override rule with score ≥ 90.
 * 2. Compound rules (cardiac arrest = unconscious + not breathing) score higher
 *    and win over overrides when both conditions are met.
 * 3. Normal vitals (conscious + breathing) BLOCK override rules via logic guard.
 * 4. Unknown signals NEVER treated as present — strict explicit-only matching.
 * 5. All outputs pulled from pre-validated dataset — never generated.
 */

import { SignalMap, RuleMatch, Language } from '../types';
import { mapSymptoms, CanonicalSymptom } from './symptomMapper';

export interface RuleSet {
  id: string;
  scenarioId: string;
  name: string;
  tier: 'override' | 'immediate' | 'critical' | 'urgent' | 'moderate' | 'minor' | 'safe';
  condition: (signals: SignalMap, symptoms: CanonicalSymptom[]) => boolean;
  score: number;
  minExplicitSignals: number;
  requiresAbnormalVitals?: boolean; // true = blocked when conscious=yes AND breathing=yes
}

/* ── Explicit signal counter ── */

function countExplicitSignals(signals: SignalMap): number {
  let count = 0;
  if (signals.consciousness !== 'unknown') count++;
  if (signals.breathing !== 'unknown') count++;
  if (signals.bleeding !== 'unknown' && signals.bleeding !== 'none') count++;
  if (signals.chestPain === true) count++;
  if (signals.choking === true) count++;
  if (signals.seizure === true) count++;
  if (signals.burn !== 'none' && signals.burn !== 'unknown') count++;
  if (signals.electricShock === true) count++;
  if (signals.drowning === true) count++;
  if (signals.allergicReaction === true) count++;
  if (signals.poisoning === true) count++;
  if (signals.strokeSymptoms === true) count++;
  return count;
}

/* ── Vitals guard ── */

function vitalsAreNormal(signals: SignalMap): boolean {
  return signals.consciousness === 'conscious' && signals.breathing === 'breathing';
}

/* ── OVERRIDE RULES (Phase 1) ──
 * These fire on SINGLE strong signals. They guarantee that any obvious
 * life-threatening sign is never missed. Compound rules below score
 * higher, so cardiac arrest (100) still wins over respiratory failure (96)
 * when both unconsciousness and not-breathing are present.
 */

const OVERRIDE_RULES: RuleSet[] = [
  {
    id: 'OVERRIDE-001',
    scenarioId: 'respiratory-failure',
    name: 'override_not_breathing',
    tier: 'override',
    condition: (s) => s.breathing === 'not_breathing',
    score: 96,
    minExplicitSignals: 1,
    requiresAbnormalVitals: true,
  },
  {
    id: 'OVERRIDE-002',
    scenarioId: 'unconscious-person',
    name: 'override_unconscious',
    tier: 'override',
    condition: (s) => s.consciousness === 'unconscious',
    score: 94,
    minExplicitSignals: 1,
    requiresAbnormalVitals: true,
  },
  {
    id: 'OVERRIDE-003',
    scenarioId: 'severe-bleeding',
    name: 'override_severe_bleeding',
    tier: 'override',
    condition: (s) => s.bleeding === 'severe',
    score: 95,
    minExplicitSignals: 1,
  },
  {
    id: 'OVERRIDE-004',
    scenarioId: 'choking',
    name: 'override_choking',
    tier: 'override',
    condition: (s) => s.choking === true,
    score: 92,
    minExplicitSignals: 1,
    requiresAbnormalVitals: true,
  },
];

/* ── COMPOUND RULES (Phase 2) ──
 * Higher precision. Higher scores than overrides when multiple signals align.
 */

const COMPOUND_RULES: RuleSet[] = [
  // ═══════════════════════════════════════
  // TIER 1: IMMEDIATE LIFE THREAT (compound)
  // ═══════════════════════════════════════

  {
    id: 'RULE-001',
    scenarioId: 'cardiac-arrest',
    name: 'cardiac_arrest_unconscious_not_breathing',
    tier: 'immediate',
    condition: (s) =>
      s.consciousness === 'unconscious' &&
      s.breathing === 'not_breathing',
    score: 100,
    minExplicitSignals: 2,
  },

  // ═══════════════════════════════════════
  // TIER 2: CRITICAL (compound or confirmed)
  // ═══════════════════════════════════════

  {
    id: 'RULE-008',
    scenarioId: 'allergic-reaction',
    name: 'anaphylaxis_explicit',
    tier: 'critical',
    condition: (s) => s.allergicReaction === true,
    score: 93,
    minExplicitSignals: 1,
  },

  {
    id: 'RULE-006',
    scenarioId: 'stroke',
    name: 'stroke_symptoms_explicit',
    tier: 'critical',
    condition: (s) => s.strokeSymptoms === true,
    score: 90,
    minExplicitSignals: 1,
  },

  {
    id: 'RULE-009',
    scenarioId: 'electric-shock',
    name: 'electric_shock_explicit',
    tier: 'critical',
    condition: (s) => s.electricShock === true,
    score: 91,
    minExplicitSignals: 1,
  },

  {
    id: 'RULE-007',
    scenarioId: 'heart-attack',
    name: 'heart_attack_chest_pain_conscious',
    tier: 'critical',
    condition: (s) =>
      s.chestPain === true &&
      s.consciousness === 'conscious' &&
      s.breathing !== 'not_breathing',
    score: 88,
    minExplicitSignals: 2,
  },

  // ═══════════════════════════════════════
  // TIER 3: URGENT
  // ═══════════════════════════════════════

  {
    id: 'RULE-012',
    scenarioId: 'drowning',
    name: 'drowning_explicit',
    tier: 'urgent',
    condition: (s) => s.drowning === true,
    score: 89,
    minExplicitSignals: 1,
  },

  {
    id: 'RULE-010',
    scenarioId: 'seizure',
    name: 'seizure_explicit',
    tier: 'urgent',
    condition: (s) => s.seizure === true,
    score: 85,
    minExplicitSignals: 1,
  },

  {
    id: 'RULE-011',
    scenarioId: 'poisoning',
    name: 'poisoning_explicit',
    tier: 'urgent',
    condition: (s) => s.poisoning === true,
    score: 84,
    minExplicitSignals: 1,
  },

  // ═══════════════════════════════════════
  // TIER 4: MODERATE
  // ═══════════════════════════════════════

  {
    id: 'RULE-016',
    scenarioId: 'burns',
    name: 'burn_electrical',
    tier: 'moderate',
    condition: (s) => s.burn === 'electrical',
    score: 75,
    minExplicitSignals: 1,
  },

  {
    id: 'RULE-015',
    scenarioId: 'burns',
    name: 'burn_chemical',
    tier: 'moderate',
    condition: (s) => s.burn === 'chemical',
    score: 70,
    minExplicitSignals: 1,
  },

  {
    id: 'RULE-014',
    scenarioId: 'burns',
    name: 'burn_thermal',
    tier: 'moderate',
    condition: (s) => s.burn === 'thermal',
    score: 60,
    minExplicitSignals: 1,
  },

  {
    id: 'RULE-017',
    scenarioId: 'fracture',
    name: 'fracture_symptom_confirmed',
    tier: 'moderate',
    condition: (s, sx) => sx.includes('fracture') && countExplicitSignals(s) >= 1,
    score: 55,
    minExplicitSignals: 1,
  },

  {
    id: 'RULE-019',
    scenarioId: 'heat-exhaustion',
    name: 'heat_exhaustion_symptom_confirmed',
    tier: 'moderate',
    condition: (s, sx) => sx.includes('heat_exhaustion') && countExplicitSignals(s) >= 1,
    score: 52,
    minExplicitSignals: 1,
  },

  {
    id: 'RULE-020',
    scenarioId: 'hypothermia',
    name: 'hypothermia_symptom_confirmed',
    tier: 'moderate',
    condition: (s, sx) => sx.includes('hypothermia') && countExplicitSignals(s) >= 1,
    score: 52,
    minExplicitSignals: 1,
  },

  {
    id: 'RULE-018',
    scenarioId: 'fainting',
    name: 'fainting_unconscious_breathing',
    tier: 'moderate',
    condition: (s) =>
      s.consciousness === 'unconscious' &&
      s.breathing === 'breathing',
    score: 50,
    minExplicitSignals: 2,
    requiresAbnormalVitals: true,
  },

  // ═══════════════════════════════════════
  // TIER 5: MINOR
  // ═══════════════════════════════════════

  {
    id: 'RULE-021',
    scenarioId: 'nosebleed',
    name: 'nosebleed_symptom_confirmed',
    tier: 'minor',
    condition: (s, sx) => sx.includes('nosebleed') && countExplicitSignals(s) >= 1,
    score: 30,
    minExplicitSignals: 1,
  },

  // ═══════════════════════════════════════
  // SAFE DEFAULT
  // ═══════════════════════════════════════

  {
    id: 'RULE-SAFE-001',
    scenarioId: 'normal-condition',
    name: 'normal_vitals_no_symptoms',
    tier: 'safe',
    condition: (s) =>
      s.consciousness === 'conscious' &&
      s.breathing === 'breathing' &&
      s.bleeding !== 'severe' &&
      !s.chestPain &&
      !s.choking &&
      !s.seizure &&
      !s.electricShock &&
      !s.drowning &&
      !s.allergicReaction &&
      !s.poisoning &&
      !s.strokeSymptoms &&
      (s.burn === 'none' || s.burn === 'unknown'),
    score: 5,
    minExplicitSignals: 2,
  },
];

/* ── All rules in evaluation order ── */

export const ALL_RULES: RuleSet[] = [...OVERRIDE_RULES, ...COMPOUND_RULES];

/* ── Public API ── */

export function evaluateRules(
  signals: SignalMap,
  rawSymptoms: string[],
  _language: Language
): RuleMatch[] {
  const { canonical } = mapSymptoms(signals, rawSymptoms, 'en');
  const matches: RuleMatch[] = [];
  const explicitCount = countExplicitSignals(signals);
  const normalVitals = vitalsAreNormal(signals);

  for (const rule of ALL_RULES) {
    // Guard 1: Minimum explicit signals
    if (explicitCount < rule.minExplicitSignals) continue;

    // Guard 2: Logic guard — block abnormal-vitals rules when vitals are normal
    if (normalVitals && rule.requiresAbnormalVitals) continue;

    // Guard 3: Strict condition evaluation
    if (rule.condition(signals, canonical)) {
      matches.push({
        scenarioId: rule.scenarioId,
        ruleName: rule.name,
        score: rule.score,
        triggers: extractTriggers(rule, signals, canonical),
      });
    }
  }

  // Sort by score descending — compound rules (e.g. cardiac arrest 100) beat overrides (e.g. respiratory failure 96)
  matches.sort((a, b) => b.score - a.score);

  return matches;
}

/* ── Trigger extraction ── */

function extractTriggers(
  _rule: RuleSet,
  signals: SignalMap,
  symptoms: CanonicalSymptom[]
): string[] {
  const triggers: string[] = [];

  if (signals.consciousness === 'unconscious') triggers.push('unconscious');
  if (signals.consciousness === 'conscious') triggers.push('conscious');
  if (signals.breathing === 'not_breathing') triggers.push('not_breathing');
  if (signals.breathing === 'breathing') triggers.push('breathing');
  if (signals.breathing === 'labored') triggers.push('labored_breathing');
  if (signals.bleeding === 'severe') triggers.push('severe_bleeding');
  if (signals.bleeding === 'minor') triggers.push('minor_bleeding');
  if (signals.choking) triggers.push('choking');
  if (signals.chestPain) triggers.push('chest_pain');
  if (signals.seizure) triggers.push('seizure');
  if (signals.allergicReaction) triggers.push('allergic_reaction');
  if (signals.electricShock) triggers.push('electric_shock');
  if (signals.drowning) triggers.push('drowning');
  if (signals.poisoning) triggers.push('poisoning');
  if (signals.strokeSymptoms) triggers.push('stroke');
  if (signals.burn && signals.burn !== 'none' && signals.burn !== 'unknown') {
    triggers.push(`burn_${signals.burn}`);
  }

  triggers.push(...symptoms.filter((s) => !triggers.includes(s)));

  return triggers.filter(Boolean) as string[];
}
