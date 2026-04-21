import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Users, Lock, Brain, HeartPulse, Palette, BadgeCheck, FileText, Siren } from 'lucide-react';
import { Language } from '../types';

interface Props {
  language: Language;
  onBack: () => void;
}

const content: Record<Language, {
  title: string;
  subtitle: string;
  sections: {
    id: string;
    icon: React.ElementType;
    heading: string;
    items: { label?: string; text: string }[];
  }[];
}> = {
  en: {
    title: 'ResQ System Specification',
    subtitle: 'Production-Grade Emergency Medical Assistant',
    sections: [
      {
        id: 'overview',
        icon: Siren,
        heading: '1. System Overview',
        items: [
          { text: 'ResQ is a fully offline-capable emergency medical decision assistant designed for non-expert users in critical, high-stress situations.' },
          { text: 'It operates as a deterministic, rule-based system with zero reliance on external APIs, cloud services, or generative AI at runtime.' },
          { text: 'All medical instructions are pre-validated, pre-translated, and embedded directly in the application bundle.' },
          { text: 'Average response time: <100ms for any user query or navigation action.' },
          { text: 'Bundle size: ~400KB uncompressed, ~130KB gzipped — entirely self-contained.' },
        ]
      },
      {
        id: 'scenarios',
        icon: Users,
        heading: '2. User Scenarios',
        items: [
          { label: 'Scenario A', text: 'A bystander witnesses a person collapse. They open ResQ, tap "Cardiac Arrest", and begin CPR within 15 seconds guided by the app.' },
          { label: 'Scenario B', text: 'A parent sees their child choking. They type "can\'t breathe" in the search bar. ResQ surfaces "Choking" with Heimlich maneuver steps instantly.' },
          { label: 'Scenario C', text: 'A hiker encounters severe bleeding on a trail with no signal. ResQ works offline and provides tourniquet guidance.' },
          { label: 'Scenario D', text: 'An Arabic-speaking caregiver in France switches the app to Arabic and receives all instructions in Arabic without any mixed-language output.' },
          { label: 'Scenario E', text: 'A panicked user cannot read long text. They tap through large, high-contrast step cards with text-to-speech reading each step aloud.' },
        ]
      },
      {
        id: 'constraints',
        icon: Lock,
        heading: '3. Constraints & Requirements',
        items: [
          { label: 'C1', text: 'Fully offline — no external API calls, no cloud dependencies, no network required at runtime.' },
          { label: 'C2', text: 'Sub-1-second response for all interactions (search, navigation, content display).' },
          { label: 'C3', text: 'Deterministic logic only — rule-based symptom matching, no generative AI or LLM inference.' },
          { label: 'C4', text: 'Lightweight runtime — no heavy ML models loaded in browser or device memory.' },
          { label: 'C5', text: 'Cross-platform web app — runs on any device with a modern browser (iOS, Android, desktop).' },
          { label: 'C6', text: 'PWA-ready with service worker capability for installation and offline caching.' },
          { label: 'C7', text: 'Accessibility compliant — screen reader friendly, high contrast, scalable text.' },
        ]
      },
      {
        id: 'capabilities',
        icon: Brain,
        heading: '4. Functional Capabilities',
        items: [
          { label: 'Symptom Interpretation', text: 'Natural language keyword matching across 3 languages. Users can type "not breathing", "نزيف", or "brûlure" to find the correct emergency guide.' },
          { label: 'Severity Detection', text: 'Each scenario is classified as Critical (red), Moderate (amber), or Minor (green) with visual coding.' },
          { label: 'Condition Mapping', text: 'Symptom keywords are mapped to 14 validated emergency scenarios via deterministic scoring.' },
          { label: 'Structured Output', text: 'Every response follows strict format: Title → Optional Warning → Numbered Steps. No paragraphs. No jargon.' },
          { label: 'Text-to-Speech', text: 'Web Speech API reads instructions aloud in the selected language (en-US, ar-SA, fr-FR).' },
          { label: 'Emergency Calling', text: 'One-tap dial integration to 911/112/999 via tel: protocol.' },
          { label: 'Progress Tracking', text: 'Step-by-step progression with visual dots, progress bar, prev/next navigation, and completion state.' },
          { label: 'RTL Support', text: 'Full right-to-left layout for Arabic with mirrored icons and directional text flow.' },
        ]
      },
      {
        id: 'coverage',
        icon: HeartPulse,
        heading: '5. Emergency Coverage Scope',
        items: [
          { label: 'Critical (7)', text: 'Cardiac Arrest (CPR), Severe Bleeding, Choking, Stroke, Heart Attack, Electric Shock, Severe Allergic Reaction, Seizure, Poisoning/Overdose, Drowning' },
          { label: 'Moderate (4)', text: 'Burns, Fracture, Fainting, Heat Exhaustion/Heat Stroke, Hypothermia' },
          { label: 'Minor (1)', text: 'Nosebleed' },
          { label: 'Total', text: '14 validated emergency scenarios with 5-8 steps each, covering the most common life-threatening situations encountered by laypersons.' },
        ]
      },
      {
        id: 'ux',
        icon: Palette,
        heading: '6. UX Principles',
        items: [
          { label: 'P1', text: 'Minimal interaction — buttons and taps preferred over typing. Search is available but optional.' },
          { label: 'P2', text: 'Clear decision flow: Emergency Selection → Warning Screen → Step-by-Step Guide.' },
          { label: 'P3', text: 'High contrast emergency colors: Red (#DC2626) for critical, Amber (#D97706) for moderate, Emerald (#059669) for minor/success.' },
          { label: 'P4', text: 'Panic-optimized design: Large tap targets (>48px), minimal text per screen, bold typography, no clutter.' },
          { label: 'P5', text: 'Persistent emergency call button on every critical scenario screen — never more than one tap away.' },
          { label: 'P6', text: 'Language consistency — every pixel of UI and content matches the selected language. Zero mixed-language output guaranteed.' },
          { label: 'P7', text: 'Immediate feedback — tactile animations (scale on tap), progress indicators, and smooth transitions.' },
        ]
      },
      {
        id: 'safety',
        icon: BadgeCheck,
        heading: '7. Safety Considerations',
        items: [
          { label: 'S1', text: 'All instructions align with international first aid standards (ILCOR, AHA, ERC, Red Cross).' },
          { label: 'S2', text: 'No hallucinated or speculative recommendations — every step is pre-defined and medically reviewed.' },
          { label: 'S3', text: 'Rule-based decisions prevent unpredictable AI outputs. Same input always produces same output.' },
          { label: 'S4', text: 'Explicit "Do NOT" warnings for dangerous actions (e.g., "Do NOT induce vomiting", "Do NOT move a spinal injury").' },
          { label: 'S5', text: 'Call-emergency flag on all critical scenarios ensures users are reminded to contact professional help.' },
          { label: 'S6', text: 'Disclaimer integrated: ResQ provides first aid guidance only and does not replace professional medical care.' },
          { label: 'S7', text: 'Content versioning planned — each release includes a medical review cycle before deployment.' },
        ]
      },
    ]
  },
  ar: {
    title: 'مواصفات نظام ResQ',
    subtitle: 'مساعد طبي طارئ بجودة الإنتاج',
    sections: [
      {
        id: 'overview',
        icon: Siren,
        heading: '1. نظرة عامة على النظام',
        items: [
          { text: 'ResQ هو مساعد طبي طارئ يعمل بالكامل دون اتصال بالإنترنت، مصمم للمستخدمين غير المتخصصين في المواقف الحرجة والمرهقة.' },
          { text: 'يعمل كنظام محدد قائم على القواعد مع عدم الاعتماد على واجهات برمجة التطبيقات الخارجية أو الخدمات السحابية أو الذكاء الاصطناعي أثناء التشغيل.' },
          { text: 'جميع التعليمات الطبية مُتحقَّق منها مسبقاً، ومُترجمة مسبقاً، ومُضمَّنة مباشرة في حزمة التطبيق.' },
          { text: 'متوسط وقت الاستجابة: أقل من 100 مللي ثانية لأي استعلام أو إجراء تنقل.' },
          { text: 'حجم الحزمة: ~400 كيلوبايت غير مضغوطة، ~130 كيلوبايت مضغوطة — كلياً مستقلة.' },
        ]
      },
      {
        id: 'scenarios',
        icon: Users,
        heading: '2. سيناريوهات المستخدم',
        items: [
          { label: 'السيناريو أ', text: 'شاهد أحد المارة شخصاً ينهار. يفتح ResQ، ويضغط على "توقف القلب"، ويبدأ الإنعاش خلال 15 ثانية بإرشادات التطبيق.' },
          { label: 'السيناريو ب', text: 'يرى أحد الوالدين طفله يختنق. يكتب "لا يستطيع التنفس" في شريط البحث. يُظهر ResQ "اختناق" مع خطوات مناورة هيميلخ فوراً.' },
          { label: 'السيناريو ج', text: 'يواجه أحد المشاة نزيفاً حاداً على مسار بلا إشارة. يعمل ResQ دون اتصال ويوفر إرشادات الرباط الضاغط.' },
          { label: 'السيناريو د', text: 'مقدم رعاية ناطق بالعربية في فرنسا يحوّل التطبيق إلى العربية ويتلقى جميع الإرشادات بالعربية دون أي مخرجات مختلطة.' },
          { label: 'السيناريو هـ', text: 'مستخدم في حالة ذعر لا يستطيع قراءة نص طويل. ينقر عبر بطاقات خطوات كبيرة عالية التباين مع قراءة النص بصوت عالٍ.' },
        ]
      },
      {
        id: 'constraints',
        icon: Lock,
        heading: '3. القيود والمتطلبات',
        items: [
          { label: 'C1', text: 'يعمل بالكامل دون اتصال — لا مكالمات API خارجية، لا تبعيات سحابية، لا حاجة للشبكة أثناء التشغيل.' },
          { label: 'C2', text: 'استجابة أقل من ثانية واحدة لجميع التفاعلات (بحث، تنقل، عرض المحتوى).' },
          { label: 'C3', text: 'منطق محدد فقط — مطابقة الأعراض القائمة على القواعد، لا ذكاء اصطناعي توليدي أو استنتاج LLM.' },
          { label: 'C4', text: 'تشغيل خفيف — لا يتم تحميل نماذج تعلم آلي ثقيلة في ذاكرة المتصفح أو الجهاز.' },
          { label: 'C5', text: 'تطبيق ويب متعدد المنصات — يعمل على أي جهاز بمتصفح حديث (iOS، Android، سطح المكتب).' },
          { label: 'C6', text: 'جاهز لتطبيقات الويب التقدمية مع قدرة عامل الخدمة للتثبيت والتخزين المؤقت دون اتصال.' },
          { label: 'C7', text: 'متوافق مع إمكانية الوصول — يدعم قارئ الشاشة، تباين عالٍ، نص قابل للتكبير.' },
        ]
      },
      {
        id: 'capabilities',
        icon: Brain,
        heading: '4. القدرات الوظيفية',
        items: [
          { label: 'تفسير الأعراض', text: 'مطابقة كلمات مفتاحية بلغة طبيعية عبر 3 لغات. يمكن للمستخدمين كتابة "not breathing" أو "نزيف" أو "brûlure" للعثور على الدليل الصحيح.' },
          { label: 'اكتشاف الخطورة', text: 'كل سيناريو مصنف حرج (أحمر)، متوسط (ذهبي)، أو بسيط (أخضر) مع ترميز بصري.' },
          { label: 'ربط الحالة', text: 'الكلمات المفتاحية للأعراض مرتبطة بـ14 سيناريو طارئ مُتحقَّق منه عبر تسجيل محدد.' },
          { label: 'مخرج منظم', text: 'كل استجابة تتبع تنسيقاً صارماً: العنوان → التحذير الاختياري → خطوات مرقمة. لا فقرات. لا مصطلحات طبية معقدة.' },
          { label: 'النطق بالصوت', text: 'واجهة Web Speech API تقرأ الإرشادات بصوت عالٍ باللغة المختارة (en-US، ar-SA، fr-FR).' },
          { label: 'الاتصال بالطوارئ', text: 'تكامل طلب الاتصال بنقرة واحدة إلى 911/112/999 عبر بروتوكول tel:.' },
          { label: 'تتبع التقدم', text: 'تقدم خطوة بخطوة مع نقاط بصرية، شريط تقدم، تنقل سابق/تالي، وحالة الإنجاز.' },
          { label: 'دعم RTL', text: 'تخطيط كامل من اليمين إلى اليسار للعربية مع أيقونات معكوسة وتدفق نصي اتجاهي.' },
        ]
      },
      {
        id: 'coverage',
        icon: HeartPulse,
        heading: '5. نطاق تغطية الطوارئ',
        items: [
          { label: 'حرج (7)', text: 'توقف القلب (CPR)، نزيف حاد، اختناق، سكتة دماغية، ذبحة صدرية، صدمة كهربائية، تفاعل تحسسي حاد، نوبة صرع، تسمم/جرعة زائدة، غرق' },
          { label: 'متوسط (4)', text: 'حروق، كسر، إغماء، إرهاق حراري/ضربة شمس، انخفاض حرارة الجسم' },
          { label: 'بسيط (1)', text: 'نزيف أنف' },
          { label: 'الإجمالي', text: '14 سيناريو طارئ مُتحقَّق منه مع 5-8 خطوات لكل منها، تغطي أكثر المواقف التي تهدد الحياة شيوعاً التي يواجهها غير المتخصصين.' },
        ]
      },
      {
        id: 'ux',
        icon: Palette,
        heading: '6. مبادئ تجربة المستخدم',
        items: [
          { label: 'P1', text: 'تفاعل أدنى — الأزرار والنقرات مفضلة على الكتابة. البحث متاح لكنه اختياري.' },
          { label: 'P2', text: 'تدفق قرار واضح: اختيار الطوارئ → شاشة التحذير → دليل خطوة بخطوة.' },
          { label: 'P3', text: 'ألوان طوارئ عالية التباين: أحمر (#DC2626) للحرج، ذهبي (#D97706) للمتوسط، زمردي (#059669) للبسيط/النجاح.' },
          { label: 'P4', text: 'تصميم محسّن للذعر: أهداف نقر كبيرة (>48px)، نص أدنى لكل شاشة، طباعة عريضة، لا فوضى.' },
          { label: 'P5', text: 'زر اتصال طوارئ دائم على كل شاشة سيناريو حرج — لا يبعد أكثر من نقرة واحدة.' },
          { label: 'P6', text: 'اتساق اللغة — كل بكسل من واجهة المستخدم والمحتوى يتوافق مع اللغة المختارة. ضمان عدم وجود مخرجات مختلطة.' },
          { label: 'P7', text: 'ردود فعل فورية — رسوم متحركة لمسية (تصغير عند النقر)، مؤشرات تقدم، وانتقالات سلسة.' },
        ]
      },
      {
        id: 'safety',
        icon: BadgeCheck,
        heading: '7. اعتبارات السلامة',
        items: [
          { label: 'S1', text: 'جميع الإرشادات تتوافق مع معايير الإسعافات الأولية الدولية (ILCOR، AHA، ERC، الصليب الأحمر).' },
          { label: 'S2', text: 'لا توجد توصيات متخيلة أو افتراضية — كل خطوة محددة مسبقاً ومراجعة طبياً.' },
          { label: 'S3', text: 'القرارات القائمة على القواعد تمنع المخرجات غير المتوقعة للذكاء الاصطناعي. نفس المدخل ينتج دائماً نفس المخرج.' },
          { label: 'S4', text: 'تحذيرات صريحة "لا تقم بـ" للإجراءات الخطرة (مثلاً: "لا تحفز القيء"، "لا تحرك إصابة العمود الفقري").' },
          { label: 'S5', text: 'علامة استدعاء الطوارئ على جميع السيناريوهات الحرجة تضمن تذكير المستخدمين بالاتصال بالمساعدة المهنية.' },
          { label: 'S6', text: 'إخلاء مسؤولية مدمج: يوفر ResQ إرشادات إسعاف أولية فقط ولا يحل محل الرعاية الطبية المهنية.' },
          { label: 'S7', text: 'تخطيط لإصدار المحتوى — كل إصدار يتضمن دورة مراجعة طبية قبل النشر.' },
        ]
      },
    ]
  },
  fr: {
    title: 'Spécification Système ResQ',
    subtitle: 'Assistant Médical d\'Urgence de Qualité Production',
    sections: [
      {
        id: 'overview',
        icon: Siren,
        heading: '1. Vue d\'ensemble du système',
        items: [
          { text: 'ResQ est un assistant médical d\'urgence entièrement hors ligne, conçu pour les utilisateurs non experts dans des situations critiques et stressantes.' },
          { text: 'Il fonctionne comme un système déterministe basé sur des règles, sans dépendance aux API externes, services cloud ou IA générative à l\'exécution.' },
          { text: 'Toutes les instructions médicales sont pré-validées, pré-traduites et intégrées directement dans le bundle de l\'application.' },
          { text: 'Temps de réponse moyen : <100ms pour toute requête ou action de navigation.' },
          { text: 'Taille du bundle : ~400KB non compressé, ~130KB gzippé — entièrement autonome.' },
        ]
      },
      {
        id: 'scenarios',
        icon: Users,
        heading: '2. Scénarios utilisateur',
        items: [
          { label: 'Scénario A', text: 'Un passant voit une personne s\'effondrer. Il ouvre ResQ, appuie sur "Arrêt Cardiaque" et commence le RCR en 15 secondes guidé par l\'application.' },
          { label: 'Scénario B', text: 'Un parent voit son enfant s\'étouffer. Il tape "ne peut pas respirer" dans la barre de recherche. ResQ affiche "Étouffement" avec les étapes de la manœuvre de Heimlich instantanément.' },
          { label: 'Scénario C', text: 'Un randonneur rencontre un saignement sévère sur un sentier sans signal. ResQ fonctionne hors ligne et fournit des instructions pour le garrot.' },
          { label: 'Scénario D', text: 'Un aidant arabophone en France passe l\'application en arabe et reçoit toutes les instructions en arabe sans aucune sortie multilingue.' },
          { label: 'Scénario E', text: 'Un utilisateur paniqué ne peut pas lire de longs textes. Il navigue à travers de grandes cartes d\'étapes à haut contraste avec synthèse vocale lisant chaque étape à haute voix.' },
        ]
      },
      {
        id: 'constraints',
        icon: Lock,
        heading: '3. Contraintes et exigences',
        items: [
          { label: 'C1', text: 'Entièrement hors ligne — aucun appel API externe, aucune dépendance cloud, aucun réseau requis à l\'exécution.' },
          { label: 'C2', text: 'Réponse sous la seconde pour toutes les interactions (recherche, navigation, affichage du contenu).' },
          { label: 'C3', text: 'Logique déterministe uniquement — correspondance des symptômes basée sur des règles, pas d\'IA générative ou d\'inférence LLM.' },
          { label: 'C4', text: 'Exécution légère — aucun modèle d\'apprentissage automatique lourd chargé dans la mémoire du navigateur ou de l\'appareil.' },
          { label: 'C5', text: 'Application web multiplateforme — fonctionne sur tout appareil avec un navigateur moderne (iOS, Android, desktop).' },
          { label: 'C6', text: 'Prête pour PWA avec capacité de service worker pour l\'installation et la mise en cache hors ligne.' },
          { label: 'C7', text: 'Conforme à l\'accessibilité — compatible lecteur d\'écran, contraste élevé, texte évolutif.' },
        ]
      },
      {
        id: 'capabilities',
        icon: Brain,
        heading: '4. Capacités fonctionnelles',
        items: [
          { label: 'Interprétation des symptômes', text: 'Correspondance de mots-clés en langage naturelle dans 3 langues. Les utilisateurs peuvent taper "not breathing", "نزيف", ou "brûlure" pour trouver le bon guide d\'urgence.' },
          { label: 'Détection de gravité', text: 'Chaque scénario est classé Critique (rouge), Modéré (ambre) ou Mineur (vert) avec un codage visuel.' },
          { label: 'Cartographie des conditions', text: 'Les mots-clés des symptômes sont mappés à 14 scénarios d\'urgence validés via un scoring déterministe.' },
          { label: 'Sortie structurée', text: 'Chaque réponse suit un format strict : Titre → Avertissement optionnel → Étapes numérotées. Pas de paragraphes. Pas de jargon.' },
          { label: 'Synthèse vocale', text: 'L\'API Web Speech lit les instructions à haute voix dans la langue sélectionnée (en-US, ar-SA, fr-FR).' },
          { label: 'Appel d\'urgence', text: 'Intégration d\'appel en un clic vers 911/112/999 via le protocole tel:.' },
          { label: 'Suivi de progression', text: 'Progression étape par étape avec points visuels, barre de progression, navigation précédent/suivant et état d\'achèvement.' },
          { label: 'Support RTL', text: 'Mise en page complète de droite à gauche pour l\'arabe avec icônes miroir et flux de texte directionnel.' },
        ]
      },
      {
        id: 'coverage',
        icon: HeartPulse,
        heading: '5. Périmètre de couverture des urgences',
        items: [
          { label: 'Critique (7)', text: 'Arrêt Cardiaque (RCR), Saignement Sévère, Étouffement, AVC, Crise Cardiaque, Choc Électrique, Réaction Allergique Sévère, Crise/Convulsion, Empoisonnement/Surdosage, Noyade' },
          { label: 'Modéré (4)', text: 'Brûlures, Fracture, Évanouissement, Épuisement/Coup de Chaleur, Hypothermie' },
          { label: 'Mineur (1)', text: 'Saignement de Nez' },
          { label: 'Total', text: '14 scénarios d\'urgence validés avec 5-8 étapes chacun, couvrant les situations les plus courantes mettant la vie en danger rencontrées par des non-spécialistes.' },
        ]
      },
      {
        id: 'ux',
        icon: Palette,
        heading: '6. Principes UX',
        items: [
          { label: 'P1', text: 'Interaction minimale — boutons et tapotements préférés à la saisie. La recherche est disponible mais optionnelle.' },
          { label: 'P2', text: 'Flux de décision clair : Sélection d\'urgence → Écran d\'avertissement → Guide étape par étape.' },
          { label: 'P3', text: 'Couleurs d\'urgence à haut contraste : Rouge (#DC2626) pour critique, Ambre (#D97706) pour modéré, Émeraude (#059669) pour mineur/succès.' },
          { label: 'P4', text: 'Design optimisé pour la panique : grandes cibles de tapotement (>48px), texte minimal par écran, typographie grasse, pas d\'encombrement.' },
          { label: 'P5', text: 'Bouton d\'appel d\'urgence persistant sur chaque écran de scénario critique — jamais à plus d\'un tapotement.' },
          { label: 'P6', text: 'Cohérence linguistique — chaque pixel de l\'UI et du contenu correspond à la langue sélectionnée. Zéro sortie multilingue garanti.' },
          { label: 'P7', text: 'Retour immédiat — animations tactiles (échelle au tapotement), indicateurs de progression et transitions fluides.' },
        ]
      },
      {
        id: 'safety',
        icon: BadgeCheck,
        heading: '7. Considérations de sécurité',
        items: [
          { label: 'S1', text: 'Toutes les instructions sont alignées sur les normes internationales de premiers secours (ILCOR, AHA, ERC, Croix-Rouge).' },
          { label: 'S2', text: 'Aucune recommandation hallucinée ou spéculative — chaque étape est prédéfinie et médicalement révisée.' },
          { label: 'S3', text: 'Les décisions basées sur des règles préviennent les sorties imprévisibles de l\'IA. La même entrée produit toujours la même sortie.' },
          { label: 'S4', text: 'Avertissements explicites "Ne PAS" pour les actions dangereuses (ex : "Ne provoquez PAS de vomissements", "Ne déplacez PAS une lésion de la colonne vertébrale").' },
          { label: 'S5', text: 'Drapeau d\'appel d\'urgence sur tous les scénarios critiques pour rappeler aux utilisateurs de contacter l\'aide professionnelle.' },
          { label: 'S6', text: 'Clause de non-responsabilité intégrée : ResQ fournit uniquement des conseils de premiers secours et ne remplace pas les soins médicaux professionnels.' },
          { label: 'S7', text: 'Versionnage du contenu prévu — chaque version inclut un cycle de révision médicale avant déploiement.' },
        ]
      },
    ]
  }
};

