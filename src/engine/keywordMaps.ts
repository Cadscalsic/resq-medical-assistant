/**
 * KEYWORD MAPS
 * ───────────────────────────────────────
 * Comprehensive multilingual keyword dictionaries for emergency signal extraction.
 * Each entry maps canonical emergency concepts to real-world synonyms across
 * English, Arabic, and French.
 *
 * SAFETY: Every keyword is pre-validated. No runtime additions.
 */

import { LanguageKeywordMap } from '../types';

/* ── ENGLISH KEYWORD MAP ── */

export const enKeywordMap: LanguageKeywordMap = {
  entities: [
    /* Consciousness */
    { canonical: 'unconscious', synonyms: ['unconscious', 'unresponsive', 'knocked out', 'passed out', 'out cold', 'not awake', 'no response', 'fainted', 'syncope', 'blackout', 'collapsed', 'no consciousness', 'lost consciousness'], entityType: 'consciousness', entityValue: 'unconscious', confidence: 'strong' },
    { canonical: 'conscious', synonyms: ['conscious', 'awake', 'responsive', 'alert', 'talking', 'speaking', 'aware', 'oriented'], entityType: 'consciousness', entityValue: 'conscious', confidence: 'strong' },

    /* Breathing */
    { canonical: 'not_breathing', synonyms: ['not breathing', 'no breath', 'stopped breathing', 'apnea', 'no air', 'cant breathe', "can't breathe", 'cannot breathe', 'not breathing at all', 'no respiration', 'respiratory arrest'], entityType: 'breathing', entityValue: 'not_breathing', confidence: 'strong' },
    { canonical: 'labored_breathing', synonyms: ['wheezing', 'gasping', 'short of breath', 'difficulty breathing', 'struggling to breathe', 'heavy breathing', 'labored', 'breathing hard', 'breathless', 'dyspnea', 'wheeze', 'gasp'], entityType: 'breathing', entityValue: 'labored', confidence: 'moderate' },
    { canonical: 'breathing', synonyms: ['breathing', 'breathes', 'respiration', 'normal breathing', 'steady breathing'], entityType: 'breathing', entityValue: 'breathing', confidence: 'strong' },

    /* Bleeding */
    { canonical: 'severe_bleeding', synonyms: ['severe bleeding', 'heavy bleeding', 'bleeding out', 'gushing', 'hemorrhage', 'lots of blood', 'pouring blood', 'arterial bleed', 'spurting', 'blood everywhere', 'massive bleeding', 'uncontrolled bleeding', 'profuse bleeding'], entityType: 'bleeding', entityValue: 'severe', confidence: 'strong' },
    { canonical: 'minor_bleeding', synonyms: ['minor bleeding', 'small cut', 'little blood', 'scratch', 'scrape', 'small wound', 'minor wound', 'slight bleeding'], entityType: 'bleeding', entityValue: 'minor', confidence: 'moderate' },

    /* Chest Pain */
    { canonical: 'chest_pain', synonyms: ['chest pain', 'heart pain', 'chest tightness', 'crushing chest', 'pain in chest', 'angina', 'heart attack', 'myocardial', 'chest pressure', 'chest discomfort', 'tight chest', 'pain over heart'], entityType: 'chestPain', entityValue: true, confidence: 'strong' },

    /* Choking */
    { canonical: 'choking', synonyms: ['choking', 'something stuck', 'throat blocked', 'cant swallow', "can't swallow", 'food stuck', 'object in throat', 'cannot swallow', 'throat obstruction', 'blocked airway'], entityType: 'choking', entityValue: true, confidence: 'strong' },

    /* Seizure */
    { canonical: 'seizure', synonyms: ['seizure', 'convulsion', 'fitting', 'shaking violently', 'jerking', 'twitching', 'epileptic', 'foaming mouth', 'epilepsy', 'convulsing', 'tonic clonic', 'grand mal'], entityType: 'seizure', entityValue: true, confidence: 'strong' },

    /* Burns */
    { canonical: 'thermal_burn', synonyms: ['burn', 'burned', 'burnt', 'scald', 'scalding', 'fire injury', 'hot water burn', 'flame', 'boiling water'], entityType: 'burn', entityValue: 'thermal', confidence: 'moderate' },
    { canonical: 'chemical_burn', synonyms: ['chemical burn', 'acid burn', 'caustic', 'chemical on skin', 'acid on skin', 'lye burn'], entityType: 'burn', entityValue: 'chemical', confidence: 'strong' },
    { canonical: 'electrical_burn', synonyms: ['electrical burn', 'electrocuted', 'electric shock', 'shocked', 'power line', 'electrical injury', 'current shock'], entityType: 'burn', entityValue: 'electrical', confidence: 'strong' },

    /* Electric Shock (standalone) */
    { canonical: 'electric_shock', synonyms: ['electrocuted', 'electric shock', 'shocked', 'power line', 'electrical current', 'high voltage', 'live wire', 'touched wire'], entityType: 'electricShock', entityValue: true, confidence: 'strong' },

    /* Drowning */
    { canonical: 'drowning', synonyms: ['drowning', 'submerged', 'underwater', 'pool accident', 'near drowning', 'pulled from water', 'inhaled water', 'water in lungs'], entityType: 'drowning', entityValue: true, confidence: 'strong' },

    /* Allergic Reaction */
    { canonical: 'allergic_reaction', synonyms: ['allergic reaction', 'anaphylaxis', 'swelling face', 'hives', 'epipen', 'bee sting', 'throat closing', 'allergy', 'swollen throat', 'rash all over', 'difficulty swallowing allergy'], entityType: 'allergicReaction', entityValue: true, confidence: 'strong' },

    /* Poisoning */
    { canonical: 'poisoning', synonyms: ['poison', 'poisoning', 'overdose', 'toxic', 'swallowed pills', 'chemical ingestion', 'drug overdose', 'ate something bad', 'contaminated food', 'toxin', 'venom'], entityType: 'poisoning', entityValue: true, confidence: 'strong' },

    /* Stroke */
    { canonical: 'stroke', synonyms: ['stroke', 'face drooping', 'slurred speech', 'arm weakness', 'one side weak', 'facial droop', 'drooping face', 'sudden confusion', 'trouble speaking', 'numbness one side', 'crooked smile'], entityType: 'strokeSymptoms', entityValue: true, confidence: 'strong' },

    /* Fracture */
    { canonical: 'fracture', synonyms: ['broken', 'fracture', 'broken bone', 'snapped', 'bone sticking out', 'compound fracture', 'dislocated', 'cracked bone', 'shattered bone'], entityType: 'fracture', entityValue: true, confidence: 'strong' },

    /* Fainting */
    { canonical: 'fainting', synonyms: ['fainted', 'passed out briefly', 'lightheaded', 'dizzy spell', 'syncope', 'woozy', 'about to faint', 'feeling faint'], entityType: 'fainting', entityValue: true, confidence: 'moderate' },

    /* Heat */
    { canonical: 'heat', synonyms: ['heat', 'heatstroke', 'heat exhaustion', 'overheated', 'hot weather', 'sun stroke', 'dehydration heat', 'too hot'], entityType: 'heat', entityValue: true, confidence: 'moderate' },

    /* Cold */
    { canonical: 'cold', synonyms: ['cold', 'hypothermia', 'frostbite', 'freezing', 'shivering badly', 'too cold', 'low body temperature', 'exposure cold'], entityType: 'cold', entityValue: true, confidence: 'moderate' },

    /* Nosebleed */
    { canonical: 'nosebleed', synonyms: ['nosebleed', 'nose bleeding', 'blood from nose', 'bloody nose', 'epistaxis'], entityType: 'nosebleed', entityValue: true, confidence: 'strong' },
  ],

  negationMarkers: ['not', 'no', 'none', 'never', 'without', 'isnt', "isn't", 'wasnt', "wasn't", 'doesnt', "doesn't", 'dont', "don't", 'cant', "can't", 'cannot', 'unable to', 'stopped'],

  uncertaintyMarkers: ['maybe', 'perhaps', 'might', 'could be', 'possibly', 'i think', 'seems like', 'looks like', 'appears to'],

  severityIntensifiers: ['severe', 'extreme', 'very', 'serious', 'critical', 'massive', 'heavy', 'intense', 'bad', 'terrible', 'worst'],
};

