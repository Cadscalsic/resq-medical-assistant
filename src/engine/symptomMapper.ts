/**
 * SYMPTOM MAPPER
 * ───────────────────────────────────────
 * Maps extracted terms and raw symptoms into canonical symptom identifiers
 * that the rule engine understands.  Pure, deterministic, offline.
 */

import { SignalMap, Language } from '../types';

export type CanonicalSymptom =
  | 'unconscious'
  | 'not_breathing'
  | 'labored_breathing'
  | 'severe_bleeding'
  | 'minor_bleeding'
  | 'choking'
  | 'seizure'
  | 'chest_pain'
  | 'burn_thermal'
  | 'burn_chemical'
  | 'burn_electrical'
  | 'electric_shock'
  | 'drowning'
  | 'allergic_reaction'
  | 'poisoning'
  | 'stroke'
  | 'fracture'
  | 'fainting'
  | 'heat_exhaustion'
  | 'hypothermia'
  | 'nosebleed';

interface MappedSymptoms {
  canonical: CanonicalSymptom[];
  severityIndicators: string[];
}

const severityKeywords: Record<Language, string[]> = {
  en: ['severe', 'heavy', 'extreme', 'unconscious', 'not breathing', 'life threatening', 'critical', 'emergency', 'dying'],
  ar: ['شديد', 'حرج', 'فاقد الوعي', 'لا يتنفس', 'يهدد الحياة', 'طوارئ', 'يموت'],
  fr: ['sévère', 'grave', 'extrême', 'inconscient', 'ne respire pas', 'menace vie', 'critique', 'urgence', 'mourant'],
};

export function mapSymptoms(signals: SignalMap, rawSymptoms: string[], language: Language): MappedSymptoms {
  const canonical: CanonicalSymptom[] = [];
  const severityIndicators: string[] = [];

  // Map from structured signals
  if (signals.consciousness === 'unconscious') canonical.push('unconscious');
  if (signals.breathing === 'not_breathing') canonical.push('not_breathing');
  if (signals.breathing === 'labored') canonical.push('labored_breathing');
  if (signals.bleeding === 'severe') canonical.push('severe_bleeding');
  if (signals.bleeding === 'minor') canonical.push('minor_bleeding');
  if (signals.choking) canonical.push('choking');
  if (signals.seizure) canonical.push('seizure');
  if (signals.chestPain) canonical.push('chest_pain');
  if (signals.burn === 'thermal') canonical.push('burn_thermal');
  if (signals.burn === 'chemical') canonical.push('burn_chemical');
  if (signals.burn === 'electrical') canonical.push('burn_electrical');
  if (signals.electricShock) canonical.push('electric_shock');
  if (signals.drowning) canonical.push('drowning');
  if (signals.allergicReaction) canonical.push('allergic_reaction');
  if (signals.poisoning) canonical.push('poisoning');
  if (signals.strokeSymptoms) canonical.push('stroke');

  // Map from raw symptom strings (secondary pass)
  const allText = rawSymptoms.join(' ').toLowerCase();
  const keywords = canonicalSymptomKeywords[language];

  for (const [symptom, patterns] of Object.entries(keywords)) {
    if (patterns.some((p) => allText.includes(p))) {
      if (!canonical.includes(symptom as CanonicalSymptom)) {
        canonical.push(symptom as CanonicalSymptom);
      }
    }
  }

  // Extract severity indicators
  const sevWords = severityKeywords[language];
  for (const word of sevWords) {
    if (allText.includes(word)) severityIndicators.push(word);
  }

  return { canonical, severityIndicators };
}

const canonicalSymptomKeywords: Record<Language, Record<string, string[]>> = {
  en: {
    fracture: ['broken bone', 'fracture', 'bone break', 'twisted ankle', 'deformed limb'],
    fainting: ['fainted', 'passed out', 'syncope', 'blackout', 'lightheaded'],
    heat_exhaustion: ['heat stroke', 'heat exhaustion', 'overheated', 'dehydration', 'sun stroke'],
    hypothermia: ['hypothermia', 'frostbite', 'freezing', 'cold exposure', 'shivering'],
    nosebleed: ['nosebleed', 'nose bleed', 'bloody nose', 'epistaxis'],
  },
  ar: {
    fracture: ['كسر', 'عظم مكسور', 'كسر في'],
    fainting: ['إغماء', 'دوخة', 'دوار', 'فقد وعي مؤقت'],
    heat_exhaustion: ['ضربة شمس', 'إرهاق حراري', 'جفاف', 'سخونة'],
    hypothermia: ['انخفاض حرارة', 'تجمد', 'برد شديد', 'رجفة'],
    nosebleed: ['نزيف أنف', 'دم من الأنف'],
  },
  fr: {
    fracture: ['fracture', 'os cassé', 'brisure', 'cheville tordue'],
    fainting: ['évanouissement', 'syncope', 'perte connaissance', 'étourdi'],
    heat_exhaustion: ['coup de chaleur', 'épuisement chaleur', 'déshydratation', 'surchauffe'],
    hypothermia: ['hypothermie', 'gelure', 'exposition froid', 'frissons'],
    nosebleed: ['saignement nez', 'nez qui saigne', 'épistaxis'],
  },
};