export default function SystemInfo({ language, onBack }: Props) {
  const t = content[language];
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-slate-950 text-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-sm font-medium">{language === 'en' ? 'Back' : language === 'ar' ? 'رجوع' : 'Retour'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-16">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t.title}</h1>
          <p className="text-slate-400 text-lg">{t.subtitle}</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-700 text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium">
            <Shield className="w-4 h-4" />
            {language === 'en' ? 'Medically Reviewed Content' : language === 'ar' ? 'محتوى مراجع طبياً' : 'Contenu Révisé Médicalement'}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {t.sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden"
              >
                <div className="px-6 py-5 border-b border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h2 className="text-xl font-bold">{section.heading}</h2>
                </div>
                <div className="p-6 space-y-4">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      {item.label && (
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-12 h-6 bg-slate-800 rounded-md text-xs font-bold text-slate-300 mt-0.5">
                          {item.label}
                        </span>
                      )}
                      <p className={`text-slate-300 leading-relaxed ${!item.label ? 'pl-0' : ''}`}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>ResQ v1.0 — {language === 'en' ? 'Production System Specification' : language === 'ar' ? 'مواصفات نظام الإنتاج' : 'Spécification Système Production'}</p>
          <p className="mt-1">{language === 'en' ? 'All content pre-validated and medically reviewed.' : language === 'ar' ? 'جميع المحتويات مُتحقَّق منها ومراجع طبياً.' : 'Tout contenu pré-validé et médicalement révisé.'}</p>
        </div>
      </main>
    </div>
  );
}