/* ── ARABIC KEYWORD MAP ── */

export const arKeywordMap: LanguageKeywordMap = {
  entities: [
    /* Consciousness */
    { canonical: 'unconscious', synonyms: ['فاقد الوعي', 'لا يستجيب', 'غائب', 'انهار', 'سقط', 'غيبوبة', 'إغماء', 'تشنج وعي', 'لا وعي', 'فقد الوعي', 'غياب وعي', 'ساقط'], entityType: 'consciousness', entityValue: 'unconscious', confidence: 'strong' },
    { canonical: 'conscious', synonyms: ['واعي', 'يستجيب', 'صاحي', 'يتكلم', 'مستيقظ', 'يفهم'], entityType: 'consciousness', entityValue: 'conscious', confidence: 'strong' },

    /* Breathing */
    { canonical: 'not_breathing', synonyms: ['لا يتنفس', 'توقف التنفس', 'لا هواء', 'اختناق', 'انقطاع النفس', 'غاز', 'لا يستطيع التنفس', 'تنفس متوقف', 'لا يوجد تنفس'], entityType: 'breathing', entityValue: 'not_breathing', confidence: 'strong' },
    { canonical: 'labored_breathing', synonyms: ['صعوبة في التنفس', 'يلهث', 'ضيق تنفس', 'تنفس متعب', 'أزيز', 'يتنفس بصعوبة', 'تنفس سريع', 'جامح'], entityType: 'breathing', entityValue: 'labored', confidence: 'moderate' },
    { canonical: 'breathing', synonyms: ['يتنفس', 'تنفس طبيعي', 'تنفس منتظم', 'هواء'], entityType: 'breathing', entityValue: 'breathing', confidence: 'strong' },

    /* Bleeding */
    { canonical: 'severe_bleeding', synonyms: ['نزيف حاد', 'نزيف شديد', 'كثير من الدم', 'ينزف بغزارة', 'نزيف شرياني', 'ينبض الدم', 'نزيف غير متحكم', 'دم كثير', 'نزيف هائل'], entityType: 'bleeding', entityValue: 'severe', confidence: 'strong' },
    { canonical: 'minor_bleeding', synonyms: ['نزيف بسيط', 'جروح سطحية', 'خدش', 'كدمة', 'جرح صغير'], entityType: 'bleeding', entityValue: 'minor', confidence: 'moderate' },

    /* Chest Pain */
    { canonical: 'chest_pain', synonyms: ['ألم صدر', 'ضيق صدر', 'ألم قلب', 'ذبحة', 'احتشاء', 'وجع صدر', 'ضغطة صدر', 'ألم في الصدر'], entityType: 'chestPain', entityValue: true, confidence: 'strong' },

    /* Choking */
    { canonical: 'choking', synonyms: ['اختناق', 'شيء عالق', 'حلق مسدود', 'لا يستطيع البلع', 'طعام عالق', 'جسم في الحلق', 'انسداد مجرى الهواء'], entityType: 'choking', entityValue: true, confidence: 'strong' },

    /* Seizure */
    { canonical: 'seizure', synonyms: ['نوبة صرع', 'تشنج', 'ارتعاش', 'تشنّج', 'رغوة فم', 'تيبس', 'صرع', 'نوبة', 'تقلصات'], entityType: 'seizure', entityValue: true, confidence: 'strong' },

    /* Burns */
    { canonical: 'thermal_burn', synonyms: ['حرق', 'محروق', 'ساخن', 'ماء مغلي', 'نار', 'مغلي', 'احتراق'], entityType: 'burn', entityValue: 'thermal', confidence: 'moderate' },
    { canonical: 'chemical_burn', synonyms: ['حروق كيميائية', 'حامض', 'كاوٍ', 'مادة كيميائية على الجلد'], entityType: 'burn', entityValue: 'chemical', confidence: 'strong' },
    { canonical: 'electrical_burn', synonyms: ['صدمة كهربائية', 'كهرب', 'كهرباء', 'خط كهرباء', 'حروق كهربائية'], entityType: 'burn', entityValue: 'electrical', confidence: 'strong' },

    /* Electric Shock */
    { canonical: 'electric_shock', synonyms: ['صدمة كهربائية', 'كهرب', 'كهرباء', 'س خط كهرباء', 'تيار كهربائي', 'لمس سلك'], entityType: 'electricShock', entityValue: true, confidence: 'strong' },

    /* Drowning */
    { canonical: 'drowning', synonyms: ['غرق', 'تحت الماء', 'مسبح', 'تعرض للماء', 'ابتلع ماء', 'ماء في الرئتين'], entityType: 'drowning', entityValue: true, confidence: 'strong' },

    /* Allergic Reaction */
    { canonical: 'allergic_reaction', synonyms: ['حساسية', 'تورم وجه', 'شرى', 'إيبي بن', 'لدغة نحل', 'إغلاق الحلق', 'تورم حلق', 'طفح جلدي'], entityType: 'allergicReaction', entityValue: true, confidence: 'strong' },

    /* Poisoning */
    { canonical: 'poisoning', synonyms: ['تسمم', 'جرعة زائدة', 'سم', 'ابتلاع حبوب', 'كيميائي', 'أكل شيء فاسد', 'غذاء ملوث'], entityType: 'poisoning', entityValue: true, confidence: 'strong' },

    /* Stroke */
    { canonical: 'stroke', synonyms: ['سكتة دماغية', 'تدلي وجه', 'كلام متلعثم', 'ضعف ذراع', 'جانب واحد', 'ارتباك مفاجئ', 'صعوبة كلام', 'خدر جانبي'], entityType: 'strokeSymptoms', entityValue: true, confidence: 'strong' },

    /* Fracture */
    { canonical: 'fracture', synonyms: ['كسر', 'عظم مكسور', 'انخلاع', 'عظم بارز', 'كسر مركب', 'شظية عظم'], entityType: 'fracture', entityValue: true, confidence: 'strong' },

    /* Fainting */
    { canonical: 'fainting', synonyms: ['إغماء', 'دوار', 'دوخة', 'شعور بالإغماء', 'دوار مفاجئ'], entityType: 'fainting', entityValue: true, confidence: 'moderate' },

    /* Heat */
    { canonical: 'heat', synonyms: ['حرارة', 'ضربة شمس', 'إجهاد حراري', 'سخونة', 'حر شديد', 'جفاف', 'ارتفاع حرارة'], entityType: 'heat', entityValue: true, confidence: 'moderate' },

    /* Cold */
    { canonical: 'cold', synonyms: ['برد', 'انخفاض حرارة', 'تجمد', 'قشعريرة', 'برودة شديدة', 'تعرض للبرد'], entityType: 'cold', entityValue: true, confidence: 'moderate' },

    /* Nosebleed */
    { canonical: 'nosebleed', synonyms: ['نزيف أنف', 'دم من الأنف', 'أنف ينزف', 'نزف أنفي'], entityType: 'nosebleed', entityValue: true, confidence: 'strong' },
  ],

  negationMarkers: ['لا', 'ليس', 'لأ', 'غير', 'ما', 'بدون', 'مفيش', 'مش', 'لم', 'لن', 'ما', 'مو', 'موجودش'],

  uncertaintyMarkers: ['ربما', 'يمكن', 'احتمال', 'اظن', 'يبدو', 'يبدو أن', 'شكله'],

  severityIntensifiers: ['شديد', 'جدا', 'خطير', 'حاد', 'كثير', 'هائل', 'سيء', 'مزمن', 'قوي'],
};

