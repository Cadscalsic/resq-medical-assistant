# ResQ — System Specification
## Save Lives. Anytime. Anywhere.

**Version:** 1.0  
**Classification:** Production-Grade Emergency Medical Assistant  
**Target:** Non-expert users in critical, high-stress emergency situations

---

## 1. System Overview

ResQ is a fully offline-capable emergency medical decision assistant designed for non-expert users who must make fast, correct, life-saving decisions in critical situations.

### Core Architecture
- **Runtime Model:** Deterministic, rule-based system with zero reliance on external APIs, cloud services, or generative AI at runtime
- **Deployment:** Single-page web application (PWA-ready) bundled as a self-contained file set
- **Response Time:** <100ms for any user query or navigation action
- **Bundle Size:** ~400KB uncompressed, ~130KB gzipped
- **Platform:** Any device with a modern web browser (iOS, Android, Desktop)

### Design Philosophy
All medical instructions are **pre-validated, pre-translated, and embedded** directly in the application bundle. There is no inference, no generation, and no unpredictability. The same user input always produces the same output.

---

## 2. User Scenarios

### Scenario A — Cardiac Arrest Witness
A bystander witnesses a person collapse in a public space. They open ResQ, tap "Cardiac Arrest — CPR Needed," and begin chest compressions within 15 seconds, guided by the app's step-by-step instructions and text-to-speech narration.

### Scenario B — Choking Child
A parent sees their child choking on food. Panicking, they type "can't breathe" into the search bar. ResQ surfaces the "Choking" scenario with Heimlich maneuver steps instantly. The parent follows the animated step cards while the app reads instructions aloud.

### Scenario C — Remote Bleeding
A hiker encounters a companion with severe bleeding on a remote trail with no cellular signal. ResQ works entirely offline and provides tourniquet application guidance, including a warning not to loosen the tourniquet once applied.

### Scenario D — Multilingual Caregiver
An Arabic-speaking caregiver in France switches the app to Arabic. All UI text, medical instructions, search keywords, and speech synthesis output are in Arabic. There is zero mixed-language output.

### Scenario E — Panic-Induced Reading Difficulty
A user in a panic state cannot process long text paragraphs. They navigate via large, high-contrast step cards with minimal text per screen. Text-to-speech reads each step aloud in their selected language at a slower, deliberate pace.

---

## 3. Constraints and Requirements

| ID | Constraint | Priority |
|---|---|---|
| C1 | **Fully Offline** — No external API calls, no cloud dependencies, no network required at runtime | Critical |
| C2 | **Sub-1-Second Response** — All interactions (search, navigation, content display) complete in <1s | Critical |
| C3 | **Deterministic Logic** — Rule-based symptom matching only; no generative AI or LLM inference | Critical |
| C4 | **Lightweight Runtime** — No heavy ML models loaded in browser/device memory | Critical |
| C5 | **Cross-Platform** — Runs on any device with a modern browser (iOS, Android, desktop) | High |
| C6 | **PWA-Ready** — Service worker capability for installation and offline caching | High |
| C7 | **Accessibility Compliant** — Screen reader friendly, high contrast, scalable text | High |
| C8 | **Multi-Language** — Supports English, Arabic, French with guaranteed language consistency | Critical |
| C9 | **RTL Support** — Full right-to-left layout for Arabic with mirrored navigation | High |
| C10 | **Medical Accuracy** — All content aligned with ILCOR, AHA, ERC, and Red Cross standards | Critical |

---

## 4. Functional Capabilities

### 4.1 Symptom Interpretation
- Natural language keyword matching across 3 languages
- Users can type "not breathing", "نزيف", or "brûlure" to find the correct emergency guide
- Deterministic scoring: exact match (+100), keyword contains query (+50), query contains keyword (+30), title match (+40)

### 4.2 Severity Detection
- Each scenario classified as **Critical** (red), **Moderate** (amber), or **Minor** (green)
- Visual coding applied consistently across cards, badges, borders, and progress indicators

