/**
 * kb-wellness.js
 * Wellness visit reference data — vaccines, parasite protocols, BCS, dental grading, nutrition.
 * Pure data module — no Firebase, no DOM.
 */

// ─── BODY CONDITION SCORE ─────────────────────────────────────────────────────
// WSAVA Body Condition Score scale 1–9.
// Source: WSAVA Global Nutrition Committee BCS charts (dog & cat, 2013).

export const BCS_SCALE = [
  {
    score:       1,
    label:       'Emaciated',
    description: 'Ribs, lumbar vertebrae, pelvic bones and all bony prominences evident from a distance. No discernible body fat. Obvious loss of muscle mass.',
  },
  {
    score:       2,
    label:       'Very Thin',
    description: 'Ribs easily visible on shorthaired pets. Lumbar vertebrae obvious. Pelvic bones becoming prominent. No palpable fat. Some loss of muscle mass.',
  },
  {
    score:       3,
    label:       'Thin',
    description: 'Ribs easily palpated and may be visible with no palpable fat. Tops of lumbar vertebrae visible. Pelvic bones becoming prominent. Obvious waist and abdominal tuck.',
  },
  {
    score:       4,
    label:       'Underweight',
    description: 'Ribs easily palpable with minimal fat covering. Waist easily noted when viewed from above. Abdominal tuck evident.',
  },
  {
    score:       5,
    label:       'Ideal',
    description: 'Ribs palpable without excess fat covering. Waist observed behind ribs when viewed from above. Abdomen tucked up when viewed from the side.',
  },
  {
    score:       6,
    label:       'Slightly Overweight',
    description: 'Ribs palpable with slight excess fat covering. Waist discernible from above but not prominent. Abdominal tuck apparent.',
  },
  {
    score:       7,
    label:       'Overweight',
    description: 'Ribs palpable with difficulty; heavy fat cover. Noticeable fat deposits over lumbar area and base of tail. Waist absent or barely visible. Abdominal tuck may be absent.',
  },
  {
    score:       8,
    label:       'Obese',
    description: 'Ribs not palpable under very heavy fat cover, or palpable only with significant pressure. Heavy fat deposits over lumbar area and base of tail. Waist absent. No abdominal tuck; obvious abdominal distension.',
  },
  {
    score:       9,
    label:       'Grossly Obese',
    description: 'Massive fat deposits over thorax, spine and base of tail. Waist absent. No abdominal tuck. Obvious abdominal distension. Fat deposits on neck and limbs. Patient may be unable to perform normal activities.',
  },
];

// ─── VACCINE SCHEDULES ────────────────────────────────────────────────────────
// Sources: WSAVA Guidelines for the Vaccination of Dogs and Cats (2022),
//          Indonesian Permentan No. 4 Tahun 2019 (Rabies endemic provinces).

export const VACCINE_SCHEDULES = {
  dog: {
    core: [
      {
        name:     'Distemper-Parvo-Hepatitis (DHPPi)',
        alias:    'DA2PP / Hexadog',
        schedule: 'Puppy: 6–8 weeks, 10–12 weeks, 14–16 weeks; Booster at 1 year then q3 years',
        wsava:    'Core',
        notes:    '',
      },
      {
        name:     'Rabies',
        alias:    '',
        schedule: 'First dose ≥12 weeks; annual booster per local regulation',
        wsava:    'Core in endemic areas',
        notes:    'Indonesian regulation: Permentan No. 4/2019 — annual mandatory vaccination in endemic provinces. Inform clients of legal requirement.',
      },
    ],
    nonCore: [
      {
        name:     'Leptospirosis',
        alias:    '',
        schedule: 'Annual in endemic or wet areas; initial 2-dose series 3–4 weeks apart',
        wsava:    'Non-core',
        notes:    'Highly recommended in Bali and other tropical climates. Zoonotic risk — counsel owners.',
      },
      {
        name:     'Bordetella bronchiseptica (Kennel Cough)',
        alias:    '',
        schedule: 'Annual for social, boarding, or working dogs',
        wsava:    'Non-core',
        notes:    '',
      },
    ],
  },

  cat: {
    core: [
      {
        name:     'Feline Panleukopenia-Herpesvirus-Calicivirus (FVRCP)',
        alias:    'Triple / F3',
        schedule: 'Kitten: 8–9 weeks, 12 weeks, 16 weeks; Booster at 1 year then q3 years',
        wsava:    'Core',
        notes:    '',
      },
      {
        name:     'Rabies',
        alias:    '',
        schedule: 'First dose ≥12 weeks; annual booster per local regulation',
        wsava:    'Core in endemic areas',
        notes:    'See Indonesian Permentan No. 4/2019.',
      },
    ],
    nonCore: [
      {
        name:     'FeLV (Feline Leukaemia Virus)',
        alias:    '',
        schedule: 'Kittens and outdoor cats; initial 2-dose series 3–4 weeks apart, then annual',
        wsava:    'Non-core',
        notes:    'Recommended for outdoor cats or multi-cat households. Test for FeLV/FIV before vaccinating.',
      },
    ],
  },

  rabbit: {
    core: [
      {
        name:     'Myxomatosis + RHDV1/RHDV2',
        alias:    '',
        schedule: 'Annual (where licensed vaccine is available)',
        wsava:    'Core where endemic',
        notes:    'Combined myxomatosis/RHDV2 vaccines preferred. Availability varies by country.',
      },
    ],
    nonCore: [],
  },
};