/* ── FRENCH KEYWORD MAP ── */

export const frKeywordMap: LanguageKeywordMap = {
  entities: [
    /* Consciousness */
    { canonical: 'unconscious', synonyms: ['inconscient', 'sans réponse', 'évanoui', 'pas réveillé', 'pas de réponse', 'perdu connaissance', 'syncope', 'tomber dans les pommes', 'sans connaissance', 'crise de malaise'], entityType: 'consciousness', entityValue: 'unconscious', confidence: 'strong' },
    { canonical: 'conscious', synonyms: ['conscient', 'réveillé', 'répond', 'alerte', 'parle', 'comprend', 'orienté'], entityType: 'consciousness', entityValue: 'conscious', confidence: 'strong' },

    /* Breathing */
    { canonical: 'not_breathing', synonyms: ['ne respire pas', 'pas de respiration', 'arrêt respiratoire', 'apnée', "n'arrive pas à respirer", 'ne peut pas respirer', 'respiration arrêtée', 'plus de respiration'], entityType: 'breathing', entityValue: 'not_breathing', confidence: 'strong' },
    { canonical: 'labored_breathing', synonyms: ['difficulté à respirer', 'essoufflement', 'haletant', 'respiration difficile', 'sifflement', 'respire mal', 'respiration rapide', 'essoufflé'], entityType: 'breathing', entityValue: 'labored', confidence: 'moderate' },
    { canonical: 'breathing', synonyms: ['respire', 'respiration normale', 'respiration régulière', 'souffle'], entityType: 'breathing', entityValue: 'breathing', confidence: 'strong' },

    /* Bleeding */
    { canonical: 'severe_bleeding', synonyms: ['saignement sévère', 'hémorragie', 'perd beaucoup de sang', 'saigne abondamment', 'artériel', 'saignement grave', 'saignement massif', 'sang partout', 'hémorragie externe'], entityType: 'bleeding', entityValue: 'severe', confidence: 'strong' },
    { canonical: 'minor_bleeding', synonyms: ['saignement léger', 'petite coupure', 'égratignure', 'écorchure', 'petite plaie', 'éraflure'], entityType: 'bleeding', entityValue: 'minor', confidence: 'moderate' },

    /* Chest Pain */
    { canonical: 'chest_pain', synonyms: ['douleur thoracique', 'oppression', 'douleur poitrine', 'crise cardiaque', 'infarctus', 'angine', 'pression poitrine', 'douleur dans la poitrine', 'serrement'], entityType: 'chestPain', entityValue: true, confidence: 'strong' },

    /* Choking */
    { canonical: 'choking', synonyms: ['étouffement', 'quelque chose coincé', 'gorge bloquée', 'ne peut pas avaler', 'nourriture coincée', 'corps dans la gorge', 'obstruction des voies respiratoires'], entityType: 'choking', entityValue: true, confidence: 'strong' },

    /* Seizure */
    { canonical: 'seizure', synonyms: ['crise', 'convulsion', 'attaque', 'tremblements violents', 'secousses', 'mousse à la bouche', 'épilepsie', 'convulsionne', 'crise épileptique'], entityType: 'seizure', entityValue: true, confidence: 'strong' },

    /* Burns */
    { canonical: 'thermal_burn', synonyms: ['brûlure', 'brûlé', 'chaud', 'ébouillantage', 'eau bouillante', 'feu', 'flamme', 'chaleur'], entityType: 'burn', entityValue: 'thermal', confidence: 'moderate' },
    { canonical: 'chemical_burn', synonyms: ['brûlure chimique', 'acide', 'caustique', 'produit chimique sur peau'], entityType: 'burn', entityValue: 'chemical', confidence: 'strong' },
    { canonical: 'electrical_burn', synonyms: ['choc électrique', 'électrocuté', 'courant électrique', 'ligne électrique', 'brûlure électrique'], entityType: 'burn', entityValue: 'electrical', confidence: 'strong' },

    /* Electric Shock */
    { canonical: 'electric_shock', synonyms: ['choc électrique', 'électrocuté', 'courant électrique', 'ligne électrique', 'haute tension', 'fil électrique', 'tension électrique'], entityType: 'electricShock', entityValue: true, confidence: 'strong' },

    /* Drowning */
    { canonical: 'drowning', synonyms: ['noyade', 'submergé', 'sous eau', 'piscine accident', 'aspiré de l eau', 'eau dans les poumons', 'retiré de l eau'], entityType: 'drowning', entityValue: true, confidence: 'strong' },

    /* Allergic Reaction */
    { canonical: 'allergic_reaction', synonyms: ['allergie', 'anaphylaxie', 'gonflement visage', 'urticaire', 'epipen', 'piqûre abeille', 'gorge qui se ferme', 'œdème', 'tout rouge', 'gonflement gorge'], entityType: 'allergicReaction', entityValue: true, confidence: 'strong' },

    /* Poisoning */
    { canonical: 'poisoning', synonyms: ['empoisonnement', 'surdosage', 'toxique', 'avalé pilules', 'ingestion chimique', 'mauvaise nourriture', 'nourriture contaminée', 'toxine', 'venin'], entityType: 'poisoning', entityValue: true, confidence: 'strong' },

    /* Stroke */
    { canonical: 'stroke', synonyms: ['avc', 'visage qui tombe', 'parole confuse', 'faiblesse bras', 'un côté faible', 'confusion soudaine', 'difficulté à parler', 'engourdissement côté', 'sourire de travers'], entityType: 'strokeSymptoms', entityValue: true, confidence: 'strong' },

    /* Fracture */
    { canonical: 'fracture', synonyms: ['cassé', 'fracture', 'os cassé', 'ossement brisé', 'fracture ouverte', 'dislocation', 'os visible', 'fracture composée'], entityType: 'fracture', entityValue: true, confidence: 'strong' },

    /* Fainting */
    { canonical: 'fainting', synonyms: ['évanoui', 'malaise', 'tourdissement', 'sensation d évanouissement', 'vertige'], entityType: 'fainting', entityValue: true, confidence: 'moderate' },

    /* Heat */
    { canonical: 'heat', synonyms: ['chaleur', 'coup de chaleur', 'épuisement par la chaleur', 'surchauffe', 'soleil', 'déshydratation chaleur', 'trop chaud'], entityType: 'heat', entityValue: true, confidence: 'moderate' },

    /* Cold */
    { canonical: 'cold', synonyms: ['froid', 'hypothermie', 'gelure', 'gèle', 'frissonne', 'trop froid', 'température basse', 'exposition au froid'], entityType: 'cold', entityValue: true, confidence: 'moderate' },

    /* Nosebleed */
    { canonical: 'nosebleed', synonyms: ['saignement nez', 'sang nez', 'nez qui saigne', 'épistaxis', 'hémorragie nasale'], entityType: 'nosebleed', entityValue: true, confidence: 'strong' },
  ],

  negationMarkers: ['pas', 'ne', 'non', 'aucun', 'jamais', 'sans', 'n est pas', 'n était pas', 'ne peut pas', 'ne respire pas'],

  uncertaintyMarkers: ['peut-être', 'peut être', 'pourrait', 'probablement', 'je pense', 'semble', 'apparemment'],

  severityIntensifiers: ['sévère', 'extrême', 'très', 'grave', 'critique', 'massif', 'lourd', 'intense', 'mauvais', 'terrible'],
};

/* ── Language map accessor ── */

export function getKeywordMap(lang: 'en' | 'ar' | 'fr'): LanguageKeywordMap {
  switch (lang) {
    case 'ar': return arKeywordMap;
    case 'fr': return frKeywordMap;
    default: return enKeywordMap;
  }
}
