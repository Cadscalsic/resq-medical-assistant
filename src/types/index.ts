export type Language = 'en' | 'ar' | 'fr';

export type Severity = 'critical' | 'moderate' | 'minor';

export interface Step {
  text: Record<Language, string>;
  highlight?: boolean;
}

export interface EmergencyScenario {
  id: string;
  severity: Severity;
  icon: string;
  keywords: Record<Language, string[]>;
  title: Record<Language, string>;
  warning: Record<Language, string | null>;
  steps: Step[];
  callEmergency: boolean;
  quickDecision?: QuickDecision[];
  /** Deterministic severity score for decision engine ranking */
  severityScore?: number;
}

export interface QuickDecision {
  question: Record<Language, string>;
  options: QuickOption[];
}

export interface QuickOption {
  label: Record<Language, string>;
  nextId?: string;
  action?: 'call_emergency' | 'proceed';
}

export interface EmergencyMatch {
  scenario: EmergencyScenario;
  confidence: number;
}

export interface AppState {
  language: Language;
  currentScenario: EmergencyScenario | null;
  currentStep: number;
  showWarning: boolean;
}

/* ─────────── DECISION ENGINE TYPES ─────────── */

export interface StructuredInput {
  conscious?: 'yes' | 'no' | 'unknown';
  breathing?: 'yes' | 'no' | 'labored' | 'unknown';
  bleeding?: 'none' | 'minor' | 'severe' | 'unknown';
  chestPain?: 'yes' | 'no' | 'unknown';
  choking?: 'yes' | 'no' | 'unknown';
  seizure?: 'yes' | 'no' | 'unknown';
  burn?: 'yes' | 'no' | 'chemical' | 'electrical' | 'unknown';
  electricShock?: 'yes' | 'no' | 'unknown';
  drowning?: 'yes' | 'no' | 'unknown';
  allergicReaction?: 'yes' | 'no' | 'unknown';
  poisoning?: 'yes' | 'no' | 'unknown';
  strokeSymptoms?: 'yes' | 'no' | 'unknown';
  symptoms: string[];
}

export interface NormalizedInput {
  signals: SignalMap;
  symptoms: string[];
  rawText: string;
}

export interface SignalMap {
  consciousness: 'conscious' | 'unconscious' | 'unknown';
  breathing: 'breathing' | 'not_breathing' | 'labored' | 'unknown';
  bleeding: 'none' | 'minor' | 'severe' | 'unknown';
  chestPain: boolean;
  choking: boolean;
  seizure: boolean;
  burn: 'none' | 'thermal' | 'chemical' | 'electrical' | 'unknown';
  electricShock: boolean;
  drowning: boolean;
  allergicReaction: boolean;
  poisoning: boolean;
  strokeSymptoms: boolean;
}

export interface RuleMatch {
  scenarioId: string;
  ruleName: string;
  score: number;
  triggers: string[];
}

export interface EngineResult {
  conditionId: string;
  conditionTitle: Record<Language, string>;
  severity: Severity;
  severityScore: number;
  steps: Step[];
  warning: string | null;
  callEmergency: boolean;
  confidence: number;
  matchedRules: string[];
  language: Language;
}

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

export interface DecisionQuestion {
  id: keyof StructuredInput;
  question: Record<Language, string>;
  options: DecisionOption[];
  priority: number;
  condition?: (input: Partial<StructuredInput>) => boolean;
}

export interface DecisionOption {
  value: string;
  label: Record<Language, string>;
  icon?: string;
  color?: 'red' | 'amber' | 'green' | 'blue';
}

/* ─────────── NLU ENGINE TYPES ─────────── */

export interface DetectedLanguage {
  code: Language;
  confidence: number; // 0.0 - 1.0
  method: 'script' | 'keyword' | 'default';
}

export interface ExtractedEntity {
  type: 'consciousness' | 'breathing' | 'bleeding' | 'chestPain' | 'choking' | 'seizure' | 'burn' | 'electricShock' | 'drowning' | 'allergicReaction' | 'poisoning' | 'strokeSymptoms' | 'fracture' | 'fainting' | 'heat' | 'cold' | 'nosebleed';
  value: string | boolean;
  confidence: 'strong' | 'moderate' | 'weak';
  matchedKeywords: string[];
}

export interface NLUResult {
  language: DetectedLanguage;
  entities: ExtractedEntity[];
  signals: SignalMap;
  symptoms: string[];
  rawText: string;
  normalizedText: string;
  processingTimeMs: number;
  confidence: number; // 0.0 - 1.0 overall extraction confidence
}

export interface KeywordEntry {
  canonical: string;
  synonyms: string[];
  entityType: ExtractedEntity['type'];
  entityValue: string | boolean;
  confidence: 'strong' | 'moderate' | 'weak';
}

export interface LanguageKeywordMap {
  entities: KeywordEntry[];
  negationMarkers: string[];
  uncertaintyMarkers: string[];
  severityIntensifiers: string[];
}
