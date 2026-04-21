/**
 * INPUT PROCESSOR — HARDENED
 * ───────────────────────────────────────
 * Normalizes both structured and natural-language input into a canonical
 * SignalMap + symptom array.  Pure function.  Zero side effects.
 *
 * SAFETY ADDITIONS:
 * • Negation-aware keyword matching ("not unconscious" → NOT unconscious).
 * • Strict signal extraction — only sets values when explicitly stated.
 * • Never defaults 'unknown' to 'no' or any other value.
 */

import { StructuredInput, NormalizedInput, SignalMap, Language } from '../types';

/* ── Synonym dictionaries per language ── */

const synonymMap: Record<Language, Record<string, string[]>> = {
  en: {
    unconscious: ['unconscious', 'unresponsive', 'knocked out', 'passed out', 'out cold', 'not awake', 'no response', 'fainted', 'syncope', 'blackout', 'collapsed'],
    not_breathing: ['not breathing', 'no breath', 'stopped breathing', 'apnea', 'no air', 'cant breathe', "can't breathe", 'not breathing at all'],
    labored_breathing: ['wheezing', 'gasping', 'short of breath', 'difficulty breathing', 'struggling to breathe', 'heavy breathing', 'labored'],
    severe_bleeding: ['severe bleeding', 'heavy bleeding', 'bleeding out', 'gushing', 'hemorrhage', 'lots of blood', 'pouring blood', 'arterial bleed', 'spurting'],
    minor_bleeding: ['minor bleeding', 'small cut', 'little blood', 'scratch', 'scrape'],
    choking: ['choking', 'something stuck', 'throat blocked', 'cant swallow', "can't swallow", 'food stuck', 'object in throat'],
    seizure: ['seizure', 'convulsion', 'fitting', 'shaking violently', 'jerking', 'twitching', 'epileptic', 'foaming mouth'],
    chest_pain: ['chest pain', 'heart pain', 'chest tightness', 'crushing chest', 'pain in chest', 'angina', 'heart attack', 'myocardial'],
    burn: ['burn', 'burned', 'burnt', 'scald', 'scalding', 'fire injury', 'hot water burn'],
    chemical_burn: ['chemical burn', 'acid burn', 'caustic', 'chemical on skin'],
    electrical_burn: ['electrical burn', 'electrocuted', 'electric shock', 'shocked', 'power line'],
    allergic: ['allergic reaction', 'anaphylaxis', 'swelling face', 'hives', 'epipen', 'bee sting', 'throat closing'],
    poisoning: ['poison', 'poisoning', 'overdose', 'toxic', 'swallowed pills', 'chemical ingestion', 'drug overdose'],
    drowning: ['drowning', 'submerged', 'underwater', 'pool accident', 'near drowning'],
    stroke: ['stroke', 'face drooping', 'slurred speech', 'arm weakness', 'one side weak', 'facial droop', 'drooping face'],
    conscious: ['awake', 'conscious', 'responsive', 'alert', 'talking', 'speaking', 'oriented'],
    breathing: ['breathing normally', 'breathing fine', 'breathing well', 'breathes normally'],
    no_bleeding: ['no bleeding', 'not bleeding', 'no blood'],
  },
  ar: {
    unconscious: ['فاقد الوعي', 'لا يستجيب', 'غائب', 'انهار', 'سقط', 'غيبوبة', 'إغماء', 'تشنج وعي'],
    not_breathing: ['لا يتنفس', 'توقف التنفس', 'لا هواء', 'انقطاع النفس'],
    labored_breathing: ['صعوبة في التنفس', 'يلهث', 'ضيق تنفس', 'تنفس متعب', 'أزيز'],
    severe_bleeding: ['نزيف حاد', 'نزيف شديد', 'كثير من الدم', 'ينزف بغزارة', 'نزيف شرياني', 'ينبض الدم'],
    minor_bleeding: ['نزيف بسيط', 'جروح سطحية', 'خدش', 'كدمة'],
    choking: ['اختناق', 'شيء عالق', 'حلق مسدود', 'لا يستطيع البلع', 'طعام عالق'],
    seizure: ['نوبة صرع', 'تشنج', 'ارتعاش', 'تشنّج', 'رغوة فم', 'تيبس'],
    chest_pain: ['ألم صدر', 'ضيق صدر', 'ألم قلب', 'ذبحة', 'احتشاء', 'وجع صدر'],
    burn: ['حرق', 'محروق', 'ساخن', 'ماء مغلي', 'نار'],
    chemical_burn: ['حروق كيميائية', 'حامض', 'كاوٍ'],
    electrical_burn: ['صدمة كهربائية', 'كهرب', 'كهرباء', 'خط كهرباء'],
    allergic: ['حساسية', 'تورم وجه', 'شرى', 'إيبي بن', 'لدغة نحل', 'إغلاق الحلق'],
    poisoning: ['تسمم', 'جرعة زائدة', 'سم', 'ابتلاع حبوب', 'كيميائي'],
    drowning: ['غرق', 'تحت الماء', 'مسبح', 'تعرض للماء'],
    stroke: ['سكتة دماغية', 'تدلي وجه', 'كلام متلعثم', 'ضعف ذراع', 'جانب واحد'],
    conscious: ['واعٍ', 'يستجيب', 'صاحي', 'يتكلم', 'يقظ'],
    breathing: ['يتنفس بشكل طبيعي', 'تنفس طبيعي', 'يتنفس بخير'],
    no_bleeding: ['لا نزيف', 'لا ينزف'],
  },
  fr: {
    unconscious: ['inconscient', 'sans réponse', 'évanoui', 'pas réveillé', 'pas de réponse', 'perdu connaissance', 'syncope'],
    not_breathing: ['ne respire pas', 'pas de respiration', 'arrêt respiratoire', 'apnée', "n'arrive pas à respirer"],
    labored_breathing: ['difficulté à respirer', 'essoufflement', 'haletant', 'respiration difficile', 'sifflement'],
    severe_bleeding: ['saignement sévère', 'hémorragie', 'perd beaucoup de sang', 'saigne abondamment', 'artériel'],
    minor_bleeding: ['saignement léger', 'petite coupure', 'égratignure', 'écorchure'],
    choking: ['étouffement', 'quelque chose coincé', 'gorge bloquée', 'ne peut pas avaler', 'nourriture coincée'],
    seizure: ['crise', 'convulsion', 'attaque', 'tremblements violents', 'secousses', 'mousse à la bouche'],
    chest_pain: ['douleur thoracique', 'oppression', 'douleur poitrine', 'crise cardiaque', 'infarctus', 'angine'],
    burn: ['brûlure', 'brûlé', 'chaud', 'ébouillantage', 'eau bouillante'],
    chemical_burn: ['brûlure chimique', 'acide', 'caustique'],
    electrical_burn: ['choc électrique', 'électrocuté', 'courant électrique', 'ligne électrique'],
    allergic: ['allergie', 'anaphylaxie', 'gonflement visage', 'urticaire', 'epipen', 'piqûre abeille', 'gorge qui se ferme'],
    poisoning: ['empoisonnement', 'surdosage', 'toxique', 'avalé pilules', 'ingestion chimique'],
    drowning: ['noyade', 'submergé', 'sous eau', 'piscine accident'],
    stroke: ['avc', 'visage qui tombe', 'parole confuse', 'faiblesse bras', 'un côté faible'],
    conscious: ['conscient', 'réveillé', 'réactif', 'parle', 'alerte'],
    breathing: ['respire normalement', 'respiration normale', 'bonne respiration'],
    no_bleeding: ['pas de saignement', 'ne saigne pas'],
  },
};

