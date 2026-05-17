/**
 * kb-drugs.js
 * Structured veterinary drug formulary for the JoyVet CDS dosing engine.
 * Every dose is a hard number — never parsed from text.
 * Pure data module — no Firebase, no DOM.
 *
 * Schema per entry:
 * {
 *   id           {string}   machine-readable unique key
 *   name         {string}   display name
 *   species      {string[]} applicable species
 *   route        {string}   administration route
 *   mgPerKgLow   {number}   minimum dose in mg/kg
 *   mgPerKgHigh  {number}   maximum dose in mg/kg
 *   maxTotalMg   {number}   hard cap per dose (never null, never Infinity)
 *   frequency    {string}   dosing interval / SID / BID / etc.
 *   notes        {string}   clinical warnings and instructions
 * }
 */

export const KB_VERSION = '2.0.0';

export const DRUGS = [

  // ─── ANTIBIOTICS ──────────────────────────────────────────────────────────

  {
    id:           'cephalexin',
    name:         'Cephalexin',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   22,
    mgPerKgHigh:  30,
    maxTotalMg:   1000,
    frequency:    'BID',
    notes:        'Continue 7 days past clinical cure. Avoid in penicillin allergy.',
  },
  {
    id:           'amoxicillin_clav',
    name:         'Amoxicillin-Clavulanate',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   12.5,
    mgPerKgHigh:  25,
    maxTotalMg:   500,
    frequency:    'BID',
    notes:        'Give with food.',
  },
  {
    id:           'doxycycline',
    name:         'Doxycycline',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   5,
    mgPerKgHigh:  10,
    maxTotalMg:   200,
    frequency:    'SID–BID',
    notes:        'Give with food/water to avoid oesophageal stricture.',
  },
  {
    id:           'metronidazole',
    name:         'Metronidazole',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   10,
    mgPerKgHigh:  15,
    maxTotalMg:   500,
    frequency:    'BID',
    notes:        'Neurological signs at high doses.',
  },
  {
    id:           'enrofloxacin',
    name:         'Enrofloxacin',
    species:      ['dog'],
    route:        'PO',
    mgPerKgLow:   5,
    mgPerKgHigh:  20,
    maxTotalMg:   500,
    frequency:    'SID',
    notes:        'Avoid in cats (retinal toxicity). Avoid young dogs.',
  },
  {
    id:           'marbofloxacin',
    name:         'Marbofloxacin',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   2,
    mgPerKgHigh:  5,
    maxTotalMg:   200,
    frequency:    'SID',
    notes:        '',
  },
  {
    id:           'clindamycin',
    name:         'Clindamycin',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   5.5,
    mgPerKgHigh:  11,
    maxTotalMg:   300,
    frequency:    'BID',
    notes:        '',
  },
  {
    id:           'trimethoprim_sulfa',
    name:         'Trimethoprim-Sulfamethoxazole',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   15,
    mgPerKgHigh:  30,
    maxTotalMg:   480,
    frequency:    'BID',
    notes:        'Risk of KCS (dry eye) in dogs. Give with food.',
  },

  // ─── ANTI-PARASITICS ──────────────────────────────────────────────────────

  {
    id:           'fluralaner',
    name:         'Fluralaner',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   25,
    mgPerKgHigh:  56,
    maxTotalMg:   2000,
    frequency:    'q12 weeks',
    notes:        'Isoxazoline — use with caution in dogs with history of seizures.',
  },
  {
    id:           'afoxolaner',
    name:         'Afoxolaner',
    species:      ['dog'],
    route:        'PO',
    mgPerKgLow:   2.5,
    mgPerKgHigh:  6.8,
    maxTotalMg:   250,
    frequency:    'q4 weeks',
    notes:        'NexGard. Not for cats.',
  },
  {
    id:           'selamectin',
    name:         'Selamectin',
    species:      ['dog', 'cat'],
    route:        'topical',
    mgPerKgLow:   6,
    mgPerKgHigh:  12,
    maxTotalMg:   240,
    frequency:    'q4 weeks',
    notes:        'Revolution. Apply to skin, not fur.',
  },
  {
    id:           'ivermectin',
    name:         'Ivermectin',
    species:      ['dog'],
    route:        'PO',
    mgPerKgLow:   0.1,
    mgPerKgHigh:  0.4,
    maxTotalMg:   6,
    frequency:    'q2 weeks',
    notes:        'NEVER in MDR1/ABCB1 breeds (Collie, Sheltie, Australian Shepherd, etc). Check breed before prescribing.',
  },
  {
    id:           'milbemycin_oxime',
    name:         'Milbemycin Oxime',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   0.5,
    mgPerKgHigh:  1.0,
    maxTotalMg:   30,
    frequency:    'monthly',
    notes:        'Heartgard/Interceptor. Caution MDR1 breeds.',
  },
  {
    id:           'praziquantel',
    name:         'Praziquantel',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   5,
    mgPerKgHigh:  10,
    maxTotalMg:   50,
    frequency:    'single dose',
    notes:        'For tapeworms.',
  },
  {
    id:           'fenbendazole',
    name:         'Fenbendazole',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   25,
    mgPerKgHigh:  50,
    maxTotalMg:   1000,
    frequency:    'SID x 3–5 days',
    notes:        'Panacur.',
  },
  {
    id:           'pyrantel',
    name:         'Pyrantel Pamoate',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   5,
    mgPerKgHigh:  10,
    maxTotalMg:   180,
    frequency:    'single dose, repeat in 2 weeks',
    notes:        '',
  },

  // ─── ANTI-INFLAMMATORIES / PAIN ───────────────────────────────────────────

  {
    id:           'meloxicam',
    name:         'Meloxicam',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   0.05,   // cat dose; dog 0.1–0.2 — engine should branch on species
    mgPerKgHigh:  0.2,
    maxTotalMg:   15,
    frequency:    'SID',
    notes:        'NSAID — give with food. Dog: 0.1–0.2 mg/kg; Cat: 0.05 mg/kg (long-term use requires careful monitoring). Do not combine with steroids. Caution renal disease.',
  },
  {
    id:           'prednisolone',
    name:         'Prednisolone',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   0.5,
    mgPerKgHigh:  2,
    maxTotalMg:   60,
    frequency:    'SID–BID (taper)',
    notes:        'Taper dose; do not stop abruptly. Not for concurrent use with NSAIDs.',
  },
  {
    id:           'carprofen',
    name:         'Carprofen',
    species:      ['dog'],
    route:        'PO',
    mgPerKgLow:   2.2,
    mgPerKgHigh:  4.4,
    maxTotalMg:   100,
    frequency:    'SID–BID',
    notes:        'NSAID. Monitor liver enzymes long-term. Not for cats.',
  },
  {
    id:           'tramadol',
    name:         'Tramadol',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   2,
    mgPerKgHigh:  5,
    maxTotalMg:   200,
    frequency:    'BID–TID',
    notes:        'Opioid analgesic. Sedation common.',
  },

  // ─── ANTIEMETICS / GI ─────────────────────────────────────────────────────

  {
    id:           'maropitant',
    name:         'Maropitant',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   2,
    mgPerKgHigh:  2,
    maxTotalMg:   60,
    frequency:    'SID x 5 days',
    notes:        'Cerenia. Best antiemetic for dogs/cats. Give 1h before travel if for motion sickness.',
  },
  {
    id:           'metoclopramide',
    name:         'Metoclopramide',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   0.2,
    mgPerKgHigh:  0.5,
    maxTotalMg:   10,
    frequency:    'TID',
    notes:        'Prokinetic + antiemetic. Avoid in GI obstruction.',
  },
  {
    id:           'omeprazole',
    name:         'Omeprazole',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   0.5,
    mgPerKgHigh:  1,
    maxTotalMg:   40,
    frequency:    'SID',
    notes:        'PPI. Give 30 min before food.',
  },
  {
    id:           'sucralfate',
    name:         'Sucralfate',
    species:      ['dog', 'cat'],
    route:        'PO',
    // Sucralfate is weight-independent in practice; use flat dose via notes.
    // Store minimum practical mg/kg for a 5 kg cat (250 mg / 5 kg = 50 mg/kg).
    // The engine should use notes to apply flat dosing.
    mgPerKgLow:   50,
    mgPerKgHigh:  200,
    maxTotalMg:   4000,
    frequency:    'TID',
    notes:        'Mucosal protectant. Flat dose: dog 0.5–1 g per dose; cat 0.25 g per dose. Max 4 g/day. Give 2h apart from other medications.',
  },

  // ─── DERMATOLOGY / ALLERGY ────────────────────────────────────────────────

  {
    id:           'oclacitinib',
    name:         'Oclacitinib',
    species:      ['dog'],
    route:        'PO',
    mgPerKgLow:   0.4,
    mgPerKgHigh:  0.6,
    maxTotalMg:   16,
    frequency:    'BID x 14 days, then SID',
    notes:        'Apoquel. JAK inhibitor. Do not use in dogs <12 months or <3 kg.',
  },
  {
    id:           'cyclosporine',
    name:         'Cyclosporine',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   5,
    mgPerKgHigh:  5,
    maxTotalMg:   200,
    frequency:    'SID',
    notes:        'Atopica. Onset 4–6 weeks. GI side effects common initially.',
  },
  {
    id:           'prednisolone_rescue',
    name:         'Prednisolone (Rescue)',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   0.5,
    mgPerKgHigh:  1,
    maxTotalMg:   40,
    frequency:    'SID x 5–7 days',
    notes:        'Short-course rescue for acute pruritus. Taper if >7 days.',
  },

  // ─── CARDIAC ──────────────────────────────────────────────────────────────

  {
    id:           'furosemide',
    name:         'Furosemide',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   1,
    mgPerKgHigh:  4,
    maxTotalMg:   80,
    frequency:    'BID',
    notes:        'Loop diuretic. Monitor electrolytes. Renal protection important.',
  },
  {
    id:           'enalapril',
    name:         'Enalapril',
    species:      ['dog', 'cat'],
    route:        'PO',
    mgPerKgLow:   0.25,
    mgPerKgHigh:  0.5,
    maxTotalMg:   10,
    frequency:    'SID–BID',
    notes:        'ACE inhibitor. Monitor renal function.',
  },
  {
    id:           'pimobendan',
    name:         'Pimobendan',
    species:      ['dog'],
    route:        'PO',
    mgPerKgLow:   0.2,
    mgPerKgHigh:  0.6,
    maxTotalMg:   20,
    frequency:    'BID',
    notes:        'Vetmedin. Give 1h before food. Only for diagnosed heart disease.',
  },

  // ─── EMERGENCY ────────────────────────────────────────────────────────────

  {
    id:           'dexamethasone_sp',
    name:         'Dexamethasone Sodium Phosphate',
    species:      ['dog', 'cat'],
    route:        'IV-IM',
    mgPerKgLow:   0.1,
    mgPerKgHigh:  1,
    maxTotalMg:   20,
    frequency:    'single dose',
    notes:        'Emergency anti-inflammatory. Not for GI conditions.',
  },
  {
    id:           'atropine',
    name:         'Atropine',
    species:      ['dog', 'cat'],
    route:        'IV-IM-SC',
    mgPerKgLow:   0.02,
    mgPerKgHigh:  0.04,
    maxTotalMg:   3,
    frequency:    'PRN',
    notes:        'Bradycardia emergency. Can also be administered ET (endotracheal).',
  },

];
