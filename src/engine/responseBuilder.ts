/**
 * RESPONSE BUILDER
 * ───────────────────────────────────────
 * Builds the final EngineResult by pulling ONLY from the pre-validated
 * medical dataset. Never generates text. Never hallucinates.
 *
 * Fallback messages guide users to verify symptoms rather than
 * declaring "no emergency."
 */

import { EngineResult, Language, Step } from '../types';
import { getEmergencyById } from '../data/emergencies';
import { SeverityResult } from './severityEngine';
import { RuleMatch } from '../types';

export function buildResponse(
  scenarioId: string,
  severityResult: SeverityResult,
  matchedRules: RuleMatch[],
  language: Language,
  _confidence: number
): EngineResult {
  // Special case: insufficient data
  if (scenarioId === 'insufficient-data') {
    return buildInsufficientDataResponse(language);
  }

  // Special case: normal condition
  if (scenarioId === 'normal-condition') {
    return buildNormalConditionResponse(language);
  }

  // Standard case: pull from dataset
  const scenario = getEmergencyById(scenarioId);

  if (!scenario) {
    // Dataset fallback — should never happen in production
    return createFallbackResponse(severityResult, language);
  }

  // Pull steps from dataset in requested language ONLY
  const steps: Step[] = scenario.steps.map((step) => ({
    text: { [language]: step.text[language] } as Record<Language, string>,
    highlight: step.highlight,
  }));

  const warning = scenario.warning[language];

  return {
    conditionId: scenario.id,
    conditionTitle: scenario.title,
    severity: severityResult.severity,
    severityScore: severityResult.score,
    steps,
    warning,
    callEmergency: scenario.callEmergency,
    confidence: calculateConfidence(matchedRules),
    matchedRules: matchedRules.map((r) => r.ruleName),
    language,
  };
}

/* ── Special case responses ── */

function buildInsufficientDataResponse(language: Language): EngineResult {
  const titles: Record<Language, string> = {
    en: 'Possible Emergency — Verify Symptoms',
    ar: 'احتمال حالة طارئة — تحقق من الأعراض',
    fr: 'Possible Urgence — Vérifiez les Symptômes',
  };

  const steps: Record<Language, string[]> = {
    en: [
      'A possible emergency was detected but more information is needed.',
      'Check if the person is conscious — tap their shoulder and shout.',
      'Check if they are breathing — look for chest movement for 10 seconds.',
      'If they are not breathing or unconscious: call emergency services (911/112/999) and start CPR.',
      'If you are unsure about the condition, call emergency services for guidance.',
      'Stay with the person until help arrives.',
    ],
    ar: [
      'تم رصد احتمال حالة طارئة لكن هناك حاجة لمزيد من المعلومات.',
      'تحقق مما إذا كان الشخص واعياً — اضغط على كتفه واصرخ.',
      'تحقق مما إذا كان يتنفس — انظر لحركة الصدر لمدة 10 ثوانٍ.',
      'إذا كان غير واعٍ أو لا يتنفس: اتصل بالطوارئ (911/112/999) وابدأ الإنعاش.',
      'إذا كنت غير متأكد من الحالة، اتصل بالطوارئ للحصول على إرشادات.',
      'ابقَ مع الشخص حتى وصول المساعدة.',
    ],
    fr: [
      'Une urgence possible a été détectée mais plus d\'informations sont nécessaires.',
      'Vérifiez si la personne est consciente — tapez sur son épaule et criez.',
      'Vérifiez si elle respire — observez le mouvement de la poitrine pendant 10 secondes.',
      'Si elle est inconsciente ou ne respire pas : appelez les secours (911/112/999) et commencez le RCR.',
      'Si vous n\'êtes pas sûr de l\'état, appelez les secours pour obtenir des conseils.',
      'Restez avec la personne jusqu\'à l\'arrivée de l\'aide.',
    ],
  };

  return {
    conditionId: 'insufficient-data',
    conditionTitle: titles,
    severity: 'minor',
    severityScore: 0,
    steps: steps[language].map((text) => ({
      text: { [language]: text } as Record<Language, string>,
    })),
    warning: null,
    callEmergency: false,
    confidence: 0,
    matchedRules: [],
    language,
  };
}

function buildNormalConditionResponse(language: Language): EngineResult {
  const titles: Record<Language, string> = {
    en: 'No Emergency Detected',
    ar: 'لم يتم رصد حالة طارئة',
    fr: 'Aucune Urgence Détectée',
  };

  const steps: Record<Language, string[]> = {
    en: [
      'The person appears to be stable with normal breathing and consciousness.',
      'Continue to monitor them for any changes.',
      'If symptoms develop or worsen, reassess using this app or call emergency services.',
      'Keep the person comfortable and calm.',
    ],
    ar: [
      'يبدو أن الشخص مستقر مع تنفس ووعي طبيعيين.',
      'استمر في مراقبتهم لأي تغييرات.',
      'إذا ظهرت أعراض أو ساءت، أعد التقييم باستخدام هذا التطبيق أو اتصل بالطوارئ.',
      'أبقِ الشخص مرتاحاً وهادئاً.',
    ],
    fr: [
      'La personne semble stable avec une respiration et une conscience normales.',
      'Continuez à la surveiller pour tout changement.',
      'Si des symptômes apparaissent ou s\'aggravent, réévaluez avec cette app ou appelez les secours.',
      'Gardez la personne à l\'aise et calme.',
    ],
  };

  return {
    conditionId: 'normal-condition',
    conditionTitle: titles,
    severity: 'minor',
    severityScore: 5,
    steps: steps[language].map((text) => ({
      text: { [language]: text } as Record<Language, string>,
    })),
    warning: null,
    callEmergency: false,
    confidence: 100,
    matchedRules: ['normal_vitals_no_symptoms'],
    language,
  };
}

/* ── Dataset fallback ── */

function createFallbackResponse(severityResult: SeverityResult, language: Language): EngineResult {
  const fallbackSteps: Record<Language, string[]> = {
    en: [
      'Call emergency services (911/112/999) immediately.',
      'Do not move the person unless in immediate danger.',
      'Check if they are breathing.',
      'Stay with them until help arrives.',
    ],
    ar: [
      'اتصل بالطوارئ (911/112/999) فوراً.',
      'لا تنقل الشخص إلا إذا كان في خطر مباشر.',
      'تأكد من أنه يتنفس.',
      'ابقَ معه حتى وصول المساعدة.',
    ],
    fr: [
      'Appelez les secours (911/112/999) immédiatement.',
      'Ne déplacez PAS la personne sauf si en danger immédiat.',
      'Vérifiez qu\'elle respire.',
      'Restez avec elle jusqu\'à l\'arrivée de l\'aide.',
    ],
  };

  return {
    conditionId: 'unknown',
    conditionTitle: {
      en: 'Unknown Emergency',
      ar: 'حالة طارئة غير معروفة',
      fr: 'Urgence Inconnue',
    },
    severity: severityResult.severity,
    severityScore: severityResult.score,
    steps: fallbackSteps[language].map((text) => ({
      text: { [language]: text } as Record<Language, string>,
    })),
    warning: null,
    callEmergency: true,
    confidence: 0,
    matchedRules: [],
    language,
  };
}

function calculateConfidence(matches: RuleMatch[]): number {
  if (matches.length === 0) return 0;
  const top = matches[0];
  // Confidence = proportional to score, capped at 100
  return Math.min(100, Math.round(top.score));
}