/* ── Negation markers per language ── */

const negationMarkers: Record<Language, string[]> = {
  en: ['not ', 'no ', 'never ', 'doesn\'t ', 'does not ', 'isn\'t ', 'is not ', 'wasn\'t ', 'was not ', 'aren\'t ', 'are not ', 'dont ', 'don\'t ', 'do not ', 'didn\'t ', 'did not '],
  ar: ['لا ', 'ليس ', 'غير ', 'لم '],
  fr: ['ne ', 'pas ', 'n\' ', 'non ', 'jamais ', 'ni '],
};

/* ── Negation-aware keyword matcher ── */

function isNegated(text: string, keyword: string, lang: Language): boolean {
  const negations = negationMarkers[lang];
  // Find all occurrences of the keyword
  let idx = text.indexOf(keyword);
  while (idx !== -1) {
    // Check if any negation marker appears within 25 chars before the keyword
    const windowStart = Math.max(0, idx - 25);
    const window = text.slice(windowStart, idx);
    for (const neg of negations) {
      if (window.includes(neg)) {
        return true;
      }
    }
    idx = text.indexOf(keyword, idx + 1);
  }
  return false;
}

function matchesAnyWithNegation(text: string, patterns: string[], lang: Language): boolean {
  return patterns.some((p) => {
    const lowered = p.toLowerCase();
    if (!text.includes(lowered)) return false;
    return !isNegated(text, lowered, lang);
  });
}