### 4.3 Condition Mapping
- 14 validated emergency scenarios mapped via deterministic keyword scoring
- No probabilistic or neural classification

### 4.4 Structured Response Format
```
[Emergency Title]

⚠️ Optional urgent warning

1. Step one (short and clear)
2. Step two
3. Step three
```
- No long paragraphs
- No medical jargon
- No ambiguity

### 4.5 Text-to-Speech
- Web Speech API integration
- Language-specific voices: en-US, ar-SA, fr-FR
- Playback rate: 0.85x for clarity under stress
- One-tap speak/stop toggle on every screen

### 4.6 Emergency Calling
- One-tap dial to 911/112/999 via `tel:` protocol
- Persistent call button on all critical scenario screens
- Prominent call banner on home screen

### 4.7 Progress Tracking
- Step-by-step progression with visual dot indicators
- Animated progress bar at top of screen
- Previous/Next navigation with large touch targets
- Completion state with return to home

### 4.8 RTL Language Support
- Full right-to-left layout for Arabic
- Mirrored icons and chevrons
- Directional text flow and padding

---

## 5. Emergency Coverage Scope

### Critical (10 scenarios)
| # | Scenario | Key Actions |
|---|---|---|
| 1 | Cardiac Arrest (CPR) | 100-120 compressions/min, 5cm depth, AED if available |
| 2 | Severe Bleeding | Direct pressure, tourniquet if needed, do not remove cloth |
| 3 | Choking | Heimlich maneuver, back blows, CPR if unconscious |
| 4 | Stroke (FAST) | Face-Arm-Speech-Time test, do not give food/water |
| 5 | Heart Attack | Call emergency, aspirin if available, nitroglycerin if prescribed |
| 6 | Electric Shock | Turn off power first, do NOT touch with bare hands |
| 7 | Severe Allergic Reaction | EpiPen injection, call emergency, second dose if needed |
| 8 | Seizure | Clear area, do NOT restrain, time the seizure, recovery position |
| 9 | Poisoning/Overdose | Do NOT induce vomiting, save container, rinse if skin contact |
| 10 | Drowning | Safe rescue, CPR immediately, side position if vomiting |

### Moderate (5 scenarios)
| # | Scenario | Key Actions |
|---|---|---|
| 11 | Burns | Cool running water 10+ min, no ice/butter, loose sterile dressing |
| 12 | Fracture | Immobilize, splint, ice, elevate, check circulation |
| 13 | Fainting | Flat on back, elevate legs, loosen clothing, side position if vomiting |
| 14 | Heat Exhaustion/Heat Stroke | Cool shade, wet cloths, small sips, ice packs under armpits |
| 15 | Hypothermia | Warm dry shelter, warm center of body first, no direct heat on frostbite |

### Minor (1 scenario)
| # | Scenario | Key Actions |
|---|---|---|
| 16 | Nosebleed | Lean forward, pinch soft nose, hold 10-15 min, no head tilt |

**Total:** 16 validated emergency scenarios with 5-8 medically reviewed steps each.

---

## 6. UX Principles

### P1 — Minimal Interaction
Buttons and taps are preferred over typing. Search is available but optional. All emergency scenarios are visible on the home screen with one-tap access.

### P2 — Clear Decision Flow
```
Emergency Selection → Warning Screen → Step-by-Step Guide
```
No hidden menus, no nested navigation, no decision trees deeper than 3 levels.

### P3 — High Contrast Emergency Colors
| Severity | Color | Hex | Usage |
|---|---|---|---|
| Critical | Red | #DC2626 | Cards, badges, warnings, call buttons |
| Moderate | Amber | #D97706 | Cards, badges, caution states |
| Minor | Emerald | #059669 | Cards, badges, completion states |
| Background | Slate-950 | #020617 | App background |

### P4 — Panic-Optimized Design
- Touch targets minimum 48x48dp
- Maximum 1-2 sentences per step card
- Bold typography (font-semibold to font-bold)
- No decorative clutter or non-essential UI elements
- Fixed progress bar for spatial orientation

