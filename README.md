# JoyVet CDS v2

Veterinary medical records system with clinical decision-support for JoyVet Care, Jimbaran, Bali.

**v1** (single 13,000-line HTML file) is on `main`. **v2** is this branch — a complete modular rebuild.

---

## Architecture

| Layer | Technology |
|---|---|
| Front end | Vanilla JS (ES modules), HTML, CSS — no framework, no bundler |
| Database | Firebase Firestore (realtime shared cloud database) |
| Storage | Firebase Storage (visit image attachments) |
| Hosting | Netlify (static file deploy) |
| Offline | Service worker (app shell cache) + Firestore IndexedDB persistence |

**Access model — open, no authentication.** This is an intentional team decision for JoyVet Care. The database is publicly readable and writable by anyone with the Firebase project ID. This is documented explicitly. **Backups are the recovery mechanism — treat weekly exports as a clinic routine.**

### File structure

```
/
├── index.html              ← <100-line shell
├── manifest.webmanifest    ← PWA manifest
├── service-worker.js       ← app-shell cache
├── /assets/logo.png
├── /css/
│   ├── tokens.css          ← all design tokens (:root variables)
│   ├── base.css            ← reset, layout, sidebar nav
│   ├── components.css      ← cards, buttons, forms, modals, badges
│   └── print.css           ← A4 print layout
├── /js/
│   ├── config.js           ← Firebase config (committed; client-side by design)
│   ├── app.js              ← entry: router, SW, network monitor
│   ├── router.js           ← hash-based routing
│   ├── api.js              ← ONLY file that touches Firebase SDK
│   ├── state.js            ← in-memory app state
│   ├── backup.js           ← JSON export/import + overdue-backup check
│   ├── /engine/
│   │   ├── diagnose.js     ← pure scoring engine (unit-testable)
│   │   └── dosing.js       ← structured dose calculator, hard ceilings
│   ├── /views/             ← one file per view/page
│   ├── /components/        ← form-field, accordion, modal
│   └── /data/
│       ├── kb-conditions.js   ← 313 conditions (see §Condition Count)
│       ├── kb-drugs.js        ← 32 structured drugs with maxTotalMg
│       ├── kb-vitals.js       ← species vital-sign reference ranges
│       └── kb-wellness.js     ← vaccines, parasite protocols, BCS, dental
├── /firebase/
│   └── firestore.rules     ← open read/write (documented)
└── /tests/
    └── engine.test.html    ← in-browser engine golden tests
```

---

## §1 — Firebase Setup

### 1. Create the Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a new project.
2. In **Build → Firestore Database**, click "Create database" → Start in **production mode** → choose a region (suggest `asia-southeast1` — Singapore, nearest to Bali).
3. In **Build → Storage**, enable Firebase Storage.

### 2. Get the config object

1. In Project Settings → General → Your apps, click the web icon (`</>`).
2. Register the app, copy the `firebaseConfig` object.
3. Open `js/config.js` and replace the placeholder values with your real values.

### 3. Apply Firestore security rules

```bash
# Install Firebase CLI if you don't have it
npm install -g firebase-tools
firebase login
firebase init firestore   # point to your project
firebase deploy --only firestore:rules
```

Or paste the contents of `firebase/firestore.rules` directly in the Firestore console → Rules tab.

### 4. Required Firestore composite indexes

Firestore requires composite indexes for multi-field queries. Create these in the Firebase console → Firestore → Indexes:

| Collection | Fields | Order |
|---|---|---|
| `visits` | `date` | Descending |
| `patients` | `ownerId` ASC, `name` ASC | Ascending |
| `visits` | `patientId` ASC, `date` DESC | Mixed |
| `owners` | `name` ASC | Ascending |
| `patients` | `name` ASC | Ascending |
| `patients` | `microchip` ASC | Ascending |

> When you first use the app, Firestore will log errors with direct links to create any missing indexes — click those links.

### 5. Enable scheduled backups (MANDATORY)

1. In Firebase console → **Firestore Database → Backups**.
2. Enable **Scheduled backups** to Cloud Storage — daily or weekly.
3. Choose a Cloud Storage bucket in the same region.

This is the automated safety net. The app's built-in JSON export is the manual layer. **Both are needed** because the database is open.

---

## §2 — Netlify Deploy