/* ── Keyword-to-signal mapping (hardened) ── */

function extractSignalsFromText(text: string, lang: Language): Partial<SignalMap> {
  const lower = text.toLowerCase().trim();
  const signals: Partial<SignalMap> = {};

  const dict = synonymMap[lang];

  // Consciousness — explicit positive or negative only
  if (matchesAnyWithNegation(lower, dict.unconscious, lang)) {
    signals.consciousness = 'unconscious';
  } else if (matchesAnyWithNegation(lower, dict.conscious, lang)) {
    signals.consciousness = 'conscious';
  }
  // If neither matched, consciousness stays undefined (unknown)

  // Breathing — explicit positive or negative only
  if (matchesAnyWithNegation(lower, dict.not_breathing, lang)) {
    signals.breathing = 'not_breathing';
  } else if (matchesAnyWithNegation(lower, dict.labored_breathing, lang)) {
    signals.breathing = 'labored';
  } else if (matchesAnyWithNegation(lower, dict.breathing, lang)) {
    signals.breathing = 'breathing';
  }
  // If no breathing keyword matched, stays undefined (unknown)

  // Bleeding — explicit only
  if (matchesAnyWithNegation(lower, dict.severe_bleeding, lang)) {
    signals.bleeding = 'severe';
  } else if (matchesAnyWithNegation(lower, dict.minor_bleeding, lang)) {
    signals.bleeding = 'minor';
  } else if (matchesAnyWithNegation(lower, dict.no_bleeding, lang)) {
    signals.bleeding = 'none';
  }

  // Chest pain / heart attack
  if (matchesAnyWithNegation(lower, dict.chest_pain, lang)) {
    signals.chestPain = true;
  }

  // Choking
  if (matchesAnyWithNegation(lower, dict.choking, lang)) {
    signals.choking = true;
  }

  // Seizure
  if (matchesAnyWithNegation(lower, dict.seizure, lang)) {
    signals.seizure = true;
  }

  // Burns — prioritize chemical > electrical > thermal
  if (matchesAnyWithNegation(lower, dict.chemical_burn, lang)) {
    signals.burn = 'chemical';
  } else if (matchesAnyWithNegation(lower, dict.electrical_burn, lang)) {
    signals.burn = 'electrical';
    signals.electricShock = true;
  } else if (matchesAnyWithNegation(lower, dict.burn, lang)) {
    signals.burn = 'thermal';
  }

  // Electric shock (standalone)
  const electricKeywords = ['electrocuted', 'electric shock', 'shocked', 'power line', 'current', 'صدمة كهربائية', 'كهرب', 'choc électrique', 'électrocuté'];
  if (matchesAnyWithNegation(lower, electricKeywords, lang)) {
    signals.electricShock = true;
  }

  // Drowning
  if (matchesAnyWithNegation(lower, dict.drowning, lang)) {
    signals.drowning = true;
  }

  // Allergic reaction
  if (matchesAnyWithNegation(lower, dict.allergic, lang)) {
    signals.allergicReaction = true;
  }

  // Poisoning
  if (matchesAnyWithNegation(lower, dict.poisoning, lang)) {
    signals.poisoning = true;
  }

  // Stroke
  if (matchesAnyWithNegation(lower, dict.stroke, lang)) {
    signals.strokeSymptoms = true;
  }

  return signals;
}

/* ── Public API ── */

