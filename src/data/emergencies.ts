import { EmergencyScenario, EmergencyMatch } from '../types';

export const emergencies: EmergencyScenario[] = [
  {
    id: 'respiratory-failure',
    severity: 'critical',
    icon: 'Wind',
    callEmergency: true,
    keywords: {
      en: ['not breathing', 'stopped breathing', 'no breathing', 'apnea', 'respiratory arrest', 'can\'t breathe', 'unable to breathe'],
      ar: ['لا يتنفس', 'توقف التنفس', 'لا تنفس', 'انقطاع النفس', 'غير قادر على التنفس', 'صعوبة تنفس شديدة'],
      fr: ['ne respire pas', 'arrêt respiratoire', 'pas de respiration', 'apnée', 'ne peut pas respirer', 'incapable de respirer']
    },
    title: {
      en: 'Respiratory Failure — Act Now',
      ar: 'فشل تنفسي — تحرك الآن',
      fr: 'Insuffisance Respiratoire — Agissez Maintenant'
    },
    warning: {
      en: 'NOT BREATHING is a life-threatening emergency. Call emergency services NOW.',
      ar: 'عدم التنفس حالة طارئة تهدد الحياة. اتصل بالطوارئ الآن.',
      fr: 'NE PAS RESPIRER est une urgence vitale. Appelez les secours MAINTENANT.'
    },
    steps: [
      { text: { en: 'Call emergency services (911/112/999) immediately. Put phone on speaker.', ar: 'اتصل بالطوارئ (911/112/999) فوراً. ضع الهاتف على مكبر الصوت.', fr: 'Appelez les secours (911/112/999) immédiatement. Mettez le téléphone en haut-parleur.' }, highlight: true },
      { text: { en: 'Check if the person is conscious — tap their shoulder and shout loudly.', ar: 'تحقق مما إذا كان الشخص واعياً — اضرب كتفه واصرخ بصوت عالٍ.', fr: 'Vérifiez si la personne est consciente — tapez sur son épaule et criez fort.' } },
      { text: { en: 'If UNCONSCIOUS and NOT BREATHING: start CPR immediately. 30 chest compressions, then 2 rescue breaths.', ar: 'إذا كان فاقد الوعي ولا يتنفس: ابدأ الإنعاش فوراً. 30 ضغطة صدرية ثم نفسان إنقاذيان.', fr: 'Si INCONSCIENTE et NE RESPIRE PAS : commencez le RCR immédiatement. 30 compressions, puis 2 insufflations.' }, highlight: true },
      { text: { en: 'If CONSCIOUS but cannot breathe: check their mouth for visible obstruction. Remove it with fingers if you can see it.', ar: 'إذا كان واعياً لكن لا يستطيع التنفس: افحص فمه بحثاً عن انسداد ظاهر. أزله بأصابعك إذا استطعت رؤيته.', fr: 'Si CONSCIENTE mais ne peut pas respirer : vérifiez sa bouche pour une obstruction visible. Retirez-la avec les doigts si vous la voyez.' } },
      { text: { en: 'Open the airway: tilt head back, lift chin up. Look, listen, and feel for breathing for 10 seconds.', ar: 'افتح مجرى الهواء: ا incline الرأس للخلف، ارفع الذقن. انظر واستمع واشعر بالتنفس لمدة 10 ثوانٍ.', fr: 'Ouvrez les voies respiratoires : inclinez la tête en arrière, soulevez le menton. Regardez, écoutez et sentez la respiration pendant 10 secondes.' } },
      { text: { en: 'If still not breathing: pinch their nose, seal your mouth over theirs, and give 2 slow breaths (1 second each).', ar: 'إذا كان لا يزال لا يتنفس: اصرص أنفه، أطبق فمك على فمه، وأعطِ نفسين بطيئين (ثانية لكل منهما).', fr: 'Si elle ne respire toujours pas : pincez son nez, scellez votre bouche sur la sienne, et donnez 2 inspirations lentes (1 seconde chacune).' } },
      { text: { en: 'Continue rescue breathing: 1 breath every 5-6 seconds. Check for signs of breathing regularly.', ar: 'استمر بالتنفس الإنقاذي: نفس واحد كل 5-6 ثوانٍ. افحص علامات التنفس بانتظام.', fr: 'Continuez les insufflations : 1 souffle toutes les 5-6 secondes. Vérifiez régulièrement les signes de respiration.' } },
      { text: { en: 'Stay with the person until emergency services arrive. Be ready to start full CPR if they become unconscious.', ar: 'ابقَ مع الشخص حتى وصول الطوارئ. كن مستعداً لبدء الإنعاش الكامل إذا فقد الوعي.', fr: 'Restez avec la personne jusqu\'à l\'arrivée des secours. Soyez prêt à commencer le RCR complet si elle devient inconsciente.' } }
    ]
  },
  {
    id: 'unconscious-person',
    severity: 'critical',
    icon: 'UserX',
    callEmergency: true,
    keywords: {
      en: ['unconscious', 'unresponsive', 'knocked out', 'passed out', 'not awake', 'no response', 'fainted', 'blackout'],
      ar: ['فاقد الوعي', 'لا يستجيب', 'غائب', 'انهار', 'سقط', 'غيبوبة', 'إغماء', 'تشنج وعي'],
      fr: ['inconscient', 'sans réponse', 'évanoui', 'pas réveillé', 'pas de réponse', 'perdu connaissance', 'syncope', 'blackout']
    },
    title: {
      en: 'Unconscious Person',
      ar: 'شخص فاقد الوعي',
      fr: 'Personne Inconsciente'
    },
    warning: {
      en: 'Unconsciousness is always serious. Call emergency services immediately.',
      ar: 'فقدان الوعي دائماً خطير. اتصل بالطوارئ فوراً.',
      fr: 'L\'inconscience est toujours grave. Appelez les secours immédiatement.'
    },
    steps: [
      { text: { en: 'Call emergency services (911/112/999) immediately.', ar: 'اتصل بالطوارئ (911/112/999) فوراً.', fr: 'Appelez les secours (911/112/999) immédiatement.' }, highlight: true },
      { text: { en: 'Check breathing — look for chest movement, listen for breath sounds, feel for air from mouth/nose for 10 seconds.', ar: 'افحص التنفس — انظر لحركة الصدر، استمع لأصوات التنفس، اشعر بالهواء من الفم/الأنف لمدة 10 ثوانٍ.', fr: 'Vérifiez la respiration — regardez le mouvement de la poitrine, écoutez les sons de respiration, sentez l\'air de la bouche/du nez pendant 10 secondes.' } },
      { text: { en: 'If BREATHING: place them in the recovery position. Roll them onto their side. Tilt head back to keep airway open.', ar: 'إذا كان يتنفس: ضعه في وضعية الاسترداد. اقلبه على جانبه. ا incline الرأس للخلف لإبقاء مجرى الهواء مفتوحاً.', fr: 'Si elle RESPIRE : placez-la en position latérale de sécurité. Tournez-la sur le côté. Inclinez la tête en arrière pour garder les voies respiratoires ouvertes.' }, highlight: true },
      { text: { en: 'If NOT BREATHING: start CPR immediately. 30 chest compressions, then 2 rescue breaths. Do NOT stop.', ar: 'إذا لم يكن يتنفس: ابدأ الإنعاش فوراً. 30 ضغطة صدرية ثم نفسان إنقاذيان. لا تتوقف.', fr: 'Si elle ne RESPIRE PAS : commencez le RCR immédiatement. 30 compressions, puis 2 insufflations. Ne vous arrêtez PAS.' }, highlight: true },
      { text: { en: 'Check for injuries, bleeding, or medical ID bracelet. Note any medications they may be taking.', ar: 'افحص الإصابات، النزيف، أو سوار الهوية الطبية. لاحظ أي أدوية قد يتناولونها.', fr: 'Vérifiez les blessures, saignements, ou bracelet d\'identité médicale. Notez les médicaments qu\'elle pourrait prendre.' } },
      { text: { en: 'Keep the person warm with a blanket or coat. Do NOT give food or drink.', ar: 'أبقِ الشخص دافئاً ببطانية أو معطف. لا تعطِ طعاماً أو شراباً.', fr: 'Gardez la personne au chaud avec une couverture ou un manteau. Ne donnez PAS de nourriture ou boisson.' } },
      { text: { en: 'Monitor breathing continuously. Be ready to start or resume CPR if breathing stops.', ar: 'راقب التنفس باستمرار. كن مستعداً لبدء أو استئناف الإنعاش إذا توقف التنفس.', fr: 'Surveillez la respiration en continu. Soyez prêt à commencer ou reprendre le RCR si la respiration s\'arrête.' } },
      { text: { en: 'If they vomit: turn them onto their side immediately to prevent choking.', ar: 'إذا تقيأ: اقلبه على جانبه فوراً لمنع الاختناق.', fr: 'Si elle vomit : tournez-la sur le côté immédiatement pour prévenir l\'étouffement.' } }
    ]
  },
  {
    id: 'cardiac-arrest',
    severity: 'critical',
    icon: 'Heart',
    callEmergency: true,
    keywords: {
      en: ['not breathing', 'no pulse', 'unconscious', 'collapsed', 'cardiac', 'heart stopped', 'blue lips', 'no response', 'dead'],
      ar: ['لا يتنفس', 'لا نبض', 'فاقد الوعي', 'انهار', 'توقف القلب', 'شفاه زرقاء', 'لا استجابة', 'ميت'],
      fr: ['ne respire pas', 'pas de pouls', 'inconscient', 'effondré', 'cardiaque', 'cœur arrêté', 'lèvres bleues', 'pas de réponse', 'mort']
    },
    title: {
      en: 'Cardiac Arrest — CPR Needed',
      ar: 'توقف القلب — مطلوب الإنعاش القلبي الرئوي',
      fr: 'Arrêt Cardiaque — RCR Nécessaire'
    },
    warning: {
      en: 'START CPR IMMEDIATELY. Call emergency services NOW.',
      ar: 'ابدأ الإنعاش القلبي الرئوي فوراً. اتصل بالخدمات الطارئة الآن.',
      fr: 'COMMENCEZ LE RCR IMMÉDIATEMENT. Appelez les secours MAINTENANT.'
    },
    steps: [
      { text: { en: 'Call emergency services (911/112/999) or ask someone to call.', ar: 'اتصل بالطوارئ (911/112/999) أو اطلب من شخص الاتصال.', fr: 'Appelez les secours (911/112/999) ou demandez à quelqu\'un d\'appeler.' }, highlight: true },
      { text: { en: 'Place person flat on their back on a firm surface.', ar: 'اضع الشخص مستلقياً على ظهره على سطح صلب.', fr: 'Placez la personne à plat dos sur une surface ferme.' } },
      { text: { en: 'Kneel beside their chest. Place heel of one hand on center of chest.', ar: 'اركع بجانب صدره. ضع كعب يدك على وسط الصدر.', fr: 'Agenouillez-vous à côté de sa poitrine. Placez le talon de votre main au centre de la poitrine.' } },
      { text: { en: 'Push hard and fast: 100-120 compressions per minute. Depth: 2 inches (5 cm).', ar: 'اضغط بقوة وسرعة: 100-120 ضغطة في الدقيقة. العمق: 5 سم.', fr: 'Poussez fort et vite : 100-120 compressions par minute. Profondeur : 5 cm.' }, highlight: true },
      { text: { en: 'Let chest fully rise between pushes. Do NOT stop.', ar: 'دع الصدر يرتفع تماماً بين الضغطات. لا تتوقف.', fr: 'Laissez la poitrine se relever complètement entre les poussées. Ne vous arrêtez PAS.' } },
      { text: { en: 'If trained: give 2 rescue breaths after every 30 compressions.', ar: 'إذا كنت مدرباً: أعطِ نفسين إنقاذيين بعد كل 30 ضغطة.', fr: 'Si formé : donnez 2 insufflations après chaque 30 compressions.' } },
      { text: { en: 'Continue until emergency services arrive or person shows signs of life.', ar: 'استمر حتى وصول الطوارئ أو حتى يظهر الشخص علامات الحياة.', fr: 'Continuez jusqu\'à l\'arrivée des secours ou jusqu\'à ce que la personne montre des signes de vie.' } },
      { text: { en: 'Use an AED if available. Turn it on and follow voice instructions.', ar: 'استخدم جهاز إزالة الرجفان إن كان متوفراً. شغله واتبع التعليمات الصوتية.', fr: 'Utilisez un DAE si disponible. Allumez-le et suivez les instructions vocales.' } }
    ]
  },
  {
    id: 'severe-bleeding',
    severity: 'critical',
    icon: 'Droplets',
    callEmergency: true,
    keywords: {
      en: ['bleeding', 'blood', 'wound', 'cut', 'gushing', 'hemorrhage', 'bleeding out', 'lots of blood', 'deep cut'],
      ar: ['نزيف', 'دم', 'جرح', 'قطع', 'ينزف', 'نزيف حاد', 'كثير من الدم', 'جرح عميق'],
      fr: ['saignement', 'sang', 'blessure', 'coupure', 'hémorragie', 'perd du sang', 'beaucoup de sang', 'coupure profonde']
    },
    title: {
      en: 'Severe Bleeding',
      ar: 'نزيف حاد',
      fr: 'Saignement Sévère'
    },
    warning: {
      en: 'Act fast. Severe bleeding can cause death in minutes.',
      ar: 'تحرك بسرعة. النزيف الحاد يمكن أن يسبب الوفاة في دقائق.',
      fr: 'Agissez vite. Un saignement sévère peut causer la mort en minutes.'
    },
    steps: [
      { text: { en: 'Call emergency services immediately.', ar: 'اتصل بالطوارئ فوراً.', fr: 'Appelez les secours immédiatement.' }, highlight: true },
      { text: { en: 'Apply DIRECT pressure on the wound with a clean cloth or your hand.', ar: 'اضغط مباشرة على الجرح بقطعة قماش نظيفة أو بيدك.', fr: 'Appliquez une pression DIRECTE sur la blessure avec un tissu propre ou votre main.' }, highlight: true },
      { text: { en: 'Press HARD. Do NOT lift the cloth to check — this releases clots.', ar: 'اضغط بقوة. لا ترفع القماش للتفقد — هذا يفكك الجلطات.', fr: 'Pressez FORT. Ne soulevez PAS le tissu pour vérifier — cela libère les caillots.' } },
      { text: { en: 'If blood soaks through, add MORE cloths on top. Do NOT remove the first layer.', ar: 'إذا نقع الدم القماش، أضف المزيد فوقه. لا تزيل الطبقة الأولى.', fr: 'Si le sang traverse, ajoutez PLUS de tissus par-dessus. Ne retirez PAS la première couche.' } },
      { text: { en: 'If bleeding is on a limb, raise the limb above heart level if possible.', ar: 'إذا كان النزيف في طرف، ارفع الطرف فوق مستوى القلب إن أمكن.', fr: 'Si le saignement est sur un membre, levez le membre au-dessus du niveau du cœur si possible.' } },
      { text: { en: 'If bleeding won\'t stop and help is far: use a tourniquet 2-3 inches above the wound.', ar: 'إذا لم يتوقف النزيف والمساعدة بعيدة: استخدم رباط ضاغط فوق الجرح بـ 5-8 سم.', fr: 'Si le saignement ne s\'arrête pas et que l\'aide est loin : utilisez un garrot 5-8 cm au-dessus de la blessure.' } },
      { text: { en: 'Note the time the tourniquet was applied. Do NOT loosen it.', ar: 'دوّن وقت وضع الرباط. لا تخفف الضغط.', fr: 'Notez l\'heure d\'application du garrot. Ne le relâchez PAS.' } },
      { text: { en: 'Keep the person warm and lying down. Reassure them.', ar: 'أبقِ الشخص دافئاً ومستلقياً. طمأنه.', fr: 'Gardez la personne au chaud et allongée. Rassurez-la.' } }
    ]
  },
  {
    id: 'choking',
    severity: 'critical',
    icon: 'Wind',
    callEmergency: true,
    keywords: {
      en: ['choking', 'can\'t breathe', 'something stuck', 'throat', 'gasping', 'turning blue', 'food stuck'],
      ar: ['اختناق', 'لا يستطيع التنفس', 'شيء عالق', 'حلق', 'يلهث', 'يتحول للون الأزرق', 'طعام عالق'],
      fr: ['étouffement', 'ne peut pas respirer', 'quelque chose coincé', 'gorge', 'haletant', 'devient bleu', 'nourriture coincée']
    },
    title: {
      en: 'Choking',
      ar: 'اختناق',
      fr: 'Étouffement'
    },
    warning: {
      en: 'If the person cannot speak, cough, or breathe — ACT NOW.',
      ar: 'إذا لم يستطع الشخص الكلام أو السعال أو التنفس — تحرك الآن.',
      fr: 'Si la personne ne peut pas parler, tousser ou respirer — AGISSEZ MAINTENANT.'
    },
    steps: [
      { text: { en: 'Ask: "Are you choking?" If they nod or cannot speak, act immediately.', ar: 'اسأل: "هل تختنق؟" إذا أومأ برأسه أو لم يستطع الكلام، تحرك فوراً.', fr: 'Demandez : "Vous étouffez ?" S\'il hoche la tête ou ne peut pas parler, agissez immédiatement.' } },
      { text: { en: 'Call emergency services. Put phone on speaker.', ar: 'اتصل بالطوارئ. ضع الهاتف على مكبر الصوت.', fr: 'Appelez les secours. Mettez le téléphone en haut-parleur.' } },
      { text: { en: 'Stand behind the person. Wrap your arms around their waist.', ar: 'قف خلف الشخص. لف ذراعيك حول خصره.', fr: 'Debout derrière la personne. Enroulez vos bras autour de sa taille.' } },
      { text: { en: 'Make a fist. Place thumb side against their belly, just above the navel.', ar: 'أغلق قبضتك. ضع جانب الإبهام على بطنه، فوق السرة مباشرة.', fr: 'Fermez le poing. Placez le côté du pouce contre son ventre, juste au-dessus du nombril.' } },
      { text: { en: 'Grab your fist with your other hand. Pull inward and UP sharply.', ar: 'امسك قبضتك باليد الأخرى. اسحب للداخل وللأعلى بقوة.', fr: 'Saisissez votre poing avec l\'autre main. Tirez vers l\'intérieur et VERS LE HAUT violemment.' }, highlight: true },
      { text: { en: 'Repeat thrusts until object comes out or person becomes unconscious.', ar: 'كرر الدفعات حتى يخرج الجسم أو يفقد الشخص الوعي.', fr: 'Répétez les poussées jusqu\'à ce que l\'objet sorte ou que la personne devienne inconsciente.' } },
      { text: { en: 'If unconscious: start CPR. Check mouth for object before breaths.', ar: 'إذا فقد الوعي: ابدأ الإنعاش. افحص الفم بحثاً عن الجسم قبل النفخات.', fr: 'Si inconscient : commencez le RCR. Vérifiez la bouche pour un objet avant les insufflations.' } }
    ]
  },
  {
    id: 'stroke',
    severity: 'critical',
    icon: 'Brain',
    callEmergency: true,
    keywords: {
      en: ['stroke', 'face drooping', 'arm weakness', 'slurred speech', 'confused', 'can\'t talk', 'one side', 'numb', 'dizzy', 'severe headache'],
      ar: ['سكتة دماغية', 'تدلي الوجه', 'ضعف الذراع', 'كلام متلعثم', 'مرتبك', 'لا يستطيع الكلام', 'جانب واحد', 'خدر', 'دوار', 'صداع شديد'],
      fr: ['AVC', 'visage qui tombe', 'faiblesse du bras', 'parole confuse', 'confus', 'ne peut pas parler', 'un côté', 'engourdi', 'vertige', 'maux de tête sévères']
    },
    title: {
      en: 'Possible Stroke',
      ar: 'احتمال سكتة دماغية',
      fr: 'Possible AVC'
    },
    warning: {
      en: 'Time is brain. Every minute counts. Call emergency NOW.',
      ar: 'الوقت هو الدماغ. كل دقيقة مهمة. اتصل بالطوارئ الآن.',
      fr: 'Le temps c\'est le cerveau. Chaque minute compte. Appelez les secours MAINTENANT.'
    },
    steps: [
      { text: { en: 'Call emergency services IMMEDIATELY. Say "possible stroke".', ar: 'اتصل بالطوارئ فوراً. قل "احتمال سكتة دماغية".', fr: 'Appelez les secours IMMÉDIATEMENT. Dites "possible AVC".' }, highlight: true },
      { text: { en: 'FAST check: Face — ask them to smile. Arm — ask them to raise both arms. Speech — ask them to repeat a sentence.', ar: 'اختبار FAST: الوجه — اطلب منه الابتسام. الذراع — اطلب منه رفع الذراعين. الكلام — اطلب منه تكرار جملة.', fr: 'Test FAST : Visage — demandez-lui de sourire. Bras — demandez-lui de lever les deux bras. Parole — demandez-lui de répéter une phrase.' } },
      { text: { en: 'Note the EXACT time symptoms started. Tell emergency services.', ar: 'دوّن الوقت الدقيق لبدء الأعراض. أخبر الطوارئ.', fr: 'Notez l\'heure EXACTE du début des symptômes. Dites-le aux secours.' } },
      { text: { en: 'Keep the person seated or lying down with head slightly elevated.', ar: 'أبقِ الشخص جالساً أو مستلقياً برأس مرتفع قليلاً.', fr: 'Gardez la personne assise ou allongée, tête légèrement surélevée.' } },
      { text: { en: 'Do NOT give food, water, or medication.', ar: 'لا تعطِ طعاماً أو ماءً أو دواءً.', fr: 'Ne donnez PAS de nourriture, d\'eau ou de médicaments.' }, highlight: true },
      { text: { en: 'Loosen tight clothing. Keep them calm and warm.', ar: 'فكّ الملابس الضيقة. أبقِه هادئاً ودافئاً.', fr: 'Desserrez les vêtements serrés. Gardez-la calme et au chaud.' } },
      { text: { en: 'Monitor breathing. Be ready to start CPR if they become unconscious.', ar: 'راقب التنفس. كن مستعداً لبدء الإنعاش إذا فقد الوعي.', fr: 'Surveillez la respiration. Soyez prêt à commencer le RCR si elle devient inconsciente.' } }
    ]
  },
  {
    id: 'heart-attack',
    severity: 'critical',
    icon: 'Activity',
    callEmergency: true,
    keywords: {
      en: ['chest pain', 'heart attack', 'heart', 'chest tightness', 'pain arm', 'pain jaw', 'sweating', 'nausea', 'can\'t breathe chest'],
      ar: ['ألم صدر', 'ذبحة صدرية', 'قلب', 'ضيق صدر', 'ألم ذراع', 'ألم فك', 'تعرق', 'غثيان', 'لا يستطيع التنفس صدر'],
      fr: ['douleur thoracique', 'crise cardiaque', 'cœur', 'oppression thoracique', 'douleur bras', 'douleur mâchoire', 'sueurs', 'nausées', 'ne peut pas respirer poitrine']
    },
    title: {
      en: 'Possible Heart Attack',
      ar: 'احتمال ذبحة صدرية',
      fr: 'Possible Crise Cardiaque'
    },
    warning: {
      en: 'Call emergency immediately. Do NOT drive them to hospital.',
      ar: 'اتصل بالطوارئ فوراً. لا تقده إلى المستشفى.',
      fr: 'Appelez les secours immédiatement. Ne les conduisez PAS à l\'hôpital.'
    },
    steps: [
      { text: { en: 'Call emergency services NOW. Say "possible heart attack".', ar: 'اتصل بالطوارئ الآن. قل "احتمال ذبحة صدرية".', fr: 'Appelez les secours MAINTENANT. Dites "possible crise cardiaque".' }, highlight: true },
      { text: { en: 'Have the person sit or lie down in a comfortable position.', ar: 'اجعل الشخص يجلس أو يستلقي في وضعية مريحة.', fr: 'Faites asseoir ou allonger la personne dans une position confortable.' } },
      { text: { en: 'If they have prescribed nitroglycerin: help them take it.', ar: 'إذا كان لديهم نايتروجليسرين موصوف: ساعدهم في أخذه.', fr: 'S\'ils ont de la nitroglycérine prescrite : aidez-les à la prendre.' } },
      { text: { en: 'If aspirin is available and they are NOT allergic: give 325mg (or 4 x 81mg) to chew.', ar: 'إذا كان الأسبرين متوفراً وليس لديهم حساسية: أعطِ 325 ملغ (أو 4 × 81 ملغ) للمضغ.', fr: 'Si de l\'aspirine est disponible et qu\'ils ne sont PAS allergiques : donnez 325mg (ou 4 x 81mg) à mâcher.' } },
      { text: { en: 'Loosen tight clothing. Keep them calm. Reassure them help is coming.', ar: 'فكّ الملابس الضيقة. أبقِه هادئاً. طمأنه أن المساعدة قادمة.', fr: 'Desserrez les vêtements serrés. Gardez-la calme. Rassurez-la que l\'aide arrive.' } },
      { text: { en: 'Monitor breathing. Be ready to start CPR if they become unconscious.', ar: 'راقب التنفس. كن مستعداً لبدء الإنعاش إذا فقد الوعي.', fr: 'Surveillez la respiration. Soyez prêt à commencer le RCR si elle devient inconsciente.' } },
      { text: { en: 'Do NOT give food, drink, or medication they are unsure about.', ar: 'لا تعطِ طعاماً أو شراباً أو دواءً غير متأكد منه.', fr: 'Ne donnez PAS de nourriture, boisson ou médicament dont ils ne sont pas sûrs.' } }
    ]
  },
  {
    id: 'burns',
    severity: 'moderate',
    icon: 'Flame',
    callEmergency: false,
    keywords: {
      en: ['burn', 'burned', 'hot', 'fire', 'scalding', 'boiling water', 'chemical burn', 'sunburn', 'blister'],
      ar: ['حرق', 'محروق', 'ساخن', 'نار', 'غليان', 'ماء مغلي', 'حروق كيميائية', 'حروق شمس', 'بثرة'],
      fr: ['brûlure', 'brûlé', 'chaud', 'feu', 'ébouillantage', 'eau bouillante', 'brûlure chimique', 'coup de soleil', 'ampoule']
    },
    title: {
      en: 'Burns',
      ar: 'حروق',
      fr: 'Brûlures'
    },
    warning: {
      en: null,
      ar: null,
      fr: null
    },
    steps: [
      { text: { en: 'Cool the burn under cool RUNNING water for at least 10 minutes.', ar: 'برد الحرق تحت ماء جاري بارد لمدة 10 دقائق على الأقل.', fr: 'Refroidissez la brûlure sous l\'eau COURANTE fraîche pendant au moins 10 minutes.' }, highlight: true },
      { text: { en: 'Remove rings, watches, or tight items near the burn BEFORE swelling starts.', ar: 'أزل الخواتم والساعات أو الأشياء الضيقة قرب الحرق قبل بدء التورم.', fr: 'Retirez les bagues, montres ou objets serrés près de la brûlure AVANT le gonflement.' } },
      { text: { en: 'Do NOT apply ice, butter, oils, or creams.', ar: 'لا تضع ثلجاً أو زبدةً أو زيوتاً أو كريمات.', fr: 'N\'appliquez PAS de glace, beurre, huiles ou crèmes.' }, highlight: true },
      { text: { en: 'Cover loosely with a sterile non-stick dressing or clean cloth.', ar: 'غطِ بشكل فضفاض بضمادة معقمة غير لاصقة أو قماش نظيف.', fr: 'Recouvrez légèrement avec un pansement stérile non adhésif ou un tissu propre.' } },
      { text: { en: 'Call emergency if: burn is larger than your palm, on face/hands/genitals, or chemical/electrical.', ar: 'اتصل بالطوارئ إذا: الحرق أكبر من راحة يدك، أو في الوجه/اليدين/الأعضاء التناسلية، أو كيميائي/كهربائي.', fr: 'Appelez les secours si : la brûlure est plus grande que votre paume, sur le visage/mains/organe génitaux, ou chimique/électrique.' } },
      { text: { en: 'For chemical burns: remove contaminated clothing. Rinse with water for 20+ minutes.', ar: 'للحروق الكيميائية: أزل الملابس الملوثة. اشطف بالماء لمدة 20+ دقيقة.', fr: 'Pour brûlures chimiques : retirez les vêtements contaminés. Rincez à l\'eau pendant 20+ minutes.' } }
    ]
  },
  {
    id: 'fracture',
    severity: 'moderate',
    icon: 'Bone',
    callEmergency: false,
    keywords: {
      en: ['broken', 'fracture', 'bone', 'twisted', 'swollen', 'can\'t move', 'deformed', 'snap', 'fallen'],
      ar: ['مكسور', 'كسر', 'عظم', 'ملتوي', 'متورم', 'لا يستطيع الحركة', 'مشوه', 'انكسر', 'سقط'],
      fr: ['cassé', 'fracture', 'os', 'tordu', 'gonflé', 'ne peut pas bouger', 'déformé', 'cassure', 'tombé']
    },
    title: {
      en: 'Possible Fracture',
      ar: 'احتمال كسر',
      fr: 'Possible Fracture'
    },
    warning: {
      en: null,
      ar: null,
      fr: null
    },
    steps: [
      { text: { en: 'Call emergency if bone is visible, person is in severe pain, or there is heavy bleeding.', ar: 'اتصل بالطوارئ إذا كان العظم ظاهراً، أو الشخص يعاني ألماً شديداً، أو هناك نزيف حاد.', fr: 'Appelez les secours si l\'os est visible, la personne a une douleur sévère, ou il y a un saignement important.' } },
      { text: { en: 'Do NOT try to straighten the bone or push it back in.', ar: 'لا تحاول تقويم العظم أو إعادته لمكانه.', fr: 'N\'essayez PAS de redresser l\'os ou de le remettre en place.' }, highlight: true },
      { text: { en: 'Immobilize the injured area. Use a splint or pad with firm objects on both sides.', ar: 'ثبّت المنطقة المصابة. استخدم جبيرة أو ضع أشياء صلبة من الجانبين.', fr: 'Immobilisez la zone blessée. Utilisez une attelle ou placez des objets fermes des deux côtés.' } },
      { text: { en: 'Pad the splint with cloth. Secure with bandages or cloth strips. Do NOT tie over the injury.', ar: 'بطّن الجبيرة بقماش. ثبّتها بضمادات أو شرائط قماش. لا تربط فوق الإصابة.', fr: 'Rembourrez l\'attelle avec du tissu. Fixez avec des bandages ou bandes de tissu. Ne liez PAS sur la blessure.' } },
      { text: { en: 'Apply ice wrapped in cloth for 10 minutes to reduce swelling.', ar: 'ضع ثلجاً ملفوفاً بقماش لمدة 10 دقائق لتقليل التورم.', fr: 'Appliquez de la glace enveloppée dans du tissu pendant 10 minutes pour réduire le gonflement.' } },
      { text: { en: 'Elevate the injured limb if possible. Check circulation beyond the injury (warmth, color, pulse).', ar: 'ارفع الطرف المصاب إن أمكن. افحص الدورة الدموية بعد الإصابة (الدفء، اللون، النبض).', fr: 'Élevez le membre blessé si possible. Vérifiez la circulation au-delà de la blessure (chaleur, couleur, pouls).' } }
    ]
  },
  {
    id: 'fainting',
    severity: 'moderate',
    icon: 'Zap',
    callEmergency: false,
    keywords: {
      en: ['fainted', 'passed out', 'unconscious briefly', 'dizzy', 'lightheaded', 'collapsed', 'blackout', 'syncope'],
      ar: ['إغماء', 'فقد الوعي مؤقتاً', 'دوار', 'دوخة', 'انهار', 'انقطاع', 'تشنج'],
      fr: ['évanoui', 'perdu connaissance', 'inconscient brièvement', 'vertige', 'étourdi', 'effondré', 'blackout', 'syncope']
    },
    title: {
      en: 'Fainting / Loss of Consciousness',
      ar: 'إغماء / فقدان الوعي',
      fr: 'Évanouissement / Perte de Connaissance'
    },
    warning: {
      en: null,
      ar: null,
      fr: null
    },
    steps: [
      { text: { en: 'Lay the person flat on their back. Elevate legs 12 inches (30 cm).', ar: 'اضع الشخص مستلقياً على ظهره. ارفع ساقيه 30 سم.', fr: 'Allongez la personne à plat dos. Élevez les jambes de 30 cm.' }, highlight: true },
      { text: { en: 'Loosen tight clothing, especially around neck and waist.', ar: 'فكّ الملابس الضيقة، خاصة حول الرقبة والخصر.', fr: 'Desserrez les vêtements serrés, surtout autour du cou et de la taille.' } },
      { text: { en: 'Check that they are breathing. If not, call emergency and start CPR.', ar: 'تأكد من أنه يتنفس. إذا لم يكن، اتصل بالطوارئ وابدأ الإنعاش.', fr: 'Vérifiez qu\'elle respire. Si non, appelez les secours et commencez le RCR.' } },
      { text: { en: 'Do NOT give food or drink while unconscious.', ar: 'لا تعطِ طعاماً أو شراباً وهو فاقد الوعي.', fr: 'Ne donnez PAS de nourriture ou boisson pendant l\'inconscience.' }, highlight: true },
      { text: { en: 'If they vomit, turn them on their side to prevent choking.', ar: 'إذا تقيأ، اقلبه على جانبه لمنع الاختناق.', fr: 'Si elle vomit, tournez-la sur le côté pour prévenir l\'étouffement.' } },
      { text: { en: 'Call emergency if: fainting lasts >2 min, repeated fainting, chest pain, head injury, pregnant, elderly.', ar: 'اتصل بالطوارئ إذا: الإغماء استمر أكثر من دقيقتين، تكرار الإغماء، ألم صدر، إصابة رأس، حامل، مسن.', fr: 'Appelez les secours si : évanouissement dure >2 min, répété, douleur thoracique, blessure à la tête, enceinte, personne âgée.' } }
    ]
  },
  {
    id: 'electric-shock',
    severity: 'critical',
    icon: 'Zap',
    callEmergency: true,
    keywords: {
      en: ['electric', 'shock', 'electrocuted', 'power line', 'outlet', 'wire', 'lightning', 'current', 'spark'],
      ar: ['صدمة كهربائية', 'كهرباء', 'كهرب', 'خط كهرباء', 'قابس', 'سلك', 'برق', 'تيار', 'شرارة'],
      fr: ['choc électrique', 'électrocuté', 'ligne électrique', 'prise', 'fil', 'foudre', 'courant', 'étincelle']
    },
    title: {
      en: 'Electric Shock',
      ar: 'صدمة كهربائية',
      fr: 'Choc Électrique'
    },
    warning: {
      en: 'DO NOT touch the person if they are still in contact with electricity.',
      ar: 'لا تلمس الشخص إذا كان لا يزال على اتصال بالكهرباء.',
      fr: 'Ne touchez PAS la personne si elle est encore en contact avec l\'électricité.'
    },
    steps: [
      { text: { en: 'Turn OFF the power source first. Unplug, flip breaker, or cut cable if safe.', ar: 'أطفئ مصدر الكهرباء أولاً. افصل القابس، أو اقلب القاطع، أو اقطع الكابل إن كان آمناً.', fr: 'ÉTEIGNEZ la source d\'électricité d\'abord. Débranchez, basculez le disjoncteur, ou coupez le câble si sûr.' }, highlight: true },
      { text: { en: 'If you cannot turn off power: use a dry wooden stick, rope, or rubber object to move the person away.', ar: 'إذا لم تستطع إطفاء الكهرباء: استخدم عصا خشبية جافة أو حبلاً أو جسم مطاطي لإبعاد الشخص.', fr: 'Si vous ne pouvez pas couper le courant : utilisez un bâton en bois sec, une corde ou un objet en caoutchouc pour éloigner la personne.' } },
      { text: { en: 'Do NOT use metal or wet objects. Do NOT touch the person with bare hands.', ar: 'لا تستخدم أشياء معدنية أو مبتلة. لا تلمس الشخص بيدين عاريتين.', fr: 'N\'utilisez PAS d\'objets métalliques ou mouillés. Ne touchez PAS la personne avec les mains nues.' }, highlight: true },
      { text: { en: 'Call emergency services immediately.', ar: 'اتصل بالطوارئ فوراً.', fr: 'Appelez les secours immédiatement.' } },
      { text: { en: 'Check breathing and pulse. Start CPR if needed.', ar: 'افحص التنفس والنبض. ابدأ الإنعاش إذا لزم الأمر.', fr: 'Vérifiez la respiration et le pouls. Commencez le RCR si nécessaire.' } },
      { text: { en: 'Cover burn areas with clean dry cloth. Watch for shock symptoms.', ar: 'غطِ مناطق الحرق بقماش نظيف جاف. راقب أعراض الصدمة.', fr: 'Recouvrez les zones brûlées avec un tissu propre et sec. Surveillez les symptômes de choc.' } },
      { text: { en: 'If lightning strike: victim carries NO electrical charge. It is safe to touch them.', ar: 'إذا كان البرق: الضحية لا يحمل شحنة كهربائية. من الآمن لمسه.', fr: 'En cas de foudre : la victime ne porte PAS de charge électrique. Il est sûr de la toucher.' } }
    ]
  },
  {
    id: 'allergic-reaction',
    severity: 'critical',
    icon: 'AlertTriangle',
    callEmergency: true,
    keywords: {
      en: ['allergy', 'allergic', 'swelling face', 'hives', 'anaphylaxis', 'epipen', 'bee sting', 'reaction', 'itching', 'throat closing'],
      ar: ['حساسية', 'تورم الوجه', 'شرى', 'صدمة تحسسية', 'إيبي بن', 'لدغة نحل', 'تفاعل', 'حكة', 'إغلاق الحلق'],
      fr: ['allergie', 'allergique', 'gonflement visage', 'urticaire', 'anaphylaxie', 'epipen', 'piqûre d\'abeille', 'réaction', 'démangeaisons', 'gorge qui se ferme']
    },
    title: {
      en: 'Severe Allergic Reaction',
      ar: 'تفاعل تحسسي حاد',
      fr: 'Réaction Allergique Sévère'
    },
    warning: {
      en: 'Anaphylaxis is life-threatening. Act within seconds.',
      ar: 'الصدمة التحسسية تهدد الحياة. تحرك في ثوانٍ.',
      fr: 'L\'anaphylaxie met la vie en danger. Agissez en secondes.'
    },
    steps: [
      { text: { en: 'Call emergency services immediately.', ar: 'اتصل بالطوارئ فوراً.', fr: 'Appelez les secours immédiatement.' }, highlight: true },
      { text: { en: 'If they have an EpiPen: inject into outer thigh. Can go through clothing.', ar: 'إذا كان لديهم إيبي بن: حقن في الفخذ الخارجي. يمكن عبر الملابس.', fr: 'S\'ils ont un EpiPen : injectez dans la cuisse extérieure. Peut traverser les vêtements.' }, highlight: true },
      { text: { en: 'Hold EpiPen in place for 3 seconds. Massage injection area for 10 seconds.', ar: 'ثبت الإيبي بن لمدة 3 ثوانٍ. دلك منطقة الحقن لمدة 10 ثوانٍ.', fr: 'Maintenez l\'EpiPen en place pendant 3 secondes. Massez la zone d\'injection pendant 10 secondes.' } },
      { text: { en: 'Lay person flat. Elevate legs. If breathing is hard, let them sit up.', ar: 'اضع الشخص مستلقياً. ارفع ساقيه. إذا كان التنفس صعباً، دعه يجلس.', fr: 'Allongez la personne. Élevez les jambes. Si la respiration est difficile, laissez-la s\'asseoir.' } },
      { text: { en: 'If no improvement after 5 minutes: use a second EpiPen if available.', ar: 'إذا لم يتحسن بعد 5 دقائق: استخدم إيبي بن ثانٍ إن كان متوفراً.', fr: 'Si pas d\'amélioration après 5 minutes : utilisez un second EpiPen si disponible.' } },
      { text: { en: 'Do NOT give food, drink, or antihistamines. These are too slow.', ar: 'لا تعطِ طعاماً أو شراباً أو مضادات الهيستامين. هذه بطيئة جداً.', fr: 'Ne donnez PAS de nourriture, boisson ou antihistaminiques. Ceux-ci sont trop lents.' } }
    ]
  },
  {
    id: 'seizure',
    severity: 'critical',
    icon: 'AlertOctagon',
    callEmergency: true,
    keywords: {
      en: ['seizure', 'convulsion', 'fitting', 'shaking', 'epilepsy', 'twitching', 'jerking', 'stiff', 'foaming', 'unconscious shaking'],
      ar: ['نوبة صرع', 'تشنج', 'ارتعاش', 'صرع', 'رجفان', 'تشنّج', 'تيبس', 'رغوة', 'فقد وعي مع رعشة'],
      fr: ['crise', 'convulsion', 'attaque', 'tremblements', 'épilepsie', 'twitching', 'secousses', 'raidissement', 'mousse', 'inconscient qui tremble']
    },
    title: {
      en: 'Seizure',
      ar: 'نوبة صرع',
      fr: 'Crise/Convulsion'
    },
    warning: {
      en: 'Protect from injury. Do NOT restrain. Time the seizure.',
      ar: 'حمِ من الإصابة. لا تقيد. وقّت النوبة.',
      fr: 'Protégez des blessures. Ne RESTRAIGNEZ PAS. Chronométrez la crise.'
    },
    steps: [
      { text: { en: 'Stay calm. Note the time the seizure started.', ar: 'ابقَ هادئاً. دوّن وقت بدء النوبة.', fr: 'Restez calme. Notez l\'heure de début de la crise.' } },
      { text: { en: 'Clear the area. Move dangerous objects away. Cushion their head.', ar: 'امسح المنطقة. أبعد الأشياء الخطرة. وسّد رأسه.', fr: 'Dégagez la zone. Éloignez les objets dangereux. Coussinez sa tête.' } },
      { text: { en: 'Do NOT restrain their movements. Do NOT put anything in their mouth.', ar: 'لا تقيد حركاته. لا تضع شيئاً في فمه.', fr: 'Ne RESTRAIGNEZ PAS ses mouvements. Ne mettez RIEN dans sa bouche.' }, highlight: true },
      { text: { en: 'Loosen tight clothing around neck. Turn them on their side when possible.', ar: 'فكّ الملابس الضيقة حول الرقبة. اقلبه على جانبه عندما يكون ممكناً.', fr: 'Desserrez les vêtements serrés autour du cou. Tournez-la sur le côté quand c\'est possible.' } },
      { text: { en: 'Call emergency if: seizure lasts >5 min, repeated seizures, first ever seizure, pregnant, injured, or water involved.', ar: 'اتصل بالطوارئ إذا: النوبة استمرت أكثر من 5 دقائق، نوبات متكررة، أول نوبة، حامل، مصاب، أو تورط ماء.', fr: 'Appelez les secours si : crise dure >5 min, crises répétées, première crise, enceinte, blessée, ou eau impliquée.' } },
      { text: { en: 'After seizure stops: place in recovery position. Check breathing. Stay with them until awake.', ar: 'بعد توقف النوبة: ضعه في وضعية الاسترداد. افحص التنفس. ابقَ معه حتى يستيقظ.', fr: 'Après la fin de la crise : placez-la en position latérale de sécurité. Vérifiez la respiration. Restez avec elle jusqu\'à ce qu\'elle se réveille.' } }
    ]
  },
  {
    id: 'poisoning',
    severity: 'critical',
    icon: 'Skull',
    callEmergency: true,
    keywords: {
      en: ['poison', 'swallowed', 'toxic', 'chemical', 'overdose', 'pill', 'medicine', 'cleaning product', 'pesticide', 'gas'],
      ar: ['تسمم', 'ابتلع', 'سام', 'كيميائي', 'جرعة زائدة', 'حبة', 'دواء', 'منظف', 'مبيد', 'غاز'],
      fr: ['empoisonnement', 'avalé', 'toxique', 'chimique', 'surdosage', 'pilule', 'médicament', 'produit de nettoyage', 'pesticide', 'gaz']
    },
    title: {
      en: 'Poisoning / Overdose',
      ar: 'تسمم / جرعة زائدة',
      fr: 'Empoisonnement / Surdosage'
    },
    warning: {
      en: 'Do NOT induce vomiting unless instructed by poison control.',
      ar: 'لا تحفز القيء إلا إذا أُمرت بذلك من مركز التسمم.',
      fr: 'Ne provoquez PAS de vomissements sauf si instructé par le centre anti-poison.'
    },
    steps: [
      { text: { en: 'Call emergency services AND poison control immediately.', ar: 'اتصل بالطوارئ ومركز التسمم فوراً.', fr: 'Appelez les secours ET le centre anti-poison immédiatement.' }, highlight: true },
      { text: { en: 'Do NOT induce vomiting. Do NOT give food or drink.', ar: 'لا تحفز القيء. لا تعطِ طعاماً أو شراباً.', fr: 'Ne provoquez PAS de vomissements. Ne donnez PAS de nourriture ou boisson.' }, highlight: true },
      { text: { en: 'Try to identify the poison. Save the container or label.', ar: 'حاول تحديد السم. احتفظ بالعبوة أو الملصق.', fr: 'Essayez d\'identifier le poison. Conservez le contenant ou l\'étiquette.' } },
      { text: { en: 'If poison is on skin: remove contaminated clothing. Rinse skin with water for 15 minutes.', ar: 'إذا كان السم على الجلد: أزل الملابس الملوثة. اشطف الجلد بالماء لمدة 15 دقيقة.', fr: 'Si le poison est sur la peau : retirez les vêtements contaminés. Rincez la peau à l\'eau pendant 15 minutes.' } },
      { text: { en: 'If poison is in eyes: rinse with clean water for 15-20 minutes.', ar: 'إذا كان السم في العينين: اشطف بالماء النظيف لمدة 15-20 دقيقة.', fr: 'Si le poison est dans les yeux : rincez à l\'eau propre pendant 15-20 minutes.' } },
      { text: { en: 'If gas or fumes: move person to fresh air immediately.', ar: 'إذا كان غازاً أو أبخرة: انقل الشخص إلى هواء نقي فوراً.', fr: 'Si gaz ou vapeurs : déplacez la personne à l\'air frais immédiatement.' } },
      { text: { en: 'Monitor breathing. Be ready to start CPR if unconscious.', ar: 'راقب التنفس. كن مستعداً لبدء الإنعاش إذا فقد الوعي.', fr: 'Surveillez la respiration. Soyez prêt à commencer le RCR si inconsciente.' } }
    ]
  },
  {
    id: 'drowning',
    severity: 'critical',
    icon: 'Waves',
    callEmergency: true,
    keywords: {
      en: ['drowning', 'water', 'pool', 'swimming', 'submerged', 'underwater', 'can\'t swim', 'sinking', 'ocean', 'lake'],
      ar: ['غرق', 'ماء', 'مسبح', 'سباحة', 'غمر', 'تحت الماء', 'لا يستطيع السباحة', 'يغرق', 'محيط', 'بحيرة'],
      fr: ['noyade', 'eau', 'piscine', 'natation', 'submergé', 'sous l\'eau', 'ne sait pas nager', 'coule', 'océan', 'lac']
    },
    title: {
      en: 'Drowning / Near-Drowning',
      ar: 'غرق / شبه غرق',
      fr: 'Noyade / Noyade Imminente'
    },
    warning: {
      en: 'Get them out of water safely. Do NOT put yourself at risk.',
      ar: 'أخرجه من الماء بأمان. لا تعرّض نفسك للخطر.',
      fr: 'Sortez-la de l\'eau en toute sécurité. Ne vous mettez PAS en danger.'
    },
    steps: [
      { text: { en: 'Call for help. If safe, reach with a pole, rope, or flotation device. Do NOT enter water if untrained.', ar: 'اطلب المساعدة. إذا كان آمناً، امتد بعصا أو حبل أو جهاز طفو. لا تدخل الماء إذا لم تكن مدرباً.', fr: 'Appelez à l\'aide. Si sûr, tendez un bâton, corde ou dispositif de flottaison. N\'entrez PAS dans l\'eau si non formé.' } },
      { text: { en: 'Once out of water: check responsiveness and breathing.', ar: 'بعد إخراجه من الماء: افحص الاستجابة والتنفس.', fr: 'Une fois hors de l\'eau : vérifiez la réactivité et la respiration.' } },
      { text: { en: 'If NOT breathing: start CPR immediately. 30 compressions, then 2 rescue breaths.', ar: 'إذا لم يكن يتنفس: ابدأ الإنعاش فوراً. 30 ضغطة ثم نفسان إنقاذيان.', fr: 'Si elle ne respire PAS : commencez le RCR immédiatement. 30 compressions, puis 2 insufflations.' }, highlight: true },
      { text: { en: 'Continue CPR until emergency services arrive or person starts breathing.', ar: 'استمر بالإنعاش حتى وصول الطوارئ أو حتى يبدأ الشخص بالتنفس.', fr: 'Continuez le RCR jusqu\'à l\'arrivée des secours ou jusqu\'à ce que la personne respire.' } },
      { text: { en: 'If vomiting occurs: turn person on their side.', ar: 'إذا حدث تقيؤ: اقلب الشخص على جانبه.', fr: 'Si vomissement : tournez la personne sur le côté.' } },
      { text: { en: 'Even if they seem fine, they MUST be checked by medical professionals.', ar: 'حتى لو بدا بخير، يجب أن يفحصه مختصون طبياً.', fr: 'Même si elle semble bien, elle DOIT être examinée par des professionnels de santé.' } }
    ]
  },
  {
    id: 'nosebleed',
    severity: 'minor',
    icon: 'Droplet',
    callEmergency: false,
    keywords: {
      en: ['nosebleed', 'nose bleeding', 'blood nose', 'nose blood', 'epistaxis'],
      ar: ['نزيف أنف', 'دم أنف', 'أنف ينزف'],
      fr: ['saignement de nez', 'nez qui saigne', 'sang nez', 'épistaxis']
    },
    title: {
      en: 'Nosebleed',
      ar: 'نزيف الأنف',
      fr: 'Saignement de Nez'
    },
    warning: { en: null, ar: null, fr: null },
    steps: [
      { text: { en: 'Sit upright. Lean forward slightly. Do NOT tilt head back.', ar: 'اجلس بشكل مستقيم. احنِ للأمام قليلاً. لا تميل رأسك للخلف.', fr: 'Asseyez-vous droit. Penchez-vous légèrement en avant. Ne renversez PAS la tête en arrière.' }, highlight: true },
      { text: { en: 'Pinch the SOFT part of the nose (just below the bony bridge) firmly.', ar: 'اصرص الرأس الناعم من الأنف (تحت الجسر العظمي) بقوة.', fr: 'Pincez la partie MOULE du nez (juste sous l\'arête osseuse) fermement.' }, highlight: true },
      { text: { en: 'Hold pressure continuously for 10-15 minutes. Do NOT check early.', ar: 'استمر بالضغط باستمرار لمدة 10-15 دقيقة. لا تفحص مبكراً.', fr: 'Maintenez la pression continuellement pendant 10-15 minutes. Ne vérifiez PAS tôt.' } },
      { text: { en: 'Breathe through mouth. Spit out blood. Do NOT swallow.', ar: 'تنفس من فمك. ابصق الدم. لا تبتلع.', fr: 'Respirez par la bouche. Crachez le sang. N\'avalez PAS.' } },
      { text: { en: 'Apply cold compress to nose/cheeks if available.', ar: 'ضع كمادة باردة على الأنف/الخدين إن كان متوفراً.', fr: 'Appliquez une compresse froide sur le nez/joues si disponible.' } },
      { text: { en: 'Call emergency if: bleeding lasts >20 min, heavy bleeding, head injury, or on blood thinners.', ar: 'اتصل بالطوارئ إذا: النزيف استمر أكثر من 20 دقيقة، نزيف حاد، إصابة رأس، أو يأخذ مميعات دم.', fr: 'Appelez les secours si : saignement dure >20 min, saignement important, blessure à la tête, ou anticoagulants.' } }
    ]
  },
  {
    id: 'heat-exhaustion',
    severity: 'moderate',
    icon: 'Thermometer',
    callEmergency: false,
    keywords: {
      en: ['heat', 'hot', 'sweating', 'heat stroke', 'sun', 'overheated', 'dehydrated', 'cramps', 'exhaustion'],
      ar: ['حرارة', 'ساخن', 'تعرق', 'ضربة شمس', 'شمس', 'سخونة زائدة', 'جفاف', 'تشنجات', 'إرهاق حراري'],
      fr: ['chaleur', 'chaud', 'sueur', 'coup de chaleur', 'soleil', 'surchauffe', 'déshydraté', 'crampes', 'épuisement']
    },
    title: {
      en: 'Heat Exhaustion / Heat Stroke',
      ar: 'إرهاق حراري / ضربة شمس',
      fr: 'Épuisement / Coup de Chaleur'
    },
    warning: { en: null, ar: null, fr: null },
    steps: [
      { text: { en: 'Move person to a cool, shaded place. Remove excess clothing.', ar: 'انقل الشخص لمكان بارد ومظلل. أزل الملابس الزائدة.', fr: 'Déplacez la personne dans un endroit frais et ombragé. Retirez les vêtements en excès.' } },
      { text: { en: 'Cool the body: apply cool wet cloths to skin, fan air over them.', ar: 'برد الجسم: ضع مناشف باردة مبللة على الجلد، وجّه هواء عليه.', fr: 'Refroidissez le corps : appliquez des linges frais et humides sur la peau, ventilez de l\'air sur elle.' } },
      { text: { en: 'If awake and alert: give small sips of cool water or sports drink.', ar: 'إذا كان مستيقظاً ويقظاً: أعطِ رشفات صغيرة من ماء بارد أو مشروب رياضي.', fr: 'Si éveillée et alerte : donnez de petites gorgées d\'eau fraîche ou boisson énergétique.' } },
      { text: { en: 'Place ice packs under armpits, neck, and groin if available.', ar: 'ضع أكياس ثلج تحت الإبطين والرقبة والفخذين إن كانت متوفرة.', fr: 'Placez des glaçons sous les aisselles, le cou et l\'aine si disponibles.' } },
      { text: { en: 'Call emergency if: confused, fainting, temperature >40°C (104°F), hot dry skin, vomiting.', ar: 'اتصل بالطوارئ إذا: ارتباك، إغماء، حرارة >40°م، جلد حار جاف، تقيؤ.', fr: 'Appelez les secours si : confusion, évanouissement, température >40°C, peau chaude et sèche, vomissements.' } }
    ]
  },
  {
    id: 'hypothermia',
    severity: 'moderate',
    icon: 'Snowflake',
    callEmergency: false,
    keywords: {
      en: ['cold', 'freezing', 'shivering', 'hypothermia', 'frostbite', 'blue skin', 'low temperature', 'ice', 'snow'],
      ar: ['برد', 'تجمد', 'رجفة', 'انخفاض حرارة', 'تجمد الأطراف', 'جلد أزرق', 'حرارة منخفضة', 'ثلج'],
      fr: ['froid', 'gel', 'frissons', 'hypothermie', 'gelure', 'peau bleue', 'température basse', 'glace', 'neige']
    },
    title: {
      en: 'Hypothermia / Cold Exposure',
      ar: 'انخفاض حرارة الجسم / تعرض للبرد',
      fr: 'Hypothermie / Exposition au Froid'
    },
    warning: { en: null, ar: null, fr: null },
    steps: [
      { text: { en: 'Move person to a warm, dry shelter. Remove wet clothing.', ar: 'انقل الشخص لمأوى دافئ وجاف. أزل الملابس المبتلة.', fr: 'Déplacez la personne dans un abri chaud et sec. Retirez les vêtements mouillés.' } },
      { text: { en: 'Warm the center of the body first: chest, neck, head, groin.', ar: 'دفئ وسط الجسم أولاً: الصدر، الرقبة، الرأس، الفخذين.', fr: 'Réchauffez le centre du corps d\'abord : poitrine, cou, tête, aine.' } },
      { text: { en: 'Use dry blankets, coats, or body heat. Wrap head and neck.', ar: 'استخدم بطانيات جافة أو معاطف أو حرارة الجسم. لفّ الرأس والرقبة.', fr: 'Utilisez des couvertures sèches, manteaux ou chaleur corporelle. Enveloppez la tête et le cou.' } },
      { text: { en: 'If conscious: give warm sweet drinks. NO alcohol. NO caffeine.', ar: 'إذا كان واعياً: أعطِ مشروبات ساخنة محلاة. لا كحول. لا كافيين.', fr: 'Si consciente : donnez des boissons chaudes sucrées. PAS d\'alcool. PAS de caféine.' } },
      { text: { en: 'Do NOT rub frostbitten areas. Do NOT use hot water or direct heat.', ar: 'لا تدلك المناطق المتجمدة. لا تستخدم ماء ساخناً أو حرارة مباشرة.', fr: 'Ne frottez PAS les zones gelées. N\'utilisez PAS d\'eau chaude ou de chaleur directe.' }, highlight: true },
      { text: { en: 'Call emergency if: shivering stops, confusion, slow breathing, unconscious.', ar: 'اتصل بالطوارئ إذا: توقفت الرجفة، ارتباك، تنفس بطيء، فقدان وعي.', fr: 'Appelez les secours si : frissons s\'arrêtent, confusion, respiration lente, inconsciente.' } }
    ]
  }
];

export function getEmergencyById(id: string): EmergencyScenario | undefined {
  return emergencies.find(e => e.id === id);
}

export function searchEmergencies(query: string, lang: string): EmergencyMatch[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  
  const matches: EmergencyMatch[] = [];
  
  for (const scenario of emergencies) {
    let score = 0;
    const keywords = scenario.keywords[lang as keyof typeof scenario.keywords] || scenario.keywords.en;
    
    for (const keyword of keywords) {
      if (lowerQuery === keyword.toLowerCase()) {
        score += 100;
      } else if (keyword.toLowerCase().includes(lowerQuery)) {
        score += 50;
      } else if (lowerQuery.includes(keyword.toLowerCase())) {
        score += 30;
      }
    }
    
    // Also check title
    const title = scenario.title[lang as keyof typeof scenario.title] || scenario.title.en;
    if (title.toLowerCase().includes(lowerQuery)) {
      score += 40;
    }
    
    if (score > 0) {
      matches.push({ scenario, confidence: score });
    }
  }
  
  return matches.sort((a, b) => b.confidence - a.confidence);
}