1. Fork or push the repo to GitHub.
2. In [Netlify](https://netlify.com), "Add new site → Import from Git".
3. Set build command: *(blank — static files, no build step)*.
4. Set publish directory: `/` (root).
5. Deploy.

The service worker will activate on the first load and cache the app shell for offline use.

---

## §3 — Condition Count Audit

The v2 knowledge base contains **313 conditions** migrated from v1 and reformatted to the v2 schema.

| Category | Conditions |
|---|---|
| Dermatology | 24 |
| Dermatology / Immunology | 7 |
| Ophthalmology | 11 |
| Neurology | 11 |
| Toxicology | 9 |
| Infectious Disease | 9 |
| Respiratory | 7 |
| Oncology | 7 |
| Gastroenterology | 7 |
| Endocrinology | 7 |
| Cardiology | 6 |
| Gastroenterology / Hepatology | 6 |
| Reproductive | 5 |
| Nephrology | 4 |
| Orthopedics | 3+ |
| Hematology | 3+ |
| Exotic | 7+ |
| Emergency | 7+ |
| Other (mixed categories) | ~120 |

**Completeness:**
- **281 complete** — 3 or more positive signals, tests, and treatment documented
- **32 thin stubs** — fewer than 3 signals; retained for coverage but will rank low

Stubs are conditions where the v1 knowledge base had incomplete signal data. They appear in results only when the few signals they do carry are matched. They are not removed because even a low-ranked result is better than no result for a rare condition.

---

## §4 — Clinical Disclaimer

JoyVet CDS provides **clinical decision support only**. All diagnoses, treatment plans, and medication doses are the sole responsibility of the attending veterinarian and must be independently verified against current formularies and local clinical guidelines. This software does not replace professional veterinary judgement.

The diagnostic engine reports **match strength** (Strong / Moderate / Weak) — never "confidence." Match strength reflects how strongly the input signals correlate with a condition's known presentation, weighted by prevalence priors. It is not a probability and not a diagnosis.

---

## §5 — Open-Access Risk & Backup Routine

**The database is publicly accessible.** Anyone who knows the Firebase project ID can read or write all records. This is a deliberate team decision for JoyVet Care.

**Risks:** automated bots scraping the database; malicious or accidental deletion; accidental data corruption from an unvetted device.

**Recovery:** regular JSON backups. The recommended routine:

| Frequency | Action |
|---|---|
| Weekly | Settings → Export all data → save file off-device (email, Google Drive, USB) |
| Always | Firebase scheduled backup to Cloud Storage (§1 step 5) — set this up once |
| After large data entry | Manual export |

The app shows a banner if no export has been made in 7 days. **Treat it as a clinical reminder, not a nuisance.**

---

## §6 — How to Add a Condition

1. Open `js/data/kb-conditions.js`.
2. Add a new object to the `CONDITIONS` array following this shape:

```js
{
  id: 'unique_snake_case_id',
  name: 'Human-Readable Name',
  species: ['dog', 'cat'],             // dog | cat | rabbit | bird | exotic | other
  category: 'Dermatology',
  prevalence: 'common',               // common | uncommon | rare
  signals: {
    signal_key: weight,               // weight 1–10; higher = stronger indicator
    // ... more signals
  },
  pathognomonic: {
    signal_key: 35,                   // weight = 35; use for near-specific findings
  },
  contraSignals: {
    signal_key: -8,                   // negative weight; reduces score when present
  },
  vitalSignals: {
    tempHigh: 6,                      // vital flag key + weight; grade multiplied at runtime
  },
  tests: {
    tier1: ['First-line tests'],
    tier2: ['Second-line tests'],
    tier3: ['Specialist/advanced tests'],
  },
  treatment: {
    medications: ['Drug name dose route frequency'],
    procedures: ['Procedure'],
    diet: [],
  },
  clientEducation: {
    monitor: ['What to watch for'],
    red_flags: ['When to return immediately'],
    followup: 'Recheck in X weeks',
    prognosis: 'good | fair | guarded | poor',
  },
  emergency: false,  // set true for conditions requiring immediate stabilisation
}
```

Signal keys come from the anamnesis and physical exam checkboxes in `visit-diagnostic.js`. Match your new condition's signals to those keys.

---

## §7 — How to Add a Drug

Open `js/data/kb-drugs.js` and add to the `DRUGS` array:

```js
{
  id: 'drug_id',
  name: 'Drug Name',
  species: ['dog', 'cat'],
  route: 'PO',                  // PO | SC | IM | IV | topical
  mgPerKgLow: 5,
  mgPerKgHigh: 10,
  maxTotalMg: 500,              // REQUIRED — hard ceiling, never null or Infinity
  frequency: 'BID',
  notes: 'Safety notes, breed cautions, food interactions',
}
```

`maxTotalMg` is mandatory and enforced by the dosing engine. If no published ceiling exists, use a conservative clinical estimate and document it in `notes`.

---

## §8 — Running the Tests

```bash
# Start a local web server from the repo root
python3 -m http.server 8080
# Then open:
# http://localhost:8080/tests/engine.test.html
```

All tests must pass before merging to `main`. Tests cover:
- KB integrity (all 313 conditions have required fields)
- Vital flag computation (graded, not binary)
- Diagnostic engine golden cases (FAD, cat respiratory, GDV, contra-signal suppression, species filtering)
- Dosing engine safety (correct calculations, ceiling clamping, species mismatch, invalid weight, MDR1 warning)
- Banned word check (the word "confidence" must not appear in engine output)

---

## §9 — PR Checklist (Acceptance)

Before merging `v2` → `main`, all of the following must be confirmed:

- [ ] App deploys to Netlify; reads and writes Firestore successfully
- [ ] No file exceeds ~400 lines; only `api.js` imports Firebase
- [ ] Records created on one device appear on another (realtime sync)
- [ ] Owner → Patient → Diagnostic visit → save → reopen: no data loss
- [ ] Wellness visit appears in patient timeline
- [ ] Delete owner/patient shows confirmation with affected counts, cascades cleanly
- [ ] Engine output uses "match strength," never "confidence"
- [ ] Dose calculator clamps to `maxTotalMg`, flags capped doses
- [ ] `tests/engine.test.html` all pass
- [ ] JSON export downloads; import restores; 7-day banner fires
- [ ] Offline banner shows on network loss; writes queue
- [ ] Fully keyboard-operable; all inputs labelled; no console errors
- [ ] Mobile (≤480px) renders without horizontal scroll; print fits A4
- [ ] README documents Firebase setup, scheduled backups, condition count, open-access risk