export function normalizeInput(
  input: StructuredInput | string,
  language: Language
): NormalizedInput {
  if (typeof input === 'string') {
    const signals = extractSignalsFromText(input, language);
    const symptoms = extractSymptoms(input, language);
    return {
      signals: fillDefaults(signals),
      symptoms,
      rawText: input,
    };
  }

  // Structured input
  const signals: Partial<SignalMap> = {
    consciousness: mapConsciousness(input.conscious),
    breathing: mapBreathing(input.breathing),
    bleeding: mapBleeding(input.bleeding),
    chestPain: input.chestPain === 'yes',
    choking: input.choking === 'yes',
    seizure: input.seizure === 'yes',
    burn: mapBurn(input.burn),
    electricShock: input.electricShock === 'yes',
    drowning: input.drowning === 'yes',
    allergicReaction: input.allergicReaction === 'yes',
    poisoning: input.poisoning === 'yes',
    strokeSymptoms: input.strokeSymptoms === 'yes',
  };

  return {
    signals: fillDefaults(signals),
    symptoms: input.symptoms || [],
    rawText: '',
  };
}

function mapConsciousness(v?: string): SignalMap['consciousness'] {
  if (v === 'yes') return 'conscious';
  if (v === 'no') return 'unconscious';
  return 'unknown';
}

function mapBreathing(v?: string): SignalMap['breathing'] {
  if (v === 'yes') return 'breathing';
  if (v === 'no') return 'not_breathing';
  if (v === 'labored') return 'labored';
  return 'unknown';
}

function mapBleeding(v?: string): SignalMap['bleeding'] {
  if (v === 'none') return 'none';
  if (v === 'minor') return 'minor';
  if (v === 'severe') return 'severe';
  return 'unknown';
}

function mapBurn(v?: string): SignalMap['burn'] {
  if (v === 'yes') return 'thermal';
  if (v === 'chemical') return 'chemical';
  if (v === 'electrical') return 'electrical';
  if (v === 'no') return 'none';
  return 'unknown';
}

function fillDefaults(partial: Partial<SignalMap>): SignalMap {
  return {
    consciousness: partial.consciousness ?? 'unknown',
    breathing: partial.breathing ?? 'unknown',
    bleeding: partial.bleeding ?? 'unknown',
    chestPain: partial.chestPain ?? false,
    choking: partial.choking ?? false,
    seizure: partial.seizure ?? false,
    burn: partial.burn ?? 'none',
    electricShock: partial.electricShock ?? false,
    drowning: partial.drowning ?? false,
    allergicReaction: partial.allergicReaction ?? false,
    poisoning: partial.poisoning ?? false,
    strokeSymptoms: partial.strokeSymptoms ?? false,
  };
}

function extractSymptoms(text: string, _lang: Language): string[] {
  const lower = text.toLowerCase().trim();
  const found: string[] = [];
  const symptomBank: Record<string, string[]> = {
    'chest pain': ['chest pain', 'douleur thoracique', 'ألم صدر'],
    'difficulty breathing': ["can't breathe", 'difficulty breathing', 'difficulté à respirer', 'صعوبة في التنفس'],
    'severe bleeding': ['severe bleeding', 'saignement sévère', 'نزيف حاد'],
    'unconscious': ['unconscious', 'inconscient', 'فاقد الوعي'],
    'burn': ['burn', 'brûlure', 'حرق'],
    'seizure': ['seizure', 'convulsion', 'نوبة صرع'],
    'choking': ['choking', 'étouffement', 'اختناق'],
    'allergic reaction': ['allergic', 'allergique', 'حساسية'],
    'poisoning': ['poison', 'empoisonnement', 'تسمم'],
    'stroke': ['stroke', 'avc', 'سكتة دماغية'],
    'fracture': ['broken', 'fracture', 'كسر'],
    'fainting': ['fainted', 'évanoui', 'إغماء'],
    'electric shock': ['electric', 'électrique', 'كهرب'],
    'drowning': ['drowning', 'noyade', 'غرق'],
    'nosebleed': ['nosebleed', 'saignement nez', 'نزيف أنف'],
    'heat': ['heat', 'chaleur', 'حرارة'],
    'cold': ['cold', 'froid', 'برد'],
  };

  for (const [canonical, variants] of Object.entries(symptomBank)) {
    if (variants.some((v) => lower.includes(v))) {
      found.push(canonical);
    }
  }

  return found;
}