// ─── PARASITE PROTOCOLS ───────────────────────────────────────────────────────
// Sources: ESCCAP Guidelines (GL1 Worms, GL3 Ectoparasites), CAPC 2023.
// IMPORTANT: Healthy adult dogs and cats require q3-monthly (quarterly) deworming.
// Monthly deworming in adults is incorrect and not evidence-based.

export const PARASITE_PROTOCOLS = {
  dog: {
    ectoparasite: {
      product:   'Isoxazoline (Fluralaner / Afoxolaner / Sarolaner)',
      frequency: 'q4–12 weeks depending on product',
      notes:     'Year-round use recommended in tropical climates. Use with caution in dogs with seizure history.',
    },
    endoparasite: {
      adult: {
        frequency: 'q3 months (quarterly)',
        products:  ['Milbemycin oxime', 'Fenbendazole', 'Praziquantel combination'],
        notes:     'ESCCAP recommendation: quarterly in healthy adults. Monthly deworming is NOT recommended for adults.',
      },
      puppy: {
        frequency: 'Every 2 weeks until 12 weeks of age, then monthly until 6 months, then quarterly',
        products:  ['Pyrantel', 'Fenbendazole'],
        notes:     'Begin from 2 weeks of age. Treat dam concurrently.',
      },
    },
    heartworm: {
      frequency: 'Monthly preventive in endemic areas',
      products:  ['Milbemycin oxime', 'Selamectin'],
      notes:     'Test annually with antigen test if on prevention. Confirm negative before starting in adult dogs.',
    },
  },

  cat: {
    ectoparasite: {
      product:   'Selamectin or Fluralaner (cat-approved dose only)',
      frequency: 'Monthly to q12 weeks depending on product',
      notes:     'Never use dog-formulation isoxazolines at dog doses in cats. Confirm label species before dispensing.',
    },
    endoparasite: {
      adult: {
        frequency: 'q3 months (quarterly)',
        products:  ['Pyrantel + Praziquantel', 'Fenbendazole'],
        notes:     'ESCCAP: quarterly for healthy adult cats. Monthly deworming is NOT recommended for adults.',
      },
      kitten: {
        frequency: 'Every 2 weeks until 12 weeks of age, then monthly until 6 months, then quarterly',
        products:  ['Pyrantel'],
        notes:     'Begin from 3 weeks of age. Treat queen concurrently.',
      },
    },
  },
};

// ─── DENTAL GRADING ───────────────────────────────────────────────────────────
// Source: AVDC (American Veterinary Dental College) periodontal staging system.

export const DENTAL_GRADES = [
  {
    grade:       'PD0',
    label:       'No disease',
    description: 'Clinically normal. No plaque, calculus, or gingivitis.',
  },
  {
    grade:       'PD1',
    label:       'Gingivitis only',
    description: 'Gingivitis with no attachment loss. Plaque present. Reversible with professional cleaning and home care.',
  },
  {
    grade:       'PD2',
    label:       'Early periodontitis',
    description: 'Less than 25% attachment loss. Mild bone loss detectable on radiograph. Professional cleaning and root planing indicated.',
  },
  {
    grade:       'PD3',
    label:       'Moderate periodontitis',
    description: '25–50% attachment loss. Moderate bone loss. Periodontal therapy or extraction depending on tooth and patient.',
  },
  {
    grade:       'PD4',
    label:       'Severe periodontitis',
    description: 'Greater than 50% attachment loss. Severe bone loss. Extraction is indicated in most cases.',
  },
];

// ─── ENERGY REQUIREMENTS ──────────────────────────────────────────────────────
// RER = Resting Energy Requirement (kcal/day).
// MER = Maintenance Energy Requirement = RER × life-stage factor.
// Formula: RER = 70 × (body weight in kg)^0.75
// Source: NRC Nutrient Requirements of Dogs and Cats (2006); WSAVA Nutritional Guidelines.

export const RER_FORMULA = {
  description: 'Resting Energy Requirement: RER = 70 × (body weight in kg)^0.75 (kcal/day)',
  usage:       'Calculate MER by multiplying RER by the appropriate life-stage factor below.',
  factors: {
    intact_adult:      1.8,   // sexually intact adult at maintenance
    neutered_adult:    1.6,   // neutered adult at maintenance
    active:            2.0,   // working or highly active dog
    inactive_obese_prone: 1.2, // inactive or obesity-prone adult
    weight_loss:       1.0,   // target weight loss (feed to target weight RER × 1.0)
    puppy_lt4mo:       3.0,   // puppy under 4 months of age
    puppy_4to12mo:     2.0,   // puppy 4–12 months of age
    kitten:            2.5,   // kitten up to 12 months of age
    pregnancy_late:    3.0,   // late gestation (last 3 weeks)
    lactation:         4.0,   // peak lactation (3–5 weeks post-partum)
  },
};