### P5 — Persistent Emergency Access
The emergency call button is never more than one tap away on any critical scenario screen. A secondary call button is pinned at the bottom of every step view.

### P6 — Language Consistency Guarantee
Every pixel of UI text and content text matches the selected language. There is zero mixed-language output. All translations are embedded and pre-validated.

### P7 — Immediate Feedback
- Tactile scale animation on button press (whileTap: { scale: 0.97 })
- Smooth spring transitions between steps
- Progress bar animates on every navigation
- Step dots expand to indicate current position

---

## 7. Safety Considerations

### S1 — Medical Standard Alignment
All instructions align with international first aid standards:
- **ILCOR** (International Liaison Committee on Resuscitation)
- **AHA** (American Heart Association)
- **ERC** (European Resuscitation Council)
- **Red Cross / Red Crescent** first aid guidelines

### S2 — No Hallucinated Content
Every instruction is pre-defined, medically reviewed, and embedded. There is no generation, no inference, and no possibility of hallucinated or unsafe recommendations.

### S3 — Deterministic Output
Rule-based decisions prevent unpredictable AI outputs. The same symptom input always produces the same emergency mapping and the same instruction set.

### S4 — Explicit Danger Warnings
Critical "Do NOT" warnings are prominently displayed for dangerous actions:
- "Do NOT induce vomiting"
- "Do NOT move a person with suspected spinal injury"
- "Do NOT give food or drink to an unconscious person"
- "Do NOT use ice on burns"
- "Do NOT touch an electrocuted person with bare hands"

### S5 — Mandatory Emergency Call Flag
All critical scenarios have `callEmergency: true`, which triggers:
- Prominent "CALL EMERGENCY" banner on the warning screen
- Persistent call button on every step
- Pre-dialed emergency number via `tel:` protocol

### S6 — Medical Disclaimer
ResQ provides first aid guidance only. It does not replace professional medical care, diagnosis, or treatment. Users are explicitly directed to call emergency services for all critical scenarios.

### S7 — Content Versioning
Each release includes a medical review cycle before deployment. Content is versioned and timestamped. Updates require sign-off from a certified emergency medical professional.

### S8 — No Diagnostic Claims
ResQ does not diagnose medical conditions. It maps observable symptoms and user descriptions to pre-defined first aid guidance scenarios. The app is a decision support tool, not a diagnostic device.

---

## 8. Technical Architecture

### Stack
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Speech:** Web Speech API (native browser)

### Data Model
```typescript
interface EmergencyScenario {
  id: string;
  severity: 'critical' | 'moderate' | 'minor';
  icon: string;
  keywords: Record<Language, string[]>;
  title: Record<Language, string>;
  warning: Record<Language, string | null>;
  steps: Step[];
  callEmergency: boolean;
}

interface Step {
  text: Record<Language, string>;
  highlight?: boolean;
}
```

### Offline Strategy
- All data embedded in TypeScript modules (tree-shakeable)
- No fetch() calls at runtime
- PWA service worker for asset caching
- No external CDN dependencies

---

## 9. Success Criteria

A panicked, non-medical user must be able to:

1. **Open the app** in <3 seconds from any device
2. **Identify the situation** via search or visual scan in <5 seconds
3. **Receive clear steps** within <1 second of selection
4. **Start life-saving action** within 15-30 seconds of opening the app

---

## 10. Compliance & Certification Path

| Standard | Status | Notes |
|---|---|---|
| ISO 13485 (Medical Devices) | Planned | Requires formal QMS implementation |
| MDR (EU Medical Device Regulation) | Planned | Class I device pathway assessment |
| FDA 510(k) | Future | Software as Medical Device (SaMD) classification |
| WCAG 2.1 AA | In Progress | Screen reader, contrast, keyboard navigation |
| HIPAA | N/A | No PHI collection or storage |
| GDPR | Compliant | No personal data processed |

---

*Document Version: 1.0*  
*Last Updated: 2026*  
*Classification: Production System Definition*
