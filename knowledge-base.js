// JoyVet CDS — Veterinary Knowledge Base
// Evidence-based diagnostic engine v1.0

const JOYVET_KB = {

  // ── CONDITION SCHEMA ──────────────────────────────────────────────────────
  // Each condition: { id, name, species[], category, signals{}, tests{}, treatment{}, education{} }
  // signals: map of inputKey:value → weight (1–10). Higher = stronger indicator.

  conditions: [

    // ═══════════════════════════ DERMATOLOGY ════════════════════════════════

    {
      id: "atopic_dermatitis",
      name: "Atopic Dermatitis",
      species: ["dog","cat"],
      category: "Dermatology",
      icd: "L20",
      signals: {
        complaints_skin_lesions: 8, complaints_hair_loss: 5, complaints_behavioral: 3,
        hpi_onset_chronic: 6, hpi_progression_fluctuating: 5,
        env_indoor_outdoor: 4, env_contact_other_pets: 2,
        skin_pruritus: 10, skin_erythema: 7, skin_alopecia_focal: 6, skin_papules: 5,
        skin_lichenification: 7, skin_hyperpigmentation: 5,
        ears_erythema: 6, ears_pruritus: 5,
        age_young: 4
      },
      contra_signals: { skin_pustules: -3, skin_crusts: -2 },
      tests: {
        tier1: ["Skin cytology","Tape prep for Malassezia/bacteria","Flea combing","Otoscopy"],
        tier2: ["Intradermal allergy test (IDT)","Serum allergen-specific IgE","Elimination diet trial (8–12 weeks)","Skin scraping (rule out Demodex/Sarcoptes)"],
        tier3: ["Biopsy — confirm chronic inflammation pattern","Patch testing","Referral to veterinary dermatologist"]
      },
      treatment: {
        medications: [
          "Oclacitinib (Apoquel) 0.4–0.6 mg/kg PO BID × 14d, then SID",
          "Lokivetmab (Cytopoint) 2 mg/kg SC q4–8 weeks (dog)",
          "Prednisolone 0.5–1 mg/kg PO SID × 5–7d taper (rescue only)",
          "Cyclosporine 5 mg/kg PO SID (onset 4–6 weeks)",
          "Topical hydrocortisone aceponate spray prn"
        ],
        procedures: ["Medicated shampoo (chlorhexidine 2–4%) q3–7d","Ear cleaning prn","Treat secondary infections concurrently"],
        diet: ["Hydrolyzed or novel protein trial if food allergy suspected","Omega-3 fatty acid supplementation (EPA/DHA 30–40 mg/kg/day)"]
      },
      education: {
        monitor: ["Pruritus score (0–10)","Recurrence of lesions","Ear odor/discharge","Response to diet trial"],
        red_flags: ["Spreading pyoderma","Not responding within 2 weeks","Systemic signs (lethargy, fever)"],
        followup: "Recheck in 4 weeks; allergen testing at 6 weeks if no improvement",
        prognosis: "fair"
      }
    },

    {
      id: "flea_allergy_dermatitis",
      name: "Flea Allergy Dermatitis (FAD)",
      species: ["dog","cat"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 8, complaints_hair_loss: 6,
        skin_pruritus: 10, skin_erythema: 7, skin_papules: 6, skin_crusts: 7,
        skin_alopecia_focal: 7, skin_alopecia_diffuse: 5,
        parasites_fleas: 9,
        env_outdoor: 5, env_contact_stray: 6,
        hpi_onset_sudden: 5, hpi_progression_worsening: 5
      },
      tests: {
        tier1: ["Flea combing (look for flea dirt)","Skin cytology","Tape prep"],
        tier2: ["Intradermal test (flea antigen)","Serum flea IgE","Trial flea treatment and response"],
        tier3: ["Skin biopsy if refractory"]
      },
      treatment: {
        medications: [
          "Isoxazoline: Fluralaner (Bravecto) 25–56 mg/kg PO q12 weeks OR Afoxolaner (NexGard) monthly",
          "Selamectin (Revolution) topical monthly",
          "Prednisolone 0.5 mg/kg PO SID × 5d for acute pruritus relief",
          "Oclacitinib if concurrent atopy"
        ],
        procedures: ["Environmental flea treatment (premise spray + IGR)","Treat ALL in-contact animals","Wash bedding at 60°C"],
        diet: []
      },
      education: {
        monitor: ["Flea evidence monthly","Pruritus level","Secondary skin infection"],
        red_flags: ["Anemia (especially kittens/small dogs)","Tapeworm segments (Dipylidium)"],
        followup: "Recheck 3–4 weeks; maintain year-round prevention",
        prognosis: "good"
      }
    },

    {
      id: "demodicosis",
      name: "Demodicosis (Demodectic Mange)",
      species: ["dog","cat"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 8, complaints_hair_loss: 9,
        skin_alopecia_focal: 9, skin_alopecia_diffuse: 7, skin_erythema: 6,
        skin_papules: 5, skin_pustules: 6, skin_crusts: 6,
        age_young: 7, hpi_onset_subacute: 5,
        chronic_condition_none: 3
      },
      tests: {
        tier1: ["Deep skin scraping (×5+ sites)","Trichogram (hair pluck)","Skin cytology for secondary infection"],
        tier2: ["Skin biopsy (face/feet cases)","CBC/Chemistry if generalized","Rule out underlying immunosuppression"],
        tier3: ["PCR for Demodex species identification"]
      },
      treatment: {
        medications: [
          "Isoxazolines first-line: Fluralaner (Bravecto) 25–56 mg/kg q4–8 weeks × 3–4 doses",
          "Afoxolaner (NexGard) monthly × 3–4 months",
          "Sarolaner (Simparica) monthly × 3–4 months",
          "Ivermectin 0.3–0.6 mg/kg PO SID (do NOT use in MDR1/ABCB1 breeds)",
          "Amitraz dip (0.025–0.05%) q2 weeks (veterinary use only)",
          "Treat secondary pyoderma: Cephalexin 22 mg/kg PO BID × 4–6 weeks"
        ],
        procedures: ["Clipping if generalized","Medicated shampoo (benzoyl peroxide 2.5%)","Re-scraping q4 weeks until 2 consecutive negatives"],
        diet: ["High-quality protein diet","Address underlying disease"]
      },
      education: {
        monitor: ["Lesion spread","New pustule/furunculosis","Lymphadenopathy"],
        red_flags: ["Rapid generalization","Systemic illness","Pyoderma not responding"],
        followup: "Monthly recheck with skin scraping; treat until 2 negative scrapings",
        prognosis: "fair"
      }
    },

    {
      id: "sarcoptic_mange",
      name: "Sarcoptic Mange (Scabies)",
      species: ["dog","cat","rabbit"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 8, complaints_hair_loss: 6,
        skin_pruritus: 10, skin_erythema: 8, skin_crusts: 8, skin_papules: 7,
        skin_alopecia_focal: 7,
        env_contact_stray: 8, env_outdoor: 6,
        hpi_onset_sudden: 6, hpi_progression_worsening: 7,
        parasites_mites: 9
      },
      tests: {
        tier1: ["Multiple deep skin scrapings (low sensitivity ~50%)","Skin cytology","Tape prep"],
        tier2: ["Therapeutic trial (isoxazoline)","Serum Sarcoptes IgE","PCR if available"],
        tier3: ["Skin biopsy"]
      },
      treatment: {
        medications: [
          "Isoxazolines first-line: Fluralaner (Bravecto) 25 mg/kg single dose, repeat q4w × 2",
          "Selamectin (Revolution) 6–12 mg/kg topical q2 weeks × 3 doses",
          "Ivermectin 0.2–0.4 mg/kg SC/PO q2 weeks × 3 doses (avoid in Collies/MDR1 breeds)",
          "Prednisolone 0.5 mg/kg SID × 5–7d (pruritus relief only)"
        ],
        procedures: ["Treat all in-contact dogs","Environmental cleaning (mites survive 36–72h off host)"],
        diet: []
      },
      education: {
        monitor: ["Pruritus resolution (expect 2–4 weeks)","Secondary infection","Zoonotic risk (transient human rash)"],
        red_flags: ["No improvement after 2 treatments","Lymphadenopathy","Systemic signs"],
        followup: "Recheck 3–4 weeks",
        prognosis: "good"
      }
    },

    {
      id: "pyoderma",
      name: "Bacterial Pyoderma",
      species: ["dog","cat"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 8,
        skin_pustules: 10, skin_papules: 7, skin_crusts: 8, skin_erythema: 6,
        skin_alopecia_focal: 5, skin_thickened: 4,
        hpi_onset_subacute: 5,
        chronic_condition_allergies: 5
      },
      tests: {
        tier1: ["Skin cytology (look for cocci/neutrophils)","Tape prep","Impression smear"],
        tier2: ["Bacterial culture + sensitivity (refractory cases)","Skin scraping (rule out Demodex)","CBC/Chemistry if systemic"],
        tier3: ["Skin biopsy","Methicillin-resistant Staph culture"]
      },
      treatment: {
        medications: [
          "Cephalexin 22–30 mg/kg PO BID × 3–4 weeks (superficial) or 6–8 weeks (deep)",
          "Amoxicillin-clavulanate 12.5–25 mg/kg PO BID × 3–6 weeks",
          "Clindamycin 5.5–11 mg/kg PO BID",
          "Doxycycline 5–10 mg/kg PO SID/BID (MRSP)",
          "Topical: Chlorhexidine 2–4% shampoo/spray q3–7d"
        ],
        procedures: ["Clip affected area","Medicated shampoo","Address underlying cause"],
        diet: []
      },
      education: {
        monitor: ["Lesion resolution","New pustules","Pruritus"],
        red_flags: ["Deep furunculosis","Cellulitis","Systemic fever"],
        followup: "Recheck 3–4 weeks; continue 7 days beyond clinical cure",
        prognosis: "good"
      }
    },

    {
      id: "malassezia_dermatitis",
      name: "Malassezia Dermatitis",
      species: ["dog","cat"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 7, complaints_ear_problems: 6,
        skin_oily: 8, skin_erythema: 6, skin_hyperpigmentation: 6,
        skin_lichenification: 6, skin_pruritus: 7,
        ears_discharge_brown: 7, ears_erythema: 6, ears_odor: 8,
        chronic_condition_allergies: 6, breed_basset: 5, breed_cocker: 5
      },
      tests: {
        tier1: ["Skin cytology (Diff-Quik stain — look for peanut-shaped yeast)","Tape prep","Ear cytology"],
        tier2: ["Culture if refractory","Skin biopsy","Allergy workup"],
        tier3: ["Referral to dermatology"]
      },
      treatment: {
        medications: [
          "Ketoconazole 5–10 mg/kg PO SID with food × 4 weeks",
          "Itraconazole 5 mg/kg PO SID × 4 weeks (pulse protocol available)",
          "Fluconazole 5 mg/kg PO SID (cats — safer)",
          "Topical: Miconazole/chlorhexidine shampoo q3–5d",
          "Ear: Clotrimazole or miconazole otic q12–24h × 2–4 weeks"
        ],
        procedures: ["Ear cleaning prn","Address underlying allergy/endocrine disease"],
        diet: []
      },
      education: {
        monitor: ["Odor resolution","Skin lesion improvement","Ear discharge"],
        red_flags: ["Not responding to antifungals","Worsening ear pain"],
        followup: "Recheck cytology at 3–4 weeks",
        prognosis: "good"
      }
    },

    {
      id: "dermatophytosis",
      name: "Dermatophytosis (Ringworm)",
      species: ["dog","cat","rabbit"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 7, complaints_hair_loss: 8,
        skin_alopecia_focal: 9, skin_crusts: 6, skin_erythema: 5,
        age_young: 7, env_contact_stray: 7, env_new_pet: 6,
        hpi_onset_subacute: 5
      },
      tests: {
        tier1: ["Wood's lamp (M. canis fluoresces — not all species)","DTM culture (gold standard, 2–3 weeks)","Microscopy (hair/skin KOH prep)"],
        tier2: ["PCR for dermatophytes (rapid)","Fungal culture and ID","Biopsy"],
        tier3: []
      },
      treatment: {
        medications: [
          "Itraconazole 5 mg/kg PO SID alternate weeks × 3–6 cycles (cats)",
          "Terbinafine 30–40 mg/kg PO SID × 4–6 weeks (dogs)",
          "Topical: Miconazole/chlorhexidine shampoo twice weekly",
          "Lime sulfur dip 1:16–1:32 twice weekly (effective but malodorous)"
        ],
        procedures: ["Clip lesions","Treat all in-contact animals","Environmental decontamination (bleach 1:10 hard surfaces)","Quarantine new animals"],
        diet: []
      },
      education: {
        monitor: ["New lesion development","Resolution of existing lesions","In-contact human family members (zoonosis)"],
        red_flags: ["Spreading to immunocompromised humans","Not responding to treatment","Generalization"],
        followup: "Negative DTM culture required before declaring cured",
        prognosis: "good"
      }
    },

    {
      id: "cushing_skin",
      name: "Hyperadrenocorticism (Cushing's Disease)",
      species: ["dog"],
      category: "Dermatology / Endocrinology",
      signals: {
        complaints_hair_loss: 8, complaints_skin_lesions: 6, complaints_polydipsia: 9, complaints_polyuria: 8,
        complaints_weight_gain: 6, complaints_behavioral: 4,
        skin_alopecia_diffuse: 9, skin_hyperpigmentation: 7, skin_thickened: 6,
        skin_dry: 5, skin_poor_coat: 7,
        abdomen_distension: 7,
        age_middle: 5, age_old: 6,
        breed_poodle: 5, breed_dachshund: 5, breed_boxer: 4
      },
      tests: {
        tier1: ["CBC (stress leukogram)","Chemistry panel (high ALP)","UA with culture","Urine cortisol:creatinine ratio (screening)"],
        tier2: ["Low-dose dexamethasone suppression test (LDDST)","ACTH stimulation test","Abdominal ultrasound (adrenal size)"],
        tier3: ["High-dose dexamethasone suppression test","CT/MRI pituitary","Adrenal biopsy"]
      },
      treatment: {
        medications: [
          "Trilostane (Vetoryl) 2.2–6.7 mg/kg PO SID with food (pituitary-dependent)",
          "Mitotane (o,p'-DDD) induction: 25–50 mg/kg PO SID × 8–10d (monitor ACTH stim)",
          "Mitotane maintenance: 25–50 mg/kg once or twice weekly"
        ],
        procedures: ["ACTH stimulation monitoring 10–14d post-treatment initiation","Abdominal US 30d post-treatment","Adrenalectomy for adrenal tumor"],
        diet: ["High-quality protein diet","Monitor weight"]
      },
      education: {
        monitor: ["PU/PD improvement","Coat regrowth (months)","Pot-belly reduction","Energy level","Trilostane dosing signs"],
        red_flags: ["Vomiting/diarrhea after trilostane","Weakness/collapse (Addisonian crisis)","Neurological signs (pituitary macroadenoma)"],
        followup: "ACTH stim at 10–14d, 30d, 90d, then q3–6 months",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ INTERNAL MEDICINE ════════════════════════════

    {
      id: "parvoviral_enteritis",
      name: "Canine Parvoviral Enteritis",
      species: ["dog"],
      category: "Internal Medicine / Infectious",
      signals: {
        complaints_vomiting: 9, complaints_diarrhea: 9, complaints_lethargy: 8,
        complaints_anorexia: 8,
        hpi_onset_sudden: 9, hpi_progression_worsening: 8,
        vaccine_overdue: 7, vaccine_never: 9, vaccine_partial: 8,
        age_puppy: 9,
        env_contact_stray: 6, env_kennel: 7,
        mm_pale: 6, mm_tacky: 6,
        hydration_moderate: 7, hydration_severe: 8,
        attitude_dull: 7, attitude_obtunded: 6,
        temp_low: 5, temp_high: 6
      },
      tests: {
        tier1: ["Parvo SNAP test (fecal antigen)","CBC (leukopenia/neutropenia is hallmark)","Chemistry panel","Blood glucose"],
        tier2: ["Fecal PCR (more sensitive)","Abdominal radiograph","Blood culture if septic"],
        tier3: ["Endoscopy","Biopsy (rarely needed)"]
      },
      treatment: {
        medications: [
          "IV fluid therapy: Plasmalyte/LRS — correct dehydration deficit + maintenance + ongoing losses",
          "Metronidazole 15 mg/kg IV/PO BID × 5–7d",
          "Ampicillin 22 mg/kg IV TID (gram-positive/anaerobes)",
          "Enrofloxacin 5–10 mg/kg IV SID (gram-negatives — caution: use in adults only)",
          "Maropitant (Cerenia) 1 mg/kg SC/IV SID (antiemetic)",
          "Ondansetron 0.1–0.2 mg/kg IV BID–TID",
          "Famotidine 0.5–1 mg/kg IV/PO SID",
          "Dextrose supplementation if hypoglycemic"
        ],
        procedures: ["IV catheter placement","Isolation protocol","Nutritional support — early enteral feeding if tolerated","Blood transfusion if severe anemia/hypoproteinemia"],
        diet: ["NPO initially; small frequent meals once vomiting controlled","High-digestibility bland diet recovery"]
      },
      education: {
        monitor: ["Vomiting frequency","Fecal consistency/blood","Temperature","Appetite","Hydration"],
        red_flags: ["Bloody diarrhea worsening","Temperature <37°C or >40°C","Collapse/weakness","Hypoglycemia"],
        followup: "Daily monitoring during hospitalization; recheck CBC day 3–5; discharge when eating, no vomiting",
        prognosis: "guarded"
      }
    },

    {
      id: "pancreatitis",
      name: "Pancreatitis (Acute/Chronic)",
      species: ["dog","cat"],
      category: "Internal Medicine",
      signals: {
        complaints_vomiting: 8, complaints_anorexia: 7, complaints_lethargy: 7,
        abdomen_pain_moderate: 8, abdomen_pain_severe: 9,
        abdomen_cranial_mass: 5,
        hpi_onset_sudden: 7, hpi_progression_worsening: 6,
        history_dietary_change: 6,
        mm_tacky: 5,
        hydration_moderate: 5,
        temp_high: 5,
        breed_miniature_schnauzer: 7, breed_cocker: 5,
        bcs_obese: 6
      },
      tests: {
        tier1: ["CBC","Chemistry (amylase, lipase)","Serum cPLI or fPLI (Spec cPL/fPL)","Urinalysis","Abdominal ultrasound"],
        tier2: ["Abdominal radiograph (sentinel loop)","Blood glucose (DM association)","Cobalamin/folate","TLI"],
        tier3: ["CT abdomen (gold standard for severity)","Biopsy","ERCP"]
      },
      treatment: {
        medications: [
          "IV fluid therapy: crystalloids (LRS) — aggressive rehydration",
          "Maropitant (Cerenia) 1 mg/kg SC/IV SID",
          "Ondansetron 0.1–0.2 mg/kg IV BID–TID",
          "Buprenorphine 0.01–0.02 mg/kg IV/IM TID–QID (pain control)",
          "Methadone 0.1–0.3 mg/kg IV/IM TID (moderate-severe pain)",
          "Famotidine 0.5–1 mg/kg IV/PO SID",
          "Antibiotics only if septic/infected pancreatic necrosis suspected"
        ],
        procedures: ["IV access","Early enteral nutrition (NG tube if vomiting controlled)","Monitor blood glucose q4–6h","Plasma transfusion if DIC suspected"],
        diet: ["Low-fat, highly digestible diet long-term","Avoid table scraps/fatty foods","Multiple small meals","Hydrolyzed or novel protein if EPI/IBD concurrent"]
      },
      education: {
        monitor: ["Vomiting/nausea","Abdominal pain","Appetite","Stool quality","Weight"],
        red_flags: ["Persistent vomiting","Collapse","Jaundice","Extreme abdominal pain","Signs of DIC (petechiae, bleeding)"],
        followup: "Recheck Spec cPL in 3–4 weeks; dietary management lifelong",
        prognosis: "fair"
      }
    },

    {
      id: "chronic_kidney_disease",
      name: "Chronic Kidney Disease (CKD)",
      species: ["dog","cat"],
      category: "Internal Medicine",
      signals: {
        complaints_polydipsia: 9, complaints_polyuria: 8, complaints_anorexia: 7, complaints_vomiting: 6,
        complaints_weight_loss: 7, complaints_lethargy: 6,
        kidneys_small: 9, kidneys_irregular: 7,
        age_old: 8, age_middle: 5,
        hydration_mild: 5, hydration_moderate: 6,
        mm_pale: 6,
        hpi_onset_chronic: 8, hpi_progression_worsening: 6,
        breed_persian: 5, breed_abyssinian: 4
      },
      tests: {
        tier1: ["CBC (non-regenerative anemia)","Chemistry (BUN, creatinine, phosphorus, Ca)","SDMA","Urinalysis + USG (isosthenuria)","UPC (urine protein:creatinine ratio)","Blood pressure"],
        tier2: ["Renal ultrasound","Urine culture","PTH level","Electrolytes","Reticulocyte count"],
        tier3: ["Renal biopsy","GFR measurement (scintigraphy)","FGF-23"]
      },
      treatment: {
        medications: [
          "IRIS Stage 1–2: Monitor; address proteinuria (Benazepril 0.25–0.5 mg/kg PO SID)",
          "IRIS Stage 2–3: Phosphate binders (Aluminum hydroxide 30–90 mg/kg/day with food)",
          "Calcitriol 2.5–3.5 ng/kg PO SID (if iPTH elevated)",
          "Erythropoietin/Darbepoetin if PCV <20% (cats) or <25% (dogs)",
          "Amlodipine 0.625–1.25 mg/cat PO SID (hypertension — systolic >160)",
          "Maropitant 1 mg/kg PO/SC SID prn (nausea)"
        ],
        procedures: ["IV/SC fluid therapy for dehydration","Gastric tube if needed","Blood pressure monitoring q4–6 months"],
        diet: ["Renal prescription diet (phosphorus-restricted, moderate protein)","Increased water intake (wet food preferred)","Potassium supplementation if hypokalemic"]
      },
      education: {
        monitor: ["PU/PD","Appetite","Body weight","Vomiting","Blood pressure at home (if hypertensive)"],
        red_flags: ["Acute-on-chronic decompensation","Anuria","Seizures (uremic encephalopathy)","Severe anemia"],
        followup: "IRIS Stage 1–2: q3–6 months; Stage 3–4: q1–3 months",
        prognosis: "guarded"
      }
    },

    {
      id: "diabetes_mellitus",
      name: "Diabetes Mellitus",
      species: ["dog","cat"],
      category: "Internal Medicine / Endocrinology",
      signals: {
        complaints_polydipsia: 10, complaints_polyuria: 9, complaints_weight_loss: 7, complaints_lethargy: 5,
        complaints_anorexia: 4,
        bcs_thin: 6, bcs_obese: 5,
        age_middle: 5, age_old: 6,
        hpi_onset_chronic: 6, hpi_progression_worsening: 5,
        breed_burmese: 6,
        chronic_condition_diabetes: 8,
        sex_female_intact: 5
      },
      tests: {
        tier1: ["Blood glucose (fasting)","Urinalysis (glucosuria, ketonuria)","CBC","Chemistry","Fructosamine (2-week average)"],
        tier2: ["Abdominal ultrasound","UA culture","Spec cPL (pancreatitis)","T4 (hyperthyroid cats)","Blood pressure"],
        tier3: ["Continuous glucose monitoring","CT/MRI (insulinoma rule-out)"]
      },
      treatment: {
        medications: [
          "CATS: Glargine (Lantus) insulin 0.5–1 IU/cat SC BID (preferred)","ProZinc insulin 0.5–1 IU/cat SC BID",
          "DOGS: NPH insulin 0.25–0.5 IU/kg SC BID (start low)",
          "Vetsulin/Caninsulin 0.25 IU/kg SC BID (dogs)",
          "Treat concurrent infections (UTI, pyoderma)"
        ],
        procedures: ["Glucose curve (7-point) 1 week after starting","Monitor for hypoglycemia","Neuter intact females (progesterone causes insulin resistance)"],
        diet: ["High-fiber, low-glycemic diet (dogs)","High-protein, low-carbohydrate diet (cats — promotes remission)","Consistent feeding schedule aligned with insulin"]
      },
      education: {
        monitor: ["PU/PD resolution","Appetite","Weight","Glucose monitoring at home","Signs of hypoglycemia (weakness, tremors, seizures)"],
        red_flags: ["Hypoglycemia (rubbing gums with honey/Karo immediately, rush to vet)","Ketoacidosis (vomiting, lethargy, acetone breath)","Sudden deterioration"],
        followup: "Glucose curve at 1 week; fructosamine monthly until stable, then q3 months",
        prognosis: "fair"
      }
    },

    {
      id: "hyperthyroidism_cat",
      name: "Hyperthyroidism (Feline)",
      species: ["cat"],
      category: "Internal Medicine / Endocrinology",
      signals: {
        complaints_weight_loss: 9, complaints_polydipsia: 7, complaints_behavioral: 6,
        complaints_vomiting: 5, complaints_diarrhea: 4,
        bcs_thin: 7,
        age_old: 9,
        attitude_bar: 5, attitude_qar: 4,
        hr_high: 8, cardiac_tachycardia: 8, cardiac_murmur_12: 5,
        palpation_thyroid: 7,
        hpi_onset_chronic: 7, hpi_progression_worsening: 5
      },
      tests: {
        tier1: ["Total T4 (serum)","CBC","Chemistry (BUN, Cr — may mask CKD)","UA","Blood pressure"],
        tier2: ["Free T4 by ED (if total T4 borderline)","T3 suppression test","Thyroid scan (scintigraphy)","Technetium scan","Renal function monitoring post-treatment"],
        tier3: ["Thyroid biopsy (rare)"]
      },
      treatment: {
        medications: [
          "Methimazole 1.25–2.5 mg/cat PO BID (titrate to euthyroid; start low)",
          "Transdermal methimazole gel (apply to ear pinna) if PO intolerant",
          "Carbimazole (prodrug of methimazole) — Europe",
          "Atenolol 6.25 mg/cat PO SID–BID if tachycardia/HCM"
        ],
        procedures: ["Radioactive iodine (I-131) — curative, gold standard","Thyroidectomy (bilateral) — curative","Monitor renal function post-treatment (may unmask CKD)"],
        diet: ["Iodine-restricted prescription diet (Hills y/d) — sole diet control option","Fresh water always available"]
      },
      education: {
        monitor: ["Weight","Appetite","Heart rate","Blood pressure","Vomiting/diarrhea (methimazole SE)","Facial pruritus (methimazole SE — stop drug)"],
        red_flags: ["Acute facial pruritus after methimazole (drug reaction — stop immediately)","Collapse","Severe hypertension","ATE (aortic thromboembolism)"],
        followup: "T4 + renal panel 2–3 weeks after starting treatment; q3–6 months when stable",
        prognosis: "good"
      }
    },

    {
      id: "hypothyroidism_dog",
      name: "Hypothyroidism (Canine)",
      species: ["dog"],
      category: "Internal Medicine / Endocrinology",
      signals: {
        complaints_weight_gain: 8, complaints_lethargy: 7, complaints_hair_loss: 7,
        complaints_skin_lesions: 5, complaints_behavioral: 5,
        skin_alopecia_diffuse: 7, skin_hyperpigmentation: 5, skin_dry: 6,
        skin_poor_coat: 6, skin_thickened: 5,
        bcs_obese: 6,
        age_middle: 6, age_old: 5,
        hr_low: 6, temp_low: 5,
        breed_golden: 6, breed_labrador: 5, breed_doberman: 6, breed_cocker: 5
      },
      tests: {
        tier1: ["Total T4","CBC (normocytic non-regenerative anemia)","Chemistry (hypercholesterolemia)"],
        tier2: ["Free T4 by ED","Canine TSH (cTSH) — most specific when elevated","TgAA (thyroglobulin autoantibodies)"],
        tier3: ["Thyroid biopsy","Thyroid scintigraphy"]
      },
      treatment: {
        medications: [
          "Levothyroxine (T4) 0.02 mg/kg PO BID (start) → titrate to SID in most dogs",
          "Give at consistent time relative to food (absorption varies)",
          "Recheck T4 4–6 hours post-pill at 4–8 weeks"
        ],
        procedures: ["Baseline ECG if cardiac signs","Monitor weight q4 weeks initially"],
        diet: ["Weight management diet if obese","Caloric restriction until euthyroid state achieved"]
      },
      education: {
        monitor: ["Weight and BCS","Energy level and mental alertness","Skin/coat improvement (expect 2–3 months)","Heart rate"],
        red_flags: ["Tachycardia after levothyroxine (over-supplementation)","Hyperthyroid signs","No improvement at 8 weeks (re-evaluate diagnosis)"],
        followup: "T4 post-pill check at 4–8 weeks; then every 6 months when stable",
        prognosis: "good"
      }
    },

    {
      id: "ibd",
      name: "Inflammatory Bowel Disease (IBD)",
      species: ["dog","cat"],
      category: "Internal Medicine / GI",
      signals: {
        complaints_vomiting: 7, complaints_diarrhea: 7, complaints_weight_loss: 6,
        complaints_anorexia: 5,
        hpi_onset_chronic: 8, hpi_progression_fluctuating: 7,
        bcs_thin: 6,
        abdomen_intestinal_thickening: 7, abdomen_mesenteric_lymphadenopathy: 5,
        age_middle: 5, age_old: 5,
        breed_siamese: 5, breed_basenji: 5, breed_lundehund: 5
      },
      tests: {
        tier1: ["CBC","Chemistry (albumin low, B12 low)","Cobalamin/folate","Urinalysis","Fecal flotation/culture"],
        tier2: ["Abdominal ultrasound (GI wall thickening)","Spec cPL (rule out pancreatitis)","TLI (EPI)","Food trial"],
        tier3: ["GI endoscopy with biopsies (gold standard)","Full-thickness surgical biopsy","PARR (PCR for clonality — LPE vs lymphoma)"]
      },
      treatment: {
        medications: [
          "Prednisolone 1–2 mg/kg PO SID × 4–6 weeks, taper over 3–6 months",
          "Budesonide 0.5–3 mg/cat PO SID (reduced systemic effects)",
          "Chlorambucil 2 mg/cat PO every 48–72h (severe/refractory — lymphocytic)",
          "Cobalamin (B12) supplementation if low: 250–1500 mcg SC q7–14d",
          "Metronidazole 10–15 mg/kg PO BID (anti-inflammatory + antibacterial)"
        ],
        procedures: ["Endoscopy for diagnosis","Nutritional support","Monitor albumin"],
        diet: ["Hydrolyzed or novel protein diet first","Highly digestible diet","Multiple small meals"]
      },
      education: {
        monitor: ["Vomiting frequency","Stool quality","Weight","Appetite","Cobalamin levels"],
        red_flags: ["Acute deterioration","Hypoalbuminemia edema","Suspicion of lymphoma (lymph node enlargement)"],
        followup: "Recheck albumin, B12, weight q4–8 weeks; endoscopy if not improving",
        prognosis: "fair"
      }
    },

    {
      id: "hepatic_lipidosis",
      name: "Hepatic Lipidosis (Feline)",
      species: ["cat"],
      category: "Internal Medicine / Hepatic",
      signals: {
        complaints_anorexia: 10, complaints_lethargy: 8, complaints_vomiting: 7,
        complaints_weight_loss: 7,
        mm_icteric: 7,
        bcs_obese: 7,
        age_middle: 5, age_old: 4,
        hpi_onset_subacute: 7, hpi_onset_chronic: 5,
        attitude_dull: 6, attitude_obtunded: 5,
        liver_hepatomegaly: 7,
        stress_event: 6
      },
      tests: {
        tier1: ["CBC","Chemistry (markedly elevated ALP, ALT, bilirubin)","UA (bilirubinuria)","Total bilirubin","Coagulation panel (PT/PTT)"],
        tier2: ["Abdominal ultrasound (hyperechoic liver)","Liver FNA (lipid-laden hepatocytes)","B12/folate","TLI","Abdominal radiograph"],
        tier3: ["Liver biopsy","CT abdomen"]
      },
      treatment: {
        medications: [
          "SAMe (S-adenosylmethionine) 20 mg/kg PO SID (hepatoprotectant)",
          "Vitamin K1 0.5–1 mg/kg SC/IM TID × 3 doses (coagulopathy)",
          "Thiamine 25–50 mg/cat IM/SC SID (prevent Wernicke's encephalopathy)",
          "Maropitant 1 mg/kg SC SID (antiemetic)",
          "IV fluid therapy (crystalloids + KCl + dextrose)"
        ],
        procedures: ["Esophagostomy tube (E-tube) placement — KEY intervention","Nasogastric/NE tube if E-tube not feasible","Hepatic biopsy (once coags normal)","Identify/treat underlying cause"],
        diet: ["Tube-feeding: High-protein, high-calorie (cats require protein, not restrict)","Hills a/d or Royal Canin Recovery food","Start at 25–33% RER, increase over 3–5 days to full RER","Feed small volumes frequently (q4–6h)"]
      },
      education: {
        monitor: ["Jaundice severity","Appetite (most important)","Weight","Vomiting/nausea","Tube feeding tolerance"],
        red_flags: ["Coagulopathy signs (petechiae, bleeding)","Hepatic encephalopathy (mental changes)","Failure to improve with tube feeding"],
        followup: "Daily monitoring during hospitalization; continue tube feeding at home 4–8 weeks; recheck biochemistry weekly",
        prognosis: "fair"
      }
    },

    {
      id: "feline_uri",
      name: "Feline Upper Respiratory Infection (URI)",
      species: ["cat"],
      category: "Internal Medicine / Respiratory / Infectious",
      signals: {
        complaints_sneezing: 9, complaints_eye_discharge: 8, complaints_nasal_discharge: 8,
        complaints_lethargy: 5, complaints_anorexia: 6,
        nose_serous_discharge: 7, nose_mucopurulent: 6,
        eyes_discharge_serous: 7, eyes_discharge_mucopurulent: 6,
        eyes_conjunctival_hyperemia: 7,
        hpi_onset_sudden: 7, hpi_onset_subacute: 5,
        env_kennel: 8, env_new_pet: 6, env_contact_stray: 6,
        age_kitten: 8, vaccine_overdue: 6, vaccine_never: 7
      },
      tests: {
        tier1: ["Clinical diagnosis (most cases)","Nasal/ocular swab for PCR (FHV-1, FCV, Chlamydophila, Bordetella)","Fluorescein stain (corneal ulcer?)"],
        tier2: ["CBC (if systemically ill)","Chemistry","Chest radiograph (rule out pneumonia)"],
        tier3: ["Rhinoscopy","CT sinuses","Culture"]
      },
      treatment: {
        medications: [
          "Doxycycline 5–10 mg/kg PO SID (Chlamydophila, Mycoplasma) — follow with water",
          "Azithromycin 5–10 mg/kg PO SID × 3–5d (alternative)",
          "Famciclovir 40–90 mg/kg PO TID (FHV-1 antiviral — dose adjustment by severity)",
          "L-lysine supplementation 250–500 mg/cat/day (FHV-1 — adjunct)",
          "Nasal decongestant: saline nose drops",
          "Eye: Oxytetracycline ophthalmic ointment TID (Chlamydophila)",
          "Supportive: Maropitant 1 mg/kg SID, assisted feeding"
        ],
        procedures: ["Nebulization with saline (loosen secretions)","Warm food to enhance smell","Maintain hydration","Isolation from other cats"],
        diet: ["Warm, strong-smelling food (increase appetite)","Assisted feeding if anorexic"]
      },
      education: {
        monitor: ["Nasal/ocular discharge character","Appetite and hydration","Breathing effort","Conjunctival severity"],
        red_flags: ["Respiratory distress","Stopped eating >24–48h","Corneal ulceration","Systemic illness"],
        followup: "Recheck 5–7 days; carriers may relapse under stress",
        prognosis: "good"
      }
    },

    {
      id: "feline_asthma",
      name: "Feline Asthma / Allergic Bronchitis",
      species: ["cat"],
      category: "Internal Medicine / Respiratory",
      signals: {
        complaints_coughing: 9, complaints_dyspnea: 8,
        resp_wheeze: 9, resp_increased_bv: 6, resp_muffled: 4,
        chest_open_mouth: 7, chest_accessory_muscles: 7,
        hpi_onset_sudden: 7, hpi_progression_worsening: 6,
        age_young: 5, age_middle: 5,
        breed_siamese: 5
      },
      tests: {
        tier1: ["Thoracic radiograph (hyperinflation, bronchial pattern)","CBC (eosinophilia)","Heartworm test (cats — rule out)"],
        tier2: ["BAL cytology (eosinophilic)","Fecal Baermann (Aelurostrongylus)","Bronchoscopy","Allergen testing"],
        tier3: ["CT thorax","Pulmonary function testing"]
      },
      treatment: {
        medications: [
          "Acute: Terbutaline 0.01 mg/kg SC/IM (bronchodilator)",
          "Acute: O2 supplementation 40–60%",
          "Acute: Dexamethasone SP 0.25–1 mg/kg IV/IM",
          "Chronic: Prednisolone 1–2 mg/kg PO SID × 2 weeks, taper",
          "Chronic: Fluticasone MDI (Flovent) 110 mcg/puff BID via spacer/mask",
          "Chronic: Albuterol MDI prn for acute episodes at home"
        ],
        procedures: ["O2 cage if in respiratory distress","Minimize handling during acute episode","AeroKat spacer device for inhaled meds"],
        diet: ["Avoid cigarette smoke, dusty litter, aerosols","Air purifier recommended"]
      },
      education: {
        monitor: ["Coughing frequency","Respiratory effort","Exercise tolerance","Response to inhaled medication"],
        red_flags: ["Open-mouth breathing","Cyanosis","No response to bronchodilator","Respiratory rate >60/min"],
        followup: "Recheck at 3–4 weeks; chest radiograph at 1–3 months",
        prognosis: "fair"
      }
    },

    {
      id: "mitral_valve_disease",
      name: "Myxomatous Mitral Valve Disease (MMVD)",
      species: ["dog"],
      category: "Internal Medicine / Cardiology",
      signals: {
        complaints_coughing: 7, complaints_dyspnea: 6, complaints_lethargy: 6,
        complaints_weight_loss: 4,
        cardiac_murmur_12: 5, cardiac_murmur_34: 8, cardiac_murmur_56: 9,
        cardiac_arrhythmia: 6,
        resp_crackles_fine: 6, resp_crackles_coarse: 6,
        age_old: 7, age_middle: 5,
        breed_cavalier: 9, breed_dachshund: 5, breed_poodle: 5, breed_chihuahua: 5,
        weight_small: 6
      },
      tests: {
        tier1: ["Cardiac auscultation","Thoracic radiograph (cardiomegaly, pulmonary edema)","ECG","Systolic blood pressure"],
        tier2: ["Echocardiography (gold standard — LA:Ao ratio, regurgitant fraction)","NT-proBNP (biomarker)","CBC/Chemistry","Holter monitor"],
        tier3: ["Cardiac CT/MRI","Catheterization (rare)"]
      },
      treatment: {
        medications: [
          "ACVIM Stage B2 (preclinical, enlarged LA): Pimobendan 0.25 mg/kg PO BID (evidence: EPIC trial)",
          "ACVIM Stage C (CHF): Furosemide 1–4 mg/kg PO BID–TID (titrate to effect)",
          "Stage C: Pimobendan 0.25 mg/kg PO BID",
          "Stage C: Enalapril/Benazepril 0.5 mg/kg PO SID–BID",
          "Refractory Stage C: Spironolactone 2 mg/kg PO SID",
          "Acute CHF: Furosemide 2–4 mg/kg IV/IM q1h until respiratory rate <30"
        ],
        procedures: ["Thoracocentesis if pleural effusion","O2 supplementation in acute CHF","Chest radiograph monitoring","Monthly rechecks for active CHF"],
        diet: ["Moderate sodium restriction (not salt-free)","Taurine supplementation if DCM suspected","Maintain BCS — avoid weight loss in CHF"]
      },
      education: {
        monitor: ["Resting respiratory rate at home (<30 rpm)","Exercise tolerance","Cough frequency","Appetite/weight"],
        red_flags: ["RR >40 rpm at rest","Blue gums/cyanosis","Collapse","Orthopnea (cannot lie flat)","Restlessness at night"],
        followup: "Stage B2: recheck q6 months; Stage C: q1–3 months; acute CHF q2 weeks initially",
        prognosis: "fair"
      }
    },

    {
      id: "heartworm_disease",
      name: "Heartworm Disease (Dirofilariasis)",
      species: ["dog","cat"],
      category: "Internal Medicine / Parasitology",
      signals: {
        complaints_coughing: 7, complaints_dyspnea: 6, complaints_lethargy: 6,
        complaints_weight_loss: 5,
        env_outdoor: 7, env_endemic_area: 6,
        prevention_none: 8,
        cardiac_murmur_12: 4,
        resp_crackles_fine: 5,
        age_young: 4, age_middle: 6
      },
      tests: {
        tier1: ["Heartworm antigen test (dogs)","Microfilaria test (modified Knott's)","CBC","Chemistry","Chest radiograph"],
        tier2: ["Echocardiography","Antigen test (cats — less sensitive)","Heartworm antibody (cats)","Thoracic radiograph"],
        tier3: ["Angiography","Surgical extraction (caval syndrome)"]
      },
      treatment: {
        medications: [
          "Pre-treatment workup: assess severity (Class I–IV)",
          "Doxycycline 10 mg/kg PO BID × 4 weeks (kills Wolbachia)",
          "Ivermectin (preventive dose) monthly × 3 months before melarsomine",
          "Melarsomine (Immiticide) 2.5 mg/kg deep IM (Day 1, then Day 30 and 31)",
          "Prednisolone 0.5 mg/kg PO SID × 4 weeks (reduce pulmonary reaction)",
          "Cage rest for 6–8 weeks post-treatment CRITICAL"
        ],
        procedures: ["Strict activity restriction post-treatment","Antigen test at 6 months post-treatment","Surgical extraction if caval syndrome"],
        diet: ["Normal; maintain good nutrition"]
      },
      education: {
        monitor: ["Exercise intolerance","Coughing","Respiratory distress post-treatment","Activity level"],
        red_flags: ["Respiratory distress after treatment (dead worm embolism)","Hemoptysis","Collapse — caval syndrome"],
        followup: "Test-of-cure antigen at 6 months; monthly prevention lifelong",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ ONCOLOGY ═════════════════════════════════════

    {
      id: "lymphoma",
      name: "Lymphoma (Multicentric/GI/Mediastinal)",
      species: ["dog","cat"],
      category: "Oncology",
      signals: {
        complaints_lethargy: 7, complaints_weight_loss: 8, complaints_anorexia: 7,
        complaints_vomiting: 5, complaints_diarrhea: 5, complaints_dyspnea: 5,
        lymph_mild: 5, lymph_moderate: 8, lymph_severe: 9,
        abdomen_cranial_mass: 7, abdomen_mesenteric_lymphadenopathy: 8,
        chest_accessory_muscles: 5,
        mm_pale: 6,
        age_middle: 6, age_old: 6,
        breed_golden: 7, breed_boxer: 6, breed_labrador: 5
      },
      tests: {
        tier1: ["CBC (lymphocytosis/cytopenia)","Chemistry","Chest + abdominal radiograph","FNA lymph node (cytology)"],
        tier2: ["PARR (PCR for antigen receptor rearrangement — B vs T cell)","Flow cytometry","Bone marrow aspirate","Abdominal ultrasound + lymph node FNA"],
        tier3: ["Lymph node biopsy (histopathology)","CT chest/abdomen/pelvis","Immunohistochemistry"]
      },
      treatment: {
        medications: [
          "CHOP protocol (dogs, B-cell): Cyclophosphamide, Doxorubicin, Vincristine, Prednisolone — 25-week protocol",
          "Doxorubicin monotherapy (alternative)",
          "COP protocol (Cyclophosphamide, Vincristine, Prednisolone) — lower cost",
          "CATS: COP or CHOP; Chlorambucil + Prednisolone for low-grade LGL",
          "Prednisolone alone: palliative (1 mg/kg/day)"
        ],
        procedures: ["Oncology referral strongly recommended","Staging workup","Bone marrow evaluation","Nutritional support"],
        diet: ["High-quality protein diet","Omega-3 supplementation","Maintain BCS"]
      },
      education: {
        monitor: ["Lymph node size","Appetite/weight","Side effects of chemo (vomiting, neutropenia)","Energy level"],
        red_flags: ["Fever during chemo (neutropenic sepsis — emergency)","Rapid lymph node growth","Respiratory distress","Hypercalcemia signs"],
        followup: "Weekly CBC during induction; recheck per protocol schedule; remission evaluation at week 4 and 8",
        prognosis: "fair"
      }
    },

    {
      id: "mast_cell_tumor",
      name: "Mast Cell Tumor (MCT)",
      species: ["dog","cat"],
      category: "Oncology",
      signals: {
        complaints_swelling_mass: 9, complaints_skin_lesions: 6,
        skin_neoplastic_mass: 9,
        abdomen_cranial_mass: 5, abdomen_mesenteric_lymphadenopathy: 5,
        vomiting: 5,
        breed_boxer: 8, breed_boston: 7, breed_labrador: 5, breed_bulldog: 6,
        age_middle: 5, age_old: 6
      },
      tests: {
        tier1: ["FNA of mass (most diagnostic — granular mast cells)","CBC","Chemistry","Buffy coat smear"],
        tier2: ["Surgical excision with wide margins + histopathology (Patnaik/Kiupel grading)","Regional lymph node FNA","Abdominal ultrasound (liver/spleen)","c-KIT mutation testing (exon 11)"],
        tier3: ["CT for staging (Grade 2–3)","Bone marrow aspirate (Grade 3)","Tryptase staining"]
      },
      treatment: {
        medications: [
          "Toceranib (Palladia) 2.5–3.2 mg/kg PO every other day (c-KIT mutation positive)",
          "Masitinib (Kinavet) 12.5 mg/kg PO SID (c-KIT mutation positive)",
          "Prednisone 2 mg/kg/day PO (anti-tumor + antihistamine)",
          "H1 blocker: Diphenhydramine 1 mg/kg PO/IV TID",
          "H2 blocker: Famotidine 0.5–1 mg/kg PO BID",
          "Vinblastine + Prednisolone (systemic chemotherapy)",
          "CCNU (Lomustine) + Prednisolone"
        ],
        procedures: ["Surgical excision (2–3 cm margins for Grade 2–3)","Radiation therapy post-surgery if incomplete margins","Oncology referral for Grade 2–3"],
        diet: []
      },
      education: {
        monitor: ["Mass size changes","New masses","GI signs (degranulation — vomiting, ulcers)","Lymph node size"],
        red_flags: ["Rapid mass growth","Severe GI hemorrhage (degranulation crisis)","Anaphylaxis after manipulation"],
        followup: "Grade 1: recheck q3 months; Grade 2: per protocol; Grade 3: aggressive monitoring",
        prognosis: "fair"
      }
    },

    {
      id: "mammary_tumor",
      name: "Mammary Gland Tumor",
      species: ["dog","cat"],
      category: "Oncology",
      signals: {
        complaints_swelling_mass: 9,
        mammary_mass_single: 8, mammary_mass_multiple: 9, mammary_ulceration: 7,
        sex_female_intact: 8, sex_female_spayed_late: 5,
        age_old: 8, age_middle: 5
      },
      tests: {
        tier1: ["FNA of mass (cytology)","Chest radiograph (3-view — metastasis check)","CBC","Chemistry"],
        tier2: ["Histopathology post-excision (gold standard)","Abdominal ultrasound","Regional lymph node FNA (inguinal/axillary)"],
        tier3: ["CT thorax/abdomen for staging","Hormone receptor testing","Ki-67 proliferation index"]
      },
      treatment: {
        medications: [
          "Surgical excision: lumpectomy (small, benign) or mastectomy (chain)",
          "Doxorubicin-based chemo if invasive/metastatic",
          "Cyclophosphamide + 5-FU protocol"
        ],
        procedures: ["Ovariohysterectomy concurrent with surgery (dogs — may benefit)","Wide surgical margins","Sentinel lymph node evaluation","Oncology referral if malignant"],
        diet: []
      },
      education: {
        monitor: ["Remaining mammary glands","Lymph node size","Chest radiograph q3 months","Wound healing"],
        red_flags: ["Rapid growth","Ulceration","Lymph node enlargement","Respiratory signs (lung mets)"],
        followup: "Recheck q1 month × 3, then q3 months; lifelong monitoring",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ OB/GYN ════════════════════════════════════════

    {
      id: "pyometra",
      name: "Pyometra (Open/Closed Cervix)",
      species: ["dog","cat"],
      category: "OB/GYN / Reproduction",
      signals: {
        complaints_polydipsia: 8, complaints_vomiting: 7, complaints_lethargy: 7,
        complaints_anorexia: 6, complaints_abdominal_distension: 6,
        complaints_vulvar_discharge: 8,
        vulvar_mucopurulent: 8, vulvar_bloody: 6,
        uterus_enlargement: 9, abdomen_distension: 7,
        sex_female_intact: 10,
        age_middle: 6, age_old: 7,
        hpi_recent_estrus: 8,
        hydration_moderate: 6, mm_tacky: 5
      },
      tests: {
        tier1: ["CBC (leukocytosis, left shift)","Chemistry (BUN/Cr — renal effects)","UA + culture","Abdominal radiograph (uterine enlargement)","Abdominal ultrasound"],
        tier2: ["Blood culture if septic","Coagulation profile","Blood glucose","Vaginal cytology/culture"],
        tier3: []
      },
      treatment: {
        medications: [
          "SURGICAL TREATMENT PREFERRED — ovariohysterectomy (OHE) is definitive",
          "IV fluid resuscitation pre-operatively (crystalloids)",
          "Ampicillin-sulbactam 22 mg/kg IV TID (perioperative)",
          "MEDICAL (open cervix only, breeding animal, informed owner):",
          "Aglepristone (Alizine) 10 mg/kg SC days 1, 2, 8 + PGF2α",
          "PGF2α (Dinoprost) 0.1–0.25 mg/kg SC SID × 5–7d (with monitoring)",
          "Post-medical: breed at next cycle; OHE recommended long-term"
        ],
        procedures: ["Emergency OHE (treatment of choice)","Perioperative fluids","IV antibiotics","ICU monitoring post-op"],
        diet: []
      },
      education: {
        monitor: ["Discharge amount/character (open cervix)","Temperature","Appetite","Hydration","Post-op wound"],
        red_flags: ["Closed-cervix pyometra is life-threatening — emergency surgery","Septic shock signs","Peritonitis (ruptured uterus)","Renal failure","DIC"],
        followup: "Post-op recheck at 7–10 days; spaying at next heat recommended if medical treatment",
        prognosis: "good"
      }
    },

    {
      id: "prostatic_disease",
      name: "Benign Prostatic Hyperplasia / Prostatitis",
      species: ["dog"],
      category: "OB/GYN / Reproduction",
      signals: {
        complaints_dysuria: 7, complaints_diarrhea: 4, complaints_lethargy: 5,
        complaints_bloody_discharge: 5,
        sex_male_intact: 9,
        perineal_hernia: 5,
        bladder_distension: 4,
        age_middle: 6, age_old: 7,
        hpi_onset_chronic: 5
      },
      tests: {
        tier1: ["Prostatic palpation (rectal exam)","Urinalysis + culture","Prostatic wash cytology","CBC","Chemistry"],
        tier2: ["Abdominal ultrasound (prostate size/architecture)","Semen evaluation","Brucella canis serology","Prostatic fluid culture"],
        tier3: ["CT/MRI","Prostatic biopsy","Cystoscopy"]
      },
      treatment: {
        medications: [
          "BPH: Osaterone acetate (Ypozane) 0.25–0.5 mg/kg PO SID × 7d",
          "BPH: Finasteride 0.1 mg/kg PO SID (slow — 3–5 months)",
          "Prostatitis: Enrofloxacin 5–10 mg/kg PO SID × 4–6 weeks (good prostate penetration)",
          "TMP-SMZ 15–30 mg/kg PO BID × 4–6 weeks",
          "Chloramphenicol 25 mg/kg PO TID (alternative)"
        ],
        procedures: ["Castration — most effective treatment for BPH and reduces recurrence","Prostatic drainage if abscess","Biopsy if neoplasia suspected"],
        diet: []
      },
      education: {
        monitor: ["Urination ease","Tenesmus","Discharge","Systemic signs"],
        red_flags: ["Fever (septic prostatitis)","Straining to urinate/defecate","Systemic illness","Spinal pain"],
        followup: "Ultrasound at 4 weeks post-treatment; castration strongly recommended",
        prognosis: "good"
      }
    },

    // ═══════════════════════════ NEUROLOGY ═════════════════════════════════════

    {
      id: "ivdd",
      name: "Intervertebral Disc Disease (IVDD)",
      species: ["dog","cat"],
      category: "Neurology",
      signals: {
        complaints_limping: 8, complaints_behavioral: 5, complaints_collapse: 6,
        posture_kyphosis: 8, posture_low_head: 5,
        neuro_reflexes_hypo: 7, neuro_reflexes_hyper: 5,
        limbs_joint_pain: 7, limbs_muscle_atrophy: 6,
        gait_ataxia: 7, gait_non_weight: 7, gait_paralysis: 9,
        abdomen_pain_cranial: 5,
        hpi_onset_sudden: 8, hpi_progression_worsening: 7,
        breed_dachshund: 9, breed_beagle: 6, breed_cocker: 5, breed_shih_tzu: 6,
        breed_pekingese: 7, breed_basset: 7, breed_bulldog: 5,
        age_young: 5, age_middle: 7
      },
      tests: {
        tier1: ["Complete neuro exam","Spinal radiograph (disc calcification, narrowed space)","CBC/Chemistry"],
        tier2: ["CT myelogram (preferred for surgical planning)","MRI spine (gold standard — soft tissue)","CSF analysis"],
        tier3: ["Advanced MRI","EMG/nerve conduction studies"]
      },
      treatment: {
        medications: [
          "Grade I–II (pain, no neuro deficits): Strict cage rest × 4–6 weeks",
          "Carprofen 2.2 mg/kg PO BID OR Meloxicam 0.1 mg/kg PO SID (NSAID)",
          "Gabapentin 5–10 mg/kg PO BID–TID (neuropathic pain)",
          "Methocarbamol 15–20 mg/kg PO TID (muscle relaxant)",
          "DO NOT combine corticosteroids with NSAIDs",
          "Prednisolone ONLY if no NSAID: 0.5–1 mg/kg PO SID × 3–5d (controversial)"
        ],
        procedures: ["Surgical decompression (hemilaminectomy/ventral slot) for Grade III–V","Neuro referral urgently for Grade IV–V","Bladder management (manual expression or catheter) if urinary retention","Rehabilitation physiotherapy post-surgery"],
        diet: ["Weight management — reduce load on spine","Ramps instead of stairs","Orthopaedic bed"]
      },
      education: {
        monitor: ["Limb movement and strength","Bladder/bowel control","Pain level","Deep pain perception"],
        red_flags: ["Loss of deep pain — emergency surgery needed within 24–48h","Bladder paralysis","Rapid deterioration","Grade V with no response"],
        followup: "Recheck neuro exam at 2 weeks; surgery referral if deteriorating; PT at 4–6 weeks",
        prognosis: "fair"
      }
    },

    {
      id: "epilepsy",
      name: "Epilepsy (Idiopathic / Structural)",
      species: ["dog","cat"],
      category: "Neurology",
      signals: {
        complaints_seizures: 10, complaints_behavioral: 5, complaints_collapse: 6,
        neuro_seizure: 10, neuro_nystagmus: 4, neuro_disoriented: 5,
        hpi_onset_sudden: 7,
        age_young: 6, age_middle: 5,
        breed_beagle: 6, breed_belgian: 7, breed_lab: 5, breed_golden: 5, breed_border_collie: 6
      },
      tests: {
        tier1: ["CBC","Chemistry (BUN, glucose, Ca, Na — rule out metabolic)","UA","Blood pressure"],
        tier2: ["MRI brain (structural epilepsy vs idiopathic)","CSF analysis","Bile acids (hepatic encephalopathy)","Thoracic radiograph"],
        tier3: ["EEG","Advanced brain MRI","Toxicology screen","Neuro referral"]
      },
      treatment: {
        medications: [
          "Acute seizure: Diazepam 0.5 mg/kg IV/IM/PR (rectal) — repeat × 2 prn",
          "Status epilepticus: Levetiracetam 30–60 mg/kg IV loading dose",
          "Phenobarbital (chronic): 2–3 mg/kg PO BID (monitor serum levels q6 months)",
          "Potassium bromide (dogs only): 20–30 mg/kg PO SID — slow onset (3–6 months)",
          "Levetiracetam (Keppra): 20–60 mg/kg PO TID — safe, rapid onset",
          "Zonisamide: 5–10 mg/kg PO SID–BID (cats preferred — phenobarb hepatotoxic in cats)"
        ],
        procedures: ["Start AED when ≥2 seizures/6 months or cluster/status epilepticus","MRI for all onset <1 year or >5 years or focal signs","Serum phenobarbital level 2 weeks after start, then q6 months"],
        diet: ["MCT oil diet (dogs) — may reduce seizure frequency","Stable routine"]
      },
      education: {
        monitor: ["Seizure diary (frequency, duration, severity)","Post-ictal behavior","Medication compliance","Sedation/ataxia from AEDs","Liver enzymes (phenobarbital)"],
        red_flags: ["Cluster seizures (>2 in 24h)","Status epilepticus >5 minutes","New neurological deficits between seizures","Rapidly increasing frequency"],
        followup: "Serum drug levels at 2 weeks and 6 months; CBC/Chemistry q6 months (phenobarbital)",
        prognosis: "fair"
      }
    },

    {
      id: "vestibular_syndrome",
      name: "Vestibular Syndrome (Peripheral/Central)",
      species: ["dog","cat"],
      category: "Neurology",
      signals: {
        complaints_collapse: 6, complaints_behavioral: 5,
        neuro_nystagmus: 9, neuro_circling: 8, neuro_disoriented: 7,
        posture_head_tilt: 9, posture_wide_based: 7,
        gait_ataxia: 8,
        hpi_onset_sudden: 9,
        age_old: 8,
        ears_discharge: 5, ears_mass: 4
      },
      tests: {
        tier1: ["Complete neuro exam (peripheral vs central differentiation)","Otoscopy","CBC/Chemistry","Blood pressure"],
        tier2: ["MRI brain (if central signs: vertical nystagmus, other CN deficits)","CSF analysis","Thyroid panel","Bulla radiograph/CT"],
        tier3: ["Advanced MRI","BAER test","Referral neurology"]
      },
      treatment: {
        medications: [
          "Peripheral (idiopathic): Supportive care — resolves in 2–6 weeks",
          "Meclizine 25 mg PO SID (motion sickness/nausea)",
          "Maropitant 1 mg/kg SC/PO SID (nausea)",
          "Diazepam 0.2–0.5 mg/kg PO TID prn (acute vestibular signs)",
          "Otitis media/interna: Enrofloxacin 5–10 mg/kg PO SID + anti-inflammatory",
          "Central (GME/meningoencephalitis): Prednisolone 2 mg/kg PO SID + cyclosporine/cytarabine"
        ],
        procedures: ["Ear cleaning (otitis)","Bulla osteotomy if chronic otitis media","Anti-fall measures (padded environment)","Feeding support (nausea/disorientation)"],
        diet: []
      },
      education: {
        monitor: ["Head tilt severity","Nystagmus direction/resolution","Ability to eat/drink","Fall risk","Any other neurological signs"],
        red_flags: ["Vertical nystagmus (central lesion)","Multiple cranial nerve deficits","Not improving by 72h","Mental status changes","Worsening"],
        followup: "Recheck at 1 week; MRI if not clearly peripheral or not improving by 2 weeks",
        prognosis: "good"
      }
    },

    // ═══════════════════════════ EMERGENCY ════════════════════════════════════

    {
      id: "gdv",
      name: "Gastric Dilatation-Volvulus (GDV)",
      emergency: true,
      species: ["dog"],
      category: "Emergency / Surgery",
      signals: {
        complaints_abdominal_distension: 10, complaints_vomiting: 8, complaints_collapse: 7,
        complaints_lethargy: 7,
        abdomen_distension: 10, abdomen_tense: 8, abdomen_pain_severe: 9,
        mm_pale: 8, mm_tacky: 7, crt_prolonged: 7,
        hydration_severe: 7,
        attitude_dull: 7, attitude_obtunded: 6,
        hr_high: 8, cardiac_arrhythmia: 6,
        hpi_onset_sudden: 10, hpi_progression_worsening: 9,
        breed_great_dane: 9, breed_german_shepherd: 7, breed_doberman: 7,
        breed_bloodhound: 8, breed_standard_poodle: 7, breed_weimaraner: 7,
        weight_large: 7, weight_giant: 8,
        feeding_large_meal: 6, feeding_post_exercise: 5
      },
      tests: {
        tier1: ["Right lateral abdominal radiograph (double-bubble/shelf sign)","CBC","Chemistry","Electrolytes","Lactate","ECG (arrhythmias)"],
        tier2: ["Coagulation profile (DIC)","Blood gas","Cross-match/blood type"],
        tier3: []
      },
      treatment: {
        medications: [
          "EMERGENCY — SURGICAL CORRECTION REQUIRED",
          "IV fluid resuscitation: 90 mL/kg/hr crystalloids (shock boluses 20 mL/kg)",
          "Lidocaine CRI 25–80 mcg/kg/min IV (ventricular arrhythmias)",
          "Opioid pain: Methadone 0.2–0.3 mg/kg IV",
          "Gastric decompression: orogastric tube or trocar"
        ],
        procedures: ["Emergency gastric decompression","Emergency surgery: detorsion + gastropexy","Blood transfusion if needed","Splenectomy if splenic compromise","Ventricular arrhythmia management"],
        diet: []
      },
      education: {
        monitor: ["This is a life-threatening emergency — DO NOT DELAY","Post-op cardiac monitoring 24–48h","Lactate normalization","Pain level","GI motility return"],
        red_flags: ["ANY delay in surgery increases mortality dramatically","Recurrence without gastropexy = 70%+ chance"],
        followup: "ICU monitoring 48–72h post-op; recheck lactate, ECG; discharge when stable eating",
        prognosis: "guarded"
      }
    },

    {
      id: "urethral_obstruction",
      name: "Urethral Obstruction (Blocked Cat)",
      emergency: true,
      species: ["cat","dog"],
      category: "Emergency / Urology",
      signals: {
        complaints_dysuria: 10, complaints_lethargy: 7, complaints_anorexia: 6,
        complaints_vomiting: 5, complaints_collapse: 5,
        bladder_distension: 10,
        vulvar_prepuce_discharge: 4,
        sex_male_intact: 7, sex_male_neutered: 6,
        mm_pale: 5, mm_tacky: 5,
        attitude_dull: 7, attitude_obtunded: 6,
        hr_low: 5, cardiac_arrhythmia: 5,
        hpi_onset_sudden: 9, hpi_progression_worsening: 8,
        breed_persian: 5, breed_himalayan: 4
      },
      tests: {
        tier1: ["Urinalysis (sediment, crystals, culture)","CBC","Chemistry (BUN, Cr, K+ — CRITICAL)","ECG (hyperkalemia effects)","Bladder palpation"],
        tier2: ["Abdominal radiograph + contrast","Abdominal ultrasound","Urine culture","Blood gas (metabolic acidosis)"],
        tier3: ["Cystoscopy","CT abdomen"]
      },
      treatment: {
        medications: [
          "EMERGENCY — immediate unblocking required",
          "Hyperkalemia (K+ >6.5): Calcium gluconate 10% 0.5–1 mL/kg IV slowly (cardioprotective)",
          "Sodium bicarbonate 1–2 mEq/kg IV (metabolic acidosis/hyperkalemia)",
          "Regular insulin 0.5 IU/kg IV + dextrose (drive K into cells)",
          "IV fluid: 0.9% NaCl (avoid LRS with hyperkalemia — contains K)",
          "Post-unblocking: Prazosin 0.5–1 mg/cat PO SID–BID (urethral relaxation)",
          "Phenoxybenzamine 0.25 mg/kg PO BID (alpha-blocker, smooth muscle relaxation)",
          "Buprenorphine 0.01–0.02 mg/kg IV/buccal TID (pain)"
        ],
        procedures: ["Urethral catheterization + flush","Indwelling catheter 24–72h","IV fluid diuresis post-catheterization","Periurethral analgesia (lidocaine gel)","PU surgery (perineal urethrostomy) if refractory"],
        diet: ["Urinary prescription diet lifelong (Hills c/d, Royal Canin Urinary)","Increased water intake — add water to food, water fountain","Wet food preferred"]
      },
      education: {
        monitor: ["Urination ability at home after discharge","Urine stream strength","Straining/posturing","Appetite/lethargy"],
        red_flags: ["ANY straining without urination — return to ER immediately","Crying in pain","Not urinating by 6h post-discharge","Vomiting/collapse"],
        followup: "Recheck 48–72h post-discharge; urinalysis + culture at 7–10 days; repeat at 1 month",
        prognosis: "good"
      }
    },

    {
      id: "hemoabdomen",
      name: "Hemoabdomen",
      emergency: true,
      species: ["dog","cat"],
      category: "Emergency / Surgery",
      signals: {
        complaints_collapse: 9, complaints_abdominal_distension: 8, complaints_lethargy: 8,
        complaints_anorexia: 6,
        abdomen_distension: 8, abdomen_fluid_wave: 9, abdomen_pain_moderate: 6,
        mm_pale: 9, mm_white: 8, crt_prolonged: 8,
        hydration_severe: 7,
        attitude_obtunded: 7,
        hr_high: 8,
        hpi_onset_sudden: 9,
        breed_golden: 8, breed_german_shepherd: 7, breed_lab: 5
      },
      tests: {
        tier1: ["PCV/TP (blood loss)","Abdominal ultrasound (FAST scan — free fluid)","Abdominocentesis (confirm blood)","CBC","Chemistry","Coag panel"],
        tier2: ["Blood type/cross-match","Chest radiograph (mets check)","Full body radiograph","Echocardiography"],
        tier3: ["CT abdomen","Biopsy at surgery"]
      },
      treatment: {
        medications: [
          "EMERGENCY — surgical exploration",
          "Aggressive fluid resuscitation: 20 mL/kg IV crystalloid boluses",
          "Blood transfusion (pRBC) if PCV <20%",
          "Fresh frozen plasma (FFP) if coagulopathy",
          "Opioid analgesia: Methadone 0.2–0.3 mg/kg IV"
        ],
        procedures: ["Emergency exploratory laparotomy","Splenectomy (HSA)","Liver lobectomy","Histopathology of excised mass","Post-op oncology consult"],
        diet: []
      },
      education: {
        monitor: ["PCV trends","Abdominal girth","Mentation","Pain level","Post-op recovery"],
        red_flags: ["Hemangiosarcoma (most common cause in dogs) — often metastatic at presentation","Ruptured splenic mass — must rule out malignancy"],
        followup: "Histopathology results → determine chemotherapy (doxorubicin protocol for HSA); recheck q2 weeks",
        prognosis: "guarded"
      }
    },

    {
      id: "aortic_thromboembolism",
      name: "Aortic Thromboembolism (ATE) — Cats",
      emergency: true,
      species: ["cat"],
      category: "Emergency / Cardiology",
      signals: {
        complaints_collapse: 9, complaints_limping: 8, complaints_dyspnea: 6,
        gait_non_weight: 9, gait_paralysis: 9,
        limbs_cold: 9,
        mm_cyanotic: 7, mm_pale: 6,
        cardiac_murmur_12: 5, cardiac_murmur_34: 6,
        resp_muffled: 5,
        hpi_onset_sudden: 10,
        age_middle: 6, age_old: 7,
        breed_maine_coon: 6, breed_ragdoll: 6
      },
      tests: {
        tier1: ["Physical exam (absent femoral pulses, cold paws, pain)","Echocardiography (HCM)","Thoracic radiograph","CBC/Chemistry","Coag panel","Troponin I"],
        tier2: ["Doppler BP all 4 limbs","NT-proBNP","D-dimer","Lactate"],
        tier3: ["CT angiography","Advanced cardiac workup"]
      },
      treatment: {
        medications: [
          "PAIN MANAGEMENT: Buprenorphine 0.02 mg/kg IV TID (critical)",
          "Unfractionated heparin: 300 IU/kg IV bolus, then 250 IU/kg SC TID",
          "Low-molecular-weight heparin: Enoxaparin (Lovenox) 1–1.5 mg/kg SC BID",
          "Clopidogrel (Plavix) 18.75 mg/cat PO SID (secondary prevention — FATCAT trial)",
          "Aspirin 81 mg/cat PO q72h (alternative)",
          "Treat underlying HCM: Atenolol, diltiazem",
          "Thrombolytics: streptokinase/tPA — high risk, rarely used"
        ],
        procedures: ["Warm, padded environment (avoid active rewarming of limbs)","O2 supplementation","Fluid therapy cautiously (HCM risk of fluid overload)","Supportive care for limb reperfusion injury (hyperkalemia)"],
        diet: []
      },
      education: {
        monitor: ["Limb warmth and return of pulse","Urine output","Pain level","Cardiac status","Reperfusion hyperkalemia"],
        red_flags: ["Very guarded prognosis — 70–75% recurrence without prevention","Cardiac decompensation during recovery","Recurrence"],
        followup: "Daily monitoring; discharge when limb function returning; echocardiography at 4 weeks; clopidogrel lifelong",
        prognosis: "poor"
      }
    },

    {
      id: "toxin_xylitol",
      name: "Xylitol Toxicosis",
      emergency: true,
      species: ["dog"],
      category: "Emergency / Toxicology",
      signals: {
        complaints_vomiting: 7, complaints_collapse: 7, complaints_seizures: 6,
        complaints_lethargy: 6,
        hpi_onset_sudden: 9,
        neuro_seizure: 7,
        attitude_obtunded: 6,
        mm_pale: 5,
        history_toxin_ingestion: 10
      },
      tests: {
        tier1: ["Blood glucose (hypoglycemia)","CBC","Chemistry (liver — delayed hepatotoxicity 24–72h)","Coag panel (hepatic necrosis)"],
        tier2: ["Urinalysis","Electrolytes","Blood type"],
        tier3: []
      },
      treatment: {
        medications: [
          "EMERGENCY — if <2h post-ingestion: induce emesis (apomorphine 0.03–0.04 mg/kg SC/IV)",
          "DO NOT induce emesis if seizures or neurological signs present",
          "Dextrose 50%: 0.5–1 mL/kg IV bolus if hypoglycemic → dextrose CRI 2.5–5%",
          "Monitor blood glucose q1–2h for 12–24h",
          "SAMe, N-acetylcysteine (hepatic protection): SAMe 20 mg/kg PO SID",
          "Vitamin K1 0.5 mg/kg SC TID (if coagulopathy)"
        ],
        procedures: ["Activated charcoal (limited use — absorbed quickly)","IV fluid support","ICU monitoring 24–72h (hepatic damage may be delayed)","Gastric lavage if large ingestion"],
        diet: []
      },
      education: {
        monitor: ["Blood glucose q2h for 24h","Hepatic enzymes at 24h, 48h, 72h","Coagulation status","Neurological signs"],
        red_flags: ["Hypoglycemia refractory to dextrose","Seizures","Jaundice (hepatic failure)","Coagulopathy","Collapse"],
        followup: "Hepatic panel at 24–72h; discharge only if glucose stable and liver values normal",
        prognosis: "fair"
      }
    },

    {
      id: "toxin_permethrin",
      name: "Permethrin Toxicosis (Cats)",
      emergency: true,
      species: ["cat"],
      category: "Emergency / Toxicology",
      signals: {
        complaints_seizures: 9, complaints_behavioral: 7, complaints_collapse: 7,
        neuro_seizure: 10, neuro_hyperreflexia: 8,
        skin_topical_applied: 7,
        hpi_onset_sudden: 9,
        history_toxin_ingestion: 8
      },
      tests: {
        tier1: ["Clinical diagnosis (history + signs)","CBC","Chemistry","Temperature (hyperthermia)"],
        tier2: [],
        tier3: []
      },
      treatment: {
        medications: [
          "EMERGENCY — bathe cat thoroughly with dish soap (Dawn) IMMEDIATELY",
          "Methocarbamol 55–220 mg/kg IV slowly (muscle fasciculations/tremors) — repeat prn",
          "Diazepam 0.5 mg/kg IV (seizures — second line)",
          "Phenobarbital 2–4 mg/kg IV (refractory seizures)",
          "IV fluids for temperature management and support",
          "Cooling measures if hyperthermia (>40°C)"
        ],
        procedures: ["Immediate bathing — remove source","IV catheter","Temperature monitoring","Oxygen","ICU 24–48h"],
        diet: []
      },
      education: {
        monitor: ["Tremor/seizure frequency and severity","Temperature","Hydration","Recovery of normal mentation"],
        red_flags: ["Hyperthermia + uncontrolled seizures = life-threatening","Respiratory depression"],
        followup: "Discharge when tremor-free and eating; warn owners NEVER use dog flea products on cats",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ MUSCULOSKELETAL ════════════════════════════════

    {
      id: "ccl_rupture",
      name: "Cranial Cruciate Ligament Rupture (CCL/ACL)",
      species: ["dog","cat"],
      category: "Musculoskeletal / Orthopaedics",
      signals: {
        complaints_limping: 9, complaints_swelling_mass: 5,
        gait_mild_lameness: 6, gait_moderate_lameness: 8, gait_non_weight: 7,
        limbs_joint_swelling: 8, limbs_joint_pain: 8, limbs_crepitus: 5,
        hpi_onset_sudden: 7, hpi_onset_subacute: 5,
        bcs_obese: 6,
        breed_labrador: 7, breed_rottweiler: 7, breed_golden: 6,
        breed_newfoundland: 7, breed_mastiff: 6
      },
      tests: {
        tier1: ["Orthopaedic exam (cranial drawer sign, tibial thrust)","Radiograph stifle joint (medial buttress, effusion)","CBC/Chemistry pre-surgical"],
        tier2: ["CT stifle (tibial plateau angle measurement)","Arthrocentesis (rule out septic arthritis, immune-mediated)","Chest + abdomen radiograph (pre-surgical staging)"],
        tier3: ["MRI stifle","Arthroscopy"]
      },
      treatment: {
        medications: [
          "Pre-surgical: Carprofen 2.2 mg/kg PO BID OR Meloxicam 0.1 mg/kg PO SID",
          "Gabapentin 5–10 mg/kg PO BID (neuropathic pain)",
          "Post-surgical: Continue NSAID × 4–6 weeks; taper",
          "Tramadol 2–5 mg/kg PO BID–TID (short-term post-surgical)"
        ],
        procedures: [
          "TPLO (Tibial Plateau Leveling Osteotomy) — gold standard for dogs >15 kg",
          "TTA (Tibial Tuberosity Advancement) — alternative",
          "Lateral suture/Extracapsular repair — small dogs/cats",
          "Post-surgical physiotherapy (hydrotherapy, PROM, controlled leash walking)",
          "Orthopaedic referral recommended"
        ],
        diet: ["Weight loss to optimal BCS (critical)","Joint supplements: Omega-3, glucosamine/chondroitin","Hills j/d or prescription joint diet"]
      },
      education: {
        monitor: ["Weight-bearing improvement","Muscle mass return","Stifle swelling","Contralateral limb (30–50% develop bilateral CCL within 2 years)"],
        red_flags: ["Non-weight bearing after surgery","Increased swelling/heat at surgical site","Tibial fracture (implant failure — rare)"],
        followup: "Radiograph at 6–8 weeks post-op; PT milestones monthly × 6 months",
        prognosis: "good"
      }
    },

    {
      id: "hip_dysplasia",
      name: "Canine Hip Dysplasia (CHD)",
      species: ["dog"],
      category: "Musculoskeletal / Orthopaedics",
      signals: {
        complaints_limping: 7, complaints_behavioral: 4,
        gait_mild_lameness: 6, gait_moderate_lameness: 7,
        limbs_reduced_rom: 7, limbs_crepitus: 7, limbs_joint_pain: 7, limbs_muscle_atrophy: 6,
        posture_wide_based: 5,
        hpi_onset_chronic: 7, hpi_progression_worsening: 5,
        breed_labrador: 7, breed_golden: 7, breed_german_shepherd: 7,
        breed_rottweiler: 6, breed_saint_bernard: 7,
        age_young: 5, age_middle: 6, age_old: 5,
        bcs_obese: 6
      },
      tests: {
        tier1: ["Orthopaedic exam (Ortolani sign)","Hip radiograph (OFA/PennHIP view)","CBC/Chemistry"],
        tier2: ["PennHIP distraction index","CT (detailed joint morphology)","Chest radiograph (pre-surgical)"],
        tier3: ["MRI","Force plate gait analysis","Arthroscopy"]
      },
      treatment: {
        medications: [
          "Medical management: Carprofen 2.2 mg/kg PO BID OR Meloxicam 0.1 mg/kg PO SID",
          "Grapiprant (Galliprant) 2 mg/kg PO SID (novel MOA, GI safer)",
          "Gabapentin 5–10 mg/kg PO BID (neuropathic component)",
          "Maropitant 1 mg/kg PO SID (with NSAIDs for GI protection)",
          "Adequan polysulfated glycosaminoglycan 4.4 mg/kg IM twice weekly × 4 weeks"
        ],
        procedures: ["Juvenile pubic symphysiodesis (<20 weeks old)","Triple/double pelvic osteotomy (<12 months)","Total hip replacement (THR) — gold standard","Femoral head and neck ostectomy (FHO) — palliative","Weight management + physiotherapy + hydrotherapy"],
        diet: ["Weight loss to BCS 4–5/9","Hills j/d or Royal Canin Joint diet","Omega-3 supplementation (30 mg EPA/kg/day)"]
      },
      education: {
        monitor: ["Lameness scoring","Muscle mass","Exercise tolerance","Weight management"],
        red_flags: ["Sudden non-weight bearing","Rapid deterioration","Failure to respond to analgesics — consider surgery"],
        followup: "Recheck q2–3 months; radiograph annually; surgical consultation if medical management fails",
        prognosis: "fair"
      }
    },

    {
      id: "osteoarthritis",
      name: "Osteoarthritis (OA)",
      species: ["dog","cat"],
      category: "Musculoskeletal",
      signals: {
        complaints_limping: 7, complaints_behavioral: 5,
        gait_mild_lameness: 6, gait_moderate_lameness: 7,
        limbs_joint_pain: 7, limbs_crepitus: 8, limbs_reduced_rom: 7, limbs_muscle_atrophy: 6,
        hpi_onset_chronic: 8, hpi_progression_worsening: 6,
        age_middle: 6, age_old: 8,
        bcs_obese: 7
      },
      tests: {
        tier1: ["Orthopaedic exam","Joint radiographs (osteophytes, subchondral sclerosis, joint space)","CBC/Chemistry (before NSAID use)"],
        tier2: ["Arthrocentesis (rule out septic/immune-mediated)","Force plate analysis","CT (detailed)"],
        tier3: ["MRI","Synovial biopsy"]
      },
      treatment: {
        medications: [
          "Meloxicam 0.1 mg/kg PO SID (dogs) OR 0.05 mg/kg PO SID then q48h (cats — long-term use)",
          "Carprofen 2.2 mg/kg PO BID (dogs)",
          "Grapiprant 2 mg/kg PO SID (dogs — safer GI profile)",
          "Adequan 4.4 mg/kg IM twice weekly × 4w, then monthly (PSGAG)",
          "Gabapentin 5–10 mg/kg PO BID (neuropathic component)",
          "Maropitant prn (GI protection with NSAIDs)",
          "Solensia (frunevetmab) monthly SC injection — cats (anti-NGF therapy, highly effective)"
        ],
        procedures: ["Physiotherapy","Hydrotherapy","Weight management","Orthopaedic beds","Joint supplements","LASER therapy","Acupuncture"],
        diet: ["Weight loss if BCS >5/9","Hills j/d or equivalent joint diet","Omega-3 (EPA/DHA 40 mg/kg/day)","Glucosamine/chondroitin supplementation"]
      },
      education: {
        monitor: ["Lameness scoring at home","Willingness to exercise","Morning stiffness","Response to medication"],
        red_flags: ["Sudden non-weight bearing (fracture/septic arthritis)","GI signs with NSAID use (stop medication)","No response after 2 weeks NSAID trial"],
        followup: "Recheck q3–6 months; CBC/Chemistry q6 months for NSAID monitoring",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ FELINE SPECIFIC ════════════════════════════════

    {
      id: "fip",
      name: "Feline Infectious Peritonitis (FIP)",
      species: ["cat"],
      category: "Internal Medicine / Infectious",
      signals: {
        complaints_abdominal_distension: 8, complaints_lethargy: 8, complaints_anorexia: 7,
        complaints_weight_loss: 7, complaints_dyspnea: 5, complaints_seizures: 5,
        abdomen_fluid_wave: 8, abdomen_distension: 8,
        mm_icteric: 5,
        lymph_moderate: 5, lymph_severe: 5,
        age_kitten: 8, age_young: 7,
        env_kennel: 7, env_contact_other_pets: 5,
        attitude_dull: 7, attitude_obtunded: 5,
        temp_high: 6,
        neuro_disoriented: 5, neuro_nystagmus: 4
      },
      tests: {
        tier1: ["CBC (lymphopenia, non-regenerative anemia)","Chemistry (elevated globulins, low albumin)","A:G ratio (<0.8 suspicious)","Effusion analysis (Rivalta test, protein/cell count, appearance)","FCoV antibody titer"],
        tier2: ["Effusion PCR (FIP virus)","Serum AGP (alpha-1-acid glycoprotein)","Abdominal/thoracic ultrasound","CSF analysis (neurological FIP)","Ocular exam (uveitis)"],
        tier3: ["Histopathology (lymph node, pyogranulomatous lesions)","FIP PCR IHC on tissue"]
      },
      treatment: {
        medications: [
          "GS-441524 (antiviral nucleoside analog) — now approved as Felpreva in many countries",
          "Remdesivir (prodrug of GS-441524) — off-label",
          "Dosing: GS-441524 4–12 mg/kg SC SID (wet form lower dose; neuro/ocular higher dose)",
          "Treatment duration: 12 weeks minimum; extend for neuro/ocular cases",
          "Prednisolone 2 mg/kg PO SID (adjunct for inflammation during first weeks)",
          "Supportive: B-complex vitamins, appetite stimulants"
        ],
        procedures: ["Effusion drainage (therapeutic)","Nutritional support (E-tube if needed)","Monitoring: weekly CBC/chemistry","PCR follow-up","Referral to FIP-experienced clinic strongly recommended"],
        diet: ["High quality diet","Appetite stimulants (mirtazapine 1.88 mg/cat PO q48h)"]
      },
      education: {
        monitor: ["Appetite and weight (key indicator of response)","Effusion reduction","Neurological sign improvement","CBC (lymphocyte count)","Weekly bloodwork initially"],
        red_flags: ["Rapid deterioration","No response by week 3–4 (reassess diagnosis/dose)","Neurological worsening"],
        followup: "Weekly monitoring for 4 weeks; then every 2 weeks; treat minimum 12 weeks; retest at 3 months post-treatment",
        prognosis: "good"
      }
    },

    {
      id: "felv_fiv",
      name: "FeLV / FIV (Feline Retroviral Infections)",
      species: ["cat"],
      category: "Internal Medicine / Infectious / Oncology",
      signals: {
        complaints_lethargy: 7, complaints_weight_loss: 6, complaints_anorexia: 6,
        complaints_vomiting: 4, complaints_diarrhea: 4,
        mm_pale: 6,
        lymph_moderate: 6, lymph_severe: 6,
        age_young: 5,
        env_outdoor: 7, env_contact_stray: 8, env_contact_other_pets: 6,
        vaccine_overdue: 5, vaccine_never: 5,
        hpi_onset_chronic: 6, hpi_progression_worsening: 5,
        oral_stomatitis: 7
      },
      tests: {
        tier1: ["FeLV antigen ELISA + FIV antibody ELISA (combo test)","CBC (anemia, leukopenia)","Chemistry","UA"],
        tier2: ["FeLV immunofluorescence (IFA — bone marrow — confirms progressive infection)","Western blot for FIV (confirm)","Viral load PCR (quantitative FeLV)","Bone marrow aspirate"],
        tier3: ["Flow cytometry","Lymph node biopsy (lymphoma vs reactive)","Full infectious disease panel"]
      },
      treatment: {
        medications: [
          "No curative treatment — supportive and symptomatic",
          "FeLV: Interferon omega (Virbagen Omega) 10^6 IU/kg SC SID × 5d alternating months",
          "FIV: AZT (zidovudine) 5–10 mg/kg PO BID (may cause anemia — monitor CBC)",
          "Treat opportunistic infections aggressively",
          "Darbepoetin for anemia if PCV <15%",
          "Prednisolone for immune-mediated complications"
        ],
        procedures: ["Isolation from FeLV/FIV-negative cats","Strict indoor only","Regular health checks","Treat secondary infections promptly","Dental prophylaxis (FIV stomatitis)"],
        diet: ["No raw diet (immunosuppression — food safety)","High quality balanced diet","No unpasteurized foods"]
      },
      education: {
        monitor: ["CBC monthly initially","Body weight","Signs of secondary infection","Lymph node size","Oral health"],
        red_flags: ["Lymphoma development","Severe anemia","Neurological signs","Uncontrolled secondary infections"],
        followup: "CBC/chemistry q3 months; retroviral test negative cats in multi-cat household q6 months",
        prognosis: "guarded"
      }
    },

    // ═══════════════════════════ EXOTIC ANIMALS ════════════════════════════════

    {
      id: "gi_stasis_rabbit",
      name: "GI Stasis (Rabbit)",
      species: ["rabbit"],
      category: "Internal Medicine / Exotic",
      signals: {
        complaints_anorexia: 10, complaints_lethargy: 7, complaints_abdominal_distension: 6,
        abdomen_distension: 7, abdomen_pain_moderate: 6,
        hpi_onset_sudden: 7,
        diet_pellet_only: 5, diet_low_hay: 6
      },
      tests: {
        tier1: ["Abdominal radiograph (gas pattern, cecal contents)","Auscultation (reduced gut sounds)","Temperature","Blood glucose","Chemistry"],
        tier2: ["Abdominal ultrasound","CBC","Electrolytes"],
        tier3: ["Contrast study","CT"]
      },
      treatment: {
        medications: [
          "Fluid therapy: SC/IV crystalloids if dehydrated",
          "Simethicone 40–80 mg PO TID (gas)",
          "Metoclopramide 0.5 mg/kg SC/PO BID–TID (prokinetic)",
          "Cisapride 0.5 mg/kg PO BID–TID (if available)",
          "Meloxicam 0.5–1 mg/kg PO/SC SID (pain + anti-inflammatory)",
          "Buprenorphine 0.02–0.05 mg/kg SC BID–TID if moderate/severe pain",
          "Gut motility: Force-feed critical care formula (Critical Care, Oxbow)"
        ],
        procedures: ["Warmth (37–38°C environment)","Gentle massage abdomen","Encourage movement","Syringe feeding if anorexic","IV fluids if severe"],
        diet: ["Unlimited timothy hay (essential)","Fresh greens (cilantro, parsley, romaine)","Remove all pellets temporarily","Water via syringe if not drinking"]
      },
      education: {
        monitor: ["Cecotroph production","Fecal pellet size/number/presence","Appetite return","Gut sounds (borborygmi)","Weight daily"],
        red_flags: ["No fecal output >12–24h","Tooth grinding (pain)","Bloating/distension","Hypothermia (<38°C)","Collapse"],
        followup: "Recheck in 24–48h; hay must be >70% of diet always; dental check at 3–6 months",
        prognosis: "fair"
      }
    },

    {
      id: "psittacosis",
      name: "Psittacosis (Chlamydophila psittaci)",
      species: ["bird"],
      category: "Internal Medicine / Exotic / Zoonosis",
      signals: {
        complaints_dyspnea: 7, complaints_nasal_discharge: 6, complaints_lethargy: 7,
        complaints_anorexia: 7, complaints_eye_discharge: 6,
        hpi_onset_subacute: 6, hpi_onset_chronic: 5,
        env_new_pet: 7, env_contact_other_pets: 6
      },
      tests: {
        tier1: ["Chlamydophila PCR (cloacal/choanal/conjunctival swab) — preferred","CBC (leukocytosis)","Chemistry (elevated AST, bile acids)","Chlamydophila serology"],
        tier2: ["Radiograph (hepatomegaly, air sac opacity)","Culture","Necropsy if bird dies"],
        tier3: []
      },
      treatment: {
        medications: [
          "Doxycycline 25–50 mg/kg PO SID × 45 days (medication of choice for birds)",
          "Doxycycline parenteral: Vibravenos 75–100 mg/kg IM q5–7d (Amazon parrots) or q7d (others)",
          "Supportive: fluid therapy, nutritional support, heat"
        ],
        procedures: ["Isolation from other birds","Disinfection (bleach 1:32)","ZOONOSIS — inform owner to seek medical advice if respiratory symptoms develop","Quarantine new birds 30–45 days"],
        diet: ["Maintain good nutrition during treatment","Vitamin A supplementation"]
      },
      education: {
        monitor: ["Respiratory effort","Nasal discharge","Fecal changes","Weight","Improvement in clinical signs"],
        red_flags: ["ZOONOSIS — if human household members develop fever, respiratory illness, inform their doctor","Rapid deterioration","Neurological signs"],
        followup: "PCR test-of-cure after 45-day treatment; test all birds in household",
        prognosis: "fair"
      }
    },

    // ══════════════ OTITIS EXTERNA ══════════════

    {
      id: "otitis_externa",
      name: "Otitis Externa",
      species: ["dog","cat"],
      category: "Dermatology / ENT",
      signals: {
        complaints_ear_problems: 10,
        ears_erythema: 8, ears_discharge_brown: 7, ears_odor: 8, ears_pruritus: 7,
        skin_pruritus: 4,
        chronic_condition_allergies: 5,
        breed_cocker: 7, breed_basset: 6, breed_labrador: 4,
        hpi_progression_worsening: 5, hpi_onset_subacute: 5
      },
      tests: {
        tier1: ["Otoscopic exam (assess canal + tympanic membrane)","Ear cytology (Diff-Quik — cocci/rods/yeast)","Tape prep from canal"],
        tier2: ["Bacterial culture + sensitivity (refractory/chronic cases)","Bulla radiograph or CT (otitis media)","Allergy workup (underlying cause)"],
        tier3: ["Video-otoscopy","CT bulla","Referral to veterinary dermatologist"]
      },
      treatment: {
        medications: [
          "Step 1 — Clean canal: Epi-Otic or Cerumene lavage before applying medication",
          "Bacterial (Staphylococcus): Enrofloxacin otic (Baytril Otic) q12h × 7–14d",
          "Yeast (Malassezia): Clotrimazole or miconazole otic q12–24h × 2–3 weeks",
          "Mixed bacterial + yeast (most cases): Otomax (gentamicin + clotrimazole + betamethasone) 4 drops q12h × 7d",
          "Posatex (orbifloxacin + posaconazole + mometasone) SID × 7d (convenient once-daily)",
          "Pseudomonas/refractory: Based on culture — polymyxin B or fluoroquinolone ear drops",
          "Systemic if severe or otitis media: Amoxicillin-clavulanate 12.5–25 mg/kg PO BID × 3–6 weeks"
        ],
        procedures: ["Sedated ear flush if severe accumulation","Assess TM integrity before instilling ototoxic drops","Identify and treat underlying cause (allergy, hypothyroidism, breed anatomy)","TECA-LBO surgery for end-stage calcified ears"],
        diet: ["Elimination diet trial (8–12 weeks) if food allergy is suspected underlying cause","Omega-3 fatty acid supplementation (EPA/DHA 30–40 mg/kg/day)"]
      },
      education: {
        monitor: ["Head shaking and scratching at ears","Odor","Discharge character and volume","Ear canal health at recheck"],
        red_flags: ["Head tilt — suggests otitis media/interna","Neurological signs (facial nerve palsy, Horner's)","No improvement after 2 treatment courses","Severe pain/swelling — abscess formation"],
        followup: "Recheck ear cytology at 7–14 days; continue 7 days beyond cytologic cure; address underlying disease",
        prognosis: "fair"
      }
    },

    // ══════════════ FELINE IDIOPATHIC CYSTITIS / FLUTD ══════════════

    {
      id: "feline_idiopathic_cystitis",
      name: "Feline Idiopathic Cystitis (FIC / FLUTD)",
      species: ["cat"],
      category: "Internal Medicine / Urology",
      signals: {
        complaints_dysuria: 9, complaints_lethargy: 5, complaints_behavioral: 5,
        bladder_distension: 5,
        sex_male_neutered: 7, sex_female_spayed: 5,
        age_young: 5, age_middle: 6,
        env_indoor: 6, diet_dry_food: 5,
        hpi_onset_sudden: 7, hpi_progression_fluctuating: 7
      },
      tests: {
        tier1: ["Urinalysis (sediment, pH, RBC, WBC, crystals)","Urine culture (usually sterile in FIC)","Abdominal palpation — bladder assessment","Bladder radiograph (rule out uroliths)"],
        tier2: ["Abdominal ultrasound (bladder wall thickness, mucus plugs, crystals)","CBC/Chemistry","Blood pressure"],
        tier3: ["Cystoscopy","CT abdomen","Urodynamic studies"]
      },
      treatment: {
        medications: [
          "Acute phase: Meloxicam 0.1 mg/kg SC/PO once (anti-inflammatory/analgesic)",
          "Buprenorphine 0.01–0.02 mg/kg buccal TID × 2–3 days (pain management)",
          "Prazosin 0.25–0.5 mg/cat PO SID–BID (urethral relaxation — especially males)",
          "Recurrent/severe: Amitriptyline 5–12.5 mg/cat PO SID at bedtime",
          "Gabapentin 50–100 mg/cat PO BID (pain + anxiety reduction)",
          "NOTE: Do NOT use antibiotics — FIC is NOT bacterial in most cases"
        ],
        procedures: ["Environmental enrichment is the most important intervention","Multimodal approach: feeding enrichment, hiding spots, vertical spaces, feline pheromones","Urethral catheterization ONLY if obstructed (see Urethral Obstruction)","Perineal urethrostomy if recurrent obstruction (males)"],
        diet: ["Prescription urinary diet (Hills c/d, Royal Canin Urinary SO) — lifelong","Wet/moist food STRONGLY preferred — increases urine volume","Multiple water stations (ceramic/glass bowls, water fountains)","Avoid stress triggers (multi-cat conflict, environmental changes)"]
      },
      education: {
        monitor: ["Urination frequency and comfort (normal voiding vs. straining)","Urine color (hematuria)","Appetite and hydration","Litter box use (provide 1 box per cat + 1 extra)"],
        red_flags: ["No urination at all in 24h — EMERGENCY (may be obstructed)","Straining with no urine produced — ER immediately","Vomiting with urinary signs","Crying out / extreme pain in litter box"],
        followup: "Recheck urinalysis at 3–4 weeks; if recurrent (>2 episodes/year) begin long-term management; environmental modification is key",
        prognosis: "fair"
      }
    },

    // ══════════════ KENNEL COUGH / CIRD ══════════════

    {
      id: "kennel_cough",
      name: "Kennel Cough (Canine Infectious Respiratory Disease — CIRD)",
      species: ["dog"],
      category: "Internal Medicine / Respiratory / Infectious",
      signals: {
        complaints_coughing: 9, complaints_nasal_discharge: 6, complaints_sneezing: 5,
        complaints_lethargy: 4, complaints_anorexia: 4,
        nose_serous_discharge: 6,
        resp_increased_bv: 5,
        env_kennel: 9, env_contact_other_pets: 7,
        vaccine_overdue: 5, vaccine_never: 6, vaccine_partial: 5,
        hpi_onset_sudden: 8, hpi_onset_subacute: 6,
        attitude_bar: 6, attitude_qar: 4
      },
      tests: {
        tier1: ["Physical exam + thoracic auscultation","Chest radiograph (rule out pneumonia — alveolar infiltrates = worse)","CBC (leukocytosis suggests bacterial component)"],
        tier2: ["Nasal + pharyngeal swab PCR panel (Bordetella, CIV H3N8/H3N2, CRCoV, CDV, Mycoplasma)","Chemistry if systemically ill","Tracheal wash cytology (chronic/refractory)"],
        tier3: ["Bronchoscopy + BAL","Serology paired titers"]
      },
      treatment: {
        medications: [
          "Bordetella-confirmed or suspected: Doxycycline 5–10 mg/kg PO BID × 10–14d",
          "Alternative (Doxy intolerant): Amoxicillin-clavulanate 12.5–25 mg/kg PO BID × 10–14d",
          "Non-productive cough suppressant: Butorphanol 0.05–0.1 mg/kg PO q6–8h",
          "Hydrocodone/homatropine 0.25–0.5 mg/kg PO q8h (alternative cough suppressant)",
          "Post-cough vomiting: Maropitant 2 mg/kg PO SID × 3–5 days",
          "CAUTION: Do NOT suppress productive cough (risk of pneumonia progression)"
        ],
        procedures: ["Nebulization with 0.9% saline (loosen secretions, 15 min BID)","Coupage if productive cough with secretions","Strict isolation from other dogs for 2–3 weeks","Rest and warm environment","Avoid cold air and exercise during recovery"],
        diet: []
      },
      education: {
        monitor: ["Cough frequency, character, and severity","Appetite and water intake","Nasal discharge character (clear → mucopurulent = bacterial worsening)","Temperature — fever >39.5°C indicates pneumonia risk"],
        red_flags: ["Fever >39.5°C — suspect pneumonia","Exercise intolerance / labored breathing","Cough worsening after 5–7 days","Respiratory distress","Productive cough with blood","Puppies, immunocompromised, or brachycephalic dogs worsen faster"],
        followup: "Recheck if not improving by day 7 or fever develops; chest radiograph if pneumonia suspected; vaccinate (Bordetella intranasal/oral) to prevent recurrence",
        prognosis: "good"
      }
    },

    // ══════════════ ADDISON'S DISEASE ══════════════

    {
      id: "addisons_disease",
      name: "Hypoadrenocorticism (Addison's Disease)",
      species: ["dog","cat"],
      category: "Internal Medicine / Endocrinology",
      signals: {
        complaints_lethargy: 8, complaints_vomiting: 7, complaints_diarrhea: 6,
        complaints_anorexia: 7, complaints_collapse: 6, complaints_weight_loss: 5,
        hydration_moderate: 7, hydration_severe: 7,
        mm_pale: 7, mm_tacky: 6,
        hr_low: 8, cardiac_arrhythmia: 5,
        attitude_dull: 7, attitude_obtunded: 5,
        hpi_progression_fluctuating: 9, hpi_progression_worsening: 6,
        hpi_onset_subacute: 6,
        temp_low: 5,
        breed_standard_poodle: 7, breed_german_shepherd: 5,
        age_young: 5, age_middle: 6
      },
      tests: {
        tier1: ["ACTH stimulation test — pre-ACTH + 1h post-ACTH cortisol (both <2 µg/dL = Addison's)","Electrolytes — Na:K ratio <27 is classic (hyponatremia + hyperkalemia)","CBC/Chemistry (azotemia, hypoglycemia, hypoalbuminemia, eosinophilia, lymphocytosis)","ECG (peaked T-waves, prolonged PR/QRS — hyperkalemia)"],
        tier2: ["Abdominal ultrasound (bilateral small adrenal glands <3.0 mm)","Chest + abdominal radiograph (microcardia, small caudal vena cava, small liver)","Blood glucose","Urinalysis"],
        tier3: ["Endogenous ACTH (primary vs. secondary Addison's)","Adrenal cortex antibody titers","CT adrenal glands"]
      },
      treatment: {
        medications: [
          "— ACUTE ADDISONIAN CRISIS (EMERGENCY) —",
          "IV 0.9% NaCl (normal saline) 40–80 mL/kg/hr → slow to maintenance once BP stable",
          "Dexamethasone SP 0.1–0.5 mg/kg IV (will not interfere with ACTH stim test)",
          "Dextrose 5–10% supplementation if hypoglycemic",
          "Calcium gluconate 10% 0.5–1.5 mL/kg IV slowly over 10 min if severe hyperkalemia (K+>7)",
          "— LONG-TERM MAINTENANCE —",
          "Mineralocorticoid: DOCP (Percorten-V) 2.2 mg/kg SC q25 days (preferred)",
          "OR Fludrocortisone 0.01–0.02 mg/kg PO SID (requires more monitoring)",
          "Glucocorticoid: Prednisolone 0.1–0.2 mg/kg PO SID (maintenance dose)",
          "Stress dose: Prednisolone × 3–5× normal dose during illness, surgery, or trauma"
        ],
        procedures: ["Monitor electrolytes during acute crisis (q2–4h)","Monthly electrolyte checks for first 3 months","Medic alert tag for patient","Educate owner on home stress dosing protocol","Supplement sodium chloride in food if Na remains low"],
        diet: []
      },
      education: {
        monitor: ["Electrolytes monthly initially (Na:K ratio target 27–40)","Energy level and appetite","PU/PD (may indicate over-supplementation of mineralocorticoid)","Weight"],
        red_flags: ["Weakness, collapse, vomiting = Addisonian crisis — EMERGENCY","Bradycardia or arrhythmia","Hypothermia (<37.5°C)","Owner MUST increase glucocorticoid dose ×3–5 during any stress/illness"],
        followup: "Electrolytes + exam at 10 days after DOCP; then q25 days × 3; then q3–6 months when stable; annual ACTH stim optional",
        prognosis: "good"
      }
    },

    // ══════════════ EHRLICHIOSIS / TICK-BORNE DISEASE ══════════════

    {
      id: "ehrlichiosis",
      name: "Ehrlichiosis / Tick-Borne Thrombocytopenia",
      species: ["dog"],
      category: "Internal Medicine / Infectious / Parasitology",
      signals: {
        complaints_lethargy: 8, complaints_anorexia: 7, complaints_vomiting: 5,
        complaints_bleeding: 7, complaints_eye_discharge: 5,
        env_outdoor: 7, parasites_tick: 9,
        mm_pale: 7,
        hpi_onset_subacute: 7, hpi_onset_chronic: 5,
        attitude_dull: 7,
        lymph_mild: 5, lymph_moderate: 6,
        liver_hepatomegaly: 5, spleen_splenomegaly: 5
      },
      tests: {
        tier1: ["CBC (thrombocytopenia <100k/µL is hallmark, non-regenerative anemia, leukopenia or leukocytosis)","Chemistry (elevated ALT/ALP, hypoalbuminemia, azotemia)","4Dx SNAP test (Ehrlichia, Anaplasma, Heartworm, Lyme)","Blood smear (morulae in acute phase)"],
        tier2: ["Ehrlichia canis / Anaplasma PCR — definitive diagnosis","IFA serology (paired titers × 2–4 weeks apart)","Bone marrow aspirate (severe pancytopenia)","Abdominal ultrasound (hepatosplenomegaly)"],
        tier3: ["Protein electrophoresis (chronic — hypergammaglobulinemia)","Full tick-borne disease serology panel","Tick species identification"]
      },
      treatment: {
        medications: [
          "Doxycycline 5–10 mg/kg PO BID × 4–6 weeks (drug of choice — MUST complete full course)",
          "Give with food; avoid dairy/calcium-rich foods within 1–2h (reduce absorption)",
          "Blood transfusion (pRBC) if PCV <15% with clinical signs of anemia",
          "Platelet-rich plasma or fresh whole blood if severe hemorrhage",
          "Prednisolone 0.5–1 mg/kg PO SID × 2–4 weeks if immune-mediated thrombocytopenia component",
          "Note: Do not add prednisolone until doxycycline started and diagnosis confirmed"
        ],
        procedures: ["Remove attached ticks immediately (twist-out tool — avoid squeezing)","Apply isoxazoline (Bravecto/NexGard) for ongoing prevention","Monthly tick prevention — isoxazolines or topical permethrin (dogs only)","Environmental tick control (acaricide yard spray)","CBC recheck at 2 weeks, 1 month, 3 months"],
        diet: []
      },
      education: {
        monitor: ["Platelet count trend (CBC)","Nose bleeds, petechiae, unusual bruising","Appetite and energy level","Monthly tick check and prevention"],
        red_flags: ["Petechiae / ecchymoses (severe thrombocytopenia — risk of hemorrhage)","Epistaxis or bloody stools","Neurological signs (chronic ehrlichiosis)","Uveitis (red/painful eyes)","Respiratory distress (pulmonary ehrlichiosis)"],
        followup: "CBC at 2 weeks and 1 month; 4Dx negative test at 6 months confirms clearance; monthly tick prevention lifelong",
        prognosis: "fair"
      }
    },

    // ══════════════ FELINE HYPERTROPHIC CARDIOMYOPATHY ══════════════

    {
      id: "feline_hcm",
      name: "Hypertrophic Cardiomyopathy — Feline (HCM)",
      species: ["cat"],
      category: "Internal Medicine / Cardiology",
      signals: {
        complaints_dyspnea: 8, complaints_lethargy: 6, complaints_collapse: 5,
        complaints_coughing: 4,
        cardiac_murmur_12: 7, cardiac_murmur_34: 8, cardiac_murmur_56: 7,
        resp_muffled: 7, resp_crackles_fine: 5,
        chest_open_mouth: 7, chest_accessory_muscles: 6,
        hpi_onset_sudden: 7,
        age_middle: 7, age_old: 6,
        breed_maine_coon: 8, breed_ragdoll: 7
      },
      tests: {
        tier1: ["Echocardiography — IVSd or LVFWd >6 mm = HCM (gold standard)","Thoracic radiograph (cardiomegaly, pulmonary edema, pleural effusion)","Blood pressure","CBC/Chemistry","ECG (left ventricular hypertrophy pattern, arrhythmias)"],
        tier2: ["NT-proBNP serum (>200 pmol/L supports CHF)","Troponin I (elevated = myocardial damage)","Genetic testing (MYBPC3 mutation — Maine Coon, Ragdoll)","Holter monitor (paroxysmal arrhythmias)"],
        tier3: ["Cardiac MRI","Strain imaging echocardiography","Advanced LVOT gradient measurement"]
      },
      treatment: {
        medications: [
          "— ACUTE CHF / PLEURAL EFFUSION (EMERGENCY) —",
          "Furosemide 1–2 mg/kg IV/IM — repeat every 1–4h until respiratory rate <40 rpm",
          "O2 supplementation 40–60% (minimize stress — O2 cage preferred)",
          "— CHRONIC MANAGEMENT —",
          "Atenolol 6.25–12.5 mg/cat PO SID–BID (LVOTO/tachycardia)",
          "Diltiazem 7.5–15 mg/cat PO TID or XR formulation (diastolic relaxation, AF)",
          "Furosemide 1–2 mg/kg PO SID–BID (congestive signs — titrate to minimum effective dose)",
          "Clopidogrel (Plavix) 18.75 mg/cat PO SID — FATCAT trial: reduces ATE risk vs. aspirin",
          "Aspirin 5 mg/cat PO q72h (alternative anti-platelet if clopidogrel not available)"
        ],
        procedures: ["Thoracocentesis for pleural effusion (100–200 mL/side typical — significant relief)","O2 cage for acute respiratory distress","Minimize handling when dyspneic","Daily resting respiratory rate monitoring at home (normal <30 rpm)","Cardiologist referral for complex cases"],
        diet: ["Moderate sodium restriction (avoid high-salt treats and foods)","Taurine 250 mg/cat PO BID (ensure adequate taurine, especially on grain-free diets)","Fresh water always available","Wet food preferred (hydration)"]
      },
      education: {
        monitor: ["Resting respiratory rate daily at home — chart it (normal <30 rpm)","Open-mouth breathing or labored breathing episodes","Exercise tolerance and activity level","Sudden hindlimb paralysis or pain (ATE warning sign)","Appetite and weight"],
        red_flags: ["Sudden hindlimb paralysis / cold painful legs = ATE — EMERGENCY","Respiratory rate >40 rpm at rest","Open-mouth breathing","Blue / grey gums (cyanosis)","Sudden collapse"],
        followup: "Echo recheck q6–12 months; thoracic radiograph q3 months if CHF; daily RR monitoring; CBC/chem q3–6 months",
        prognosis: "guarded"
      }
    },

    // ══════════════ ANAL SAC DISEASE ══════════════

    {
      id: "anal_sac_disease",
      name: "Anal Sac Disease (Impaction / Sacculitis / Abscess)",
      species: ["dog","cat"],
      category: "Internal Medicine / Dermatology",
      signals: {
        complaints_behavioral: 8,
        hpi_onset_subacute: 5, hpi_onset_sudden: 4,
        bcs_obese: 5,
        breed_beagle: 5, breed_cocker: 5, breed_chihuahua: 5,
        weight_small: 6
      },
      tests: {
        tier1: ["Digital rectal examination (anal sac palpation — assess impaction, pain, fluctuance)","Anal sac secretion cytology (bacteria, neutrophils)"],
        tier2: ["CBC if systemic signs (fever, lethargy)","Bacterial culture of secretion if refractory or abscess"],
        tier3: ["Biopsy if firm non-reducible mass (carcinoma)","CT/MRI for deep tissue extension"]
      },
      treatment: {
        medications: [
          "Impaction: Manual expression (with or without sedation depending on pain level)",
          "Sacculitis: Flush canal with saline, then infuse antibiotic-steroid solution",
          "Antibiotic (sacculitis/abscess): Amoxicillin-clavulanate 12.5–25 mg/kg PO BID × 7–10d",
          "Enrofloxacin 5 mg/kg PO SID × 7–10d (Gram-negative coverage)",
          "Anti-inflammatory: Meloxicam 0.1 mg/kg PO SID × 3–5 days (pain + swelling)",
          "Abscess: Lance, flush with dilute chlorhexidine 0.05%; allow open drainage"
        ],
        procedures: ["Anal sacculectomy if recurrent (>3–4 impactions/year, non-responsive to medical treatment)","Regular preventive expression q3–4 weeks if recurrent","Increase dietary fiber to promote natural expression"],
        diet: ["Increase dietary fiber: psyllium husk 0.5–1 tsp mixed in food SID","Weight loss if overweight (reduces recurrence)","High-fiber prescription diet or add cooked pumpkin to food"]
      },
      education: {
        monitor: ["Scooting, licking, biting at rear end","Swelling or redness at perianal area","Difficulty sitting or defecating","Any draining tract or foul odor"],
        red_flags: ["Visible ruptured abscess or draining tract","Systemic signs (fever, lethargy) — deep tissue infection","Firm, fixed perianal mass not resolving — rule out carcinoma","Severe acute pain at anal area"],
        followup: "Recheck at 1–2 weeks; regular expression schedule if chronic; surgical referral if refractory; annual anal gland check during wellness visits",
        prognosis: "good"
      }
    },

    {
      id: "ferret_adrenal",
      name: "Ferret Adrenal Gland Disease",
      species: ["exotic"],
      category: "Internal Medicine / Exotic / Endocrinology",
      signals: {
        complaints_hair_loss: 9, complaints_behavioral: 5, complaints_lethargy: 5,
        skin_alopecia_diffuse: 9,
        sex_female_intact: 6, sex_female_spayed: 5,
        age_middle: 7, age_old: 6,
        vulvar_enlargement: 7
      },
      tests: {
        tier1: ["Adrenal hormone panel (Univ. Tennessee ferret adrenal panel — estradiol, 17-OHP, DHEAS, androstenedione)","Abdominal ultrasound (adrenal size)","CBC/Chemistry"],
        tier2: ["Abdominal exploratory (surgical)","Biopsy"],
        tier3: []
      },
      treatment: {
        medications: [
          "Deslorelin implant (Suprelorin 4.7 mg SC) — medical management, lasts 12–18 months",
          "Leuprolide acetate (Lupron) 100–200 mcg/kg IM monthly (alternative)",
          "Melatonin implant (adjunct)"
        ],
        procedures: ["Adrenalectomy (unilateral — curative if single adrenal)","Medical management if bilateral/inoperable","Cardiology workup if cardiomyopathy suspected"],
        diet: []
      },
      education: {
        monitor: ["Hair regrowth","Vulvar size (females)","Pruritus","Energy level","Weight"],
        red_flags: ["Urinary obstruction in males (prostatic cysts)","Aplastic anemia (bone marrow estrogen toxicity in intact females)","No improvement after 3–4 months treatment"],
        followup: "Recheck at 4–6 weeks; abdominal US annually; implant replacement every 12–18 months",
        prognosis: "fair"
      }
    },

    // ═══════════════════ GASTROENTEROLOGY ══════════════════════════════════

    {
      id: "acute_gastroenteritis",
      name: "Acute Gastroenteritis",
      species: ["dog","cat"],
      category: "Internal Medicine / Gastroenterology",
      signals: {
        complaints_vomiting: 8, complaints_diarrhea: 8, complaints_anorexia: 6,
        complaints_lethargy: 5,
        hpi_onset_sudden: 8, hpi_onset_subacute: 6,
        hpi_progression_worsening: 5,
        abdomen_pain_mild: 5, abdomen_pain_moderate: 6,
        env_contact_stray: 4, env_contact_other_pets: 4,
        history_dietary_change: 6,
        attitude_qar: 5
      },
      contra_signals: { complaints_bleeding: -4, mm_icteric: -3, abdomen_distension: -3 },
      tests: {
        tier1: ["CBC (leukocytosis/stress leukogram)","Chemistry panel","Urinalysis","Fecal flotation + direct smear (parasites, Giardia)","Parvovirus SNAP test if young/unvaccinated"],
        tier2: ["Fecal PCR GI panel (Giardia, Crypto, Campylobacter, Salmonella, CPV, CCoV)","Abdominal radiograph (obstruction/ileus)","Abdominal ultrasound"],
        tier3: ["Endoscopy + biopsies (chronic or refractory)","Exploratory laparotomy"]
      },
      treatment: {
        medications: [
          "Maropitant (Cerenia) 1 mg/kg IV/SC or 2 mg/kg PO SID × 5 days (antiemetic + visceral analgesia)",
          "IV fluids: Lactated Ringer's Solution (LRS) 60–90 mL/kg/day maintenance + replace deficit",
          "Metronidazole 10–15 mg/kg PO/IV BID × 5–7 days (anaerobes, Giardia)",
          "Omeprazole 0.5–1 mg/kg PO SID (if hematemesis or esophagitis)",
          "Sucralfate 0.5–1 g PO q8h (mucosal protection — give separately from other meds 30 min)",
          "Probiotic supplementation (Enterococcus faecium SF68 — FortiFlora) × 14 days"
        ],
        procedures: ["NPO 4–6 hours then gradual reintroduction of bland diet","Correct electrolytes (especially K+)","Monitor hydration every 4–8h","Hospitalize if dehydrated >8% or not maintaining hydration"],
        diet: ["Bland diet: boiled chicken + white rice 1:3 ratio × 3–5 days (dogs)","Gradual reintroduction of normal food over 5–7 days","Small frequent meals","No fat, no dairy"]
      },
      education: {
        monitor: ["Vomiting frequency","Diarrhea volume and character","Hydration status (skin turgor, MM moisture)","Appetite return","Energy level"],
        red_flags: ["Bloody vomit or black/tarry stool","Not improving after 48h of treatment","Progressive lethargy or collapse","Signs of abdominal pain worsening","Puppies/kittens deteriorate faster — hospitalize early"],
        followup: "Recheck if not improving in 48h; return if blood in stool/vomit; deworming if indicated",
        prognosis: "good"
      }
    },

    {
      id: "ahds_hge",
      name: "Acute Hemorrhagic Diarrhea Syndrome (AHDS/HGE)",
      species: ["dog"],
      category: "Internal Medicine / Gastroenterology",
      emergency: true,
      signals: {
        complaints_diarrhea: 9, complaints_vomiting: 8, complaints_bleeding: 9,
        complaints_lethargy: 7, complaints_anorexia: 7, complaints_collapse: 5,
        hpi_onset_sudden: 10,
        mm_pale: 5, mm_tacky: 6,
        hydration_moderate: 7, hydration_severe: 7,
        abdomen_pain_mild: 4, abdomen_pain_moderate: 5,
        weight_small: 5,
        attitude_dull: 6, attitude_qar: 5,
        hpi_progression_worsening: 8
      },
      tests: {
        tier1: ["CBC — hemoconcentration hallmark: PCV >60% with normal/low total protein","Chemistry panel (electrolytes — hypokalemia, sodium)","Parvovirus SNAP test (MUST rule out — similar presentation)","Fecal direct smear (Clostridium spores) + culture"],
        tier2: ["Coagulation panel (PT/aPTT — rule out DIC)","Blood culture (bacteremia)","Abdominal radiograph/ultrasound (rule out obstruction, intussusception)","Fecal PCR panel"],
        tier3: ["Endoscopy","Intestinal biopsy if refractory"]
      },
      treatment: {
        medications: [
          "AGGRESSIVE IV fluid resuscitation — 0.9% NaCl or LRS: 20–30 mL/kg bolus, reassess",
          "Maintenance + ongoing losses: typically 60–90 mL/kg/day",
          "Potassium supplementation in IV fluids (40 mEq/L if K+<3.5)",
          "Maropitant 1 mg/kg IV SID × 3–5 days",
          "Metronidazole 10–15 mg/kg IV BID × 5 days (Clostridium coverage)",
          "Ampicillin-sulbactam 20–30 mg/kg IV TID if bacteremia suspected",
          "Omeprazole 0.5–1 mg/kg IV SID (mucosal protection)",
          "Plasma transfusion if total protein <3.5 g/dL"
        ],
        procedures: ["Hospitalization — IV access mandatory","NPO initially, introduce water when vomiting controlled","Monitor PCV and total protein q4–6h","Strict infection control (potential Clostridioides perfringens)"],
        diet: ["Early enteral nutrition when vomiting controlled (24–48h)","Bland diet × 5–7 days post-discharge","Highly digestible low-fat prescription GI diet"]
      },
      education: {
        monitor: ["PCV/TP trends","Vomiting and bloody diarrhea frequency","Hydration and fluid intake","Energy level and appetite return"],
        red_flags: ["Collapse or unresponsiveness — immediate emergency","Worsening bloody diarrhea despite 24h treatment","Signs of DIC (petechiae, prolonged clotting)","Failure to improve within 12–24h of fluid therapy"],
        followup: "Recheck CBC/chem at 24–48h; bland diet × 5–7 days; dietary management to prevent recurrence",
        prognosis: "good"
      }
    },

    {
      id: "bacterial_pneumonia",
      name: "Bacterial Pneumonia",
      species: ["dog","cat"],
      category: "Internal Medicine / Respiratory / Infectious",
      signals: {
        complaints_coughing: 9, complaints_dyspnea: 8, complaints_lethargy: 8,
        complaints_anorexia: 7, complaints_nasal_discharge: 6,
        temp_high: 9,
        resp_crackles_fine: 8, resp_crackles_coarse: 8, resp_increased_bv: 7,
        chest_accessory_muscles: 7, chest_open_mouth: 6,
        mm_cyanotic: 7, mm_pale: 5,
        hydration_mild: 5, hydration_moderate: 6,
        attitude_dull: 7, attitude_qar: 6,
        hpi_onset_subacute: 7, hpi_onset_sudden: 5,
        vaccine_overdue: 4, vaccine_never: 5
      },
      contra_signals: { attitude_bar: -4 },
      tests: {
        tier1: ["Thoracic radiograph — alveolar pattern, air bronchograms, cranioventral lobe distribution","CBC (leukocytosis with neutrophilia + left shift)","Chemistry panel","Blood culture (bacteremia assessment)"],
        tier2: ["Tracheal wash / BAL cytology + culture + sensitivity (definitive pathogen ID)","Pulse oximetry / blood gas (SpO2, PaO2)","Nasal swab PCR (concurrent viral — CIV, CDV, Bordetella)","Thoracic CT"],
        tier3: ["Bronchoscopy","Thoracocentesis if effusion","Echocardiography (rule out cardiac cause)"]
      },
      treatment: {
        medications: [
          "Empirical antibiotic (pending culture): Amoxicillin-clavulanate 12.5–25 mg/kg PO/IV BID × 4–6 weeks",
          "If severe/hospitalized: Ampicillin-sulbactam 22 mg/kg IV TID + Enrofloxacin 5–10 mg/kg IV SID",
          "Culture-directed switch when sensitivity available",
          "AVOID corticosteroids (worsen outcome in infectious pneumonia)",
          "Nebulized 0.9% saline 15 min BID (loosen secretions)",
          "Bronchodilator: Terbutaline 0.01 mg/kg SC/IM q4h if bronchospasm",
          "Maropitant 1–2 mg/kg PO/SC SID (appetite stimulation + anti-inflammatory)"
        ],
        procedures: ["Hospitalization if SpO2 <93% or RR >40 rpm","Oxygen supplementation (O2 cage, flow-by, nasal prongs)","Coupage BID–TID","IV fluid therapy (at maintenance — avoid over-hydration)","Monitor RR and effort q4h"],
        diet: ["High-protein, highly digestible diet","Small frequent meals — avoid stress during feeding","Ensure adequate caloric intake"]
      },
      education: {
        monitor: ["Respiratory rate and effort at home","Temperature twice daily","Appetite and water intake","Nasal discharge character"],
        red_flags: ["Respiratory rate >40 rpm or increasing effort — EMERGENCY","Blue gums or grey mucous membranes","Collapse or sudden weakness","Not improving after 48h or worsening after 5 days antibiotics"],
        followup: "Radiograph recheck at 2–3 weeks (radiographic resolution lags clinical behind clinical signs). Minimum 4 weeks antibiotics; continue 1 week beyond radiographic resolution.",
        prognosis: "fair"
      }
    },

    // ═══════════════════ UROLOGY ══════════════════════════════════════════

    {
      id: "bacterial_cystitis",
      name: "Bacterial Urinary Tract Infection (Cystitis)",
      species: ["dog","cat"],
      category: "Internal Medicine / Urology",
      signals: {
        complaints_dysuria: 9, complaints_hematuria: 8,
        hpi_onset_sudden: 6, hpi_onset_subacute: 5,
        bladder_distension: 5, abdomen_pain_mild: 5,
        sex_female_intact: 7, sex_female_spayed: 6,
        age_old: 5, age_middle: 4,
        chronic_condition_diabetes: 5
      },
      contra_signals: { bladder_distension: -2 },
      tests: {
        tier1: ["Urinalysis with sediment (pyuria >5 WBC/hpf, bacteriuria, hematuria)","Urine culture + sensitivity — CYSTOCENTESIS sample only (gold standard)","CBC/Chemistry (rule out systemic disease)"],
        tier2: ["Abdominal radiograph (radiodense calculi — struvite, oxalate)","Abdominal ultrasound (bladder wall thickening, calculi, masses)","Blood pressure","Urine protein:creatinine ratio"],
        tier3: ["Cystoscopy","Contrast cystourethrogram","CT urinary tract"]
      },
      treatment: {
        medications: [
          "— CULTURE-DIRECTED THERAPY (preferred — always culture first) —",
          "Pending sensitivity: Trimethoprim-sulfamethoxazole 15 mg/kg PO BID × 7–14 days (dogs)",
          "Amoxicillin-clavulanate 12.5–25 mg/kg PO BID × 7–14 days (first UTI, suspected Gram+)",
          "Enrofloxacin 5–20 mg/kg PO SID × 7–14 days (Gram-negative; AVOID in immature dogs; AVOID cats due to retinal toxicity)",
          "Cats: Amoxicillin 11–22 mg/kg PO BID × 7–14 days (first-line)",
          "AVOID fluoroquinolones in cats unless sensitivity-confirmed",
          "Recurrent UTI: treat per culture × 4 weeks; recheck culture 7 days post-treatment"
        ],
        procedures: ["Urinalysis + culture 7 days after completing antibiotics","Imaging to rule out calculi, polyps, or anatomical abnormality","Urolith submission for mineral analysis if calculi found"],
        diet: ["Prescription urinary diet for underlying urolithiasis","Increase water intake: add wet food, water fountains","Avoid high-protein/high-oxalate foods if oxalate calculi"]
      },
      education: {
        monitor: ["Urination frequency, color, and volume","Blood in urine (hematuria)","Straining or crying when urinating","Licking genital area excessively"],
        red_flags: ["Complete inability to urinate = EMERGENCY (urethral obstruction)","Bloody or cloudy urine not improving after 3 days","Systemic signs: fever, vomiting, back pain (pyelonephritis)","Recurrent UTIs >2/year — investigate underlying cause"],
        followup: "Culture 7 days post-treatment; abdominal ultrasound if recurrent; assess for risk factors (uroliths, diabetes, Cushing's)",
        prognosis: "good"
      }
    },

    {
      id: "urolithiasis",
      name: "Urolithiasis (Urinary Calculi)",
      species: ["dog","cat"],
      category: "Internal Medicine / Urology",
      signals: {
        complaints_dysuria: 9, complaints_hematuria: 8, complaints_vomiting: 4,
        complaints_anorexia: 4, complaints_lethargy: 4,
        hpi_onset_subacute: 6, hpi_onset_sudden: 5,
        bladder_distension: 6, abdomen_pain_moderate: 7, abdomen_pain_mild: 5,
        sex_male_intact: 5, sex_male_neutered: 5,
        weight_medium: 5,
        breed_miniature_schnauzer: 7, breed_shih_tzu: 6, breed_bichon: 5,
        breed_dalmatian: 6, breed_bulldog: 5
      },
      tests: {
        tier1: ["Abdominal radiograph (radiodense calculi: struvite 60–65% visible, oxalate ~90%)","Urinalysis + sediment (crystalluria, hematuria, pyuria)","Urine culture + sensitivity (CYSTOCENTESIS)","CBC/Chemistry (renal function, calcium)"],
        tier2: ["Abdominal ultrasound (radiolucent calculi: urate, cystine, silica)","Urine pH (acidic with oxalate; alkaline with struvite)","Serum calcium (hypercalcemia → oxalate risk)","Uric acid if urate suspected (Dalmatian, English Bulldog, hyperuricosuria breeds)"],
        tier3: ["CT urinary tract (most sensitive)","Cystoscopy + basket retrieval","Urolith mineral analysis (after removal)","Genetic testing ABCG2 mutation (Dalmatian)"]
      },
      treatment: {
        medications: [
          "Struvite — dissolution possible: Hill's s/d or Royal Canin Urinary SO + antibiotics × 4–6 weeks",
          "Calcium oxalate — surgical/laser/lithotripsy only (not dissolvable)",
          "Urate (Dalmatians/bulldogs): Hill's u/d (low purine) + Allopurinol 10 mg/kg PO BID",
          "Cystine: D-penicillamine 15 mg/kg PO BID (reduce cystine excretion)",
          "Urinary acidifier (methionine, NH4Cl): struvite prevention (NOT with oxalate)",
          "Potassium citrate 75 mg/kg/day PO BID: alkalinize for urate/cystine prevention",
          "Prazosin 0.025–0.05 mg/kg PO BID (urethral spasm, facilitate passage small calculi)"
        ],
        procedures: ["Surgical cystotomy (large/multiple calculi, failed dissolution)","Laser lithotripsy (urohydropulsion, normograde)","Perineal urethrostomy (cats — recurrent obstruction)","All removed calculi submitted for quantitative mineral analysis","Post-dissolution radiograph/US to confirm clearance"],
        diet: ["Prescription urinary diet matching calculus type (long-term prevention essential)","Increase water intake 2× (wet food, running water, multiple bowls)","Avoid treats high in oxalate (spinach, nuts, dark leafy greens)","Avoid purine-rich foods if urate stones (organ meats, sardines)"]
      },
      education: {
        monitor: ["Urination frequency, color, and volume","Straining or inability to urinate","Any passage of grit or stones in urine","Repeat imaging q3–6 months until clear"],
        red_flags: ["Complete inability to urinate = URETHRAL OBSTRUCTION — EMERGENCY","Crying or screaming when attempting to urinate","Distended/painful abdomen","Post-obstructive diuresis — requires hospitalization for monitoring"],
        followup: "Radiograph/US at 1 month, 3 months, then q6 months; urine culture if struvite to ensure infection-free; diet compliance review",
        prognosis: "fair"
      }
    },

    // ═══════════════════ HEMATOLOGY / IMMUNE-MEDIATED ═══════════════════

    {
      id: "imha",
      name: "Immune-Mediated Hemolytic Anemia (IMHA)",
      species: ["dog","cat"],
      category: "Internal Medicine / Hematology / Immunology",
      emergency: true,
      signals: {
        complaints_lethargy: 9, complaints_anorexia: 8, complaints_collapse: 7,
        complaints_vomiting: 5, complaints_dyspnea: 6,
        mm_pale: 10, mm_white: 9, mm_icteric: 7,
        hr_high: 8, hpi_onset_sudden: 7, hpi_onset_subacute: 6,
        hydration_mild: 4, hydration_moderate: 6,
        attitude_dull: 8, attitude_obtunded: 6,
        liver_hepatomegaly: 5, spleen_splenomegaly: 6,
        breed_cocker: 7, breed_cavalier: 6, breed_poodle: 5,
        breed_labrador: 4
      },
      tests: {
        tier1: ["CBC — PCV <25% (often <15%), regenerative anemia (polychromasia, reticulocytes)","Blood smear — spherocytes, agglutination (PATHOGNOMONIC for IMHA)","Saline agglutination test (slide/tube — positive = strong evidence IMHA)","Chemistry (hyperbilirubinemia, elevated ALT, azotemia)","Urinalysis (hemoglobinuria, bilirubinuria)"],
        tier2: ["Coombs test (direct antiglobulin) — positive confirms immune-mediated destruction","Thoracic + abdominal radiograph (pulmonary thromboembolism, organomegaly)","Coagulation panel (PT/aPTT — DIC risk high in IMHA)","Reticulocyte count (regenerative response assessment)","Tick-borne disease panel (4Dx — Ehrlichia, Babesia as triggers)","Abdominal ultrasound"],
        tier3: ["Bone marrow aspirate (non-regenerative — rule out aplasia)","ANA, anti-dsDNA (SLE)","Flow cytometry (immunophenotyping)","CT thorax (pulmonary thromboembolism)"]
      },
      treatment: {
        medications: [
          "— ACUTE LIFE-THREATENING (PCV <15%) —",
          "Packed red blood cell (pRBC) transfusion: 10–15 mL/kg IV slowly (ideally cross-matched)",
          "Fresh frozen plasma if concurrent DIC (10–15 mL/kg IV)",
          "— IMMUNOSUPPRESSION (cornerstone of treatment) —",
          "Prednisolone 2 mg/kg PO/IV SID (primary immunosuppressant — start ASAP)",
          "Dexamethasone 0.25–0.5 mg/kg IV SID if oral not tolerated (equi-potent to prednisolone)",
          "— SECOND-LINE (refractory or to reduce steroid dose) —",
          "Azathioprine (dogs only) 2 mg/kg PO SID × 2 weeks, then QOD",
          "Mycophenolate mofetil 10–15 mg/kg PO BID (dogs/cats — faster onset than azathioprine)",
          "Cyclosporine 5–10 mg/kg PO SID (cats — preferred over azathioprine which is toxic in cats)",
          "— THROMBOPROPHYLAXIS (high priority — IMHA = hypercoagulable state) —",
          "Clopidogrel 1.1–2.2 mg/kg PO SID (dogs) or 18.75 mg/cat PO SID",
          "Heparin (unfractionated) 150–250 IU/kg SC TID or LMW heparin if DIC risk",
          "Omeprazole 0.5–1 mg/kg PO SID (GI protection during high-dose steroid)"
        ],
        procedures: ["ICU monitoring: PCV q6–12h during transfusion, q12–24h ongoing","Strict activity restriction (thromboembolism risk)","Warm environment (hemolysis increases in cold autoagglutination)","Remove possible trigger (discontinue drugs, treat concurrent tick disease)","Serial CBC q3–7 days initially"],
        diet: ["High-quality protein diet to support recovery","Iron supplementation if warranted post-crisis","Small frequent meals during high-dose steroid phase"]
      },
      education: {
        monitor: ["Gum color daily (pale/yellow = worsening)","Energy level and willingness to walk","Breathing effort (PE risk)","Appetite and urine color (hemoglobinuria = dark brown)"],
        red_flags: ["White or yellow gums = CRITICAL ANEMIA — EMERGENCY TRANSFUSION","Sudden breathing difficulty (pulmonary thromboembolism)","Collapse or inability to stand","PCV declining despite treatment"],
        followup: "PCV/smear 3–5 days, then weekly until stable >30%; steroid taper over 3–6 months; CBC monthly; long-term monitoring for relapse",
        prognosis: "guarded"
      }
    },

    {
      id: "itp",
      name: "Immune-Mediated Thrombocytopenia (ITP / IMT)",
      species: ["dog","cat"],
      category: "Internal Medicine / Hematology / Immunology",
      emergency: true,
      signals: {
        complaints_bleeding: 10, complaints_lethargy: 7, complaints_collapse: 5,
        complaints_eye_discharge: 4,
        mm_pale: 7,
        hpi_onset_sudden: 7, hpi_onset_subacute: 6,
        attitude_dull: 6,
        liver_hepatomegaly: 4, spleen_splenomegaly: 5,
        breed_cocker: 6, breed_poodle: 5, breed_cavalier: 5
      },
      tests: {
        tier1: ["CBC — platelet count <30,000/µL (often <10,000/µL)","Blood smear (confirm thrombocytopenia, rule out platelet clumping)","Coagulation panel (PT, aPTT — normal in primary ITP; abnormal if DIC)","Tick-borne panel (4Dx — Ehrlichia, Anaplasma as triggers)","Chemistry panel + urinalysis"],
        tier2: ["Anti-platelet antibody test (low sensitivity/specificity but supportive)","ANA (rule out SLE)","Thoracic + abdominal radiograph (search for underlying neoplasia/infection)","Abdominal ultrasound","Bone marrow aspirate (megakaryocytes normal/increased = immune destruction vs. production failure)"],
        tier3: ["Flow cytometry","CT thorax/abdomen","Lymph node biopsy"]
      },
      treatment: {
        medications: [
          "Prednisolone 2 mg/kg PO SID (primary treatment — taper slowly over 3–6 months)",
          "Dexamethasone 0.25–0.5 mg/kg IV SID (acute hospitalized cases)",
          "Vincristine 0.02 mg/kg IV single dose (platelet-stimulating effect — rapid response in 24–48h)",
          "Azathioprine 2 mg/kg PO SID (dogs — steroid-sparing, onset 2–4 weeks)",
          "Mycophenolate 10 mg/kg PO BID (dogs/cats — faster alternative)",
          "Human IVIG 0.5–1 g/kg IV over 6–12h (severe refractory; expensive but effective)",
          "Desmopressin 1 mcg/kg SC (platelet function enhancement — temporary bridge)",
          "Omeprazole 0.5–1 mg/kg PO SID (GI protection)"
        ],
        procedures: ["Hospitalize if platelet count <30,000/µL or active bleeding","Avoid all IM injections, unnecessary venipuncture (bleeding risk)","Platelet transfusion (rarely given — destroyed immediately; only for life-threatening bleeding)","Remove/treat identified trigger (drugs, infection, neoplasia)","Strict rest — no rough play, lead walks only"],
        diet: []
      },
      education: {
        monitor: ["Gum color and petechiae/bruising daily","Nose bleeds or blood in stool/urine","Energy level","Platelet count trending"],
        red_flags: ["Spontaneous nosebleed (epistaxis)","Blood in stool, urine, or vomit","Petechiae spreading rapidly","Platelet count <10,000/µL — imminent life-threatening hemorrhage risk"],
        followup: "CBC 3–5 days, then weekly until platelet count >100,000/µL; monthly CBC during steroid taper; monitor for relapse",
        prognosis: "fair"
      }
    },

    // ═══════════════════ INFECTIOUS DISEASE ════════════════════════════════

    {
      id: "canine_distemper",
      name: "Canine Distemper Virus (CDV)",
      species: ["dog"],
      category: "Internal Medicine / Infectious / Neurology",
      emergency: true,
      signals: {
        complaints_coughing: 8, complaints_nasal_discharge: 8, complaints_eye_discharge: 8,
        complaints_vomiting: 7, complaints_diarrhea: 7, complaints_seizures: 7,
        complaints_lethargy: 9, complaints_anorexia: 8,
        temp_high: 8,
        nose_serous_discharge: 7, nose_mucopurulent: 7,
        eyes_discharge_mucopurulent: 7, eyes_conjunctival_hyperemia: 6,
        resp_crackles_fine: 6, resp_increased_bv: 6,
        neuro_seizure: 8, neuro_disoriented: 6, neuro_nystagmus: 5,
        gait_ataxia: 7,
        vaccine_never: 10, vaccine_overdue: 8, vaccine_partial: 7,
        age_kitten: 7, age_young: 8,
        hpi_onset_subacute: 7, hpi_progression_worsening: 8,
        env_contact_stray: 7, env_kennel: 6
      },
      tests: {
        tier1: ["CBC (lymphopenia in acute phase — classic)","Chemistry panel","Thoracic radiograph (interstitial pneumonia)","Conjunctival swab + buffy coat smear (CDV inclusions — Lentz bodies)"],
        tier2: ["CDV PCR (blood, conjunctival/nasal swab, CSF) — definitive diagnosis","Serology IFA (paired titers)","CSF analysis (lymphocytic pleocytosis in neurological phase)","MRI brain (leukoencephalopathy)"],
        tier3: ["Immunohistochemistry (post-mortem)","Vaccine failure assessment"]
      },
      treatment: {
        medications: [
          "NO specific antiviral — SUPPORTIVE CARE is mainstay",
          "IV fluids (LRS or Plasmalyte) for hydration and electrolyte balance",
          "Antibiotics (secondary bacterial infection): Amoxicillin-clavulanate 12.5–25 mg/kg PO BID",
          "OR Ampicillin 22 mg/kg IV TID + Enrofloxacin 5 mg/kg IV SID for pneumonia",
          "Antiemetics: Maropitant 1 mg/kg IV/SC SID",
          "Seizure management: Phenobarbital 2.5–5 mg/kg IV q6h (acute) → 2–3 mg/kg PO BID (maintenance)",
          "Diazepam 0.5 mg/kg IV for active seizure control",
          "Vitamin supplementation (A, C, B complex)",
          "Interferon omega (off-label) — limited evidence but used in some protocols"
        ],
        procedures: ["Strict isolation from all other dogs (highly contagious)","Supportive nursing care: assisted feeding, warmth, hygiene","Nebulization for respiratory disease","Physiotherapy if neurological deficits","Euthanasia discussion if severe persistent neurological signs"],
        diet: ["Easily digestible food","Nutritional support — tube feeding if anorexic >3 days"]
      },
      education: {
        monitor: ["Respiratory rate and effort","Neurological signs (new onset or worsening)","Seizure frequency and duration","Enamel hypoplasia in survivors (dental damage)","Hard-pad formation on footpads"],
        red_flags: ["Continuous seizures (status epilepticus) — EMERGENCY","Progressive neurological deterioration","Severe respiratory distress","The 'chewing gum' myoclonic spasms — poor prognosis if persistent"],
        followup: "No specific discharge criteria — resolve by system; neurological deficits may be permanent; vaccination review for other household pets",
        prognosis: "guarded"
      }
    },

    {
      id: "leptospirosis",
      name: "Leptospirosis",
      species: ["dog"],
      category: "Internal Medicine / Infectious / Zoonosis",
      emergency: true,
      signals: {
        complaints_vomiting: 8, complaints_anorexia: 8, complaints_lethargy: 9,
        complaints_diarrhea: 6, complaints_dyspnea: 5, complaints_bleeding: 6,
        temp_high: 8, temp_low: 4,
        mm_icteric: 7, mm_pale: 5,
        hydration_moderate: 7, hydration_severe: 6,
        abdomen_pain_moderate: 7, abdomen_pain_severe: 7,
        kidneys_renomegaly: 7, kidneys_irregular: 5, liver_hepatomegaly: 6,
        env_outdoor: 8,
        hpi_onset_sudden: 8, hpi_onset_subacute: 6,
        attitude_dull: 8, attitude_obtunded: 6,
        vaccine_overdue: 5, vaccine_never: 6
      },
      tests: {
        tier1: ["CBC (leukocytosis, thrombocytopenia — in ~50%)","Chemistry panel — AKI hallmark: elevated BUN, creatinine; elevated ALT/ALP if hepatic involvement","Urinalysis (casts, glucosuria, bilirubinuria, proteinuria)","Blood pressure (hypertension in AKI)"],
        tier2: ["Leptospira MAT (Microscopic Agglutination Test) — paired titers ×2 (acute + 2–4 weeks convalescent ×4-fold rise = positive)","Leptospira PCR (urine or blood — most sensitive in acute phase, within 7–10 days of illness)","Thoracic radiograph (pulmonary hemorrhage syndrome)","Abdominal ultrasound (renomegaly, perirenal effusion)","Coagulation panel (DIC risk)"],
        tier3: ["Darkfield microscopy urine (low sensitivity)","Leptospira culture (takes weeks)","Biopsy (research only)"]
      },
      treatment: {
        medications: [
          "— ANTIBIOTIC TREATMENT —",
          "Phase 1 (leptospiremia phase): Penicillin G 25,000–40,000 IU/kg IV q12h × 2 weeks",
          "OR Ampicillin 22 mg/kg IV TID × 2 weeks",
          "Phase 2 (eliminate renal carrier state): Doxycycline 5–10 mg/kg PO BID × 2 weeks",
          "In mild/early disease: Doxycycline 5–10 mg/kg PO BID × 3 weeks (full course)",
          "— SUPPORTIVE CARE (AKI is primary concern) —",
          "IV fluid therapy: LRS 60–90 mL/kg/day (rehydrate AND diurese renal tubules)",
          "Furosemide 1–2 mg/kg IV q6–12h if oliguria despite adequate hydration",
          "Antiemetics: Maropitant 1 mg/kg IV SID",
          "H2 blocker/PPI: Omeprazole 0.5–1 mg/kg IV SID (uremic ulcers)",
          "Phosphate binders if severe hyperphosphatemia"
        ],
        procedures: ["STRICT isolation — zoonotic risk (barrier nursing, gloves, mask)","ICU monitoring: urine output q2–4h, daily electrolytes, BUN/Cr","Hemodialysis or peritoneal dialysis (refractory oliguria/anuria)","Notify public health if leptospirosis confirmed (reportable zoonosis in many countries)"],
        diet: ["Renal prescription diet once stable (AKI recovery phase)","Low-protein initially if severe azotemia","Electrolyte-balanced diet"]
      },
      education: {
        monitor: ["Urine output (oliguria is poor sign)","Vomiting and appetite","Eye color (yellowing = jaundice)","Water consumption","Weight daily (fluid balance)"],
        red_flags: ["No urine output >8 hours despite IV fluids — EMERGENCY (anuric AKI)","Progressive jaundice","Coughing blood or breathing difficulty","Neurological signs"],
        followup: "Renal panel at 1, 2, 4 weeks post-discharge; vaccination with 4-valent Lepto vaccine after recovery; annual prevention; avoid wildlife water sources",
        prognosis: "guarded"
      }
    },

    {
      id: "toxoplasmosis",
      name: "Toxoplasmosis",
      species: ["cat","dog"],
      category: "Internal Medicine / Infectious / Parasitology",
      signals: {
        complaints_lethargy: 7, complaints_anorexia: 7, complaints_vomiting: 6,
        complaints_diarrhea: 5, complaints_dyspnea: 6, complaints_seizures: 5,
        complaints_eye_discharge: 6,
        temp_high: 7,
        eyes_conjunctival_hyperemia: 6, eyes_discharge_mucopurulent: 5,
        resp_crackles_fine: 5,
        neuro_seizure: 6, neuro_disoriented: 5, gait_ataxia: 5,
        lymph_moderate: 5, lymph_mild: 4,
        hpi_onset_subacute: 7,
        env_outdoor: 5, env_contact_stray: 5,
        age_kitten: 6, age_young: 5
      },
      tests: {
        tier1: ["CBC (lymphocytosis, monocytosis, eosinophilia)","Chemistry (elevated ALT, ALP, lipase — hepatic/pancreatic involvement)","Thoracic radiograph (alveolar/interstitial pattern)","Ophthalmic exam (uveitis, retinochoroiditis — slit-lamp)"],
        tier2: ["Toxoplasma IgM + IgG serology (acute IgM + high IgG, or rising IgG = active infection)","Toxoplasma PCR (aqueous humor, CSF, BAL — highest specificity)","CSF analysis","Abdominal ultrasound"],
        tier3: ["MRI brain/spine","Tissue biopsy (PCR)"]
      },
      treatment: {
        medications: [
          "Clindamycin 12.5–25 mg/kg PO BID × 4 weeks (drug of choice — dogs and cats)",
          "Trimethoprim-sulfamethoxazole 15–30 mg/kg PO BID × 4 weeks (alternative; monitor bone marrow)",
          "Pyrimethamine + sulfadiazine (combination — used rarely in severe CNS toxo)",
          "Prednisolone 0.5–1 mg/kg PO SID (uveitis/CNS inflammation — after antibiotic initiation)",
          "Topical ophthalmic prednisolone (uveitis — 1 drop q6–8h)"
        ],
        procedures: ["Ophthalmic recheck 2–4 weeks","Biosafety: gloves when handling cat litter (zoonosis — pregnant women, immunocompromised)","Do not feed raw meat","Keep cats indoors"],
        diet: ["No raw meat","Commercial cooked or heat-treated food only"]
      },
      education: {
        monitor: ["Eye cloudiness or redness","Neurological signs","Appetite and energy level","Respiratory effort"],
        red_flags: ["Progressive neurological signs","Sudden blindness","Respiratory distress","Zoonotic risk — IMPORTANT: inform immunocompromised owners, pregnant owners immediately"],
        followup: "Recheck serology at 4 weeks; ophthalmic exam at 2 and 4 weeks; recurrence possible in immunocompromised cats (FIV, FeLV)",
        prognosis: "fair"
      }
    },

    // ═══════════════════ RESPIRATORY ════════════════════════════════════════

    {
      id: "tracheal_collapse",
      name: "Tracheal Collapse",
      species: ["dog"],
      category: "Internal Medicine / Respiratory",
      signals: {
        complaints_coughing: 9, complaints_dyspnea: 7, complaints_behavioral: 4,
        hpi_onset_chronic: 8, hpi_progression_worsening: 6,
        hpi_progression_fluctuating: 5,
        resp_wheeze: 6,
        weight_small: 7, bcs_obese: 7,
        breed_chihuahua: 8, breed_pomeranian: 8, breed_shih_tzu: 7,
        breed_poodle: 6, breed_yorkshire: 8,
        age_middle: 6, age_old: 7,
        attitude_bar: 5, attitude_qar: 4
      },
      tests: {
        tier1: ["Thoracic radiograph (expiratory — dorsoventral flattening of trachea; inspiratory — cervical collapse)","Fluoroscopy (dynamic study — gold standard for collapse phase)","CBC/Chemistry","Pulse oximetry / SpO2"],
        tier2: ["Tracheoscopy/bronchoscopy (direct grade I–IV)","Echocardiography (concurrent cardiac disease)","Thyroid palpation + T4 (concurrent hypothyroidism)","Cervical radiograph"],
        tier3: ["CT trachea","Airway PCR panel (concurrent infection)"]
      },
      treatment: {
        medications: [
          "Butorphanol 0.05–0.1 mg/kg PO q6–8h (cough suppressant first-line)",
          "Hydrocodone 0.25–0.5 mg/kg PO q8–12h (alternative antitussive)",
          "Sedation for acute episodes: Acepromazine 0.025–0.05 mg/kg SC/IM + Butorphanol 0.2–0.4 mg/kg IM",
          "Bronchodilator: Theophylline extended-release 10–20 mg/kg PO q12h (dogs)",
          "Terbutaline 0.01 mg/kg SC/IM (acute bronchospasm)",
          "Short-course prednisolone 0.5 mg/kg PO SID × 5–7 days (acute inflammatory episodes only)",
          "Doxycycline 5–10 mg/kg PO BID × 2 weeks if secondary bacterial component suspected",
          "Weight loss medications if obese (dietary management primarily)"
        ],
        procedures: ["Intraluminal tracheal stent placement (Grade III–IV, medical management failure)","Extraluminal prosthetic rings (cervical collapse — surgical, young dogs)","O2 supplementation for acute episodes","Avoid neck collars — use harness only","Minimize excitement, heat, and humidity triggers"],
        diet: ["Strict weight management — obesity is major exacerbating factor","Weight loss prescription diet","No table scraps, calorie restriction"]
      },
      education: {
        monitor: ["Cough frequency and character (honking quality)","Exercise tolerance","Body weight (key management factor)","Triggers: excitement, heat, leash pulling, eating fast"],
        red_flags: ["Cyanotic gums during coughing fit — EMERGENCY","Inability to catch breath after coughing","Syncope (passing out) after cough","Progressive worsening despite medical management"],
        followup: "Recheck q3–6 months; weight management milestones; consider surgical/stent referral if Grades III–IV or refractory to medical management",
        prognosis: "fair"
      }
    },

    {
      id: "pleural_effusion",
      name: "Pleural Effusion",
      species: ["dog","cat"],
      category: "Internal Medicine / Respiratory",
      emergency: true,
      signals: {
        complaints_dyspnea: 10, complaints_lethargy: 8, complaints_coughing: 5,
        complaints_collapse: 6, complaints_anorexia: 6,
        resp_muffled: 9, chest_open_mouth: 8, chest_accessory_muscles: 8,
        mm_cyanotic: 7, mm_pale: 5,
        hpi_onset_sudden: 7, hpi_onset_subacute: 6,
        attitude_dull: 7, attitude_obtunded: 6,
        posture_wide_based: 5
      },
      tests: {
        tier1: ["Thoracic radiograph (blunted costophrenic angles, retrocardiac opacity, horizontal fluid line)","Thoracic ultrasound (TFAST — bedside — most sensitive)","Pulse oximetry","Fluid analysis: aspirate + cytology + culture (characterize: transudate, exudate, chylous, hemorrhagic, neoplastic)"],
        tier2: ["CBC/Chemistry/UA","NT-proBNP (cardiac cause)","Echo (cardiac effusion cause)","Cytology of pleural fluid (neoplastic cells?)","Culture + sensitivity of fluid"],
        tier3: ["CT thorax","Thoracoscopy","Lymphangiography (chylothorax)"]
      },
      treatment: {
        medications: [
          "— EMERGENCY STABILIZATION —",
          "O2 supplementation (flow-by, nasal prongs, O2 cage) — minimize stress",
          "AVOID restraint if severely dyspneic (stress death risk)",
          "Furosemide 1–2 mg/kg IV/IM (cardiac causes only — do NOT use for pyothorax/chylothorax)",
          "— AFTER STABILIZATION (TREAT UNDERLYING CAUSE) —",
          "Cardiac: Furosemide + atenolol/diltiazem/clopidogrel (see feline_hcm)",
          "Pyothorax: Thoracic lavage + Amoxicillin-clavulanate 12.5–25 mg/kg PO BID × 4–6 weeks",
          "Chylothorax: Rutin 50 mg/kg PO TID (dogs — assists chyle resorption)",
          "Neoplastic: Per tumor type (see lymphoma, mesothelioma)"
        ],
        procedures: ["Thoracocentesis — IMMEDIATE if severe dyspnea (30–100 mL/side may give dramatic relief)","Chest drain placement if rapidly reaccumulating","Pleurodesis (refractory chylothorax)","Pericardiectomy (if pericardial effusion causing cardiac tamponade)","Surgical thoracotomy (pyothorax not responding to medical management)"],
        diet: ["Ultra-low-fat diet for chylothorax (reduces chyle production)","Medium-chain triglyceride (MCT) oil supplementation (chylothorax)","Cardiac diet if cardiac cause"]
      },
      education: {
        monitor: ["Resting respiratory rate daily (normal <30 rpm cats, <20 rpm dogs)","Breathing effort and noise","Activity level and willingness to move","Appetite and posture (hunched = respiratory distress)"],
        red_flags: ["Respiratory rate >40 rpm at rest","Open-mouth breathing in a cat","Blue/grey gums — IMMEDIATE EMERGENCY","Sudden deterioration after apparent improvement"],
        followup: "Radiograph after thoracocentesis; recheck 3–7 days; monitor for reaccumulation; investigate and treat underlying cause aggressively",
        prognosis: "guarded"
      }
    },

    // ═══════════════════ CARDIOLOGY ═════════════════════════════════════════

    {
      id: "dcm",
      name: "Dilated Cardiomyopathy (DCM)",
      species: ["dog","cat"],
      category: "Internal Medicine / Cardiology",
      signals: {
        complaints_coughing: 7, complaints_dyspnea: 8, complaints_lethargy: 8,
        complaints_collapse: 6, complaints_anorexia: 6,
        cardiac_murmur_34: 7, cardiac_murmur_12: 4, cardiac_arrhythmia: 9,
        cardiac_tachycardia: 7,
        resp_crackles_fine: 6, resp_muffled: 6,
        chest_accessory_muscles: 6,
        mm_pale: 5, mm_cyanotic: 5,
        abdomen_fluid_wave: 6, abdomen_distension: 5,
        age_middle: 7, age_old: 6, weight_large: 6, weight_giant: 7,
        breed_doberman: 9, breed_great_dane: 8, breed_boxer: 7,
        breed_newfoundland: 7, breed_weimaraner: 6, breed_cocker: 6,
        hpi_onset_subacute: 6, hpi_progression_worsening: 7
      },
      tests: {
        tier1: ["Echocardiography — fractional shortening <25%, increased LV diastolic dimension (gold standard)","Thoracic radiograph (cardiomegaly, pulmonary edema, pleural effusion)","ECG (VPCs, VT, AFib — Dobermans especially)","CBC/Chemistry","Blood pressure"],
        tier2: ["24-hour Holter monitor (Doberman — >50 VPCs/24h or R-on-T = intervention threshold)","NT-proBNP serum (>900 pmol/L supports occult/overt DCM in dogs)","Troponin I (myocardial necrosis)","Taurine level (cocker spaniels, grain-free diet DCM)","Serum carnitine level"],
        tier3: ["Cardiac MRI","Genetic testing (Doberman PDK4, striatin mutations)","Thyroid function (hypothyroid DCM)","Toxicology (doxorubicin-induced)"]
      },
      treatment: {
        medications: [
          "— OCCULT (PRECLINICAL) DCM —",
          "Pimobendan 0.25 mg/kg PO BID (PROTECT trial: delays onset CHF in occult Dobermans)",
          "If taurine-deficient DCM: Taurine 500–1000 mg/dog PO BID + L-Carnitine 50 mg/kg PO BID",
          "— OVERT DCM WITH CHF —",
          "Pimobendan 0.25 mg/kg PO BID (positive inotrope + vasodilator — cornerstone)",
          "Furosemide 1–4 mg/kg PO BID–TID (dose to effect, titrate down to minimum)",
          "Enalapril 0.5 mg/kg PO SID–BID (afterload reduction)",
          "Spironolactone 1–2 mg/kg PO SID (aldosterone antagonist, remodeling prevention)",
          "— ARRHYTHMIA MANAGEMENT —",
          "Mexiletine 4–8 mg/kg PO TID (ventricular arrhythmias — Dobermans)",
          "Sotalol 1.5–3 mg/kg PO BID (VT/AFib — when mexiletine not tolerated)",
          "Diltiazem (extended release) 1–3 mg/kg PO BID (AFib rate control)"
        ],
        procedures: ["Thoracocentesis (pleural effusion)","Abdominocentesis (ascites — palliative)","Cardiologist referral for Holter interpretation and management","Renal panel q6 months (ACE inhibitor monitoring)"],
        diet: ["Commercial taurine/carnitine-supplemented diet","AVOID grain-free boutique diets (FDA DCM advisory — legume-heavy foods)","Low-sodium diet (moderate restriction)","Taurine 250–500 mg/cat PO BID (grain-free diet cat)"]
      },
      education: {
        monitor: ["Resting respiratory rate daily (<30 rpm cats, <20 rpm dogs)","Exercise tolerance trends","Abdomen for distension (ascites)","Sudden weakness or fainting (arrhythmia)"],
        red_flags: ["Sudden collapse or weakness","Respiratory rate >40 rpm at rest","Blue gums","Syncope — may represent fatal ventricular arrhythmia in Dobermans"],
        followup: "Echo q3–6 months; Holter q6–12 months (Dobermans); renal panel with ACEi; adjust furosemide dose based on RR diary",
        prognosis: "guarded"
      }
    },

    // ═══════════════════ ONCOLOGY ════════════════════════════════════════════

    {
      id: "osteosarcoma",
      name: "Osteosarcoma (OSA)",
      species: ["dog","cat"],
      category: "Oncology / Musculoskeletal",
      signals: {
        complaints_limping: 9, complaints_swelling_mass: 8,
        gait_moderate_lameness: 8, gait_non_weight: 7,
        limbs_joint_swelling: 7, limbs_joint_pain: 8,
        hpi_onset_subacute: 7, hpi_progression_worsening: 9,
        weight_large: 7, weight_giant: 8,
        age_middle: 7, age_old: 7,
        breed_great_dane: 8, breed_saint_bernard: 8, breed_rottweiler: 7,
        breed_german_shepherd: 5, breed_labrador: 5, breed_golden: 5
      },
      contra_signals: { hpi_onset_chronic: -2, limbs_reduced_rom: -1 },
      tests: {
        tier1: ["Radiograph of affected limb — aggressive bone lesion (lytic, productive, 'sunburst' periosteal reaction, Codman's triangle)","Thoracic radiograph × 3 views (pulmonary metastases — present in ~15% at diagnosis)","CBC/Chemistry (ALP — elevated in ~50%, correlates with prognosis)","Urinalysis"],
        tier2: ["CT thorax (more sensitive for pulmonary metastases than radiograph)","CT affected limb (surgical planning)","Bone biopsy (definitive histopathology — required for definitive diagnosis)","Bone scan (scintigraphy — metastatic survey)","Abdominal ultrasound (lymph node metastases)"],
        tier3: ["MRI","VEGF levels (prognostic research)","Immunohistochemistry"]
      },
      treatment: {
        medications: [
          "— PAIN MANAGEMENT (CRITICAL — OSA is very painful) —",
          "Carprofen 2.2 mg/kg PO BID OR Meloxicam 0.1 mg/kg PO SID",
          "Gabapentin 5–10 mg/kg PO BID–TID (neuropathic bone pain)",
          "Tramadol 2–5 mg/kg PO q8h (short-term)",
          "Amantadine 3–5 mg/kg PO SID (NMDA antagonist — synergistic with NSAIDs)",
          "Pamidronate 1 mg/kg IV q28 days (bisphosphonate — bone pain + anti-resorptive)",
          "— ADJUVANT CHEMOTHERAPY (post-amputation) —",
          "Carboplatin 300 mg/m² IV q3 weeks × 4 doses (median survival 10–14 months)",
          "Cisplatin 70 mg/m² IV q3 weeks (alternative; nephrotoxic — requires saline diuresis)",
          "Doxorubicin alternating with carboplatin protocols in select patients"
        ],
        procedures: [
          "Amputation (affected limb) — standard of care; median survival without chemo 4–6 months, with chemo 10–14 months",
          "Limb-sparing surgery (radius, ulna) — palliative/functional alternative; high complication rate",
          "Stereotactic radiosurgery (CyberKnife) — pain palliation for non-surgical candidates",
          "Analgesic palliative management if surgery declined",
          "Referral to veterinary oncologist"
        ],
        diet: ["High-quality protein diet","Omega-3 fatty acids (anti-inflammatory, anti-tumor effect: EPA/DHA 40 mg/kg/day)","Maintain body weight and muscle mass"]
      },
      education: {
        monitor: ["Pain level — daily home scoring","Weight-bearing status","Respiratory rate (pulmonary metastases)","Quality of life assessment"],
        red_flags: ["Pathological fracture (acute non-weight bearing after minor stress) — EMERGENCY","Sudden severe pain spike — consider pathological fracture","Progressive weight loss","New respiratory signs (metastasis)"],
        followup: "Thoracic radiograph q2 months; renal panel with cisplatin; quality of life discussions ongoing; oncology referral highly recommended",
        prognosis: "guarded"
      }
    },

    {
      id: "panosteitis",
      name: "Panosteitis (Pano)",
      species: ["dog"],
      category: "Musculoskeletal / Orthopaedics",
      signals: {
        complaints_limping: 9,
        gait_mild_lameness: 7, gait_moderate_lameness: 7,
        limbs_joint_pain: 8,
        hpi_progression_fluctuating: 9, hpi_onset_sudden: 6,
        age_young: 9, age_puppy: 9,
        weight_large: 7, weight_medium: 5,
        breed_german_shepherd: 8, breed_great_dane: 6, breed_labrador: 6,
        breed_golden: 6, breed_rottweiler: 6,
        sex_male_intact: 6
      },
      contra_signals: { age_old: -5, age_middle: -3, limbs_crepitus: -3, limbs_joint_swelling: -3 },
      tests: {
        tier1: ["Radiograph long bones (diaphyseal medullary density changes — 'cotton wool' or patchy opacity)","CBC/Chemistry (rule out other causes; mild eosinophilia in ~20%)","Orthopedic exam (pain on mid-diaphyseal palpation, NOT at joint)"],
        tier2: ["Rule out: OCD (joint lesions), HOD (metaphyseal changes), hypertrophic osteodystrophy","Joint radiograph if joint pain suspected"],
        tier3: ["Bone scan (scintigraphy — hot spots at affected long bones)","Referral if refractory or atypical presentation"]
      },
      treatment: {
        medications: [
          "Self-limiting condition — resolves by 18–24 months of age typically",
          "Meloxicam 0.1 mg/kg PO SID during painful episodes",
          "Carprofen 2.2 mg/kg PO BID during painful episodes",
          "Gabapentin 5–10 mg/kg PO BID if severe pain",
          "DO NOT use corticosteroids (no benefit, side effects)"
        ],
        procedures: ["Rest during painful episodes (lead walks only)","Physiotherapy (gentle passive ROM) — avoid high impact until symptom-free","Reassurance and owner education (self-limiting)"],
        diet: ["Avoid over-supplementation with calcium/phosphorus (do NOT add extra calcium to diet)","Large breed puppy diet (lower calcium/phosphorus ratio)","Controlled caloric intake — avoid rapid growth"]
      },
      education: {
        monitor: ["Which limb is affected (can shift leg to leg — shifting lameness)","Response to NSAID treatment (should improve significantly within 48–72h)","Pain level during growth spurts"],
        red_flags: ["Not responding to NSAIDs within 72h — reconsider diagnosis","Persistent pain >2 months in one limb — rule out OCD or bone tumor","Weight loss or systemic illness (not typical of pano)"],
        followup: "Recheck in 2–3 weeks; reassure owner this resolves with skeletal maturity; radiograph if no improvement to rule out other pathology",
        prognosis: "excellent"
      }
    },

    // ═══════════════════ NEPHROLOGY ═════════════════════════════════════════

    {
      id: "acute_kidney_injury",
      name: "Acute Kidney Injury (AKI)",
      species: ["dog","cat"],
      category: "Internal Medicine / Nephrology",
      emergency: true,
      signals: {
        complaints_vomiting: 8, complaints_anorexia: 8, complaints_lethargy: 9,
        complaints_polydipsia: 6, complaints_polyuria: 6, complaints_collapse: 6,
        hpi_onset_sudden: 8, hpi_onset_subacute: 6, hpi_progression_worsening: 8,
        hydration_moderate: 7, hydration_severe: 8,
        mm_pale: 6, mm_tacky: 7, mm_brick_red: 5,
        kidneys_renomegaly: 8, kidneys_irregular: 6, abdomen_pain_moderate: 6,
        attitude_dull: 8, attitude_obtunded: 7,
        history_toxin_ingestion: 7
      },
      tests: {
        tier1: ["Chemistry panel — BUN, creatinine, SDMA, phosphorus, potassium, sodium, bicarbonate","Urinalysis with sediment (granular casts = tubular damage; proteinuria)","CBC (non-regenerative anemia in CKD; leukocytosis if infection)","Blood pressure (hypertension in AKI/CKD)","Urine specific gravity (1.008–1.012 = isosthenuria — cannot concentrate)"],
        tier2: ["Abdominal ultrasound (kidney size, echogenicity, pelvis dilation)","Urine protein:creatinine ratio (UPC)","Urine culture (rule out pyelonephritis)","SDMA (symmetric dimethylarginine — early marker)","Leptospira PCR/MAT (AKI in dogs — HIGH suspicion)","Ethylene glycol test if toxin exposure suspected"],
        tier3: ["Renal biopsy (guide therapy, prognosis)","CT kidneys","Hemodialysis/PD assessment"]
      },
      treatment: {
        medications: [
          "IV fluid diuresis: LRS or Plasmalyte 60–90 mL/kg/day (primary treatment)",
          "Fluid challenge: 5% body weight over 4h, reassess urine output",
          "Furosemide 1–2 mg/kg IV q8–12h if oliguria despite adequate hydration (establish urine flow)",
          "Dopamine CRI 2–5 mcg/kg/min (renal vasodilation — low-dose protocol, controversial but used)",
          "Mannitol 0.5–1 g/kg IV slow infusion (oliguric AKI — osmotic diuresis)",
          "Antiemetics: Maropitant 1 mg/kg IV SID",
          "H2 blocker: Omeprazole 0.5–1 mg/kg IV SID (uremic ulcers)",
          "Phosphate binder: Aluminum hydroxide 30–90 mg/kg/day PO divided (if hyperphosphatemia)",
          "Potassium supplementation in IV fluids if hypokalemic",
          "Sodium bicarbonate 1–2 mEq/kg IV slowly if severe metabolic acidosis (pH <7.1)"
        ],
        procedures: ["ICU monitoring: urine output q1–2h (foley catheter), electrolytes q4–8h","Dialysis (hemodialysis or peritoneal dialysis) if anuric despite treatment","Remove/treat underlying cause (toxin, leptospirosis, obstruction, sepsis)","Daily weight and fluid balance assessment"],
        diet: ["Renal prescription diet (phosphorus, protein restriction) when eating","Increased water access (fountains, wet food)","Avoid NSAIDs, aminoglycosides, contrast dye during recovery"]
      },
      education: {
        monitor: ["Urine output volume and color","Vomiting episodes","Energy level","Water intake","Blood pressure at home if possible"],
        red_flags: ["No urination for >8 hours — EMERGENCY","Vomiting blood or dark tarry stool (uremic ulcers)","Sudden collapse or seizures (severe uremia)","Potassium >7 mEq/L — cardiac arrest risk"],
        followup: "Renal panel every 3–5 days until stable; transition to renal diet; monitor BP; consider renal biopsy for prognosis; SDMA q3 months long-term",
        prognosis: "guarded"
      }
    },

    // ═══════════════════ TOXICOLOGY ═════════════════════════════════════════

    {
      id: "lily_toxicosis",
      name: "Lily Toxicosis (Cat — TRUE Lilies)",
      species: ["cat"],
      category: "Toxicology / Nephrology",
      emergency: true,
      signals: {
        complaints_vomiting: 9, complaints_anorexia: 8, complaints_lethargy: 8,
        complaints_collapse: 6,
        hpi_onset_sudden: 10,
        history_toxin_ingestion: 8,
        hydration_mild: 5, hydration_moderate: 6,
        attitude_dull: 7, attitude_obtunded: 6,
        kidneys_renomegaly: 6, abdomen_pain_mild: 5
      },
      tests: {
        tier1: ["Chemistry panel — BUN, creatinine (rising rapidly in 24–72h)","Urinalysis (granular casts = tubular necrosis; glucosuria)","CBC","Electrolytes"],
        tier2: ["Plant identification — confirm TRUE lily genus (Lilium or Hemerocallis)","Serial chemistry q12–24h","Urine output monitoring","Blood pressure"],
        tier3: ["Renal biopsy if chronic AKI develops"]
      },
      treatment: {
        medications: [
          "— TIME-CRITICAL: TREAT WITHIN 6 HOURS FOR BEST OUTCOME —",
          "DECONTAMINATION (only if within 2h of ingestion and patient alert): Apomorphine 0.03 mg/kg IV (dogs); 3% H2O2 1–2 mL/kg PO (cats — less reliable, use with caution)",
          "Activated charcoal 1–4 g/kg PO (within 1–2h of ingestion; only if airway protected)",
          "— KIDNEY PROTECTION (primary goal) —",
          "IV fluid diuresis: LRS 1.5× maintenance for minimum 48 HOURS (prevent/minimize AKI)",
          "Do not wait for azotemia to develop — treat prophylactically",
          "Furosemide 1–2 mg/kg IV q8h if oliguria develops",
          "Maropitant 1 mg/kg IV SID (antiemetic)",
          "Omeprazole 0.5–1 mg/kg IV SID (uremic ulcer prevention)",
          "Phosphate binder + sodium bicarbonate as needed per azotemia management"
        ],
        procedures: ["IMMEDIATE hospitalization (48–72h minimum IV fluid diuresis)","Foley catheter + urine output monitoring q1–2h","Serial renal function q12–24h × 3 days","Hemodialysis/peritoneal dialysis if anuric AKI develops","CRITICAL: Identify plant immediately — 'Peace lily' (Spathiphyllum) = NOT a true lily, causes oral irritation only, NOT renal failure; Lilium (Easter lily, Tiger lily, Daylily) = DEADLY to cats"],
        diet: ["Renal prescription diet as soon as eating","Wet food + water fountains long-term","Remove ALL true lily plants from household permanently"]
      },
      education: {
        monitor: ["Urine output (CRITICAL)","Vomiting and appetite","Kidney value trend (creatinine, BUN)","Energy level"],
        red_flags: ["All true lily ingestion in cats = EMERGENCY — do NOT 'wait and see'","Anuric AKI = life-threatening (poor prognosis without dialysis)","Delayed presentation >6h = significantly worse prognosis","Creatinine rising rapidly = irreversible tubular necrosis may be occurring"],
        followup: "Renal panel 3, 7, 30 days post-discharge; SDMA monitoring; permanent removal of lily plants from home",
        prognosis: "guarded"
      }
    },

    {
      id: "toxin_ethylene_glycol",
      name: "Ethylene Glycol Toxicosis (Antifreeze Poisoning)",
      species: ["dog","cat"],
      category: "Toxicology / Nephrology",
      emergency: true,
      signals: {
        complaints_vomiting: 8, complaints_lethargy: 8, complaints_seizures: 7,
        complaints_collapse: 8, complaints_behavioral: 7,
        hpi_onset_sudden: 10,
        history_toxin_ingestion: 9,
        neuro_disoriented: 8, neuro_seizure: 7, gait_ataxia: 7,
        mm_tacky: 5,
        kidneys_renomegaly: 7, abdomen_pain_moderate: 6,
        attitude_dull: 8, attitude_obtunded: 8
      },
      tests: {
        tier1: ["Ethylene glycol test kit (urine fluorescence — antifreeze contains fluorescein dye; positive within 12h)","CBC/Chemistry — anion gap metabolic acidosis, azotemia","Urinalysis — calcium oxalate monohydrate crystals (PATHOGNOMONIC — appear 3–8h post-ingestion dog, 3h cat)","Blood gas (severe metabolic acidosis)"],
        tier2: ["Serum ethylene glycol level (reference lab — quantitative)","Osmolal gap (early marker)","Abdominal ultrasound (kidneys)","Coagulation panel"],
        tier3: ["Renal biopsy","Hemodialysis assessment"]
      },
      treatment: {
        medications: [
          "— EXTREME TIME-SENSITIVE: TREATMENT WITHIN 1–3h (DOG) or WITHIN 30–60min (CAT) —",
          "ANTIDOTE: Fomepizole (4-methylpyrazole, 4-MP) — dogs: 20 mg/kg IV loading, then 15 mg/kg IV at 12h, 24h, 36h",
          "CATS: Fomepizole at HIGHER dose: 125 mg/kg IV loading, then 31.25 mg/kg IV at 12h, 24h, 36h — effective only within 3h of ingestion",
          "Ethanol 20% (if fomepizole unavailable): Dogs 5.5 mL/kg IV loading then CRI 1.65 mL/kg/h × 5 doses",
          "DECONTAMINATION: Apomorphine 0.03 mg/kg IV emesis if <30–60 min post-ingestion and alert",
          "IV fluid therapy: LRS 60–90 mL/kg/day (renal diuresis)",
          "Sodium bicarbonate 1–2 mEq/kg IV for severe metabolic acidosis (pH <7.1)",
          "Thiamine 100 mg IM/IV (diverts metabolism — adjunct)"
        ],
        procedures: ["ICU: q1h mentation checks, urine output, blood gas q2–4h","Hemodialysis (most effective — removes EG and glycolic acid directly; ideal if available)","Peritoneal dialysis alternative"],
        diet: ["Nothing per os until stable","Renal diet post-recovery"]
      },
      education: {
        monitor: ["Mentation and coordination","Urine output","Vomiting","Blood gas values"],
        red_flags: ["ANY suspected antifreeze ingestion in a cat = IMMEDIATE EMERGENCY — DO NOT WAIT FOR SYMPTOMS","Ataxia/wobbling in a pet with outdoor access — assume EG until proven otherwise","Calcium oxalate crystals in urine = exposure has occurred, AKI developing"],
        followup: "Renal panel q24h × 3 days, then q3–7 days; long-term renal monitoring if AKI occurred; antifreeze-free alternatives (propylene glycol) recommended",
        prognosis: "guarded"
      }
    },

    // ════════════════ INDONESIA-SPECIFIC & TROPICAL CONDITIONS ════════════════

    {
      id: "canine_babesiosis",
      name: "Canine Babesiosis (Tick-Borne Haemoprotozoa)",
      species: ["dog"],
      category: "Internal Medicine / Infectious / Parasitology — Indonesia Endemic",
      emergency: true,
      signals: {
        complaints_lethargy: 9, complaints_anorexia: 8, complaints_vomiting: 5,
        complaints_collapse: 7, complaints_bleeding: 5,
        mm_pale: 10, mm_white: 9, mm_icteric: 7,
        hr_high: 8, temp_high: 7,
        hpi_onset_sudden: 8, hpi_onset_subacute: 6,
        attitude_dull: 8, attitude_obtunded: 7,
        env_outdoor: 7, parasites_tick: 9,
        spleen_splenomegaly: 7, liver_hepatomegaly: 5,
        hydration_moderate: 6
      },
      tests: {
        tier1: ["Blood smear — Giemsa stain (piroplasms in RBCs — Babesia canis trophozoites, paired pear-shapes)","CBC: severe regenerative hemolytic anemia, thrombocytopenia","Chemistry: hyperbilirubinemia (hemolysis), elevated ALT, azotemia (renal)","Urinalysis: hemoglobinuria (dark red/brown urine)"],
        tier2: ["Babesia PCR (blood) — definitive species identification (B. canis, B. gibsoni, B. vogeli)","4Dx SNAP or equivalent tick-borne panel","Blood pressure","Coagulation panel (DIC risk in severe cases)"],
        tier3: ["Flow cytometry","Cross-match before transfusion","Specialist referral for complicated cases"]
      },
      treatment: {
        medications: [
          "Imidocarb dipropionate 6.6 mg/kg SC/IM × 1 dose; repeat at 14 days (B. canis)",
          "Pre-medicate with atropine 0.05 mg/kg SC 15 min before imidocarb (prevent cholinergic side effects)",
          "Azithromycin 10 mg/kg PO SID + Atovaquone 13.3 mg/kg PO TID × 10 days (B. gibsoni — refractory small Babesia)",
          "pRBC transfusion if PCV <15% with clinical signs",
          "IV fluid therapy (LRS) — maintain renal perfusion",
          "Doxycycline 5–10 mg/kg PO BID × 28 days (concurrent Ehrlichia co-infection common)",
          "Prednisolone 0.5–1 mg/kg PO SID if immune-mediated component (IMHA secondary to Babesia)"
        ],
        procedures: ["Remove attached ticks immediately (tick twister)","Isoxazoline tick prevention (Bravecto/NexGard) monthly going forward","ICU monitoring: PCV q6–12h, urine output, electrolytes","Renal monitoring (acute kidney injury risk)","CBC recheck at days 3, 7, 14, 28"],
        diet: ["High-protein supportive diet during recovery","Iron-rich diet (liver) or supplementation post-anemia resolution"]
      },
      education: {
        monitor: ["Gum color daily (pale = worsening anemia)","Urine color (red/dark = hemoglobinuria)","Activity level and appetite","Monthly tick prevention compliance"],
        red_flags: ["White gums or collapse = CRITICAL anemia — immediate transfusion needed","Dark red/brown urine (hemoglobinuria — kidney stress)","Jaundice worsening","No response to treatment in 48–72h"],
        followup: "PCV on days 3, 7, 14, 28; repeat PCR at day 28; lifelong tick prevention (endemic in Indonesia); Babesia PCR at annual wellness check",
        prognosis: "fair"
      }
    },

    {
      id: "canine_filariasis",
      name: "Heartworm Disease — Tropical / Dirofilariasis",
      species: ["dog","cat"],
      category: "Internal Medicine / Parasitology / Cardiology — Indonesia Endemic",
      signals: {
        complaints_coughing: 8, complaints_dyspnea: 7, complaints_lethargy: 7,
        complaints_collapse: 5, complaints_abdominal_distension: 5,
        hpi_onset_chronic: 8, hpi_progression_worsening: 7,
        resp_crackles_fine: 5, resp_muffled: 5,
        cardiac_murmur_12: 5, cardiac_tachycardia: 5,
        abdomen_fluid_wave: 6, abdomen_distension: 5,
        env_outdoor: 8,
        age_middle: 5, age_old: 6
      },
      tests: {
        tier1: ["Heartworm antigen test (SNAP 4Dx or HW antigen — detects adult female Ag)","Microfilaria filter test or modified Knott's test (direct blood smear)","Thoracic radiograph (right heart enlargement, pulmonary artery changes, alveolar pattern)","CBC/Chemistry/UA"],
        tier2: ["Echocardiography (right heart dilation, worm visualization in severe cases)","Blood pressure","Occult infection: melarsomine — Ag positive but no microfilaria","Abdominal ultrasound (caval syndrome)"],
        tier3: ["Pulmonary arterial angiography","Cardiac catheterization (caval syndrome)"]
      },
      treatment: {
        medications: [
          "PRE-TREATMENT STABILIZATION (Class 3–4): Prednisolone 0.5 mg/kg PO SID × 4 weeks (reduce pulmonary inflammation)",
          "Doxycycline 10 mg/kg PO BID × 4 weeks (eliminate Wolbachia endosymbiont — weakens adult worms)",
          "ADULTICIDE: Melarsomine 2.5 mg/kg IM deep lumbar × 2 doses 24h apart (preferred)",
          "After melarsomine: strict cage rest × 4–6 weeks (prevent pulmonary thromboembolism)",
          "SLOW-KILL (alternative): Ivermectin 6–12 mcg/kg PO monthly (monthly prevention dose) — eliminates microfilaria over 2 years",
          "Macrocyclic lactone prevention: Ivermectin monthly OR Milbemycin oxime (all-season prevention)"
        ],
        procedures: ["Strict exercise restriction during and 6 weeks post-adulticidal treatment","Monthly prevention year-round (Indonesia = high-transmission)","Antigen retest 6 months post-treatment","Caval syndrome: surgical worm removal (jugular approach)"],
        diet: ["Low-sodium diet if CHF component","Maintain body weight and muscle mass during treatment restriction"]
      },
      education: {
        monitor: ["Respiratory rate and effort","Coughing frequency","Exercise tolerance","Abdomen for distension (ascites from right heart failure)"],
        red_flags: ["Sudden collapse after exercise (caval syndrome)","Worsening dyspnea after melarsomine — possible pulmonary thromboembolism","Coughing blood","Pale/grey gums"],
        followup: "Antigen test 6 months post-treatment; monthly heartworm prevention lifelong (Indonesia endemic); annual testing; avoid exercise 6 weeks during treatment",
        prognosis: "fair"
      }
    },

    {
      id: "toxoplasma_feline_indonesia",
      name: "Feline Panleukopenia (FPV / Feline Parvovirus)",
      species: ["cat"],
      category: "Internal Medicine / Infectious — Indonesia Common",
      emergency: true,
      signals: {
        complaints_vomiting: 9, complaints_diarrhea: 9, complaints_anorexia: 9,
        complaints_lethargy: 9, complaints_collapse: 6,
        hpi_onset_sudden: 9, hpi_progression_worsening: 9,
        vaccine_never: 10, vaccine_overdue: 8, vaccine_partial: 7,
        age_kitten: 10, age_young: 7,
        mm_pale: 6, mm_tacky: 7,
        hydration_moderate: 7, hydration_severe: 8,
        attitude_dull: 8, attitude_obtunded: 7,
        temp_low: 6, temp_high: 5,
        env_contact_stray: 7, env_kennel: 5
      },
      tests: {
        tier1: ["Feline panleukopenia SNAP test (fecal antigen — use dog CPV4 test, cross-reacts)","CBC: profound leukopenia/neutropenia (hallmark — WBC <2,000/µL)","Blood glucose (hypoglycemia common)","Chemistry panel"],
        tier2: ["Fecal PCR (FPV)","Blood culture (bacteremia/sepsis)","Abdominal ultrasound (ileus, intussusception)"],
        tier3: ["Bone marrow aspirate (severe aplasia)"]
      },
      treatment: {
        medications: [
          "IV fluid therapy: Plasmalyte/LRS — aggressive deficit + maintenance + ongoing losses",
          "Maropitant 1 mg/kg IV/SC SID",
          "Ondansetron 0.1–0.2 mg/kg IV BID–TID",
          "Antibiotics (bacteremia prevention): Ampicillin 20 mg/kg IV TID + Enrofloxacin 5 mg/kg IV SID",
          "Dextrose supplementation (5–10% in IV fluids if hypoglycemic)",
          "Interferon omega 2.5 MU/kg IV SID × 3 days (antiviral — if available)",
          "G-CSF (filgrastim) 5 mcg/kg SC SID × 3–5 days (stimulate neutrophil recovery — use if available)"
        ],
        procedures: ["Strict isolation (highly contagious — bleach-resistant, survives months in environment)","IV access mandatory","Monitor blood glucose q4–6h","Blood transfusion if PCV <15%","Vaccinate all in-contact cats immediately (unaffected, susceptible cats)"],
        diet: ["NPO initially; gradual reintroduction when vomiting stops","High-digestibility kitten/cat food — small frequent meals"]
      },
      education: {
        monitor: ["Vomiting and diarrhea frequency","Body temperature","Appetite and water intake","Feces consistency"],
        red_flags: ["Seizures or hypothermia (sepsis)","Bloody diarrhea worsening","Collapse","Kittens deteriorate within hours — hospitalize at first signs"],
        followup: "Kitten series vaccination (FVRCP) × 3 doses 3–4 weeks apart; annual boosters; environment decontamination with bleach 1:30; isolation 4–6 weeks minimum",
        prognosis: "guarded"
      }
    },

    {
      id: "mange_tropical",
      name: "Mange — Tropical (Mixed Scabies/Demodex)",
      species: ["dog","cat"],
      category: "Dermatology — Indonesia Common",
      signals: {
        complaints_skin_lesions: 9, complaints_hair_loss: 9,
        skin_pruritus: 8, skin_alopecia_focal: 9, skin_alopecia_diffuse: 8,
        skin_crusts: 8, skin_erythema: 7, skin_papules: 6,
        parasites_mites: 9,
        hpi_onset_subacute: 6, hpi_progression_worsening: 8,
        env_outdoor: 6, env_contact_stray: 8,
        age_young: 6
      },
      tests: {
        tier1: ["Multiple deep skin scrapings × 5+ sites (Demodex: cigar-shaped mites; Sarcoptes: round mites + eggs)","Trichogram — hair pluck microscopy","Skin cytology (secondary infection assessment)","Wood's lamp (rule out dermatophytosis)"],
        tier2: ["Therapeutic trial (isoxazoline — covers both species)","DTM culture (concurrent ringworm)","CBC/Chemistry if generalized demodectic mange (immunosuppression workup)"],
        tier3: ["Biopsy (refractory or atypical)","PCR for Demodex species"]
      },
      treatment: {
        medications: [
          "Isoxazoline (treatment of choice — covers both Demodex and Sarcoptes):",
          "Fluralaner (Bravecto) 25–56 mg/kg PO q4–8 weeks × 3–4 doses",
          "Afoxolaner (NexGard) monthly × 4 months",
          "Alternative: Ivermectin 0.3–0.6 mg/kg PO/SC SID (avoid in Collie/MDR1 breeds)",
          "Secondary pyoderma: Cephalexin 22 mg/kg PO BID × 4–6 weeks",
          "Anti-pruritic (Sarcoptes): Prednisolone 0.5 mg/kg SID × 5–7 days (for comfort only)"
        ],
        procedures: ["Medicated chlorhexidine + miconazole shampoo twice weekly","Clip affected areas (generalized Demodex)","Re-scraping q4 weeks until 2 consecutive negatives","Treat all in-contact animals (Sarcoptes)","Environmental cleaning"],
        diet: ["High-quality protein diet","Address any underlying immunosuppression"]
      },
      education: {
        monitor: ["Lesion spread and new pustule formation","Hair regrowth progress","Pruritus level","Secondary infection signs (purulent discharge, odor)"],
        red_flags: ["Generalization to whole body","Fever with skin lesions (septicemia)","Lymphadenopathy (generalized demodectic — poor prognosis without treatment)"],
        followup: "Skin scraping every 4 weeks; treat until 2 consecutive negative scrapings; minimum 3 months treatment; re-scraping 4 weeks after stopping",
        prognosis: "fair"
      }
    },

    {
      id: "wet_cat_ringworm",
      name: "Dermatophytosis — Tropical (High-Humidity Ringworm)",
      species: ["cat","dog","rabbit"],
      category: "Dermatology / Infectious — Indonesia Common",
      signals: {
        complaints_skin_lesions: 8, complaints_hair_loss: 9,
        skin_alopecia_focal: 10, skin_crusts: 7, skin_erythema: 6,
        age_young: 8, age_kitten: 7,
        env_contact_stray: 8, env_new_pet: 7,
        env_indoor: 5,
        hpi_onset_subacute: 6
      },
      contra_signals: { skin_pruritus: -2 },
      tests: {
        tier1: ["Wood's lamp (Microsporum canis fluoresces apple-green — 50% of cases)","DTM (Dermatophyte Test Medium) culture — gold standard, 2–3 weeks","KOH preparation + microscopy (hair shafts)","Skin cytology"],
        tier2: ["PCR for dermatophytes (rapid — 24–48h)","Fungal culture and ID","Skin biopsy (refractory cases)"],
        tier3: []
      },
      treatment: {
        medications: [
          "Systemic antifungal (required for cats — topical alone insufficient):",
          "Itraconazole 5 mg/kg PO SID × 3 weeks ON / 3 weeks OFF × 3 cycles (cats)",
          "Terbinafine 30–40 mg/kg PO SID × 4–6 weeks (dogs — hepatotoxicity monitoring)",
          "Fluconazole 5 mg/kg PO SID × 4–6 weeks (alternative for cats)",
          "Topical: Miconazole 2% + Chlorhexidine 2% shampoo twice weekly (all affected animals)",
          "Lime sulfur dip 1:16 weekly (highly effective, malodorous)"
        ],
        procedures: ["Clip lesion margins (do NOT shave whole body — spreads spores)","Treat ALL cats in household simultaneously","Environmental decontamination: bleach 1:10 on hard surfaces, HEPA vacuum soft surfaces","Quarantine new animals × 4 weeks","Wash bedding 60°C weekly","Recheck cultures q4 weeks"],
        diet: []
      },
      education: {
        monitor: ["New lesion development on patient and other pets","Lesion resolution (center heals first)","Human family members — zoonotic (especially children, elderly, immunocompromised)"],
        red_flags: ["Spreading lesions in human family members — see dermatologist","Cat not responding after 6 weeks treatment","Immunocompromised pets — may not resolve without systemic treatment"],
        followup: "Negative DTM culture required before declaring cured; do not stop treatment early; confirm cure with 2 consecutive negative cultures 2 weeks apart",
        prognosis: "good"
      }
    },

    {
      id: "canine_distemper_indonesia",
      name: "Canine Distemper + Secondary Infection (Indonesia High Incidence)",
      species: ["dog"],
      category: "Internal Medicine / Infectious / Neurology — Indonesia Common",
      emergency: true,
      signals: {
        complaints_coughing: 8, complaints_nasal_discharge: 9, complaints_eye_discharge: 8,
        complaints_vomiting: 7, complaints_diarrhea: 7, complaints_seizures: 7,
        complaints_lethargy: 9, complaints_anorexia: 8,
        temp_high: 8,
        nose_mucopurulent: 8, nose_serous_discharge: 7,
        eyes_discharge_mucopurulent: 8, eyes_conjunctival_hyperemia: 7,
        resp_crackles_fine: 6, resp_increased_bv: 6,
        neuro_seizure: 8, neuro_disoriented: 6, gait_ataxia: 7,
        vaccine_never: 10, vaccine_overdue: 8, vaccine_partial: 7,
        age_kitten: 7, age_young: 8,
        env_contact_stray: 8, env_kennel: 6
      },
      tests: {
        tier1: ["CDV PCR (nasal/conjunctival swab or whole blood)","CBC: profound lymphopenia in acute phase (hallmark)","Thoracic radiograph","Conjunctival smear (CDV inclusion bodies)"],
        tier2: ["CDV antigen rapid test (available in Indonesia)","CSF analysis (neurological phase)","Chemistry panel"],
        tier3: ["MRI brain","Paired serology"]
      },
      treatment: {
        medications: [
          "NO specific antiviral — aggressive supportive care",
          "IV LRS/Plasmalyte fluids (rehydration)",
          "Antibiotics (secondary bacterial pneumonia): Amoxicillin-clavulanate 12.5–25 mg/kg PO BID",
          "Ampicillin 22 mg/kg IV TID + Enrofloxacin 5 mg/kg IV SID (hospitalized pneumonia)",
          "Maropitant 1 mg/kg SC/IV SID (antiemetic)",
          "Seizure control: Phenobarbital 2.5–5 mg/kg IV q6h acute → PO BID maintenance",
          "Diazepam 0.5 mg/kg IV for active seizures",
          "Vitamin A, C, B-complex supplementation",
          "Interferon omega (if available): 2.5 MU/kg IV SID × 3 days"
        ],
        procedures: ["STRICT isolation (droplet + fomite transmission)","Supportive nursing care, nutrition, warmth","Nebulization for respiratory disease","Immediate vaccination of all in-contact unvaccinated dogs (before exposure confirmed)"],
        diet: ["High-digestibility food","Tube feeding if anorexic >48h"]
      },
      education: {
        monitor: ["Neurological signs: seizures, muscle twitching, circling","Respiratory rate and effort","Eye/nose discharge character","Hard pad formation on footpads (pathognomonic)"],
        red_flags: ["Status epilepticus (continuous seizures) — EMERGENCY","Progressive neurological deterioration","Respiratory distress","'Chewing gum' (myoclonic) muscle twitches — permanent neurological damage likely"],
        followup: "Vaccinate ALL unvaccinated dogs in household IMMEDIATELY; core vaccine (DHPPiL) puppy series × 3 starting at 6–8 weeks; annual booster; isolation until PCR negative",
        prognosis: "guarded"
      }
    },

    {
      id: "tropical_pyoderma",
      name: "Deep Pyoderma / Tropical Skin Infection",
      species: ["dog","cat"],
      category: "Dermatology / Infectious — Indonesia Common",
      signals: {
        complaints_skin_lesions: 9, complaints_hair_loss: 6, complaints_lethargy: 5,
        skin_pustules: 10, skin_papules: 8, skin_crusts: 8, skin_erythema: 7,
        skin_alopecia_focal: 6, skin_thickened: 5,
        hpi_onset_subacute: 7, hpi_progression_worsening: 6,
        temp_high: 5,
        env_outdoor: 5,
        chronic_condition_allergies: 5
      },
      tests: {
        tier1: ["Skin cytology (Diff-Quik — cocci/rods, degenerate neutrophils, macrophages)","Impression smear from pustule/collarette","Tape prep for surface organisms","Skin scraping (rule out Demodex in deep pyoderma)"],
        tier2: ["Bacterial culture + sensitivity (mandatory for deep/recurrent cases)","Skin biopsy (deep pyoderma, cellulitis)","CBC/Chemistry if systemic signs","MRSP PCR if multidrug resistant suspected"],
        tier3: ["Referral to dermatology (refractory cases)"]
      },
      treatment: {
        medications: [
          "Superficial pyoderma: Cephalexin 22–30 mg/kg PO BID × 3–4 weeks",
          "Amoxicillin-clavulanate 12.5–25 mg/kg PO BID × 3–4 weeks (alternative)",
          "Deep pyoderma: extend to 6–8 weeks minimum (2 weeks beyond clinical cure)",
          "MRSP: Doxycycline 5–10 mg/kg PO SID/BID (await culture sensitivity)",
          "Topical: Chlorhexidine 2–4% + Miconazole shampoo q3–5d (address concurrent Malassezia)",
          "Mupirocin 2% ointment (focal small lesions)",
          "Anti-pruritic if underlying allergy: Oclacitinib 0.4–0.6 mg/kg PO BID × 14d"
        ],
        procedures: ["Clip affected area for air exposure and topical application","Chlorhexidine 0.05% flush for deep lesions","Address and treat underlying cause (allergy, hypothyroidism, Cushing's, Demodex)","Re-evaluate culture if not responding in 2 weeks"],
        diet: ["High-quality protein diet to support wound healing","Omega-3 supplementation (reduce inflammation, improve barrier function)"]
      },
      education: {
        monitor: ["Lesion resolution and new pustule formation","Pruritus level","Odor (indicates active infection)","Recurrence after stopping antibiotics"],
        red_flags: ["Spreading cellulitis/furunculosis","Fever + spreading lesion (necrotizing infection)","Not responding after 2–3 weeks antibiotics — culture mandatory"],
        followup: "Recheck at 3–4 weeks; continue 7 days beyond clinical cure; culture if recurrent; address underlying disease; avoid over-bathing (strips skin barrier)",
        prognosis: "good"
      }
    },

    {
      id: "snake_bite_toxicosis",
      name: "Venomous Snake Bite (Viper / Cobra / Krait — Southeast Asia)",
      species: ["dog","cat"],
      category: "Toxicology / Emergency — Indonesia Common",
      emergency: true,
      signals: {
        complaints_collapse: 9, complaints_lethargy: 8, complaints_seizures: 6,
        complaints_bleeding: 7, complaints_swelling_mass: 8,
        complaints_vomiting: 5,
        hpi_onset_sudden: 10,
        history_toxin_ingestion: 6,
        complaints_trauma: 7,
        neuro_disoriented: 6, neuro_seizure: 5,
        mm_pale: 7, mm_brick_red: 4,
        hydration_mild: 4, attitude_dull: 7, attitude_obtunded: 8,
        limbs_joint_swelling: 6
      },
      tests: {
        tier1: ["Coagulation panel: PT, aPTT, fibrinogen, D-dimer (viper: coagulopathy/DIC)","CBC (thrombocytopenia, anemia)","Chemistry panel (AKI, hepatotoxicity)","Wound examination — fang mark identification","Blood smear (schistocytes in DIC)"],
        tier2: ["Venom identification if snake species known","Blood pressure","Urine sediment (myoglobinuria — neurotoxic bites)","ECG (cardiac arrhythmias — some venoms)"],
        tier3: ["Advanced coagulation profile","Toxin analysis (specialty lab)"]
      },
      treatment: {
        medications: [
          "ANTIVENOM (if available and species confirmed) — administer IV slowly, watch for anaphylaxis",
          "Pre-medicate for antivenom reaction: Diphenhydramine 1 mg/kg IV + Dexamethasone 0.1 mg/kg IV",
          "IV fluid therapy (LRS) 60–90 mL/kg/day (renal protection, shock treatment)",
          "For hemotoxic (viper) bites — Fresh Frozen Plasma 10–15 mL/kg IV (coagulation factor replacement)",
          "For neurotoxic (cobra/krait) bites — Atropine 0.04 mg/kg IV (if excessive salivation/bradycardia)",
          "Antibiotics: Amoxicillin-clavulanate 12.5–25 mg/kg PO/IV BID × 7–10 days (wound infection)",
          "Meloxicam 0.1 mg/kg SID (local swelling — avoid if coagulopathy)",
          "Calcium gluconate 10%: 0.5–1 mL/kg IV slowly if hypocalcemia"
        ],
        procedures: ["Immobilize bitten limb (do NOT tourniquet, cut, suck)","Keep patient calm — reduces venom spread","Oxygen supplementation if respiratory distress","Coagulation monitoring q4–6h × 24h","Wound care — gentle debridement if necrosis develops","ICU monitoring 24–48h minimum"],
        diet: ["NPO initially if collapse/coagulopathy","Soft food post-recovery"]
      },
      education: {
        monitor: ["Swelling progression (mark circumference q30 min)","Bleeding from gums, wound, urine","Neurological signs: weakness, drooping eyelids, paralysis","Urine color (dark = myoglobinuria/hemolysis)"],
        red_flags: ["Sudden respiratory arrest (cobra/krait neurotoxin) — IMMEDIATE intubation/ventilation","Progressive bleeding from multiple sites (DIC)","Limb swelling doubling within 1 hour","Paralysis spreading from bite site"],
        followup: "Wound check q3 days; coagulation panel at 48h; renal panel at 72h; complete blood count at 1 week; prevent re-exposure (keep dogs on leash at night in snake-endemic areas)",
        prognosis: "guarded"
      }
    },

    {
      id: "feline_upper_resp_indonesia",
      name: "Feline Respiratory Complex (FHV-1 + FCV — Indonesia High Prevalence)",
      species: ["cat"],
      category: "Internal Medicine / Respiratory / Infectious — Indonesia Common",
      signals: {
        complaints_sneezing: 9, complaints_nasal_discharge: 9, complaints_eye_discharge: 8,
        complaints_anorexia: 7, complaints_lethargy: 6, complaints_vomiting: 3,
        nose_serous_discharge: 7, nose_mucopurulent: 7,
        eyes_discharge_mucopurulent: 7, eyes_conjunctival_hyperemia: 8,
        temp_high: 7,
        hpi_onset_subacute: 7, hpi_onset_sudden: 5,
        vaccine_never: 8, vaccine_overdue: 6,
        age_kitten: 8, age_young: 6,
        env_contact_stray: 8, env_kennel: 7
      },
      tests: {
        tier1: ["Clinical diagnosis (history + signs often sufficient)","Conjunctival/oropharyngeal swab PCR (FHV-1, FCV, Chlamydophila, Bordetella)","CBC/Chemistry","Fluorescein dye test (corneal ulcer — FHV-1 dendritic ulcers)"],
        tier2: ["Ophthalmoscopy","Thoracic radiograph (pneumonia assessment)","Blood pressure"],
        tier3: ["Virus isolation","Paired serology"]
      },
      treatment: {
        medications: [
          "Supportive care is mainstay",
          "Lysine 250 mg/cat PO BID (FHV-1 — reduces viral shedding; evidence mixed but widely used)",
          "Famciclovir 90 mg/kg PO TID × 10–21 days (FHV-1 antiviral — more evidence than lysine)",
          "Antibiotics (secondary bacterial): Doxycycline 5 mg/kg PO BID × 10–14 days (Chlamydophila coverage)",
          "Amoxicillin-clavulanate 12.5 mg/kg PO BID (alternative secondary infection)",
          "Ophthalmic: Idoxuridine 0.1% drops q4h (FHV-1 corneal ulcer) or Cidofovir 0.5% drops BID",
          "Ophthalmic: Tobramycin/gentamicin drops q8h (secondary bacterial conjunctivitis)",
          "Maropitant 1 mg/kg SC SID (appetite stimulation + reduce nausea)",
          "Mirtazapine 1.8 mg/cat PO q48h (appetite stimulant)"
        ],
        procedures: ["Nebulization with 0.9% saline (loosen nasal secretions)","Warm food to enhance aroma (cats stop eating when they can't smell)","Nasal saline drops to clear discharge","Separate from other cats during acute illness"],
        diet: ["Warm wet food (highly palatable)","Ensure adequate caloric intake (syringe-feed if anorexic >48h)","Fresh water always available"]
      },
      education: {
        monitor: ["Sneezing and nasal discharge frequency/character","Eye discharge and cloudiness","Food and water intake","Body weight (weekly during illness)"],
        red_flags: ["Complete anorexia >48h (hepatic lipidosis risk in cats)","Respiratory distress or open-mouth breathing","Cloudy cornea or eye held shut (corneal ulcer)","High fever >40°C"],
        followup: "Recheck at 7–10 days; ophthalmology follow-up if corneal ulcer; FHV-1 carriers will have recurrence during stress — vaccinate and minimize stress triggers; FVRCP booster schedule",
        prognosis: "good"
      }
    },

    {
      id: "hot_spot_moist_dermatitis",
      name: "Hot Spot — Acute Moist Dermatitis (Pyotraumatic Dermatitis)",
      species: ["dog"],
      category: "Dermatology — Indonesia Common (High Humidity)",
      signals: {
        complaints_skin_lesions: 9, complaints_behavioral: 7,
        skin_erythema: 9, skin_crusts: 7, skin_pruritus: 9, skin_alopecia_focal: 7,
        hpi_onset_sudden: 9, hpi_progression_worsening: 8,
        env_outdoor: 5,
        breed_golden: 7, breed_labrador: 6, breed_german_shepherd: 5,
        breed_rottweiler: 5, breed_shar_pei: 5
      },
      contra_signals: { skin_alopecia_diffuse: -3, skin_oily: -2 },
      tests: {
        tier1: ["Clinical diagnosis (acute, painful, moist erythematous plaque under hair mat)","Cytology of exudate (Staph pseudintermedius, mixed organisms)","Skin scraping (rule out Demodex in recurrent cases)"],
        tier2: ["CBC if systemic signs (rare)","Flea combing (trigger identification)"],
        tier3: []
      },
      treatment: {
        medications: [
          "Clip fur 2–3 cm beyond lesion margin (critical for air exposure and treatment access)",
          "Flush with chlorhexidine 0.05% solution gently",
          "Topical: Spray-on 2% chlorhexidine + hydrocortisone (e.g. Cortavance) TID × 7–10 days",
          "Systemic antibiotic (if deep/refractory): Cephalexin 22 mg/kg PO BID × 7–14 days",
          "Anti-pruritic: Prednisolone 0.5–1 mg/kg PO SID × 3–5 days (break self-trauma cycle)",
          "Oclacitinib 0.4 mg/kg PO BID × 7 days (rapid itch relief without steroid side-effects)"
        ],
        procedures: ["E-collar mandatory (prevents licking/chewing lesion)","Keep lesion clean and DRY (Indonesia humidity — daily airing)","Identify and eliminate trigger (flea, ear infection, anal sacs, boredom)"],
        diet: ["Omega-3 fatty acid supplementation (skin barrier support)","High-quality protein diet"]
      },
      education: {
        monitor: ["Lesion size daily (should reduce from day 1–2)","Pruritus level","Self-trauma behavior","New lesion development (multi-focal hot spots)"],
        red_flags: ["Lesion expanding despite treatment (deep pyoderma or cellulitis)","Fever or spreading redness beyond lesion","Patient appears painful to touch around lesion (deep infection)"],
        followup: "Recheck at 7–10 days; E-collar until fully healed; identify recurrence trigger; flea prevention year-round in Indonesia",
        prognosis: "excellent"
      }
    },

    {
      id: "rat_poison_toxicosis",
      name: "Anticoagulant Rodenticide Toxicosis (Rat Poison — Indonesia Common)",
      species: ["dog","cat"],
      category: "Toxicology — Indonesia Common",
      emergency: true,
      signals: {
        complaints_bleeding: 10, complaints_lethargy: 8, complaints_collapse: 7,
        complaints_dyspnea: 7, complaints_anorexia: 6,
        history_toxin_ingestion: 9, hpi_onset_sudden: 8, hpi_onset_subacute: 6,
        mm_pale: 8,
        resp_muffled: 5, chest_accessory_muscles: 5,
        abdomen_fluid_wave: 5,
        attitude_dull: 7
      },
      tests: {
        tier1: ["PIVKA test (Proteins Induced by Vitamin K Absence — most sensitive)","PT (prolonged > 2–3× normal before bleeding starts)","aPTT","CBC: anemia, thrombocytopenia possible","Thoracic radiograph (pleural hemorrhage, pulmonary hemorrhage)"],
        tier2: ["Chemistry panel","Abdominal ultrasound (hemoperitoneum)","Specific rodenticide identification (if possible)","Rodenticide blood level (specialty lab)"],
        tier3: []
      },
      treatment: {
        medications: [
          "VITAMIN K1 (Phytonadione) — antidote and treatment:",
          "Initial: 2.5–5 mg/kg SC divided q8h × 24h (loading)",
          "Maintenance: 1.5–2.5 mg/kg PO BID with fatty meal × 4–6 weeks (brodifacoum/bromadiolone — long-acting)",
          "DO NOT use Vitamin K3 (menadione) — toxic to cats and dogs",
          "Fresh Frozen Plasma 10–15 mL/kg IV (active bleeding — replaces clotting factors immediately)",
          "Whole blood transfusion if severe hemorrhagic anemia",
          "Oxygen supplementation if respiratory distress (pleural hemorrhage)",
          "If recent ingestion (<2h, alert patient): Apomorphine 0.03 mg/kg IV (dogs) for emesis + activated charcoal 1–4 g/kg PO"
        ],
        procedures: ["IMMEDIATE hospitalization if bleeding signs","Minimize procedures — avoid all IM injections, venipuncture to minimum (bleeding risk)","Oxygen cage if pleural effusion/hemorrhage","Chest drain only if severe dyspnea from pleural hemorrhage","PT monitoring: check at 48h, 72h, then weekly during treatment"],
        diet: ["Give vitamin K1 tablets WITH fatty food (oil, butter) — absorption is fat-dependent","Avoid all activities that may cause injury during treatment"]
      },
      education: {
        monitor: ["Gum color (pale = internal hemorrhage)","Any external bleeding: nose, gums, in urine or feces","Breathing effort (chest hemorrhage)","Activity and appetite"],
        red_flags: ["Breathing difficulty (blood in chest — EMERGENCY thoracocentesis)","Sudden collapse","Blood from nose, gums, or in urine — active hemorrhage","PT prolonged even if no symptoms yet — MUST complete full 4–6 week Vit K1 course"],
        followup: "PT check at 48–72h; if normal, continue Vit K1 2 weeks minimum (long-acting rodenticides need 4–6 weeks); PT check 48h after stopping Vit K1 to confirm no rebound coagulopathy; secure all rat poisons from pet access",
        prognosis: "fair"
      }
    },

    {
      id: "organophosphate_toxicosis",
      name: "Organophosphate / Carbamate Toxicosis (Pesticide Poisoning)",
      species: ["dog","cat"],
      category: "Toxicology / Neurology — Indonesia Common",
      emergency: true,
      signals: {
        complaints_seizures: 8, complaints_vomiting: 8, complaints_collapse: 9,
        complaints_behavioral: 7, complaints_diarrhea: 7,
        hpi_onset_sudden: 10, history_toxin_ingestion: 9,
        neuro_seizure: 9, neuro_disoriented: 8, gait_ataxia: 7,
        mm_brick_red: 5, chest_accessory_muscles: 7,
        attitude_obtunded: 9, attitude_dull: 7
      },
      tests: {
        tier1: ["Clinical diagnosis: SLUD signs (Salivation, Lacrimation, Urination, Defecation) + miosis + muscle tremors","RBC acetylcholinesterase activity (confirm OP — reduced <50% of normal)","CBC/Chemistry","Blood glucose (hypoglycemia from seizures)"],
        tier2: ["Blood gas (respiratory acidosis)","ECG (arrhythmias)","Urine screen for pesticides"],
        tier3: ["Specific OP identification"]
      },
      treatment: {
        medications: [
          "ATROPINE — antidote: 0.2–0.5 mg/kg IV/IM (give ¼ dose IV, ¾ IM)",
          "Titrate to effect: reduce salivation, bronchospasm, bradycardia — NOT pupil dilation",
          "Repeat atropine q5–10 min until secretions dry — may need very large cumulative doses",
          "Pralidoxime (2-PAM) 20–50 mg/kg IV/IM q4h × 24–48h (reactivates AChE — give within 24h of OP exposure; NOT effective for carbamates)",
          "Diazepam 0.5 mg/kg IV for seizure control",
          "Phenobarbital 2–5 mg/kg IV (refractory seizures)",
          "IV fluid therapy (LRS) — rehydration + support",
          "Do NOT use succinylcholine (OP potentiates neuromuscular blockade)"
        ],
        procedures: ["IMMEDIATE decontamination: full body wash with soap and water (wear gloves — dermal exposure risk to handlers)","Activated charcoal 1–4 g/kg PO if recent oral ingestion and patient can swallow","Emesis only if VERY recent ingestion and patient fully alert (OP — seizures may develop rapidly)","O2 supplementation — respiratory failure possible","ICU: monitor q30 min for respiratory arrest"],
        diet: ["NPO until stable","Gradual reintroduction of food when vomiting controlled"]
      },
      education: {
        monitor: ["Salivation, lacrimation, muscle tremors","Breathing effort and rate","Pupil size (miosis = ongoing cholinergic toxidrome)","Seizure activity"],
        red_flags: ["Respiratory arrest — most common cause of death in OP poisoning","Status epilepticus","Weakness rapidly progressing to paralysis","Any re-exposure to pesticides"],
        followup: "Monitor for rebound cholinergic signs 24–48h after initial stabilization; confirm source of exposure and secure chemicals; periodic AChE activity testing if ongoing sub-lethal exposure suspected",
        prognosis: "guarded"
      }
    },

    {
      id: "skin_allergy_food",
      name: "Food Allergy Dermatitis (Cutaneous Adverse Food Reaction)",
      species: ["dog","cat"],
      category: "Dermatology / Immunology",
      signals: {
        complaints_skin_lesions: 8, complaints_hair_loss: 5, complaints_ear_problems: 7,
        skin_pruritus: 9, skin_erythema: 7, skin_papules: 6, skin_alopecia_focal: 5,
        ears_erythema: 7, ears_pruritus: 6, ears_discharge_brown: 5,
        hpi_progression_fluctuating: 6, hpi_onset_chronic: 7,
        chronic_condition_allergies: 6,
        complaints_diarrhea: 5, complaints_vomiting: 4
      },
      contra_signals: { parasites_fleas: -3, skin_crusts: -1 },
      tests: {
        tier1: ["Skin cytology (rule out secondary infection)","Strict elimination diet trial × 8–12 weeks (ONLY DIAGNOSTIC TEST — serology/intradermal not accurate)","Skin scraping (Demodex)","Flea combing (concurrent FAD)"],
        tier2: ["CBC/Chemistry","Skin biopsy (if diagnosis unclear)","Oral provocation challenge (re-introduce original diet to confirm)"],
        tier3: ["Referral to dermatologist","Novel protein/hydrolyzed diet assessment"]
      },
      treatment: {
        medications: [
          "DIET is treatment — Strict hydrolyzed or novel protein diet × minimum 8–12 weeks",
          "NO treats, flavored medications, or chews during trial (strict compliance essential)",
          "Novel protein options: kangaroo, crocodile, venison, rabbit, insect-based (ingredients patient has NEVER eaten)",
          "During trial only: Oclacitinib 0.4–0.6 mg/kg PO BID × 14d then SID (relieve pruritus without steroid side-effects)",
          "Treat secondary pyoderma: Cephalexin 22 mg/kg PO BID × 3–4 weeks",
          "Treat secondary Malassezia: Ketoconazole 5 mg/kg PO SID × 4 weeks"
        ],
        procedures: ["ALL family members must follow strict diet — educate thoroughly","Medicated shampoo q7–14d","Ear cleaning and ear cytology","Address concurrent ectoparasites"],
        diet: ["Strict hydrolyzed protein or novel protein prescription diet × 8–12 weeks for DIAGNOSIS","If positive: maintain hypoallergenic diet lifelong","If negative: try another novel protein, OR consider environmental atopy"]
      },
      education: {
        monitor: ["Pruritus score weekly (0–10 scale)","Lesion improvement (expect no response until 6–8 weeks on strict diet)","GI signs (food allergy can cause concurrent GI disease)","Any potential dietary cheating"],
        red_flags: ["Pruritus completely unresponsive after 12 weeks strict diet — reconsider diagnosis","Rapid relapse after introducing single ingredient — confirms food allergy to that ingredient","Worsening GI signs during diet trial"],
        followup: "Assessment at 4, 8, 12 weeks on elimination diet; oral challenge if improved to confirm; develop long-term maintenance hypoallergenic diet; annual recheck",
        prognosis: "good"
      }
    },


    // ═══════════════════════════ DERMATOLOGY EXPANDED ═══════════════════════

    {
      id: "contact_dermatitis",
      name: "Contact Dermatitis",
      species: ["dog","cat"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 9, skin_erythema: 8, skin_pruritus: 7,
        skin_papules: 6, hpi_onset_sudden: 7, env_outdoor: 5,
        complaints_behavioral: 4, hpi_progression_worsening: 5,
        age_young: 2, env_indoor: 3
      },
      tests: {
        tier1: ["Skin cytology","Tape prep","Physical exam — lesion distribution mapping"],
        tier2: ["Patch test with suspected allergens","Elimination of suspected contact agent","Skin scraping (rule out parasites)"],
        tier3: ["Biopsy — spongiotic dermatitis pattern","Referral: veterinary dermatologist"]
      },
      treatment: {
        medications: ["Prednisolone 0.5–1 mg/kg PO SID × 5–7d taper","Chlorpheniramine 0.4 mg/kg PO BID (cat)","Cetirizine 5–10 mg PO SID (dog)","Topical hydrocortisone 1% cream BID × 7d"],
        procedures: ["Remove/eliminate contact allergen","Rinse affected area thoroughly with water","Elizabethan collar to prevent licking"],
        diet: ["No specific dietary change unless food component suspected"]
      },
      education: {
        monitor: ["Lesion resolution within 3–5d of allergen removal","Pruritus score","Relapse if re-exposed"],
        red_flags: ["Lesions spreading beyond contact areas","Secondary bacterial infection","Anaphylactic signs (rare)"],
        followup: "Recheck in 7d; if recurrent — identify and permanently remove allergen",
        prognosis: "excellent"
      }
    },

    {
      id: "sebaceous_adenitis",
      name: "Sebaceous Adenitis",
      species: ["dog"],
      category: "Dermatology",
      signals: {
        complaints_hair_loss: 9, complaints_skin_lesions: 7, skin_alopecia_diffuse: 8,
        skin_dry: 8, skin_poor_coat: 7, skin_crusts: 6,
        breed_poodle: 7, breed_akita: 6, breed_samoyed: 5,
        age_middle: 5, hpi_onset_chronic: 6
      },
      tests: {
        tier1: ["Skin biopsy (punch biopsy) — DIAGNOSTIC; shows granulomatous destruction of sebaceous glands","Coat and skin examination"],
        tier2: ["Thyroid panel (rule out hypothyroidism)","Skin cytology (secondary infection)"],
        tier3: ["Immunohistochemistry if inconclusive"]
      },
      treatment: {
        medications: ["Cyclosporine 5 mg/kg PO SID × 6 weeks then taper","Essential fatty acids EPA/DHA 30–40 mg/kg/day","Vitamin A 10,000 IU PO SID (Poodles)","Topical propylene glycol 50–75% spray SID"],
        procedures: ["Oil soaks (baby oil) × 1–2hr before bathing weekly","Antibacterial shampoo for secondary pyoderma","Humectant conditioner after each bath"],
        diet: ["High-quality diet with omega-3 supplementation"]
      },
      education: {
        monitor: ["Hair regrowth (partial in many cases)","Coat quality","Recurrence of scaling"],
        red_flags: ["Progressive worsening despite therapy","Widespread pyoderma"],
        followup: "Recheck at 6–8 weeks; long-term management required; genetic condition — advise against breeding",
        prognosis: "fair"
      }
    },

    {
      id: "zinc_responsive_dermatosis",
      name: "Zinc-Responsive Dermatosis",
      species: ["dog"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 8, skin_crusts: 9, skin_alopecia_focal: 6,
        skin_erythema: 5, complaints_hair_loss: 6,
        breed_siberian_husky: 8, breed_alaskan_malamute: 7,
        age_young: 6, bcs_thin: 4, hpi_onset_subacute: 5
      },
      tests: {
        tier1: ["Skin biopsy — parakeratotic hyperkeratosis pattern","CBC/chemistry panel","Serum zinc level"],
        tier2: ["Diet history review","Zinc absorption test"],
        tier3: ["Genetic testing for zinc absorption defect (Syndrome I)"]
      },
      treatment: {
        medications: ["Zinc sulfate 10 mg/kg PO SID with food (Syndrome I lifelong)","Zinc methionine 2 mg/kg PO SID (alternative, better tolerated)","Prednisolone 0.5 mg/kg SID short-term (Syndrome II)"],
        procedures: ["Remove any phytate-high diet (soy, cereal-based)","Soak crusts with warm water before grooming"],
        diet: ["High-quality meat-based diet (reduce phytates)","No excessive calcium or iron supplementation (inhibit Zn absorption)"]
      },
      education: {
        monitor: ["Crust resolution within 2–4 weeks","Return of normal coat","Syndrome I: lifelong zinc supplementation required"],
        red_flags: ["Vomiting from zinc supplementation — reduce dose or switch form","Lesions recur off supplementation"],
        followup: "Recheck 4 weeks; Syndrome I is lifelong — do not discontinue supplementation",
        prognosis: "good"
      }
    },

    {
      id: "calcinosis_cutis",
      name: "Calcinosis Cutis (Dystrophic / Iatrogenic)",
      species: ["dog","cat"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 8, skin_crusts: 8, skin_papules: 6,
        skin_erythema: 5, hpi_onset_chronic: 6,
        chronic_condition_diabetes: 4
      },
      contra_signals: { skin_pruritus: -2 },
      tests: {
        tier1: ["Skin biopsy — calcium deposits in dermis (Von Kossa stain)","Cortisol level (LDDS, HDDS, ACTH stim)","Chemistry panel including calcium/phosphorus"],
        tier2: ["Abdominal ultrasound (adrenal glands)","Urine cortisol:creatinine ratio"],
        tier3: ["CT/MRI of pituitary if PDH suspected"]
      },
      treatment: {
        medications: ["Treat underlying hyperadrenocorticism (Trilostane 2–5 mg/kg PO BID)","DMSO gel topical (dimethyl sulfoxide) BID — dissolves calcium deposits","Anti-itch: Oclacitinib if pruritic"],
        procedures: ["Surgical excision of large plaques (selected cases)","Wound care for ulcerated lesions","Elizabethan collar"],
        diet: ["Low-calcium diet not indicated unless hypercalcemic"]
      },
      education: {
        monitor: ["Plaque size and number","Cushing's control (if applicable)","Infection in ulcerated areas"],
        red_flags: ["Rapidly expanding plaques","Deep bacterial infection","Concurrent systemic hypercalcemia"],
        followup: "Recheck 4–6 weeks; resolution may take months after Cushing's controlled",
        prognosis: "fair"
      }
    },

    {
      id: "chin_acne_dog",
      name: "Canine Chin Acne / Muzzle Folliculitis",
      species: ["dog"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 8, skin_papules: 8, skin_pustules: 7,
        skin_erythema: 6, age_young: 7, hpi_onset_subacute: 5,
        breed_bulldog: 5, breed_boxer: 5, breed_rottweiler: 4
      },
      tests: {
        tier1: ["Skin cytology from pustules","Skin scraping (rule out Demodex)","Wood's lamp + fungal culture (rule out dermatophytosis)"],
        tier2: ["Bacterial culture & sensitivity (recurrent cases)"],
        tier3: ["Biopsy if non-responsive"]
      },
      treatment: {
        medications: ["Benzoyl peroxide 2.5% gel topical BID × 3–4 weeks","Chlorhexidine 4% scrub SID × 2 weeks","Mupirocin ointment topical BID if superficial","Systemic antibiotics if deep: Cephalexin 22 mg/kg PO BID × 4 weeks"],
        procedures: ["Gentle cleansing — avoid trauma/squeezing","Elizabethan collar to prevent rubbing","Plastic bowls → switch to stainless steel (reduces bacteria)"],
        diet: ["No specific dietary restriction required"]
      },
      education: {
        monitor: ["Resolution of papules/pustules","Scarring after healing","Recurrence (common in short-muzzled breeds)"],
        red_flags: ["Deep furunculosis (swollen, painful nodules)","Not responding to 4 weeks therapy — culture & sensitivity","Spreading to neck or chest"],
        followup: "Recheck in 3–4 weeks; may need long-term maintenance with benzoyl peroxide",
        prognosis: "good"
      }
    },

    {
      id: "feline_acne",
      name: "Feline Chin Acne",
      species: ["cat"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 8, skin_papules: 8, skin_crusts: 7,
        skin_erythema: 5, age_middle: 4, hpi_onset_chronic: 5,
        complaints_behavioral: 3
      },
      tests: {
        tier1: ["Skin cytology","Skin scraping (Demodex gatoi)","Fungal culture / Wood's lamp"],
        tier2: ["Culture & sensitivity (recurrent/resistant)"],
        tier3: ["Biopsy if atypical presentation"]
      },
      treatment: {
        medications: ["Chlorhexidine 2% wipes or gel BID × 3–4 weeks","Mupirocin ointment if superficial infection","Doxycycline 5 mg/kg PO BID × 3–4 weeks (moderate–severe)","Triamcinolone 0.1% cream BID × 5–7d (if inflammatory)"],
        procedures: ["Switch plastic bowl to ceramic/stainless","Gentle warm compress SID","Do NOT squeeze/pop lesions"],
        diet: ["No dietary change unless food allergy suspected"]
      },
      education: {
        monitor: ["Lesion resolution","Secondary swelling/pain (furunculosis)","Bowl material management"],
        red_flags: ["Swelling, pain, bleeding from chin lesions","Non-responsive to 4 weeks treatment"],
        followup: "Recheck 3–4 weeks; recurrence common — hygiene management key",
        prognosis: "good"
      }
    },

    {
      id: "drug_eruption",
      name: "Cutaneous Drug Eruption (Adverse Drug Reaction)",
      species: ["dog","cat"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 9, skin_erythema: 8, skin_papules: 7,
        hpi_onset_sudden: 8, complaints_behavioral: 4,
        attitude_dull: 3, temp_high: 4, mm_pale: 3
      },
      tests: {
        tier1: ["Skin cytology","CBC/chemistry — systemic involvement","Drug exposure history"],
        tier2: ["Skin biopsy — interface dermatitis, eosinophilic infiltrate","Rechallenge (NOT recommended — dangerous)","Intradermal test (specialist only)"],
        tier3: ["Referral: veterinary dermatologist"]
      },
      treatment: {
        medications: ["STOP offending drug IMMEDIATELY","Prednisolone 1–2 mg/kg PO SID × 5–10d (moderate-severe)","Diphenhydramine 2 mg/kg IM or SC (acute urticarial)","Epinephrine 0.01 mg/kg SC/IM if anaphylaxis","Supportive IV fluids if systemic signs"],
        procedures: ["Document drug name, dose, timing of reaction — add to patient record","Monitor for systemic signs for 24–48 hours"],
        diet: ["Supportive nutritional care during recovery"]
      },
      education: {
        monitor: ["Lesion resolution (days to weeks)","Systemic signs (fever, lethargy)","Mucous membrane involvement (erythema multiforme)"],
        red_flags: ["Mucosal erosions/ulcers (Stevens-Johnson syndrome)","Sloughing skin (toxic epidermal necrolysis) — CRITICAL emergency","Fever + pancytopenia"],
        followup: "Recheck in 5–7 days; permanently blacklist causative drug in patient record",
        prognosis: "fair"
      }
    },

    {
      id: "pemphigus_foliaceus",
      name: "Pemphigus Foliaceus",
      species: ["dog","cat"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 9, skin_pustules: 9, skin_crusts: 9,
        skin_erythema: 7, skin_alopecia_focal: 6,
        complaints_lethargy: 4, temp_high: 4, age_middle: 5,
        hpi_onset_subacute: 6, breed_cocker: 5, breed_akita: 5
      },
      tests: {
        tier1: ["Skin cytology of intact pustules — acantholytic cells (DIAGNOSTIC)","Skin biopsy — subcorneal pustules with acantholytic cells","CBC/chemistry"],
        tier2: ["ANA titer (rule out lupus)","Culture to exclude bacterial pyoderma"],
        tier3: ["Immunofluorescence/IHC on biopsy","Referral: dermatologist"]
      },
      treatment: {
        medications: ["Prednisolone 2–3 mg/kg PO SID induction × 4–6 weeks, then taper","Azathioprine 2 mg/kg PO SID (dog) — do NOT use in cats","Chlorambucil 0.1–0.2 mg/kg PO SID (cat — preferred cytotoxic)","Tetracycline + niacinamide (mild cases: 250–500 mg each PO TID)"],
        procedures: ["Treat secondary bacterial infection","Gentle bathing with antibacterial shampoo","Regular CBC monitoring q2–4 weeks (immunosuppression)"],
        diet: ["High-protein diet to offset steroid catabolism"]
      },
      education: {
        monitor: ["Pustule/crust recurrence","CBC for bone marrow suppression","Glucose (steroid-induced diabetes)","Body weight"],
        red_flags: ["Widespread skin erosions","Fever + systemically ill","Signs of immunosuppression (infections)"],
        followup: "Recheck 2–4 weeks; lifelong immunosuppression typically required; do not abruptly stop",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ OPHTHALMOLOGY ═══════════════════════════════

    {
      id: "conjunctivitis",
      name: "Conjunctivitis",
      species: ["dog","cat"],
      category: "Ophthalmology",
      signals: {
        complaints_eye_discharge: 9, eyes_discharge_mucopurulent: 8,
        eyes_discharge_serous: 7, eyes_conjunctival_hyperemia: 9,
        complaints_behavioral: 4, skin_erythema: 3,
        hpi_onset_subacute: 5, env_contact_stray: 4
      },
      tests: {
        tier1: ["Fluorescein stain (rule out corneal ulcer)","Schirmer tear test","Ophthalmic examination with focal light"],
        tier2: ["Conjunctival cytology","Bacterial culture & sensitivity","FHV-1 PCR (cat — herpesvirus)","Chlamydophila felis PCR (cat)"],
        tier3: ["Referral: veterinary ophthalmologist for chronic/recurrent cases"]
      },
      treatment: {
        medications: ["Neomycin/polymyxin/bacitracin ophthalmic ointment TID × 7–10d (bacterial)","Tobramycin 0.3% ophthalmic drops TID × 7–10d","Famciclovir 15–40 mg/kg PO BID (FHV-1 cat)","Doxycycline 5 mg/kg PO BID × 28d (Chlamydophila)","Topical cyclosporine 0.2% ointment BID (KCS-related)"],
        procedures: ["Gentle cleaning of discharge with sterile saline","Warm compress SID","E-collar to prevent rubbing"],
        diet: ["L-lysine supplementation 250–500 mg SID (FHV-1 cat — evidence limited but commonly used)"]
      },
      education: {
        monitor: ["Discharge volume and character","Eye redness resolution","Corneal clarity","Schirmer tear values (KCS)"],
        red_flags: ["Corneal cloudiness or blue tinge","Eye pain (blepharospasm, squinting)","Vision loss","Rapid worsening"],
        followup: "Recheck in 7–10d; persistent cases — culture & sensitivity; FHV-1 may require long-term antiviral",
        prognosis: "good"
      }
    },

    {
      id: "corneal_ulcer",
      name: "Corneal Ulcer (Superficial to Stromal)",
      species: ["dog","cat"],
      category: "Ophthalmology",
      emergency: true,
      signals: {
        complaints_eye_discharge: 8, eyes_conjunctival_hyperemia: 9,
        eyes_discharge_mucopurulent: 7, complaints_behavioral: 7,
        hpi_onset_sudden: 7, complaints_trauma: 6,
        age_young: 3, breed_bulldog: 6, breed_shih_tzu: 5, breed_pug: 6
      },
      tests: {
        tier1: ["Fluorescein stain — DIAGNOSTIC (positive uptake)","Schirmer tear test","Ophthalmic exam — depth assessment"],
        tier2: ["Culture & sensitivity (suppurative/melting ulcer)","Cytology of corneal scraping","IOP measurement (rule out glaucoma)"],
        tier3: ["Referral: veterinary ophthalmologist (deep stromal, descemetocele, melting)"]
      },
      treatment: {
        medications: ["Tobramycin 0.3% ophthalmic drops q4–6h (superficial)","Ciprofloxacin 0.3% ophthalmic drops q4–6h (deep/infected)","Atropine 1% ophthalmic drops BID (uveitis, spasm)","Serum/EDTA drops q1–2h (collagenase inhibitor — melting ulcer)","AVOID topical steroids — contraindicated with ulceration"],
        procedures: ["E-collar mandatory","Superficial indolent ulcer: diamond burr debridement or grid keratotomy","Deep stromal/descemetocele: refer for surgical repair (conjunctival flap, keratectomy)"],
        diet: ["Vitamin A supplementation (support healing)"]
      },
      education: {
        monitor: ["Fluorescein stain recheck every 48–72h","Pain level (blepharospasm)","Corneal clarity","Discharge"],
        red_flags: ["Corneal perforation — emergency surgery","Melting/yellow discharge — emergency referral","Vision loss","Hypopyon (pus in anterior chamber)"],
        followup: "Recheck every 48–72h until healed; brachycephalic breeds: discuss entropion, lagophthalmos if recurrent",
        prognosis: "fair"
      }
    },

    {
      id: "uveitis",
      name: "Uveitis (Anterior / Panuveitis)",
      species: ["dog","cat"],
      category: "Ophthalmology",
      emergency: true,
      signals: {
        complaints_eye_discharge: 7, eyes_conjunctival_hyperemia: 8,
        complaints_behavioral: 6, complaints_lethargy: 4,
        hpi_onset_subacute: 5, temp_high: 4,
        env_outdoor: 4, env_endemic_area: 5
      },
      tests: {
        tier1: ["Fluorescein stain","IOP measurement (hypotony)","Ophthalmic exam (flare, miosis, keratic precipitates)"],
        tier2: ["CBC/chemistry","Leptospira serology","FeLV/FIV (cat)","Brucella serology (dog)","Tick-borne panel (Ehrlichia, Rickettsia)","Fungal titers (Cryptococcus, Aspergillus)"],
        tier3: ["Ultrasound (vitreous/retinal detachment)","Aqueous humor tap cytology","Referral: ophthalmologist"]
      },
      treatment: {
        medications: ["Prednisolone acetate 1% ophthalmic drops q4–6h (topical)","Atropine 1% ophthalmic drops BID–TID (cycloplegia, prevent synechia)","Systemic prednisolone 0.5–1 mg/kg PO SID (panuveitis)","Treat underlying cause (antibiotics, antifungals as appropriate)","Flurbiprofen 0.03% ophthalmic drops q8h (alternative NSAID)"],
        procedures: ["Sedation/pain management if severe","Referral if no improvement in 48–72h"],
        diet: ["No specific dietary restriction"]
      },
      education: {
        monitor: ["IOP (glaucoma risk)","Vision","Inflammation resolution","Systemic disease response"],
        red_flags: ["Rising IOP > 25 mmHg (secondary glaucoma)","Retinal detachment (sudden blindness)","Persistent pain"],
        followup: "Recheck every 3–5d initially; investigate systemic cause urgently — ERU in horses, lens-induced in dogs",
        prognosis: "guarded"
      }
    },

    {
      id: "cataracts",
      name: "Cataracts",
      species: ["dog","cat"],
      category: "Ophthalmology",
      signals: {
        complaints_behavioral: 7, complaints_eye_discharge: 4,
        eyes_discharge_serous: 3, age_old: 6, age_middle: 4,
        chronic_condition_diabetes: 8, breed_labrador: 5, breed_golden: 5,
        breed_poodle: 5, hpi_onset_chronic: 6
      },
      tests: {
        tier1: ["Ophthalmic exam — lenticular opacity","Menace response, PLR assessment","Schirmer tear test"],
        tier2: ["ERG (electroretinogram) — pre-surgical retinal function","Ocular ultrasound (retinal detachment)","Blood glucose (diabetic cataracts)"],
        tier3: ["Referral: veterinary ophthalmologist for phacoemulsification (surgery)"]
      },
      treatment: {
        medications: ["Diabetic cataracts: insulin therapy (treat DM)","Anti-inflammatory post-op: Diclofenac 0.1% drops BID","Dorzolamide/timolol drops if secondary glaucoma"],
        procedures: ["Phacoemulsification (surgical removal) — gold standard","Intraocular lens (IOL) implant","Pre-op ERG to confirm retinal function"],
        diet: ["Diabetic cataracts: strict diabetic diet management"]
      },
      education: {
        monitor: ["Vision assessment","Signs of glaucoma (increased IOP, cloudiness, pain)","Post-surgical inflammation"],
        red_flags: ["Sudden onset blindness with pain — lens luxation or glaucoma","Rapidly maturing cataract (diabetic)","Post-op uveitis"],
        followup: "Refer to ophthalmologist for surgical workup; post-op monitoring at 1d, 1w, 1m, then annually",
        prognosis: "good"
      }
    },

    {
      id: "glaucoma",
      name: "Glaucoma",
      species: ["dog","cat"],
      category: "Ophthalmology",
      emergency: true,
      signals: {
        complaints_eye_discharge: 6, complaints_behavioral: 8,
        eyes_conjunctival_hyperemia: 7, hpi_onset_sudden: 7,
        age_middle: 5, age_old: 6,
        breed_cocker: 6, breed_chow_chow: 5, breed_basset: 5
      },
      tests: {
        tier1: ["IOP measurement — >25 mmHg (dog), >27 mmHg (cat) DIAGNOSTIC","Fluorescein stain (rule out ulcer)","Menace response, PLR"],
        tier2: ["Gonioscopy (drainage angle)","Ocular ultrasound","ERG (pre-referral)"],
        tier3: ["Referral: veterinary ophthalmologist — cyclophotocoagulation, drainage implants"]
      },
      treatment: {
        medications: ["Mannitol 1–2 g/kg IV over 15–20 min (acute emergency)","Dorzolamide 2% drops TID (CA inhibitor)","Latanoprost 0.005% drops SID–BID (prostaglandin — contraindicated in cats)","Timolol 0.5% drops BID","Oral methazolamide 2–5 mg/kg PO BID (adjunct)"],
        procedures: ["Immediate referral for acute glaucoma","Contralateral prophylactic treatment","Enucleation if blind + painful (end-stage)"],
        diet: ["No specific diet — hydration maintenance important"]
      },
      education: {
        monitor: ["IOP at every recheck","Vision status","Pain level","Corneal edema"],
        red_flags: ["IOP >50 mmHg — emergency","Blindness within 24–72h if untreated","Corneal edema, globe enlargement (buphthalmos)"],
        followup: "Immediate referral; IOP recheck within 24h of treatment; lifelong management required",
        prognosis: "guarded"
      }
    },

    {
      id: "entropion",
      name: "Entropion",
      species: ["dog","cat"],
      category: "Ophthalmology",
      signals: {
        complaints_eye_discharge: 8, eyes_discharge_mucopurulent: 7,
        eyes_conjunctival_hyperemia: 7, complaints_behavioral: 6,
        age_young: 5, breed_shar_pei: 9, breed_chow_chow: 7,
        breed_bulldog: 6, breed_rottweiler: 5, breed_great_dane: 5
      },
      tests: {
        tier1: ["Ophthalmic exam — eyelid inversion observed","Fluorescein stain (corneal ulceration from trichiasis)","Schirmer tear test"],
        tier2: ["Culture (secondary infection)"],
        tier3: ["Referral: veterinary ophthalmologist for surgical correction"]
      },
      treatment: {
        medications: ["Tobramycin 0.3% drops TID (secondary infection)","Lubricating eye drops q4–6h (until surgery)","Atropine 1% drops BID if corneal ulcer present"],
        procedures: ["Surgical correction — Hotz-Celsus technique (definitive)","Temporary eversion sutures (puppies — wait for facial maturity)","Medical palliation until surgery"],
        diet: ["No dietary restrictions"]
      },
      education: {
        monitor: ["Corneal health (ulceration risk)","Discharge and pain","Post-surgical healing"],
        red_flags: ["Corneal ulcer progression","Perforation risk","Pigmentary keratitis (chronic cases)"],
        followup: "Schedule surgical consultation; do not delay — chronic entropion causes permanent corneal scarring",
        prognosis: "excellent"
      }
    },

    {
      id: "dry_eye_kcs",
      name: "Keratoconjunctivitis Sicca (KCS / Dry Eye)",
      species: ["dog","cat"],
      category: "Ophthalmology",
      signals: {
        complaints_eye_discharge: 8, eyes_discharge_mucopurulent: 9,
        eyes_conjunctival_hyperemia: 7, complaints_behavioral: 5,
        hpi_onset_chronic: 7, breed_cocker: 7, breed_bulldog: 6,
        breed_shih_tzu: 6, breed_pug: 5, breed_west_highland: 5
      },
      tests: {
        tier1: ["Schirmer Tear Test — <15 mm/min dog (normal), <10 mm/min diagnostic for KCS","Fluorescein stain — corneal surface staining pattern","Ophthalmic exam"],
        tier2: ["Culture for secondary infection","Rose bengal stain (mucin deficiency)"],
        tier3: ["Referral: ophthalmologist if STT <5 mm/min or non-responsive"]
      },
      treatment: {
        medications: ["Cyclosporine 0.2% ophthalmic ointment BID — lifelong (stimulates tear production)","Tacrolimus 0.02–0.03% ophthalmic drops BID (cyclosporine-resistant)","Artificial tears q4–6h","Hyaluronic acid lubricant drops q4–6h","Topical antibiotic (tobramycin) if secondary infection"],
        procedures: ["Parotid duct transposition (PDT) — severe non-responsive cases","Warm compress and gentle ocular hygiene SID"],
        diet: ["Omega-3 fatty acid supplementation (EPA/DHA 30–40 mg/kg/day)"]
      },
      education: {
        monitor: ["STT values at each recheck","Discharge quality/quantity","Corneal pigmentation","Compliance with medication"],
        red_flags: ["STT = 0 — neurogenic KCS","Corneal ulceration","Pigmentary keratitis leading to blindness"],
        followup: "STT recheck at 4–6 weeks; lifelong cyclosporine; STT <15 mm/min = continue therapy indefinitely",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ DENTAL / ORAL ═══════════════════════════════

    {
      id: "periodontal_disease",
      name: "Periodontal Disease (Gingivitis / Periodontitis)",
      species: ["dog","cat"],
      category: "Dental / Oral",
      signals: {
        complaints_anorexia: 5, complaints_weight_loss: 4, complaints_behavioral: 6,
        complaints_swelling_mass: 4, age_old: 6, age_middle: 5,
        breed_small: 5, breed_yorkshire: 6, breed_chihuahua: 5,
        breed_pomeranian: 5, chronic_condition_diabetes: 4
      },
      tests: {
        tier1: ["Oral examination (conscious — grade gingivitis)","Dental probing under anesthesia","Full-mouth dental radiographs (gold standard)"],
        tier2: ["CBC/chemistry pre-anesthesia","Urinalysis (renal effects from bacteremia)"],
        tier3: ["Advanced dental CT (severe cases)","Referral: veterinary dentist"]
      },
      treatment: {
        medications: ["Amoxicillin-clavulanate 12.5–25 mg/kg PO BID × 7–10d (pre/post dental)","Doxycycline 5 mg/kg PO SID × 4 weeks (adjunct, anti-resorptive)","Chlorhexidine 0.12% rinse or gel BID","Meloxicam 0.1 mg/kg PO SID × 3–5d (post-dental pain)"],
        procedures: ["Professional dental scaling and polishing (COHAT)","Tooth extractions as needed","Root planing under GA","Chlorhexidine gel application"],
        diet: ["Dental prescription diet (Hills t/d, Royal Canin Dental)","Raw carrot / dental chews","Avoid sugary treats"]
      },
      education: {
        monitor: ["Home dental brushing compliance","Halitosis recurrence","Eating behavior","Annual dental exam"],
        red_flags: ["Drooling blood","Not eating","Oronasal fistula (hole between mouth and nose)","Jaw fracture (advanced bone loss)"],
        followup: "COHAT recommended annually; daily tooth brushing is gold standard; grade 3–4: 6-month recheck",
        prognosis: "good"
      }
    },

    {
      id: "stomatitis_cat",
      name: "Feline Chronic Gingivostomatitis (FCGS)",
      species: ["cat"],
      category: "Dental / Oral",
      signals: {
        complaints_anorexia: 8, complaints_weight_loss: 7, complaints_behavioral: 8,
        complaints_dysphagia: 7, complaints_drooling: 7,
        age_middle: 5, felv_fiv_positive: 7,
        hpi_onset_chronic: 7, hpi_progression_worsening: 6
      },
      tests: {
        tier1: ["Oral examination under sedation/GA — caudal stomatitis (DIAGNOSTIC)","FeLV/FIV testing","Dental radiographs (retained roots, resorption)"],
        tier2: ["CBC/chemistry/serum protein","Biopsy (oral tissue) — plasma cell infiltrate","Calicivirus/Herpesvirus PCR (oral swab)"],
        tier3: ["Referral: veterinary dentist","Immunomodulatory workup"]
      },
      treatment: {
        medications: ["Prednisolone 1–2 mg/kg PO SID × 4–6 weeks then taper (palliative — not curative)","Cyclosporine 5–7 mg/kg PO SID (immunomodulation)","Buprenorphine 0.01–0.02 mg/kg buccal q6–8h (pain)","Antibiotics: Amoxicillin-clavulanate 12.5 mg/kg PO BID × 14d (secondary infection)","Interferon omega 1 MU SID (immunomodulatory — variable response)"],
        procedures: ["Full-mouth extraction (FME) — TREATMENT OF CHOICE (>60% achieve remission)","COHAT + partial extraction if FME declined","CO2 laser ablation (adjunct)"],
        diet: ["Liquid/slurry diet until pain managed","Elevated food bowl","High-calorie enteral feeding if anorexic"]
      },
      education: {
        monitor: ["Pain level and eating behavior","Weight","Post-extraction healing (6–8 weeks)","Response to immunosuppression"],
        red_flags: ["Not eating for >3 days","Weight loss >10%","Severe drooling with bloody saliva"],
        followup: "Post-FME recheck 2 weeks, 6 weeks, 6 months; 60% improve with full extraction, 20% need additional medical management",
        prognosis: "fair"
      }
    },

    {
      id: "oral_mass_dog",
      name: "Oral Neoplasia (Dog)",
      species: ["dog"],
      category: "Dental / Oral / Oncology",
      signals: {
        complaints_swelling_mass: 9, complaints_anorexia: 7,
        complaints_weight_loss: 6, complaints_behavioral: 7,
        complaints_bleeding: 5, age_old: 7, age_middle: 5,
        breed_german_shepherd: 4, breed_golden: 4,
        hpi_onset_subacute: 5, hpi_progression_worsening: 6
      },
      tests: {
        tier1: ["Oral exam under sedation","Incisional biopsy — ESSENTIAL for histopathology","Dental radiographs (bone invasion)"],
        tier2: ["Thoracic radiographs (3 views — metastasis)","CT scan of skull and neck (staging)","Regional lymph node aspirate/biopsy"],
        tier3: ["MRI (soft tissue extension)","Referral: veterinary oncologist"]
      },
      treatment: {
        medications: ["Meloxicam 0.1 mg/kg PO SID (anti-inflammatory/analgesic — Piroxicam alternative for antitumor effect)","Pain: Tramadol 2–5 mg/kg PO BID-TID","Chemotherapy per oncologist protocol"],
        procedures: ["Surgical resection (mandibulectomy/maxillectomy — curative intent if no metastasis)","Radiation therapy (acanthomatous epulis — very responsive)","Chemotherapy (melanoma: carboplatin/cisplatin)"],
        diet: ["High-protein, calorie-dense diet","Softened food if jaw surgery","Nutritional support (syringe feeding if needed)"]
      },
      education: {
        monitor: ["Eating and weight","Tumor recurrence at surgical site","Lymph node size","Thoracic metastasis signs"],
        red_flags: ["Rapid growth","Bone invasion on radiograph","Lymph node enlargement","Dysphagia worsening"],
        followup: "Oncology referral for staging and treatment planning; median survival varies by type (epulis excellent, melanoma 5–10 months with tx)",
        prognosis: "guarded"
      }
    },

    // ═══════════════════════════ CARDIOLOGY EXPANDED ════════════════════════

    {
      id: "congestive_heart_failure",
      name: "Congestive Heart Failure (Left-sided / Right-sided)",
      species: ["dog","cat"],
      category: "Cardiology",
      emergency: true,
      signals: {
        complaints_dyspnea: 9, complaints_coughing: 8, complaints_lethargy: 8,
        complaints_weight_loss: 6, complaints_abdominal_distension: 6,
        cardiac_murmur_34: 8, cardiac_murmur_56: 9, cardiac_arrhythmia: 5,
        resp_crackles_fine: 8, resp_muffled: 6, abdomen_fluid_wave: 7,
        mm_pale: 6, mm_cyanotic: 7, hr_high: 5,
        age_old: 7, breed_cavalier: 8, breed_doberman: 6
      },
      tests: {
        tier1: ["Thoracic radiography (pulmonary edema, pleural effusion, cardiomegaly)","Echocardiogram (function, chamber size)","ECG","SpO2 / oxygen status"],
        tier2: ["NT-proBNP (elevated in CHF)","Troponin I","CBC/chemistry/electrolytes","Blood pressure"],
        tier3: ["Cardiac CT/MRI","Referral: veterinary cardiologist"]
      },
      treatment: {
        medications: ["Furosemide 2–4 mg/kg IV/IM (acute crisis) or 1–2 mg/kg PO BID–TID (maintenance)","Pimobendan 0.25 mg/kg PO BID (positive inotrope — dog BEFORE food)","Enalapril 0.5 mg/kg PO BID or Benazepril 0.25–0.5 mg/kg PO SID (ACE inhibitor)","Spironolactone 2 mg/kg PO SID (aldosterone antagonist)","Amlodipine 0.1–0.25 mg/kg PO SID (cat hypertension)","Atenolol 0.2–0.5 mg/kg PO BID (cat HCM arrhythmia)"],
        procedures: ["Oxygen supplementation — flow-by or nasal cannula in crisis","Thoracocentesis (pleural effusion)","Abdominocentesis (ascites)","Cage rest — minimize stress","Emergency stabilization before diagnostics"],
        diet: ["Sodium-restricted cardiac diet","Avoid excessive fluid restriction (electrolyte monitoring)","Taurine supplementation if dilated CM and low taurine (golden retriever, low-grain diet)"]
      },
      education: {
        monitor: ["Resting respiratory rate (RRR) at home — >30 brpm alert","Body weight daily (fluid retention)","Exercise tolerance","Appetite","Syncope events"],
        red_flags: ["RRR >40 brpm — emergency","Cyanosis","Sudden collapse or syncope","Not responding to increased furosemide in 2–4 hours"],
        followup: "Recheck 5–7d after crisis; echocardiogram reassessment at 4–6 weeks; lifelong management; RAAS monitoring q3–6 months",
        prognosis: "guarded"
      }
    },

    {
      id: "cardiac_arrhythmia",
      name: "Cardiac Arrhythmia (Ventricular / Supraventricular)",
      species: ["dog","cat"],
      category: "Cardiology",
      emergency: true,
      signals: {
        complaints_collapse: 8, complaints_lethargy: 7, complaints_dyspnea: 6,
        cardiac_arrhythmia: 10, cardiac_tachycardia: 7, hr_high: 7, hr_low: 5,
        mm_pale: 5, complaints_behavioral: 5,
        breed_doberman: 7, breed_boxer: 7, breed_german_shepherd: 5,
        hpi_onset_sudden: 7
      },
      tests: {
        tier1: ["ECG (12-lead or 6-lead)","Thoracic radiography","Blood pressure"],
        tier2: ["Echocardiogram","CBC/chemistry/electrolytes (K, Mg)","Holter monitor (24-hour ambulatory ECG — ventricular arrhythmia)","Troponin I"],
        tier3: ["Electrophysiology study","Referral: veterinary cardiologist"]
      },
      treatment: {
        medications: ["VT/VF acute: Lidocaine 2 mg/kg IV bolus (dog — NOT cat), then CRI 25–75 μg/kg/min","Atropine 0.02–0.04 mg/kg IV (bradyarrhythmia)","Metoprolol 0.2–0.4 mg/kg PO BID (dog SVT/VT maintenance)","Sotalol 1–2 mg/kg PO BID (dog ventricular)","Diltiazem 0.5–1.5 mg/kg PO BID-TID (cat SVT)","Correct electrolyte imbalances (IV K, Mg)"],
        procedures: ["Continuous ECG monitoring","IV access and fluid support","Cardioversion (if unstable SVT/VF)","Pacemaker implantation (complete heart block)"],
        diet: ["Cardiac diet if underlying heart disease","Taurine supplementation if DCM"]
      },
      education: {
        monitor: ["Heart rate and rhythm","Syncope episodes","Exercise tolerance","Holter re-evaluation at 6–12 months (Doberman, Boxer)"],
        red_flags: ["Syncope or sudden collapse","Ventricular fibrillation (fatal if untreated)","Run of >30 consecutive VPCs","HR <40 bpm or >280 bpm"],
        followup: "Doberman/Boxer: Holter monitor annually for occult arrhythmia; antiarrhythmic drug monitoring q3–6 months",
        prognosis: "guarded"
      }
    },

    {
      id: "pericardial_effusion",
      name: "Pericardial Effusion / Cardiac Tamponade",
      species: ["dog","cat"],
      category: "Cardiology",
      emergency: true,
      signals: {
        complaints_dyspnea: 8, complaints_collapse: 8, complaints_lethargy: 8,
        complaints_abdominal_distension: 7, abdomen_fluid_wave: 7,
        mm_pale: 7, mm_tacky: 6, hr_high: 6,
        resp_muffled: 8, cardiac_murmur_12: 4,
        breed_golden: 7, breed_labrador: 5, breed_great_dane: 5,
        age_old: 7, hpi_onset_sudden: 6
      },
      tests: {
        tier1: ["Echocardiogram — fluid around heart (DIAGNOSTIC)","Thoracic radiography (globoid cardiac silhouette)","ECG — low amplitude QRS, electrical alternans"],
        tier2: ["CBC/chemistry","Pericardial fluid analysis (cytology, culture)","Cardiac troponin I (hemangiosarcoma marker)"],
        tier3: ["CT scan (mass detection)","Referral: veterinary cardiologist/surgeon"]
      },
      treatment: {
        medications: ["Pericardiocentesis is treatment (not primarily drug therapy)","Furosemide 1 mg/kg IV (temporary preload reduction)","Doxorubicin-based chemo (hemangiosarcoma post-op)"],
        procedures: ["Pericardiocentesis — EMERGENCY procedure (drain effusion, restore cardiac output)","Pericardiectomy (recurrent benign effusion)","Surgical mass resection (right atrial mass)"],
        diet: ["No specific dietary restriction in acute phase"]
      },
      education: {
        monitor: ["Respiratory rate","Exercise tolerance","Abdominal distension recurrence","Echocardiographic re-evaluation"],
        red_flags: ["Beck's triad: muffled heart sounds + hypotension + distended jugular veins = cardiac tamponade (EMERGENCY)","Recurrent effusion within days"],
        followup: "Echocardiogram 1 week post-pericardiocentesis; hemangiosarcoma has poor prognosis (1–4 months); benign: pericardiectomy prevents recurrence",
        prognosis: "guarded"
      }
    },

    {
      id: "subvalvular_aortic_stenosis",
      name: "Subaortic Stenosis (SAS)",
      species: ["dog"],
      category: "Cardiology",
      signals: {
        complaints_lethargy: 5, complaints_collapse: 6, complaints_dyspnea: 4,
        cardiac_murmur_34: 7, cardiac_murmur_56: 8,
        age_young: 7, breed_golden: 8, breed_rottweiler: 7,
        breed_german_shepherd: 5, breed_newfoundland: 7,
        hpi_onset_chronic: 5
      },
      tests: {
        tier1: ["Auscultation — ejection murmur left base","Echocardiogram (DIAGNOSTIC — pressure gradient >50 mmHg severe)","Doppler echocardiography (peak velocity)"],
        tier2: ["ECG (LVH pattern, arrhythmia)","Holter monitor (occult arrhythmia)","Blood pressure"],
        tier3: ["Cardiac catheterization","Referral: veterinary cardiologist"]
      },
      treatment: {
        medications: ["Atenolol 0.5–1 mg/kg PO BID (reduce outflow tract gradient, prevent arrhythmia)","Avoid ACE inhibitors as sole therapy (controversial)","Antiarrhythmic therapy if VT develops"],
        procedures: ["Balloon valvuloplasty (mild to moderate cases — equivocal benefit)","Surgical ring resection (specialist centers)","Genetic counseling — screen breeding dogs"],
        diet: ["No specific restriction; low-intensity exercise if severe"]
      },
      education: {
        monitor: ["Exercise tolerance","Syncope episodes","Arrhythmia on Holter","Annual echocardiogram"],
        red_flags: ["Syncope during exercise — sudden death risk","VT on Holter (>3 consecutive)","Worsening gradient on echo"],
        followup: "Annual cardiology recheck; severely affected dogs: exercise restriction; genetic condition — advise against breeding",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ RESPIRATORY EXPANDED ═══════════════════════

    {
      id: "aspiration_pneumonia",
      name: "Aspiration Pneumonia",
      species: ["dog","cat"],
      category: "Respiratory",
      emergency: true,
      signals: {
        complaints_coughing: 8, complaints_dyspnea: 8, complaints_lethargy: 7,
        complaints_anorexia: 6, temp_high: 7,
        resp_crackles_coarse: 8, resp_crackles_fine: 6, resp_increased_bv: 7,
        mm_cyanotic: 6, mm_pale: 5,
        hpi_onset_sudden: 7, complaints_vomiting: 6
      },
      tests: {
        tier1: ["Thoracic radiography — ventral lung infiltrates (DIAGNOSTIC)","Pulse oximetry / blood gas","CBC (leukocytosis, left shift)"],
        tier2: ["Airway wash cytology + culture","Chemistry panel","Electrolytes"],
        tier3: ["CT thorax (severe/atypical)","Referral: internist/intensivist"]
      },
      treatment: {
        medications: ["Amoxicillin-clavulanate 12.5–25 mg/kg PO BID OR","Enrofloxacin 5 mg/kg IV/PO SID (broad spectrum)","Metronidazole 10 mg/kg IV/PO BID (anaerobic coverage)","IV fluids — appropriate rate (avoid fluid overload)","Maropitant 1 mg/kg SC SID (antiemetic — reduce re-aspiration)","Sucralfate 0.25–1 g PO TID (gastric protection)"],
        procedures: ["Oxygen supplementation","Nebulization + coupage","NPO until vomiting controlled","Elevate food bowls (megaesophagus dogs)","AVOID corticosteroids (worsen infection)"],
        diet: ["Small frequent meals after recovery","Elevated bowl or raised feeding position","Bailey chair for megaesophagus patients"]
      },
      education: {
        monitor: ["RR and breathing effort","Temperature","Appetite","Cough frequency","Repeat thoracic radiograph at 2–4 weeks"],
        red_flags: ["SpO2 <94%","Worsening respiratory distress despite treatment","Cyanosis","High fever unresponsive to antibiotics"],
        followup: "Recheck radiograph in 2–4 weeks; investigate underlying cause (megaesophagus, LPRD, vomiting disorder); some cases require long-term management",
        prognosis: "fair"
      }
    },

    {
      id: "nasal_tumor",
      name: "Nasal Tumor (Carcinoma / Sarcoma)",
      species: ["dog","cat"],
      category: "Respiratory / Oncology",
      signals: {
        complaints_nasal_discharge: 9, complaints_sneezing: 7,
        complaints_bleeding: 8, nose_mucopurulent: 7,
        hpi_onset_subacute: 6, hpi_progression_worsening: 7,
        age_old: 8, age_middle: 5,
        breed_dolichocephalic: 5
      },
      contra_signals: { vaccine_overdue: -2 },
      tests: {
        tier1: ["Thoracic radiography (distant metastasis)","Skull radiography (bone destruction)","CBC/chemistry"],
        tier2: ["CT scan of nasal cavity + skull (STAGING GOLD STANDARD)","Rhinoscopy + biopsy","MRI (intracranial extension)"],
        tier3: ["Referral: veterinary oncologist"]
      },
      treatment: {
        medications: ["Piroxicam 0.3 mg/kg PO SID with food (anti-tumor, anti-inflammatory)","Palliative analgesics: Tramadol 2–5 mg/kg PO BID-TID","Doxorubicin-based chemotherapy (sarcoma — per oncologist)"],
        procedures: ["Radiation therapy (DEFINITIVE — gold standard for nasal carcinoma)","Surgical rhinotomy (limited benefit alone)","Palliative RT (shorter course for symptom control)"],
        diet: ["High-calorie diet","Soft food if facial pain affects eating","Nutritional support"]
      },
      education: {
        monitor: ["Nasal discharge character and volume","Pain level","Facial symmetry","Neurological signs (proptosis, exophthalmos)"],
        red_flags: ["Facial deformity","Neurological signs","Epistaxis not controlled","Exophthalmos — intracranial extension"],
        followup: "Oncology referral within 1–2 weeks; median survival with radiation: 12–18 months; without treatment: 3–5 months",
        prognosis: "guarded"
      }
    },

    {
      id: "pneumothorax",
      name: "Pneumothorax",
      species: ["dog","cat"],
      category: "Respiratory",
      emergency: true,
      signals: {
        complaints_dyspnea: 10, complaints_collapse: 8, complaints_trauma: 7,
        resp_muffled: 8, chest_accessory_muscles: 8,
        mm_cyanotic: 7, mm_pale: 6,
        hr_high: 6, hpi_onset_sudden: 9,
        attitude_obtunded: 5
      },
      tests: {
        tier1: ["Thoracic radiography — air in pleural space (DIAGNOSTIC)","Pulse oximetry","Physical exam — bilateral dorsal hyperresonance"],
        tier2: ["Point-of-care ultrasound (FAST)","CBC/chemistry (trauma cases)","Coagulation panel"],
        tier3: ["CT thorax (bullae, bulla identification for surgery)"]
      },
      treatment: {
        medications: ["Oxygen supplementation — 100% flow-by immediate","Pain: Butorphanol 0.2–0.4 mg/kg IV/IM","Buprenorphine 0.01–0.02 mg/kg IV/IM (adjunct)","Antibiotics if open wound: Amoxicillin-clavulanate 12.5 mg/kg IV/PO BID"],
        procedures: ["THORACOCENTESIS — bilateral, dorsal 7th–9th ICS (EMERGENCY if tension pneumothorax)","Chest tube placement (severe/recurrent)","Surgical repair — rib fractures, lung laceration, resection of bullae"],
        diet: ["NPO during acute phase"]
      },
      education: {
        monitor: ["Respiratory rate and effort","SpO2","Recurrence after needle/tube decompression","Bilateral air on repeat radiograph"],
        red_flags: ["Tension pneumothorax — rapidly fatal without immediate decompression","SpO2 <90%","Worsening after initial decompression (continued leak)"],
        followup: "Thoracic radiograph at 24h, 48h, 1 week; spontaneous pneumothorax (no trauma) — CT for bullae and surgical decision",
        prognosis: "fair"
      }
    },

    {
      id: "pulmonary_hypertension",
      name: "Pulmonary Hypertension",
      species: ["dog","cat"],
      category: "Respiratory / Cardiology",
      signals: {
        complaints_dyspnea: 9, complaints_lethargy: 8, complaints_collapse: 7,
        complaints_coughing: 6, complaints_abdominal_distension: 5,
        resp_muffled: 5, resp_crackles_fine: 5,
        cardiac_murmur_34: 5, cardiac_arrhythmia: 4,
        hr_high: 5, mm_cyanotic: 6, mm_pale: 5,
        age_old: 6, breed_doberman: 4
      },
      tests: {
        tier1: ["Echocardiogram (TR velocity >2.8 m/s = PH likely)","Thoracic radiography","CBC/chemistry"],
        tier2: ["Heartworm antigen test","ProBNP","Blood gas (hypoxemia)","CT pulmonary angiogram"],
        tier3: ["Right heart catheterization (mean PAP >25 mmHg — definitive)","Referral: veterinary cardiologist"]
      },
      treatment: {
        medications: ["Sildenafil 0.5–2 mg/kg PO TID (PDE-5 inhibitor — vasodilator)","Pimobendan 0.25 mg/kg PO BID (right heart support)","Furosemide if concurrent right CHF","Treat underlying cause (heartworm, fibrosis)"],
        procedures: ["Oxygen supplementation (chronic hypoxemia)","Exercise restriction"],
        diet: ["Low-sodium cardiac diet","Taurine/L-carnitine if DCM-associated"]
      },
      education: {
        monitor: ["Respiratory rate","Exercise tolerance","Echocardiogram reassessment q3–6 months","Cough","Syncope"],
        red_flags: ["Syncope with exercise","Cyanosis","Deteriorating despite sildenafil","Right-sided CHF signs"],
        followup: "Echocardiogram re-evaluation 4–6 weeks after sildenafil initiation; reassess annually",
        prognosis: "guarded"
      }
    },

    {
      id: "brachycephalic_syndrome",
      name: "Brachycephalic Obstructive Airway Syndrome (BOAS)",
      species: ["dog","cat"],
      category: "Respiratory",
      signals: {
        complaints_dyspnea: 8, complaints_coughing: 6, complaints_sneezing: 5,
        chest_open_mouth: 7, chest_accessory_muscles: 6,
        complaints_behavioral: 5, hpi_onset_chronic: 7,
        breed_bulldog: 9, breed_pug: 9, breed_shih_tzu: 7,
        breed_french_bulldog: 8, breed_persian: 7
      },
      tests: {
        tier1: ["Physical exam — snoring, stridor, open-mouth breathing","Sedated oral exam (elongated soft palate, stenotic nares)","Pulse oximetry"],
        tier2: ["Laryngoscopy under sedation (laryngeal saccule eversion, collapse)","Thoracic radiograph (aspiration, hiatal hernia)","ECG (secondary cardiac effects)"],
        tier3: ["CT nasal/pharynx (nasopharyngeal turbinates)","Referral: soft tissue surgeon"]
      },
      treatment: {
        medications: ["Acepromazine + butorphanol (sedation when needed — carefully)","Furosemide 1 mg/kg IV (acute respiratory crisis — pulmonary edema)","Dexamethasone 0.1–0.2 mg/kg IV (acute crisis laryngeal edema)","Omeprazole 1 mg/kg PO SID (concurrent GERD)"],
        procedures: ["Nares widening (alaplasty) — recommended early","Soft palate resection (staphylectomy)","Laryngeal sacculectomy","Tracheal hypoplasia — no surgical correction","Avoid overheating and obesity"],
        diet: ["Weight loss critical if obese","Avoid eating too fast (puzzle feeder)","Elevated food bowls"]
      },
      education: {
        monitor: ["Breathing quality","Exercise tolerance","Regurgitation/vomiting (GERD)","Sleep quality (sleep apnea)"],
        red_flags: ["Open-mouth breathing at rest","Cyanotic episodes","Sudden respiratory distress — emergency","Heat stress or exercise intolerance"],
        followup: "Surgical correction recommended before 2 years for best outcome; weight management lifelong; avoid hot/humid environments",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ GASTROENTEROLOGY EXPANDED ══════════════════

    {
      id: "megaesophagus",
      name: "Megaesophagus",
      species: ["dog","cat"],
      category: "Gastroenterology",
      signals: {
        complaints_vomiting: 9, complaints_weight_loss: 8, complaints_coughing: 6,
        complaints_dyspnea: 5, complaints_anorexia: 6,
        hpi_onset_chronic: 6, hpi_progression_worsening: 5,
        age_young: 5, age_old: 5,
        breed_german_shepherd: 6, breed_great_dane: 6, breed_golden: 5
      },
      contra_signals: { abdomen_pain_mild: -2 },
      tests: {
        tier1: ["Thoracic radiograph (esophageal dilation — DIAGNOSTIC)","Contrast esophagram (barium swallow)","Fluoroscopy (gold standard for motility)"],
        tier2: ["Acetylcholine receptor antibody titer (myasthenia gravis — acquired ME)","Thyroid panel (hypothyroidism)","ACTH stim (hypoadrenocorticism)","ANA — immune-mediated"],
        tier3: ["Esophagoscopy (inflammation, stricture, foreign body)","Referral: internist"]
      },
      treatment: {
        medications: ["Metoclopramide 0.2–0.5 mg/kg PO/SC TID (motility)","Omeprazole 1 mg/kg PO SID (esophagitis)","Sucralfate 0.25–1 g PO TID","Pyridostigmine 0.02–0.06 mg/kg PO BID–TID (myasthenia gravis)","Treat underlying cause (thyroid hormone, steroids for immune-mediated)"],
        procedures: ["Bailey chair — upright feeding 10–15 min after meals (ESSENTIAL)","Small frequent meals (4–6×/day)","Elevated food bowl","Blenderized or meatball consistency diet","Avoid dry kibble"],
        diet: ["Consistency varies per patient — upright position after feeding is most critical","Avoid foods that worsen regurgitation — trial different textures","Liquid gruel, canned food, meatballs (gravity-assisted)"]
      },
      education: {
        monitor: ["Regurgitation frequency","Body weight (monthly)","Aspiration pneumonia signs","Coat and body condition"],
        red_flags: ["Aspiration pneumonia (cough, fever, dyspnea) — MOST COMMON COMPLICATION","Rapid weight loss","Inability to maintain hydration"],
        followup: "Recheck monthly initially; thoracic radiograph q3 months; myasthenia: recheck antibody titers q3–6 months",
        prognosis: "guarded"
      }
    },

    {
      id: "esophageal_foreign_body",
      name: "Esophageal Foreign Body",
      species: ["dog","cat"],
      category: "Gastroenterology",
      emergency: true,
      signals: {
        complaints_vomiting: 9, complaints_anorexia: 8, complaints_dysphagia: 9,
        complaints_lethargy: 6, hpi_onset_sudden: 9,
        complaints_behavioral: 7, age_young: 5,
        breed_labrador: 5, breed_golden: 5
      },
      tests: {
        tier1: ["Thoracic radiograph (radio-opaque FB, esophageal gas, aspiration pneumonia)","Contrast esophagram (radio-lucent FB)"],
        tier2: ["CBC/chemistry (perforation signs)","CT thorax (complex cases)"],
        tier3: ["Esophagoscopy — diagnostic and therapeutic"]
      },
      treatment: {
        medications: ["NPO immediately","IV fluid support if systemic signs","Ampicillin-sulbactam 30 mg/kg IV TID (perforation/post-procedure)","Omeprazole 1 mg/kg IV/PO SID (esophagitis)","Sucralfate suspension 0.25–1 g PO TID (post-procedure)","Pain: Buprenorphine 0.01–0.02 mg/kg IV/SC q6–8h"],
        procedures: ["Esophagoscopy with retrieval (forceps/balloon) — PREFERRED","Endoscopic push to stomach if safe (smooth objects)","Surgery — thoracotomy if non-retrievable / perforation (AVOID if possible)","Stricture dilation post-healing (balloon dilation)"],
        diet: ["NPO × 24–48h post-procedure","Liquid diet × 2 weeks post-retrieval","Gradual reintroduction of soft food"]
      },
      education: {
        monitor: ["Swallowing ability and pain","Regurgitation after retrieval","Fever (perforation/infection)","Stricture development (3–4 weeks post-injury — re-evaluate)"],
        red_flags: ["Esophageal perforation — surgical emergency","Mediastinitis","Stricture formation (regurgitation persists after recovery)"],
        followup: "Recheck in 2–4 weeks; esophagram to evaluate stricture; prevention — avoid bones, corn cobs, toys small enough to swallow",
        prognosis: "fair"
      }
    },

    {
      id: "intestinal_intussusception",
      name: "Intestinal Intussusception",
      species: ["dog","cat"],
      category: "Gastroenterology",
      emergency: true,
      signals: {
        complaints_vomiting: 9, complaints_diarrhea: 8, complaints_lethargy: 8,
        complaints_anorexia: 8, abdomen_pain_moderate: 8, abdomen_pain_severe: 9,
        hpi_onset_sudden: 8, age_young: 8, age_puppy: 9,
        complaints_abdominal_distension: 6
      },
      tests: {
        tier1: ["Abdominal ultrasound — target sign / bull's-eye (DIAGNOSTIC)","Abdominal radiography (soft tissue mass, intestinal gas pattern)","CBC/chemistry"],
        tier2: ["Electrolytes","Coagulation panel","Urinalysis"],
        tier3: ["CT abdomen (complex cases)"]
      },
      treatment: {
        medications: ["IV fluid resuscitation (0.9% NaCl or LRS)","Antibiotics: Ampicillin-sulbactam 22 mg/kg IV TID","Analgesics: Methadone 0.2 mg/kg IV q4–6h","Antiemetics: Maropitant 1 mg/kg SC SID"],
        procedures: ["Surgical intervention — manual reduction or resection-anastomosis (DEFINITIVE)","Enteroplication (prevent recurrence — serosal sutures)","Post-op intensive care monitoring"],
        diet: ["NPO pre-surgery and 24h post-surgery","Gradual reintroduction of liquid diet after bowel sounds return","Small frequent meals × 2 weeks"]
      },
      education: {
        monitor: ["Post-op incision site","Defecation (return of function)","Appetite and hydration","Recurrence signs — vomiting/abdominal pain"],
        red_flags: ["Septic peritonitis post-op","Intestinal necrosis (dehiscence risk)","Recurrence within days of reduction"],
        followup: "Hospitalize 2–4d post-op; discharge when eating and passing stool; recheck 1 week post-surgery",
        prognosis: "fair"
      }
    },

    {
      id: "hepatic_disease_chronic",
      name: "Chronic Hepatitis / Hepatic Fibrosis",
      species: ["dog"],
      category: "Gastroenterology / Hepatology",
      signals: {
        complaints_lethargy: 7, complaints_weight_loss: 7, complaints_vomiting: 6,
        complaints_anorexia: 6, complaints_polyuria: 5, complaints_polydipsia: 5,
        complaints_abdominal_distension: 6, abdomen_fluid_wave: 5,
        mm_icteric: 7, liver_hepatomegaly: 7, bcs_thin: 6,
        age_middle: 5, age_old: 6,
        breed_labrador: 5, breed_cocker: 6, breed_doberman: 6
      },
      tests: {
        tier1: ["CBC/chemistry (ALT, ALP, GGT, bilirubin, albumin, BUN)","Urinalysis (bilirubin)","Abdominal ultrasound"],
        tier2: ["Fasting + post-prandial bile acids (liver function)","Coagulation panel (PT/aPTT)","Copper quantification (biopsy — Labrador, Cocker)","Liver biopsy (ultrasound-guided or surgical)"],
        tier3: ["Referral: internist","Portosystemic shunt study (CT angiography)"]
      },
      treatment: {
        medications: ["SAMe (S-adenosylmethionine) 17–20 mg/kg PO SID (hepatoprotectant)","Ursodiol (ursodeoxycholic acid) 10–15 mg/kg PO SID (choleretic)","Vitamin E 10 IU/kg PO SID (antioxidant)","Prednisolone 2 mg/kg PO SID tapering (immune-mediated hepatitis)","Penicillamine 10–15 mg/kg PO BID (copper chelation)","Spironolactone 1–2 mg/kg PO SID + furosemide (ascites)"],
        procedures: ["Abdominocentesis (symptomatic ascites)","Liver biopsy for definitive diagnosis and copper quantification","Low-copper diet if copper-associated"],
        diet: ["Moderate protein restriction ONLY if HE signs (ammonia)","Low-copper diet (copper storage hepatopathy)","Highly digestible hepatic prescription diet","Avoid fasting — risk of hypoglycemia"]
      },
      education: {
        monitor: ["Liver enzyme trends","Albumin, bilirubin, coagulation","Abdominal distension","Body weight","Signs of HE (disorientation, seizures)"],
        red_flags: ["Hepatic encephalopathy (HE) — confusion, seizures","Coagulopathy — spontaneous bleeding","Rapidly worsening ascites","Jaundice worsening"],
        followup: "Chemistry + urinalysis recheck at 4–6 weeks; biopsy re-evaluation at 6 months; long-term hepatoprotectant therapy",
        prognosis: "guarded"
      }
    },

    {
      id: "cholangitis_cat",
      name: "Feline Cholangitis / Cholangiohepatitis Complex",
      species: ["cat"],
      category: "Gastroenterology / Hepatology",
      signals: {
        complaints_lethargy: 8, complaints_anorexia: 8, complaints_vomiting: 7,
        complaints_weight_loss: 7, complaints_abdominal_distension: 5,
        mm_icteric: 8, liver_hepatomegaly: 6, temp_high: 6,
        age_middle: 5, age_old: 6,
        hpi_onset_subacute: 5, hpi_onset_chronic: 5
      },
      tests: {
        tier1: ["CBC (neutrophilia — bacterial; eosinophilia — lymphocytic)","Chemistry (ALT, ALP-mild, GGT, bilirubin)","Abdominal ultrasound (bile duct dilation, echogenicity)"],
        tier2: ["Fasting bile acids","Toxoplasma PCR/serology","FeLV/FIV","Liver biopsy + bile culture (ESSENTIAL — neutrophilic vs lymphocytic)","Cobalamin (B12) — often deficient"],
        tier3: ["ERCP / bile duct lavage (specialist)","Referral: feline internist"]
      },
      treatment: {
        medications: ["NEUTROPHILIC: Amoxicillin-clavulanate 12.5 mg/kg PO BID × 4–6 weeks + Metronidazole 10 mg/kg PO BID × 4–6 weeks","LYMPHOCYTIC: Prednisolone 2–4 mg/kg PO SID × 4–6 weeks then taper","Ursodiol 10–15 mg/kg PO SID (all types)","SAMe 90 mg/cat PO SID (hepatoprotectant)","Cobalamin (B12) 250 μg SC weekly × 4–6 weeks","Vitamin K1 0.5–1 mg/kg SC if coagulopathic","Mirtazapine 1.88 mg/cat PO q48–72h (appetite stimulant)"],
        procedures: ["Syringe or assisted feeding if anorexic","Esophagostomy tube if prolonged anorexia","Triad disease: treat IBD and pancreatitis concurrently"],
        diet: ["Highly digestible hepatic diet","Small frequent meals","Assisted feeding to prevent hepatic lipidosis"]
      },
      education: {
        monitor: ["Appetite and weight weekly","Liver enzymes q4–6 weeks","Response to treatment","Concurrent IBD and pancreatitis (triad disease)"],
        red_flags: ["Deteriorating mental status (HE)","Bilirubin >5 mg/dL and rising","Coagulopathy","Not eating for >3 days — hepatic lipidosis risk"],
        followup: "Chemistry recheck at 4–6 weeks; biopsy repeat at 6 months for lymphocytic type; long-term ursodiol and SAMe common",
        prognosis: "fair"
      }
    },

    {
      id: "rectal_anal_polyp",
      name: "Colorectal Polyp / Rectal Neoplasia",
      species: ["dog","cat"],
      category: "Gastroenterology / Oncology",
      signals: {
        complaints_diarrhea: 7, complaints_bleeding: 7, complaints_hematochezia: 7,
        complaints_dysuria: 4, complaints_behavioral: 5,
        age_old: 7, age_middle: 5,
        hpi_onset_chronic: 6, hpi_progression_worsening: 5
      },
      tests: {
        tier1: ["Digital rectal exam — palpable mass","Colonoscopy + biopsy (DIAGNOSTIC)","CBC/chemistry"],
        tier2: ["Abdominal ultrasound (ileocolic LN)","Thoracic radiography (distant metastasis)","CT abdomen/pelvis (staging)"],
        tier3: ["Referral: veterinary oncologist / surgeon"]
      },
      treatment: {
        medications: ["Piroxicam 0.3 mg/kg PO SID (adenomatous polyps — NSAID anti-tumor effect)","Prednisone 2 mg/kg PO SID (lymphoma of colon)","Analgesics if painful","Pre-op antibiotics: Metronidazole + Amoxicillin"],
        procedures: ["Endoscopic polypectomy (benign pedunculated polyp)","Surgical resection + anastomosis (malignant or non-resectable endoscopically)","Radiation therapy (adjunct for incompletely excised)"],
        diet: ["High-fiber diet (post-polypectomy)","Low-residue diet if diarrhea predominates","Probiotic supplementation"]
      },
      education: {
        monitor: ["Hematochezia recurrence","Defecation quality","Body weight","Colonoscopy at 3–6 months (polyp recurrence)"],
        red_flags: ["Tenesmus with worsening rectal bleeding","Rectal prolapse","Systemic signs of metastasis"],
        followup: "Endoscopic recheck at 3 months; multiple polyps — colonoscopy every 6 months; malignant: oncology referral",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ NEPHROLOGY / UROLOGY EXPANDED ══════════════

    {
      id: "glomerulonephritis",
      name: "Glomerulonephritis / Protein-Losing Nephropathy",
      species: ["dog","cat"],
      category: "Nephrology",
      signals: {
        complaints_lethargy: 7, complaints_weight_loss: 7, complaints_polyuria: 6,
        complaints_polydipsia: 6, complaints_abdominal_distension: 5,
        abdomen_fluid_wave: 5, bcs_thin: 6,
        kidneys_renomegaly: 4, kidneys_small: 4,
        hpi_onset_chronic: 7, age_middle: 5, age_old: 6
      },
      tests: {
        tier1: ["Urinalysis + UPC (urine protein:creatinine ratio) — >2.0 significant","CBC/chemistry (albumin, BUN, creatinine, cholesterol)","Blood pressure"],
        tier2: ["Urine culture","Infectious disease panel (Ehrlichia, Leishmania, Leptospira, heartworm)","Antinuclear antibody (ANA)","Renal biopsy (GOLD STANDARD — type classification)"],
        tier3: ["Electron microscopy on biopsy","Referral: veterinary internist/nephrologist"]
      },
      treatment: {
        medications: ["Benazepril 0.5 mg/kg PO SID (reduce protein loss, decrease hyperfiltration)","Enalapril 0.5 mg/kg PO BID (alternative ACE-I)","Clopidogrel 18.75 mg/cat PO SID or 1–2 mg/kg/dog PO SID (anti-thrombotic)","Omega-3 fatty acids 50–100 mg/kg/day (EPA/DHA — anti-inflammatory)","Immunosuppression if immune-mediated confirmed: Mycophenolate 20 mg/kg PO BID","Treat underlying cause (antibiotics for Ehrlichia etc.)"],
        procedures: ["Serial blood pressure monitoring","Abdominocentesis (symptomatic ascites)","Dietary management critical"],
        diet: ["Renal prescription diet (moderate protein restriction)","Low sodium (hypertension/edema)","Omega-3 supplementation"]
      },
      education: {
        monitor: ["UPC monthly (target <0.5)","Blood pressure q2–4 weeks until stable","Serum albumin","Body weight","Signs of thromboembolism (PTE — sudden dyspnea)"],
        red_flags: ["Pulmonary thromboembolism — sudden dyspnea, collapse","Nephrotic syndrome (severe edema, ascites, hypoalbuminemia, hypercholesterolemia)","UPC >10 — poor prognosis"],
        followup: "UPC + chemistry recheck every 2–4 weeks initially; stabilized: q3 months; renal biopsy guides definitive therapy",
        prognosis: "guarded"
      }
    },

    {
      id: "fanconi_syndrome",
      name: "Fanconi Syndrome (Renal Tubular Dysfunction)",
      species: ["dog"],
      category: "Nephrology",
      signals: {
        complaints_polyuria: 9, complaints_polydipsia: 9, complaints_weight_loss: 7,
        complaints_lethargy: 6, bcs_thin: 7,
        breed_basenji: 9, hpi_onset_chronic: 6,
        complaints_vomiting: 4
      },
      tests: {
        tier1: ["Urinalysis — glucosuria WITHOUT hyperglycemia (DIAGNOSTIC)","Blood glucose (normal)","CBC/chemistry (hyperchloremic metabolic acidosis, electrolytes)"],
        tier2: ["Urine amino acids (aminoaciduria)","Urine phosphate/creatinine ratio","Serum phosphorus"],
        tier3: ["Referral: veterinary internist","Genetic test (Basenji Fanconi)"]
      },
      treatment: {
        medications: ["Sodium bicarbonate 1–4 mEq/kg PO BID–TID (metabolic acidosis)","Potassium citrate (hypokalemia)","Phosphate supplementation (hypophosphatemia)","Vitamin D if needed","Water-soluble vitamins (daily loss in urine)"],
        procedures: ["Regular electrolyte monitoring","Blood gas monitoring"],
        diet: ["High-quality protein diet","Electrolyte supplementation per labwork","Ensure adequate water intake"]
      },
      education: {
        monitor: ["Blood electrolytes + bicarbonate q4–8 weeks","Urine glucose (monitor disease course)","Body weight and condition","Muscle mass (phosphorus deficiency causes weakness)"],
        red_flags: ["Severe metabolic acidosis (pH <7.2)","Profound weakness (severe hypokalemia)","Rapid deterioration"],
        followup: "Lifelong management; Basenji breeders — genetic testing before breeding; electrolytes every 2–4 months",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ ENDOCRINOLOGY EXPANDED ═════════════════════

    {
      id: "hyperaldosteronism_cat",
      name: "Primary Hyperaldosteronism (Conn's Syndrome) — Cat",
      species: ["cat"],
      category: "Endocrinology",
      signals: {
        complaints_lethargy: 7, complaints_behavioral: 6,
        complaints_polyuria: 5, complaints_polydipsia: 5,
        complaints_collapse: 6, gait_ataxia: 7,
        hypokalemia: 8, temp_high: 3,
        age_old: 8, age_middle: 5,
        hpi_onset_subacute: 5
      },
      tests: {
        tier1: ["Serum electrolytes — HYPOKALEMIA (DIAGNOSTIC hallmark)","Blood pressure (hypertension)","CBC/chemistry"],
        tier2: ["Plasma aldosterone (elevated)","Plasma renin activity (low)","Abdominal ultrasound (adrenal mass)"],
        tier3: ["CT scan (adrenal mass localization)","Adrenal biopsy","Referral: internist/endocrinologist"]
      },
      treatment: {
        medications: ["Spironolactone 2–4 mg/kg PO SID (aldosterone antagonist)","Amlodipine 0.625–1.25 mg/cat PO SID (hypertension)","Potassium supplementation: potassium gluconate 2–6 mEq/cat PO BID–TID (hypokalemia)","Treat hypertension before surgery"],
        procedures: ["Unilateral adrenalectomy (adenoma — CURATIVE)","Medical management if bilateral or non-surgical candidate"],
        diet: ["Potassium-rich diet supplement","Low sodium (hypertension)"]
      },
      education: {
        monitor: ["Blood pressure q2–4 weeks","Serum potassium q4–8 weeks","Renal function (hypertension-induced nephropathy)","Neurological signs (weakness, ventroflexion)"],
        red_flags: ["Sudden paralysis/weakness (profound hypokalemia)","Acute blindness (hypertensive retinopathy)","Uncontrolled blood pressure"],
        followup: "Post-adrenalectomy: electrolytes and BP at 2 weeks, 6 weeks, 3 months; medical management: recheck q3 months",
        prognosis: "fair"
      }
    },

    {
      id: "pheochromocytoma",
      name: "Pheochromocytoma",
      species: ["dog","cat"],
      category: "Endocrinology / Oncology",
      signals: {
        complaints_lethargy: 6, complaints_collapse: 7, complaints_behavioral: 6,
        complaints_polyuria: 5, complaints_polydipsia: 5,
        cardiac_tachycardia: 8, hr_high: 8,
        temp_high: 5, mm_pale: 5,
        age_old: 8, hpi_onset_subacute: 5,
        hpi_progression_worsening: 5
      },
      tests: {
        tier1: ["Blood pressure (hypertension — episodic)","Echocardiogram (LVH)","Abdominal ultrasound (adrenal mass)"],
        tier2: ["Urine catecholamines / metanephrines (elevated)","CBC/chemistry","CT adrenal (staging, invasion, metastasis)"],
        tier3: ["Nuclear medicine scan (MIBG scintigraphy)","Referral: internist/surgeon"]
      },
      treatment: {
        medications: ["Alpha-blockade FIRST: Phenoxybenzamine 0.2–0.5 mg/kg PO BID × 2–3 weeks PRE-SURGERY","Beta-blockade ONLY after alpha (Atenolol) — never beta alone (hypertensive crisis)","Amlodipine 0.1–0.25 mg/kg PO SID (adjunct hypertension)"],
        procedures: ["Adrenalectomy (CURATIVE intent if non-metastatic) — high surgical risk","Pre-op alpha-blockade 2–3 weeks ESSENTIAL to prevent intraoperative crisis","ICU monitoring post-op"],
        diet: ["No specific restriction"]
      },
      education: {
        monitor: ["Blood pressure (paroxysmal hypertension)","Heart rate","Post-surgical electrolytes and BP","CT chest (metastasis surveillance — 10–15%)"],
        red_flags: ["Hypertensive crisis — acute neurological signs, fundic hemorrhage","Arrhythmia during surgery (very high risk)","Metastatic disease"],
        followup: "Post-op BP monitoring every 2 weeks × 2 months; CT at 3 and 6 months; benign localized: good prognosis if complete resection",
        prognosis: "guarded"
      }
    },

    {
      id: "insulinoma",
      name: "Insulinoma (Beta-Cell Pancreatic Tumor)",
      species: ["dog","cat"],
      category: "Endocrinology / Oncology",
      emergency: true,
      signals: {
        complaints_collapse: 8, complaints_seizures: 7, complaints_behavioral: 6,
        complaints_lethargy: 7, neuro_disoriented: 7, neuro_seizure: 7,
        hr_high: 5, complaints_polyuria: 3,
        age_old: 8, age_middle: 5,
        breed_labrador: 4, breed_golden: 4, breed_poodle: 4
      },
      tests: {
        tier1: ["Blood glucose (hypoglycemia <60 mg/dL — HALLMARK)","Insulin:glucose ratio (fasting — >0.3 significant)","CBC/chemistry"],
        tier2: ["Abdominal ultrasound (pancreatic mass — often small, may miss)","CT abdomen (better sensitivity for small tumors)","Thoracic radiography (metastasis)"],
        tier3: ["Scintigraphy (octreotide scan)","Referral: surgeon/oncologist"]
      },
      treatment: {
        medications: ["ACUTE HYPOGLYCEMIA: 50% dextrose 0.5–1 mL/kg IV slow bolus, dilute 1:4","Dextrose CRI (2.5–5% in IV fluid) maintenance","Prednisolone 0.5–1 mg/kg PO BID (chronic medical — reduces insulin secretion)","Diazoxide 5–30 mg/kg PO BID (inhibits insulin release — adjunct)","Octreotide 10–40 μg SC BID-TID (somatostatin analogue)","Streptozocin (chemotherapy — specialist only)"],
        procedures: ["Surgical pancreatectomy (curative intent) — TREATMENT OF CHOICE if no metastasis","Intraoperative glucose monitoring","Post-op monitoring for hypoglycemia or diabetes mellitus"],
        diet: ["Small frequent meals × 5–6/day (prevent prolonged fasting)","High-protein, complex carbohydrate diet","AVOID simple sugars (insulin spike)"]
      },
      education: {
        monitor: ["Blood glucose — home monitoring recommended","Neurological signs","Body weight","Post-op: glucose trending (may become diabetic)"],
        red_flags: ["Prolonged seizure — IV dextrose emergency","Glucose <40 mg/dL","Post-op diabetes mellitus"],
        followup: "Post-surgical glucose monitoring daily × 1 week; recheck at 2 weeks, 1 month, then q3 months; median survival with surgery 12–18 months",
        prognosis: "guarded"
      }
    },

    {
      id: "acromegaly_cat",
      name: "Acromegaly (GH-secreting Pituitary Tumor) — Cat",
      species: ["cat"],
      category: "Endocrinology",
      signals: {
        chronic_condition_diabetes: 9, complaints_polyuria: 8, complaints_polydipsia: 8,
        complaints_weight_gain: 7, complaints_behavioral: 5,
        age_old: 7, sex_male_intact: 5,
        hpi_onset_chronic: 7, hpi_progression_worsening: 6
      },
      tests: {
        tier1: ["Blood glucose + fructosamine (poorly regulated DM — hallmark)","IGF-1 serum level (ELEVATED — most reliable screening test)","CBC/chemistry"],
        tier2: ["MRI brain (pituitary macroadenoma)","CT brain","Echocardiogram (HCM secondary to GH)"],
        tier3: ["Referral: neurologist/oncologist","Gamma knife / stereotactic radiosurgery centers"]
      },
      treatment: {
        medications: ["Insulin therapy — high doses often needed (>5–10 U/cat BID — insulin resistance)","Cabergoline 5–10 μg/kg PO SID (dopamine agonist — modest benefit)","Pasireotide (somatostatin analogue — investigational)"],
        procedures: ["Radiation therapy (fractionated or SRS) — MOST EFFECTIVE for tumor control","Hypophysectomy (specialized centers)","Manage concurrent HCM"],
        diet: ["Low-carbohydrate, high-protein diet (diabetic management)","Consistent feeding schedule"]
      },
      education: {
        monitor: ["Blood glucose and fructosamine q4–8 weeks","IGF-1 after treatment","Body size changes (jaw, paws, abdomen)","Cardiac recheck (HCM)","Neurological signs"],
        red_flags: ["Marked hypertension","Seizures / sudden behavior changes (pituitary expansion)","Refractory diabetes despite high insulin doses","HCM deterioration"],
        followup: "Endocrine recheck q2–3 months; MRI/CT reassessment 3–6 months post-RT; prognosis improves significantly with radiation",
        prognosis: "guarded"
      }
    },

    // ═══════════════════════════ HEMATOLOGY / ONCOLOGY EXPANDED ════════════

    {
      id: "coagulopathy_rodenticide",
      name: "Anticoagulant Rodenticide Toxicosis",
      species: ["dog","cat"],
      category: "Toxicology / Hematology",
      emergency: true,
      signals: {
        complaints_bleeding: 10, complaints_lethargy: 8, complaints_dyspnea: 7,
        complaints_collapse: 7, mm_pale: 8, mm_white: 7,
        resp_muffled: 6, abdomen_fluid_wave: 5,
        history_toxin_ingestion: 9, hpi_onset_subacute: 7,
        env_outdoor: 5, age_young: 4
      },
      tests: {
        tier1: ["PT/aPTT (PROLONGED — DIAGNOSTIC; PT is first to rise)","CBC (anemia)","PCV/TS"],
        tier2: ["Thoracic radiograph (hemothorax)","Abdominal ultrasound (hemoabdomen)","PIVKA test (proteins induced by Vit K absence)","Rodenticide screening (blood/urine/bait)"],
        tier3: ["Type and crossmatch (transfusion planning)","Coagulation factor assay"]
      },
      treatment: {
        medications: ["Vitamin K1 (phytonadione) 2.5–5 mg/kg PO BID with fatty meal × 28–30 days (anticoagulant rodenticide REQUIRES 30 days)","Vitamin K1 SC if GI compromise — avoid IV (anaphylaxis risk)","Fresh frozen plasma (FFP) 10–20 mL/kg IV (acute/life-threatening bleeding — rapid factor replacement)","Packed RBC transfusion if PCV <20%"],
        procedures: ["Thoracocentesis (hemothorax — improve breathing)","Abdominocentesis (hemoabdomen)","IV access and monitoring","INDUCE EMESIS if ingestion <2h and no signs (apomorphine 0.04 mg/kg IV dog)"],
        diet: ["Oral Vit K1 MUST be given with fatty food (improves absorption)","Small frequent meals during treatment"]
      },
      education: {
        monitor: ["PT/aPTT at 48–72h after Vit K1 started (expect improvement)","Re-check PT 48–72h AFTER stopping Vit K1 treatment (confirm adequacy)","Signs of re-bleeding","PCV weekly"],
        red_flags: ["Sudden respiratory distress (hemothorax)","Hematoma formation","Melena or hematuria during treatment","PT still elevated after 72h Vit K1 — may be 2nd-generation anticoagulant"],
        followup: "PT recheck 48–72h after completing 30-day Vit K1 course; if PT normal: treatment complete; if abnormal: extend 2 weeks more",
        prognosis: "good"
      }
    },

    {
      id: "splenic_hemangiosarcoma",
      name: "Splenic Hemangiosarcoma",
      species: ["dog"],
      category: "Oncology",
      emergency: true,
      signals: {
        complaints_lethargy: 8, complaints_collapse: 8, complaints_anorexia: 7,
        complaints_abdominal_distension: 7, abdomen_fluid_wave: 8,
        mm_pale: 8, mm_white: 7,
        spleen_splenomegaly: 9, hpi_onset_sudden: 7,
        age_old: 8,
        breed_german_shepherd: 7, breed_golden: 7, breed_labrador: 5
      },
      tests: {
        tier1: ["Abdominal ultrasound (splenic mass — DIAGNOSTIC)","Abdominal FAST (free fluid)","PCV/TS","CBC/chemistry (thrombocytopenia, anemia)"],
        tier2: ["Thoracic radiography (pulmonary metastasis)","Echocardiogram (cardiac hemangiosarcoma — concurrent)","Coagulation panel (DIC)","CT abdomen (staging)"],
        tier3: ["Histopathology of splenectomy specimen","Referral: oncologist"]
      },
      treatment: {
        medications: ["IV fluid resuscitation","pRBC transfusion if PCV <20%","FFP (DIC/coagulopathy)","Doxorubicin-based chemotherapy post-splenectomy (improves MST to ~6 months vs 1–2 months surgery alone)"],
        procedures: ["Emergency splenectomy (DEFINITIVE — hemoabdomen)","Peritoneal lavage","Drain/bandage if ruptured before surgery","Oncology referral post-op"],
        diet: ["High-quality nutritional support post-surgery"]
      },
      education: {
        monitor: ["Post-op incision","Body condition and appetite","Periodic chest radiograph (pulmonary metastasis)","Abdominal ultrasound q6–8 weeks (recurrence)"],
        red_flags: ["Acute collapse — ruptured spleen (EMERGENCY splenectomy)","Post-op DIC signs","Rapid recurrence of abdominal fluid"],
        followup: "Post-splenectomy oncology consult within 1–2 weeks; chemotherapy start within 2 weeks; median survival with chemo 5–6 months",
        prognosis: "poor"
      }
    },

    {
      id: "multiple_myeloma",
      name: "Multiple Myeloma (Plasma Cell Myeloma)",
      species: ["dog","cat"],
      category: "Oncology / Hematology",
      signals: {
        complaints_lethargy: 7, complaints_weight_loss: 7, complaints_limping: 6,
        complaints_bleeding: 5, complaints_polyuria: 5, complaints_polydipsia: 5,
        gait_moderate_lameness: 5, mm_pale: 6,
        age_old: 8, hpi_onset_chronic: 6
      },
      tests: {
        tier1: ["CBC (anemia, hyperproteinemia)","Chemistry (hypercalcemia, elevated globulin, BUN)","Urinalysis (Bence Jones proteinuria)"],
        tier2: ["Serum protein electrophoresis (monoclonal gammopathy — M-spike DIAGNOSTIC)","Radiography (punched-out lytic lesions in bone)","Bone marrow aspirate/biopsy (>20% plasma cells)"],
        tier3: ["Referral: veterinary oncologist","MRI spine (cord compression)"]
      },
      treatment: {
        medications: ["Melphalan 0.1 mg/kg PO SID × 10d then rest 3 weeks + Prednisone 0.5 mg/kg PO SID (STANDARD — VAMP or CHOP as alternative)","Lenalidomide (experimental)","Bisphosphonates: Pamidronate 1–2 mg/kg IV q4 weeks (bone pain, hypercalcemia)","Bortezomib (proteasome inhibitor — investigational in dogs)"],
        procedures: ["Plasmapheresis (hyperviscosity syndrome)","Radiation (focal bone pain)","Orthopedic support (pathological fracture risk)"],
        diet: ["High-quality protein diet (plasma cell catabolism)","Adequate hydration (renal protection)"]
      },
      education: {
        monitor: ["CBC q2–4 weeks during chemo","Serum protein electrophoresis q4–6 weeks (M-spike trend)","Renal function","Calcium levels","Bone pain"],
        red_flags: ["Spinal cord compression (acute paralysis)","Renal failure (cast nephropathy)","Hyperviscosity syndrome (neurological signs, bleeding)"],
        followup: "Response assessment at 4–6 weeks of chemo; median survival: 540 days with treatment (dogs); cat: variable",
        prognosis: "fair"
      }
    },

    {
      id: "polycythemia",
      name: "Polycythemia (Erythrocytosis)",
      species: ["dog","cat"],
      category: "Hematology",
      signals: {
        complaints_behavioral: 7, complaints_lethargy: 5, complaints_polyuria: 5,
        complaints_polydipsia: 5, complaints_seizures: 5,
        mm_brick_red: 9, neuro_disoriented: 5, neuro_seizure: 4,
        hpi_onset_chronic: 5, age_middle: 5, age_old: 6
      },
      tests: {
        tier1: ["CBC — PCV >65% dog, >55% cat (DIAGNOSTIC)","Blood gas (SpO2 — rule out secondary/relative polycythemia)","Urinalysis"],
        tier2: ["Erythropoietin (EPO) level (elevated = secondary; low = PV)","Renal ultrasound (EPO-secreting tumor)","Bone marrow biopsy (primary PV)","Cardiac echo (congenital shunt)"],
        tier3: ["JAK2 mutation (primary PV — investigational in dogs)","Referral: internist/oncologist"]
      },
      treatment: {
        medications: ["Phlebotomy (remove 10–20 mL/kg blood, replace with saline) — IMMEDIATE TREATMENT","Hydroxyurea 30 mg/kg PO SID × 7–10d then 15 mg/kg PO SID (primary PV — myelosuppression)","Aspirin 0.5–1 mg/kg PO SID (anti-thrombotic — adjunct)","Treat underlying cause if secondary"],
        procedures: ["Serial phlebotomy (target PCV 55–65% dog)","Regular CBC monitoring q2–4 weeks during hydroxyurea"],
        diet: ["Adequate hydration critical","No specific dietary restrictions"]
      },
      education: {
        monitor: ["PCV q2–4 weeks","Neurological signs (thrombosis)","Signs of myelosuppression with hydroxyurea","Mucous membrane color"],
        red_flags: ["Neurological signs (thromboembolism — seizure, blindness)","PCV >75% — emergency phlebotomy","Epistaxis, hematuria (hyperviscosity bleeding)"],
        followup: "PCV recheck 2–4 weeks after phlebotomy; hydroxyurea CBC monitoring monthly; primary PV — lifelong management",
        prognosis: "fair"
      }
    },


    // ═══════════════════════════ NEUROLOGY EXPANDED ═════════════════════════

    {
      id: "granulomatous_meningoencephalitis",
      name: "Granulomatous Meningoencephalitis (GME)",
      species: ["dog"],
      category: "Neurology",
      emergency: true,
      signals: {
        complaints_seizures: 8, complaints_behavioral: 7, complaints_lethargy: 7,
        neuro_seizure: 8, neuro_disoriented: 7, neuro_circling: 6,
        neuro_nystagmus: 6, posture_head_tilt: 5,
        hpi_onset_subacute: 7, hpi_progression_worsening: 8,
        age_middle: 6, breed_poodle: 6, breed_maltese: 6,
        breed_yorkshire: 5, breed_chihuahua: 5
      },
      tests: {
        tier1: ["Neurological exam (localise lesion)","CBC/chemistry","Infectious disease panel (Toxoplasma, Neospora, Cryptococcus)"],
        tier2: ["MRI brain (lesion pattern — multifocal, focal, ocular)","CSF analysis (pleocytosis — mononuclear)","CSF culture"],
        tier3: ["PCR panel (CSF)","Referral: veterinary neurologist"]
      },
      treatment: {
        medications: ["Prednisolone 2–4 mg/kg PO SID × 4 weeks then gradual taper (cornerstone)","Cytosine arabinoside (Ara-C) 50 mg/m² SC q3 weeks (maintenance immunosuppression)","Cyclosporine 6 mg/kg PO BID (adjunct — monitor levels)","Procarbazine 25–50 mg/m² PO SID (alternative)","Phenobarbital 2.5–5 mg/kg PO BID (seizure control)","Levetiracetam 20 mg/kg PO TID (alternative AED)"],
        procedures: ["MRI-guided biopsy (focal GME — confirm histopath)","Serial MRI follow-up","ICU monitoring (acute crisis)"],
        diet: ["No specific restriction","Caloric support during illness"]
      },
      education: {
        monitor: ["Neurological status weekly","Steroid side effects (PU/PD, HAC)","Seizure frequency and control","MRI reassessment at 3–6 months"],
        red_flags: ["Status epilepticus","Rapid neurological deterioration","Acute blindness (ocular GME)"],
        followup: "Recheck neurology monthly; MRI at 3 months; immunosuppression lifelong typically required; relapse common on dose reduction",
        prognosis: "guarded"
      }
    },

    {
      id: "spinal_cord_infarction",
      name: "Fibrocartilaginous Embolic Myelopathy (FCEM)",
      species: ["dog","cat"],
      category: "Neurology",
      emergency: true,
      signals: {
        complaints_limping: 8, complaints_collapse: 7, complaints_behavioral: 6,
        gait_paralysis: 9, gait_ataxia: 7,
        hpi_onset_sudden: 10, hpi_progression_worsening: 5,
        age_middle: 6, breed_labrador: 5, breed_german_shepherd: 5,
        breed_great_dane: 5, weight_large: 5, weight_giant: 5
      },
      contra_signals: { abdomen_pain_moderate: -3, gait_mild_lameness: -4 },
      tests: {
        tier1: ["Neurological exam (asymmetric — unilateral spinal signs)","Thoracic/lumbar radiography (rule out fracture, neoplasia)","CBC/chemistry"],
        tier2: ["MRI spine (T2 hyperintensity in cord — GOLD STANDARD)","CSF analysis (normal or mild xanthochromia)"],
        tier3: ["Referral: veterinary neurologist","CT myelogram if MRI unavailable"]
      },
      treatment: {
        medications: ["NO steroid benefit (ischemic, not compressive)","Analgesics if painful: Gabapentin 10 mg/kg PO BID-TID","Bladder management: manual expression or urinary catheterization","Physiotherapy and rehabilitation (primary treatment)"],
        procedures: ["Physical rehabilitation — passive ROM, hydrotherapy, electrical stimulation","Bladder management — express q6–8h if unable to urinate voluntarily","Nursing care — padded bedding, turn q2h (recumbent)","TENS or laser therapy (adjunct)"],
        diet: ["Maintain body weight — obesity impairs recovery"]
      },
      education: {
        monitor: ["Neurological grade weekly","Bladder function (UTI risk)","Pressure sores (recumbent patients)","Pain assessment"],
        red_flags: ["No improvement at 2 weeks — poor prognosis for ambulation","Ascending myelopathy (rare)","Urinary/fecal incontinence persisting >4 weeks"],
        followup: "Neurological recheck weekly × 4 weeks; most improvement within 6–8 weeks; ambulation by 1 month = good prognosis",
        prognosis: "fair"
      }
    },

    {
      id: "canine_cognitive_dysfunction",
      name: "Canine Cognitive Dysfunction Syndrome (CDS)",
      species: ["dog"],
      category: "Neurology / Behavioral",
      signals: {
        complaints_behavioral: 9, complaints_seizures: 3,
        neuro_disoriented: 8, hpi_onset_chronic: 8,
        hpi_progression_worsening: 6, age_old: 9,
        attitude_dull: 5, complaints_lethargy: 5
      },
      contra_signals: { temp_high: -3, hpi_onset_sudden: -5 },
      tests: {
        tier1: ["DISHAA assessment (Disorientation, Interactions, Sleep-wake, Housetraining, Activity, Anxiety)","CBC/chemistry (rule out metabolic — hypothyroid, renal, hepatic)","Urinalysis","Blood pressure"],
        tier2: ["Thyroid panel","CT/MRI brain (rule out structural — tumor, infarct)","CSF analysis if atypical"],
        tier3: ["Referral: veterinary behaviorist/neurologist"]
      },
      treatment: {
        medications: ["Selegiline (L-deprenyl) 0.5–1 mg/kg PO SID morning (MAO-B inhibitor)","Propentofylline 2.5–5 mg/kg PO BID (Europe — cerebrovascular support)","SAMe 17–20 mg/kg PO SID (antioxidant)","Melatonin 3–6 mg PO q12–24h (sleep-wake cycle)"],
        procedures: ["Environmental enrichment — consistent routine, social interaction","Cognitive games, puzzles, training","Nightlight (reduces disorientation at night)","Baby gates (prevent falling downstairs)"],
        diet: ["Senior diet with antioxidants (vitamin E, C)","Hill's b/d (Canine brain aging diet) or equivalent","Omega-3 fatty acids — DHA 40 mg/kg/day"]
      },
      education: {
        monitor: ["DISHAA score monthly","Sleep quality","House soiling incidents","Social interactions","Progression"],
        red_flags: ["Acute neurological change (rule out stroke)","Severe distress or aggression","Rapid decline within days to weeks"],
        followup: "Recheck monthly; progressive and incurable — quality of life monitoring; DISHAA score trends; manage family expectations",
        prognosis: "guarded"
      }
    },

    {
      id: "wobbler_syndrome",
      name: "Wobbler Syndrome (Cervical Spondylomyelopathy)",
      species: ["dog"],
      category: "Neurology / Orthopedics",
      signals: {
        complaints_limping: 7, gait_ataxia: 9, complaints_lethargy: 4,
        gait_moderate_lameness: 7, posture_kyphosis: 5,
        hpi_onset_chronic: 7, hpi_progression_worsening: 6,
        breed_great_dane: 8, breed_doberman: 9, breed_german_shepherd: 5,
        weight_large: 6, weight_giant: 7, age_middle: 6, age_old: 6
      },
      tests: {
        tier1: ["Neurological exam (grade ataxia, UMN signs forelimbs/hindlimbs)","Thoracic/cervical radiography","CBC/chemistry"],
        tier2: ["MRI spine (gold standard — spinal cord compression, disk herniation)","CT myelogram (if MRI unavailable)","CSF analysis"],
        tier3: ["Referral: veterinary neurologist/surgeon"]
      },
      treatment: {
        medications: ["Prednisolone 0.5–1 mg/kg PO SID × 5–7d then taper (acute inflammation)","Gabapentin 10–15 mg/kg PO BID-TID (pain/neuropathic)","NSAID: Meloxicam 0.1 mg/kg PO SID (non-surgical/maintenance)"],
        procedures: ["Surgical decompression (ventral slot, dorsal laminectomy) — grades 3–5 and progressive cases","Neck brace / head collar (conservative management)","Physical rehabilitation","Weight management"],
        diet: ["Weight loss (reduces spinal load)","Elevated food/water bowl (avoid bending neck)"]
      },
      education: {
        monitor: ["Neurological grade (0–5 scale)","Pain response","Bladder function","Post-surgical recovery"],
        red_flags: ["Rapid deterioration to grade 5 (paralysis)","Urinary/fecal incontinence","Pain crisis despite analgesics"],
        followup: "Neurological recheck every 4 weeks; surgery: recheck at 4–6 weeks post-op; long-term management with Dobermans (recurrent disc disease)",
        prognosis: "fair"
      }
    },

    {
      id: "toxin_metaldehyde",
      name: "Metaldehyde Toxicosis (Slug Bait Poisoning)",
      species: ["dog","cat"],
      category: "Toxicology / Neurology",
      emergency: true,
      signals: {
        complaints_seizures: 10, complaints_behavioral: 8,
        neuro_seizure: 10, complaints_lethargy: 6,
        complaints_vomiting: 7, temp_high: 8,
        hpi_onset_sudden: 10, history_toxin_ingestion: 9,
        env_outdoor: 6
      },
      tests: {
        tier1: ["Clinical exam (tremors, hyperthermia — DIAGNOSTIC with exposure history)","Blood glucose","CBC/chemistry","Temperature (hyperthermia)"],
        tier2: ["Urine/gastric content toxicology","Acetylcholinesterase activity (rule out OP)"],
        tier3: ["Referral: emergency/ICU"]
      },
      treatment: {
        medications: ["Induce emesis if <1h and no seizures: Apomorphine 0.04 mg/kg IV dog (NOT if already seizing)","Diazepam 0.5–1 mg/kg IV bolus (seizure control — repeat prn)","Propofol CRI 2–6 mg/kg/hr (refractory seizures)","Methocarbamol 55–220 mg/kg IV slowly (muscle tremor/rigidity)","NO specific antidote","Activated charcoal 1–4 g/kg PO (if conscious, no vomiting)"],
        procedures: ["IV access and fluid support","Temperature control (cool water, fans for hyperthermia)","Urinary catheter (prevent bladder distension)","Intensive monitoring — respiratory, cardiac","Intubation if GCS declining"],
        diet: ["NPO until recovered","Soft food 24–48h post-recovery"]
      },
      education: {
        monitor: ["Seizure frequency and duration","Temperature q30 min in acute phase","Liver enzymes post-recovery (hepatotoxicity)","Neurological status"],
        red_flags: ["Temperature >41°C — hyperthermia crisis","Status epilepticus (>30 min continuous)","Respiratory failure","Liver failure (3–5 days post-exposure)"],
        followup: "ICU care 24–72h; liver enzymes at 3 and 7 days; remove all slug bait from garden; prognosis depends on dose",
        prognosis: "guarded"
      }
    },

    {
      id: "myasthenia_gravis",
      name: "Myasthenia Gravis",
      species: ["dog","cat"],
      category: "Neurology / Immunology",
      signals: {
        complaints_lethargy: 7, complaints_dysphagia: 7, complaints_vomiting: 6,
        complaints_collapse: 7, gait_ataxia: 6, complaints_dyspnea: 5,
        hpi_onset_subacute: 6, hpi_progression_worsening: 6,
        breed_labrador: 4, breed_golden: 4, breed_german_shepherd: 4
      },
      tests: {
        tier1: ["Acetylcholine receptor antibody titer — DIAGNOSTIC (>0.6 nmol/L dog)","Edrophonium (Tensilon) test (0.1–0.5 mg/kg IV — positive = transient improvement)","CBC/chemistry","Thoracic radiography (megaesophagus, aspiration pneumonia, thymoma)"],
        tier2: ["EMG (electromyography) — decremental response on repetitive nerve stimulation","Thoracic CT (thymoma)","Thyroid panel"],
        tier3: ["Referral: veterinary neurologist","Striated muscle antibody titer (thymoma-related)"]
      },
      treatment: {
        medications: ["Pyridostigmine bromide 0.02–0.06 mg/kg PO BID–TID (anticholinesterase — FIRST-LINE)","Prednisolone 0.5–1 mg/kg PO SID (immune-mediated form)","Azathioprine 2 mg/kg PO SID (adjunct immunosuppression)"],
        procedures: ["Bailey chair (megaesophagus management)","Treat aspiration pneumonia (common complication)","Thymectomy if thymoma identified","Physical rehabilitation — avoid excessive exercise"],
        diet: ["Upright feeding position × 15–30 min post-meal","Meatball or gruel consistency food","Small frequent meals"]
      },
      education: {
        monitor: ["Exercise tolerance","Megaesophagus (chest radiograph)","Aspiration signs","AChR antibody titer (remission in 50% dogs within 6 months)"],
        red_flags: ["Aspiration pneumonia (most common cause of death)","Respiratory paralysis","Cholinergic crisis (overdose pyridostigmine: SLUDGE signs — salivation, lacrimation, urination, defecation, GI, emesis)"],
        followup: "Recheck every 4–8 weeks; AChR titer at 3–6 months; spontaneous remission in ~50% dogs; remove thymoma if present",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ MUSCULOSKELETAL EXPANDED ═══════════════════

    {
      id: "patellar_luxation",
      name: "Patellar Luxation",
      species: ["dog","cat"],
      category: "Orthopedics",
      signals: {
        complaints_limping: 8, gait_mild_lameness: 7, gait_moderate_lameness: 7,
        limbs_joint_pain: 5, hpi_onset_chronic: 6,
        age_young: 5, age_middle: 5,
        weight_small: 7, breed_yorkshire: 6, breed_pomeranian: 6,
        breed_chihuahua: 6, breed_poodle: 5, breed_maltese: 5
      },
      tests: {
        tier1: ["Physical exam — patellar luxation grading (I–IV)","Palpation: trochlear groove depth, tibial torsion","Radiography (AP and lateral stifle)"],
        tier2: ["CT scan (complex deformity, surgical planning)"],
        tier3: ["Referral: veterinary orthopedic surgeon (grade III–IV)"]
      },
      treatment: {
        medications: ["Meloxicam 0.1 mg/kg PO SID (pain management Grade I–II)","Gabapentin 5–10 mg/kg PO BID-TID (chronic pain)","Joint supplements: glucosamine/chondroitin PO SID"],
        procedures: ["Grade I: conservative — exercise management, weight control","Grade II–III: Surgical correction — trochleoplasty + tibial tuberosity transposition","Grade IV: Complex surgery, may need femoral/tibial osteotomy","Physical rehabilitation post-surgery"],
        diet: ["Weight management (reduces joint load)","Omega-3 supplementation","Joint support diet"]
      },
      education: {
        monitor: ["Grade progression (Grade I may progress)","Pain level (intermittent skipping gait)","Post-surgical recovery","Contralateral limb (bilateral common)"],
        red_flags: ["Sudden non-weight-bearing (CCL rupture secondary to luxation)","Rapid grade progression","Persistent post-op lameness"],
        followup: "Grade I: recheck q6 months; surgical cases: recheck 2 weeks, 6 weeks, 3 months; prognosis excellent with timely surgery",
        prognosis: "excellent"
      }
    },

    {
      id: "osteochondrosis_dissecans",
      name: "Osteochondrosis Dissecans (OCD)",
      species: ["dog"],
      category: "Orthopedics",
      signals: {
        complaints_limping: 9, gait_moderate_lameness: 8, gait_non_weight: 6,
        limbs_joint_pain: 8, limbs_joint_swelling: 7, limbs_reduced_rom: 6,
        hpi_onset_subacute: 6, age_young: 9, age_puppy: 7,
        weight_large: 7, weight_giant: 8,
        breed_labrador: 7, breed_golden: 7, breed_great_dane: 7,
        breed_rottweiler: 6
      },
      tests: {
        tier1: ["Radiography (subchondral bone flattening, joint effusion, OCD flap)","Physical exam — joint effusion, pain on extension/flexion"],
        tier2: ["CT scan (cartilage flap visualization)","MRI (early lesion)","Arthrocentesis (serosanguineous fluid)"],
        tier3: ["Referral: veterinary orthopedic surgeon","Arthroscopy (diagnostic + therapeutic)"]
      },
      treatment: {
        medications: ["Meloxicam 0.1 mg/kg PO SID × 2–4 weeks (pain/inflammation)","Carprofen 4.4 mg/kg PO SID or 2.2 mg/kg BID","Tramadol 2–5 mg/kg PO BID-TID (adjunct pain)","Joint supplements: glucosamine + chondroitin","Adequan 4.4 mg/kg IM q3–5d × 4 doses (PSGAG)"],
        procedures: ["Arthroscopy with flap removal (GOLD STANDARD)","Open arthrotomy (if arthroscopy unavailable)","Conservative management (small, stable lesions only) — strict rest","Post-op physical rehabilitation"],
        diet: ["Controlled growth diet (puppy — avoid over-supplementation)","Maintain ideal body weight","Avoid high-calcium supplementation in growing dogs"]
      },
      education: {
        monitor: ["Lameness grade","Joint effusion","Post-surgical ROM and pain","Contralateral shoulder (bilateral ~50%)"],
        red_flags: ["Severe lameness (non-weight-bearing) — aggressive intervention needed","Joint mouse causing locking","Post-op failure to improve"],
        followup: "Radiograph at 6–8 weeks post-surgery; recheck 2 weeks, 6 weeks, 3 months; controlled activity for 6–8 weeks post-op",
        prognosis: "good"
      }
    },

    {
      id: "immune_mediated_polyarthritis",
      name: "Immune-Mediated Polyarthritis (IMPA)",
      species: ["dog","cat"],
      category: "Orthopedics / Immunology",
      signals: {
        complaints_limping: 8, gait_moderate_lameness: 7,
        limbs_joint_swelling: 8, limbs_joint_pain: 8,
        temp_high: 7, complaints_lethargy: 7,
        hpi_onset_subacute: 6, lymph_mild: 5,
        attitude_qar: 6, age_middle: 5, breed_german_shepherd: 4
      },
      tests: {
        tier1: ["Arthrocentesis (multiple joints) — elevated non-degenerate neutrophils (DIAGNOSTIC)","CBC (neutrophilia)","Chemistry","Urinalysis"],
        tier2: ["ANA titer","RF (rheumatoid factor)","Rickettsial panel (Ehrlichia, Rickettsia — can trigger)","Lyme serology","Radiography (soft tissue swelling — non-erosive in most)","Thoracic radiograph (neoplasia, infection)"],
        tier3: ["CT full body (occult neoplasia causing reactive IMPA)","Referral: internist"]
      },
      treatment: {
        medications: ["Prednisolone 2–3 mg/kg PO SID × 4 weeks, then taper over 3–6 months","Azathioprine 2 mg/kg PO SID (add if poor steroid response or dose-limiting side effects)","Leflunomide 2–4 mg/kg PO SID (alternative — refractory)","Doxycycline 5 mg/kg PO BID × 28d (if tick-borne suspected)"],
        procedures: ["Identify and treat underlying cause (drug reaction, infection, neoplasia)","Remove offending drug if drug-induced IMPA","Physical rest during acute phase"],
        diet: ["High-protein diet to offset steroid catabolism","Omega-3 supplementation"]
      },
      education: {
        monitor: ["Joint swelling resolution","CBC (bone marrow suppression with azathioprine)","Lameness score","Steroid side effects","Relapse on dose reduction"],
        red_flags: ["Erosive arthritis (rare — rheumatoid type)","Septic arthritis (monoarthritis, bacteria on cytology)","Neoplasia triggering reactive IMPA"],
        followup: "Recheck 4 weeks; arthrocentesis recheck at 6–8 weeks (cell count should normalize); minimum 3–6 month treatment course",
        prognosis: "fair"
      }
    },

    {
      id: "hypertrophic_osteodystrophy",
      name: "Hypertrophic Osteodystrophy (HOD)",
      species: ["dog"],
      category: "Orthopedics",
      signals: {
        complaints_limping: 8, limbs_joint_swelling: 8, limbs_joint_pain: 8,
        temp_high: 7, complaints_lethargy: 7, complaints_anorexia: 6,
        age_puppy: 9, age_young: 8,
        weight_large: 7, weight_giant: 8,
        breed_great_dane: 7, breed_doberman: 6, breed_german_shepherd: 6,
        breed_weimaraner: 7
      },
      tests: {
        tier1: ["Radiography — metaphyseal lucent zone (double physeal line / 'scorbutic zone') — DIAGNOSTIC","CBC (leukocytosis)","Chemistry (alkaline phosphatase elevated — normal in growing dogs)"],
        tier2: ["Vitamin C level (rarely low — not etiology)","Culture (rule out infectious)","Tick-borne panel if endemic area"],
        tier3: ["Referral if recurrent or severe — internist/orthopedist"]
      },
      treatment: {
        medications: ["NSAIDs: Meloxicam 0.1 mg/kg PO SID OR Carprofen 2.2 mg/kg PO BID × 7–14d","Prednisolone 0.5–1 mg/kg PO SID (severe systemic disease only — short course)","Analgesics: Gabapentin 10 mg/kg PO BID + Tramadol 2–5 mg/kg PO BID-TID (severe pain)","IV fluids and nutritional support (hospitalized cases)"],
        procedures: ["Strict rest during acute phase","Soft bedding — padded environment","Nutritional reassessment (avoid over-supplementation of Ca, Vit D)","Monitor for Weimaraner systemic form (life-threatening)"],
        diet: ["STOP all calcium/vitamin D supplementation immediately","Balanced commercial puppy food — NO add-ons","Large/giant breed puppy formula (controlled growth)"]
      },
      education: {
        monitor: ["Temperature","Pain level","Weight-bearing ability","Recurrence (episodes may recur until physeal closure)"],
        red_flags: ["Severe systemic disease (fever >40.5°C, collapse) — Weimaraner form","Non-responsive to NSAIDs × 48h","Angular limb deformity from repeated episodes"],
        followup: "Recheck in 5–7 days; most resolve by 1 year; discontinue all supplements; adjust diet to large-breed puppy food",
        prognosis: "good"
      }
    },

    {
      id: "bone_fracture",
      name: "Fracture (Long Bone / Pelvis / Vertebral)",
      species: ["dog","cat"],
      category: "Orthopedics / Trauma",
      emergency: true,
      signals: {
        complaints_limping: 9, gait_non_weight: 9, limbs_joint_pain: 8,
        complaints_trauma: 9, hpi_onset_sudden: 10,
        complaints_swelling_mass: 6, complaints_behavioral: 6,
        mm_pale: 5, hr_high: 5
      },
      tests: {
        tier1: ["Radiography — fracture classification (open/closed, comminuted, greenstick, physeal)","PCV/TS (trauma)","CBC/chemistry"],
        tier2: ["Thoracic/abdominal radiograph (concurrent trauma)","Abdominal FAST ultrasound","Blood pressure","Urine output (renal perfusion)"],
        tier3: ["CT scan (complex pelvic/vertebral fractures, pre-surgical planning)","Referral: veterinary orthopedic surgeon"]
      },
      treatment: {
        medications: ["Analgesics: Methadone 0.2–0.4 mg/kg IV/IM q4–6h (acute)","Buprenorphine 0.01–0.02 mg/kg IV/IM q6–8h (alternative)","Meloxicam 0.1 mg/kg PO SID (post-stabilisation, NOT in shock)","Cephalexin 22 mg/kg PO BID × 7–10d (open fracture)","IV fluid resuscitation if traumatic shock"],
        procedures: ["EXTERNAL: Temporary splinting/coaptation (stabilise before surgery)","INTERNAL: ORIF — plating, pinning, interlocking nail","Closed: Cast/external fixator (select cases)","Open fracture: thorough lavage, debridement, surgery within 24h","Wound management"],
        diet: ["High protein and calcium diet during healing (8–12 weeks)","Controlled exercise restriction per fracture type"]
      },
      education: {
        monitor: ["Limb swelling/pain","Wound care (open fractures)","Weight-bearing progress","Radiograph at 4–6 weeks (healing)"],
        red_flags: ["Open fracture contamination","Loss of sensation/motor below fracture (spinal)","Vascular compromise (limb cold/pale/pulseless)","Implant failure or infection"],
        followup: "Radiograph at 4–6 weeks, 8–10 weeks for healing assessment; physeal fractures in young animals: check for growth arrest",
        prognosis: "good"
      }
    },

    // ═══════════════════════════ REPRODUCTIVE EXPANDED ══════════════════════

    {
      id: "eclampsia",
      name: "Eclampsia (Puerperal Hypocalcemia)",
      species: ["dog","cat"],
      category: "Reproductive",
      emergency: true,
      signals: {
        complaints_seizures: 9, complaints_behavioral: 8, complaints_collapse: 8,
        neuro_seizure: 9, neuro_disoriented: 7, temp_high: 8,
        hr_high: 7, complaints_lethargy: 6,
        sex_female_intact: 9, hpi_onset_sudden: 9,
        age_middle: 5, weight_small: 6
      },
      tests: {
        tier1: ["Blood ionized calcium (CRITICAL LOW — <0.8 mmol/L)","Blood glucose (concurrent hypoglycemia possible)","ECG (QT prolongation, arrhythmia)"],
        tier2: ["CBC/chemistry","Phosphorus"],
        tier3: []
      },
      treatment: {
        medications: ["Calcium gluconate 10% 50–150 mg/kg IV slowly over 10–20 min with ECG monitoring (EMERGENCY)","Calcium gluconate SC diluted (maintenance 50–150 mg/kg/day divided — once stable)","Calcium carbonate 25–50 mg/kg PO BID (oral — ongoing)","Diazepam 0.5 mg/kg IV (active seizure control)","Vitamin D3 (calcitriol) 0.01–0.02 μg/kg PO SID (improve absorption)"],
        procedures: ["Remove pups from nursing IMMEDIATELY — stop calcium drain","Cool patient if hyperthermia","ICU monitoring during IV calcium","Wean pups if recurrent eclampsia"],
        diet: ["Resume balanced diet immediately post-crisis","Calcium-containing diet or supplement lifelong if recurrent","Puppy milk replacer if pups removed"]
      },
      education: {
        monitor: ["Ionized calcium q4–12h during acute phase","Heart rhythm during IV calcium","Body temperature","Recurrence risk (high if pups nursing)"],
        red_flags: ["Cardiac arrhythmia during IV calcium — STOP infusion immediately, slow down if bradycardia","Temperature >41°C","Seizure not controlled with calcium + diazepam"],
        followup: "Discharge with oral calcium supplementation; pups on supplemental feeding; recheck calcium in 48–72h; recurrent = supplement in all future lactations",
        prognosis: "good"
      }
    },

    {
      id: "vaginal_hyperplasia",
      name: "Vaginal Hyperplasia / Vaginal Prolapse",
      species: ["dog"],
      category: "Reproductive",
      signals: {
        complaints_swelling_mass: 9, complaints_behavioral: 6,
        sex_female_intact: 9, hpi_recent_estrus: 9,
        hpi_onset_subacute: 7, complaints_dysuria: 5,
        age_young: 5, age_middle: 5,
        breed_bulldog: 6, breed_boxer: 5, breed_labrador: 4
      },
      tests: {
        tier1: ["Physical exam — vaginal tissue protrusion","Vaginoscopy (classify type I–III)","Urinalysis + culture (secondary UTI)"],
        tier2: ["Vaginal cytology (confirm estrus)","Progesterone level","CBC/chemistry (surgical candidate)"],
        tier3: []
      },
      treatment: {
        medications: ["Lubrication: KY jelly or petroleum jelly topical (prevent desiccation)","Broad-spectrum antibiotics (amoxicillin-clavulanate) if infection","Pain: Meloxicam 0.1 mg/kg PO SID if discomfort"],
        procedures: ["Type I (hyperplasia): conservative — monitor through estrus end, spontaneous resolution","Type II–III (prolapse): Manual reduction under sedation + purse-string suture","Spay (OVH) — DEFINITIVE — prevents recurrence","Surgical resection of necrotic tissue (advanced cases)"],
        diet: ["No specific restriction"]
      },
      education: {
        monitor: ["Tissue health (desiccation/necrosis)","Urination ability","Estrus cycle monitoring","Resolution after estrus"],
        red_flags: ["Tissue necrosis (dark/black coloration)","Complete urethral obstruction","Not returning to normal 4 weeks post-estrus"],
        followup: "Recheck weekly until resolved; recommend spay after resolution (or during estrus at specialist centre); will recur in subsequent estrus without spay",
        prognosis: "excellent"
      }
    },

    {
      id: "feline_pyometra",
      name: "Feline Pyometra / Uterine Infection",
      species: ["cat"],
      category: "Reproductive",
      emergency: true,
      signals: {
        complaints_lethargy: 8, complaints_anorexia: 8, complaints_polyuria: 6,
        complaints_polydipsia: 6, complaints_vomiting: 6, complaints_abdominal_distension: 7,
        temp_high: 6, temp_low: 4,
        vulvar_mucopurulent: 8, sex_female_intact: 9,
        age_old: 6, age_middle: 5
      },
      tests: {
        tier1: ["Abdominal ultrasound (uterine distension — DIAGNOSTIC)","CBC (leukocytosis, left shift — open pyometra; leukopenia — closed/severe)","Chemistry (renal/hepatic — sepsis effects)","Radiography (uterine enlargement)"],
        tier2: ["Urinalysis + culture (concurrent UTI)","Blood culture if septic","Electrolytes"],
        tier3: []
      },
      treatment: {
        medications: ["IV fluid resuscitation (LRS + 0.9% NaCl)","Broad-spectrum antibiotics: Amoxicillin-clavulanate 12.5 mg/kg IV/PO BID + Enrofloxacin 5 mg/kg IV/PO SID","Aglepristone (progesterone antagonist) 10 mg/kg SC q24h × 2d + Cabergoline 5 μg/kg PO SID × 7d (conservative — breeding animals only)"],
        procedures: ["OVARIOHYSTERECTOMY — DEFINITIVE TREATMENT (GOLD STANDARD)","Pre-op stabilisation × 4–12h before surgery","Post-op antibiotics × 7–14d","ICU monitoring if septic"],
        diet: ["NPO pre-surgery","Nutritional support post-surgery"]
      },
      education: {
        monitor: ["Temperature post-surgery","Wound healing","Urine output","CBC 3–5 days post-surgery"],
        red_flags: ["Septic shock (hypothermia, hypotension)","Closed pyometra — no external discharge — more dangerous","Uterine rupture"],
        followup: "Discharge when stable — 3–5 days post-op; recheck in 10–14d; spay prevents recurrence and eliminates pyometra risk permanently",
        prognosis: "good"
      }
    },

    {
      id: "retained_fetal_membranes",
      name: "Retained Fetal Membranes / Dystocia",
      species: ["dog","cat"],
      category: "Reproductive",
      emergency: true,
      signals: {
        complaints_behavioral: 7, complaints_lethargy: 6, complaints_anorexia: 6,
        vulvar_mucopurulent: 7, vulvar_bloody: 5,
        sex_female_intact: 9, temp_high: 6,
        hpi_onset_sudden: 7, age_middle: 5, age_old: 4
      },
      tests: {
        tier1: ["Physical exam — vulvar discharge, uterine palpation","Abdominal radiograph (fetal count, retained pup)","Abdominal ultrasound (fetal heartbeat, viable vs non-viable)"],
        tier2: ["CBC/chemistry","Progesterone level","Blood glucose (dystocia — exhaustion)"],
        tier3: []
      },
      treatment: {
        medications: ["PRIMARY UTERINE INERTIA: Oxytocin 0.5–2 IU/kg IM q30min × 2–3 doses ONLY if cervix open + calcium given first","Calcium gluconate 10% 50 mg/kg SC (before oxytocin to enhance myometrial contractility)","IV glucose if hypoglycemic","Antibiotics post-partum if retained membranes: Amoxicillin-clavulanate 12.5 mg/kg PO BID × 10d"],
        procedures: ["Digital extraction (experienced hands — gentle rotation/traction)","Emergency C-section (obstruction, fetal distress, >2h between pups, primary inertia unresponsive)","OVH if breeding future not planned + fetal death/uterine infection"],
        diet: ["High-calorie food for nursing dam post-partum","Calcium-rich diet or supplement to prevent eclampsia"]
      },
      education: {
        monitor: ["Pup count (compare to radiograph)","Uterine discharge post-partum (green-black early = normal, purulent = infection)","Nursing ability","Maternal temperature"],
        red_flags: ["Green discharge without pup delivery within 1h — emergency",">4h between pups","Severe straining without delivery","Collapse or shock"],
        followup: "Post-partum recheck 24–48h; radiograph to confirm all fetuses delivered; C-section dam: suture recheck at 10–14d",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ EXOTIC / RABBIT EXPANDED ═══════════════════

    {
      id: "rabbit_dental_disease",
      name: "Rabbit Dental Disease (Molar Spur / Malocclusion)",
      species: ["rabbit"],
      category: "Exotic / Dental",
      signals: {
        complaints_anorexia: 9, complaints_weight_loss: 9,
        complaints_behavioral: 7, complaints_eye_discharge: 5,
        eyes_discharge_serous: 6, hpi_onset_chronic: 7,
        hpi_progression_worsening: 6, bcs_thin: 7
      },
      tests: {
        tier1: ["Oral exam under sedation (molar spurs, tongue entrapment)","Skull radiography (root elongation, apical abscess)"],
        tier2: ["CT skull (gold standard — superior to radiograph for rabbit dental)","Weight measurement serial"],
        tier3: ["Referral: exotic animal vet with dental experience"]
      },
      treatment: {
        medications: ["Meloxicam 0.5–1 mg/kg PO SID (pain)","Enrofloxacin 5–10 mg/kg PO BID (dental abscess)","Metronidazole 20 mg/kg PO BID (anaerobic infection)","Syringe feeding: Critical Care (Oxbow) 10–15 mL/kg TID-QID"],
        procedures: ["Dental burring (molar spur reduction) under GA","Incisor trimming or extraction (malocclusion)","Abscess: debridement and marsupialization (rabbit jaw abscess resistant to standard drainage)","Serial dental procedures every 3–12 months"],
        diet: ["70–80% diet should be unlimited hay (wears down teeth)","Reduce pellets","Fresh leafy greens daily","Avoid sugary treats"]
      },
      education: {
        monitor: ["Daily food intake and fecal output","Weight weekly","Eye discharge (nasolacrimal duct obstruction from tooth roots)","Pain signs (tooth grinding, hunched posture)"],
        red_flags: ["Complete anorexia >12h in rabbit = GI stasis risk — EMERGENCY","Rapid weight loss","Jaw swelling (abscess)"],
        followup: "Dental recheck every 3–6 months; CT skull annually in severely affected; lifelong dietary management essential",
        prognosis: "fair"
      }
    },

    {
      id: "rabbit_uterine_adenocarcinoma",
      name: "Rabbit Uterine Adenocarcinoma",
      species: ["rabbit"],
      category: "Exotic / Oncology / Reproductive",
      signals: {
        complaints_hematuria: 8, vulvar_bloody: 7, complaints_weight_loss: 7,
        complaints_behavioral: 6, complaints_abdominal_distension: 5,
        sex_female_intact: 9, age_old: 8, age_middle: 6
      },
      tests: {
        tier1: ["Abdominal ultrasound (uterine mass)","Radiography (metastasis — lungs, liver)","CBC/chemistry"],
        tier2: ["Fine needle aspirate (FNA) of mass","CT thorax/abdomen (staging)"],
        tier3: ["Histopathology post-OVH"]
      },
      treatment: {
        medications: ["Analgesics: Meloxicam 0.5–1 mg/kg PO SID","Supportive care pre-op","Chemotherapy (limited evidence in rabbits)"],
        procedures: ["OVH (ovariohysterectomy) — DEFINITIVE if no metastasis","Staging CT before surgery","Palliative care if metastatic"],
        diet: ["High-fiber, high-calorie diet","Syringe feed if inappetent"]
      },
      education: {
        monitor: ["Post-surgical healing","Body weight","Respiratory signs (pulmonary metastasis)"],
        red_flags: ["Pulmonary metastasis on radiograph (poor prognosis)","Sudden hemorrhage","Complete anorexia"],
        followup: "OVH: recheck 10–14d; thoracic radiograph 1 month post-op; prevention by spaying females <2 years old (90% develop by age 4 in intact does)",
        prognosis: "fair"
      }
    },

    {
      id: "avian_proventricular_dilation",
      name: "Proventricular Dilatation Disease (PDD) — Psittacine",
      species: ["bird"],
      category: "Exotic / Avian / Gastroenterology",
      signals: {
        complaints_weight_loss: 9, complaints_vomiting: 8, complaints_anorexia: 8,
        complaints_diarrhea: 6, complaints_behavioral: 6,
        skin_poor_coat: 5, hpi_onset_chronic: 7,
        hpi_progression_worsening: 7
      },
      tests: {
        tier1: ["Crop wash cytology","Whole body radiography (proventricular dilation)","CBC/chemistry"],
        tier2: ["Avian Bornavirus PCR (blood/feces/tissue) — DIAGNOSTIC","Proventriculotomy biopsy","Abdominal ultrasound"],
        tier3: ["Referral: avian specialist"]
      },
      treatment: {
        medications: ["Celecoxib 10 mg/kg PO BID (COX-2 inhibitor — reduces inflammation; shown to improve survival)","Meloxicam 1–2 mg/kg PO BID (anti-inflammatory)","Supportive: probiotics, digestive enzymes","No specific antiviral — supportive management"],
        procedures: ["Easily digestible food (soft, pre-soaked pellets, cooked grains)","Quarantine — PDD is contagious to other psittacines","Biosecurity management"],
        diet: ["Easily digestible mash/soft food","Avoid seeds (hard to digest)","Offer food in small amounts frequently","Warm food to improve palatability"]
      },
      education: {
        monitor: ["Weight daily","Crop emptying time","Fecal consistency","Neurological signs (PDD affects nerves)"],
        red_flags: ["Neurological signs (falling, head tremor, seizures)","Complete anorexia","Rapid weight loss >10%"],
        followup: "Recheck weekly; lifelong management; quarantine new birds; disease often fatal — palliative and supportive goal",
        prognosis: "guarded"
      }
    },

    {
      id: "avian_aspergillosis",
      name: "Aspergillosis — Avian",
      species: ["bird"],
      category: "Exotic / Avian / Respiratory",
      signals: {
        complaints_dyspnea: 9, complaints_lethargy: 8, complaints_weight_loss: 7,
        complaints_anorexia: 7, complaints_behavioral: 6,
        temp_high: 5, hpi_onset_subacute: 6,
        env_indoor: 4, stress_event: 6
      },
      tests: {
        tier1: ["Whole body radiography (air sac thickening, lung infiltrate)","CBC (monocytosis, heterophilia)","Serum chemistry"],
        tier2: ["Aspergillus antibody titer / Galactomannan assay","Tracheal/cloacal culture","Endoscopy (air sac white plaques — DIAGNOSTIC)","PCR Aspergillus (tissue)"],
        tier3: ["CT body (air sac lesion extent)","Referral: avian specialist"]
      },
      treatment: {
        medications: ["Voriconazole 12–18 mg/kg PO BID (FIRST-LINE — most effective)","Itraconazole 5–10 mg/kg PO BID (alternative)","Amphotericin B nebulization 1 mg/mL × 15 min BID (airway lesions)","Terbinafine 15–25 mg/kg PO BID (adjunct)"],
        procedures: ["Nebulization therapy","Surgical debridement of granulomas (endoscopic)","Remove predisposing stressors","Improve husbandry and ventilation","Avoid dusty/moldy substrate"],
        diet: ["Improve overall nutrition — complete pelleted diet","Remove seed-only diet (nutritional deficiency predisposes)","Fresh fruits/vegetables"]
      },
      education: {
        monitor: ["Breathing quality","Weight","CBC response","Antifungal drug hepatotoxicity (liver enzymes)"],
        red_flags: ["Respiratory failure","CBC worsening despite treatment","Neurological signs (CNS aspergillosis)"],
        followup: "Recheck at 2–4 weeks; treatment minimum 3–6 months; prognosis depends on severity at diagnosis — chronic cases often fatal without early treatment",
        prognosis: "guarded"
      }
    },

    {
      id: "reptile_metabolic_bone",
      name: "Metabolic Bone Disease (MBD) — Reptile",
      species: ["exotic"],
      category: "Exotic / Reptile / Nutritional",
      signals: {
        complaints_limping: 8, gait_ataxia: 7, complaints_behavioral: 7,
        complaints_seizures: 6, neuro_seizure: 5,
        skin_poor_coat: 5, age_young: 8, bcs_thin: 6
      },
      tests: {
        tier1: ["Whole body radiography (decreased bone density, pathological fractures, deformities)","Blood ionized calcium + phosphorus (hypocalcemia)","CBC/chemistry"],
        tier2: ["25-OH Vitamin D3 level","PTH-rp (parathyroid hormone related peptide)","Housing/husbandry review (UVB exposure, diet)"],
        tier3: ["Referral: reptile specialist / exotic vet"]
      },
      treatment: {
        medications: ["Calcium gluconate 50–100 mg/kg SC (acute hypocalcemia)","Oral calcium: calcium carbonate 50–100 mg/kg PO BID (maintenance)","Vitamin D3: calcitriol 0.02–0.1 μg/kg PO SID (deficiency)","Analgesics: Meloxicam 0.5 mg/kg IM/PO SID (fracture pain)"],
        procedures: ["Correct husbandry IMMEDIATELY — UVB light (12h/day), temperature gradient","Calcium/phosphorus dust on food (calcium:phosphorus 2:1)","Splinting of deformed/fractured limbs"],
        diet: ["Calcium-dusted prey or vegetables","Gut-loaded feeder insects (crickets, mealworms)","UVB exposure mandatory for D3 synthesis in most lizards","Eliminate all-meat diets (phosphorus excess)"]
      },
      education: {
        monitor: ["Radiographic bone density","Calcium levels","Limb function","UVB bulb efficacy (replace every 6 months even if still lit)"],
        red_flags: ["Pathological fracture","Tetanic seizures (profound hypocalcemia)","Complete inability to lift body"],
        followup: "Recheck radiograph at 4–6 weeks; calcium and phosphorus every 2 months; husbandry correction is primary treatment",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ INFECTIOUS / TROPICAL ══════════════════════

    {
      id: "canine_monocytic_ehrlichiosis",
      name: "Canine Monocytic Ehrlichiosis (CME) — Tropical",
      species: ["dog"],
      category: "Infectious Disease / Tropical",
      signals: {
        complaints_lethargy: 8, complaints_anorexia: 8, complaints_bleeding: 7,
        complaints_weight_loss: 7, mm_pale: 7,
        lymph_moderate: 6, lymph_severe: 5,
        temp_high: 7, spleen_splenomegaly: 6,
        hpi_onset_subacute: 6, env_outdoor: 7,
        parasites_tick: 9, env_endemic_area: 8
      },
      tests: {
        tier1: ["CBC — thrombocytopenia (HALLMARK), anemia, leukopenia","Morulae on blood smear (buffy coat — low sensitivity)","Ehrlichia canis SNAP test (antigen)"],
        tier2: ["Ehrlichia canis PCR blood (high sensitivity)","Ehrlichia canis serology (IFA — titer)","Chemistry: elevated liver enzymes, hypoalbuminemia, hyperglobulinemia","Bone marrow aspirate (aplasia in chronic stage)"],
        tier3: ["FISH / sequencing (co-infections)","Referral: internist"]
      },
      treatment: {
        medications: ["Doxycycline 10 mg/kg PO SID OR 5 mg/kg PO BID × 28 days (GOLD STANDARD — minimum 28 days even if improved)","Prednisolone 0.5–1 mg/kg PO SID × 7–14d (immune-mediated thrombocytopenia — severe thrombocytopenia <20,000)","Whole blood or pRBC transfusion if PCV <15%","Platelet-rich plasma if severe bleeding"],
        procedures: ["Tick removal and tick control (Isoxazoline — fluralaner, sarolaner)","Monthly preventive tick treatment ongoing","Test in-contact dogs"],
        diet: ["Normal complete diet","Soft food if oral bleeding"]
      },
      education: {
        monitor: ["CBC weekly × 4 weeks (platelet and PCV recovery)","Serology at 6 months (negative titer = cure)","Tick burden reassessment","Signs of relapse"],
        red_flags: ["Spontaneous hemorrhage (epistaxis, gingival bleeding)","PCV <15% (emergency transfusion)","Pancytopenia + hypocellular bone marrow (poor prognosis)","Chronic stage with aplasia"],
        followup: "CBC at 2 weeks, 4 weeks, 3 months; titer at 6 months; full 28 days doxycycline essential even if improved; tick control lifelong",
        prognosis: "fair"
      }
    },

    {
      id: "feline_panleukopenia",
      name: "Feline Panleukopenia (Feline Parvovirus)",
      species: ["cat"],
      category: "Infectious Disease",
      emergency: true,
      signals: {
        complaints_vomiting: 9, complaints_diarrhea: 8, complaints_lethargy: 9,
        complaints_anorexia: 9, complaints_abdominal_distension: 5,
        temp_high: 7, temp_low: 6,
        mm_pale: 7, hydration_moderate: 7, hydration_severe: 8,
        attitude_obtunded: 6, attitude_dull: 7,
        age_kitten: 9, vaccine_never: 8, vaccine_overdue: 7,
        env_contact_stray: 8, env_kennel: 7
      },
      tests: {
        tier1: ["CPV2 (Canine Parvovirus 2 SNAP test — cross-reacts with FPV)","CBC — leukopenia/neutropenia (HALLMARK)","PCV/TS (dehydration)"],
        tier2: ["Fecal PCR (FPV)","Chemistry panel","Electrolytes"],
        tier3: ["Fecal electron microscopy (specialized)"]
      },
      treatment: {
        medications: ["IV fluid resuscitation — LRS or Normosol at shock rate then maintenance","Ampicillin 22 mg/kg IV TID (gram-positive coverage)","Enrofloxacin 5 mg/kg IV/SC SID (gram-negative — avoid <8 weeks, causes cartilage damage)","Maropitant 1 mg/kg SC SID (antiemetic)","Interferon omega 1–2.5 MU SC SID × 5d (antiviral — some evidence in cats)","Whole blood/pRBC transfusion if PCV <15%","B-vitamins in fluids (B complex)"],
        procedures: ["Strict isolation (shed virus 6 weeks — bleach disinfect)","Nutritional support (NE tube or syringe feeding)","Thermal support (hypothermic kittens)","Monitor glucose q4–6h (hypoglycemia in kittens)"],
        diet: ["NPO while vomiting","Introduce liquid food when vomiting stops","High-calorie kitten diet during recovery"]
      },
      education: {
        monitor: ["Temperature q4–8h","CBC q24–48h (neutrophil recovery = improving)","Vomiting frequency","Dehydration","Glucose"],
        red_flags: ["WBC <1,000/μL (severe pancytopenia)","Septic shock signs","Hypothermia","Failure to improve after 48h IV support"],
        followup: "Hospitalize until eating and WBC recovering; isolate 6 weeks post-discharge; VACCINATION is critical prevention",
        prognosis: "guarded"
      }
    },

    {
      id: "feline_infectious_peritonitis_wet",
      name: "Feline Infectious Peritonitis — Wet Form (FIP)",
      species: ["cat"],
      category: "Infectious Disease",
      emergency: true,
      signals: {
        complaints_abdominal_distension: 9, abdomen_fluid_wave: 9,
        complaints_lethargy: 8, complaints_anorexia: 8,
        complaints_weight_loss: 8, complaints_dyspnea: 6,
        resp_muffled: 7, mm_icteric: 5, temp_high: 6,
        age_kitten: 7, age_young: 7,
        env_kennel: 7, env_contact_stray: 6
      },
      tests: {
        tier1: ["Abdominal fluid tap — effusion analysis (yellow, viscous, high protein >35 g/L, Rivalta test positive)","CBC (non-regenerative anemia, lymphopenia)","Chemistry (hyperglobulinemia — A:G ratio <0.8)"],
        tier2: ["FCoV PCR in effusion (high sensitivity/specificity in effusion)","FCoV titer (serology — only supportive)","FIP immunofluorescence (FCoV antigen in macrophages)","RT-PCR for biotype mutation (FIPV-specific sequence)"],
        tier3: ["Referral: feline internist","Specialist for GS-441524 treatment access"]
      },
      treatment: {
        medications: ["GS-441524 antiviral 4–8 mg/kg SC SID × 12 weeks (HIGHLY EFFECTIVE — remission in >80%)","Prednisolone 2 mg/kg PO SID × 2 weeks then taper (adjunct — reduce inflammation while antiviral takes effect)","Polyprenyl immunostimulant (PPI) — some evidence, adjunct","Maropitant 1 mg/kg SC SID (vomiting control)"],
        procedures: ["Abdominocentesis (therapeutic drainage of effusion — improves breathing)","Nutritional support (assisted feeding if anorexic)","GS-441524 monitoring: CBC, protein, bilirubin every 2 weeks"],
        diet: ["High-protein, calorie-dense diet","Appetite stimulant: Mirtazapine 1.88 mg/cat PO q48–72h"]
      },
      education: {
        monitor: ["Abdominal effusion recurrence","Body weight","Appetite","CBC and protein trends","Neurological signs (neurological FIP)"],
        red_flags: ["Rapidly re-accumulating effusion despite GS-441524 — may need dose increase","Neurological deterioration","Complete anorexia for >3 days"],
        followup: "GS-441524 12-week course; recheck at 4, 8, 12 weeks; many cats achieve long-term remission; relapse: restart GS-441524; effusions typically resolve within 2–4 weeks",
        prognosis: "fair"
      }
    },

    {
      id: "canine_brucellosis",
      name: "Canine Brucellosis",
      species: ["dog"],
      category: "Infectious Disease / Zoonosis",
      signals: {
        complaints_lethargy: 7, complaints_weight_loss: 6,
        complaints_behavioral: 6, lymph_moderate: 6, lymph_severe: 5,
        sex_male_intact: 6, sex_female_intact: 6,
        env_contact_stray: 7, env_kennel: 8,
        hpi_onset_chronic: 6
      },
      tests: {
        tier1: ["Brucella canis RSAT (Rapid Slide Agglutination Test) — screening","CBC/chemistry"],
        tier2: ["Brucella canis AGID (Agar Gel Immunodiffusion) — confirmatory","Brucella canis PCR (blood, semen, vaginal discharge)","Culture blood/semen (BSL-2 precaution)","Semen evaluation (teratospermia, poor motility)","Reproductive ultrasound (orchitis, epididymitis, uterine lesion)"],
        tier3: ["Referral: infectious disease specialist","Serology at 4 weeks interval"]
      },
      treatment: {
        medications: ["Doxycycline 10 mg/kg PO SID × 28 days + Enrofloxacin 5 mg/kg PO SID × 28 days (combination)","OR: Doxycycline 10 mg/kg PO SID × 28 days + Gentamicin 2.5 mg/kg IM SID × 7 days","NOTE: treatment reduces but does NOT eliminate infection — relapses common"],
        procedures: ["Neutering (recommended — reduces shedding and replication)","Strict isolation from other dogs during treatment","Disinfect environment (2% bleach)","Report to authorities in countries with notifiable disease status"],
        diet: ["Normal complete diet"]
      },
      education: {
        monitor: ["Serology at 3–6 months post-treatment","Clinical signs","Co-habitating dogs — test all","Breeder testing protocols"],
        red_flags: ["Zoonotic risk — INFORM OWNER (Brucella canis can infect humans — immunocompromised most at risk)","Discospondylitis (spinal infection — severe)","Uveitis — ocular brucellosis"],
        followup: "Serology recheck at 3 and 6 months; negative titer × 2 at 3-month intervals = likely cleared; breeding animals should be neutered; notify breeding contacts",
        prognosis: "guarded"
      }
    },

    {
      id: "cryptococcosis",
      name: "Cryptococcosis",
      species: ["dog","cat"],
      category: "Infectious Disease / Fungal / Tropical",
      signals: {
        complaints_nasal_discharge: 8, complaints_sneezing: 7, complaints_behavioral: 7,
        nose_mucopurulent: 7, complaints_swelling_mass: 7,
        neuro_disoriented: 6, neuro_seizure: 5,
        complaints_lethargy: 7, complaints_weight_loss: 6,
        env_outdoor: 6, env_endemic_area: 7,
        hpi_onset_subacute: 6, felv_fiv_positive: 7
      },
      tests: {
        tier1: ["Cryptococcus antigen latex agglutination test (LCAT) — blood/CSF/urine (HIGH SENSITIVITY)","CBC/chemistry","Nasal cytology or FNA of swelling (encapsulated yeast with wide halo — DIAGNOSTIC)"],
        tier2: ["MRI brain (CNS cryptococcosis)","CSF analysis + India ink preparation (yeast visible)","Fungal culture (blood, CSF, nasal discharge)","FeLV/FIV testing (cat)"],
        tier3: ["Referral: veterinary internist/neurologist","Antifungal susceptibility testing"]
      },
      treatment: {
        medications: ["Fluconazole 10 mg/kg PO SID (FIRST-LINE for nasal/non-CNS — WELL TOLERATED)","Itraconazole 5–10 mg/kg PO SID (alternative)","Amphotericin B 0.5–0.8 mg/kg IV 3×/week + Flucytosine 50 mg/kg PO TID (CNS disease — induction)","Fluconazole 10–15 mg/kg PO SID (consolidation + maintenance post-induction)"],
        procedures: ["Surgical debulking of nasal/skin lesions (large masses)","CSF tap for diagnosis and pressure relief (CNS)","Antifungal therapy minimum 6 months — often lifelong in cats","Monitor antigen titer trend"],
        diet: ["Normal supportive diet","Ensure adequate hydration (amphotericin B nephrotoxic)"]
      },
      education: {
        monitor: ["LCAT titer q4–8 weeks (decreasing = responding)","Neurological status","Renal function (amphotericin B)","Body weight","Lesion regression"],
        red_flags: ["Rising antigen titer on treatment (resistance/non-compliance)","Progressive neurological signs","Ocular involvement (blindness)","Renal impairment with amphotericin B"],
        followup: "Titer q8 weeks; minimum 6 months treatment; CNS cryptococcosis: minimum 12 months; negative titer + no signs × 2 consecutive tests = potential discontinuation",
        prognosis: "guarded"
      }
    },

    {
      id: "nocardiosis_actinomycosis",
      name: "Nocardiosis / Actinomycosis",
      species: ["dog","cat"],
      category: "Infectious Disease / Bacterial",
      signals: {
        complaints_dyspnea: 7, complaints_lethargy: 7, complaints_weight_loss: 6,
        complaints_swelling_mass: 7, complaints_coughing: 6,
        temp_high: 6, resp_muffled: 6,
        env_outdoor: 7, hpi_onset_subacute: 6,
        hpi_progression_worsening: 6, wounds_puncture: 5
      },
      tests: {
        tier1: ["Cytology of discharge/effusion (filamentous gram-positive branching rods — sulfur granules in Actinomyces)","Culture (specialized — anaerobic for Actinomyces)","Thoracic radiograph (pleural effusion, pyothorax)"],
        tier2: ["Aerobic + anaerobic culture + sensitivity","CBC (leukocytosis, left shift)","Chemistry","CT thorax/abdomen (draining tracts, abscess)"],
        tier3: ["PCR bacterial identification","Referral: internist/surgeon"]
      },
      treatment: {
        medications: ["Actinomycosis: Penicillin G 40,000 IU/kg IV TID then Amoxicillin 22 mg/kg PO TID × 3–6 months","Nocardiosis: TMP-SMX 15–30 mg/kg PO BID × 3–6 months (first-line)","Nocardiosis: Imipenem 5 mg/kg IV TID (severe)","Nocardiosis: Amikacin 15–25 mg/kg IV/IM SID (renal monitoring required)"],
        procedures: ["Surgical drainage of abscess/empyema","Chest tube (pyothorax)","Debridement of necrotic tissue","Long-term antibiotic (minimum 3–6 months for Nocardia)"],
        diet: ["Nutritional support during prolonged illness"]
      },
      education: {
        monitor: ["Chest radiograph q4–6 weeks","CBC and culture response","Drug toxicity (TMP-SMX: marrow suppression)","Relapse after antibiotic cessation"],
        red_flags: ["Pyothorax causing respiratory failure","Treatment failure at 4 weeks","CNS nocardiosis (rare but fatal)"],
        followup: "Minimum 3–6 months antibiotic therapy; relapse common if stopped early; culture + sensitivity guides treatment; prognosis good if diagnosed and treated aggressively",
        prognosis: "guarded"
      }
    },

    {
      id: "sporothricosis",
      name: "Sporotrichosis (Sporothrix schenckii)",
      species: ["cat","dog"],
      category: "Infectious Disease / Fungal / Zoonosis / Tropical",
      signals: {
        complaints_skin_lesions: 9, complaints_swelling_mass: 8,
        skin_papules: 8, skin_crusts: 7, skin_alopecia_focal: 6,
        hpi_onset_subacute: 7, env_outdoor: 7, env_contact_stray: 8,
        complaints_lethargy: 5, lymph_mild: 6, env_endemic_area: 8
      },
      tests: {
        tier1: ["Skin cytology/FNA (cigar-shaped yeasts — Sporothrix — diagnostic in cats)","Skin biopsy + fungal culture (gold standard)","CBC/chemistry"],
        tier2: ["Culture (Sabouraud agar — mold form)","Sporotrichosis serology","PCR identification"],
        tier3: ["Referral: dermatology/infectious disease specialist"]
      },
      treatment: {
        medications: ["Itraconazole 5–10 mg/kg PO SID × 3–6 months (FIRST-LINE)","Potassium iodide (SSKI) 40 mg/kg PO TID (historical — dogs only; NOT cats — toxic)","Terbinafine 30–40 mg/kg PO SID (alternative — cats)","Amphotericin B 0.25–0.5 mg/kg IV 3×/week (disseminated/CNS)"],
        procedures: ["Strict protective handling — ZOONOTIC RISK (cats highly infectious to humans)","Gloves and mask when handling infected cats","Wound drainage and cleaning","Treat all wounds on handler immediately"],
        diet: ["Normal supportive diet during antifungal therapy"]
      },
      education: {
        monitor: ["Lesion healing","CBC and liver enzymes (itraconazole hepatotoxicity)","Zoonotic exposure events — owner health","Treatment duration (minimum 1 month past clinical cure)"],
        red_flags: ["ZOONOTIC — CATS are HIGH-RISK source for human infection (especially immunocompromised)","Dissemination to lungs/CNS","Itraconazole-resistant strain (seek ID consult)"],
        followup: "Recheck monthly; treat minimum 3–6 months; public health notification in some regions; euthanasia considered if owner compliance risk (zoonosis).",
        prognosis: "fair"
      }
    },

    {
      id: "leishmaniasis_dog",
      name: "Canine Leishmaniasis",
      species: ["dog"],
      category: "Infectious Disease / Parasitic / Tropical / Zoonosis",
      signals: {
        complaints_weight_loss: 9, complaints_lethargy: 8, complaints_skin_lesions: 8,
        skin_alopecia_focal: 7, skin_alopecia_diffuse: 6, skin_crusts: 7,
        mm_pale: 6, lymph_moderate: 7, lymph_severe: 6,
        spleen_splenomegaly: 7, liver_hepatomegaly: 5,
        bcs_thin: 8, hpi_onset_chronic: 8, env_endemic_area: 9,
        env_outdoor: 7
      },
      tests: {
        tier1: ["Serology (IFAT or ELISA — Leishmania antibody titer)","CBC (non-regenerative anemia, thrombocytopenia)","Chemistry (hyperglobulinemia, hypoalbuminemia, elevated liver/renal markers)"],
        tier2: ["PCR blood or lymph node (Leishmania infantum/donovani)","Fine needle aspirate: lymph node, spleen, bone marrow — Leishman-Donovan bodies","Urine protein:creatinine (proteinuria — renal involvement)"],
        tier3: ["Renal biopsy (glomerulonephritis)","Referral: internist/infectious disease"]
      },
      treatment: {
        medications: ["Meglumine antimoniate (Glucantime) 75–100 mg/kg SC SID × 28–60 days (STANDARD)","Allopurinol 10 mg/kg PO BID (long-term maintenance — inhibits parasite purine synthesis — continues for life)","Miltefosine 2 mg/kg PO SID × 28 days (alternative to antimonials — oral)","Amphotericin B liposomal 3 mg/kg IV q48h × 5 doses (alternative for renal impaired)","Marbofloxacin + Allopurinol (alternative combination)"],
        procedures: ["Monthly monitoring CBC, chemistry, UPC","Sandfly vector control (deltamethrin-impregnated collar — Scalibor)","Restrict movement at dawn/dusk (sandfly peak feeding)"],
        diet: ["Renal prescription diet if proteinuria","Moderate protein, high-quality nutrition","Omega-3 supplementation"]
      },
      education: {
        monitor: ["CBC and chemistry q1–3 months","UPC monthly (renal monitoring)","Leishmania titer at 6–12 months","Body weight and condition"],
        red_flags: ["Renal failure (most common cause of death)","Pancytopenia","Drug toxicity (vomiting, diarrhea, elevated liver enzymes)","Progressive weight loss despite treatment"],
        followup: "Lifelong allopurinol in most cases; recheck q3 months; disease is NOT curable — controlled; notify veterinary authorities (notifiable in some countries); zoonotic",
        prognosis: "guarded"
      }
    },

    // ═══════════════════════════ NUTRITIONAL DISEASES ═══════════════════════

    {
      id: "taurine_deficiency_dcm",
      name: "Taurine Deficiency / Nutritional DCM",
      species: ["dog","cat"],
      category: "Cardiology / Nutritional",
      signals: {
        complaints_dyspnea: 8, complaints_lethargy: 8, complaints_coughing: 6,
        complaints_weight_loss: 6, cardiac_murmur_34: 6,
        resp_crackles_fine: 7, resp_muffled: 5,
        hpi_onset_chronic: 6, hpi_progression_worsening: 6,
        breed_golden: 8, breed_labrador: 6, breed_great_dane: 5,
        breed_cocker: 7
      },
      tests: {
        tier1: ["Echocardiogram (DCM pattern — dilated LV, reduced EF)","Thoracic radiograph","CBC/chemistry"],
        tier2: ["Plasma taurine level (<40 nmol/mL = deficient)","Whole blood taurine level","Diet history — grain-free, pulse-legume-based diets","NT-proBNP"],
        tier3: ["Referral: veterinary cardiologist","Diet consultation"]
      },
      treatment: {
        medications: ["Taurine supplementation 500–1000 mg PO BID (dog)","Taurine 250 mg PO SID (cat)","Carnitine 50 mg/kg PO TID (if deficient)","Standard DCM therapy: Pimobendan 0.25 mg/kg PO BID","Furosemide (if CHF present)","Enalapril/Benazepril (ACE-I)"],
        procedures: ["SWITCH DIET: from grain-free/pulse-legume (pea, lentil, chickpea as main ingredients) to conventional meat-based","Echocardiogram at 3 and 6 months post-diet change + supplementation"],
        diet: ["CRITICAL: switch to conventional grain-containing or meat-based dog food","Avoid grain-free diets with high pulse/legume content until further research clarifies","Marine-sourced omega-3 supplementation"]
      },
      education: {
        monitor: ["Echocardiogram q3 months (cardiac function improvement expected in 3–6 months if taurine-related)","Clinical signs of CHF","Plasma taurine level at 3 months","Body weight"],
        red_flags: ["No echocardiographic improvement at 6 months — consider other causes of DCM","Rapid CHF progression","Ventricular arrhythmia"],
        followup: "Echocardiogram at 3 months, 6 months, 12 months; many dogs improve significantly with diet change + taurine; FDA monitoring ongoing for grain-free diet safety",
        prognosis: "fair"
      }
    },

    {
      id: "vitamin_b12_deficiency",
      name: "Cobalamin (Vitamin B12) Deficiency",
      species: ["dog","cat"],
      category: "Nutritional / Gastroenterology",
      signals: {
        complaints_lethargy: 7, complaints_weight_loss: 7, complaints_diarrhea: 7,
        complaints_anorexia: 6, complaints_vomiting: 5, bcs_thin: 6,
        hpi_onset_chronic: 7, hpi_progression_worsening: 5,
        breed_giant_schnauzer: 7, breed_border_collie: 6, breed_australian_shepherd: 5
      },
      tests: {
        tier1: ["Serum cobalamin level (<200 ng/L deficient — dog; <300 ng/L — cat)","CBC (macrocytic anemia, hypersegmented neutrophils in severe cases)","Chemistry"],
        tier2: ["Folate (concurrent deficiency in EPI)","TLI (trypsin-like immunoreactivity — rule out EPI)","Methylmalonic acid (urine — functional B12 deficiency marker)","SIBO/SI biopsy (malabsorption)"],
        tier3: ["Referral: internist","Genetic testing (dogs: Cubam mutation in Giant Schnauzer, Border Collie)"]
      },
      treatment: {
        medications: ["Cyanocobalamin SC injection 250 μg (cat), 500–1000 μg (dog) weekly × 6 weeks then monthly × 3–6 months","Oral cobalamin (high-dose 250–1000 μg PO SID — some evidence for oral efficacy if GI functional)","Treat underlying cause (EPI: pancreatic enzymes; IBD: immunosuppression)"],
        procedures: ["Address underlying cause of malabsorption","Monitor serum levels to guide frequency of supplementation"],
        diet: ["Highly digestible diet","Balanced nutrition — avoid extreme restriction diets without supplementation"]
      },
      education: {
        monitor: ["Serum cobalamin at 4 weeks after starting treatment (confirm response)","Body weight","GI signs","CBC (resolution of anemia)"],
        red_flags: ["Genetic Cubam mutations — lifelong supplementation required","Neurological signs if severe deficiency untreated","Failure to improve with supplementation — check for concurrent disease"],
        followup: "Cobalamin level recheck at 4–6 weeks; adjust interval based on level; underlying cause must be treated for sustained normalization",
        prognosis: "good"
      }
    },

    {
      id: "obesity_associated_disease",
      name: "Obesity and Obesity-Associated Disease",
      species: ["dog","cat"],
      category: "Nutritional / Preventive",
      signals: {
        bcs_obese: 10, complaints_lethargy: 6, complaints_dyspnea: 5,
        complaints_limping: 5, complaints_polydipsia: 5, complaints_polyuria: 5,
        chronic_condition_diabetes: 5, hpi_onset_chronic: 6,
        age_middle: 5, age_old: 6, sex_male_neutered: 4, sex_female_spayed: 4
      },
      tests: {
        tier1: ["Body condition score (BCS 1–9: >6 = overweight, >7 = obese)","Weight and body measurements (waist, thorax)","CBC/chemistry (insulin resistance panel, liver enzymes)"],
        tier2: ["Thyroid panel (rule out hypothyroidism)","Blood glucose/insulin (diabetes)","Blood pressure (hypertension)","Orthopedic evaluation (concurrent OA)"],
        tier3: ["Sedation for dental/pain evaluation (mobility assessment)","Body composition (DEXA — research settings)"]
      },
      treatment: {
        medications: ["Treat comorbidities (arthritis: meloxicam, diabetes: insulin)","Hypothyroidism: levothyroxine (if cause)","Cat: Mirataz/mirtazapine NOT indicated for obese cat — reduces appetite stimulation isn't the goal"],
        procedures: ["Structured weight loss plan — reduce calorie intake 20–30% below maintenance","Increase structured exercise (20–30 min walks BID for dogs)","Food log and weight measurement weekly"],
        diet: ["Prescription weight management diet (Hills Metabolic, Royal Canin Satiety, Purina OM)","Measure food precisely — NO free choice feeding","Reduce treats to <10% daily calories","Canned food for cats (lower carb, higher protein — promotes satiety)","Fiber supplementation (canned pumpkin 1 tsp/meal — bulking)"]
      },
      education: {
        monitor: ["Weight weekly (goal: 1–2% body weight loss/week)","BCS every 2 weeks","Exercise tolerance","Concurrent disease signs"],
        red_flags: ["Failure to lose weight despite caloric restriction — thyroid/endocrine disorder","Hepatic lipidosis risk in cats if weight loss >20% per week","Rapid weight loss causing muscle loss"],
        followup: "Recheck weight monthly until target achieved; then q3–6 months maintenance; introduce exercise gradually; family compliance is critical",
        prognosis: "good"
      }
    },

    // ═══════════════════════════ IMMUNE-MEDIATED ════════════════════════════

    {
      id: "systemic_lupus_erythematosus",
      name: "Systemic Lupus Erythematosus (SLE)",
      species: ["dog"],
      category: "Immunology",
      signals: {
        complaints_limping: 7, complaints_skin_lesions: 7, complaints_lethargy: 7,
        complaints_bleeding: 5, mm_pale: 5,
        skin_erythema: 7, skin_alopecia_focal: 5,
        limbs_joint_swelling: 6, limbs_joint_pain: 6,
        temp_high: 6, lymph_mild: 5,
        hpi_onset_subacute: 5, hpi_progression_worsening: 5,
        age_middle: 5, breed_german_shepherd: 6, breed_collie: 6
      },
      tests: {
        tier1: ["CBC (hemolytic anemia, thrombocytopenia, leukopenia)","Urinalysis (proteinuria — glomerulopathy)","Chemistry"],
        tier2: ["ANA (antinuclear antibody titer) — >1:80 significant","LE cell preparation","Direct Coombs test (IMHA component)","Skin biopsy (interface dermatitis)","Arthrocentesis (polyarthritis)","UPC"],
        tier3: ["Referral: veterinary internist/dermatologist","Full immunological workup"]
      },
      treatment: {
        medications: ["Prednisolone 2 mg/kg PO SID × 4–8 weeks then taper (first-line immunosuppression)","Azathioprine 2 mg/kg PO SID (steroid-sparing)","Hydroxychloroquine 5 mg/kg PO SID (antimalarial — skin manifestations)","Cyclosporine 5 mg/kg PO SID (refractory)","Sun protection topical cream (nasal lesions)"],
        procedures: ["Sun avoidance — UV triggers flares","CBC monitoring q2–4 weeks during immunosuppression","Avoid immunostimulants"],
        diet: ["High-quality diet","Moderate protein restriction if renal involvement"]
      },
      education: {
        monitor: ["CBC weekly during dose adjustment","Proteinuria monthly","ANA titer q3 months","Skin lesion evolution","Joint pain"],
        red_flags: ["Progressive renal failure","Severe hemolytic crisis","Thrombocytopenic hemorrhage","Multiorgan failure"],
        followup: "Lifelong management required; frequent relapses common; ANA titer not reliable for monitoring activity — use clinical signs and CBC",
        prognosis: "guarded"
      }
    },

    {
      id: "eosinophilic_granuloma_complex",
      name: "Eosinophilic Granuloma Complex (EGC) — Feline",
      species: ["cat"],
      category: "Dermatology / Immunology",
      signals: {
        complaints_skin_lesions: 9, skin_erythema: 8, skin_papules: 7,
        skin_alopecia_focal: 6, skin_pruritus: 7,
        hpi_onset_subacute: 6, age_middle: 5, age_young: 5,
        sex_female_intact: 5
      },
      tests: {
        tier1: ["Skin cytology (eosinophils — hallmark)","Physical exam — classify lesion type (indolent ulcer, EGP, eosinophilic plaque)","Skin scraping (rule out Demodex, Sarcoptes)"],
        tier2: ["Allergy testing (food elimination diet trial)","Intradermal test","FeLV/FIV","Skin biopsy (confirm eosinophilic infiltrate)","Ectoparasite treatment trial (flea control)"],
        tier3: ["Referral: veterinary dermatologist"]
      },
      treatment: {
        medications: ["Prednisolone 1–2 mg/kg PO SID × 4–6 weeks then taper (first-line)","Methylprednisolone acetate 20 mg/cat IM (repository steroid — 4–6 week effect)","Cyclosporine 5–7 mg/kg PO SID (steroid-resistant or recurrent)","Chlorambucil 0.1 mg/kg PO SID (refractory)","Oclacitinib (off-label cat — some use)"],
        procedures: ["Flea control (rigorous — ALL pets in household)","Elimination diet trial (8–12 weeks) if food allergy suspected","Environmental modification"],
        diet: ["Hydrolyzed or novel protein diet (food allergy investigation)","Omega-3 supplementation (EPA/DHA)"]
      },
      education: {
        monitor: ["Lesion resolution","Pruritus score","Food trial compliance","Recurrence after steroid withdrawal"],
        red_flags: ["Non-response to prednisolone × 3 weeks — reassess diagnosis","Ulceration of lip lesions (indolent ulcer progression)","Secondary bacterial infection"],
        followup: "Recheck 4–6 weeks; identify and eliminate underlying trigger for long-term control; recurrence common without allergen identification",
        prognosis: "fair"
      }
    },

    {
      id: "inflammatory_bowel_disease_cat",
      name: "Feline Inflammatory Bowel Disease (IBD) — Lymphoplasmacytic",
      species: ["cat"],
      category: "Gastroenterology / Immunology",
      signals: {
        complaints_vomiting: 8, complaints_weight_loss: 8, complaints_diarrhea: 7,
        complaints_anorexia: 6, complaints_lethargy: 5,
        bcs_thin: 7, age_middle: 6, age_old: 7,
        hpi_onset_chronic: 8, hpi_progression_worsening: 5
      },
      tests: {
        tier1: ["CBC/chemistry/urinalysis","Serum cobalamin and folate","TLI (rule out EPI — rare in cats)","Abdominal ultrasound (wall thickening, LN)"],
        tier2: ["GI biopsy (endoscopy or surgery) — GOLD STANDARD (differentiate IBD from GI lymphoma)","PARR test on biopsy (clonality — rule out lymphoma)","FeLV/FIV","Toxoplasma / Tritrichomonas PCR (fecal)"],
        tier3: ["Referral: feline internist/endoscopist"]
      },
      treatment: {
        medications: ["Prednisolone 2–3 mg/kg PO SID × 4–6 weeks (FIRST-LINE)","Chlorambucil 2 mg/cat PO q2 weeks (steroid-resistant or high-grade suspicion)","Metronidazole 10 mg/kg PO BID × 2–4 weeks (antibacterial/antiprotozoal adjunct)","Cobalamin SC 250 μg weekly × 6 weeks (if deficient)","Mirtazapine 1.88 mg/cat PO q48–72h (appetite stimulant)"],
        procedures: ["Assisted feeding (esophagostomy tube) if >5% body weight loss","Biopsy before treatment to distinguish IBD from GI lymphoma","Address concurrent cholangitis/pancreatitis (triad disease)"],
        diet: ["Highly digestible diet","Novel protein or hydrolyzed protein diet (food-responsive IBD)","Elimination diet trial × 8 weeks"]
      },
      education: {
        monitor: ["Body weight weekly","Vomiting frequency","Food intake","Cobalamin level q4–6 weeks","Drug side effects (immunosuppression)"],
        red_flags: ["Palpable mass + rapid weight loss — differentiate from GI lymphoma (biopsy essential)","Persistent vomiting despite treatment","Protein-losing enteropathy (edema, ascites)"],
        followup: "Response assessment at 4–6 weeks; if no response to prednisolone: add chlorambucil; relapse after taper — maintenance at lowest effective dose",
        prognosis: "fair"
      }
    },


    // ═══════════════════════════ SKIN DISEASES EXPANDED ═════════════════════

    {
      id: "intertrigo",
      name: "Skin Fold Dermatitis (Intertrigo)",
      species: ["dog","cat"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 8, skin_erythema: 8, skin_pruritus: 6,
        skin_papules: 5, skin_oily: 6, skin_pustules: 5,
        breed_bulldog: 9, breed_shar_pei: 8, breed_pug: 8,
        breed_persian: 7, breed_shih_tzu: 6
      },
      tests: {
        tier1: ["Skin cytology (cytology of fold — bacteria/Malassezia)","Physical exam (fold depth, moisture)","Tape prep"],
        tier2: ["Culture and sensitivity (recurrent)","Allergy workup if underlying atopy suspected"],
        tier3: []
      },
      treatment: {
        medications: ["Chlorhexidine 2–4% wipes or spray BID × 2–4 weeks","Miconazole/chlorhexidine combination wipes or spray BID","Oral antibiotics if deep pyoderma: Cephalexin 22 mg/kg PO BID × 3–4 weeks","Oral antifungals if Malassezia: Ketoconazole 5 mg/kg PO SID × 4 weeks","Hydrocortisone spray 0.5% (mild anti-inflammatory prn)"],
        procedures: ["Daily cleaning of affected folds (warm water, cotton pad)","Keep folds dry after cleaning (hair dryer on cool setting)","Surgical correction of extreme folds (Bulldog facial fold correction)","Weight management (reduces fold depth)"],
        diet: ["Weight loss program if obese"]
      },
      education: {
        monitor: ["Fold odor","Erythema and moisture","Secondary infection recurrence","Post-surgical healing"],
        red_flags: ["Deep ulceration in fold","Spreading cellulitis","Persistent foul odor despite treatment"],
        followup: "Recheck in 3–4 weeks; lifelong daily hygiene maintenance required; surgical correction recommended for severe/recurrent cases",
        prognosis: "fair"
      }
    },

    {
      id: "hypersensitivity_insect_sting",
      name: "Insect Sting / Bite Hypersensitivity (Anaphylaxis)",
      species: ["dog","cat"],
      category: "Dermatology / Emergency",
      emergency: true,
      signals: {
        complaints_swelling_mass: 8, complaints_behavioral: 7,
        complaints_vomiting: 6, complaints_collapse: 7,
        skin_erythema: 7, complaints_dyspnea: 6,
        hpi_onset_sudden: 10, env_outdoor: 8,
        hr_high: 6, mm_pale: 6
      },
      tests: {
        tier1: ["Clinical exam — urticaria, angioedema, facial swelling","Blood pressure","CBC/chemistry"],
        tier2: ["Intradermal allergy testing (after recovery)","IgE panel (insect allergens)"],
        tier3: []
      },
      treatment: {
        medications: ["ANAPHYLAXIS: Epinephrine 0.01 mg/kg SC/IM IMMEDIATELY","Diphenhydramine 2 mg/kg IM/IV (antihistamine)","Dexamethasone 0.25 mg/kg IV (anti-inflammatory)","IV fluid resuscitation (shock)","MILD URTICARIA: Chlorpheniramine 0.4 mg/kg PO/IM","Prednisolone 1 mg/kg PO SID × 3–5d (post-acute)"],
        procedures: ["Remove stinger if visible","Maintain airway (intubate if laryngeal edema)","Monitor blood pressure","Cold compress on affected area"],
        diet: []
      },
      education: {
        monitor: ["Breathing quality","Blood pressure","Skin swelling resolution","Vomiting/GI signs"],
        red_flags: ["Laryngeal edema (stridor, dyspnea)","Cardiovascular collapse","Repeat exposure = increased risk of severe reaction"],
        followup: "Discharge when stable (2–4h observation minimum); discuss prevention (avoiding areas, lead monitoring outdoors); epinephrine auto-injector for high-risk pets",
        prognosis: "good"
      }
    },

    {
      id: "cutaneous_histiocytoma",
      name: "Canine Cutaneous Histiocytoma",
      species: ["dog"],
      category: "Dermatology / Oncology",
      signals: {
        complaints_swelling_mass: 9, skin_papules: 7,
        hpi_onset_subacute: 8, age_young: 8,
        hpi_progression_worsening: 4
      },
      contra_signals: { age_old: -3, lymph_moderate: -3 },
      tests: {
        tier1: ["Fine needle aspirate cytology — round cells with pale cytoplasm (DIAGNOSTIC)","Physical exam — location, size, ulceration","CBC/chemistry"],
        tier2: ["Biopsy (if cytology inconclusive)","Lymph node aspirate (if enlarged)"],
        tier3: []
      },
      treatment: {
        medications: ["Observation only (most regress spontaneously in 1–3 months)","Prednisolone 0.5–1 mg/kg PO SID × 3 weeks (accelerate regression if ulcerated)"],
        procedures: ["Surgical excision (if no regression after 3 months, ulcerated, or large)","E-collar to prevent self-trauma"],
        diet: ["No dietary restriction"]
      },
      education: {
        monitor: ["Size change weekly","Ulceration","Regression timeline","Recurrence (new mass nearby)"],
        red_flags: ["Growing mass with regional lymph node enlargement (systemic histiocytosis)","Non-regression after 3 months (reassess diagnosis)","Multiple masses"],
        followup: "Recheck at 4 weeks, 8 weeks, 12 weeks; most regress by 3 months; if persistent or growing — excise and histopathology",
        prognosis: "excellent"
      }
    },

    {
      id: "digital_hyperkeratosis",
      name: "Digital Hyperkeratosis (Nasal / Footpad Hyperkeratosis)",
      species: ["dog"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 7, skin_crusts: 8, skin_thickened: 9,
        complaints_limping: 5, gait_mild_lameness: 5,
        age_old: 6, breed_labrador: 4, breed_golden: 4,
        hpi_onset_chronic: 7
      },
      tests: {
        tier1: ["Physical exam — hyperkeratotic nasal planum/pads","Skin scraping (rule out parasites)","Biopsy if atypical or multisystemic involvement"],
        tier2: ["Canine distemper antibody (nasal hyperkeratosis in CDV)","Zinc levels (zinc-responsive dermatosis)","Leishmaniasis serology (endemic areas)"],
        tier3: ["Referral: dermatologist if no response"]
      },
      treatment: {
        medications: ["Tretinoin 0.025–0.05% topical cream SID × 4 weeks (vitamin A derivative)","Petroleum jelly (Vaseline) or bag balm topical BID (moisturiser)","Urea 10–20% cream topical BID (keratolytic — soften pads)","Vitamin A 1000–3000 IU/kg PO SID (systemic — selective cases)","Treat underlying cause (zinc, CDV, Leishmania)"],
        procedures: ["Warm water soaks of pads SID (soften crusts)","Gentle manual removal of loosened crusts","Protective boots for walking on hard surfaces"],
        diet: ["Zinc-balanced diet if zinc deficiency diagnosed","Omega-3 supplementation"]
      },
      education: {
        monitor: ["Pad fissuring and pain","Lameness","Moisture and pliability of affected areas","Response to moisturizers"],
        red_flags: ["Deep fissuring causing pain and lameness","Secondary bacterial infection","Non-response to treatment — reassess diagnosis"],
        followup: "Recheck at 4–6 weeks; lifelong moisturizing maintenance for idiopathic cases; most improve with consistent care",
        prognosis: "fair"
      }
    },

    {
      id: "dermatomyositis_collie",
      name: "Dermatomyositis (Collie/Sheltie Familial)",
      species: ["dog"],
      category: "Dermatology / Neuromuscular",
      signals: {
        complaints_skin_lesions: 9, skin_alopecia_focal: 8, skin_erythema: 7,
        skin_crusts: 7, complaints_limping: 5, complaints_behavioral: 5,
        age_young: 8, breed_collie: 9, breed_sheltie: 9, breed_australian_shepherd: 6
      },
      tests: {
        tier1: ["Skin biopsy (hydropic interface dermatitis — DIAGNOSTIC)","Physical exam — facial, ear, pressure point lesions","EMG (myopathy — electromyography)"],
        tier2: ["CBC/chemistry","Muscle biopsy","ANA titer","Creatine kinase (CK)"],
        tier3: ["Referral: veterinary dermatologist","Genetic screening for breeding decisions"]
      },
      treatment: {
        medications: ["Vitamin E 400–800 IU PO BID (antioxidant)","Pentoxifylline 25 mg/kg PO BID (improves microvascular flow)","Tetracycline + niacinamide (250 mg of each PO TID for dogs <10 kg; 500 mg each PO TID for dogs >10 kg)","Prednisolone 0.5–1 mg/kg PO SID (severe cases only — short courses)","Omega-3 fatty acids 30–40 mg/kg/day"],
        procedures: ["Sun avoidance (UV triggers flares)","Sunscreen on nose/face for outdoor exposure","Gentle grooming — avoid trauma to lesions"],
        diet: ["Antioxidant-rich diet","Omega-3 supplementation"]
      },
      education: {
        monitor: ["Lesion extent and activity","Muscle atrophy (facial/masticatory)","Megaesophagus development (myopathy)","Reproductive counseling"],
        red_flags: ["Progressing muscle wasting","Dysphagia from megaesophagus","Severe scarring"],
        followup: "Recheck monthly; autosomal dominant trait — advise against breeding affected dogs; lifelong management; waxes and wanes",
        prognosis: "fair"
      }
    },

    {
      id: "pseudomonas_otitis",
      name: "Pseudomonas Otitis Externa (Resistant)",
      species: ["dog"],
      category: "Dermatology / Ears",
      signals: {
        complaints_ear_problems: 9, ears_discharge_brown: 7, ears_erythema: 8,
        ears_odor: 8, ears_pruritus: 7, complaints_behavioral: 6,
        hpi_onset_chronic: 7, hpi_progression_worsening: 6,
        breed_cocker: 7, breed_labrador: 5, breed_golden: 5
      },
      tests: {
        tier1: ["Ear cytology (gram-negative rods — Pseudomonas — 'hot dog' shaped)","Otoscopy (ulceration, hyperplasia, stenosis)","Culture and sensitivity (ESSENTIAL for Pseudomonas — MDR common)"],
        tier2: ["Thorough ear exam under sedation/GA","Radiography/CT (otitis media extension)","Allergy workup (underlying cause)"],
        tier3: ["Referral: veterinary dermatologist — video otoscopy","Total ear canal ablation (TECA) consultation"]
      },
      treatment: {
        medications: ["Topical based on C&S (Pseudomonas commonly resistant to gentamicin/neomycin)","Topical enrofloxacin/silver sulfadiazine (Osurnia alternative)","Tobramycin ophthalmic drops (0.3%) in ear q12h (off-label — effective Pseudomonas)","Tris-EDTA flush BID (enhances antibiotic penetration, disrupts biofilm)","Systemic antibiotics if otitis media: Enrofloxacin 10 mg/kg PO SID × 6–8 weeks (guided by deep C&S)","Oclacitinib / cyclosporine (treat underlying atopy)"],
        procedures: ["Deep ear flush under GA (dissolve debris before topical)","Regular nurse-performed ear cleaning protocol","Lateral wall resection (surgical drainage if stenosis)","TECA (end-stage chronic otitis)"],
        diet: ["Identify and manage underlying allergic disease"]
      },
      education: {
        monitor: ["Culture and sensitivity before and after treatment","Ear canal stenosis","Pain level","Recurrence after treatment","Residual infection"],
        red_flags: ["Head tilt + neurological signs (inner ear extension)","Pain on jaw movement (middle ear)","Resistance pattern on culture — specialist needed"],
        followup: "Recheck with cytology at 3–4 weeks; repeat C&S at end of treatment; address underlying allergy; video otoscopy for treatment monitoring",
        prognosis: "guarded"
      }
    },

    // ═══════════════════════════ INTERNAL MEDICINE EXPANDED ═════════════════

    {
      id: "portosystemic_shunt",
      name: "Portosystemic Shunt (PSS)",
      species: ["dog","cat"],
      category: "Gastroenterology / Hepatology",
      signals: {
        complaints_behavioral: 8, complaints_seizures: 7, neuro_disoriented: 7,
        complaints_vomiting: 6, complaints_polyuria: 6, complaints_polydipsia: 6,
        complaints_weight_loss: 7, complaints_anorexia: 5,
        age_young: 8, age_puppy: 7, bcs_thin: 7,
        breed_yorkshire: 8, breed_maltese: 7, breed_shih_tzu: 6,
        breed_poodle: 5, breed_australian_shepherd: 5
      },
      tests: {
        tier1: ["Fasting and 2-hr post-prandial bile acids (>200 μmol/L PP = PSS likely)","CBC (microcytosis, mild anemia)","Chemistry (low BUN, albumin, cholesterol, glucose — low liver function)","Urinalysis (ammonium biurate crystals)"],
        tier2: ["Abdominal ultrasound (extrahepatic shunt visualization)","CT/MR angiography (GOLD STANDARD for shunt mapping)","Rectal ammonia tolerance test"],
        tier3: ["Referral: soft tissue surgeon","Scintigraphy (percent shunting)"]
      },
      treatment: {
        medications: ["Medical management: Lactulose 0.5 mL/kg PO TID (reduce ammonia absorption)","Neomycin 20 mg/kg PO BID or Metronidazole 7.5 mg/kg PO BID (reduce GI bacteria — ammonia-producing)","Levetiracetam 20 mg/kg PO TID (seizure management — DO NOT use phenobarbital — hepatic metabolism)","Antacid: Omeprazole 1 mg/kg PO SID","Antibiotics if UTI: Amoxicillin-clavulanate 12.5 mg/kg PO BID"],
        procedures: ["Surgical attenuation (ameroid constrictor or cellophane banding) — DEFINITIVE","Staged ligation (extrahepatic)","TIPS or coil embolization (intrahepatic — specialist)","Medical management pre-surgery (reduce HE episodes)"],
        diet: ["PROTEIN RESTRICTION during HE crises only (not long-term)","Highly digestible, moderate protein prescription diet","Small frequent meals","Royal Canin Hepatic / Hills l/d","Avoid high-protein dog foods"]
      },
      education: {
        monitor: ["Neurological signs (HE frequency, severity)","Bile acids post-surgery (test at 3 months)","Body weight and condition","Seizures","Urinary crystals (ammonium biurate)"],
        red_flags: ["Status epilepticus — levetiracetam","Acute HE crisis — lactulose enema + IV fluids","Portal hypertension post-surgical attenuation (ascites)"],
        followup: "Post-surgical bile acids at 3 and 6 months; neurological rechecks; excellent prognosis if complete attenuation achieved; multiple shunts: worse prognosis",
        prognosis: "fair"
      }
    },

    {
      id: "exocrine_pancreatic_insufficiency",
      name: "Exocrine Pancreatic Insufficiency (EPI)",
      species: ["dog","cat"],
      category: "Gastroenterology",
      signals: {
        complaints_diarrhea: 9, complaints_weight_loss: 9, complaints_polyphagia: 8,
        complaints_vomiting: 4, bcs_thin: 9, skin_poor_coat: 7,
        hpi_onset_chronic: 8, hpi_progression_worsening: 5,
        breed_german_shepherd: 9, breed_rough_collie: 7,
        age_young: 5, age_middle: 5
      },
      contra_signals: { complaints_anorexia: -3 },
      tests: {
        tier1: ["Serum TLI — <2.5 μg/L (dog), <8 μg/L (cat) = EPI DIAGNOSTIC","Cobalamin and folate levels (cobalamin low + folate high = EPI with SIBO)"],
        tier2: ["Diet trial with enzyme supplement (therapeutic diagnosis)","Abdominal ultrasound","Fecal elastase (alternative, less sensitive)"],
        tier3: ["Referral: internist (refractory EPI)"]
      },
      treatment: {
        medications: ["Pancreatic enzyme replacement: Pancrex/Panzym 2 tsp/500 kcal food OR raw pancreas 30–90g/meal (LIFELONG)","Cobalamin (B12) 250 μg (cat) / 500–1000 μg (dog) SC weekly × 6 weeks then monthly","Tylosin 10 mg/kg PO BID × 4 weeks (SIBO concurrent)","Prednisolone 0.5–1 mg/kg PO SID × 4 weeks (concurrent IBD or EPI-associated hypersensitivity)","Vitamin E 400–600 IU PO SID (oxidative stress)"],
        procedures: ["Mix enzymes into food, incubate 30 min before feeding","Divide daily food into 2–3 small meals","Weigh food precisely"],
        diet: ["Highly digestible, low-fat diet (Royal Canin GI, Hills i/d)","Avoid high-fiber diet (inhibits enzyme action)","Small frequent meals — 2–3×/day","Low-fat: <20% DM fat content"]
      },
      education: {
        monitor: ["Body weight weekly until stable","Fecal consistency","Cobalamin level q6 months","Dose adjustment of enzymes based on response","Gas and flatulence (normal during enzyme adjustment)"],
        red_flags: ["Failure to gain weight despite enzyme supplementation — check cobalamin, SIBO, IBD","Greasy/voluminous feces continuing — increase enzyme dose","Hypersensitivity reaction to enzyme supplement (rare)"],
        followup: "Recheck weight and fecal quality at 4 weeks; cobalamin q6 months; most improve dramatically within 4 weeks of enzyme replacement",
        prognosis: "good"
      }
    },

    {
      id: "hiatal_hernia",
      name: "Hiatal Hernia",
      species: ["dog","cat"],
      category: "Gastroenterology",
      signals: {
        complaints_vomiting: 8, complaints_dyspnea: 6, complaints_coughing: 5,
        complaints_anorexia: 5, complaints_weight_loss: 4,
        hpi_onset_chronic: 6, age_young: 5,
        breed_bulldog: 8, breed_pug: 7, breed_shih_tzu: 5
      },
      tests: {
        tier1: ["Thoracic radiography (gastric shadow in thorax)","Contrast esophagram (GE junction displacement)","Fluoroscopy (dynamic hiatal hernia)"],
        tier2: ["CBC/chemistry","pH probe / impedance (GERD confirmation)","Upper endoscopy (esophagitis severity)"],
        tier3: ["CT chest/abdomen","Referral: soft tissue surgeon"]
      },
      treatment: {
        medications: ["Omeprazole 1 mg/kg PO BID (acid reduction)","Sucralfate 0.25–1 g PO TID (esophagitis)","Metoclopramide 0.2–0.5 mg/kg PO/SC TID (prokinetic — improve GE sphincter tone)","Maropitant 2 mg/kg PO SID (antiemetic)"],
        procedures: ["Dietary management first (small frequent meals, elevated position)","Surgical hiatal plication (definitive — recurrent or severe cases)","Gastropexy (prevent gastric re-herniation)"],
        diet: ["Small frequent meals × 4–6/day","Elevated feeding bowl","Soft/wet food (easier to clear)","AVOID large meals or exercise immediately after eating"]
      },
      education: {
        monitor: ["Vomiting/regurgitation frequency","Weight","Aspiration pneumonia signs","Esophagitis severity"],
        red_flags: ["Aspiration pneumonia","Not responsive to medical management","Esophageal stricture development"],
        followup: "Endoscopic reassessment at 4–6 weeks; surgical referral if refractory; brachycephalic breeds: concurrent BOAS correction improves hiatal hernia in many",
        prognosis: "fair"
      }
    },

    {
      id: "abdominal_hernia",
      name: "Umbilical / Inguinal / Perineal Hernia",
      species: ["dog","cat"],
      category: "Surgery / Gastroenterology",
      signals: {
        complaints_swelling_mass: 8, complaints_abdominal_distension: 5,
        complaints_behavioral: 5, age_puppy: 7, age_young: 6,
        sex_male_intact: 5,
        breed_basenji: 4, breed_airedale: 4
      },
      tests: {
        tier1: ["Physical exam — reducible vs non-reducible hernia","Radiography (hernia content)","Abdominal ultrasound (visceral content)"],
        tier2: ["CBC/chemistry (strangulated hernia — emergency)","CT scan (complex inguinal/perineal)"],
        tier3: []
      },
      treatment: {
        medications: ["Pain: Meloxicam 0.1 mg/kg PO SID (post-surgical)","Antibiotics peri-op: Amoxicillin-clavulanate 12.5 mg/kg BID × 5 days","IV fluids if strangulated hernia (pre-op)"],
        procedures: ["Surgical herniorrhaphy (definitive)","UMBILICAL: small/reducible — monitor; large/non-reducible — surgery","INGUINAL: surgery recommended (risk of bladder entrapment in females)","PERINEAL: herniorrhaphy + castration (reduces recurrence)","Strangulated/incarcerated: EMERGENCY surgery"],
        diet: ["High-fiber diet post-perineal herniorrhaphy (prevent straining)"]
      },
      education: {
        monitor: ["Hernia reducibility","Signs of strangulation (pain, swelling, not reducible, systemic illness)","Post-surgical healing"],
        red_flags: ["Non-reducible hard painful hernia = strangulation EMERGENCY","Incarcerated bowel","Urinary obstruction (inguinal — bladder entrapment)"],
        followup: "Surgical recheck 10–14 days; umbilical hernias: small ones may close spontaneously by 6 months; genetic predisposition — advise against breeding",
        prognosis: "excellent"
      }
    },

    {
      id: "cholecystitis_cholelithiasis",
      name: "Cholecystitis / Cholelithiasis",
      species: ["dog","cat"],
      category: "Gastroenterology / Hepatology",
      emergency: true,
      signals: {
        complaints_lethargy: 7, complaints_vomiting: 7, complaints_anorexia: 7,
        abdomen_pain_moderate: 7, abdomen_pain_severe: 7,
        mm_icteric: 7, temp_high: 6,
        liver_hepatomegaly: 5, hpi_onset_sudden: 6,
        age_middle: 5, age_old: 6
      },
      tests: {
        tier1: ["Abdominal ultrasound (gall bladder wall thickening, bile sludge, choleliths, mucocele)","CBC (leukocytosis)","Chemistry (bilirubin, liver enzymes, ALP)","Urinalysis (bilirubinuria)"],
        tier2: ["Coagulation panel (cholestasis impairs Vit K)","Bile culture","CT abdomen (complex cases)"],
        tier3: ["Referral: soft tissue surgeon","Endoscopic retrograde cholangiopancreatography (ERCP — specialist)"]
      },
      treatment: {
        medications: ["IV fluid support","Antibiotics: Amoxicillin-clavulanate + Metronidazole (biliary sepsis)","Vitamin K1 0.5–1 mg/kg SC SID × 3 days (cholestasis-induced coagulopathy)","Ursodiol 10–15 mg/kg PO SID (bile acid — dissolve sludge, mild cases)","SAMe 17–20 mg/kg PO SID (hepatoprotectant)","Analgesics: Buprenorphine 0.01–0.02 mg/kg IV/SC q6–8h"],
        procedures: ["Cholecystectomy (DEFINITIVE — mucocele, ruptured GB, refractory cholecystitis)","Biliary duct bypass (biliary obstruction)","Post-op drain"],
        diet: ["Low-fat hepatic diet","Small frequent meals","Avoid high-fat foods (trigger biliary colic)"]
      },
      education: {
        monitor: ["Bilirubin and liver enzymes q2–4 weeks","Signs of GB rupture (acute abdomen)","Post-op bile drainage","Coagulation status"],
        red_flags: ["Ruptured GB — biliary peritonitis (EMERGENCY surgery)","Jaundice worsening","Coagulopathy from cholestasis","Septic shock"],
        followup: "Ultrasound recheck at 3–4 weeks for medical management; mucocele surgery: recheck liver enzymes + ultrasound at 6 weeks",
        prognosis: "fair"
      }
    },

    {
      id: "pancreatitis_cat",
      name: "Feline Pancreatitis",
      species: ["cat"],
      category: "Gastroenterology",
      signals: {
        complaints_lethargy: 9, complaints_anorexia: 9, complaints_vomiting: 6,
        abdomen_pain_mild: 7, abdomen_pain_moderate: 6,
        temp_low: 5, temp_high: 4,
        hpi_onset_sudden: 6, hpi_onset_subacute: 5,
        attitude_dull: 7, attitude_obtunded: 5,
        age_middle: 5, age_old: 6
      },
      contra_signals: { complaints_vomiting: -1 },
      tests: {
        tier1: ["Spec fPL (feline pancreatic lipase) — >3.5 μg/L suggestive","CBC/chemistry","Abdominal ultrasound (pancreatic edema, peripancreatic fluid)"],
        tier2: ["Cobalamin/folate (concurrent IBD)","Bile acids (concurrent cholangitis)","FeLV/FIV"],
        tier3: ["CT abdomen (severity scoring)","Referral: feline internist"]
      },
      treatment: {
        medications: ["IV fluid resuscitation (LRS — aggressive rehydration)","Maropitant 1 mg/kg SC SID (antiemetic)","Mirtazapine 1.88 mg/cat PO q48–72h (appetite stimulant)","Buprenorphine 0.01–0.02 mg/kg IV/SC q6–8h (pain — ESSENTIAL)","Vitamin K1 0.5 mg/kg SC (if coagulopathy)","Cobalamin 250 μg SC weekly (if deficient)"],
        procedures: ["Nutritional support EARLY (within 24–48h)","Esophagostomy tube if not eating","Small frequent meals when eating resumes","Address triad disease (IBD + cholangitis concurrent)"],
        diet: ["Low-fat diet NOT necessary in cats (unlike dogs)","Highly digestible diet","Small frequent meals","Force-feed or tube-feed within 48h of hospitalization"]
      },
      education: {
        monitor: ["Appetite and food intake","Body weight","Serum lipase/Spec fPL at 4 weeks","Concurrent IBD or cholangitis management"],
        red_flags: ["Complete anorexia >3 days — hepatic lipidosis risk","Hypothermia","Deteriorating mentation"],
        followup: "Recheck in 1–2 weeks; Spec fPL reassessment at 4 weeks; triad disease: manage IBD and cholangitis concurrently; prognosis good for mild-moderate cases",
        prognosis: "fair"
      }
    },

    {
      id: "intestinal_lymphangiectasia",
      name: "Intestinal Lymphangiectasia / Protein-Losing Enteropathy",
      species: ["dog"],
      category: "Gastroenterology",
      signals: {
        complaints_diarrhea: 8, complaints_weight_loss: 8, complaints_lethargy: 7,
        complaints_abdominal_distension: 7, abdomen_fluid_wave: 8,
        bcs_thin: 8, hpi_onset_chronic: 8,
        breed_yorkshire: 8, breed_maltese: 6, breed_soft_coated_wheaten: 8,
        breed_norwegian_lundehund: 7
      },
      tests: {
        tier1: ["Chemistry — HYPOALBUMINEMIA (<15 g/L), hypoglobulinemia, hypocholesterolemia","CBC","Urinalysis (UPC — rule out protein-losing nephropathy)"],
        tier2: ["Fecal alpha-1 protease inhibitor (A1PI) — increased = PLE","Abdominal ultrasound (ascites, SI wall)","GI biopsy (endoscopy/surgery — dilated lacteals, mucosal lesions)","Cobalamin/folate"],
        tier3: ["Lymphoscintigraphy","Referral: veterinary internist/gastroenterologist"]
      },
      treatment: {
        medications: ["Prednisolone 2 mg/kg PO SID (reduce lymphatic inflammation)","Cyclosporine 5 mg/kg PO SID (refractory)","Vitamin K1 0.5–1 mg/kg SC (fat-soluble vitamin deficiency)","Cobalamin 500–1000 μg SC weekly","Spironolactone + furosemide (ascites management)","Heparin 100 U/kg SC BID (hypercoagulability prevention)"],
        procedures: ["Albumin infusion (critically hypoalbuminemic — <10 g/L)","Abdominocentesis (severe ascites)","Nutritional support — enteral feeding","Fresh frozen plasma (severe acute hypoalbuminemia)"],
        diet: ["ULTRA-LOW-FAT DIET (Royal Canin GI Low Fat, Hills i/d Low Fat) — ESSENTIAL","Medium-chain triglyceride (MCT) oil supplement (absorbed without lymphatics)","<5–8 g fat per 1000 kcal","Eliminate ALL treats/table food (must be strict)"]
      },
      education: {
        monitor: ["Serum albumin q2–4 weeks","Body weight","Ascites (abdominal girth)","Cobalamin levels q3–6 months","Dietary compliance"],
        red_flags: ["Albumin <10 g/L — critical, hospitalize","Pulmonary thromboembolism (sudden dyspnea)","Refractory ascites","Severe edema (limb pitting)"],
        followup: "Albumin monthly until stable; strict diet is lifelong cornerstone; recheck endoscopy at 3–6 months; prognosis variable — Yorkshire Terrier often challenging",
        prognosis: "guarded"
      }
    },

    // ═══════════════════════════ TOXICOLOGY EXPANDED ════════════════════════

    {
      id: "grape_raisin_toxicosis",
      name: "Grape / Raisin Toxicosis",
      species: ["dog"],
      category: "Toxicology",
      emergency: true,
      signals: {
        complaints_vomiting: 9, complaints_lethargy: 8, complaints_anorexia: 8,
        complaints_dysuria: 6, complaints_polyuria: 5,
        hpi_onset_sudden: 9, history_toxin_ingestion: 10,
        age_young: 5, age_middle: 5
      },
      tests: {
        tier1: ["Serum BUN, creatinine, phosphorus (AKI panel)","Urinalysis (glucosuria, casts — early AKI sign)","CBC"],
        tier2: ["Urine output monitoring (oliguria/anuria)","Blood pressure","Electrolytes"],
        tier3: []
      },
      treatment: {
        medications: ["Induce emesis IMMEDIATELY if <2h: Apomorphine 0.04 mg/kg IV/IM","Activated charcoal 1–4 g/kg PO × 1–2 doses","IV fluid diuresis: 2–3× maintenance LRS × 48h minimum (prevent/treat AKI)","Antiemetic: Maropitant 1 mg/kg SC SID","NO specific antidote"],
        procedures: ["Hospitalize × 48–72h MINIMUM","Serial renal function monitoring (BUN/creatinine q12–24h)","Urine output monitoring (normal >1 mL/kg/h)","Furosemide + dopamine (oliguric AKI)","Dialysis if AKI non-responsive"],
        diet: ["NPO while vomiting","Renal diet when stable and eating"]
      },
      education: {
        monitor: ["BUN and creatinine q12h × 48h","Urine output","Vomiting control","Body weight (fluid balance)"],
        red_flags: ["Anuria — poor prognosis","Rapidly rising creatinine >72h","Oliguria despite aggressive fluids"],
        followup: "If renal values normal at 72h — discharged with close monitoring; renal values at 1 week; prevent access to grapes/raisins permanently; mechanism of nephrotoxicity unknown — all dogs at risk regardless of dose",
        prognosis: "guarded"
      }
    },

    {
      id: "macadamia_toxicosis",
      name: "Macadamia Nut Toxicosis",
      species: ["dog"],
      category: "Toxicology",
      signals: {
        complaints_limping: 7, complaints_vomiting: 7, complaints_behavioral: 6,
        gait_ataxia: 8, complaints_lethargy: 7, temp_high: 6,
        hpi_onset_sudden: 9, history_toxin_ingestion: 9
      },
      tests: {
        tier1: ["CBC/chemistry","History of ingestion (diagnosis primarily clinical + history)","Temperature"],
        tier2: ["Urinalysis","Electrolytes"],
        tier3: []
      },
      treatment: {
        medications: ["Induce emesis if <2h and no neurological signs: Apomorphine 0.04 mg/kg IV/IM","Activated charcoal 1–4 g/kg PO","IV fluid support","Analgesics: Butorphanol 0.2–0.4 mg/kg IV/IM (muscle pain)","Methocarbamol 44 mg/kg IV slowly (muscle stiffness/tremors)"],
        procedures: ["Monitor closely × 12–24h","Temperature management (hypothermia or mild hyperthermia)"],
        diet: ["Bland diet for 24–48h post-recovery"]
      },
      education: {
        monitor: ["Gait and coordination","Temperature","Muscle tremors","Vomiting"],
        red_flags: ["Severe ataxia — ensure safety (fall prevention)","Very high temperature >40°C","Chocolate + macadamia (ADDITIVE TOXICITY — more serious)"],
        followup: "Most recover within 12–24h; discharge when gait normalized; prevent access to macadamia permanently; generally self-limiting but monitor for theobromine if chocolate co-ingestion",
        prognosis: "good"
      }
    },

    {
      id: "onion_garlic_toxicosis",
      name: "Onion / Garlic / Allium Toxicosis",
      species: ["dog","cat"],
      category: "Toxicology / Hematology",
      signals: {
        complaints_lethargy: 7, complaints_vomiting: 7, mm_pale: 8,
        complaints_anorexia: 6, complaints_dyspnea: 6,
        history_toxin_ingestion: 9, hpi_onset_subacute: 7,
        hydration_mild: 5, hydration_moderate: 5
      },
      tests: {
        tier1: ["CBC — Heinz body anemia (blood smear — DIAGNOSTIC)","PCV/TS","Blood smear (eccentrocytes in dogs)"],
        tier2: ["Reticulocyte count (regenerative?)","Chemistry","Urinalysis (hemoglobinuria)","History of ingestion (diet review)"],
        tier3: ["Coombs test (rule out IMHA)"]
      },
      treatment: {
        medications: ["GI decontamination if recent ingestion: Apomorphine 0.04 mg/kg IV/IM, activated charcoal","IV fluid support","Whole blood or pRBC transfusion if PCV <15%","N-Acetylcysteine 140 mg/kg IV loading, then 70 mg/kg IV q6h × 3 doses (antioxidant — theoretically useful)","Maropitant 1 mg/kg SC SID (antiemetic)"],
        procedures: ["Monitor PCV every 12–24h","Oxygen supplementation if anemic + dyspneic","Remove dietary source"],
        diet: ["Eliminate ALL Allium (onion, garlic, chives, leeks) from diet","Commercial baby foods often contain onion powder — AVOID in cats and dogs","Educate client on hidden sources (soups, sauces, mixed foods)"]
      },
      education: {
        monitor: ["PCV every 12–24h (nadir day 3–7)","Urine color (hemoglobinuria — dark)","Weakness and pallor","Recovery of normal RBC population"],
        red_flags: ["PCV <15% (transfusion threshold)","Hemoglobinuria","Dyspnea","Cat: MUCH more sensitive than dogs — even small amounts dangerous"],
        followup: "PCV monitoring every 48h until stable and rising; avoid all Allium species permanently; cats extremely sensitive — even small amounts of garlic paste can cause fatal anemia",
        prognosis: "good"
      }
    },

    {
      id: "chocolate_theobromine",
      name: "Chocolate / Theobromine Toxicosis",
      species: ["dog","cat"],
      category: "Toxicology",
      emergency: true,
      signals: {
        complaints_vomiting: 8, complaints_behavioral: 8, complaints_seizures: 7,
        neuro_seizure: 7, complaints_polyuria: 6, hr_high: 8,
        cardiac_tachycardia: 8, complaints_lethargy: 5,
        hpi_onset_sudden: 9, history_toxin_ingestion: 10
      },
      tests: {
        tier1: ["Clinical exam + history (most important)","ECG (tachycardia, arrhythmia)","Blood glucose"],
        tier2: ["Chemistry","Electrolytes","Urine output"],
        tier3: []
      },
      treatment: {
        medications: ["Induce emesis if <2h: Apomorphine 0.04 mg/kg IV/IM","Activated charcoal 1–4 g/kg PO with sorbitol","IV fluids (promote urinary excretion)","Diazepam 0.5 mg/kg IV (seizures)","Metoprolol or propranolol (refractory tachyarrhythmia)","Methocarbamol 44 mg/kg IV (tremors/muscle activity)"],
        procedures: ["ECG monitoring","Repeat activated charcoal q4–6h (enterohepatic recirculation)","Temperature monitoring","Induce emesis in the clinic — do NOT give H2O2 at home (aspiration risk)"],
        diet: ["NPO × 4–6h post-decontamination","Bland food 24–48h post-recovery"]
      },
      education: {
        monitor: ["Heart rate and rhythm","Urination","Neurological signs","Temperature"],
        red_flags: ["VT/VF (ventricular tachycardia) — life-threatening","Temperature >41°C","Status epilepticus","Dark chocolate / baker's chocolate > milk chocolate > white chocolate toxicity"],
        followup: "Monitor 12–24h for severe cases; dark chocolate: 150 mg/kg theobromine toxic; baker's chocolate: 130–450 mg theobromine per 30g; prevent access permanently",
        prognosis: "good"
      }
    },

    {
      id: "zinc_toxicosis",
      name: "Zinc Toxicosis",
      species: ["dog","cat"],
      category: "Toxicology / Hematology",
      emergency: true,
      signals: {
        complaints_vomiting: 8, complaints_lethargy: 8, mm_pale: 8, mm_icteric: 7,
        complaints_anorexia: 7, complaints_diarrhea: 6,
        history_toxin_ingestion: 9, hpi_onset_sudden: 8
      },
      tests: {
        tier1: ["CBC — Heinz body/intravascular hemolysis (blood smear)","PCV/TS","Chemistry (liver, kidney, zinc level if available)"],
        tier2: ["Blood zinc level (>7 μmol/L = toxic)","Abdominal radiography (metallic foreign body — pennies, zinc screws)","Reticulocyte count"],
        tier3: []
      },
      treatment: {
        medications: ["Remove zinc source (endoscopic or surgical removal of zinc coins/objects — URGENT)","IV fluid support","Whole blood or pRBC transfusion if PCV <15%","Chelation: CaEDTA 25 mg/kg IV CRI over 24h (zinc chelation — mild cases)","D-penicillamine 125–250 mg/dog PO BID × 7 days (oral chelation)","SAMe and Ursodiol (hepatoprotection)"],
        procedures: ["Endoscopic removal of zinc foreign body (coins — often US pennies post-1982)","Transfusion support","Urine output monitoring"],
        diet: ["Introduce soft food after source removed and hemolysis controlled"]
      },
      education: {
        monitor: ["PCV every 12–24h","Liver and renal function","Signs of continued hemolysis","Zinc source identification"],
        red_flags: ["Severe intravascular hemolysis","Renal failure (hemoglobin nephrotoxicity)","Failure to improve after removal — additional zinc pieces?"],
        followup: "PCV recheck 24h, 48h, 72h after source removal; liver and kidney values at 1 week; prevention: keep coins, zinc cream, batteries away from pets",
        prognosis: "fair"
      }
    },

    {
      id: "acetaminophen_toxicosis",
      name: "Acetaminophen (Paracetamol) Toxicosis",
      species: ["dog","cat"],
      category: "Toxicology",
      emergency: true,
      signals: {
        complaints_lethargy: 8, complaints_vomiting: 7, mm_pale: 8, mm_cyanotic: 8,
        mm_icteric: 6, complaints_dyspnea: 7, complaints_anorexia: 6,
        hpi_onset_sudden: 9, history_toxin_ingestion: 10,
        temp_high: 4
      },
      tests: {
        tier1: ["MetHb (methemoglobin level — elevated)","CBC + blood smear (Heinz body anemia)","Chemistry (AST, ALT, bilirubin — hepatotoxicity)","PCV/TS"],
        tier2: ["Acetaminophen level (if available)","Coagulation panel","Urinalysis"],
        tier3: []
      },
      treatment: {
        medications: ["N-Acetylcysteine (NAC): 140 mg/kg IV loading dose, then 70 mg/kg IV/PO q4h × 7 doses (ANTIDOTE — replenish glutathione)","Ascorbic acid (Vitamin C) 30 mg/kg IV slow q6h (reduce metHb)","SAMe 20 mg/kg PO SID (glutathione precursor)","Methylene blue 1.5 mg/kg IV slowly (metHb — cats — use CAREFULLY — may worsen Heinz body hemolysis)","Blood transfusion if PCV <15% or severe metHb","Vitamin K1 (hepatic coagulopathy)"],
        procedures: ["Induce emesis if <1h: Apomorphine 0.04 mg/kg IV dog","Activated charcoal 1–4 g/kg PO","Oxygen supplementation (brown mucous membranes — metHb)","IV access + fluids","Intensive monitoring"],
        diet: ["NPO initially","Hepatic support diet after recovery"]
      },
      education: {
        monitor: ["Mucous membrane color (chocolate-brown = metHb)","PCV every 6–12h","Liver enzymes daily","Methemoglobin if measurable"],
        red_flags: ["CATS EXTREMELY SENSITIVE — single regular tablet can be fatal","Brown mucous membranes — metHb emergency","Hepatic failure within 24–48h in cats","Facial/limb swelling (cats — specific sign)"],
        followup: "Intensive care 48–72h; liver enzymes at 3 days; NEVER give acetaminophen/Tylenol to cats — ALWAYS fatal without treatment",
        prognosis: "guarded"
      }
    },

    {
      id: "lead_toxicosis",
      name: "Lead Toxicosis",
      species: ["dog","cat"],
      category: "Toxicology / Neurology",
      emergency: true,
      signals: {
        complaints_seizures: 8, neuro_seizure: 8, complaints_vomiting: 7,
        complaints_behavioral: 7, neuro_disoriented: 7,
        complaints_lethargy: 7, complaints_anorexia: 6,
        hpi_onset_subacute: 6, history_toxin_ingestion: 7,
        env_outdoor: 5, age_puppy: 7, age_young: 6
      },
      tests: {
        tier1: ["Whole blood lead level (>0.4 μg/mL = diagnostic)","CBC — nucleated RBCs, basophilic stippling","Abdominal radiography (metallic fragments)"],
        tier2: ["Chemistry","Neurological exam","Urinalysis"],
        tier3: []
      },
      treatment: {
        medications: ["CaEDTA 25 mg/kg IV CRI over 24h × 5 days (chelation — FIRST-LINE)","Succimer (DMSA) 10 mg/kg PO TID × 10 days (oral chelation — less GI irritation)","Diazepam 0.5 mg/kg IV (seizures)","Phenobarbital 2.5–5 mg/kg PO BID (ongoing seizure management)","Antibiotics if aspiration or secondary infection"],
        procedures: ["Remove lead source (endoscopy/surgery if metallic foreign body in GI)","Monitor blood lead levels q3–5 days during chelation","Repeat chelation cycles if blood lead remains elevated"],
        diet: ["Normal nutritious diet during chelation","Calcium supplementation (competes with lead absorption)","Prevent access to lead paint, batteries, fishing weights, leaded gasoline"]
      },
      education: {
        monitor: ["Blood lead levels q3–5 days","Seizure control","GI signs","CBC resolution","Neurological recovery"],
        red_flags: ["Status epilepticus","Ascending neurological signs","Anemia (lead inhibits heme synthesis)","Abdominal radiograph — multiple metallic fragments"],
        followup: "Blood lead recheck at end of each chelation cycle; repeat cycles until <0.2 μg/mL; remove household lead sources permanently; paint chip ingestion — remove pet from environment",
        prognosis: "guarded"
      }
    },

    // ═══════════════════════════ RESPIRATORY FURTHER ════════════════════════

    {
      id: "chronic_bronchitis_dog",
      name: "Chronic Bronchitis (COPD equivalent — Dog)",
      species: ["dog"],
      category: "Respiratory",
      signals: {
        complaints_coughing: 9, complaints_dyspnea: 6, complaints_lethargy: 6,
        chest_accessory_muscles: 5, resp_crackles_coarse: 7, resp_wheeze: 6,
        hpi_onset_chronic: 9, hpi_progression_worsening: 5,
        age_middle: 5, age_old: 7,
        breed_labrador: 4, breed_cocker: 5
      },
      contra_signals: { temp_high: -3, hpi_onset_sudden: -4 },
      tests: {
        tier1: ["Thoracic radiography (bronchial pattern, hyperinflation)","CBC (eosinophilia? neutrophilia?)","Tracheal/bronchial wash cytology + culture"],
        tier2: ["Bronchoalveolar lavage (BAL) cytology","Heartworm test","Echocardiogram (rule out cardiac cough)","Bronchoscopy"],
        tier3: ["Pulmonary function testing (specialist)","CT thorax","Referral: veterinary internist/pulmonologist"]
      },
      treatment: {
        medications: ["Bronchodilators: Theophylline 10 mg/kg PO BID (dog) OR Terbutaline 0.01 mg/kg SC prn (acute bronchospasm)","Prednisolone 0.5–1 mg/kg PO SID × 4 weeks then taper (anti-inflammatory)","Inhaled fluticasone 110 μg/puff q12h via spacer (maintenance — reduces systemic side effects)","Inhaled salbutamol/albuterol 0.1 mg/kg prn via spacer (bronchospasm rescue)","Antibiotic if secondary infection (based on culture)","Hydrocodone bitartrate 0.22 mg/kg PO BID-TID (cough suppressant — short courses only)"],
        procedures: ["Nebulization with saline BID (loosen secretions)","Coupage × 10 min after nebulization","Avoid smoke, dust, aerosol exposure","Weight management"],
        diet: ["Weight loss if obese","Omega-3 supplementation (anti-inflammatory)"]
      },
      education: {
        monitor: ["Cough frequency (owner diary)","Exercise tolerance","Respiratory rate","Annual thoracic radiograph"],
        red_flags: ["Cough with mucopurulent sputum — bacterial infection","Syncope with coughing (cough-drop syndrome)","Progressive dyspnea at rest","SpO2 <94%"],
        followup: "Recheck 4–6 weeks; inhaled steroids: recheck q3–6 months; incurable — manage for quality of life; avoid euthanasia if symptoms controlled",
        prognosis: "fair"
      }
    },

    {
      id: "laryngeal_paralysis",
      name: "Laryngeal Paralysis",
      species: ["dog","cat"],
      category: "Respiratory",
      emergency: true,
      signals: {
        complaints_dyspnea: 9, complaints_coughing: 7, chest_open_mouth: 7,
        chest_accessory_muscles: 7, complaints_behavioral: 5,
        resp_wheeze: 7, hpi_onset_chronic: 6,
        age_old: 8, weight_large: 7,
        breed_labrador: 8, breed_golden: 7, breed_great_dane: 6,
        breed_irish_setter: 7
      },
      tests: {
        tier1: ["Laryngoscopy under light sedation (DIAGNOSTIC — paradoxical motion of arytenoids)","Thoracic radiography","CBC/chemistry"],
        tier2: ["Thyroid panel (hypothyroidism — cause)","EMG / nerve conduction (polyneuropathy assessment)","Thoracic CT (mass — acquired LP)","Anti-acetylcholine receptor antibodies (myasthenia)"],
        tier3: ["Referral: soft tissue surgeon","Neurologist (polyneuropathy workup)"]
      },
      treatment: {
        medications: ["ACUTE CRISIS: Dexamethasone 0.1–0.2 mg/kg IV","Acepromazine 0.01–0.05 mg/kg IM (sedation — reduce anxiety)","Butorphanol 0.2–0.4 mg/kg IM (sedation)","Furosemide 1 mg/kg IV (pulmonary edema from respiratory effort)","Treat hypothyroidism if causal: Levothyroxine 20–22 μg/kg PO BID"],
        procedures: ["Oxygen supplementation — flow-by or hood","Surgical correction — PREFERRED: Unilateral arytenoid lateralization (tie-back surgery)","Cooling (hyperthermia common in distress)","Intubation if crisis non-responsive"],
        diet: ["Elevate food and water bowl","Soft or moist food (reduce aspiration risk post-surgery)","Small meals only"]
      },
      education: {
        monitor: ["Breathing quality","Body temperature (heat stress risk)","Post-surgical aspiration","Exercise tolerance"],
        red_flags: ["Inspiratory stridor at rest — near obstruction","Cyanosis","Temperature >40°C","Aspiration pneumonia post-surgery (15–20% complication rate)"],
        followup: "Post-op recheck 2 weeks, 6 weeks; POLYNM (Geriatric Onset Laryngeal Paralysis Polyneuropathy — GOLPP): monitor for progression of hindlimb weakness; avoid overheating lifelong",
        prognosis: "fair"
      }
    },

    // ═══════════════════════════ ONCOLOGY EXPANDED ══════════════════════════

    {
      id: "thyroid_carcinoma_dog",
      name: "Thyroid Carcinoma (Dog)",
      species: ["dog"],
      category: "Oncology / Endocrinology",
      signals: {
        complaints_swelling_mass: 9, complaints_dyspnea: 6, complaints_coughing: 5,
        complaints_dysphagia: 5, complaints_behavioral: 5,
        age_old: 7, age_middle: 5,
        breed_beagle: 6, breed_golden: 5, breed_boxer: 5
      },
      tests: {
        tier1: ["Physical exam — cervical mass","CBC/chemistry","Thyroid function: T4, TSH","Fine needle aspirate — FNA of mass"],
        tier2: ["Thoracic radiography (pulmonary metastasis)","Ultrasound of mass (vascularity)","CT neck/chest (local invasion, staging)","Scintigraphy (radionuclide — functional tumor)"],
        tier3: ["Referral: veterinary oncologist/surgeon"]
      },
      treatment: {
        medications: ["Levothyroxine (if hypothyroid post-thyroidectomy)","Doxorubicin-based chemotherapy (metastatic — per oncologist)","Toceranib 2.75 mg/kg PO EOD (RTK inhibitor — unresectable)"],
        procedures: ["Surgical thyroidectomy (CURATIVE for freely moveable masses)","Radioactive iodine 131I (bilateral, metastatic, or functional carcinoma)","Radiation therapy (invasive/non-resectable)"],
        diet: ["Normal diet — iodine supplementation if hypothyroid post-thyroidectomy"]
      },
      education: {
        monitor: ["Thyroid hormone levels post-thyroidectomy","Thoracic radiograph q3 months (metastasis)","Cervical recurrence on palpation/ultrasound","Calcium post-surgery (parathyroid damage — hypocalcemia)"],
        red_flags: ["Dyspnea from tracheal compression","Fixed mass (invasion — unresectable)","Postoperative hypocalcemia — tetany"],
        followup: "Oncology staging before surgery; freely moveable: 1-year survival >90% with surgery; fixed/metastatic: much worse; radioiodine referral for functional carcinomas",
        prognosis: "fair"
      }
    },

    {
      id: "transitional_cell_carcinoma",
      name: "Transitional Cell Carcinoma (TCC) of Bladder",
      species: ["dog","cat"],
      category: "Oncology / Urology",
      signals: {
        complaints_hematuria: 9, complaints_dysuria: 9, complaints_stranguria: 8,
        complaints_polyuria: 5, complaints_weight_loss: 5,
        bladder_distension: 5, hpi_onset_subacute: 6, hpi_progression_worsening: 6,
        age_old: 8, age_middle: 6,
        breed_scottish_terrier: 9, breed_shetland: 7, breed_beagle: 6,
        breed_west_highland: 6
      },
      tests: {
        tier1: ["Urinalysis + sediment (hematuria, pyuria, atypical cells)","Bladder ultrasound (trigone mass)","CADET BRAF mutation urine test (dog — high sensitivity/specificity for TCC)"],
        tier2: ["Cystoscopy with biopsy (histopathology — GOLD STANDARD)","CT abdomen/pelvis (staging — lymph nodes, urethra)","Thoracic radiography","CBC/chemistry"],
        tier3: ["Referral: veterinary oncologist/internist"]
      },
      treatment: {
        medications: ["Piroxicam 0.3 mg/kg PO SID with food (NSAID — anti-tumor; standard of care — 50% response)","Mitoxantrone + Piroxicam (improved response)","Toceranib 2.75 mg/kg PO EOD + Piroxicam (combination — some responses)","Vinblastine + Piroxicam (alternative)"],
        procedures: ["Surgical resection (rarely possible — trigone involvement in most dogs)","Stent placement (urethral obstruction)","Temporary cystostomy tube (urinary diversion)","Radiation therapy (palliative)"],
        diet: ["Urinary acidification (reduces risk of crystalluria concurrently)","Normal nutrition + omega-3"]
      },
      education: {
        monitor: ["Dysuria frequency","Hematuria degree","Body weight and appetite","Urethral obstruction signs","Chest radiograph q3 months"],
        red_flags: ["Complete urethral obstruction — emergency","Rapid tumor growth","Pyuria + fever (secondary infection)","Metastasis to lungs"],
        followup: "Ultrasound + CBC monthly; piroxicam long-term; median survival with treatment 6–12 months; good palliative response often achieved; Scottish Terriers at 18× normal risk",
        prognosis: "guarded"
      }
    },

    {
      id: "soft_tissue_sarcoma",
      name: "Soft Tissue Sarcoma",
      species: ["dog","cat"],
      category: "Oncology",
      signals: {
        complaints_swelling_mass: 9, complaints_limping: 5,
        hpi_onset_subacute: 6, hpi_progression_worsening: 7,
        age_old: 7, age_middle: 5,
        breed_labrador: 4, breed_golden: 5
      },
      tests: {
        tier1: ["Fine needle aspirate (FNA) — spindle cell morphology (often inconclusive)","Biopsy — incisional biopsy REQUIRED for definitive diagnosis + grade","CBC/chemistry"],
        tier2: ["Thoracic radiography (metastasis — grade-dependent)","Regional lymph node aspirate","CT/MRI of mass (extent, local invasion)"],
        tier3: ["Referral: veterinary oncologist/surgeon","Immunohistochemistry (tumor type classification)"]
      },
      treatment: {
        medications: ["Doxorubicin-based chemotherapy (high-grade — adjunct to surgery)","Metronomic cyclophosphamide + piroxicam (low-grade — adjunct)","Analgesics during and after treatment"],
        procedures: ["WIDE SURGICAL EXCISION with 2–3 cm margins (DEFINITIVE — incomplete margins = local recurrence)","Radiation therapy (adjunct for incomplete margins)","Re-excision if margins incomplete (if feasible)"],
        diet: ["High-quality nutritional support","Cancer-related cachexia: high-protein, moderate-fat diet"]
      },
      education: {
        monitor: ["Surgical site for local recurrence","Regional lymph nodes","Thoracic radiograph q3 months (metastasis)","Wound healing"],
        red_flags: ["Local recurrence within weeks (aggressive tumor)","Metastasis — high-grade STS","Ulceration of mass (pre-surgical)"],
        followup: "Histopathology for grade — Grade 1: low metastatic rate, wide excision often curative; Grade 2–3: adjunct chemo + RT; recheck q3 months",
        prognosis: "fair"
      }
    },

    {
      id: "vaccine_associated_sarcoma",
      name: "Vaccine-Associated Sarcoma (FISS) — Feline",
      species: ["cat"],
      category: "Oncology",
      emergency: false,
      signals: {
        complaints_swelling_mass: 9, hpi_onset_subacute: 7,
        hpi_progression_worsening: 8, age_middle: 5, age_old: 6,
        complaints_lethargy: 4, complaints_weight_loss: 5
      },
      tests: {
        tier1: ["FNA — spindle cell sarcoma (often FNA insufficient — biopsy preferred)","Incisional biopsy (REQUIRED — histopath + grade + margins)","CBC/chemistry"],
        tier2: ["CT of lesion + thorax + abdomen (STAGING — superior to radiograph)","Regional lymph node aspirate","Thoracic radiograph (if CT not available)"],
        tier3: ["Referral: veterinary oncologist — URGENTLY","Immunohistochemistry"]
      },
      treatment: {
        medications: ["Doxorubicin-based chemotherapy (post-surgery — adjunct)","Carboplatin (alternative or adjunct)","COX-2 inhibitors (palliative)"],
        procedures: ["RADICAL WIDE EXCISION (MOST IMPORTANT) — minimum 5 cm margins including deep muscle plane","Radiation therapy (adjunct — pre-op or post-op)","NEVER just 'lump removal' — recurrence rate >90% with narrow margins"],
        diet: ["High-quality nutritional support","Anti-cancer diet (high-protein, moderate-fat, low simple carb)"]
      },
      education: {
        monitor: ["Surgical site q4 weeks (recurrence common)","Thoracic metastasis q3 months","Body weight","Any new swellings in injection sites"],
        red_flags: ["Rapid local recurrence (weeks)","Pulmonary metastasis","Any injection-site swelling persisting >4 weeks after vaccination — BIOPSY"],
        followup: "Oncology referral immediately; recurrence median 6 months even with aggressive surgery + RT; vaccinate in distal limb (allows amputation) per current guidelines; report to AVMA vaccine adverse events",
        prognosis: "poor"
      }
    },

    // ═══════════════════════════ FURTHER CONDITIONS ══════════════════════════

    {
      id: "aortic_stenosis_cat",
      name: "Hypertrophic Cardiomyopathy with Dynamic Outflow Obstruction — Cat",
      species: ["cat"],
      category: "Cardiology",
      signals: {
        complaints_dyspnea: 8, complaints_lethargy: 7, complaints_collapse: 7,
        cardiac_murmur_34: 7, cardiac_arrhythmia: 5, hr_high: 5,
        resp_muffled: 6, abdomen_fluid_wave: 5,
        age_middle: 6, age_old: 6, sex_male_intact: 5,
        breed_maine_coon: 8, breed_ragdoll: 7, breed_persian: 5,
        hpi_onset_sudden: 6
      },
      tests: {
        tier1: ["Echocardiogram (LV wall thickness >6mm diastole — DIAGNOSTIC, LVOTO, SAM)","Thoracic radiography","ECG","Blood pressure"],
        tier2: ["NT-proBNP (elevated — correlates with disease severity)","Troponin I","CBC/chemistry","Thyroid panel (rule out hyperthyroidism)"],
        tier3: ["Referral: veterinary cardiologist","Holter monitor (arrhythmia detection)"]
      },
      treatment: {
        medications: ["Atenolol 6.25–12.5 mg/cat PO BID (obstructive HCM — negative chronotrope)","Diltiazem SR 30–45 mg/cat PO BID (arrhythmia)","Furosemide 1–2 mg/kg PO BID (CHF — diuresis)","Clopidogrel 18.75 mg/cat PO SID (ATE prevention — FATCAT study)","Rivaroxaban 2.5 mg/cat PO SID (anticoagulant — alternative)","Aspirin 81 mg/cat PO q72h (historical — less favored now)"],
        procedures: ["Thoracocentesis (pleural effusion)","Abdominocentesis (ascites)","Cage rest — minimize stress","Oxygen supplementation in crisis"],
        diet: ["Sodium-restricted diet (Cardiac prescription diet)","Omega-3 supplementation"]
      },
      education: {
        monitor: ["Resting respiratory rate daily at home (>30 brpm — emergency call)","Weight weekly","Syncope or rear limb weakness (ATE)","Appetite"],
        red_flags: ["Sudden hind limb paralysis, cold limbs — ATE (EMERGENCY)","RRR >40 brpm","Cyanosis","Open-mouth breathing"],
        followup: "Echocardiogram at 6 months; Maine Coon/Ragdoll: MYBPC3 genetic test; ATE recurrence risk high — lifelong clopidogrel; prognosis varies (months to years)",
        prognosis: "guarded"
      }
    },

    {
      id: "perianal_fistula",
      name: "Perianal Fistula (Anal Furunculosis)",
      species: ["dog"],
      category: "Surgery / Dermatology",
      signals: {
        complaints_behavioral: 8, complaints_diarrhea: 6, complaints_hematochezia: 6,
        complaints_dysuria: 5, complaints_anorexia: 5,
        age_middle: 5, age_old: 6,
        breed_german_shepherd: 9, breed_irish_setter: 6
      },
      tests: {
        tier1: ["Physical exam under sedation (severity grading I–IV)","Culture of exudate","CBC/chemistry","Rectal exam"],
        tier2: ["Colonoscopy (concurrent IBD — very common)","Biopsy (confirm furunculosis — lymphoplasmacytic infiltrate)","Proctoscopy"],
        tier3: ["Referral: soft tissue surgeon","Internist (concurrent IBD)"]
      },
      treatment: {
        medications: ["Cyclosporine 5 mg/kg PO SID (FIRST-LINE — immunomodulation; response rate >80%)","Ketoconazole 10 mg/kg PO SID (with cyclosporine — inhibits metabolism, reduces dose needed)","Tacrolimus 0.1% topical BID (adjunct)","Metronidazole 10 mg/kg PO BID × 4 weeks (concurrent infection)","Prednisolone 1 mg/kg PO SID × 4 weeks then taper (alternative or adjunct)","Pain: Tramadol 2–5 mg/kg PO BID-TID"],
        procedures: ["Surgical debridement/tail amputation (selected cases)","Chemical cauterization (phenol)","Cryotherapy (selected cases)","Tail amputation (low tail-set predisposition)"],
        diet: ["Gluten-free or novel protein diet (suspected immune-mediated component)","High-fiber diet (improve defecation)"]
      },
      education: {
        monitor: ["Lesion healing and regression","Pain level","GSD concurrent IBD signs","Relapse after cyclosporine taper","Blood pressure (cyclosporine hypertension)"],
        red_flags: ["Grade IV (circumferential involvement)","Sepsis from deep infection","Non-response to cyclosporine × 12 weeks"],
        followup: "Recheck every 4 weeks; cyclosporine minimum 8–16 weeks; long-term maintenance often required; recurrence common — lifetime management in many dogs",
        prognosis: "fair"
      }
    },

    {
      id: "exfoliative_dermatitis_cat",
      name: "Exfoliative Dermatitis / Thymoma-Associated Exfoliative Dermatitis — Cat",
      species: ["cat"],
      category: "Dermatology / Oncology",
      signals: {
        complaints_skin_lesions: 9, skin_alopecia_diffuse: 9, skin_crusts: 8,
        skin_erythema: 7, complaints_weight_loss: 6,
        complaints_lethargy: 5, age_old: 7,
        hpi_onset_subacute: 6, hpi_progression_worsening: 7
      },
      tests: {
        tier1: ["Skin biopsy (interface or exfoliative dermatitis pattern)","CBC/chemistry","Thoracic radiography (anterior mediastinal mass — thymoma)"],
        tier2: ["CT thorax (thymoma)","FeLV/FIV","Skin culture"],
        tier3: ["Referral: veterinary dermatologist/oncologist"]
      },
      treatment: {
        medications: ["Thymoma: Prednisolone 2–4 mg/kg PO SID × 4–6 weeks (palliative)","Chemotherapy: Doxorubicin/cyclophosphamide (thymoma adjunct)"],
        procedures: ["Thymectomy (curative if no metastasis — skin lesions may resolve post-thymectomy)","Wound care for eroded skin"],
        diet: ["Supportive high-calorie diet"]
      },
      education: {
        monitor: ["Skin lesion progression","Respiratory signs (thymoma)","Weight"],
        red_flags: ["Dyspnea (pleural effusion from thymoma)","Cachexia","Rapid skin deterioration"],
        followup: "Thymectomy outcome dictates prognosis — skin may resolve post-surgery; thymoma without surgery: poor prognosis",
        prognosis: "guarded"
      }
    },

    {
      id: "feline_hypervitaminosis_a",
      name: "Feline Hypervitaminosis A (Vitamin A Toxicosis)",
      species: ["cat"],
      category: "Nutritional / Orthopedics / Toxicology",
      signals: {
        complaints_limping: 8, gait_moderate_lameness: 7, complaints_behavioral: 7,
        complaints_anorexia: 5, posture_kyphosis: 8,
        limbs_joint_pain: 7, limbs_reduced_rom: 7,
        hpi_onset_chronic: 8, age_middle: 5, age_old: 6
      },
      tests: {
        tier1: ["Cervical spine and shoulder radiography — PATHOGNOMONIC (exostoses/bone proliferation C1–C7)","Serum Vitamin A level (elevated)","Diet history (raw liver feeding)"],
        tier2: ["CBC/chemistry","Full spine radiography (extent of ankylosis)"],
        tier3: []
      },
      treatment: {
        medications: ["STOP dietary Vitamin A excess (liver — remove from diet)","Analgesics: Meloxicam 0.1 mg/kg PO SID (pain management)","Buprenorphine 0.01 mg/kg buccal q8h (pain)"],
        procedures: ["Dietary correction is primary treatment","Physical therapy (maintain ROM)","Manage pain for quality of life"],
        diet: ["ELIMINATE raw liver from diet COMPLETELY","Balanced commercial cat food — complete and balanced","No supplemental Vitamin A or fish oil overdose"]
      },
      education: {
        monitor: ["Neck range of motion","Pain level","Appetite","Radiographic changes (can improve with diet correction but existing exostoses are permanent)"],
        red_flags: ["Cervical myelopathy (bone compresses spinal cord — paralysis)","Rapid ankylosing progression"],
        followup: "Radiograph at 6 months (progression if diet not corrected); pain management lifelong; diet correction prevents further progression",
        prognosis: "fair"
      }
    },

    {
      id: "hypothermia",
      name: "Hypothermia",
      species: ["dog","cat"],
      category: "Emergency / Environmental",
      emergency: true,
      signals: {
        complaints_lethargy: 8, complaints_collapse: 8, complaints_behavioral: 7,
        temp_low: 10, hr_low: 7, mm_pale: 7, mm_tacky: 6,
        attitude_obtunded: 8, hydration_moderate: 5,
        hpi_onset_sudden: 7, env_outdoor: 7
      },
      tests: {
        tier1: ["Core temperature (rectal/esophageal — ESSENTIAL)","ECG (Osborn J waves, arrhythmia)","Blood glucose (hypoglycemia common)"],
        tier2: ["CBC/chemistry","Blood gas","Coagulation panel (DIC risk)","Lactate"],
        tier3: []
      },
      treatment: {
        medications: ["Dextrose 50% 0.5–1 mL/kg IV diluted (hypoglycemia correction)","Warm IV fluids (38–40°C LRS) — active core rewarming","Atropine (cardiac arrhythmia — after core temperature >30°C)","Antibiotics if infection caused hypothermia","Glucagon (refractory hypoglycemia)"],
        procedures: ["PASSIVE rewarming: dry, warm blankets, remove from cold","ACTIVE EXTERNAL: warm water bottles (wrapped), heated air blanket","ACTIVE INTERNAL: warm IV fluids, warm saline lavage (bladder/gastric) for severe (<28°C)","Continuous ECG monitoring","O2 supplementation","Urinary catheter (output monitoring)"],
        diet: ["Glucose supplementation until normoglycemic"]
      },
      education: {
        monitor: ["Core temperature q15–30 min","ECG continuously","Blood glucose q30 min","Urine output","Signs of rewarming syndrome (paradoxical worsening)"],
        red_flags: ["Core temp <28°C — life-threatening arrhythmia risk","Ventricular fibrillation","Not rewaming after 30 min active measures","Cardiac arrest — continue CPR until warm (not dead until warm and dead)"],
        followup: "Hospitalize until normothermic and stable; CBC/chemistry at 12h for DIC, infection, AKI; investigate underlying cause (neonatal, hypothyroid, trauma, submersion)",
        prognosis: "guarded"
      }
    },

    {
      id: "heatstroke",
      name: "Heat Stroke / Hyperthermia",
      species: ["dog","cat"],
      category: "Emergency / Environmental",
      emergency: true,
      signals: {
        temp_high: 10, complaints_collapse: 8, complaints_behavioral: 7,
        complaints_vomiting: 6, complaints_dyspnea: 7,
        hr_high: 7, mm_brick_red: 8, mm_tacky: 6,
        attitude_obtunded: 7, hpi_onset_sudden: 9,
        env_outdoor: 7, breed_bulldog: 7, breed_pug: 7
      },
      tests: {
        tier1: ["Core temperature (rectal) — >41°C diagnostic","CBC (hemoconcentration, thrombocytopenia in DIC)","Chemistry (BUN, ALT, CK, lactate)","PT/aPTT (DIC)"],
        tier2: ["Urinalysis (myoglobinuria — dark urine)","Blood gas","Blood glucose","ECG"],
        tier3: []
      },
      treatment: {
        medications: ["COOL IMMEDIATELY: tepid water (20°C) — NOT ice/cold water (vasoconstriction)","IV fluids: Normal saline or LRS — aggressive (shock dose: 30–45 mL/kg over 30 min then reassess)","Dexamethasone 1 mg/kg IV (cerebral edema — disputed but widely used)","Mannitol 0.5–1 g/kg IV (cerebral edema — select cases)","Heparin 100 U/kg SC TID (DIC prophylaxis)","Dextrose (hypoglycemia correction)","Maropitant 1 mg/kg SC SID"],
        procedures: ["Stop cooling when T=39.5°C (prevent overshoot hypothermia)","Oxygen supplementation","Urinary catheter (urine output monitoring)","Continuous ECG","ICU monitoring 24–48h"],
        diet: ["NPO initially","Bland food when stable","Adequate hydration ongoing"]
      },
      education: {
        monitor: ["Temperature q5–10 min during cooling","Urine output (AKI risk)","PT/aPTT (DIC)","Mentation","Glucose"],
        red_flags: ["Temperature >43°C — severe cellular damage","DIC — spontaneous bleeding","Anuric AKI","Neurological deterioration (cerebral edema)","Myoglobinuria (acute tubular necrosis)"],
        followup: "Hospitalize minimum 24h; renal function recheck 48–72h; long-term neurological sequelae possible; prevent recurrence — avoid hot environments, NEVER leave in car, schedule exercise in cool hours",
        prognosis: "guarded"
      }
    },


    // ═══════════════════════════ ADDITIONAL CONDITIONS BATCH 4 ══════════════

    {
      id: "spinal_lumbosacral_stenosis",
      name: "Lumbosacral Stenosis / Cauda Equina Syndrome",
      species: ["dog"],
      category: "Neurology / Orthopedics",
      signals: {
        complaints_limping: 7, gait_moderate_lameness: 7, complaints_behavioral: 7,
        gait_ataxia: 5, limbs_muscle_atrophy: 6, posture_kyphosis: 6,
        hpi_onset_chronic: 7, hpi_progression_worsening: 6,
        age_middle: 6, age_old: 7, weight_large: 7,
        breed_german_shepherd: 8, breed_labrador: 6
      },
      tests: {
        tier1: ["Neurological exam (tail, hind limb, anal tone, bladder)","Lumbosacral radiography (endplate sclerosis, disc space narrowing)","CBC/chemistry"],
        tier2: ["MRI lumbosacral junction (GOLD STANDARD)","CT myelogram","EMG/NCT (nerve conduction)"],
        tier3: ["Referral: veterinary neurologist/surgeon"]
      },
      treatment: {
        medications: ["Prednisolone 0.5–1 mg/kg PO SID × 5–7d (acute)","Meloxicam 0.1 mg/kg PO SID (chronic maintenance)","Gabapentin 10–15 mg/kg PO TID (neuropathic pain)","Tramadol 2–5 mg/kg PO BID-TID (adjunct)"],
        procedures: ["Epidural corticosteroid injection (non-surgical option — CT guided)","Surgical decompression — laminectomy (moderate-severe, progressive)","Physical rehabilitation post-surgery","Weight management"],
        diet: ["Weight loss if obese","Joint support supplements"]
      },
      education: {
        monitor: ["Hind limb function","Bladder/bowel control","Pain management","Post-surgical recovery"],
        red_flags: ["Loss of anal tone or bladder/bowel control","Rapid progression","Non-weight-bearing hind limbs"],
        followup: "Neurological recheck every 4 weeks; MRI reassessment pre-surgery; post-op recheck 6 weeks; recurrence possible — long-term management",
        prognosis: "fair"
      }
    },

    {
      id: "pemphigus_vulgaris",
      name: "Pemphigus Vulgaris",
      species: ["dog","cat"],
      category: "Dermatology / Immunology",
      emergency: true,
      signals: {
        complaints_skin_lesions: 9, skin_pustules: 7, skin_erythema: 7,
        complaints_anorexia: 7, complaints_behavioral: 7,
        temp_high: 5, attitude_dull: 6,
        hpi_onset_subacute: 6, age_middle: 5
      },
      tests: {
        tier1: ["Skin biopsy (suprabasal acantholytic pustules — DIAGNOSTIC; deeper than PF)","Cytology (acantholytic cells)","CBC/chemistry"],
        tier2: ["Direct immunofluorescence (intercellular IgG)","ANA (rule out SLE)","Mucosal biopsy (oral erosions)"],
        tier3: ["Referral: veterinary dermatologist"]
      },
      treatment: {
        medications: ["Prednisolone 2–4 mg/kg PO SID (induction)","Azathioprine 2 mg/kg PO SID (dog — steroid-sparing)","Cyclosporine 5 mg/kg PO SID (cat — preferred)","Dexamethasone 0.1–0.2 mg/kg IV (severe/hospitalized)"],
        procedures: ["Oral hygiene support (chlorhexidine rinse)","Wound care — esion debridement","CBC monitoring q2–4 weeks"],
        diet: ["Soft food (oral erosions)","Tube feeding if unable to eat"]
      },
      education: {
        monitor: ["Mucosal and cutaneous erosions","CBC (immunosuppression)","Pain and eating ability","Systemic signs (sepsis risk)"],
        red_flags: ["Septic shock from extensive erosions","Esophageal/GI involvement","Failure to respond to prednisolone × 2 weeks"],
        followup: "More serious than pemphigus foliaceus; aggressive immunosuppression required; lifelong management in most; regular CBC monitoring essential",
        prognosis: "guarded"
      }
    },

    {
      id: "discoid_lupus",
      name: "Discoid Lupus Erythematosus (DLE)",
      species: ["dog"],
      category: "Dermatology / Immunology",
      signals: {
        complaints_skin_lesions: 9, skin_erythema: 8, skin_alopecia_focal: 7,
        skin_hyperpigmentation: 6, skin_crusts: 6,
        age_middle: 5, age_young: 4,
        breed_collie: 7, breed_german_shepherd: 6, breed_siberian_husky: 6
      },
      contra_signals: { lymph_moderate: -3, mm_pale: -2 },
      tests: {
        tier1: ["Skin biopsy (hydropic interface dermatitis + plasma cell infiltrate)","ANA (negative in DLE — confirms NOT SLE)","CBC/chemistry (normal in DLE)"],
        tier2: ["DIF (direct immunofluorescence — IgG band at DEJ)"],
        tier3: ["Referral: veterinary dermatologist"]
      },
      treatment: {
        medications: ["Tetracycline + niacinamide 250 mg each PO TID (dogs <10 kg)","Tetracycline + niacinamide 500 mg each PO TID (dogs >10 kg)","Tacrolimus 0.1% topical ointment BID","Prednisolone 0.5–1 mg/kg PO SID × 4 weeks (moderate-severe)","Cyclosporine 5 mg/kg PO SID (refractory)","Pentoxifylline 25 mg/kg PO BID"],
        procedures: ["Sun avoidance (UV triggers flares)","Apply canine sunscreen SPF50+ to nose BID outdoor use","Gentle cleaning of crust"],
        diet: ["Omega-3 fatty acid supplementation (EPA/DHA)"]
      },
      education: {
        monitor: ["Nasal depigmentation progression","Lesion activity","Sun exposure management","Response to topical therapy"],
        red_flags: ["Systemic signs developing (→ may be evolving to SLE)","Rapid depigmentation + ulceration","Secondary bacterial infection"],
        followup: "Recheck at 6–8 weeks; sun avoidance lifelong; DLE is benign — confined to skin; does not progress to systemic disease in most cases",
        prognosis: "good"
      }
    },

    {
      id: "follicular_dysplasia",
      name: "Follicular Dysplasia / Color Dilution Alopecia",
      species: ["dog"],
      category: "Dermatology",
      signals: {
        complaints_hair_loss: 9, skin_alopecia_diffuse: 8, skin_poor_coat: 8,
        skin_dry: 6, hpi_onset_chronic: 7,
        age_young: 6, breed_doberman: 8,
        breed_blue_great_dane: 7, breed_chihuahua: 5
      },
      tests: {
        tier1: ["Trichogram (hair shaft dysplasia — melanin clumping)","Skin biopsy (dysplastic hair follicles with melanin aggregates)","Rule out endocrine: thyroid, adrenal"],
        tier2: ["CBC/chemistry","Thyroid panel"],
        tier3: []
      },
      treatment: {
        medications: ["Melatonin 3–6 mg PO q8–12h (may stimulate regrowth — some cases)","Omega-3 fatty acids 30–40 mg/kg/day","Antibacterial shampoo (secondary pyoderma)","Treat secondary infections as needed"],
        procedures: ["Manage secondary infections"],
        diet: ["High-quality diet with skin-supporting nutrients","Omega-3 supplementation"]
      },
      education: {
        monitor: ["Hair regrowth (incomplete in most)","Secondary pyoderma","Skin condition"],
        red_flags: ["Progressive hair loss not stabilizing","Infected skin lesions"],
        followup: "Recheck 8 weeks; genetic condition — advise against breeding affected dogs; alopecia is cosmetic in most cases; secondary infections need active management",
        prognosis: "fair"
      }
    },

    {
      id: "nasal_hyperkeratosis_idiopathic",
      name: "Idiopathic Nasal Hyperkeratosis",
      species: ["dog"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 7, skin_crusts: 9, skin_thickened: 9,
        nose_mucopurulent: 3, hpi_onset_chronic: 7, age_old: 5,
        breed_labrador: 5, breed_cocker: 4
      },
      tests: {
        tier1: ["Physical exam — dry, cracked, hyperkeratotic nasal planum","Skin biopsy (orthokeratotic hyperkeratosis — no acantholysis)","Rule out: DLE, PF, pemphigus, CDV (biopsy + ANA + CDV titer)"],
        tier2: ["Zinc levels","Chemistry panel"],
        tier3: []
      },
      treatment: {
        medications: ["Petroleum jelly or Musher's Secret wax BID (moisture barrier)","Propylene glycol 50–75% topical SID (keratolytic)","Tretinoin 0.025% cream topical SID (vitamin A — keratolytic)","Mupirocin if fissures infected"],
        procedures: ["Warm water soaks × 5 min then apply emollient while damp","Avoid sun exposure (UV worsens)"],
        diet: ["Normal complete diet","Omega-3 supplementation"]
      },
      education: {
        monitor: ["Fissure depth (fissures = pain + infection risk)","Response to moisturizing"],
        red_flags: ["Deep fissures with bleeding/pain","Secondary infection"],
        followup: "Lifelong moisturizing management; recheck 6–8 weeks; idiopathic form is benign; must rule out autoimmune causes first",
        prognosis: "good"
      }
    },

    {
      id: "nodular_hyperplasia_skin",
      name: "Sebaceous Gland Hyperplasia / Nodular Sebaceous Hyperplasia",
      species: ["dog"],
      category: "Dermatology / Oncology",
      signals: {
        complaints_swelling_mass: 8, complaints_skin_lesions: 7,
        skin_papules: 8, age_old: 8, age_middle: 5,
        hpi_onset_subacute: 5, breed_cocker: 7, breed_poodle: 6, breed_beagle: 5
      },
      contra_signals: { temp_high: -3 },
      tests: {
        tier1: ["FNA cytology (sebaceous cells — lobular clusters)","Physical exam — yellow/white umbilicated nodules"],
        tier2: ["Biopsy (if atypical)"],
        tier3: []
      },
      treatment: {
        medications: ["Observation only (benign — no treatment required in most cases)","Topical retinoid (cosmetic reduction — limited evidence)"],
        procedures: ["Surgical excision (if owner preference or traumatized/infected)","Cryotherapy"],
        diet: ["No dietary restriction"]
      },
      education: {
        monitor: ["New nodule formation","Changes in existing nodules (rapid growth, ulceration — reassess)"],
        red_flags: ["Rapid growth — reassess and biopsy (rule out sebaceous carcinoma)","Ulceration"],
        followup: "Recheck annually; purely cosmetic condition; common in cocker spaniels — multiple lesions normal in this breed",
        prognosis: "excellent"
      }
    },

    {
      id: "trombiculosis",
      name: "Trombiculosis (Harvest Mite / Chigger Infestation)",
      species: ["dog","cat"],
      category: "Dermatology / Parasitology / Tropical",
      signals: {
        complaints_skin_lesions: 8, skin_pruritus: 9, skin_erythema: 7,
        skin_papules: 8, complaints_behavioral: 6,
        env_outdoor: 8, env_endemic_area: 7, hpi_onset_sudden: 7,
        parasites_mites: 7
      },
      tests: {
        tier1: ["Skin scraping (orange mite larvae in follicles/skin)","Tape prep / coat examination (larvae visible as orange dots)","Physical exam — foot pads, ear margins, abdomen"],
        tier2: ["Wood's lamp (negative — rule out dermatophytosis)"],
        tier3: []
      },
      treatment: {
        medications: ["Lime sulfur dip 2–3% weekly × 4 weeks (kills mites)","Selamectin (Revolution) topical (off-label — effective)","Fipronil spot-on (off-label — repellent)","Chlorpheniramine 0.4 mg/kg PO BID (pruritus relief)","Prednisolone 0.5 mg/kg PO SID × 3–5d (severe pruritus)"],
        procedures: ["Avoid infested areas (grass fields in summer/autumn)","Environmental control not practical","Fipronil spray preventively before outdoor exposure"],
        diet: ["No specific dietary restriction"]
      },
      education: {
        monitor: ["Pruritus resolution after treatment","New lesion formation","Environment re-exposure"],
        red_flags: ["Secondary pyoderma from self-trauma","Persistent pruritus despite treatment"],
        followup: "Recheck 3 weeks; seasonal in many climates; prevent by avoiding tall grass/fallen leaves in endemic areas; boots for dogs in known endemic areas",
        prognosis: "excellent"
      }
    },

    {
      id: "tail_head_alopecia_cat",
      name: "Feline Tail Gland Hyperplasia (Stud Tail)",
      species: ["cat"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 8, skin_alopecia_focal: 7, skin_oily: 8,
        skin_erythema: 5, skin_crusts: 5,
        sex_male_intact: 9, age_young: 6, age_middle: 5
      },
      tests: {
        tier1: ["Physical exam — dorsal tail base seborrheic/waxy sebum accumulation","Cytology (comedones, bacteria, Malassezia)","Skin scraping (rule out Demodex)"],
        tier2: ["Culture and sensitivity (secondary infection)","CBC/chemistry (baseline)"],
        tier3: []
      },
      treatment: {
        medications: ["Testosterone level (usually high in intact males)","Castration (MOST EFFECTIVE — addresses testosterone-driven sebaceous hyperplasia)","Chlorhexidine 2% shampoo weekly","Benzoyl peroxide 2.5% shampoo weekly","Mupirocin ointment (secondary infection)","Antibiotics if deep infection: Cephalexin 20 mg/kg PO BID × 4 weeks"],
        procedures: ["Castration (curative in intact males)","Regular grooming of tail"],
        diet: []
      },
      education: {
        monitor: ["Sebum accumulation at tail base","Secondary infection","Testosterone influence"],
        red_flags: ["Deep furunculosis (painful, swollen lesions)","Non-response to castration"],
        followup: "Post-castration: recheck 6–8 weeks; significant improvement expected in 90% post-castration; grooming maintenance ongoing",
        prognosis: "excellent"
      }
    },

    {
      id: "oral_papillomatosis",
      name: "Canine Oral Papillomatosis",
      species: ["dog"],
      category: "Dermatology / Oral / Viral",
      signals: {
        complaints_swelling_mass: 8, complaints_behavioral: 6, complaints_anorexia: 5,
        age_puppy: 8, age_young: 7,
        env_kennel: 7, env_contact_other_pets: 7,
        hpi_onset_subacute: 7
      },
      tests: {
        tier1: ["Physical exam — cauliflower-like papillomas in oral cavity/lips","Biopsy (if atypical or non-regressing)"],
        tier2: ["CBC/chemistry (immunosuppression workup)","FNA (rule out other oral masses)"],
        tier3: []
      },
      treatment: {
        medications: ["Usually self-limiting — observation × 4–8 weeks","Azithromycin 5–10 mg/kg PO SID × 10 days (some evidence for accelerated regression)","Interferon alpha 1–2 MU/m² SC 3×/week (refractory)","Imiquimod 5% cream topical 3×/week (accessible lesions)"],
        procedures: ["Surgical excision / cryotherapy (persistent, large, interfering with eating)","Crushing papillomas (releases viral antigen — stimulates immunity) — anecdotal"],
        diet: ["Soft food if large lesions interfere with eating"]
      },
      education: {
        monitor: ["Size and number of lesions","Eating ability","Spontaneous regression timeline","Immunosuppression rule-out if persisting >3 months"],
        red_flags: ["Non-regression after 3 months — rebiopsy (squamous cell carcinoma in situ?)","Large lesions obstructing swallowing"],
        followup: "Recheck at 4–6 weeks; most resolve by 2 months; isolate from other puppies while lesions present (contagious papillomavirus)",
        prognosis: "excellent"
      }
    },

    {
      id: "mucocutaneous_pyoderma",
      name: "Mucocutaneous Pyoderma",
      species: ["dog"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 9, skin_erythema: 8, skin_crusts: 8,
        skin_alopecia_focal: 6, complaints_behavioral: 5,
        hpi_onset_subacute: 6, breed_german_shepherd: 8,
        breed_labrador: 5
      },
      tests: {
        tier1: ["Skin cytology (neutrophils, bacteria)","Skin biopsy (mucocutaneous junction — interface + plasmacytic inflammation)","Fluorescein stain (rule out corneal/mucosal ulceration)"],
        tier2: ["Culture and sensitivity","ANA, DLE workup (rule out autoimmune)"],
        tier3: ["Referral: veterinary dermatologist"]
      },
      treatment: {
        medications: ["Mupirocin 2% ointment topical BID × 3–4 weeks (antibacterial)","Tacrolimus 0.1% topical BID (immunomodulatory — if immune-mediated component)","Chlorhexidine 2% wipes or spray BID","Systemic antibiotics if deep: Cephalexin 22 mg/kg PO BID × 4 weeks"],
        procedures: ["Identify and treat triggers (infection, allergy)","Sun avoidance (UV worsens)","Keep area clean and dry"],
        diet: ["No specific restriction"]
      },
      education: {
        monitor: ["Lesion healing","Recurrence on tapering antibiotics","Autoimmune signs"],
        red_flags: ["Non-response to antibiotics — consider DLE or autoimmune","Spreading lesions","Systemic signs"],
        followup: "Recheck at 4 weeks; chronic/recurrent — rule out DLE thoroughly; topical tacrolimus preferred long-term over steroids in this location",
        prognosis: "good"
      }
    },

    {
      id: "urticaria_angioedema",
      name: "Urticaria / Angioedema",
      species: ["dog","cat"],
      category: "Dermatology / Emergency",
      emergency: true,
      signals: {
        complaints_swelling_mass: 9, skin_erythema: 7, complaints_behavioral: 7,
        hpi_onset_sudden: 9, complaints_dyspnea: 6,
        env_outdoor: 5, env_contact_other_pets: 4, hr_high: 5
      },
      tests: {
        tier1: ["Clinical exam — hives, facial swelling, pruritus (CLINICAL DIAGNOSIS)","CBC/chemistry","Blood pressure"],
        tier2: ["Allergen identification history","Allergy testing (non-acute)"],
        tier3: []
      },
      treatment: {
        medications: ["MILD: Diphenhydramine 2 mg/kg IM or PO","Dexamethasone 0.1–0.25 mg/kg IV/SC (moderate-severe)","SEVERE (anaphylaxis): Epinephrine 0.01 mg/kg SC/IM FIRST + diphenhydramine + dexamethasone","Prednisolone 1 mg/kg PO SID × 3–5d (continuing care)","IV fluid support if hypotensive"],
        procedures: ["Monitor airway — angioedema of larynx = intubation","Remove allergen if identifiable","Observe × 2–4h minimum after treatment"],
        diet: []
      },
      education: {
        monitor: ["Facial/throat swelling regression","Blood pressure","Breathing","Recurrence"],
        red_flags: ["Laryngeal edema — stridor, dyspnea","Anaphylactic shock","Facial swelling not responding within 30 min"],
        followup: "Discharge when resolved; identify and avoid trigger; epinephrine pen discussion for high-risk pets; allergy testing 4 weeks after acute event",
        prognosis: "excellent"
      }
    },

    {
      id: "dachshund_pattern_baldness",
      name: "Pattern Alopecia (Pinnal / Ventral)",
      species: ["dog"],
      category: "Dermatology",
      signals: {
        complaints_hair_loss: 9, skin_alopecia_focal: 8, skin_alopecia_diffuse: 6,
        hpi_onset_chronic: 8, age_young: 5, age_middle: 5,
        breed_dachshund: 9, breed_chihuahua: 7, breed_whippet: 7
      },
      contra_signals: { skin_pruritus: -4, skin_erythema: -3 },
      tests: {
        tier1: ["Physical exam — pinnal/ventral/periauricular alopecia pattern","Trichogram (dystrophic follicles, non-inflammatory)","Endocrine panel (rule out hypothyroid, HAC)"],
        tier2: ["Skin biopsy (follicular atrophy — non-inflammatory)","Thyroid, cortisol panel"],
        tier3: []
      },
      treatment: {
        medications: ["Melatonin 3–6 mg PO q8–12h (may stimulate partial regrowth — modest evidence)","Minoxidil (NOT safe in cats — cardiomyopathy; use in dogs with caution)"],
        procedures: ["No treatment needed if cosmetic only","Sun protection for bald areas"],
        diet: ["Normal balanced diet"]
      },
      education: {
        monitor: ["Progression of alopecia","Skin health in bald areas (susceptibility to UV damage)","No pruritus/inflammation — distinguishes from pathological alopecia"],
        red_flags: ["Developing pruritus or inflammation — reassess for allergy/infection","Systemic signs — rule out endocrine"],
        followup: "Annual recheck; pattern baldness is cosmetic and benign; educate owner — no effective treatment in most cases; sun protection recommended",
        prognosis: "excellent"
      }
    },

    // ═══════════════════════════ INTERNAL MEDICINE FURTHER ══════════════════

    {
      id: "central_diabetes_insipidus",
      name: "Diabetes Insipidus (Central / Nephrogenic)",
      species: ["dog","cat"],
      category: "Endocrinology",
      signals: {
        complaints_polyuria: 10, complaints_polydipsia: 10, complaints_lethargy: 4,
        complaints_behavioral: 4, hpi_onset_subacute: 6, hpi_onset_chronic: 6,
        hydration_mild: 3
      },
      contra_signals: { temp_high: -2, complaints_weight_loss: -2 },
      tests: {
        tier1: ["Urinalysis — isosthenuria (USG 1.001–1.007)","Urine specific gravity (consistently dilute)","CBC/chemistry (rule out other PU/PD causes)"],
        tier2: ["Modified water deprivation test (DI protocol)","Desmopressin (DDAVP) response test — central DI responds dramatically","Thyroid/adrenal panel","Abdominal ultrasound","MRI brain (central — pituitary tumor)"],
        tier3: ["Referral: internist/neurologist"]
      },
      treatment: {
        medications: ["CENTRAL DI: Desmopressin (DDAVP) intranasal drops 1–4 drops q12–24h to conjunctival sac","DDAVP oral tablet 0.1–0.2 mg PO BID-TID (alternative)","NEPHROGENIC: Hydrochlorothiazide 2.5–5 mg/kg PO BID (paradoxical reduction in urine output)","Chlorpropamide 40–50 mg/kg PO SID (partial central DI — potentiates ADH)"],
        procedures: ["Unrestricted water access ALWAYS (prevent severe hypernatremia)","Investigate and treat underlying cause (tumor, trauma, inflammation)"],
        diet: ["Normal hydration — unlimited water","Low-sodium diet (nephrogenic DI — reduces urine output)"]
      },
      education: {
        monitor: ["Water intake (mL/kg/day — normal <80–100 mL/kg/day)","USG response to DDAVP","Body weight","Neurological signs (CDI from mass)"],
        red_flags: ["Hypernatremia (restricted water access)","Severe dehydration if water restricted","Neurological signs from pituitary mass"],
        followup: "Monitor USG response at 2 weeks; DDAVP trial confirms diagnosis; MRI recommended for central DI; lifelong management",
        prognosis: "fair"
      }
    },

    {
      id: "hypoparathyroidism",
      name: "Hypoparathyroidism",
      species: ["dog","cat"],
      category: "Endocrinology",
      emergency: true,
      signals: {
        complaints_seizures: 8, neuro_seizure: 8, complaints_behavioral: 7,
        complaints_collapse: 7, complaints_lethargy: 6,
        neuro_reflexes_hyper: 7, hpi_onset_subacute: 6,
        age_middle: 5, breed_miniature_schnauzer: 7, breed_toy_poodle: 6
      },
      tests: {
        tier1: ["Serum ionized calcium (CRITICALLY LOW — <0.8 mmol/L)","Serum phosphorus (elevated)","PTH level (low — primary hypoparathyroidism)"],
        tier2: ["CBC/chemistry","ECG (QT prolongation)","Thyroid panel (post-thyroidectomy)"],
        tier3: []
      },
      treatment: {
        medications: ["ACUTE: Calcium gluconate 10% 50–150 mg/kg IV slow over 10–20 min with ECG monitoring","Calcitriol 0.01–0.025 μg/kg PO SID (LIFELONG — vitamin D analogue; converts to active form without PTH)","Calcium carbonate 25–50 mg/kg PO BID–TID (maintenance)","Diazepam 0.5 mg/kg IV (seizure control)"],
        procedures: ["ECG monitoring during IV calcium","Regular ionized calcium monitoring","Reduce dietary phosphorus"],
        diet: ["Low-phosphorus diet","Calcium supplementation with food","No high-phosphorus treats (bone broth, organ meat)"]
      },
      education: {
        monitor: ["Ionized calcium q2–4 weeks during stabilization","Neurological signs","Calcitriol dose adjustment based on calcium levels","Annual recheck once stable"],
        red_flags: ["Tetanic seizures","Laryngospasm (rare)","Cardiac arrhythmia during IV calcium","Hypercalcemia from over-supplementation"],
        followup: "Calcium and calcitriol lifelong; ionized calcium q3 months when stable; prevent over-supplementation (nephrocalcinosis risk); post-thyroidectomy form may be transient",
        prognosis: "good"
      }
    },

    {
      id: "hyperparathyroidism_primary",
      name: "Primary Hyperparathyroidism",
      species: ["dog","cat"],
      category: "Endocrinology",
      signals: {
        complaints_polyuria: 7, complaints_polydipsia: 7, complaints_lethargy: 6,
        complaints_weight_loss: 5, complaints_anorexia: 5,
        urolithiasis: 6, complaints_vomiting: 5,
        age_old: 8, age_middle: 5, breed_keeshond: 7
      },
      tests: {
        tier1: ["Serum total calcium (elevated — >12 mg/dL)","Ionized calcium (elevated)","PTH level (inappropriately elevated — DIAGNOSTIC)"],
        tier2: ["Cervical ultrasound (parathyroid mass)","CBC/chemistry","Urinalysis (calcium oxalate crystals)","Thoracic/abdominal radiograph (calcium deposits)"],
        tier3: ["Nuclear scintigraphy","Referral: internist/surgeon"]
      },
      treatment: {
        medications: ["IV fluid diuresis (hypercalcemia crisis — 0.9% NaCl)","Furosemide 1–2 mg/kg IV q6–12h (calciuresis)","Pamidronate 1–2 mg/kg IV q4 weeks (bisphosphonate — stabilize severe)","Alendronate 10–20 mg/dog PO weekly (oral bisphosphonate)","Cinacalcet 2.5 mg/kg PO SID (calcimimetic — medical option)"],
        procedures: ["Parathyroidectomy (CURATIVE — surgical excision of adenoma)","Post-op hypocalcemia monitoring (1–5 days)","Cervical ultrasound-guided thermal ablation (specialist)"],
        diet: ["Reduced calcium diet","Adequate hydration","Avoid calcium supplements"]
      },
      education: {
        monitor: ["Serum calcium q2–4 weeks","Renal function (hypercalcemic nephropathy)","Bladder calculi","Post-surgical hypocalcemia (days 1–5 post-op)"],
        red_flags: ["Calcium >15 mg/dL — hypercalcemic crisis","Acute renal failure","Neurological signs (severe hypercalcemia)"],
        followup: "Post-parathyroidectomy: calcium and ionized calcium q12–24h × 5d; oral calcium supplementation post-op; recheck at 4 weeks; excellent prognosis with complete excision",
        prognosis: "excellent"
      }
    },

    {
      id: "cat_lower_urinary_tract_disease",
      name: "Feline Lower Urinary Tract Disease (FLUTD) — Non-obstructive",
      species: ["cat"],
      category: "Nephrology / Urology",
      signals: {
        complaints_dysuria: 9, complaints_hematuria: 8, complaints_stranguria: 8,
        complaints_behavioral: 7, bladder_distension: 4,
        hpi_onset_subacute: 6, hpi_onset_chronic: 5,
        sex_male_neutered: 6, sex_female_spayed: 5,
        age_middle: 7, age_young: 5, bcs_obese: 5,
        env_indoor: 7, stress_event: 7
      },
      contra_signals: { bladder_distension: -5 },
      tests: {
        tier1: ["Urinalysis + sediment (hematuria, crystals, casts)","Urine culture","Abdominal ultrasound (bladder wall, uroliths)"],
        tier2: ["Cystoscopy (urethral plugs, polyps)","CBC/chemistry","Plain radiography (calcium oxalate/struvite uroliths)"],
        tier3: ["Referral: internist for refractory/recurrent cases"]
      },
      treatment: {
        medications: ["FIC (idiopathic): Environmental enrichment — NO specific medication","Amitriptyline 2.5–12.5 mg/cat PO SID (severe/chronic FIC — anti-anxiety, anti-nociceptive)","Gabapentin 5–10 mg/kg PO BID (pain)","Prazosin 0.25–0.5 mg/cat PO BID (urethral relaxation if straining)","Maropitant 1 mg/kg SC SID (nausea)"],
        procedures: ["Multimodal environmental modification (MEMO) — CORNERSTONE","Multiple litter boxes, water fountains, hiding spots, play","Canned/wet food (increase water intake)","Stress reduction strategies"],
        diet: ["CRITICAL: switch to canned food (increases urine water content)","Urinary prescription diet (Royal Canin Urinary S/O, Hills c/d)","Multiple fresh water sources (fountains preferred by cats)","Reduce carbohydrates"]
      },
      education: {
        monitor: ["Urination frequency and posture","Hematuria","Signs of obstruction (stranguria, vocalizing, frequent trips with no output)","Stress triggers"],
        red_flags: ["No urine output at all — URETHRAL OBSTRUCTION EMERGENCY","Vocalizing in litter box","Collapse","Male cats especially prone to obstruction"],
        followup: "Recheck urinalysis at 4 weeks; FIC: recurrence rate 50–65% — environmental management critical; culture-confirmed infection: treat 7–10 days and recheck",
        prognosis: "fair"
      }
    },

    {
      id: "renal_lymphoma_cat",
      name: "Renal Lymphoma — Feline",
      species: ["cat"],
      category: "Oncology / Nephrology",
      signals: {
        complaints_weight_loss: 8, complaints_lethargy: 8, complaints_anorexia: 8,
        complaints_polyuria: 6, complaints_polydipsia: 6,
        kidneys_renomegaly: 9, kidneys_irregular: 7,
        mm_pale: 6, age_old: 7, age_middle: 5
      },
      tests: {
        tier1: ["Renal ultrasound (bilateral renomegaly — HALLMARK)","CBC/chemistry (azotemia, anemia)","Urinalysis (proteinuria)"],
        tier2: ["Ultrasound-guided renal FNA (cytology)","CSF — CNS involvement","FeLV/FIV (FeLV strongly associated)","CT abdomen (staging)"],
        tier3: ["Biopsy (histopathology)","Referral: veterinary oncologist"]
      },
      treatment: {
        medications: ["COP protocol: Cyclophosphamide + Vincristine + Prednisolone","CHOP protocol (better response — per oncologist schedule)","Prednisolone 2 mg/kg PO SID (palliative monotherapy if chemo declined)","Renal support: fluid therapy, phosphate binders, anti-nausea"],
        procedures: ["Chemotherapy protocol per oncologist","Supportive renal care","Blood pressure management"],
        diet: ["Renal diet if azotemic","Appetite stimulant (mirtazapine 1.88 mg/cat q48h)","High-calorie diet — prevent cachexia"]
      },
      education: {
        monitor: ["Body weight","Renal function (BUN, creatinine)","Response to chemotherapy (kidney size regression)","FeLV status","Neurological signs (CNS spread)"],
        red_flags: ["CNS lymphoma (blindness, seizures)","Severe azotemia","Non-response to 2 chemo cycles"],
        followup: "Oncology evaluation within 1 week; COP response rate 60–70%; remission 3–9 months; CNS lymphoma poor prognosis; FeLV+ cats shorter remission",
        prognosis: "guarded"
      }
    },

    {
      id: "nasal_discharge_chronic",
      name: "Chronic Nasal Discharge (Idiopathic / Lymphoplasmacytic Rhinitis)",
      species: ["dog","cat"],
      category: "Respiratory",
      signals: {
        complaints_nasal_discharge: 9, complaints_sneezing: 8,
        nose_mucopurulent: 7, nose_serous_discharge: 6,
        hpi_onset_chronic: 8, hpi_progression_worsening: 5,
        age_middle: 5, age_old: 5,
        breed_cocker: 5, breed_labrador: 4
      },
      tests: {
        tier1: ["CBC/chemistry","Rhinoscopy + lavage","Thoracic radiography","Skull radiography"],
        tier2: ["CT skull/nasal cavity (rule out mass, fungal)","Nasal biopsy (GOLD STANDARD — lymphoplasmacytic infiltrate confirms)","Cryptococcus antigen","Aspergillus serology"],
        tier3: ["Referral: internist/neurologist (nasal-frontal tumor suspicion)"]
      },
      treatment: {
        medications: ["Doxycycline 10 mg/kg PO SID × 6 weeks (Bordetella/Mycoplasma)","Prednisolone 0.5–1 mg/kg PO SID × 4–6 weeks (lymphoplasmacytic rhinitis — no infectious cause)","Piroxicam 0.3 mg/kg PO SID (anti-inflammatory — adjunct)","Saline nasal flush BID (saline nebulization)"],
        procedures: ["Rhinoscopy with saline flush (therapeutic and diagnostic)","Nasal biopsy for definitive histopathology","Treat infectious causes (Aspergillus: topical clotrimazole infusion)"],
        diet: ["No specific dietary restriction"]
      },
      education: {
        monitor: ["Discharge character (clear vs mucopurulent vs hemorrhagic)","Appetite","Facial symmetry","Epistaxis episodes"],
        red_flags: ["Unilateral epistaxis + facial deformity — neoplasia","Non-response to prednisolone × 6 weeks (reassess)","Neurological signs"],
        followup: "Recheck 4–6 weeks; CT recommended if response poor; idiopathic rhinitis: may require long-term prednisolone; prognosis good for lymphoplasmacytic rhinitis",
        prognosis: "fair"
      }
    },

    {
      id: "pituitary_dependent_cushings",
      name: "Pituitary-Dependent Hyperadrenocorticism (PDH)",
      species: ["dog"],
      category: "Endocrinology",
      signals: {
        complaints_polyuria: 9, complaints_polydipsia: 9, complaints_weight_gain: 7,
        complaints_lethargy: 7, complaints_skin_lesions: 7, skin_alopecia_diffuse: 7,
        skin_thickened: 6, complaints_abdominal_distension: 7,
        hpi_onset_chronic: 8, age_old: 7, age_middle: 6,
        breed_poodle: 6, breed_dachshund: 6, breed_boxer: 5,
        breed_yorkshire: 5
      },
      tests: {
        tier1: ["UCCR (urine cortisol:creatinine ratio — screening: if normal, rules out HAC)","LDDS (low dose dexamethasone suppression test — most sensitive)","CBC/chemistry (stress leukogram, elevated ALP)","Urinalysis (USG dilute)"],
        tier2: ["HDDS (high dose dex suppression — differentiates PDH from ADH)","ACTH stimulation (confirm HAC; monitor treatment)","Abdominal ultrasound (bilateral adrenal enlargement — PDH)","MRI pituitary (identify pituitary tumor)"],
        tier3: ["CT adrenal (adrenal tumor)","Referral: veterinary internist/endocrinologist"]
      },
      treatment: {
        medications: ["Trilostane 2–5 mg/kg PO BID (FIRST-LINE — adrenocortical enzyme inhibitor)","Mitotane (o,p'-DDD) 25–50 mg/kg PO SID × 8–10 days induction (alternative)","Mitotane maintenance 25–50 mg/kg PO weekly after induction","Ketoconazole 10–15 mg/kg PO BID (alternative, less effective)","Cabergoline + selegiline (pituitary-directed — limited evidence)"],
        procedures: ["ACTH stim monitoring q4–6 weeks","Electrolyte monitoring","Adrenalectomy (unilateral — for adrenal-dependent HAC)","Hypophysectomy (pituitary macroadenoma — specialist)"],
        diet: ["Controlled calorie intake (obesity management)","Adequate hydration"]
      },
      education: {
        monitor: ["PU/PD improvement","Muscle mass restoration","Coat regrowth (months)","ACTH stim at 4 weeks, 8 weeks, then q3–6 months","Electrolytes (trilostane — risk of hypoadrenocorticism)"],
        red_flags: ["Addisonian crisis from over-treatment (trilostane) — weakness, vomiting, collapse","Rapidly enlarging pituitary macroadenoma (neurological signs)","ALP >10× normal + worsening signs on treatment"],
        followup: "ACTH stim at 4–6 weeks after starting trilostane; dose adjust to keep post-stim cortisol 1.5–5.5 μg/dL; lifelong monitoring q3–6 months",
        prognosis: "fair"
      }
    },

    {
      id: "anemia_chronic_disease",
      name: "Anemia of Chronic Disease / Inflammatory Anemia",
      species: ["dog","cat"],
      category: "Hematology",
      signals: {
        complaints_lethargy: 7, mm_pale: 7, complaints_weight_loss: 6,
        complaints_anorexia: 6, hpi_onset_chronic: 8,
        attitude_dull: 5, hr_high: 5, bcs_thin: 5
      },
      contra_signals: { complaints_bleeding: -4, hpi_onset_sudden: -5 },
      tests: {
        tier1: ["CBC (mild-moderate normocytic normochromic anemia — non-regenerative)","Reticulocyte count (low — confirms non-regenerative)","Chemistry (underlying disease markers)"],
        tier2: ["Serum iron, TIBC, ferritin (iron redistribution pattern: low iron, low TIBC, high/normal ferritin)","Bone marrow aspirate (if unexplained)","Identify underlying disease (culture, ultrasound, serology)"],
        tier3: ["Erythropoietin level","Referral: internist"]
      },
      treatment: {
        medications: ["TREAT UNDERLYING CAUSE (primary treatment)","Darbepoetin alfa 0.45–0.75 μg/kg SC weekly (CKD-associated anemia — caution: anti-EPO antibodies)","Ferrous sulfate 100–300 mg PO BID (if concurrent iron deficiency)"],
        procedures: ["Blood transfusion (packed RBCs) if PCV <15% or symptomatic","EPO therapy for CKD-anemia","Iron supplementation for iron-deficiency component"],
        diet: ["High-quality diet","Iron-rich foods (lean red meat)","Treat underlying inflammatory/infectious disease"]
      },
      education: {
        monitor: ["PCV/Hct q2–4 weeks","Underlying disease progression","Reticulocyte response","EPO antibody formation (if on EPO therapy)"],
        red_flags: ["PCV <15% — transfusion threshold","Pure red cell aplasia (EPO antibody response)","Acute hemolysis superimposed"],
        followup: "Treat primary disease first; anemia improves as inflammation resolves; EPO only for CKD-associated; recheck CBC q4 weeks",
        prognosis: "fair"
      }
    },

    {
      id: "cat_idiopathic_hepatic_lipidosis",
      name: "Hepatic Lipidosis — Feline (Idiopathic) — Detailed",
      species: ["cat"],
      category: "Gastroenterology / Hepatology",
      emergency: true,
      signals: {
        complaints_anorexia: 10, complaints_weight_loss: 9, complaints_lethargy: 9,
        complaints_vomiting: 7, mm_icteric: 8,
        bcs_obese: 6, bcs_thin: 5, hpi_onset_subacute: 7,
        stress_event: 7, age_middle: 5, age_old: 5
      },
      contra_signals: { temp_high: -2 },
      tests: {
        tier1: ["CBC (non-regenerative anemia, leukocytosis)","Chemistry (elevated ALT, ALP, GGT, bilirubin — ALP markedly elevated in cats)","Urinalysis (bilirubinuria)","Abdominal ultrasound (hyperechoic liver)"],
        tier2: ["Coagulation panel (coagulopathy common)","Serum B12 (cobalamin — deficiency)","Serum folate","Vitamin K1 supplementation empirically (before biopsy if coagulopathic)","Liver biopsy (macrovesicular lipid vacuoles — DIAGNOSTIC)"],
        tier3: ["Referral: feline internist"]
      },
      treatment: {
        medications: ["Nutritional support is PRIMARY treatment — all else is supportive","Mirtazapine 1.88 mg/cat PO q48–72h (appetite stimulant — while tube placement arranged)","Vitamin K1 0.5–1.5 mg/kg SC SID × 3 days (before invasive procedures)","SAMe 90 mg/cat PO SID (hepatoprotectant)","B-complex vitamins IV/SC (replace)","Maropitant 1 mg/kg SC SID (antiemetic)","Potassium supplementation if hypokalemic"],
        procedures: ["Esophagostomy tube (E-tube) placement — ESSENTIAL for prolonged nutritional support","N/G tube (short-term — 3–5 days) if E-tube not yet placed","Caloric target: 60 kcal/kg/day (increase gradually to prevent refeeding syndrome)","Begin feeding 25% of target, increase 25% daily","Correct electrolytes (K, phosphorus — refeeding syndrome risk)"],
        diet: ["High-protein canned diet via tube (Royal Canin Recovery, Hills a/d)","FORCE FEEDING critical — not eating is WORSENING the condition","Small frequent meals × 4–6/day via tube (or continuous CRI)","NO fasting (worsens lipidosis)"]
      },
      education: {
        monitor: ["Daily food intake volume via tube","Body weight daily","Bilirubin and liver enzymes weekly","Vomiting (tube blockage)","Potassium and phosphorus (refeeding syndrome)"],
        red_flags: ["Refeeding syndrome — profound hypokalemia, hypophosphatemia after aggressive feeding","Hepatic encephalopathy — HE (ammonia)","Tube occlusion","Coagulopathy before tube placement"],
        followup: "Weekly liver enzymes until normalizing; tube feeding typically 4–8 weeks until cat voluntarily eats; treat inciting cause; address obesity prevention long-term",
        prognosis: "fair"
      }
    },

    {
      id: "cat_chronic_kidney_disease_stage",
      name: "Feline Chronic Kidney Disease — Staging and Management",
      species: ["cat"],
      category: "Nephrology",
      signals: {
        complaints_polyuria: 8, complaints_polydipsia: 8, complaints_weight_loss: 8,
        complaints_lethargy: 7, complaints_anorexia: 7, complaints_vomiting: 6,
        kidneys_small: 8, kidneys_irregular: 7, bcs_thin: 7,
        hpi_onset_chronic: 9, age_old: 9, age_middle: 6
      },
      tests: {
        tier1: ["Serum creatinine + SDMA (symmetrical dimethylarginine — early marker)","Urinalysis + USG + UPC","Blood pressure","CBC (normocytic normochromic anemia)"],
        tier2: ["Abdominal ultrasound (kidney architecture)","Electrolytes (K, phosphorus)","PTH (renal secondary hyperparathyroidism)","Urine culture (concurrent UTI)"],
        tier3: ["GFR measurement","Referral: feline nephrologist/internist"]
      },
      treatment: {
        medications: ["Benazepril 0.5–1 mg/kg PO SID (RAAS inhibition — proteinuria reduction; IRIS Stage 2+)","Amlodipine 0.625–1.25 mg/cat PO SID (systolic hypertension >160 mmHg)","Aluminum hydroxide 30–100 mg/kg/day divided with meals (hyperphosphatemia)","Darbepoetin alfa 0.45 μg/kg SC q7–14d (anemia PCV <20%)","Potassium gluconate 2–4 mEq/cat PO BID (hypokalemia)","Calcitriol 2.5 ng/kg PO SID (Stage 3–4 — reduce PTH; use with care)","Mirtazapine 1.88 mg/cat PO q48–72h (appetite stimulant)"],
        procedures: ["Subcutaneous fluid therapy 100–150 mL/cat SC SID (Stage 3–4 — home fluids)","Blood pressure monitoring q3 months","Serial weight and BCS","Dental care (bacteremia worsens CKD)"],
        diet: ["Renal prescription diet (IRIS-recommended — Royal Canin Renal, Hills k/d, Purina NF)","Phosphorus restriction essential (Stage 2 onwards)","Avoid dehydration — increase water intake (wet food, fountains)","Moderate protein restriction (NOT severe — quality over restriction)"]
      },
      education: {
        monitor: ["Weight monthly","Blood pressure q1–3 months","Creatinine/SDMA/USG/UPC q3 months","Phosphorus and potassium q3 months","Appetite and hydration"],
        red_flags: ["Acute-on-chronic crisis (uremic episode — vomiting, refusing food, profound lethargy)","BP >180 mmHg (hypertensive emergency — blindness, seizures)","PCV <15% (symptomatic anemia)","Oliguria/anuria (end-stage)"],
        followup: "IRIS staging guides monitoring frequency; Stage 2: q6 months; Stage 3: q3 months; Stage 4: q1–2 months; quality of life paramount; euthanasia discussion for end-stage",
        prognosis: "guarded"
      }
    },

    {
      id: "feline_hyperthyroidism_advanced",
      name: "Feline Hyperthyroidism — Advanced Management",
      species: ["cat"],
      category: "Endocrinology",
      signals: {
        complaints_weight_loss: 9, complaints_polyphagia: 8, complaints_polyuria: 7,
        complaints_polydipsia: 7, complaints_vomiting: 6, complaints_diarrhea: 5,
        complaints_behavioral: 7, complaints_coughing: 5,
        hr_high: 8, cardiac_tachycardia: 7, temp_high: 5,
        palpation_thyroid: 9, hpi_onset_chronic: 8, age_old: 9
      },
      tests: {
        tier1: ["Total T4 (elevated >45 nmol/L DIAGNOSTIC; borderline 30–45 — recheck)","Blood pressure","CBC/chemistry","Urinalysis + USG"],
        tier2: ["Free T4 by equilibrium dialysis (borderline T4)","Thyroid scintigraphy (bilateral vs unilateral hyperplasia)","Echocardiogram (HCM secondary to hyperthyroidism)","CKD screen (unmasked CKD after treatment)"],
        tier3: ["Referral: veterinary internist / nuclear medicine center (radioiodine)"]
      },
      treatment: {
        medications: ["Methimazole 2.5 mg/cat PO BID (FIRST-LINE — monitor for adverse effects)","Carbimazole 5 mg/cat PO BID (prodrug — less facial pruritus)","Transdermal methimazole (PLO gel — ear pinna — for pill-resistant cats)","Atenolol 6.25 mg/cat PO SID–BID (HR control before euthyroid)","Amlodipine (concurrent hypertension)"],
        procedures: ["Radioactive iodine 131I (CURATIVE — gold standard; single treatment)","Bilateral thyroidectomy (surgical — effective, requires parathyroid preservation)","Y/D diet (Hills Prescription Diet — iodine-restricted — maintenance only, not induction)","Methimazole trial × 2–4 weeks before definitive treatment (reveals masked CKD)"],
        diet: ["Y/D iodine-restricted diet (maintenance option — strict compliance only)","High-calorie diet during medical management (weight restoration)","Avoid raw meat (high iodine)"]
      },
      education: {
        monitor: ["T4 at 2–4 weeks after starting methimazole","CBC/chemistry for agranulocytosis (methimazole)","Renal function (CKD may emerge post-treatment — masked previously by GFR effect)","BP q3 months","Weight monthly"],
        red_flags: ["Facial excoriations/itching — methimazole adverse effect (5–20%)","Agranulocytosis (fever + infection on methimazole) — STOP drug, recheck CBC","Worsening azotemia after treatment starts (unmasked CKD)"],
        followup: "T4 recheck 2–4 weeks after dose change; methimazole long-term monitoring q6 months (CBC, chemistry); radioiodine: T4 check at 3 months; CKD reassessment 30 days post-euthyroid",
        prognosis: "good"
      }
    },

    {
      id: "diskospondylitis",
      name: "Diskospondylitis",
      species: ["dog","cat"],
      category: "Neurology / Orthopedics / Infectious",
      emergency: true,
      signals: {
        complaints_limping: 7, complaints_behavioral: 8, complaints_lethargy: 7,
        gait_ataxia: 7, posture_kyphosis: 8, limbs_joint_pain: 5,
        temp_high: 7, hpi_onset_subacute: 6, hpi_progression_worsening: 7,
        breed_german_shepherd: 6, breed_labrador: 5, breed_great_dane: 5,
        weight_large: 6, sex_male_intact: 5
      },
      tests: {
        tier1: ["Spinal radiography (disc space narrowing, endplate lysis/sclerosis — DIAGNOSTIC)","CBC (leukocytosis, left shift)","Blood culture × 2 (concurrent bacteremia)"],
        tier2: ["MRI spine (GOLD STANDARD — early lesion, cord compression)","CT myelogram","Urine culture (ascending infection)","Brucella canis serology (dog — common cause)","Aspergillus serology"],
        tier3: ["Fluoroscopy-guided aspirate of disc space (culture)","Referral: neurologist/surgeon"]
      },
      treatment: {
        medications: ["Enrofloxacin 10 mg/kg PO SID + Amoxicillin-clavulanate 12.5 mg/kg PO BID × 6–8 weeks (empirical while awaiting culture)","Adjust antibiotic per culture/sensitivity","Brucella: Doxycycline 10 mg/kg SID + Enrofloxacin 5 mg/kg SID × 6–8 weeks","Gabapentin 10–15 mg/kg PO TID (neuropathic pain)","Meloxicam 0.1 mg/kg PO SID (pain/inflammation)"],
        procedures: ["Strict cage rest (6–8 weeks minimum)","Surgical decompression if progressive neurological signs despite antibiotics","Spinal brace/support","Physical rehabilitation post-stabilization"],
        diet: ["High-quality, high-protein diet to support healing"]
      },
      education: {
        monitor: ["Neurological status","Temperature","CBC and CRP/acute phase proteins q2–4 weeks","Repeat spinal radiograph at 4–6 weeks","Pain level"],
        red_flags: ["Rapidly worsening neurology — surgical emergency","Brucella (zoonotic risk — test all in-contact dogs)","Aspergillus — poor prognosis","Septic shock from bacteremia"],
        followup: "Minimum 6–8 weeks antibiotics; radiographic improvement lags behind clinical improvement by weeks; surgery if compressive myelopathy; prognosis good if treated early",
        prognosis: "fair"
      }
    },

    {
      id: "feline_lower_urinary_obstruction",
      name: "Urethral Obstruction — Feline (Detailed)",
      species: ["cat"],
      category: "Nephrology / Urology",
      emergency: true,
      signals: {
        complaints_dysuria: 10, complaints_stranguria: 10, complaints_hematuria: 7,
        complaints_vomiting: 7, complaints_lethargy: 8, complaints_collapse: 6,
        bladder_distension: 10, abdomen_pain_severe: 8,
        sex_male_neutered: 9, sex_male_intact: 7,
        hr_high: 5, hr_low: 5, attitude_obtunded: 6,
        mm_pale: 5, temp_low: 5
      },
      tests: {
        tier1: ["Physical exam — distended, painful bladder (DIAGNOSTIC)","Urinalysis (crystals, blood, protein)","Serum BUN, creatinine, potassium (EMERGENCY PANEL)","ECG (hyperkalemia changes: bradycardia, wide QRS, peaked T waves)"],
        tier2: ["Abdominal radiograph (uroliths)","Abdominal ultrasound (bladder mass, uroliths, proximal urethral plug)","CBC/chemistry"],
        tier3: []
      },
      treatment: {
        medications: ["IV 0.9% NaCl (AVOID LRS — contains K; hyperkalemia)","Calcium gluconate 10% 50–100 mg/kg IV slow (cardiac protection if K >7 mEq/L)","Dextrose 50% 1–2 mL/kg IV (shift K intracellularly)","Regular insulin 0.25 U/kg IV + dextrose (K management)","Prazosin 0.25–0.5 mg/cat PO BID (urethral spasm post-unblocking)","Bethanechol 1.25–5 mg/cat PO TID (detrusor atony)","Meloxicam 0.1 mg/kg SC (post-unblocking)","Buprenorphine 0.01–0.02 mg/kg IV/IM q6–8h (pain)"],
        procedures: ["Urethral catheterization and relief EMERGENCY (immediate once stable enough)","Cystocentesis (relieve pressure if unable to catheterize — rarely needed before catheter placement)","Maintain urethral catheter 24–72h (flush, monitor urine output, prevent re-obstruction)","Perineal urethrostomy (PU) — recurrent obstructions (surgical — widens urethra)"],
        diet: ["Canned urinary diet post-recovery (Royal Canin Urinary S/O, Hills c/d)","Restrict struvite-forming diet","Increased water intake via wet food/fountains"]
      },
      education: {
        monitor: ["Urine output (minimum 1 mL/kg/h post-catheterization)","Potassium and BUN q6–12h","ECG (hyperkalemia)","Post-removal urination (re-obstruction within 24–48h common)","Bladder size and pain"],
        red_flags: ["Severe hyperkalemia K >8 mEq/L with cardiac changes — immediate calcium gluconate","No urine output post-catheter removal — re-obstruct","Azotemia not improving in 48h — post-obstructive diuresis management"],
        followup: "Discharge when urinating freely and K normal; urinalysis/culture recheck at 7 days; PU discussion for 3+ obstructions; Recurrence rate 35–40%; urinary diet + canned food lifelong",
        prognosis: "good"
      }
    },

    {
      id: "canine_leishmaniasis_cutaneous",
      name: "Canine Cutaneous Leishmaniasis (Dermal Form)",
      species: ["dog"],
      category: "Infectious Disease / Dermatology / Tropical",
      signals: {
        complaints_skin_lesions: 9, skin_alopecia_focal: 8, skin_alopecia_diffuse: 7,
        skin_crusts: 8, skin_erythema: 6, complaints_weight_loss: 6,
        lymph_mild: 6, env_endemic_area: 9, env_outdoor: 7,
        hpi_onset_chronic: 7, bcs_thin: 5
      },
      tests: {
        tier1: ["Skin biopsy (Leishman-Donovan bodies in macrophages — DIAGNOSTIC)","Leishmania serology (IFAT/ELISA)","CBC/chemistry"],
        tier2: ["Leishmania PCR (skin lesion or lymph node)","Fine needle aspirate (lymph node)","UPC (renal involvement)"],
        tier3: ["Referral: infectious disease specialist"]
      },
      treatment: {
        medications: ["Meglumine antimoniate 75–100 mg/kg SC SID × 28–60 days","Allopurinol 10 mg/kg PO BID (lifelong maintenance)","Miltefosine 2 mg/kg PO SID × 28 days (alternative)","L-Amphotericin B 3 mg/kg IV q48h × 5 doses (renal-sparing alternative)"],
        procedures: ["Sandfly vector control — deltamethrin collar","Avoid sandfly peak activity periods (dusk/dawn)","Quarterly monitoring"],
        diet: ["Anti-inflammatory, moderate protein diet","Omega-3 supplementation"]
      },
      education: {
        monitor: ["Skin lesion regression","CBC/chemistry q3 months","Leishmania titer q6 months","Renal function (UPC)","Allopurinol xanthine crystalluria (monitor urine)"],
        red_flags: ["Renal failure (most common fatal complication)","Treatment failure at 6 weeks","Xanthine urolithiasis (allopurinol side effect — switch to miltefosine if xanthine crystals found)"],
        followup: "Lifelong allopurinol; serology recheck at 6 and 12 months; complete remission rare — monitoring for relapse; zoonotic (sandfly bites infected dog, then infects human)",
        prognosis: "guarded"
      }
    },

    {
      id: "biliary_mucocele",
      name: "Gallbladder Mucocele",
      species: ["dog"],
      category: "Gastroenterology / Hepatology",
      emergency: true,
      signals: {
        complaints_lethargy: 7, complaints_vomiting: 7, complaints_anorexia: 7,
        abdomen_pain_moderate: 6, mm_icteric: 7,
        temp_high: 5, hpi_onset_subacute: 6,
        age_old: 7, age_middle: 6,
        breed_shetland: 7, breed_cocker: 6, breed_pomeranian: 5
      },
      tests: {
        tier1: ["Abdominal ultrasound (classic 'kiwi fruit' or 'stellate' pattern in GB — PATHOGNOMONIC)","CBC (leukocytosis)","Chemistry (elevated ALP, GGT, bilirubin)"],
        tier2: ["Coagulation panel (cholestasis-induced coagulopathy)","Vitamin K1 status","Bile culture (GB content)","CT abdomen (GB wall integrity)"],
        tier3: ["Referral: soft tissue surgeon"]
      },
      treatment: {
        medications: ["Vitamin K1 0.5–1 mg/kg SC SID × 3 days (BEFORE surgery)","IV fluid support","Antibiotics: Amoxicillin-clavulanate + Metronidazole (biliary infection)","Ursodiol 10–15 mg/kg PO SID (early/non-surgical if wall intact — prevents progression?)"],
        procedures: ["Cholecystectomy (DEFINITIVE — recommended for all cases with compromised wall or signs)","Biliary flushing post-surgery","Abdominal lavage if bile peritonitis"],
        diet: ["Low-fat diet (prevent re-accumulation of sludge)","Small frequent meals","Hills GI Low Fat or Royal Canin GI Low Fat"]
      },
      education: {
        monitor: ["Surgical site","Liver enzymes post-surgery","Abdominal ultrasound at 3–4 weeks post-op","Bile culture sensitivity"],
        red_flags: ["GB rupture — bile peritonitis (EMERGENCY, septic shock)","Rapidly rising bilirubin","Non-surgical candidate with worsening signs"],
        followup: "Surgery recommended when diagnosed; medical management (ursodiol) only for incidental discovery with intact wall and no clinical signs; post-op recheck at 2 weeks and 6 weeks",
        prognosis: "fair"
      }
    },

    {
      id: "hypovolemic_shock",
      name: "Hypovolemic Shock",
      species: ["dog","cat"],
      category: "Emergency / Critical Care",
      emergency: true,
      signals: {
        complaints_collapse: 10, hr_high: 8, mm_pale: 9, mm_tacky: 8,
        hydration_severe: 8, complaints_lethargy: 8,
        attitude_obtunded: 8, temp_low: 7,
        complaints_trauma: 7, complaints_bleeding: 7,
        hpi_onset_sudden: 9
      },
      tests: {
        tier1: ["PCV/TS — rapid bedside","Blood pressure (systolic <80 mmHg = shock)","Lactate (elevated > 2–4 mmol/L)","ECG"],
        tier2: ["CBC/chemistry","Blood gas","Blood type and crossmatch","Coagulation panel (DIC)","Abdominal FAST (free fluid)"],
        tier3: []
      },
      treatment: {
        medications: ["CRYSTALLOID BOLUS: 0.9% NaCl or LRS 20–30 mL/kg IV over 15 min (dog), 10–15 mL/kg (cat) — REASSESS after each bolus","COLLOID: Hetastarch 5 mL/kg bolus IV (if TP <40 g/L)","pRBC 10–20 mL/kg IV (hemorrhagic shock — PCV <20%)","FFP 10–20 mL/kg IV (coagulopathy)","Dopamine/dobutamine CRI (cardiogenic component)","Dextrose 50% (hypoglycemia correction)"],
        procedures: ["Large bore IV × 2 catheter IMMEDIATELY","Oxygen supplementation","Airway management (intubation if unconscious)","Identify and treat underlying cause","Keep warm — hypothermia management","Urinary catheter (urine output monitoring)"],
        diet: ["NPO during acute management","Nutritional support when hemodynamically stable"]
      },
      education: {
        monitor: ["Blood pressure q5–10 min during resuscitation","Heart rate","Mucous membrane color","Urine output (>1 mL/kg/h = adequate)","Lactate clearance (goal <2 mmol/L)","PCV/TP q1h"],
        red_flags: ["No response to initial bolus — hemorrhage ongoing","Lactate not clearing — tissue hypoperfusion persists","Tension pneumothorax — bilateral thoracocentesis","Cardiac tamponade — pericardiocentesis"],
        followup: "ICU monitoring until hemodynamically stable; treat underlying cause; reassess q1h initially; DIC prevention with FFP if coagulopathic",
        prognosis: "guarded"
      }
    },

    {
      id: "abdominal_foreign_body",
      name: "Gastrointestinal Foreign Body (Gastric / Intestinal)",
      species: ["dog","cat"],
      category: "Gastroenterology / Surgery",
      emergency: true,
      signals: {
        complaints_vomiting: 9, complaints_anorexia: 8, complaints_lethargy: 7,
        abdomen_pain_mild: 6, abdomen_pain_moderate: 7,
        hpi_onset_sudden: 8, age_puppy: 7, age_young: 6,
        breed_labrador: 6, breed_golden: 5
      },
      tests: {
        tier1: ["Abdominal radiography (radio-opaque FB, gas pattern — 'string of pearls')","Abdominal ultrasound (FB with shadowing, obstruction)","CBC/chemistry"],
        tier2: ["Contrast radiography (radio-lucent FB)","CT abdomen (FB location, viability)"],
        tier3: []
      },
      treatment: {
        medications: ["IV fluid resuscitation","Antibiotics peri-op: Ampicillin-sulbactam 22 mg/kg IV TID","Pain: Methadone 0.2–0.4 mg/kg IV q4–6h","Antiemetic: Maropitant 1 mg/kg SC SID","Induce emesis ONLY if non-obstructive + <2h + no signs: Apomorphine 0.04 mg/kg IV"],
        procedures: ["GASTRIC FB: Endoscopic retrieval FIRST (if <2h and in stomach)","INTESTINAL FB: Surgery — enterotomy or intestinal resection (if necrotic)","String FB: Linear FB — handle with extreme care (bunching laceration risk)","Post-op monitoring 24–48h"],
        diet: ["NPO post-op 12–24h","Liquid diet × 24h then gradual introduction","Prevent access to toys, socks, corn cobs, bones"]
      },
      education: {
        monitor: ["Vomiting cessation post-procedure","Defecation","Body temperature","Abdominal pain","Incision site"],
        red_flags: ["Peritonitis (perforated gut — fever, tense abdomen, rapid deterioration)","String FB under tongue in cats — surgery immediately (do NOT pull)","Non-responsive vomiting","Bowel devitalization (septic shock post-op)"],
        followup: "Recheck 2–3 days post-op; radiograph at 1 week; prevent recurrence — environment proofing; cats and string-type FBs — particular risk",
        prognosis: "fair"
      }
    },

    {
      id: "protein_losing_nephropathy_dog",
      name: "Protein-Losing Nephropathy (PLN) — Canine",
      species: ["dog"],
      category: "Nephrology",
      signals: {
        complaints_lethargy: 6, complaints_weight_loss: 7,
        complaints_abdominal_distension: 6, abdomen_fluid_wave: 6,
        complaints_limping: 4, bcs_thin: 6,
        hpi_onset_chronic: 7, age_middle: 5, age_old: 5,
        breed_soft_coated_wheaten: 8, breed_bernese: 7, breed_cocker: 5
      },
      tests: {
        tier1: ["Urinalysis + UPC (>0.5 = significant; >2.0 = nephrotic syndrome risk)","Chemistry (albumin, BUN, creatinine, cholesterol)","Blood pressure","CBC"],
        tier2: ["Urine culture","Renal biopsy (GOLD STANDARD — glomerular type)","Tick-borne panel (Ehrlichia — common cause)","ANA titer","Echography (renal architecture, ascites)"],
        tier3: ["Referral: veterinary internist / nephrologist","International renal interest society (IRIS) PLN guidelines"]
      },
      treatment: {
        medications: ["Benazepril 0.5 mg/kg PO SID (first-line ACEi — reduce glomerular pressure)","Enalapril 0.5 mg/kg PO BID (alternative)","Clopidogrel 1–2 mg/kg PO SID (anti-thrombotic — PTE prevention)","Omega-3 30–40 mg/kg/day (EPA/DHA — anti-inflammatory)","Mycophenolate 20 mg/kg PO BID (immune-mediated confirmed — biopsy)","Treat infectious cause (doxycycline 10 mg/kg SID for Ehrlichia)"],
        procedures: ["Serial UPC monitoring (target <0.5)","Blood pressure q2–4 weeks","Abdominocentesis (ascites — symptomatic)"],
        diet: ["Renal/protein-modified diet","Adequate (not restricted) high-quality protein if hypoalbuminemic","Low sodium (hypertension/edema)","Omega-3 supplementation"]
      },
      education: {
        monitor: ["UPC q4–8 weeks","Blood pressure q2–4 weeks","Serum albumin monthly","Signs of PTE (sudden dyspnea — emergency)","Edema/ascites"],
        red_flags: ["Pulmonary thromboembolism — sudden dyspnea","Severe hypoalbuminemia (<15 g/L) — transfusion/colloids","Nephrotic syndrome","Renal failure progression"],
        followup: "UPC q1–2 months initially; chronic management; address underlying cause; Wheaten Terriers — breed-specific PSPP enteropathy may coexist; IRIS PLN guidelines for renal biopsy timing",
        prognosis: "guarded"
      }
    },

    {
      id: "rabies",
      name: "Rabies (Zoonosis)",
      species: ["dog","cat"],
      category: "Infectious Disease / Neurology / Zoonosis",
      emergency: true,
      signals: {
        complaints_behavioral: 10, complaints_seizures: 8, neuro_seizure: 8,
        neuro_disoriented: 8, complaints_collapse: 7,
        hpi_onset_subacute: 7, hpi_progression_worsening: 9,
        env_outdoor: 8, env_contact_stray: 9,
        vaccine_never: 9, vaccine_overdue: 7
      },
      tests: {
        tier1: ["Clinical exam (progressive neurological signs post-bite exposure)","Exposure history (bite from unknown animal)","Vaccination status","DO NOT handle without PPE — ZOONOTIC RISK"],
        tier2: ["DFA (Direct Fluorescent Antibody test) on brain tissue (post-mortem ONLY — DEFINITIVE)","Saliva PCR (ante-mortem — limited sensitivity)","CSF analysis (non-specific)"],
        tier3: ["Rabies reference laboratory submission"]
      },
      treatment: {
        medications: ["NO TREATMENT — REPORTABLE FATAL DISEASE","Euthanasia (confirmed rabies or high suspicion in unvaccinated animal with exposure)","Supportive care in experimental settings (Milwaukee Protocol — very rarely successful)"],
        procedures: ["ISOLATION AND QUARANTINE immediately (10-day observation for vaccinated animals)","INFORM AUTHORITIES — mandatory notifiable disease","PPE for all handlers","Assess potential human exposures — notify public health immediately","Post-exposure prophylaxis (PEP) for exposed humans"],
        diet: ["Supportive care only if under observation for vaccination status cases"]
      },
      education: {
        monitor: ["N/A — generally fatal","Exposed humans: immediate PEP within 24–72h","Exposed pets: quarantine 10 days (vaccinated) or euthanasia/quarantine 6 months (unvaccinated)"],
        red_flags: ["ANY unvaccinated animal with neurological signs + bite wound = high rabies suspicion","Notify veterinary public health IMMEDIATELY","Do not euthanize before notifying authorities (preserve brain tissue)"],
        followup: "Mandatory quarantine and reporting; PREVENTION: core vaccine (dogs/cats/ferrets); annual or triennial boosters per label; prevent wildlife contact",
        prognosis: "poor"
      }
    },

    {
      id: "tick_paralysis",
      name: "Tick Paralysis",
      species: ["dog","cat"],
      category: "Neurology / Parasitology / Tropical",
      emergency: true,
      signals: {
        gait_paralysis: 9, gait_ataxia: 8, complaints_collapse: 8,
        complaints_dyspnea: 7, complaints_behavioral: 7,
        hpi_onset_subacute: 8, parasites_tick: 10, env_outdoor: 8,
        env_endemic_area: 8, age_young: 5, complaints_lethargy: 7
      },
      tests: {
        tier1: ["Physical exam — tick found on body (DIAGNOSTIC) — full body search mandatory","Neurological exam (ascending LMN flaccid paralysis)","CBC/chemistry (rule out other causes)"],
        tier2: ["Ixodes holocyclus immunotoxin serology (Australia/Indonesia)","EMG (decremental response)"],
        tier3: []
      },
      treatment: {
        medications: ["TICK REMOVAL — IMMEDIATELY (definitive treatment — Australian tick: antitoxin needed even post-removal)","Tick antitoxin serum (Ixodes holocyclus hyperimmune serum) — 1 mL/kg IV slow Australia/Indonesia (critical)","Oxygen supplementation","Atropine 0.02–0.04 mg/kg IV (salivation control)","Respiratory support if needed (intubation, ventilation)"],
        procedures: ["Remove ALL ticks (check ears, between toes, groin, periocular)","Do NOT bathe immediately post-antitoxin (removes ticks but can worsen neurotoxin absorption)","Isoxazoline treatment (fluralaner, sarolaner) to kill any remaining ticks","ICU monitoring — respiratory failure most common cause of death","Physical therapy — keep cool (heat worsens)"],
        diet: ["NPO if respiratory compromise","Syringe feed when improving and pharyngeal function returns"]
      },
      education: {
        monitor: ["Respiratory rate and effort (q1–2h critical period)","Neurological recovery (days to weeks post-tick removal)","Body temperature (hyperthermia worsens)","Pharyngeal function (dysphagia/aspiration risk)"],
        red_flags: ["Respiratory failure — intubation/ventilation","Ascending paralysis reaching diaphragm","No improvement 24h post-removal (without antitoxin — Australian tick)","Re-infestation (recovery reversed)"],
        followup: "Hospitalize until ambulatory; ICU 24–72h; recovery expected if all ticks removed early; antitoxin greatly improves prognosis for Ixodes holocyclus; implement regular tick prevention",
        prognosis: "fair"
      }
    },

    {
      id: "feline_stomatitis_feline_calicivirus",
      name: "Feline Calicivirus Stomatitis / Upper Respiratory Tract",
      species: ["cat"],
      category: "Infectious Disease / Dental",
      signals: {
        complaints_nasal_discharge: 8, complaints_sneezing: 8, complaints_anorexia: 8,
        complaints_lethargy: 7, complaints_behavioral: 6, complaints_eye_discharge: 7,
        eyes_discharge_serous: 6, temp_high: 7,
        age_kitten: 8, vaccine_never: 7, vaccine_overdue: 6,
        env_kennel: 7, env_contact_stray: 8
      },
      tests: {
        tier1: ["Clinical signs (acute oral ulcers, nasal/ocular discharge)","FCV PCR (oropharyngeal swab)","CBC/chemistry","FeLV/FIV testing"],
        tier2: ["FHV-1 PCR (differentiate or co-infection)","Thoracic radiograph (pneumonia in virulent systemic FCV)"],
        tier3: []
      },
      treatment: {
        medications: ["Supportive care primary (viral — no specific antiviral)","Buprenorphine 0.01 mg/kg buccal q6–8h (oral pain)","Meloxicam 0.1 mg/kg PO SID (analgesia/anti-inflammatory)","Doxycycline 5 mg/kg PO BID × 14d (secondary bacterial infection)","Amoxicillin-clavulanate 12.5 mg/kg PO BID (bacterial pneumonia)","Nutritional support — tube feeding if anorexic","L-lysine supplementation (limited benefit in FCV — mainly FHV-1)"],
        procedures: ["Warm saline nasal flushes","Ophthalmic lubricant drops","Humidifier/nebulizer (nasal congestion)","Isolation from healthy cats","VIRULENT SYSTEMIC FCV: aggressive supportive care + ICU"],
        diet: ["Highly palatable, strong-smelling food","Warm food (smell encourages appetite in congested cats)","Syringe feed if not eating voluntarily"]
      },
      education: {
        monitor: ["Appetite and oral pain","Respiratory signs","Hydration","Recurrence of stomatitis (carrier state)","Vaccine protection vs ongoing FCV strains"],
        red_flags: ["Virulent systemic FCV: severe ulcers, facial/limb edema, pneumonia, high mortality — outbreak management needed","Not eating for >3 days — hepatic lipidosis risk","Secondary bacterial pneumonia"],
        followup: "Recheck 5–7 days; FCV carriers shed lifelong; vaccination reduces severity (not sterilizing immunity); multi-cat households: isolate affected cats",
        prognosis: "good"
      }
    },

    {
      id: "myiasis",
      name: "Myiasis (Fly Strike / Cutaneous Larval Infestation)",
      species: ["dog","cat","rabbit"],
      category: "Dermatology / Parasitology / Tropical",
      emergency: true,
      signals: {
        complaints_skin_lesions: 9, complaints_behavioral: 8, complaints_lethargy: 7,
        skin_alopecia_focal: 7, skin_erythema: 7, skin_pustules: 6,
        temp_high: 6, env_outdoor: 8, env_endemic_area: 7,
        hpi_onset_sudden: 8
      },
      tests: {
        tier1: ["Physical exam — larvae visible in wound (DIAGNOSTIC)","Full body examination for all fly strike areas","Temperature (systemic sepsis risk)","CBC/chemistry"],
        tier2: ["Culture of wound","Wound depth assessment"],
        tier3: []
      },
      treatment: {
        medications: ["REMOVE ALL LARVAE (manual, irrigation with saline)","Ivermectin 0.2 mg/kg SC (kills remaining larvae)","Antibiotics: Amoxicillin-clavulanate 12.5 mg/kg PO BID × 7–10d (wound infection)","Analgesics: Meloxicam 0.1–0.2 mg/kg SC SID","Ivermectin contraindicated in Collies (MDR1 mutation) — use doramectin or selamectin"],
        procedures: ["Wound lavage with saline/dilute chlorhexidine","Surgical debridement (necrotic tissue)","Bandaging with sterile dressing after debridement","Keep wound dry and clean","Fly repellent environment"],
        diet: ["Supportive care","Assisted feeding if painful/reluctant to eat"]
      },
      education: {
        monitor: ["Wound healing","New larvae development","Systemic sepsis signs","Nutritional status"],
        red_flags: ["Deep tissue destruction","Septic shock","Large surface area involvement","Rabbit fly strike — can be fatal within hours"],
        followup: "Recheck wound in 2–3 days; prevention: regular grooming, wound care, fly-proof housing especially for rabbits in summer months; treat underlying skin disease or soiling that attracts flies",
        prognosis: "fair"
      }
    },


    // ═══════════════════════════ BATCH 5 — FINAL CONDITIONS ═════════════════

    {
      id: "toxin_avocado",
      name: "Avocado Toxicosis",
      species: ["dog","cat","bird","rabbit"],
      category: "Toxicology",
      signals: {
        complaints_dyspnea: 7, complaints_lethargy: 7, complaints_vomiting: 7,
        complaints_abdominal_distension: 5, abdomen_fluid_wave: 5,
        hpi_onset_sudden: 8, history_toxin_ingestion: 9,
        env_indoor: 4, age_young: 4
      },
      tests: {
        tier1: ["CBC/chemistry","Echocardiogram (cardiac edema/effusion)","Thoracic radiograph (pulmonary edema)"],
        tier2: ["Abdominal ultrasound","Urine output"],
        tier3: []
      },
      treatment: {
        medications: ["Induce emesis if <2h and no respiratory signs: Apomorphine 0.04 mg/kg IV (dog)","Activated charcoal 1–4 g/kg PO","IV fluid support","Furosemide 1–2 mg/kg IV (pulmonary/pleural effusion)"],
        procedures: ["Oxygen supplementation","Thoracocentesis (pleural effusion)","Abdominocentesis (ascites in birds/small pets)"],
        diet: ["No avocado, guacamole, or Guatemalan avocado-containing products"]
      },
      education: {
        monitor: ["Respiratory rate","Chest radiograph","Echocardiogram (cardiac involvement)"],
        red_flags: ["Pulmonary edema — dyspnea","Pericardial effusion","BIRDS/RABBITS most sensitive — even small amounts can be fatal"],
        followup: "Recheck thoracic radiograph in 24–48h; birds: lethal in small quantities; dogs less sensitive but can develop mastitis (lactating dogs), GI signs",
        prognosis: "fair"
      }
    },

    {
      id: "toxin_caffeine",
      name: "Caffeine / Methylxanthine Toxicosis",
      species: ["dog","cat"],
      category: "Toxicology",
      emergency: true,
      signals: {
        hr_high: 8, cardiac_tachycardia: 8, complaints_behavioral: 8,
        complaints_seizures: 7, neuro_seizure: 7,
        complaints_vomiting: 7, complaints_polyuria: 5,
        hpi_onset_sudden: 9, history_toxin_ingestion: 9
      },
      tests: {
        tier1: ["ECG (tachyarrhythmia)","Blood glucose","CBC/chemistry"],
        tier2: ["Electrolytes","Caffeine level if available"],
        tier3: []
      },
      treatment: {
        medications: ["Induce emesis if <2h: Apomorphine 0.04 mg/kg IV","Activated charcoal 1–4 g/kg PO q4h","IV fluids (promote excretion)","Diazepam 0.5 mg/kg IV (seizures)","Metoprolol/propranolol (refractory tachyarrhythmia)","Methocarbamol (tremors)"],
        procedures: ["ECG monitoring","Repeat activated charcoal (enterohepatic recirculation)","Temperature monitoring (hyperthermia)"],
        diet: ["Prevent access to coffee, tea, energy drinks, pre-workout supplements, caffeine tablets"]
      },
      education: {
        monitor: ["Heart rate and rhythm","Neurological signs","Temperature","Blood pressure"],
        red_flags: ["VT/VF","Status epilepticus","Temperature >41°C"],
        followup: "Symptoms resolve in 12–24h if managed; cats sensitive to methylxanthines; dark chocolate + coffee = additive toxicity",
        prognosis: "good"
      }
    },

    {
      id: "toxin_ibuprofen_nsaid",
      name: "NSAID Toxicosis (Ibuprofen / Naproxen)",
      species: ["dog","cat"],
      category: "Toxicology",
      emergency: true,
      signals: {
        complaints_vomiting: 8, complaints_lethargy: 7, complaints_diarrhea: 6,
        complaints_bleeding: 6, complaints_polyuria: 5,
        hpi_onset_sudden: 8, history_toxin_ingestion: 9,
        complaints_behavioral: 5
      },
      tests: {
        tier1: ["CBC (anemia from GI bleeding)","Chemistry (BUN, creatinine — AKI)","Urinalysis (hematuria, casts)"],
        tier2: ["Fecal occult blood","Coagulation panel","Electrolytes"],
        tier3: []
      },
      treatment: {
        medications: ["Induce emesis if <2h: Apomorphine 0.04 mg/kg IV","Activated charcoal 1–4 g/kg PO","IV fluid diuresis × 48h (AKI prevention)","Omeprazole 1 mg/kg IV/PO BID (GI protection)","Sucralfate 0.25–1 g PO TID (GI coating)","Misoprostol 1–5 μg/kg PO TID (GI cytoprotectant)"],
        procedures: ["Monitor urine output","CBC and chemistry q12–24h × 48h","Whole blood transfusion if severe GI hemorrhage + anemia"],
        diet: ["Bland diet post-recovery","NPO if GI hemorrhage active"]
      },
      education: {
        monitor: ["BUN/creatinine × 48h","PCV","Urine output","Hematochezia"],
        red_flags: ["Oliguria/anuria — AKI","Melena/hematochezia — GI perforation risk","CNS signs (ibuprofen — higher doses — seizures)"],
        followup: "Renal values at 48h and 5 days; NEVER give human NSAIDs to pets; ibuprofen — 100 mg/kg can cause acute renal failure in dogs; cats extremely sensitive",
        prognosis: "fair"
      }
    },

    {
      id: "cat_immunodeficiency_virus_disease",
      name: "FIV-Associated Immunodeficiency Disease",
      species: ["cat"],
      category: "Infectious Disease",
      signals: {
        complaints_weight_loss: 8, complaints_lethargy: 8, complaints_anorexia: 7,
        complaints_sneezing: 6, complaints_nasal_discharge: 6,
        lymph_moderate: 7, lymph_severe: 5,
        bcs_thin: 7, hpi_onset_chronic: 7, age_old: 6,
        env_outdoor: 7, sex_male_intact: 7, env_contact_stray: 8
      },
      tests: {
        tier1: ["FIV SNAP test (ELISA antibody) — SCREENING","CBC (lymphopenia, neutropenia, anemia)","Chemistry","CD4:CD8 ratio (flow cytometry — optional)"],
        tier2: ["FIV PCR (confirm or differentiate vaccinated vs infected)","FeLV coinfection test","Urinalysis + culture (secondary infections)","Oral exam (stomatitis)"],
        tier3: ["Referral: feline internist for complicated cases"]
      },
      treatment: {
        medications: ["Zidovudine (AZT) 5–10 mg/kg PO BID (antiviral — debated benefit; monitoring for anemia required)","Interferon omega 0.5–1 MU SC SID × 7d/month (immunomodulatory)","Treat all secondary infections aggressively","Anti-infective prophylaxis for concurrent infections as needed"],
        procedures: ["Indoor only lifestyle (prevent re-exposure, protect immunocompromised cat)","Regular wellness monitoring q6 months","Dental care (stomatitis common)"],
        diet: ["High-quality commercial diet","Avoid raw food (E. coli, Salmonella — immunocompromised risk)"]
      },
      education: {
        monitor: ["CBC q6 months","Secondary infections","Body weight","Oral health","Behavioral changes"],
        red_flags: ["Rapid weight loss","Recurrent infections","Neurological signs (FIV encephalitis)","Lymphoma (FIV — 5× increased risk)"],
        followup: "FIV+ cats can live normal lifespan if managed well; recheck q6 months; indoor-only lifestyle essential; neuter to prevent biting transmission",
        prognosis: "fair"
      }
    },

    {
      id: "toxin_mushroom_hepatotoxic",
      name: "Hepatotoxic Mushroom Toxicosis (Amanita/Galerina)",
      species: ["dog","cat"],
      category: "Toxicology",
      emergency: true,
      signals: {
        complaints_vomiting: 8, complaints_diarrhea: 7, complaints_lethargy: 8,
        mm_icteric: 7, complaints_anorexia: 7,
        hpi_onset_subacute: 7, history_toxin_ingestion: 8,
        env_outdoor: 8, temp_high: 4
      },
      tests: {
        tier1: ["Chemistry (liver enzymes — ALT, AST, ALP; bilirubin)","CBC","Coagulation panel (PT/aPTT)","Urinalysis"],
        tier2: ["Mushroom identification (expert if available)","Liver biopsy (centrilobular necrosis pattern)"],
        tier3: []
      },
      treatment: {
        medications: ["Induce emesis if <2h (apomorphine dog)","Activated charcoal 1 g/kg PO q6h × 24h (repeated dosing — amatoxins undergo enterohepatic recirculation)","Silibinin (milk thistle) 20–50 mg/kg IV SID × 3–5 days (MOST EFFECTIVE TREATMENT — hepatoprotectant; binds amatoxin)","Penicillin G 40,000 IU/kg IV TID (blocks hepatic uptake of amatoxins)","N-acetylcysteine 140 mg/kg IV loading then 70 mg/kg q6h × 24h","SAMe 20 mg/kg PO SID","Vitamin K1 (coagulopathy)"],
        procedures: ["IV fluid support","Serial liver enzymes q12–24h","Coagulation monitoring","Blood transfusion if hemorrhagic"],
        diet: ["NPO initially","Hepatic support diet when recovering"]
      },
      education: {
        monitor: ["Liver enzymes daily","Bilirubin","Coagulation (PT/aPTT) q24h","Urine output","Neurological signs (hepatic encephalopathy)"],
        red_flags: ["Apparent recovery day 2–3 then sudden liver failure (HALLMARK of Amanita — delayed biphasic toxicity)","Coagulopathy — DIC","Hepatic encephalopathy — ammonia crisis","Anuria"],
        followup: "Intensive care 3–5 days minimum; repeat liver enzymes daily; Amanita phalloides = death cap — highly lethal; prognosis better with early silibinin treatment",
        prognosis: "guarded"
      }
    },

    {
      id: "heartworm_cat",
      name: "Feline Heartworm Disease",
      species: ["cat"],
      category: "Infectious Disease / Cardiology / Tropical",
      signals: {
        complaints_coughing: 9, complaints_dyspnea: 8, complaints_vomiting: 7,
        complaints_lethargy: 7, complaints_collapse: 6,
        resp_wheeze: 6, resp_crackles_fine: 5,
        env_outdoor: 7, env_endemic_area: 8,
        parasites_tick: 3, hpi_onset_subacute: 6
      },
      tests: {
        tier1: ["Heartworm antigen test (cats — less sensitive, often negative with low worm burden)","Heartworm antibody test (SNAP 4Dx — higher sensitivity in cats)","Thoracic radiograph (enlarged pulmonary arteries, bronchial pattern)","CBC (eosinophilia)"],
        tier2: ["Echocardiogram (right heart enlargement, worms in PA)","Bronchoscopy (HARD — Heartworm Associated Respiratory Disease)"],
        tier3: ["Referral: veterinary internist/cardiologist"]
      },
      treatment: {
        medications: ["NO melarsomine in cats — CONTRAINDICATED (fatal anaphylaxis)","Prednisolone 1–2 mg/kg PO SID × 1–2 months (reduce inflammation — HARD syndrome)","Aspirin 81 mg/cat PO q72h (anti-platelet — anecdotal)","Supportive bronchodilators: Theophylline 4 mg/kg PO BID","Oxygen supplementation (acute respiratory crisis)","Ivermectin 24 μg/kg PO monthly (preventive — NOT adulticide in cats)"],
        procedures: ["Surgical worm removal (heartworms in right heart — emergency)","Cage rest","Oxygen therapy — acute crisis"],
        diet: ["Normal diet with sodium restriction if right-sided CHF"]
      },
      education: {
        monitor: ["Respiratory signs monthly","Antibody status q6 months","Radiographic changes","Sudden collapse (worm death can cause acute embolism)"],
        red_flags: ["Sudden dyspnea/collapse — emergency (worm death embolism)","Pleural/pericardial effusion","Neurological signs (aberrant migration)"],
        followup: "Monthly heartworm prevention mandatory in endemic areas; managed conservatively — most cats clear infection over 2–3 years; prognosis variable (sudden death from worm embolism possible)",
        prognosis: "guarded"
      }
    },

    {
      id: "ancylostomiasis",
      name: "Hookworm Infection (Ancylostoma)",
      species: ["dog","cat"],
      category: "Parasitology / Gastroenterology / Tropical",
      signals: {
        complaints_diarrhea: 8, complaints_weight_loss: 7, mm_pale: 7,
        complaints_lethargy: 7, complaints_anorexia: 6, bcs_thin: 6,
        complaints_bleeding: 5, age_puppy: 8, age_kitten: 7,
        env_outdoor: 7, env_endemic_area: 7
      },
      tests: {
        tier1: ["Fecal flotation (eggs)","PCV/TS (hookworm anemia)","CBC (anemia — microcytic hypochromic)"],
        tier2: ["Fecal culture (larval staging)","Serum iron levels"],
        tier3: []
      },
      treatment: {
        medications: ["Fenbendazole 50 mg/kg PO SID × 3 days (broad-spectrum)","Pyrantel pamoate 5 mg/kg PO repeat in 2 weeks","Milbemycin oxime (per label)","Iron supplementation + folic acid (anemia)","Whole blood transfusion if PCV <15%","Monthly preventive: Ivermectin or milbemycin + pyrantel (Heartgard Plus, Sentinel)"],
        procedures: ["Environmental decontamination (larvae survive in soil)","Prevent pup/kitten from walking on contaminated ground"],
        diet: ["High-iron, high-protein diet","Iron-fortified food during recovery"]
      },
      education: {
        monitor: ["PCV weekly (severe anemia — transfusion threshold)","Fecal recheck at 2–4 weeks (clearance)","Weight gain","Iron levels"],
        red_flags: ["PCV <15% — emergency transfusion in puppies/kittens","Neonatal hookworm = transmammary — check entire litter","Zoonotic — cutaneous larva migrans in humans walking barefoot"],
        followup: "Fecal recheck at 2 weeks post-treatment; monthly prevention lifelong in endemic areas; deworm puppies/kittens at 2, 4, 6, 8 weeks",
        prognosis: "good"
      }
    },

    {
      id: "toxocariasis",
      name: "Toxocariasis / Roundworm Infection (Toxocara)",
      species: ["dog","cat"],
      category: "Parasitology / Gastroenterology / Zoonosis",
      signals: {
        complaints_vomiting: 7, complaints_diarrhea: 7, complaints_weight_loss: 7,
        bcs_thin: 7, complaints_abdominal_distension: 6,
        age_puppy: 9, age_kitten: 9, age_young: 6,
        env_outdoor: 6
      },
      tests: {
        tier1: ["Fecal flotation (oval eggs with pitted shell)","CBC (eosinophilia)","Physical exam — pot-belly abdomen in puppies"],
        tier2: ["Serology (Toxocara ELISA — elevated in chronic)","Chest radiograph (larval migration — coughing puppies)"],
        tier3: []
      },
      treatment: {
        medications: ["Fenbendazole 50 mg/kg PO SID × 3 days","Pyrantel pamoate 5–10 mg/kg PO, repeat 2 weeks","Milbemycin oxime per label","Monthly heartworm preventive (includes roundworm coverage)"],
        procedures: ["Deworm ALL puppies/kittens at 2, 4, 6, 8 weeks regardless","Deworm ALL bitches during pregnancy (days 40–55) + lactation","Environmental sanitation (larvae viable in soil 3+ years)"],
        diet: ["Nutritious, high-quality diet for recovery","Iron and vitamin supplementation"]
      },
      education: {
        monitor: ["Fecal recheck 2–4 weeks post-treatment","Weight gain","Coat quality","GI sign resolution"],
        red_flags: ["Massive worm burden causing obstruction (puppies)","Coughing/dyspnea during larval migration (Löffler's syndrome)","ZOONOTIC: visceral/ocular larva migrans in children — educate owner on hygiene"],
        followup: "Monthly prevention ongoing; bi-annual or quarterly deworming in adults; inform owners about zoonotic risks (fecal hand hygiene, wash produce grown in soil)",
        prognosis: "good"
      }
    },

    {
      id: "tritrichomonas_cat",
      name: "Tritrichomonas foetus Infection — Feline",
      species: ["cat"],
      category: "Gastroenterology / Parasitology",
      signals: {
        complaints_diarrhea: 9, complaints_hematochezia: 7, complaints_behavioral: 5,
        hpi_onset_chronic: 7, env_kennel: 7, env_contact_other_pets: 7,
        age_kitten: 8, age_young: 6
      },
      tests: {
        tier1: ["Fecal PCR — Tritrichomonas foetus (MOST SENSITIVE)","Direct fecal smear (motile trophozoites — low sensitivity)"],
        tier2: ["InPouch TF culture (specialized culture kit)","Colonoscopy + biopsy (chronic cases)"],
        tier3: []
      },
      treatment: {
        medications: ["Ronidazole 30 mg/kg PO SID × 14 days (ONLY EFFECTIVE TREATMENT)","Probiotic supplementation (Fortiflora — adjunct)","NOTE: Metronidazole NOT effective (different mechanism)"],
        procedures: ["Fecal PCR recheck 4 weeks after treatment","Multi-cat households: test and treat all cats","Disinfect litter boxes (10% bleach) daily"],
        diet: ["Highly digestible, low-residue diet","Probiotic supplementation during treatment"]
      },
      education: {
        monitor: ["Diarrhea resolution (expected 2–3 weeks post-treatment)","Fecal PCR at 3–4 weeks","Weight"],
        red_flags: ["Neurological signs (ronidazole toxicity — reduce dose or stop)","Treatment failure — retest PCR","Reinfection from untreated cats"],
        followup: "PCR recheck at 4 weeks post-treatment; many cats self-resolve by 2 years; multi-cat cattery: all cats tested; ronidazole is neurotoxic at high doses — do not exceed 30 mg/kg",
        prognosis: "good"
      }
    },

    {
      id: "feline_infectious_anemia",
      name: "Feline Infectious Anemia (Mycoplasma haemofelis)",
      species: ["cat"],
      category: "Infectious Disease / Hematology",
      emergency: true,
      signals: {
        complaints_lethargy: 9, mm_pale: 9, mm_white: 7,
        complaints_anorexia: 8, complaints_weight_loss: 7,
        temp_high: 7, temp_low: 5, hr_high: 6,
        hpi_onset_subacute: 7, env_outdoor: 7,
        parasites_fleas: 7, env_contact_stray: 7
      },
      tests: {
        tier1: ["PCV/TS (severe anemia — <15%)","Blood smear (parasites on RBC surface — Mycoplasma haemofelis — ring shapes)","CBC (autoagglutination, spherocytes)"],
        tier2: ["PCR (Mycoplasma haemofelis) — MOST SENSITIVE","FeLV/FIV (predisposing factor)","Direct Coombs test (immune-mediated component)","Reticulocyte count (regenerative?)"],
        tier3: []
      },
      treatment: {
        medications: ["Doxycycline 10 mg/kg PO SID × 28 days (FIRST-LINE)","Marbofloxacin 2 mg/kg PO SID × 28 days (alternative — cat-safe fluoroquinolone)","Prednisolone 1–2 mg/kg PO SID × 14d (immune-mediated hemolysis component)","Whole blood or pRBC transfusion if PCV <12% (emergency)","Flea control (flea = transmission vector)"],
        procedures: ["Type-compatible blood transfusion","Monitor for transfusion reactions","Supportive care (warmth, nutritional support)"],
        diet: ["High-quality, iron-rich diet during recovery"]
      },
      education: {
        monitor: ["PCV every 24–48h during acute phase","Reticulocyte count (regenerative response = good sign)","Doxycycline complications (vomiting — give with food/water after)","FeLV/FIV status"],
        red_flags: ["PCV <12% — emergency transfusion","Autoagglutination — rapid hemolysis","Non-regenerative anemia (FeLV/FIV suppression — poor prognosis)"],
        followup: "PCV recheck weekly × 4 weeks; PCR recheck at 6 weeks (eliminate carrier state rarely achieved); flea control lifelong; FeLV/FIV management if positive",
        prognosis: "fair"
      }
    },

    {
      id: "canine_infectious_hepatitis",
      name: "Canine Infectious Hepatitis (Adenovirus Type 1)",
      species: ["dog"],
      category: "Infectious Disease",
      emergency: true,
      signals: {
        complaints_lethargy: 9, complaints_vomiting: 8, complaints_anorexia: 8,
        complaints_abdominal_distension: 6, mm_icteric: 7, mm_pale: 6,
        temp_high: 8, abdomen_pain_moderate: 7,
        age_puppy: 8, age_young: 7,
        vaccine_never: 8, vaccine_overdue: 7
      },
      tests: {
        tier1: ["CBC (neutropenia, left shift, thrombocytopenia)","Chemistry (elevated ALT, ALP, bilirubin)","CAV-1 serology / PCR (urine — viral shedding)","Coagulation panel (DIC — common)"],
        tier2: ["Abdominal ultrasound (hepatic echogenicity, ascites)","Urinalysis (bilirubinuria, casts)"],
        tier3: []
      },
      treatment: {
        medications: ["IV fluid resuscitation","Broad-spectrum antibiotics (secondary infection)","Vitamin K1 (coagulopathy)","Dextrose supplementation (hypoglycemia)","FFP transfusion (DIC — coagulopathy)"],
        procedures: ["Strict isolation (highly contagious)","Hepatoprotectants (SAMe, ursodiol)","Abdominocentesis (ascites)","ICU monitoring"],
        diet: ["NPO if vomiting","Low-protein hepatic diet when recovering"]
      },
      education: {
        monitor: ["Liver enzymes","Coagulation","Urine output","Neurological signs"],
        red_flags: ["DIC — spontaneous bleeding","'Blue eye' (corneal edema — immune complex) resolves spontaneously usually","Hepatic encephalopathy","Renal failure"],
        followup: "VACCINATION prevents disease (DAP/DHPPi vaccine — modified live); prognosis: guarded in young unvaccinated pups; vaccinated dogs rarely affected",
        prognosis: "guarded"
      }
    },

    {
      id: "canine_adenovirus_2_kennel_cough",
      name: "Canine Adenovirus Type 2 (CAV-2) — Kennel Cough Component",
      species: ["dog"],
      category: "Infectious Disease / Respiratory",
      signals: {
        complaints_coughing: 9, complaints_sneezing: 6, complaints_nasal_discharge: 6,
        nose_serous_discharge: 6, temp_high: 5,
        env_kennel: 8, env_contact_other_pets: 7,
        vaccine_overdue: 6, age_young: 6, age_puppy: 7
      },
      tests: {
        tier1: ["Clinical signs + kennel exposure history","Oropharyngeal swab PCR (CAV-2, Bordetella, CIV)","Thoracic radiograph (pneumonia)"],
        tier2: ["CBC (mild leukocytosis or normal)"],
        tier3: []
      },
      treatment: {
        medications: ["Doxycycline 5–10 mg/kg PO BID × 7–14d (secondary bacteria)","Cough suppressant: Butorphanol 0.05–0.1 mg/kg PO BID-TID (ONLY if non-productive cough)","Bronchodilator: Terbutaline 0.01 mg/kg SC prn (bronchospasm)","NSAIDs: Meloxicam 0.1 mg/kg PO SID (pyrexia, inflammation)"],
        procedures: ["Isolation × 10–14d","Steam inhalation / humidifier","Rest — no exercise","Vaccination (intranasal Bordetella + CAV-2 — recommended to prevent)"],
        diet: ["Normal nutritious diet","Warm food (palatability when nasal congestion)"]
      },
      education: {
        monitor: ["Cough severity and frequency","Appetite","Temperature","Development of pneumonia"],
        red_flags: ["Productive cough with mucopurulent discharge — pneumonia","Dyspnea","Fever >40°C unresponsive to treatment","Systemic signs (lethargy, anorexia, dyspnea) = complicated CIRD"],
        followup: "Recheck 5–7 days; vaccination core in boarding dogs; intranasal Bordetella + CAV-2 given before boarding (2 weeks prior)",
        prognosis: "excellent"
      }
    },

    {
      id: "campylobacteriosis",
      name: "Campylobacteriosis / Bacterial Gastroenteritis",
      species: ["dog","cat"],
      category: "Infectious Disease / Gastroenterology / Zoonosis",
      signals: {
        complaints_diarrhea: 9, complaints_vomiting: 7, complaints_lethargy: 6,
        temp_high: 6, complaints_hematochezia: 6,
        age_puppy: 7, age_kitten: 7, env_kennel: 6,
        hpi_onset_sudden: 7, history_dietary_change: 4
      },
      tests: {
        tier1: ["Fecal cytology (curved bacilli — 'seagull'-shaped on Gram stain)","Fecal culture (Campylobacter selective agar)","CBC (leukocytosis)"],
        tier2: ["PCR fecal panel","Blood culture (bacteremia in young/immunocompromised)"],
        tier3: []
      },
      treatment: {
        medications: ["Azithromycin 5–10 mg/kg PO SID × 7–10 days (FIRST-LINE — fewer resistance concerns)","Erythromycin 10–20 mg/kg PO TID × 7 days (alternative)","Metronidazole 10–15 mg/kg PO BID × 5 days (adjunct)","IV fluid support (dehydration)"],
        procedures: ["Isolation (zoonotic pathogen)","Strict hygiene (gloves, hand-washing)","Fecal recheck post-treatment"],
        diet: ["Bland diet (boiled chicken + rice × 3–5 days)","Gradual transition back to normal food","Probiotics (Fortiflora)"]
      },
      education: {
        monitor: ["Diarrhea resolution","Hydration","Blood in stool","CBC if persisting"],
        red_flags: ["Bloody diarrhea + fever + lethargy — blood culture (bacteremia)","Persistent > 10 days despite treatment","ZOONOTIC: human family members — wash hands after contact, especially children/immunocompromised"],
        followup: "Fecal recheck at 10 days; food safety counseling (raw feeding = risk); prognosis excellent with prompt treatment",
        prognosis: "excellent"
      }
    },

    {
      id: "giardiasis",
      name: "Giardiasis (Giardia duodenalis)",
      species: ["dog","cat"],
      category: "Parasitology / Gastroenterology / Zoonosis",
      signals: {
        complaints_diarrhea: 9, complaints_weight_loss: 6, complaints_lethargy: 5,
        complaints_vomiting: 4, bcs_thin: 5, hpi_onset_chronic: 6,
        hpi_onset_subacute: 5, age_puppy: 7, age_kitten: 7,
        env_kennel: 7, env_contact_other_pets: 6, env_outdoor: 5
      },
      tests: {
        tier1: ["Fecal flotation with zinc sulfate (cysts)","Giardia antigen test (ELISA/IFA) — SNAP test","Direct fecal smear (trophozoites — pear-shaped)"],
        tier2: ["PCR (genotyping — assemblage)"],
        tier3: []
      },
      treatment: {
        medications: ["Fenbendazole 50 mg/kg PO SID × 5 days (FIRST-LINE)","Metronidazole 25 mg/kg PO BID × 5–7 days (alternative)","Combination Fenbendazole + Metronidazole (refractory cases) × 5–7 days","Ronidazole (refractory Giardia — off-label)"],
        procedures: ["Bathe pet after treatment (remove cysts from coat)","Disinfect environment (dilute bleach)","Test and treat all in-contact pets","Fecal recheck at 2 and 4 weeks"],
        diet: ["Bland diet during diarrhea","Probiotic supplementation"]
      },
      education: {
        monitor: ["Diarrhea resolution","Fecal antigen recheck at 4 weeks","Household pets — test all","Water source (Giardia in standing water)"],
        red_flags: ["Persistent diarrhea despite 2 treatment cycles","Weight loss continuing","ZOONOTIC: Assemblage A and B infect humans; advise hygiene","Coinfection with other parasites common"],
        followup: "Fecal recheck × 2 weeks post-treatment; environmental decontamination important; avoid standing water; prognosis excellent",
        prognosis: "excellent"
      }
    },

    {
      id: "pythiosis",
      name: "Pythiosis (Pythium insidiosum — Water Mold)",
      species: ["dog","cat"],
      category: "Infectious Disease / Fungal / Tropical",
      signals: {
        complaints_vomiting: 8, complaints_weight_loss: 8, complaints_diarrhea: 7,
        complaints_swelling_mass: 8, abdomen_pain_moderate: 6,
        hpi_onset_subacute: 7, hpi_progression_worsening: 7,
        env_outdoor: 8, env_endemic_area: 9,
        age_young: 5, age_middle: 5, breed_labrador: 4
      },
      tests: {
        tier1: ["Abdominal ultrasound (intestinal wall thickening, mass)","CBC (eosinophilia, leukocytosis)","Serology (Pythium immunodiffusion / ELISA — available in reference labs)"],
        tier2: ["Biopsy (histopathology — oomycete hyphae — GMS stain)","PCR (tissue)","Culture (difficult)","CT abdomen (extent of lesion)"],
        tier3: ["Referral: veterinary internist/surgeon","Specialist laboratory for serology"]
      },
      treatment: {
        medications: ["NO RELIABLE ANTIFUNGAL (not a true fungus — azoles ineffective)","Itraconazole + Terbinafine combination (limited benefit — reduce burden)","Immunotherapy with Pythium antigen extract (PYTHAVAC — most evidence in horses; limited dog data)","L-Arginine supplementation (experimental)"],
        procedures: ["Aggressive surgical resection of all visible lesion (DEFINITIVE if complete)","Resection with wide margins (1–2 cm clean margins)","Post-op immunotherapy"],
        diet: ["High-quality, calorie-dense nutrition","Nutritional support during illness"]
      },
      education: {
        monitor: ["Recurrence at surgical site","Body weight","GI signs","Post-surgical healing"],
        red_flags: ["Non-resectable intestinal pythiosis — uniformly fatal","Skin form: spreading cutaneous lesion","Rapid recurrence post-surgery — incomplete excision"],
        followup: "Post-surgical recheck 2 weeks, 1 month, 3 months; prognosis poor without complete surgical excision; avoid standing water/flooded fields in endemic areas (South Asia, Southeast Asia)",
        prognosis: "guarded"
      }
    },

    {
      id: "acne_cat_chin_detailed",
      name: "Cat Scratch Disease / Bartonellosis",
      species: ["cat","dog"],
      category: "Infectious Disease / Zoonosis",
      signals: {
        complaints_lethargy: 6, complaints_behavioral: 5, lymph_moderate: 7,
        complaints_anorexia: 5, temp_high: 5,
        env_contact_stray: 8, parasites_fleas: 8,
        hpi_onset_subacute: 5
      },
      tests: {
        tier1: ["Bartonella serology (IFA — ELISA)","CBC (anemia, thrombocytopenia in dogs)","Blood PCR (Bartonella henselae/vinsonii)"],
        tier2: ["Blood culture (special Bartonella lysis-centrifugation method)","Echocardiogram (infective endocarditis — dogs)","Lymph node aspirate"],
        tier3: ["Referral: infectious disease specialist"]
      },
      treatment: {
        medications: ["Doxycycline 10 mg/kg PO SID × 28–56 days","Azithromycin 10 mg/kg PO SID × 30 days (alternative)","Enrofloxacin 5 mg/kg PO SID × 28 days (adjunct or alternative — NOT in growing animals)","Pradofloxacin 7.5 mg/kg PO SID × 28 days (cats — respiratory safe fluoroquinolone)","Flea control (Bartonella vectors — fleas)"],
        procedures: ["Aggressive flea control (all pets in household)","Scratch wound care in humans — soap and water, contact PCP"],
        diet: ["Normal balanced diet"]
      },
      education: {
        monitor: ["Lymph node size","CBC trends","Cardiac function (endocarditis)","Bacteremia clearance (PCR)"],
        red_flags: ["Infective endocarditis (dogs — cardiac murmur, fever)","CNS bartonellosis (neurological signs)","ZOONOTIC: Bartonella henselae — cat scratch disease in immunocompromised humans — cat may be healthy carrier","Uveitis (ocular bartonellosis)"],
        followup: "PCR recheck 4–6 weeks post-treatment; flea control critical (fleas transmit between cats and to humans); immunocompromised owners should avoid cat scratches; prognosis good",
        prognosis: "fair"
      }
    },

    {
      id: "aspergillosis_sinonasal",
      name: "Nasal Aspergillosis (Sinonasal)",
      species: ["dog","cat"],
      category: "Infectious Disease / Fungal / Respiratory",
      signals: {
        complaints_nasal_discharge: 9, complaints_sneezing: 8,
        complaints_bleeding: 7, nose_mucopurulent: 8,
        complaints_behavioral: 5, complaints_lethargy: 5,
        hpi_onset_subacute: 6, hpi_progression_worsening: 6,
        env_outdoor: 6, age_middle: 5
      },
      tests: {
        tier1: ["CT nasal/sinus (turbinate destruction — BEST IMAGING)","Rhinoscopy (fungal plaques)","Aspergillus antigen (galactomannan nasal washings)"],
        tier2: ["Culture (Aspergillus fumigatus/flavus)","Serology (antibody — low sensitivity for sinonasal)","Nasal biopsy"],
        tier3: []
      },
      treatment: {
        medications: ["Topical clotrimazole (1%) infusion via rhinoscopy (HIGHLY EFFECTIVE)","Voriconazole 4–6 mg/kg PO BID × 3–6 months (systemic — second-line or adjunct)","Itraconazole 5 mg/kg PO SID × 3–6 months (alternative oral)"],
        procedures: ["Rhinoscopic debridement of plaques","Topical clotrimazole infusion (1 hour — under GA) — 60–90% cure rate","Repeat infusion at 3–4 weeks if incomplete response","Surgical turbinate debridement (open rhinotomy — select cases)"],
        diet: ["Normal diet"]
      },
      education: {
        monitor: ["Nasal discharge resolution","Epistaxis frequency","CT reassessment at 3 months","Repeat rhinoscopy if persisting signs"],
        red_flags: ["Extension into orbit or CNS (invasive aspergillosis — German Shepherd dogs)","Non-response after 2 clotrimazole infusions","Immune-compromised patient — risk of dissemination"],
        followup: "Rhinoscopy recheck at 4–6 weeks; CT at 3 months; topical clotrimazole success rate 85–90% in 2 treatments; invasive CNS Aspergillus = poor prognosis",
        prognosis: "fair"
      }
    },

    {
      id: "eosinophilic_bronchopneumopathy",
      name: "Eosinophilic Bronchopneumopathy (EBP)",
      species: ["dog"],
      category: "Respiratory",
      signals: {
        complaints_coughing: 9, complaints_dyspnea: 7, complaints_lethargy: 6,
        resp_crackles_fine: 7, resp_wheeze: 6, temp_high: 5,
        hpi_onset_subacute: 6, hpi_progression_worsening: 6,
        breed_husky: 6, breed_malamute: 5
      },
      tests: {
        tier1: ["Thoracic radiograph (peribronchial and alveolar infiltrates)","CBC (marked eosinophilia — >1.5 × 10⁹/L)","Heartworm test","Fecal (lungworm — Angiostrongylus)"],
        tier2: ["BAL cytology (eosinophils >20%)","Lung biopsy (eosinophilic infiltrate)","Allergen testing","Aspergillus serology (rule out fungal)"],
        tier3: ["CT thorax","Referral: veterinary internist/pulmonologist"]
      },
      treatment: {
        medications: ["Prednisolone 2 mg/kg PO SID × 4–6 weeks then taper (CORNERSTONE)","Inhaled fluticasone (maintenance — reduces systemic dose)","Bronchodilator: Theophylline 10 mg/kg PO BID (adjunct)","Treat parasites: Fenbendazole 50 mg/kg PO SID × 3 weeks (Angiostrongylus)"],
        procedures: ["Avoid allergen/trigger if identified","Nebulization with saline BID","BAL recheck post-treatment"],
        diet: ["Hypoallergenic diet trial (suspected food allergy trigger)","Omega-3 supplementation"]
      },
      education: {
        monitor: ["Cough frequency and productivity","Eosinophil count (CBC)","Thoracic radiograph improvement","Steroid side effects"],
        red_flags: ["SpO2 <94% — hospitalise and oxygen","Non-responsive after 4 weeks prednisolone (re-investigate)","Concurrent infection"],
        followup: "CBC + thoracic radiograph at 4–6 weeks; steroid taper over 3–6 months; BAL recheck if clinical relapse; condition may recur — long-term management in some dogs",
        prognosis: "good"
      }
    },

    {
      id: "hypereosinophilic_syndrome",
      name: "Hypereosinophilic Syndrome (HES)",
      species: ["cat"],
      category: "Hematology / Immunology",
      signals: {
        complaints_lethargy: 7, complaints_weight_loss: 7, complaints_vomiting: 6,
        complaints_diarrhea: 7, complaints_skin_lesions: 5,
        lymph_moderate: 6, spleen_splenomegaly: 6,
        age_middle: 5, age_old: 6,
        hpi_onset_subacute: 5, hpi_progression_worsening: 6
      },
      tests: {
        tier1: ["CBC — marked eosinophilia >1.5 × 10⁹/L","Chemistry","Thoracic and abdominal radiograph"],
        tier2: ["Bone marrow aspirate (eosinophilic hyperplasia)","Abdominal ultrasound (organ involvement)","Parasite PCR/serology","FeLV/FIV","GI biopsy (eosinophilic infiltration)"],
        tier3: ["Chromosomal analysis (FIP-1L1-PDGFRA mutation — imatinib responsive)","Referral: oncologist/internist"]
      },
      treatment: {
        medications: ["Prednisolone 2–4 mg/kg PO SID × 4–6 weeks (first-line)","Hydroxyurea 25 mg/kg PO SID (myelosuppressive — severe cases)","Imatinib (Gleevec) 10 mg/kg PO SID (if FIP1L1-PDGFRA mutation — specific tyrosine kinase inhibitor)","Vincristine (specialist protocol — hypereosinophilic syndrome with blast crisis)"],
        procedures: ["Treat all parasite causes","CBC monitoring q2–4 weeks","Organ function monitoring"],
        diet: ["High-quality, anti-inflammatory diet","Omega-3 supplementation"]
      },
      education: {
        monitor: ["Eosinophil count q2–4 weeks","Organ involvement progression","Body weight","Side effects of hydroxyurea"],
        red_flags: ["End-organ damage (cardiac, GI, CNS)","Blast crisis (hypereosinophilic leukemia)","Non-response to prednisolone × 6 weeks"],
        followup: "Bone marrow recheck at 6–8 weeks; cats with FIP1L1-PDGFRA respond dramatically to imatinib; prognosis varies",
        prognosis: "guarded"
      }
    },

    {
      id: "horner_syndrome",
      name: "Horner's Syndrome",
      species: ["dog","cat"],
      category: "Neurology",
      signals: {
        complaints_behavioral: 6, complaints_eye_discharge: 5,
        eyes_conjunctival_hyperemia: 5, posture_head_tilt: 4,
        hpi_onset_sudden: 7, hpi_onset_subacute: 5,
        age_middle: 4, breed_golden: 3
      },
      tests: {
        tier1: ["Ophthalmic exam (ptosis, miosis, enophthalmos, third eyelid prolapse — CLASSIC TRIAD)","Phenylephrine 1% topical (localization: 1st order — <20 min; 3rd order — <10 min)","Physical exam (cervical palpation, thoracic auscultation)"],
        tier2: ["Thoracic radiograph (cranial mediastinal mass, pleural effusion)","Neck/thoracic radiograph","Otoscopy (middle ear disease — most common cause)","MRI brain/cervical cord (1st/2nd order)","CBC/chemistry"],
        tier3: ["CT brain/neck","Referral: veterinary neurologist/ophthalmologist"]
      },
      treatment: {
        medications: ["Treat underlying cause (otitis media: antibiotics; tumor: surgery/chemo/radiation)","Idiopathic Horner's: observation — resolves in 6–16 weeks in golden retrievers"],
        procedures: ["Identify location of lesion (pre-ganglionic 1st/2nd vs post-ganglionic 3rd order)","Middle ear disease: deep ear lavage, systemic antibiotics","Cervical tumor: surgical excision","Iatrogenic (jugular venipuncture): observation"],
        diet: ["No specific dietary restriction"]
      },
      education: {
        monitor: ["Lesion localization","Cause identification progress","Resolution of signs (idiopathic — expect 6–16 weeks)"],
        red_flags: ["Rapidly progressive neurological signs (1st/2nd order — CNS lesion)","Cranial mediastinal mass (lymphoma)","Persistent pain (otitis media)"],
        followup: "Recheck in 4 weeks; if cause found — treat primary disease; idiopathic Horner's (especially golden retriever) — observe; phenylephrine helps confirm post-ganglionic (3rd order) location",
        prognosis: "good"
      }
    },

    {
      id: "facial_nerve_paralysis",
      name: "Facial Nerve Paralysis / Idiopathic Facial Neuropathy",
      species: ["dog","cat"],
      category: "Neurology",
      signals: {
        complaints_behavioral: 7, complaints_eye_discharge: 7,
        eyes_discharge_mucopurulent: 5, complaints_anorexia: 5,
        hpi_onset_sudden: 8, age_middle: 5, age_old: 6,
        breed_cocker: 6, breed_pembroke: 5
      },
      tests: {
        tier1: ["Neurological exam — palpebral reflex absent, asymmetric facial droop, lip droop, droopy ear","Otoscopy (otitis interna/media)","CBC/chemistry","Blood pressure"],
        tier2: ["Hypothyroid panel (T4/TSH)","MRI brain (facial nerve nucleus)","CT middle ear (tympanic bulla)"],
        tier3: ["EMG/facial nerve conduction","Referral: veterinary neurologist"]
      },
      treatment: {
        medications: ["Treat underlying cause (hypothyroidism: levothyroxine; otitis: antibiotics)","Artificial tears q4–6h (corneal exposure keratitis prevention)","Tacrolimus 0.02% ophthalmic ointment BID (KCS protection)","Prednisolone 0.5–1 mg/kg PO SID × 2–4 weeks (idiopathic — controversial)"],
        procedures: ["E-collar (prevent eye trauma)","Temporary tarsorrhaphy (suture eyelids partially — protect cornea)","Lubricate eye before sleeping","Treat otitis if present"],
        diet: ["Elevate food bowl (lip droop impairs eating)","Soft food"]
      },
      education: {
        monitor: ["Corneal health (fluorescein stain q2–4 weeks)","Facial muscle recovery","Cause investigation progress","Eating ability"],
        red_flags: ["Corneal ulcer from exposure","Non-resolution of idiopathic in 2 months (cause investigation)","Progressive facial nerve involvement (polyneuropathy)"],
        followup: "Recheck monthly; idiopathic = may resolve in 3–12 months or be permanent; KCS concurrent — lifelong ocular lubrication; hypothyroidism: excellent prognosis with levothyroxine",
        prognosis: "fair"
      }
    },

    {
      id: "trigeminal_neuritis",
      name: "Trigeminal Neuritis (Dropped Jaw Syndrome)",
      species: ["dog"],
      category: "Neurology",
      signals: {
        complaints_anorexia: 9, complaints_behavioral: 8, complaints_dysphagia: 9,
        hpi_onset_sudden: 9, age_middle: 5, age_old: 5,
        breed_cocker: 5, breed_cavalier: 4
      },
      contra_signals: { temp_high: -3, lymph_mild: -2 },
      tests: {
        tier1: ["Neurological exam — dropped jaw, inability to close mouth, jaw atrophy","MRI brain (trigeminal nerve root enhancement)","CBC/chemistry"],
        tier2: ["CSF analysis","Muscle biopsy (masticatory muscle myositis 2M antibodies — rule out MMM)","2M antibody titer"],
        tier3: ["Referral: veterinary neurologist"]
      },
      treatment: {
        medications: ["NO effective treatment — supportive care only","Jaw support sling (improvised — prevents excessive jaw opening)","Syringe feeding or nasogastric tube","Methylprednisolone (if 2M antibody positive MMM — differentiate first — biopsy)"],
        procedures: ["Nasogastric or esophagostomy feeding tube (maintain nutrition)","Water supplementation","Manual jaw support while eating","Physical therapy — passive jaw motion"],
        diet: ["Syringe-fed liquid diet","Elevated bowl feeding"]
      },
      education: {
        monitor: ["Jaw closure ability (return in 4–8 weeks for idiopathic)","Body weight","Aspiration risk","Muscle mass"],
        red_flags: ["Aspiration pneumonia (cannot close mouth fully — saliva/food inhaled)","Masticatory muscle myositis (different condition — test 2M antibody)","Not improving at 8 weeks (reassess)"],
        followup: "Most idiopathic cases recover in 4–8 weeks without treatment; nasogastric tube if weight-losing rapidly; rule out MMM (different treatment — prednisolone); prognosis excellent for idiopathic",
        prognosis: "good"
      }
    },

    {
      id: "feline_aortic_thromboembolism",
      name: "Feline Aortic Thromboembolism (FATE)",
      species: ["cat"],
      category: "Cardiology / Emergency",
      emergency: true,
      signals: {
        complaints_collapse: 10, complaints_behavioral: 9,
        gait_paralysis: 10, complaints_dyspnea: 7,
        mm_pale: 8, mm_cyanotic: 7,
        hr_high: 6, cardiac_murmur_34: 7,
        hpi_onset_sudden: 10, age_middle: 6, age_old: 7
      },
      tests: {
        tier1: ["Physical exam — hind limb: cold, pale, pulseless, pain (DIAGNOSTIC)","Echocardiogram (HCM, thrombus in LA)","ECG","Blood glucose"],
        tier2: ["CBC/chemistry (CK — skeletal muscle necrosis)","Thoracic radiograph","Coagulation panel","SpO2"],
        tier3: []
      },
      treatment: {
        medications: ["Analgesia — PRIORITY: Buprenorphine 0.02 mg/kg IV/IM q6–8h + Butorphanol 0.2–0.4 mg/kg IM","Clopidogrel 18.75 mg/cat PO SID (antiplatelet — prevention of recurrence)","Heparin 100–200 U/kg SC TID then maintenance (anticoagulation)","Low molecular weight heparin: enoxaparin 1.25–1.5 mg/kg SC BID (alternative)","Acepromazine 0.02–0.05 mg/kg IM (sedation, reduce anxiety)","Treat underlying HCM: furosemide, atenolol per cardiology protocol","DO NOT use thrombolytics (TPA) — risk > benefit in cats"],
        procedures: ["Warm limbs (warm towels — NOT hot water bottles)","Oxygen supplementation","Treat concurrent CHF","Prognosis discussion early — euthanasia if no reperfusion in 12–24h"],
        diet: ["Cardiac diet if CHF present","Adequate nutrition — nasogastric tube if not eating in 24h"]
      },
      education: {
        monitor: ["Limb temperature and sensation (reperfusion expected 12–72h)","Reperfusion syndrome: hyperthermia, hyperkalemia, myoglobinuria","Pain score","Cardiac status","Respiratory rate"],
        red_flags: ["Reperfusion hyperkalemia — can cause cardiac arrest (K monitoring)","No improvement at 72h — euthanasia discussion","Bilateral ATE — extremely poor prognosis","Pulmonary thromboembolism"],
        followup: "If survives: clopidogrel lifelong (reduces recurrence from 75% to 36%); HCM management; echocardiogram recheck 4 weeks; recurrence rate high — informed client consent essential",
        prognosis: "guarded"
      }
    },

    {
      id: "strangulating_intestinal_obstruction",
      name: "Strangulating Intestinal Obstruction / Volvulus",
      species: ["dog","cat"],
      category: "Gastroenterology / Surgery",
      emergency: true,
      signals: {
        complaints_vomiting: 9, complaints_lethargy: 9, complaints_collapse: 8,
        abdomen_pain_severe: 9, abdomen_tense: 9, abdomen_distension: 8,
        mm_pale: 7, mm_tacky: 7, hr_high: 7,
        hpi_onset_sudden: 9, attitude_obtunded: 6
      },
      tests: {
        tier1: ["Abdominal radiograph (gas-distended loops, 'gravel sign', 'coffee bean')","Abdominal ultrasound (peristalsis absent, free fluid)","PCV/TS","Lactate (>4 mmol/L = strangulation)"],
        tier2: ["CBC/chemistry","CT abdomen (extent of volvulus)","Blood type and crossmatch"],
        tier3: []
      },
      treatment: {
        medications: ["IV fluid resuscitation (shock dose: LRS 30 mL/kg over 15 min — reassess)","Antibiotics: Ampicillin-sulbactam 22 mg/kg IV TID + Metronidazole 15 mg/kg IV BID","Pain: Methadone 0.2–0.4 mg/kg IV q4h","Heparin (prevent/treat DIC)"],
        procedures: ["EMERGENCY SURGERY — exploration, correction of volvulus, resection of non-viable bowel","Gastric decompression (orogastric tube if safe)","Intestinal resection + anastomosis (devitalized bowel)","Post-op intensive monitoring (DIC, septic peritonitis)"],
        diet: ["NPO pre and post-surgery","Liquid diet when bowel sounds return","Small frequent meals × 2 weeks"]
      },
      education: {
        monitor: ["Heart rate, blood pressure","Lactate clearance","Post-op urine output","Incision site","Abdomen for peritonitis recurrence"],
        red_flags: ["Septic peritonitis post-op","Anastomotic dehiscence (2–5 days post-op)","Persistent high lactate despite surgery","DIC — spontaneous bleeding"],
        followup: "ICU 2–5 days post-op; radiograph at 10 days (healing); prognosis poor if strangulation >6h; small intestinal volvulus: mortality >80%; manage underlying cause (e.g. mesenteric root malrotation)",
        prognosis: "poor"
      }
    },

    {
      id: "feline_dilated_cardiomyopathy",
      name: "Feline Dilated Cardiomyopathy (DCM) — Secondary to Taurine Deficiency",
      species: ["cat"],
      category: "Cardiology / Nutritional",
      signals: {
        complaints_dyspnea: 8, complaints_lethargy: 8, complaints_anorexia: 7,
        complaints_collapse: 6, resp_muffled: 7, abdomen_fluid_wave: 5,
        cardiac_murmur_12: 5, mm_pale: 6,
        hpi_onset_subacute: 6, hpi_progression_worsening: 6,
        age_middle: 5, age_old: 5
      },
      contra_signals: { breed_maine_coon: -3, breed_ragdoll: -3 },
      tests: {
        tier1: ["Echocardiogram (dilated LV, thin walls, reduced EF <40%)","Thoracic radiograph (cardiomegaly, pulmonary edema, pleural effusion)","CBC/chemistry","Plasma taurine level"],
        tier2: ["NT-proBNP","ECG (arrhythmia — especially SVT, VT)","FeLV/FIV","Thyroid panel"],
        tier3: ["Referral: veterinary cardiologist"]
      },
      treatment: {
        medications: ["Taurine 250 mg/cat PO BID × 3–4 months (CRITICAL — dietary replacement)","Furosemide 1–2 mg/kg PO/SC BID (CHF)","Pimobendan 1.25–2.5 mg/cat PO BID (positive inotrope)","Enalapril/Benazepril 0.5 mg/kg PO SID (ACE inhibitor)","Clopidogrel 18.75 mg/cat PO SID (thromboembolism prevention)","Diltiazem 7.5 mg/cat PO TID (arrhythmia)"],
        procedures: ["Switch diet to commercially balanced cat food containing taurine","Thoracocentesis (pleural effusion)","Oxygen supplementation"],
        diet: ["Complete and balanced commercial cat food","Taurine supplementation until plasma levels normalize","Avoid vegetarian or unsupplemented homemade diets","No raw fish exclusively (thiaminase destroys taurine)"]
      },
      education: {
        monitor: ["Echocardiogram at 3 and 6 months (EF improvement expected with taurine)","Respiratory rate at home","Taurine levels at 3 months","Cardiac rhythm"],
        red_flags: ["No echocardiographic improvement at 3 months — may not be taurine-related","ATE (sudden hind limb paralysis)","CHF deterioration"],
        followup: "DRAMATIC improvement expected with taurine supplementation + diet change if taurine-related; EF should normalize in 3–6 months; lifelong taurine supplementation and appropriate diet",
        prognosis: "fair"
      }
    },

    {
      id: "rabbit_encephalitozoon",
      name: "Encephalitozoon cuniculi — Rabbit",
      species: ["rabbit"],
      category: "Exotic / Rabbit / Infectious Disease",
      signals: {
        complaints_behavioral: 8, complaints_seizures: 7, neuro_seizure: 7,
        posture_head_tilt: 8, neuro_nystagmus: 7, neuro_circling: 6,
        gait_ataxia: 7, complaints_polyuria: 5, complaints_polydipsia: 5,
        hpi_onset_subacute: 6, age_middle: 5, age_old: 6
      },
      tests: {
        tier1: ["E. cuniculi serology (IgM elevated = recent/active infection)","CBC/chemistry (renal function — E. cuniculi nephritis common)","Urinalysis (proteinuria)"],
        tier2: ["MRI brain (cerebellar/cerebral lesions)","Urine PCR (E. cuniculi spores — sheds in urine)","Blood PCR"],
        tier3: ["Referral: exotic animal specialist"]
      },
      treatment: {
        medications: ["Fenbendazole 20 mg/kg PO SID × 28 days (FIRST-LINE — kills E. cuniculi)","Prednisolone 0.5–1 mg/kg PO SID × 7–14d (reduce inflammation)","Meloxicam 0.5–1 mg/kg PO SID (pain/inflammation)","Meclizine 12.5 mg/rabbit PO SID (vestibular signs)","Metoclopramide 0.5 mg/kg SC q8h (GI motility — prevent stasis)"],
        procedures: ["Supportive nursing (padded housing to prevent injury)","Physical rehabilitation (vestibular recovery)","Nutritional support (hay, fresh greens, syringe feeding if needed)"],
        diet: ["Unlimited hay (essential — GI motility)","Fresh leafy greens","High-fiber, low-starch diet","Ensure water intake (renal disease common)"]
      },
      education: {
        monitor: ["Neurological signs (head tilt often permanent but manageable)","Renal function q3 months","Body weight","GI motility (fecal output daily)"],
        red_flags: ["Severe rolling seizures — diazepam 0.5 mg/kg IV/IM","Complete anorexia >12h — GI stasis","Renal failure","Non-ambulatory — assess quality of life"],
        followup: "Recheck at 4 weeks; fenbendazole 28-day course; head tilt often improves but may persist; annual fenbendazole prophylaxis recommended in endemic rabbitries; zoonotic potential in immunocompromised humans",
        prognosis: "fair"
      }
    },

    {
      id: "hamster_wet_tail",
      name: "Proliferative Ileitis / Wet Tail — Hamster",
      species: ["exotic"],
      category: "Exotic / Gastroenterology",
      emergency: true,
      signals: {
        complaints_diarrhea: 9, complaints_lethargy: 9, complaints_anorexia: 9,
        complaints_abdominal_distension: 7, hpi_onset_sudden: 9,
        age_young: 8, stress_event: 8
      },
      tests: {
        tier1: ["Clinical signs — watery diarrhea, wet perineum (CLINICAL DIAGNOSIS in hamster)","Physical exam (dehydration, abdominal pain)"],
        tier2: ["Fecal culture + sensitivity","CBC/chemistry"],
        tier3: ["Referral: exotic animal vet"]
      },
      treatment: {
        medications: ["Trimethoprim-sulfa 15–30 mg/kg PO BID × 7–10 days (first-line — Lawsonia intracellularis)","Enrofloxacin 5–10 mg/kg PO BID × 7 days (alternative)","Metronidazole 20 mg/kg PO BID × 5 days (anaerobic/protozoal)","SC fluid therapy (0.9% NaCl 10–20 mL/100g BW SID, warmed)"],
        procedures: ["Warm environment (28–30°C)","Syringe feeding","Fluid therapy","Isolation"],
        diet: ["Rehydration: oral electrolytes (Pedialyte diluted)","Warm watery food (porridge consistency)","Remove fresh vegetables temporarily"]
      },
      education: {
        monitor: ["Wetness around tail/perineum","Hydration (skin turgor)","Eating and drinking","Activity level"],
        red_flags: ["Complete recumbency (collapse) — often fatal in <48h","Intestinal intussusception/prolapse","Unable to keep food/water down"],
        followup: "Recheck daily — mortality rate 40–90% without treatment; stress reduction prevents recurrence; avoid sudden diet change, crowding, handling during early life",
        prognosis: "guarded"
      }
    },

    {
      id: "blood_transfusion_reaction",
      name: "Blood Transfusion Reaction",
      species: ["dog","cat"],
      category: "Emergency / Hematology",
      emergency: true,
      signals: {
        complaints_behavioral: 8, complaints_vomiting: 7, hr_high: 7,
        temp_high: 7, mm_pale: 6, complaints_dyspnea: 6,
        complaints_collapse: 6, hpi_onset_sudden: 9
      },
      tests: {
        tier1: ["Stop transfusion IMMEDIATELY","Monitor vital signs","PCV/TS — pre and post","Crossmatch (retrospective — if acute hemolytic reaction)"],
        tier2: ["CBC (free hemoglobin, hemolysis)","Chemistry","Urinalysis (hemoglobinuria — dark red urine)","Blood type confirmation"],
        tier3: []
      },
      treatment: {
        medications: ["STOP TRANSFUSION IMMEDIATELY","Diphenhydramine 2 mg/kg IM/IV (febrile/urticarial)","Dexamethasone 0.25 mg/kg IV (moderate reactions)","Epinephrine 0.01 mg/kg SC/IM (anaphylaxis)","IV fluid support (hemolytic reaction — flush kidneys)","Furosemide 1–2 mg/kg IV (preserve renal function)"],
        procedures: ["Flush IV line with saline","Maintain IV access","Monitor urine output","Blood type and crossmatch ALL future transfusions","Reintroduce transfusion at slower rate if febrile non-hemolytic reaction (if patient needs blood urgently)"],
        diet: ["NPO during acute reaction"]
      },
      education: {
        monitor: ["Vital signs q5 min during transfusion first 30 min","Urine color","Hemoglobin in plasma","Temperature","Blood pressure"],
        red_flags: ["Acute hemolytic reaction — dark urine, hemoglobinemia, collapse","Anaphylaxis — hypotension, bronchoconstriction","Transfusion-associated circulatory overload (TACO) — pulmonary edema"],
        followup: "Document reaction in record; future transfusions must be crossmatched; cats: blood type A and B — type B cats given type A blood = acute fatal hemolysis; major crossmatch mandatory",
        prognosis: "good"
      }
    },

    {
      id: "reproductive_male_intact_prostatitis",
      name: "Acute Bacterial Prostatitis",
      species: ["dog"],
      category: "Reproductive / Urology",
      emergency: true,
      signals: {
        complaints_lethargy: 7, complaints_anorexia: 7, complaints_dysuria: 7,
        abdomen_pain_moderate: 7, complaints_vomiting: 5, temp_high: 7,
        sex_male_intact: 9, age_middle: 6, age_old: 7,
        hpi_onset_sudden: 7
      },
      tests: {
        tier1: ["Physical exam (prostate — painful on rectal palpation)","Urinalysis + urine culture (bacteria)","CBC (leukocytosis, left shift — WBC >20,000)","Chemistry"],
        tier2: ["Prostatic wash + culture (bacteria — E. coli, Staphylococcus)","Abdominal ultrasound (prostate echogenicity, abscess)","Blood culture (bacteremia)"],
        tier3: []
      },
      treatment: {
        medications: ["Enrofloxacin 10 mg/kg PO SID × 4–6 weeks (FIRST-LINE — good prostatic penetration)","TMP-SMX 15 mg/kg PO BID × 4–6 weeks (alternative)","Chloramphenicol 25–50 mg/kg PO TID (good prostatic penetration — alternative)","IV antibiotics if systemic: Ampicillin-sulbactam + Enrofloxacin IV × 5–7d","IV fluid support (fever, dehydration)","Analgesics: Meloxicam 0.1 mg/kg PO SID"],
        procedures: ["Castration (definitive prevention of recurrence — strongly recommended)","Prostatic abscess: ultrasound-guided drainage or surgical marsupialisation","Anti-androgen: Osaterone acetate 0.25 mg/kg PO SID × 7d (if castration declined)"],
        diet: ["Normal diet during treatment","Adequate hydration"]
      },
      education: {
        monitor: ["Temperature","Urination quality","Urine culture recheck at 3–4 weeks","Prostate size on ultrasound","Pain resolution"],
        red_flags: ["Prostatic abscess (fluctuant prostate on palpation — surgical)","Septic shock from bacteremia","Urethral obstruction","Peritonitis from abscess rupture"],
        followup: "Urine culture recheck at 3 weeks and end of antibiotic course; castration prevents recurrence; benign prostatic hyperplasia (BPH) — concurrent in most intact males; prostatic carcinoma — less common but possible",
        prognosis: "good"
      }
    },

    {
      id: "feline_osteosarcoma",
      name: "Feline Appendicular Osteosarcoma",
      species: ["cat"],
      category: "Oncology / Orthopedics",
      signals: {
        complaints_limping: 9, gait_non_weight: 8, limbs_joint_swelling: 8,
        limbs_joint_pain: 8, complaints_swelling_mass: 7,
        hpi_onset_subacute: 6, hpi_progression_worsening: 7,
        age_old: 8, age_middle: 5
      },
      tests: {
        tier1: ["Radiography (lytic/proliferative lesion — 'sunburst' pattern)","Thoracic radiography (pulmonary metastasis)","CBC/chemistry"],
        tier2: ["CT scan (full body staging)","Regional lymph node aspirate","Biopsy (bone biopsy — open or needle)"],
        tier3: ["Referral: veterinary oncologist"]
      },
      treatment: {
        medications: ["Carboplatin 180–240 mg/m² IV q3 weeks × 4 cycles (post-amputation adjunct)","Doxorubicin (alternative chemotherapy)","Analgesics: Meloxicam 0.1 mg/kg PO SID + Buprenorphine 0.01 mg/kg q6–8h","Bisphosphonates: Pamidronate 1 mg/kg IV (bone pain management)"],
        procedures: ["Limb amputation (CURATIVE INTENT if no metastasis) — MOST CATS RECOVER WELL","Limb-sparing surgery (limited in cats)","Palliative radiation (pain relief for non-surgical)"],
        diet: ["High-quality protein diet","Anti-cancer nutritional support (high-fat, moderate protein, low carb)","Appetite stimulant if anorexic"]
      },
      education: {
        monitor: ["Post-amputation healing and adaptation","Thoracic radiograph q3 months (metastasis)","Pain management","Body weight","Activity level"],
        red_flags: ["Pathological fracture (requires urgent surgery)","Pulmonary metastasis (reduces prognosis)","Non-healing wound post-amputation"],
        followup: "Cats adapt extremely well to amputation (3-legged cats — tripods — function excellently); carboplatin post-op improves survival; median survival 12–24 months for appendicular OSA in cats (better than dogs)",
        prognosis: "fair"
      }
    },

    {
      id: "feline_lower_urinary_urolithiasis",
      name: "Feline Urolithiasis — Struvite vs Calcium Oxalate",
      species: ["cat"],
      category: "Nephrology / Urology",
      signals: {
        complaints_hematuria: 9, complaints_dysuria: 8, complaints_stranguria: 7,
        complaints_anorexia: 5, hpi_onset_subacute: 6,
        sex_male_neutered: 7, sex_female_spayed: 5,
        bcs_obese: 5, age_middle: 6, age_old: 7,
        chronic_condition_diabetes: 4
      },
      tests: {
        tier1: ["Urinalysis (crystals, hematuria, pyuria, pH)","Radiography (radio-opaque — CaOx; radiolucent — struvite)","Bladder ultrasound (urolith size, number, location)"],
        tier2: ["Urolith culture + quantitative mineral analysis (post-retrieval or voided)","CBC/chemistry","Blood pressure","Urine culture"],
        tier3: ["CT urinary tract (complete mapping)"]
      },
      treatment: {
        medications: ["STRUVITE: acidified urinary diet (Royal Canin SO, Hills s/d — dissolution) × 4–8 weeks","CALCIUM OXALATE: NO dietary dissolution — surgical or lithotripsy needed","Potassium citrate 75 mg/kg PO BID (alkalinize urine — CaOx prevention)","Prazosin 0.25–0.5 mg/cat PO BID (urethral spasm)","Antibiotics if infection: Amoxicillin-clavulanate 12.5 mg/kg PO BID × 10 days (struvite often infection-induced)"],
        procedures: ["Struvite: dietary dissolution attempt × 4 weeks, radiograph recheck","CaOx: cystotomy (surgical removal)","Voiding urohydropulsion (flush small uroliths out — specialist)","Laser lithotripsy (specialist centers)"],
        diet: ["Canned urinary diet (Royal Canin Urinary SO, Hills c/d) — lifelong after resolution","Increased water intake (wet food, fountains)","Avoid high oxalate foods (spinach, beets) — CaOx","No mineral supplements (Ca, Vit D, Vit C)"]
      },
      education: {
        monitor: ["Urinalysis + radiograph q3–6 months","Urolith dissolution (radiograph) if struvite","Recurrence signs (hematuria, dysuria)","Water intake"],
        red_flags: ["Urethral obstruction (emergency — see separate entry)","Recurrence (50% within 3 years without dietary management)","Multiple or staghorn uroliths"],
        followup: "Annual urinalysis + radiograph for urolith recurrence monitoring; struvite: dissolution in 4–8 weeks usually; CaOx: surgical; prescription urinary diet lifelong",
        prognosis: "good"
      }
    },

    {
      id: "coonhound_paralysis",
      name: "Coonhound Paralysis / Acute Polyradiculoneuritis",
      species: ["dog"],
      category: "Neurology",
      emergency: true,
      signals: {
        gait_paralysis: 9, gait_ataxia: 8, complaints_collapse: 8,
        complaints_dyspnea: 7, complaints_behavioral: 6,
        hpi_onset_subacute: 7, env_outdoor: 7,
        env_contact_stray: 5, env_endemic_area: 5
      },
      tests: {
        tier1: ["Neurological exam (ascending LMN flaccid paralysis — symmetric)","Raccoon exposure history","CSF analysis (albuminocytologic dissociation — elevated protein, normal cells)","CBC/chemistry"],
        tier2: ["EMG (diffuse denervation pattern)","Nerve conduction velocity (reduced)","Serum raccoon saliva antibody"],
        tier3: ["Referral: veterinary neurologist"]
      },
      treatment: {
        medications: ["NO specific treatment (supportive care only)","Corticosteroids NOT recommended (may worsen)","Antibiotics if aspiration pneumonia develops","Pain management if painful"],
        procedures: ["Physical rehabilitation (passive ROM, hydrotherapy)","Bladder management (express q6–8h if unable to void)","Nursing care — padded bedding, turn q2–4h (recumbent)","Nutritional support — soft food or tube feeding"],
        diet: ["Elevated feeding position (reduce aspiration)","Soft food (dysphagic patients)","High-protein diet (support muscle recovery)"]
      },
      education: {
        monitor: ["Respiratory effort (intercostal paralysis — may need ventilation)","Bladder function","Daily neurological grade","Muscle atrophy prevention"],
        red_flags: ["Respiratory failure — ventilator support needed","Severe aspiration pneumonia","Bradycardia (vagal overactivity in severe cases)"],
        followup: "Recovery in 1–3 months (may be incomplete); physical rehabilitation crucial; prevent raccoon exposure (avoid feeding/contacting raccoons); prognosis good with aggressive supportive care",
        prognosis: "fair"
      }
    },

    {
      id: "canine_juvenile_cellulitis",
      name: "Juvenile Sterile Granulomatous Dermatitis / Puppy Strangles",
      species: ["dog"],
      category: "Dermatology",
      signals: {
        complaints_skin_lesions: 9, skin_papules: 8, skin_pustules: 7,
        skin_erythema: 7, lymph_mild: 7, lymph_moderate: 8,
        complaints_lethargy: 5, complaints_anorexia: 4,
        age_puppy: 10, age_young: 7
      },
      tests: {
        tier1: ["Physical exam — facial pustules + lymphadenomegaly in puppy (CLASSIC PRESENTATION)","Skin cytology (sterile — no bacteria)","Lymph node aspirate (sterile reactive granuloma)","Bacterial culture (sterile = confirms)"],
        tier2: ["CBC/chemistry","Skin biopsy if atypical"],
        tier3: []
      },
      treatment: {
        medications: ["Prednisolone 2 mg/kg PO SID × 4–8 weeks (ESSENTIAL — immunosuppression before scarring)","Antibiotics concurrent: Amoxicillin-clavulanate 12.5 mg/kg PO BID (prevent secondary infection)","Chlorhexidine 4% antiseptic wash SID"],
        procedures: ["Warm compress SID (soften pustules)","DO NOT lance/squeeze (increases scarring risk)","E-collar to prevent self-trauma"],
        diet: ["Normal puppy diet"]
      },
      education: {
        monitor: ["Pustule/lymphadenopathy resolution","Scarring prevention (prednisolone is key — early treatment)","Side effects of steroids in young puppy"],
        red_flags: ["Failure to treat = permanent facial scarring + sinus tracts","Abscessation of lymph nodes — careful surgical drainage if fluctuant"],
        followup: "Treatment within 2 weeks of onset gives best cosmetic outcome; complete resolution in 4–8 weeks; disease is self-limiting but leaves permanent scars without treatment",
        prognosis: "good"
      }
    },

    {
      id: "alopecia_x",
      name: "Alopecia X (Growth Hormone Responsive Alopecia / CHOP)",
      species: ["dog"],
      category: "Dermatology / Endocrinology",
      signals: {
        complaints_hair_loss: 9, skin_alopecia_diffuse: 9, skin_hyperpigmentation: 7,
        skin_poor_coat: 8, hpi_onset_chronic: 8,
        breed_pomeranian: 9, breed_chow_chow: 7, breed_keeshond: 7,
        breed_siberian_husky: 6, age_middle: 7, sex_male_neutered: 6
      },
      contra_signals: { skin_pruritus: -4, temp_high: -3 },
      tests: {
        tier1: ["Skin biopsy (telogen arrest, hyper-tricholemmal keratinization)","Endocrine panel (thyroid, adrenal — EXCLUDE BEFORE DIAGNOSIS)","CBC/chemistry"],
        tier2: ["Low-dose dexamethasone suppression test","ACTH stim (rule out HAC)","GH-stimulation test (rarely available)","Sex hormone panel (adrenal sex hormones)"],
        tier3: ["Referral: veterinary dermatologist/endocrinologist"]
      },
      treatment: {
        medications: ["Melatonin 3–6 mg PO q8–12h (first-line — stimulates hair growth in ~50%)","Trilostane 2–5 mg/kg PO BID if elevated 17-hydroxyprogesterone (adrenal sex hormone)","Castration/spay (intact animals — may trigger regrowth)","Methyltestosterone NOT recommended (hepatotoxicity)"],
        procedures: ["Neutering (most effective in intact animals)"],
        diet: ["Normal balanced diet","Omega-3 supplementation"]
      },
      education: {
        monitor: ["Hair regrowth response","Skin hyperpigmentation","New alopecia areas","Endocrine screening at 6 months (repeat)"],
        red_flags: ["Systemic signs developing — reconsider endocrine disease","Non-response to melatonin at 3 months","Pruritus developing — new diagnosis (allergy)"],
        followup: "Recheck at 3 months; melatonin trial × 3 months — assess regrowth; castration/spay most effective; cosmetic condition — quality of life unaffected; recurrence after regrowth common",
        prognosis: "fair"
      }
    },

    {
      id: "canine_parvovirus_strain_2c",
      name: "Canine Parvovirus (Variant 2c) Enteritis",
      species: ["dog"],
      category: "Infectious Disease",
      emergency: true,
      signals: {
        complaints_vomiting: 9, complaints_diarrhea: 9, complaints_lethargy: 9,
        complaints_anorexia: 9, temp_high: 7, temp_low: 5,
        mm_pale: 7, hydration_moderate: 7, hydration_severe: 8,
        attitude_obtunded: 6, attitude_dull: 7,
        age_puppy: 10, age_young: 8,
        vaccine_never: 9, vaccine_overdue: 7, vaccine_partial: 6,
        env_kennel: 7, env_contact_stray: 7
      },
      tests: {
        tier1: ["CPV SNAP test (fecal antigen — highly sensitive)","CBC — leukopenia/neutropenia (HALLMARK — <3000 WBC/μL)","PCV/TS"],
        tier2: ["CPV2c PCR (differentiates variants)","Chemistry panel","Electrolytes (K, Na — hypokalemia common)"],
        tier3: []
      },
      treatment: {
        medications: ["IV fluid resuscitation — LRS or Normosol at shock then maintenance rates","Antibiotics: Ampicillin 22 mg/kg IV TID + Enrofloxacin 5–10 mg/kg IV SID (NOT in puppies <8 weeks)","Maropitant 1 mg/kg SC SID (antiemetic — reduces vomiting, saves protein)","Ondansetron 0.5 mg/kg IV TID (alternative antiemetic)","Dextrose supplementation q4–6h (hypoglycemia in puppies)","Whole blood or colloid if albumin <20 g/L or PCV <20%","Oseltamivir (Tamiflu) 2 mg/kg PO BID (experimental — some evidence in severe parvovirus)"],
        procedures: ["Strict isolation (CPV survives 1 year in soil — bleach 1:32 disinfection)","Nutritional support early (NE tube — significantly improves survival)","Begin feeding within 12h (even if vomiting — small amounts via NE tube)","Thermal support (puppies)"],
        diet: ["NPO if severe vomiting","NE tube feeding (2 mL/kg/h if not vomiting)","Hydrolyzed or elemental diet","High-calorie recovery food when eating voluntarily"]
      },
      education: {
        monitor: ["CBC daily (neutrophil recovery = turning point)","Temperature q4–6h","Vomiting frequency","Hematochezia severity","Blood glucose q4–6h (puppies)"],
        red_flags: ["WBC <500/μL (severe immunosuppression)","Septicemia (fever + bradycardia)","Hemorrhagic diarrhea + collapse","Intussusception (complication)"],
        followup: "Hospitalize until eating and WBC recovering; isolation for 6 weeks post-discharge; CPV2c more virulent than CPV2b — booster with 2c-containing vaccine if available; VACCINATION PREVENTION critical",
        prognosis: "guarded"
      }
    },

    {
      id: "staphylococcal_scalded_skin",
      name: "Exfoliative Toxicosis / Staphylococcal Scalded Skin Syndrome — Dogs",
      species: ["dog"],
      category: "Dermatology / Infectious Disease",
      emergency: true,
      signals: {
        complaints_skin_lesions: 9, skin_erythema: 9, skin_alopecia_diffuse: 8,
        skin_crusts: 8, temp_high: 7, attitude_dull: 6,
        complaints_lethargy: 7, complaints_anorexia: 6,
        hpi_onset_sudden: 7, age_puppy: 6, age_young: 5
      },
      tests: {
        tier1: ["Skin cytology (cocci — Staphylococcus)","Bacterial culture and sensitivity","CBC (leukocytosis)","Chemistry"],
        tier2: ["Blood culture (bacteremia)","Skin biopsy (acantholytic — sub-corneal split)"],
        tier3: []
      },
      treatment: {
        medications: ["Systemic antibiotics: Clindamycin 11 mg/kg PO BID × 4 weeks","OR Cephalexin 22 mg/kg PO BID × 4 weeks","Severe/hospitalized: Oxacillin 22 mg/kg IV TID (MSSA) or Vancomycin (MRSA — per C&S)","Chlorhexidine 4% shampoo SID (gentle — skin fragile)","Analgesics: Meloxicam 0.1 mg/kg PO SID"],
        procedures: ["Sterile wound care — saline irrigation","Cool environment (skin heat-sensitive)","E-collar — prevent self-trauma","Fluid and nutritional support"],
        diet: ["Supportive nutritious diet","Assisted feeding if anorexic"]
      },
      education: {
        monitor: ["Skin sloughing resolution","Temperature","CBC weekly","Culture sensitivity (MRSA risk)","Nutritional status"],
        red_flags: ["MRSA — contact isolation, notify owner of zoonotic risk","Septic shock from toxemia","Non-response in 5 days — reassess culture + sensitivity"],
        followup: "Recheck culture at 4 weeks; complete antibiotic course; skin healing 3–6 weeks; MRSA: contact veterinary public health; owner hand hygiene important",
        prognosis: "fair"
      }
    },


    // ═══════════════════════════ BATCH 6 — FINAL 41 CONDITIONS ══════════════

    {
      id: "infectious_tracheobronchitis",
      name: "Canine Infectious Respiratory Disease Complex (CIRDC / Kennel Cough)",
      species: ["dog"],
      category: "Respiratory / Infectious Disease",
      signals: {
        complaints_coughing: 10, complaints_sneezing: 6, complaints_nasal_discharge: 6,
        nose_serous_discharge: 6, temp_high: 5, complaints_lethargy: 5,
        env_kennel: 9, env_contact_other_pets: 8,
        vaccine_overdue: 6, hpi_onset_subacute: 7
      },
      tests: {
        tier1: ["Clinical exam (harsh goose-honk cough, easily elicited by tracheal palpation)","Tracheal palpation (cough easily inducible)","CBC/chemistry (mild — rule out systemic)"],
        tier2: ["PCR panel oropharyngeal swab (Bordetella bronchiseptica, CIV, CAV-2, CDV)","Thoracic radiograph (uncomplicated — normal; pneumonia — bronchointerstitial)"],
        tier3: []
      },
      treatment: {
        medications: ["Doxycycline 5 mg/kg PO BID × 7–10 days (Bordetella)","Amoxicillin-clavulanate 12.5 mg/kg PO BID × 7d (alternative)","Butorphanol 0.05–0.1 mg/kg PO BID-TID (cough suppressant — productive cough: avoid)","Meloxicam 0.1 mg/kg PO SID (fever/inflammation)"],
        procedures: ["Rest — no exercise × 7–10 days","Isolation from other dogs","Humidified environment","Vaccination (intranasal Bordetella)"],
        diet: ["Normal diet","Warm soft food if coughing interferes with eating"]
      },
      education: {
        monitor: ["Cough severity","Appetite","Temperature","Productive cough / pneumonia signs"],
        red_flags: ["Productive cough with mucopurulent sputum","Dyspnea","Temperature >40°C","Systemic signs — complicated CIRDC / pneumonia"],
        followup: "Most uncomplicated cases resolve in 7–14 days; vaccination before boarding strongly recommended; intranasal Bordetella × 72h before exposure preferred",
        prognosis: "excellent"
      }
    },

    {
      id: "sarcoptic_mange_cat",
      name: "Notoedric Mange (Feline Sarcoptic Mange / Cat Scabies)",
      species: ["cat"],
      category: "Dermatology / Parasitology",
      signals: {
        complaints_skin_lesions: 9, skin_pruritus: 10, skin_crusts: 9,
        skin_erythema: 7, skin_alopecia_focal: 7, complaints_behavioral: 8,
        env_outdoor: 7, env_contact_stray: 8, hpi_onset_subacute: 7,
        parasites_mites: 8
      },
      tests: {
        tier1: ["Deep skin scraping (Notoedres cati — smaller than Sarcoptes — round shape)","Wood's lamp (negative — rule out dermatophyte)","Tape prep"],
        tier2: ["Skin biopsy if scrapings negative","Fungal culture"],
        tier3: []
      },
      treatment: {
        medications: ["Selamectin (Revolution) 6–12 mg/kg topical spot-on q2 weeks × 3 treatments","Ivermectin 0.2–0.3 mg/kg SC q2 weeks × 3 (OFF-LABEL in cats — use with caution)","Moxidectin 0.1 mg/kg topical (Advocate/Advantage Multi) q2 weeks × 3","Lime sulfur dip 2% weekly × 4–6 weeks (safe alternative)","Prednisolone 0.5 mg/kg PO SID × 5–7 days (anti-pruritic while awaiting treatment effect)"],
        procedures: ["Treat ALL in-contact cats simultaneously","Clip hair around lesions","Environment decontamination","Treat bedding + grooming tools"],
        diet: ["Normal complete cat diet"]
      },
      education: {
        monitor: ["Pruritus reduction (within 2–3 weeks of treatment)","Skin healing","Environmental re-exposure","New lesion formation"],
        red_flags: ["Spreading to owner's skin (Notoedres — zoonotic — causes transient pruritic lesions in humans)","Secondary bacterial pyoderma","Non-response to 3 selamectin treatments"],
        followup: "Recheck scraping at 6 weeks; treat all cats in household; Notoedres self-limiting in humans but notify owner of transient itch risk",
        prognosis: "excellent"
      }
    },

    {
      id: "canine_distemper_neurological",
      name: "Canine Distemper — Neurological Phase",
      species: ["dog"],
      category: "Infectious Disease / Neurology",
      emergency: true,
      signals: {
        complaints_seizures: 9, neuro_seizure: 9, neuro_nystagmus: 7,
        neuro_circling: 6, gait_ataxia: 7, complaints_behavioral: 8,
        complaints_lethargy: 8, complaints_nasal_discharge: 7, temp_high: 7,
        vaccine_never: 9, vaccine_overdue: 7,
        age_puppy: 8, age_young: 7
      },
      tests: {
        tier1: ["CBC (lymphopenia, thrombocytopenia)","CDV antigen SNAP/IFA","CSF analysis (CDV PCR — lymphocytic pleocytosis)"],
        tier2: ["MRI brain (demyelinating lesions)","CDV inclusion body stain (conjunctival/skin cytology)","Serology (titer > 1:100 supportive)"],
        tier3: []
      },
      treatment: {
        medications: ["No specific antiviral for CDV","Supportive: IV fluids, antibiotics (secondary bacterial)","Phenobarbital 2.5–5 mg/kg PO BID (seizure control)","Levetiracetam 20 mg/kg PO TID (alternative AED)","Prednisone 0.5 mg/kg PO SID (CNS inflammation — use cautiously in active viral phase)","N-acetylcysteine (antioxidant — neuroprotection)"],
        procedures: ["Strict isolation","Nutritional support","Nursing care"],
        diet: ["Highly digestible supportive diet"]
      },
      education: {
        monitor: ["Seizure frequency and type","Neurological progression","Body temperature","Vaccination status of contacts"],
        red_flags: ["Myoclonus (rhythmic twitching) — hallmark of chronic CDV encephalitis — poor prognosis","Status epilepticus","Progressive demyelination"],
        followup: "Myoclonus = permanent neurological damage — poor prognosis for recovery; VACCINATION critical prevention; CDV still prevalent in unvaccinated populations globally",
        prognosis: "guarded"
      }
    },

    {
      id: "retinal_detachment",
      name: "Retinal Detachment",
      species: ["dog","cat"],
      category: "Ophthalmology",
      emergency: true,
      signals: {
        complaints_behavioral: 9, complaints_eye_discharge: 5,
        age_old: 7, age_middle: 5,
        complaints_polyuria: 4, complaints_polydipsia: 4,
        hpi_onset_sudden: 8
      },
      tests: {
        tier1: ["Ophthalmic exam (absent menace response, PLR loss)","Fundoscopy (detached retina)","IOP measurement","Blood pressure (hypertension — MOST COMMON CAUSE in cats)"],
        tier2: ["Echocardiogram (HCM)","CBC/chemistry (renal disease — hypertension)","Ocular ultrasound","FeLV/FIV"],
        tier3: ["Referral: veterinary ophthalmologist (surgical reattachment)"]
      },
      treatment: {
        medications: ["Amlodipine 0.625–1.25 mg/cat PO SID (hypertension — most common cause in cats)","Enalapril 0.5 mg/kg PO SID (RAAS — additional BP control)","Prednisolone acetate 1% ophthalmic drops TID (uveitis-related)","Treat underlying disease (lymphoma, FIP — immunosuppression)"],
        procedures: ["Emergency BP control (hypertension-induced: may reattach if treated within hours)","Surgical reattachment (optic nerve still functional — specialist)","Laser retinopexy (selected cases)"],
        diet: ["Low-sodium diet if hypertensive","Renal diet if CKD-associated"]
      },
      education: {
        monitor: ["Blood pressure q2 weeks during treatment","Vision return (possible if BP treated early)","IOP (glaucoma risk post-detachment)","Bilateral vs unilateral involvement"],
        red_flags: ["Both eyes affected — complete blindness","BP >200 mmHg — hypertensive crisis","Exudative detachment from infiltrate (lymphoma)"],
        followup: "Emergency ophthalmology referral; hypertensive cats: BP to <160 mmHg within 24–48h; vision may not return even with BP control — set realistic expectations; recheck BP weekly until stable",
        prognosis: "guarded"
      }
    },

    {
      id: "panophthalmitis",
      name: "Panophthalmitis / Endophthalmitis",
      species: ["dog","cat"],
      category: "Ophthalmology",
      emergency: true,
      signals: {
        complaints_eye_discharge: 9, eyes_discharge_mucopurulent: 9,
        eyes_conjunctival_hyperemia: 9, complaints_behavioral: 8,
        complaints_lethargy: 5, temp_high: 5,
        hpi_onset_sudden: 7, complaints_trauma: 5
      },
      tests: {
        tier1: ["Ophthalmic exam — cloudy cornea, hypopyon (pus in AC), pain","IOP measurement","Fluorescein stain","CBC/chemistry"],
        tier2: ["Culture + sensitivity (aqueous humor)","Ocular ultrasound","CT head (retrobulbar extension)"],
        tier3: ["Referral: veterinary ophthalmologist"]
      },
      treatment: {
        medications: ["Topical broad-spectrum antibiotic: Tobramycin 0.3% q2–4h","Systemic antibiotics: Enrofloxacin 10 mg/kg PO SID + Clindamycin 11 mg/kg PO BID","Topical atropine 1% BID (uveitis/cycloplesia)","Pain: Meloxicam 0.1 mg/kg PO SID","AVOID topical steroids (concurrent corneal ulcer common)"],
        procedures: ["Enucleation (severe, irreversible — best long-term outcome for pain)","Intravitreal antibiotic injection (early stage — specialist)"],
        diet: ["Normal diet"]
      },
      education: {
        monitor: ["Pain level (eye)","Globe integrity","IOP","Systemic spread (fever)"],
        red_flags: ["Globe rupture — emergency enucleation","Orbital cellulitis extension","Non-responsive to 48h aggressive antibiotic"],
        followup: "Aggressive treatment within 24h; enucleation often the most humane outcome in severe cases; patients do very well post-enucleation; pain relief is primary concern",
        prognosis: "guarded"
      }
    },

    {
      id: "proliferative_thrombovascular_necrosis",
      name: "Proliferative Thrombovascular Necrosis of Pinnae (Vasculitis of Ear Tips)",
      species: ["dog"],
      category: "Dermatology / Vascular",
      signals: {
        complaints_skin_lesions: 8, skin_erythema: 7, skin_crusts: 8,
        complaints_bleeding: 5, complaints_behavioral: 5,
        hpi_onset_subacute: 6, hpi_progression_worsening: 6,
        age_middle: 5, breed_dachshund: 6
      },
      tests: {
        tier1: ["Skin biopsy — thrombovascular necrosis at dermal vessels (DIAGNOSTIC)","CBC/chemistry","Blood pressure"],
        tier2: ["ANA titer","Coagulation panel","Drug history (drug-induced vasculitis)"],
        tier3: ["Referral: veterinary dermatologist"]
      },
      treatment: {
        medications: ["Pentoxifylline 25 mg/kg PO BID (improve microvascular flow — first-line)","Vitamin E 400 IU PO BID (antioxidant)","Prednisolone 0.5–1 mg/kg PO SID × 4 weeks (moderate-severe)","Tetracycline + niacinamide (alternative anti-inflammatory)","Doxycycline 5 mg/kg PO BID × 4 weeks (Rocky Mountain Spotted Fever rule-out)"],
        procedures: ["Bandage/wrap ear tips (prevent trauma)","Warm environment","Identify and remove drug triggers"],
        diet: ["Omega-3 supplementation (vascular support)"]
      },
      education: {
        monitor: ["Ear tip necrosis extent","Bleeding episodes","Pain","Treatment response (pentoxifylline — 4–8 weeks)"],
        red_flags: ["Progressive necrosis to full ear pinna — surgical amputation of ear tips","Non-response to pentoxifylline + Vit E"],
        followup: "Recheck at 6–8 weeks; pentoxifylline continued long-term; ear tip amputation if necrosis non-reversible but skin healing — prevents recurrent trauma",
        prognosis: "fair"
      }
    },

    {
      id: "feline_hyperkalemia",
      name: "Hyperkalemia — Feline Emergency",
      species: ["cat"],
      category: "Emergency / Internal Medicine",
      emergency: true,
      signals: {
        hr_low: 9, cardiac_arrhythmia: 9, complaints_collapse: 8,
        complaints_lethargy: 8, attitude_obtunded: 7,
        complaints_dysuria: 7, bladder_distension: 7,
        hpi_onset_sudden: 8
      },
      tests: {
        tier1: ["Serum potassium (>6.5 mEq/L SIGNIFICANT; >8 mEq/L CRITICAL)","ECG (tall T waves, wide QRS, absent P waves, sine wave)","Urinalysis + bladder assessment"],
        tier2: ["CBC/chemistry","Cortisol/ACTH stim (rule out Addison's)","Blood gas"],
        tier3: []
      },
      treatment: {
        medications: ["Calcium gluconate 10% 50–100 mg/kg IV SLOW over 10 min with ECG monitoring (cardiac membrane stabilization — IMMEDIATE)","Dextrose 50% 1–2 mL/kg IV (shift K intracellularly)","Regular insulin 0.1–0.25 U/kg IV + dextrose (shift K)","Sodium bicarbonate 1–2 mEq/kg IV (metabolic acidosis)","IV 0.9% NaCl (NOT LRS — contains K) — promote K excretion","Relieve urethral obstruction (most common cause in cats)"],
        procedures: ["ECG monitoring throughout","Urethral catheterization (if obstruction)","K reassessment q1–2h","AVOID LRS and K-containing fluids"],
        diet: ["K-restricted diet long-term"]
      },
      education: {
        monitor: ["Serum K hourly during treatment","ECG","HR","Blood pressure","Urine output"],
        red_flags: ["VF (ventricular fibrillation)","No response to calcium gluconate — escalate treatment","K >9 mEq/L — CPR risk"],
        followup: "K recheck 2–4h post-treatment; urethral obstruction is most common cause in cats; address primary cause; monitor for rebound hyperkalemia",
        prognosis: "fair"
      }
    },

    {
      id: "hypoglycemia_neonatal",
      name: "Neonatal Hypoglycemia",
      species: ["dog","cat"],
      category: "Emergency / Neonatology",
      emergency: true,
      signals: {
        complaints_behavioral: 9, complaints_lethargy: 9, complaints_seizures: 8,
        neuro_seizure: 8, neuro_disoriented: 7, attitude_obtunded: 8,
        temp_low: 7, age_puppy: 10, age_kitten: 10,
        bcs_thin: 7, hpi_onset_sudden: 8
      },
      tests: {
        tier1: ["Blood glucose (STAT) — <3 mmol/L (<55 mg/dL) diagnostic","PCV/TS","Temperature"],
        tier2: ["CBC/chemistry","Serum insulin (insulinoma — older animals)"],
        tier3: []
      },
      treatment: {
        medications: ["EMERGENCY: Dextrose 50% diluted to 5–10% — 1–2 mL/kg IV slow OR rub 50% dextrose on gums","IV dextrose infusion 2.5–5% in saline — maintenance","Glucagon 0.02 mg/kg IM (emergency if no IV access)","Thermal support (warm environment 28–32°C)"],
        procedures: ["Ensure nursing or bottle feed (milk replacer)","IV catheter placement","Blood glucose q30 min until stable","Correct hypothermia (warm before glucose — cold puppy cannot metabolize glucose properly)"],
        diet: ["Frequent nursing or bottle feeding q2h","Kitten/puppy milk replacer if maternal milk absent","Whelp Milk Replacer or KMR"]
      },
      education: {
        monitor: ["Blood glucose q1–2h initially","Body temperature","Nursing success","Body weight (daily)"],
        red_flags: ["Continued seizures despite correction — check other causes","Temperature <35°C — hypothermia + hypoglycemia synergistic","Failure to gain weight — inadequate nutrition"],
        followup: "BG stable: recheck q4h × 24h; investigate cause (inadequate milk supply, infection, congenital); most puppies/kittens recover fully; identify and address underlying cause",
        prognosis: "good"
      }
    },

    {
      id: "corneal_sequestrum_cat",
      name: "Corneal Sequestrum — Feline",
      species: ["cat"],
      category: "Ophthalmology",
      signals: {
        complaints_eye_discharge: 8, eyes_discharge_mucopurulent: 7,
        eyes_conjunctival_hyperemia: 8, complaints_behavioral: 7,
        hpi_onset_chronic: 7, hpi_progression_worsening: 5,
        breed_persian: 9, breed_himalayan: 8, breed_siamese: 5,
        breed_burmese: 6, age_middle: 5, age_young: 5
      },
      tests: {
        tier1: ["Ophthalmic exam — dark brown/black corneal plaque (DIAGNOSTIC)","Fluorescein stain (surrounding ulceration)","Schirmer tear test"],
        tier2: ["Culture of sequestrum (concurrent infection)","IOP measurement"],
        tier3: ["Referral: veterinary ophthalmologist for keratectomy"]
      },
      treatment: {
        medications: ["FHV-1 treatment: Famciclovir 40 mg/kg PO BID × 3 weeks (if FHV-1 associated)","Tobramycin 0.3% ophthalmic drops TID (infection)","Artificial tears q4–6h (dry eye management)","Cyclosporine 0.2% ophthalmic ointment BID (KCS — dry eye cause)"],
        procedures: ["Superficial keratectomy (DEFINITIVE — surgical removal of sequestrum)","Conjunctival graft post-keratectomy","Post-surgical corneal healing with tobramycin/lubricants"],
        diet: ["L-lysine 250 mg SID (FHV-1 suppression — limited evidence but commonly used)"]
      },
      education: {
        monitor: ["Plaque size and depth","Corneal vascularization (healing)","Post-surgical granulation","Recurrence (common in predisposed breeds)"],
        red_flags: ["Deep plaque approaching Descemet's membrane — urgent keratectomy","Corneal perforation risk","Progressive plaque expansion"],
        followup: "Recheck every 4 weeks; surgical keratectomy recommended over waiting (may spontaneously slough but takes months + risk of perforation); FHV-1 control reduces recurrence",
        prognosis: "good"
      }
    },

    {
      id: "inflammatory_myopathy",
      name: "Masticatory Muscle Myositis (MMM) / Polymyositis",
      species: ["dog"],
      category: "Neurology / Immunology",
      signals: {
        complaints_behavioral: 8, complaints_anorexia: 8, complaints_dysphagia: 8,
        complaints_lethargy: 6, limbs_muscle_atrophy: 7,
        temp_high: 5, hpi_onset_subacute: 6,
        breed_golden: 5, breed_labrador: 4, breed_german_shepherd: 4
      },
      tests: {
        tier1: ["2M antibody titer (anti-masticatory muscle antibody — DIAGNOSTIC for MMM >1:100)","CBC/chemistry","CK (creatine kinase — elevated in myositis)"],
        tier2: ["EMG (masticatory / limb muscles)","Masticatory muscle biopsy (type 2M fiber infiltration)","MRI masticatory muscles (edema)"],
        tier3: ["Referral: veterinary neurologist"]
      },
      treatment: {
        medications: ["Prednisolone 2 mg/kg PO SID × 4–6 weeks then gradual taper over 6 months (cornerstone)","Azathioprine 2 mg/kg PO SID (steroid-sparing adjunct)","Mycophenolate 10–20 mg/kg PO BID (refractory)"],
        procedures: ["Forced jaw opening under anesthesia (severe trismus — fibrosis)","Gradual physical therapy (jaw exercises)","Pain management during acute phase"],
        diet: ["Soft food or gruel consistency","Elevated food/water bowl","High-protein to offset steroid catabolism"]
      },
      education: {
        monitor: ["Jaw opening ability (normal >4 cm)","CBC q2–4 weeks (azathioprine)","CK trends","Steroid side effects (PU/PD, weight gain)","2M titer at 3 months (decreasing = responding)"],
        red_flags: ["Complete trismus with inability to open mouth — emergency jaw force-opening under GA","Non-response to 4 weeks prednisolone","Aspiration pneumonia (dysphagia)"],
        followup: "Minimum 6 months prednisolone taper; 2M titer recheck q3 months; some dogs relapse on dose reduction; permanent trismus if fibrosis develops before treatment",
        prognosis: "fair"
      }
    },

    {
      id: "protein_energy_malnutrition",
      name: "Protein-Energy Malnutrition / Cachexia",
      species: ["dog","cat"],
      category: "Nutritional",
      signals: {
        bcs_thin: 10, complaints_weight_loss: 9, complaints_lethargy: 7,
        complaints_anorexia: 7, skin_poor_coat: 7,
        limbs_muscle_atrophy: 8, mm_pale: 5,
        hpi_onset_chronic: 7, hpi_progression_worsening: 6
      },
      tests: {
        tier1: ["CBC (lymphopenia, mild anemia)","Chemistry (hypoalbuminemia, low BUN, low cholesterol)","Urinalysis","Body condition score"],
        tier2: ["Identify underlying disease (cancer cachexia, CKD, CHF, IBD)","Serum cobalamin and folate (GI malabsorption)","Thyroid panel (hyperthyroidism cat)"],
        tier3: []
      },
      treatment: {
        medications: ["Mirtazapine 1.88 mg/cat q48h or 3.75 mg/dog PO SID (appetite stimulant)","Cyproheptadine 1–2 mg/cat PO BID (appetite stimulant)","Cobalamin SC (if deficient)","Treat underlying disease"],
        procedures: ["Esophagostomy/nasogastric tube (if not eating voluntarily)","Calculate resting energy requirement (RER): 70 × BW(kg)^0.75","Begin at 1/3 RER day 1, 2/3 day 2, full RER day 3 (REFEEDING PROTOCOL — prevent refeeding syndrome)","Phosphorus monitoring (refeeding syndrome)"],
        diet: ["Highly digestible, energy-dense diet","Caloric density: 4–5 kcal/g","Omega-3 fatty acids + EPA (muscle preservation in cancer cachexia)","Small frequent meals","Hill's n/d (cancer cachexia) or equivalent","Avoid dietary restriction — goal is anabolism"]
      },
      education: {
        monitor: ["Body weight weekly","BCS q2 weeks","Phosphorus and potassium (refeeding syndrome — days 1–3)","Serum albumin","Primary disease monitoring"],
        red_flags: ["Refeeding syndrome (K, Phos drops rapidly on feeding restart — monitor!)","Aspiration pneumonia (tube feeding)","Persistent non-eating — investigate primary disease","Ascites developing (severe hypoalbuminemia)"],
        followup: "Weight recheck weekly; target 1–2% body weight gain per week; address primary cause essential; nutritional support bridges gap during disease treatment",
        prognosis: "guarded"
      }
    },

    {
      id: "splenomegaly_reactive",
      name: "Reactive Splenomegaly / Splenic Congestion",
      species: ["dog","cat"],
      category: "Hematology / Gastroenterology",
      signals: {
        complaints_abdominal_distension: 7, spleen_splenomegaly: 9,
        complaints_lethargy: 6, complaints_anorexia: 5,
        abdomen_pain_mild: 4, hpi_onset_chronic: 6,
        age_middle: 5, age_old: 6
      },
      tests: {
        tier1: ["Abdominal ultrasound (splenic size, architecture, nodules)","CBC (thrombocytopenia? anemia?)","Chemistry","PCV/TS"],
        tier2: ["FNA of spleen (cytology — EMH vs lymphoma vs hemangioma)","Thoracic radiograph (metastasis)","CT abdomen (if mass)","Tick-borne panel (Ehrlichia, Babesia)"],
        tier3: ["Referral: internist/oncologist","Histopathology (splenectomy specimen)"]
      },
      treatment: {
        medications: ["Treat underlying cause (doxycycline for Ehrlichia; prednisolone for immune-mediated; treat CHF)","NSAIDs: Meloxicam 0.1 mg/kg PO SID (pain/inflammation)"],
        procedures: ["Splenectomy (hemangiosarcoma, torsion, idiopathic splenic congestion unresponsive)","Avoid unnecessary splenectomy — rule out treatable causes first"],
        diet: ["Specific to underlying cause"]
      },
      education: {
        monitor: ["Splenic size on ultrasound","CBC for cell line changes","Sudden hemoabdomen signs (splenic rupture)","Ruptured hemangiosarcoma risk"],
        red_flags: ["Acute abdomen with splenomegaly — ruptured hemangiosarcoma (EMERGENCY)","Splenic mass + pale mucous membranes","Rapid increase in size"],
        followup: "Ultrasound recheck 4–6 weeks; FNA for cytology guides treatment; do not assume non-neoplastic without cytology/histopath",
        prognosis: "fair"
      }
    },

    {
      id: "iris_melanoma_cat",
      name: "Diffuse Iris Melanoma — Feline",
      species: ["cat"],
      category: "Ophthalmology / Oncology",
      signals: {
        complaints_behavioral: 5, complaints_eye_discharge: 4,
        age_old: 8, age_middle: 6,
        hpi_onset_chronic: 7, hpi_progression_worsening: 6
      },
      tests: {
        tier1: ["Slit-lamp biomicroscopy (iris pigment changes — raised lesion vs flat)","IOP measurement (secondary glaucoma)","Ocular ultrasound"],
        tier2: ["Histopathology post-enucleation","CBC/chemistry","Thoracic radiograph (metastasis)"],
        tier3: ["Referral: veterinary ophthalmologist"]
      },
      treatment: {
        medications: ["No medical treatment changes tumor progression","Manage secondary glaucoma if present: Dorzolamide/timolol drops TID","Analgesics if glaucoma-related pain"],
        procedures: ["WATCHFUL WAITING (flat, non-raised lesions — monitor for progression)","Enucleation (raised, expanding lesion — BEFORE glaucoma develops for best prognosis)","Histopathology after enucleation (grade tumor)"],
        diet: ["Normal cat diet"]
      },
      education: {
        monitor: ["Monthly photo documentation of iris pigment","IOP q3–6 months","Lesion elevation and growth","Thoracic metastasis (q6 months)"],
        red_flags: ["Raised pigmented lesion — enucleation recommended","Secondary glaucoma — pain, buphthalmos","Metastasis (20–60% — variable)"],
        followup: "Ophthalmology recheck q2–3 months; enucleate before secondary glaucoma for best outcomes; post-enucleation: thoracic radiograph q6 months × 2 years; low-grade: years; high-grade: months",
        prognosis: "guarded"
      }
    },

    {
      id: "stomatitis_dog",
      name: "Canine Ulcerative Stomatitis / Immune-Mediated Stomatitis",
      species: ["dog"],
      category: "Dental / Oral / Immunology",
      signals: {
        complaints_anorexia: 8, complaints_behavioral: 8, complaints_weight_loss: 6,
        complaints_dysphagia: 7, complaints_drooling: 7,
        age_middle: 5, age_old: 6,
        breed_maltese: 6, breed_cocker: 5, breed_labrador: 4,
        hpi_onset_subacute: 5, hpi_progression_worsening: 5
      },
      tests: {
        tier1: ["Oral exam under sedation (ulceration — 'kissing lesions' contact mucosa to tooth)","CBC/chemistry","Oral biopsy (plasma cell infiltrate)"],
        tier2: ["ANA titer","Bacterial culture","FCV/FHV PCR (if cat — different condition)","Dental radiographs"],
        tier3: ["Referral: veterinary dentist/internist"]
      },
      treatment: {
        medications: ["Cyclosporine 5 mg/kg PO SID × 8–12 weeks (immunomodulatory — good response)","Prednisolone 1–2 mg/kg PO SID × 4 weeks then taper","Azathioprine 2 mg/kg PO SID (steroid-sparing adjunct)","Chlorhexidine 0.12% rinse or gel BID","Doxycycline 5 mg/kg PO BID × 4 weeks (antibacterial/immunomodulatory)","Pain: Tramadol 2–5 mg/kg PO BID-TID"],
        procedures: ["COHAT — professional cleaning under GA","Teeth extractions (if periodontal disease concurrent or refractory)","Chlorhexidine gel application post-cleaning"],
        diet: ["Soft or slurry food (pain reduces eating)","Elevated bowl","Tube feeding if severely anorexic"]
      },
      education: {
        monitor: ["Lesion healing (4–6 weeks)","Eating behavior","CBC (immunosuppression)","Oral hygiene compliance"],
        red_flags: ["Spreading ulceration","Non-response to cyclosporine × 6 weeks","Systemic signs of immunosuppression"],
        followup: "Recheck oral exam every 4 weeks; cyclosporine minimum 8–12 weeks; COHAT improves outcome; recurrence common on stopping medication",
        prognosis: "fair"
      }
    },

    {
      id: "otitis_media_interna",
      name: "Otitis Media / Interna",
      species: ["dog","cat"],
      category: "Neurology / Ears",
      signals: {
        complaints_ear_problems: 9, ears_discharge_brown: 7, ears_erythema: 7,
        posture_head_tilt: 8, neuro_nystagmus: 7, neuro_circling: 6,
        complaints_behavioral: 7, hpi_onset_subacute: 6,
        breed_cocker: 6, breed_poodle: 5
      },
      tests: {
        tier1: ["Otoscopy (tympanic membrane status)","Neurological exam","CBC/chemistry","Skull radiography (tympanic bulla)"],
        tier2: ["CT skull (SUPERIOR — bulla fluid, osteolysis)","Bulla cytology + culture (myringotomy)","MRI (inner ear/brain involvement)"],
        tier3: ["Referral: veterinary neurologist/otologist"]
      },
      treatment: {
        medications: ["Systemic antibiotics × 6–8 weeks guided by bulla culture","Amoxicillin-clavulanate 12.5 mg/kg PO BID (empirical)","Fluoroquinolone (Pseudomonas — guided by C&S)","Prednisolone 0.5 mg/kg PO SID × 3–5 days (acute vestibular inflammation — reduce edema)","Meclizine 12.5–25 mg/dog PO SID (vestibular motion sickness)"],
        procedures: ["Myringotomy (drain bulla — diagnostic and therapeutic)","Bulla osteotomy (TPLO / ventral bulla osteotomy) — refractory or destructive otitis media","Deep ear lavage under GA","Video otoscopy guided treatment"],
        diet: ["Normal diet","Elevated bowl if head tilt causes difficulty eating"]
      },
      education: {
        monitor: ["Head tilt and nystagmus resolution","Hearing assessment","Ear culture response","CT reassessment at 6–8 weeks"],
        red_flags: ["Worsening neurological signs (ascending — CNS encephalitis)","Facial nerve paralysis (CN7 involvement)","Horner's syndrome (sympathetic nerve compression in bulla)"],
        followup: "Long antibiotic course — 6–8 weeks minimum; CT recheck after treatment; head tilt may be permanent even after infection resolves (compensated vestibular disease)",
        prognosis: "fair"
      }
    },

    {
      id: "toxin_iron",
      name: "Iron Toxicosis",
      species: ["dog","cat"],
      category: "Toxicology",
      emergency: true,
      signals: {
        complaints_vomiting: 8, complaints_diarrhea: 7, complaints_lethargy: 8,
        complaints_collapse: 6, mm_pale: 7,
        hpi_onset_sudden: 9, history_toxin_ingestion: 9,
        age_puppy: 6
      },
      tests: {
        tier1: ["Serum iron level (>500 μg/dL = toxic; >800 μg/dL = severe)","CBC (anemia)","Chemistry (liver)","Abdominal radiograph (iron tablets visible)"],
        tier2: ["TIBC (total iron binding capacity)","Blood gas (metabolic acidosis)","Glucose (hypoglycemia)","Coagulation panel"],
        tier3: []
      },
      treatment: {
        medications: ["Induce emesis if <2h (ONLY tablets — iron solution/liquid: emesis not helpful)","Deferoxamine 15 mg/kg/h IV CRI (chelation agent — DEFINITIVE ANTIDOTE)","IV fluid support","Sodium bicarbonate (metabolic acidosis)","SAMe + N-acetylcysteine (hepatoprotection)"],
        procedures: ["Abdominal radiograph (identify tablets for GI tract — may need lavage/endoscopy)","Gastric lavage with 2% bicarbonate solution (precipitate Fe carbonate)","IV access + monitoring","Hepatic monitoring 24–48h post-exposure"],
        diet: ["NPO during acute phase","Soft food when recovering"]
      },
      education: {
        monitor: ["Serum iron q4–6h during chelation","Liver enzymes 24–48h","Urine output (deferoxamine — renal support)","Blood glucose","GI hemorrhage (iron erosive)"],
        red_flags: ["Bloody vomiting/diarrhea (iron ulcerates GI mucosa)","Hepatic failure 24–96h post-ingestion","Metabolic acidosis (shock phase)","GI stricture (late complication 2–4 weeks post-ingestion)"],
        followup: "Hepatic recheck 48h and 5 days; GI reassessment 2–4 weeks (stricture); child-proof iron supplements; pets attracted to sweet-coated iron tablets",
        prognosis: "fair"
      }
    },

    {
      id: "vestibular_idiopathic_geriatric",
      name: "Idiopathic Geriatric Vestibular Disease",
      species: ["dog","cat"],
      category: "Neurology",
      signals: {
        posture_head_tilt: 9, neuro_nystagmus: 9, neuro_circling: 7,
        gait_ataxia: 8, complaints_vomiting: 6, complaints_behavioral: 7,
        hpi_onset_sudden: 10, age_old: 9,
        attitude_dull: 5
      },
      contra_signals: { temp_high: -3, ears_discharge_brown: -4 },
      tests: {
        tier1: ["Neurological exam (head tilt, horizontal nystagmus, ataxia — normal CN, no weakness)","Otoscopy (rule out ear disease)","CBC/chemistry","Thyroid panel"],
        tier2: ["MRI brain/inner ear (rule out central lesion — abnormal nystagmus, proprioceptive deficits = central)","Tympanic bulla radiograph/CT"],
        tier3: ["Referral: veterinary neurologist (if central signs)"]
      },
      treatment: {
        medications: ["Supportive — NO specific treatment for idiopathic form","Meclizine 12.5–25 mg/dog PO SID (motion sickness relief — symptomatic)","Maropitant 2 mg/kg PO SID (antiemetic)","Diphenhydramine 2 mg/kg PO BID (antihistamine — vestibular sedation)","Mild sedation if extremely distressed: Acepromazine 0.025 mg/kg IM SID × 2–3 days"],
        procedures: ["Non-slip surfaces at home (prevent falling)","Restrict to safe area (no stairs)","Support when walking","Encourage eating"],
        diet: ["Elevated or hand-fed food (head tilt — eating difficult)","Soft food","Appetite stimulant if not eating 2 days"]
      },
      education: {
        monitor: ["Nystagmus resolution (resolves in 72h for idiopathic)","Head tilt resolution (4–6 weeks — some permanent)","Proprioception (should be NORMAL in idiopathic)","Eating and walking improvement"],
        red_flags: ["Proprioceptive deficits or vertical nystagmus — CENTRAL lesion — MRI urgent","Seizures — CNS disease","No improvement in 72h — reconsider diagnosis","Head tilt worsening — rule out otitis media"],
        followup: "Recheck in 72h — idiopathic: nystagmus should be resolving; recheck at 2 weeks, 4 weeks; explain 'looks like a stroke but will recover' to owner",
        prognosis: "excellent"
      }
    },

    {
      id: "chylothorax",
      name: "Chylothorax",
      species: ["dog","cat"],
      category: "Respiratory / Cardiology",
      signals: {
        complaints_dyspnea: 9, complaints_lethargy: 7, complaints_coughing: 6,
        resp_muffled: 8, chest_accessory_muscles: 6,
        abdomen_fluid_wave: 4, hpi_onset_subacute: 6,
        breed_afghan_hound: 7, breed_shiba: 5,
        age_old: 6
      },
      tests: {
        tier1: ["Thoracic radiograph (pleural effusion — bilateral ventral in cats)","Thoracocentesis + effusion analysis (milky, triglycerides >200 mg/dL, TG > serum — DIAGNOSTIC)","CBC/chemistry"],
        tier2: ["Echocardiogram (HCM cat, cardiac tamponade)","Heartworm antigen","Thoracic CT (thoracic duct anatomy, mass lesion)","Lymphangiography (thoracic duct leak)"],
        tier3: ["Referral: surgeon / internist","Thoracic duct ligation (SURGICAL)"]
      },
      treatment: {
        medications: ["Rutin 50 mg/kg PO TID (may reduce chyle flow — modest evidence)","Octreotide 10–20 μg/kg SC BID-TID (reduces chyle production — adjunct)","Sildenafil (pulmonary hypertension — treat if concurrent PH)","Furosemide (concurrent CHF)"],
        procedures: ["Thoracocentesis (therapeutic drainage — repeated prn)","Thoracic duct ligation (definitive surgical treatment)","Pericardectomy + pericardiectomy (concurrent pericardial effusion)","Low-fat diet (critical — reduces chyle flow)"],
        diet: ["ULTRA-LOW-FAT DIET (reduces chylomicron production — reduces chyle flow)","Medium-chain triglyceride (MCT) oil supplementation","Hill's i/d or similar low-fat diet","<10% fat on dry matter basis"]
      },
      education: {
        monitor: ["Respiratory rate at home","Thoracic radiograph q2–4 weeks","Weight","Thoracocentesis frequency","Protein/albumin (repeated drainage causes protein loss)"],
        red_flags: ["Respiratory failure (massive effusion)","Protein-losing state (hypoalbuminemia, lymphopenia)","Non-responsive to surgery","Concurrent lymphoma (treat primary)"],
        followup: "Repeated thoracocentesis as needed; refer for surgery if >1 month of drainage; low-fat diet alone resolves 20–25% of cases; prognosis guarded without surgery; idiopathic in cats has fair prognosis",
        prognosis: "guarded"
      }
    },

    {
      id: "peritonitis_septic",
      name: "Septic Peritonitis",
      species: ["dog","cat"],
      category: "Surgery / Emergency",
      emergency: true,
      signals: {
        complaints_lethargy: 9, complaints_vomiting: 8, complaints_anorexia: 8,
        abdomen_pain_severe: 9, abdomen_tense: 9,
        temp_high: 7, temp_low: 5, mm_pale: 7, mm_tacky: 7,
        hr_high: 7, hpi_onset_sudden: 8
      },
      tests: {
        tier1: ["Abdominal FAST ultrasound (free fluid)","Abdominal radiograph (free gas — GI perforation)","Abdominocentesis (effusion analysis — glucose, lactate, cytology)","PCV/TS"],
        tier2: ["CBC (leukocytosis or leukopenia — left shift)","Chemistry (elevated liver, BUN — organ involvement)","Effusion culture + sensitivity","Coagulation panel (DIC)"],
        tier3: ["CT abdomen (source identification before surgery)"]
      },
      treatment: {
        medications: ["IV fluid resuscitation (LRS or Normosol — shock dose)","Broad-spectrum antibiotics: Ampicillin-sulbactam 22 mg/kg IV TID + Enrofloxacin 10 mg/kg IV SID + Metronidazole 15 mg/kg IV BID","Methadone 0.2–0.4 mg/kg IV q4–6h (pain)","FFP (DIC — coagulopathy)"],
        procedures: ["EMERGENCY EXPLORATORY LAPAROTOMY (find and correct source)","Peritoneal lavage (copious warm saline)","Open abdomen drainage (severe cases)","Drain placement","Post-op intensive care 3–5 days"],
        diet: ["NPO pre-surgery","Early nutritional support post-surgery (jejunostomy tube or parenteral)","Liquid enteral nutrition when bowel sounds return"]
      },
      education: {
        monitor: ["Body temperature","Lactate q2–4h","Urine output","Wound care","Post-op radiograph (free gas resolution)","CBC daily post-op"],
        red_flags: ["Septic shock — aggressive early treatment","DIC — FFP + heparin","GI perforation — fecal peritonitis (worst prognosis)","Non-responsive to 4 weeks surgery — reassess source"],
        followup: "ICU 3–5 days minimum; mortality 40–60% despite aggressive care; prognosis depends on source, duration, degree of contamination",
        prognosis: "guarded"
      }
    },

    {
      id: "feline_hyperaesthesia_syndrome",
      name: "Feline Hyperaesthesia Syndrome (FHS)",
      species: ["cat"],
      category: "Neurology / Behavioral",
      signals: {
        complaints_behavioral: 9, complaints_skin_lesions: 6,
        skin_alopecia_focal: 6, skin_pruritus: 7,
        neuro_seizure: 5, hpi_onset_subacute: 6,
        age_middle: 5, age_young: 5, stress_event: 7
      },
      tests: {
        tier1: ["Dermatological exam (skin disease as trigger — flea allergy, atopy)","Neurological exam (convulsive episodes, rolling skin)","CBC/chemistry","FeLV/FIV"],
        tier2: ["MRI spine/brain (partial seizure foci)","ECG (cardiac rule out)","Allergy workup (parasites, skin disease)"],
        tier3: ["Referral: veterinary neurologist/behaviorist"]
      },
      treatment: {
        medications: ["Treat skin triggers FIRST (flea control: isoxazoline)","Phenobarbital 2.5 mg/kg PO BID (if seizure component dominates)","Gabapentin 5–10 mg/kg PO BID-TID (pain and seizure)","Clomipramine 0.5 mg/kg PO SID (behavioral component — OCD-like)","Fluoxetine 0.5–1 mg/kg PO SID (alternative SSRI)"],
        procedures: ["Environmental enrichment and stress reduction","Identify and eliminate triggers","Strict ectoparasite control"],
        diet: ["Novel protein trial (food allergy trigger)","Omega-3 supplementation"]
      },
      education: {
        monitor: ["Episode frequency and severity","Self-mutilation/over-grooming","Response to treatment","Stress triggers"],
        red_flags: ["Status epilepticus","Self-mutilation breaking skin","Rapidly worsening episodes","Non-response to ALL treatments — MRI needed"],
        followup: "Recheck at 4–6 weeks; multifactorial condition — treat all possible causes; gabapentin often most effective; some cats controlled with environment modification alone",
        prognosis: "fair"
      }
    },

    {
      id: "corneal_dystrophy",
      name: "Corneal Dystrophy / Corneal Lipidosis",
      species: ["dog","cat"],
      category: "Ophthalmology",
      signals: {
        complaints_behavioral: 4, complaints_eye_discharge: 4,
        hpi_onset_chronic: 7, age_middle: 5, age_young: 4,
        breed_siberian_husky: 8, breed_cavalier: 7, breed_beagle: 5
      },
      contra_signals: { temp_high: -4, complaints_lethargy: -2 },
      tests: {
        tier1: ["Ophthalmic exam (crystalline/white corneal opacity — bilateral symmetric)","Fluorescein stain (ulceration check — usually negative in dystrophy)","Schirmer tear test","Systemic lipid profile (lipid keratopathy vs dystrophy)"],
        tier2: ["Fasting lipid profile (cholesterol, triglycerides)","Thyroid panel (hypothyroidism — secondary lipid keratopathy)"],
        tier3: ["Referral: veterinary ophthalmologist (inheritance pattern advice)"]
      },
      treatment: {
        medications: ["Corneal dystrophy: NO treatment required in most (non-progressive, asymptomatic)","Lipid keratopathy: Treat underlying hyperlipidemia","Levothyroxine (hypothyroid lipid keratopathy)","Low-fat diet (dietary-induced hyperlipidemia)","Topical artificial tears (symptom management)"],
        procedures: ["Superficial keratectomy (symptomatic — vision impairment)","Genetic counseling (heritable dystrophies)"],
        diet: ["Low-fat diet (lipid keratopathy)"]
      },
      education: {
        monitor: ["Annual ophthalmic exam (progression monitoring)","Vision","Secondary ulceration (rare)","Lipid profile if keratopathy"],
        red_flags: ["Secondary ulceration from crystalline deposits","Rapidly expanding opacity impairing vision"],
        followup: "Annual ophthalmic recheck; most cases — cosmetic only; advise against breeding affected animals (Siberian Husky — autosomal recessive dystrophy); hypothyroid lipid keratopathy resolves with levothyroxine",
        prognosis: "excellent"
      }
    },

    {
      id: "cryptococcal_skin",
      name: "Cutaneous Cryptococcosis",
      species: ["cat","dog"],
      category: "Infectious Disease / Dermatology / Tropical",
      signals: {
        complaints_skin_lesions: 8, complaints_swelling_mass: 8,
        nose_mucopurulent: 6, complaints_nasal_discharge: 7,
        skin_papules: 7, complaints_behavioral: 5,
        env_outdoor: 7, env_endemic_area: 7,
        hpi_onset_subacute: 6, felv_fiv_positive: 6
      },
      tests: {
        tier1: ["Cryptococcus antigen latex agglutination (LCAT blood/CSF)","FNA of skin nodule (encapsulated yeast — India ink — DIAGNOSTIC)","CBC/chemistry","FeLV/FIV"],
        tier2: ["Culture","MRI brain (extension to CNS)","Serum cryptococcal titer"],
        tier3: ["Referral: infectious disease specialist"]
      },
      treatment: {
        medications: ["Fluconazole 10 mg/kg PO SID × 6 months minimum (FIRST-LINE — cutaneous form)","Itraconazole 5–10 mg/kg PO SID (alternative)","Monitor antigen titer every 4–8 weeks (decrease = responding)"],
        procedures: ["Surgical excision (single accessible cutaneous nodule + adjunct to antifungal)","CNS: add Amphotericin B induction if CNS extension"],
        diet: ["Normal supportive diet"]
      },
      education: {
        monitor: ["Antigen titer q4–8 weeks","Lesion regression","CNS signs","Nasal discharge","FeLV/FIV management"],
        red_flags: ["CNS extension (neurological signs)","Rising antigen titer on treatment","Bilateral nasal involvement — check for CNS spread"],
        followup: "Minimum 6 months treatment; treat until antigen titer negative × 2 consecutive tests; FIV/FeLV positive cats — longer, harder to eliminate; endemic in tropical/subtropical regions",
        prognosis: "fair"
      }
    },

    {
      id: "plasma_cell_pododermatitis",
      name: "Plasma Cell Pododermatitis (Pillow Foot) — Feline",
      species: ["cat"],
      category: "Dermatology / Immunology",
      signals: {
        complaints_limping: 8, gait_mild_lameness: 7, complaints_behavioral: 6,
        limbs_joint_swelling: 7, complaints_skin_lesions: 7,
        hpi_onset_subacute: 6, age_middle: 5,
        skin_erythema: 5
      },
      tests: {
        tier1: ["Physical exam — soft, spongy, purplish-tinged central pads","FNA of footpad (plasma cells — DIAGNOSTIC)","CBC/chemistry"],
        tier2: ["Skin biopsy (plasma cell infiltrate — deep)","FeLV/FIV","Culture (secondary infection)"],
        tier3: []
      },
      treatment: {
        medications: ["Doxycycline 10 mg/kg PO SID × 6–8 weeks (FIRST-LINE — immunomodulatory mechanism)","Prednisolone 1–2 mg/kg PO SID × 4 weeks then taper (alternative)","Cyclosporine 5 mg/kg PO SID (refractory)","Chlorambucil 0.1 mg/kg PO SID (severe — with prednisolone)"],
        procedures: ["E-collar to prevent licking and biting pads","Soft bedding","Surgical debridement if ulcerated (selected cases)"],
        diet: ["No specific dietary restriction"]
      },
      education: {
        monitor: ["Pad swelling and softness","Ulceration","Pain and lameness","Treatment response (4–8 weeks)","CBC (immunosuppression)"],
        red_flags: ["Ulceration and hemorrhage from pads","Rapidly spreading swelling to multiple pads","Renal amyloidosis concurrent (rare complication)"],
        followup: "Doxycycline 6–8 weeks; recheck at 4 weeks; may recur spontaneously or after treatment — retreatment often effective; condition is benign if well-managed",
        prognosis: "good"
      }
    },

    {
      id: "rabbit_snuffles",
      name: "Rabbit Pasteurellosis (Snuffles)",
      species: ["rabbit"],
      category: "Exotic / Rabbit / Respiratory / Infectious",
      signals: {
        complaints_nasal_discharge: 9, complaints_sneezing: 9, complaints_lethargy: 6,
        nose_mucopurulent: 8, nose_serous_discharge: 5,
        complaints_behavioral: 5, temp_high: 5,
        env_kennel: 7, hpi_onset_subacute: 6, hpi_onset_chronic: 5
      },
      tests: {
        tier1: ["Physical exam — mucopurulent nasal discharge","Culture (nasal swab — Pasteurella multocida)","CBC/chemistry","Skull/thoracic radiograph (rhinitis, otitis, pneumonia)"],
        tier2: ["CT skull (abscess localization)","PCR (Pasteurella)"],
        tier3: ["Referral: exotic animal specialist"]
      },
      treatment: {
        medications: ["Enrofloxacin 5–10 mg/kg PO BID × 14 days (FIRST-LINE)","Trimethoprim-sulfa 30 mg/kg PO BID × 14 days (alternative)","Azithromycin 30 mg/kg PO SID × 14 days (alternative)","Duration: often need 4–6 weeks or longer for chronic cases"],
        procedures: ["Nasal flush with saline (topical)","Humidification","Dental check (Pasteurella often linked to dental disease)","Abscess surgical drainage if present"],
        diet: ["Unlimited hay (maintain GI motility)","Fresh greens","Ensure adequate water intake during antibiotic treatment"]
      },
      education: {
        monitor: ["Nasal discharge character","Appetite and fecal output","Antibiotic side effects (GI dysbiosis — lethal in rabbits with inappropriate antibiotics)","Otitis signs (head tilt)"],
        red_flags: ["Bilateral mucopurulent discharge + dyspnea (pneumonia)","Head tilt (otitis media/interna)","Wry neck (inner ear — E. cuniculi or Pasteurella)","GI stasis from illness"],
        followup: "Culture-guided antibiotic; long-term recurrence common; Pasteurella is carrier in most rabbits — stress triggers clinical disease; isolation of new rabbits × 30 days",
        prognosis: "guarded"
      }
    },

    {
      id: "uterine_torsion_dystocia",
      name: "Uterine Torsion",
      species: ["dog","cat"],
      category: "Reproductive",
      emergency: true,
      signals: {
        complaints_lethargy: 9, complaints_collapse: 8, complaints_vomiting: 7,
        abdomen_pain_severe: 9, abdomen_tense: 8,
        sex_female_intact: 9, temp_high: 6, temp_low: 5,
        mm_pale: 7, mm_tacky: 7, hr_high: 7,
        hpi_onset_sudden: 9
      },
      tests: {
        tier1: ["Abdominal ultrasound (uterine rotation, fetal viability)","Radiography (fetuses, uterine gas — necrosis)","CBC/chemistry","PCV/TS"],
        tier2: ["Blood type and crossmatch","Coagulation panel (DIC)"],
        tier3: []
      },
      treatment: {
        medications: ["IV fluid resuscitation (LRS — aggressive shock management)","Broad-spectrum antibiotics IV: Ampicillin-sulbactam 22 mg/kg IV TID","Methadone 0.2–0.4 mg/kg IV (pain)","FFP (DIC/coagulopathy)"],
        procedures: ["EMERGENCY OVH (ovariohysterectomy) — ONLY OPTION","Pre-op stabilization × 1–2h (not longer — uterus is necrotic)","Peritoneal lavage if uterine rupture"],
        diet: ["NPO pre-surgery","Nutritional support post-surgery"]
      },
      education: {
        monitor: ["Pre-op vital signs stabilization","Post-op CBC/chemistry (sepsis)","Wound healing","Urine output post-surgery"],
        red_flags: ["Uterine rupture — peritonitis","DIC — spontaneous bleeding","Rapid deterioration despite fluids — emergency surgery NOW"],
        followup: "ICU post-op × 24–48h; discharge when stable; uterine torsion is rare but rapidly fatal without surgery; different from pyometra — must differentiate on ultrasound",
        prognosis: "guarded"
      }
    },

    {
      id: "lyme_borreliosis",
      name: "Lyme Disease (Borrelia burgdorferi)",
      species: ["dog"],
      category: "Infectious Disease / Arthropathy",
      signals: {
        complaints_limping: 8, limbs_joint_swelling: 7, limbs_joint_pain: 7,
        gait_moderate_lameness: 7, complaints_lethargy: 7, complaints_anorexia: 6,
        temp_high: 6, lymph_mild: 5,
        env_outdoor: 7, parasites_tick: 8, env_endemic_area: 7,
        hpi_onset_subacute: 6
      },
      tests: {
        tier1: ["C6 Lyme antibody SNAP test (SNAP 4Dx Plus — ELISA)","CBC/chemistry (proteinuria screen)","Urinalysis + UPC"],
        tier2: ["Borrelia burgdorferi B31 quantitative C6 antibody (Lyme Quant C6)","Western blot (OspA/OspC antibodies)","Joint fluid analysis (septic arthritis pattern)"],
        tier3: ["Referral: internist (Lyme nephritis — worst prognosis)"]
      },
      treatment: {
        medications: ["Doxycycline 10 mg/kg PO SID × 28 days (FIRST-LINE)","Amoxicillin 20 mg/kg PO TID × 28 days (alternative)","Monitor proteinuria — LYME NEPHRITIS (aggressive immunosuppression + ACE-I if nephropathy)"],
        procedures: ["Tick removal (Ixodes scapularis/ricinus)","Tick prevention (isoxazoline — fluralaner, sarolaner)","Lyme vaccination (endemic areas)"],
        diet: ["Normal diet","Renal diet if proteinuria + Lyme nephritis"]
      },
      education: {
        monitor: ["Lameness resolution (within 3–5 days of treatment)","UPC q4 weeks × 3 months","C6 titer at 6 months (should decrease)","Tick burden"],
        red_flags: ["Lyme nephritis — rapidly progressive renal failure (poor prognosis)","Persistent lameness >5 days on doxycycline — reconsider diagnosis","Edema / ascites (protein-losing nephropathy)"],
        followup: "C6 antibody recheck at 6 months (persistent elevation = active infection vs successfully treated); tick prevention lifelong in endemic areas; vaccination recommended in high-risk dogs",
        prognosis: "good"
      }
    },

    {
      id: "hepatic_encephalopathy",
      name: "Hepatic Encephalopathy (HE) — Acute Management",
      species: ["dog","cat"],
      category: "Gastroenterology / Hepatology / Neurology",
      emergency: true,
      signals: {
        complaints_seizures: 8, neuro_seizure: 7, neuro_disoriented: 8,
        complaints_behavioral: 8, complaints_vomiting: 6,
        mm_icteric: 6, attitude_obtunded: 8,
        complaints_polyuria: 5, hpi_onset_subacute: 5
      },
      tests: {
        tier1: ["Blood ammonia (hyperammonemia — >100 μmol/L significant)","CBC/chemistry (liver values, albumin, BUN low)","Blood glucose (hypoglycemia)","Urinalysis (ammonium biurate crystals)"],
        tier2: ["Bile acids (fasting + post-prandial)","Abdominal ultrasound (PSS, hepatic architecture)","CT angiography (PSS)"],
        tier3: ["Referral: internist/neurologist"]
      },
      treatment: {
        medications: ["Lactulose 0.5 mL/kg PO TID or enema (reduce NH3 absorption — CORNERSTONE)","Neomycin 20 mg/kg PO BID or Metronidazole 7.5 mg/kg PO BID (reduce urease-producing bacteria)","Dextrose 5% IV (hypoglycemia — HE depresses glucose)","Levetiracetam 20 mg/kg IV loading (seizure management — DO NOT USE PHENOBARBITAL — hepatic)","Vitamin K1 (coagulopathy — common in liver failure)","Rifaximin 10 mg/kg PO BID (GI-selective antibiotic — alternative to neomycin)"],
        procedures: ["Protein restriction during HE episode (NOT long-term)","Lactulose enema (acute HE — 3 mL/kg diluted 1:3 warm water via rectum)","Monitor temperature, blood glucose, CNS status","Correct dehydration"],
        diet: ["Low-protein diet ONLY during HE episodes","Highly digestible plant-based or hydrolyzed protein","Small frequent meals","Resume moderate protein when HE resolves"]
      },
      education: {
        monitor: ["Ammonia levels (target <75 μmol/L)","Mental status","Blood glucose q2–4h","Seizure control","Lactulose stool number (3–4 soft stools/day = adequate dose)"],
        red_flags: ["Status epilepticus (levetiracetam IV emergency)","Ammonia >300 μmol/L — coma risk","Coagulopathy (bleeding from multiple sites)","Progressive CNS depression"],
        followup: "Identify and treat underlying cause (PSS: surgery; chronic hepatitis: immunosuppression); lactulose long-term; protein restriction only for acute episodes; hepatic diet maintenance",
        prognosis: "guarded"
      }
    },

    {
      id: "antibiotic_associated_diarrhea",
      name: "Antibiotic-Associated Diarrhea / Clostridiosis",
      species: ["dog","cat"],
      category: "Gastroenterology / Infectious Disease",
      signals: {
        complaints_diarrhea: 9, complaints_hematochezia: 7, complaints_vomiting: 6,
        complaints_lethargy: 5, hpi_onset_subacute: 7,
        history_dietary_change: 5
      },
      tests: {
        tier1: ["Fecal cytology (WBCs, Clostridium spores)","CPV SNAP test (rule out parvovirus)","CBC/chemistry"],
        tier2: ["Clostridium perfringens enterotoxin ELISA (fecal)","Clostridium difficile toxin A/B (EIA)","Fecal culture"],
        tier3: []
      },
      treatment: {
        medications: ["STOP antibiotic if possible (primary intervention)","Metronidazole 10–15 mg/kg PO BID × 5–7 days (Clostridium treatment)","Tylosin 20 mg/kg PO BID × 5 days (alternative)","Probiotic: Enterococcus faecium (Fortiflora) SID × 14 days","IV fluid support (if dehydrated)"],
        procedures: ["Fecal microbiota transplant (FMT) — refractory clostridiosis","Bland diet"],
        diet: ["Bland diet × 3–5 days (boiled chicken + rice)","Probiotic supplementation","Gradual return to normal diet","Pumpkin puree 1–2 tsp SID (fiber)"]
      },
      education: {
        monitor: ["Diarrhea resolution","Hydration","Appetite","Blood in stool frequency"],
        red_flags: ["Hemorrhagic diarrhea + collapse — AHDS pattern","Not responding to metronidazole in 5 days","Worsening dehydration","Antibiotic anaphylaxis (separate from GI reaction)"],
        followup: "Recheck fecal at 10–14 days; antibiotics: use shortest effective course; probiotics during and after antibiotic treatment reduces risk; FMT growing in evidence base for refractory cases",
        prognosis: "excellent"
      }
    },

    {
      id: "immune_mediated_keratitis",
      name: "Immune-Mediated Keratitis (Pannus / Superficial Chronic Corneal Dystrophy)",
      species: ["dog"],
      category: "Ophthalmology / Immunology",
      signals: {
        complaints_eye_discharge: 7, complaints_behavioral: 6,
        eyes_conjunctival_hyperemia: 7, hpi_onset_chronic: 7,
        age_middle: 5, age_young: 5,
        breed_german_shepherd: 9, breed_greyhound: 7, breed_siberian_husky: 6,
        env_outdoor: 6, env_endemic_area: 3
      },
      tests: {
        tier1: ["Slit-lamp biomicroscopy (pigmented vascular corneal infiltrate — lateral limbus progressing centrally)","Schirmer tear test","Fluorescein stain"],
        tier2: ["Biopsy (plasma cell infiltrate)","Immunological workup (ANA — rule out SLE)"],
        tier3: ["Referral: veterinary ophthalmologist"]
      },
      treatment: {
        medications: ["Cyclosporine 0.2% ophthalmic ointment BID (cornerstone — lifelong)","Tacrolimus 0.02% ophthalmic drops BID (superior to cyclosporine — increasing use)","Prednisolone acetate 1% ophthalmic drops TID (acute flare)","Subconjunctival triamcinolone (acute severe flare — specialist)"],
        procedures: ["UV protection (tinted goggles/indoors in high-altitude, high-UV)","Superficial keratectomy (advanced pigmentation impairing vision)","Lifelong medication — no cure"],
        diet: ["Omega-3 supplementation (anti-inflammatory)"]
      },
      education: {
        monitor: ["Corneal pigmentation extent (photo documentation)","Vision","Response to topical cyclosporine/tacrolimus","Fluorescein staining (concurrent KCS)"],
        red_flags: ["Central corneal pigmentation impairing vision","Non-responsive to topical immunosuppression","Concurrent KCS (schirmer <15 mm/min)"],
        followup: "Lifelong topical cyclosporine/tacrolimus; recheck every 3–6 months; UV avoidance (avoid high altitude, snow reflection, strong sunlight — worsens pannus); cannot be cured, only controlled",
        prognosis: "fair"
      }
    },

    // ── BATCH 7: FINAL CONDITIONS TO REACH 300+ ──────────────────────────────

    {
      id: "disseminated_intravascular_coagulation",
      name: "Disseminated Intravascular Coagulation (DIC)",
      species: ["dog","cat"],
      category: "Hematology",
      emergency: true,
      signals: {
        complaints_bleeding: 10, complaints_collapse: 8, complaints_lethargy: 7,
        mm_pale: 8, skin_petechiae: 9, skin_ecchymoses: 9,
        complaints_vomiting: 5, temp_high: 6,
        organ_hepatomegaly: 5, abdomen_pain_severe: 6
      },
      tests: {
        tier1: ["PT/aPTT (prolonged)","Platelet count (thrombocytopenia)","Fibrinogen (low)","Blood smear (schistocytes)"],
        tier2: ["D-dimer (markedly elevated)","FDP","Thromboelastography (TEG/ROTEM)","Antithrombin III"],
        tier3: ["Underlying trigger workup (sepsis panel, oncology imaging, trauma survey)"]
      },
      treatment: {
        medications: ["Fresh frozen plasma (FFP) 6–10 mL/kg IV (replace clotting factors)","Cryoprecipitate (fibrinogen replacement)","Low-dose unfractionated heparin 150–300 IU/kg SC TID (thrombotic DIC — specialist guidance)","Platelet-rich plasma or whole blood if severe thrombocytopenia"],
        procedures: ["Treat triggering disease immediately (sepsis, neoplasia, trauma)","IV access; fluid resuscitation","Oxygen supplementation","Minimize venipuncture sites; pressure bandaging"],
        diet: ["NPO if GI hemorrhage active"]
      },
      education: {
        monitor: ["Serial PT/aPTT/platelets every 4–8 h (acute)","Petechiae progression","Urine output (renal microvascular thrombosis)","Blood pressure"],
        red_flags: ["Hemorrhage from multiple sites simultaneously","Organ failure signs (oliguria, coma, respiratory failure)","Non-responsive to FFP"],
        followup: "Monitor until coagulation normalized; treat underlying cause aggressively; intensive care required",
        prognosis: "grave"
      }
    },

    {
      id: "septic_shock",
      name: "Septic Shock",
      species: ["dog","cat"],
      category: "Emergency/Critical Care",
      emergency: true,
      signals: {
        complaints_collapse: 10, complaints_lethargy: 9, temp_high: 7, temp_low: 7,
        mm_pale: 8, complaints_vomiting: 6, complaints_diarrhea: 5,
        abdomen_pain_severe: 7, complaints_dyspnea: 6,
        heart_rate_high: 8, resp_tachypnea: 7
      },
      tests: {
        tier1: ["Blood pressure (hypotension <90 mmHg systolic)","Lactate (>2.5 mmol/L)","Blood glucose","CBC + chemistry panel"],
        tier2: ["Blood cultures (aerobic + anaerobic)","Urine culture","Coagulation panel","Thoracic + abdominal radiographs","Abdominal ultrasound"],
        tier3: ["CT abdomen (source identification)","Echocardiography (septic cardiomyopathy)"]
      },
      treatment: {
        medications: ["IV crystalloid bolus 10–20 mL/kg over 15–30 min (reassess)","Broad-spectrum antibiotics: ampicillin-sulbactam + enrofloxacin IV","Norepinephrine 0.1–1 µg/kg/min CRI (vasopressor if hypotension refractory)","Hydrocortisone 1 mg/kg IV TID (refractory shock with possible relative adrenal insufficiency)"],
        procedures: ["IV catheter placement (large-bore)","Oxygen supplementation — consider mechanical ventilation if needed","Source control: drain abscess, remove foreign body, emergency surgery","Urinary catheter (monitor output ≥1 mL/kg/h)"],
        diet: ["Early enteral nutrition within 24 h if tolerated"]
      },
      education: {
        monitor: ["Blood pressure (MAP >65 mmHg)","Urine output","Lactate clearance (>10% per 2 h)","Temperature normalization","Mental status"],
        red_flags: ["Lactate >4 mmol/L","Anuric","Multi-organ failure (rising creatinine + bilirubin + coagulopathy)","Persistent hypotension despite vasopressors"],
        followup: "ICU monitoring; reassess antimicrobials at 48–72 h; source control essential; prognosis strongly tied to underlying cause",
        prognosis: "grave"
      }
    },

    {
      id: "anaplasmosis",
      name: "Anaplasmosis (Anaplasma phagocytophilum / A. platys)",
      species: ["dog","cat"],
      category: "Infectious Disease",
      signals: {
        tick_exposure: 9, temp_high: 8, complaints_lethargy: 8, complaints_lameness: 7,
        organ_lymphadenopathy: 6, complaints_vomiting: 4,
        skin_petechiae: 5, age_young: 3, age_middle: 4
      },
      tests: {
        tier1: ["4Dx SNAP test (A. phagocytophilum antibody)","CBC (thrombocytopenia, leukopenia)","Chemistry panel"],
        tier2: ["PCR (blood — early infection, most sensitive)","Morulae on blood smear (neutrophils — A. phagocytophilum)","Paired serology IFA (4-fold rise)"],
        tier3: ["Co-infection panel: Ehrlichia, Borrelia, Babesia (common co-infections)"]
      },
      treatment: {
        medications: ["Doxycycline 5 mg/kg PO BID × 28 days (drug of choice)","Supportive fluids if dehydrated"],
        procedures: ["Tick removal and prevention counseling","Environmental tick control"],
        diet: []
      },
      education: {
        monitor: ["Platelet count normalization (7–14 days)","Clinical improvement within 24–48 h of doxycycline","Repeat CBC at 2–4 weeks"],
        red_flags: ["Bleeding (severe thrombocytopenia <20,000)","Neurological signs","No improvement in 48 h (consider co-infections)"],
        followup: "Recheck CBC at 4 weeks; prevent tick exposure year-round; re-test in 3–6 months if exposure continues",
        prognosis: "good"
      }
    },

    {
      id: "rocky_mountain_spotted_fever",
      name: "Rocky Mountain Spotted Fever (Rickettsia rickettsii)",
      species: ["dog"],
      category: "Infectious Disease",
      emergency: true,
      signals: {
        tick_exposure: 9, temp_high: 9, complaints_lethargy: 8,
        skin_petechiae: 9, skin_ecchymoses: 7, organ_lymphadenopathy: 6,
        neuro_ataxia: 6, complaints_vomiting: 5, eye_redness: 5,
        complaints_bleeding: 7, abdomen_pain_severe: 5
      },
      tests: {
        tier1: ["CBC (thrombocytopenia, leukopenia initially → leukocytosis)","Chemistry panel (elevated liver enzymes, hyponatremia)","Blood pressure"],
        tier2: ["PCR (blood — acute phase, most reliable)","IFA serology (≥4-fold titer rise in convalescent sample)","Urinalysis (proteinuria, hematuria)"],
        tier3: ["CSF analysis (meningitis)","Coagulation panel (DIC screen)"]
      },
      treatment: {
        medications: ["Doxycycline 5 mg/kg PO/IV BID × 7–14 days — START EMPIRICALLY DO NOT WAIT FOR CONFIRMATION","Supportive: IV fluids, anti-emetics","Blood products if DIC develops"],
        procedures: ["Tick removal and prevention","Hospitalization for severe cases","Oxygen if neurological compromise"],
        diet: []
      },
      education: {
        monitor: ["Platelet count (thrombocytopenia key marker)","Neurological status","Petechiae spread","Urine output (renal involvement)"],
        red_flags: ["Neurological signs: ataxia, seizures","Petechiae rapidly spreading","DIC signs","Delayed treatment (fatality rises sharply within 5 days)"],
        followup: "Most dogs respond dramatically within 24–48 h of doxycycline; tick prevention; public health zoonotic risk — report in endemic areas",
        prognosis: "good if treated early; grave if delayed or complicated by DIC/CNS involvement"
      }
    },

    {
      id: "histoplasmosis",
      name: "Histoplasmosis (Histoplasma capsulatum)",
      species: ["dog","cat"],
      category: "Infectious Disease",
      signals: {
        complaints_weight_loss: 8, complaints_diarrhea: 7, temp_high: 7,
        complaints_lethargy: 8, complaints_coughing: 6, complaints_dyspnea: 5,
        organ_hepatomegaly: 7, organ_splenomegaly: 6, organ_lymphadenopathy: 7,
        mm_pale: 5, complaints_vomiting: 4
      },
      tests: {
        tier1: ["CBC (anemia, thrombocytopenia)","Chemistry panel (elevated liver enzymes, hypoalbuminemia)","Thoracic radiographs (interstitial/nodular pattern, hilar lymphadenopathy)"],
        tier2: ["Cytology (macrophages with intracellular 2–4 µm yeast — rectal scraping, lymph node, bone marrow)","Urine antigen ELISA (MiraVista — highly sensitive)","Fecal cytology (colonic mucosal scraping)"],
        tier3: ["Abdominal ultrasound + guided FNA","Fungal culture (BSL-2 — not routine)","PCR"]
      },
      treatment: {
        medications: ["Itraconazole 5 mg/kg PO BID × 4–6 months (drug of choice)","Fluconazole 5 mg/kg PO BID (CNS/ocular involvement)","Amphotericin B liposomal 1–3 mg/kg IV every 48 h (severe/disseminated)"],
        procedures: ["Monitor liver enzymes (itraconazole hepatotoxicity)","Supportive nutrition"],
        diet: ["High-protein, high-calorie diet"]
      },
      education: {
        monitor: ["Body weight","Urine antigen levels (monitor response)","Liver enzymes (itraconazole hepatotoxicity)","Respiratory status"],
        red_flags: ["Respiratory failure","Severe cachexia","CNS or ocular involvement","Rising urine antigen on treatment"],
        followup: "Minimum 4–6 months antifungal therapy; urine antigen at 2 months, 4 months, 6 months; relapse possible — re-treat; avoid endemic soil (bird/bat droppings)",
        prognosis: "fair to guarded"
      }
    },

    {
      id: "blastomycosis",
      name: "Blastomycosis (Blastomyces dermatitidis)",
      species: ["dog","cat"],
      category: "Infectious Disease",
      signals: {
        complaints_coughing: 8, complaints_dyspnea: 7, complaints_weight_loss: 8,
        temp_high: 7, organ_lymphadenopathy: 8, skin_nodule: 7,
        eye_cloudiness: 6, uveitis_sign: 6, complaints_lethargy: 7,
        complaints_lameness: 5, age_young: 4, age_middle: 5
      },
      tests: {
        tier1: ["Thoracic radiographs (mixed interstitial-alveolar, hilar adenopathy, nodules)","Cytology (8–15 µm broad-based budding yeast — skin nodule FNA, lymph node, tracheal wash)","CBC/chemistry"],
        tier2: ["Urine antigen ELISA (MiraVista — high sensitivity)","Ophthalmologic exam (uveitis, retinal detachment)","Skin biopsy"],
        tier3: ["Bronchoalveolar lavage","PCR","Culture (BSL-2 hazard — rarely performed)"]
      },
      treatment: {
        medications: ["Itraconazole 5 mg/kg PO BID × 2–3 months minimum (mild-moderate)","Amphotericin B liposomal 1–2 mg/kg IV every 48 h (severe pulmonary/CNS)","Fluconazole (CNS/ocular penetration — second-line)"],
        procedures: ["Hospitalization + oxygen for severe respiratory disease","Treat concurrent uveitis topically"],
        diet: ["Supportive high-calorie diet"]
      },
      education: {
        monitor: ["Thoracic radiographs (response at 4–8 weeks)","Urine antigen","Itraconazole levels/liver enzymes","Ocular pressure (uveitis → glaucoma)"],
        red_flags: ["Severe dyspnea at rest","Neurological signs","Blindness from uveitis","Rising urine antigen after 4 weeks treatment"],
        followup: "Treat minimum 60 days beyond clinical resolution; urine antigen monitoring; prognosis better in dogs than cats; zoonotic risk low (not transmitted animal → human)",
        prognosis: "fair in dogs; guarded in cats"
      }
    },

    {
      id: "patent_ductus_arteriosus",
      name: "Patent Ductus Arteriosus (PDA)",
      species: ["dog","cat"],
      category: "Cardiology",
      signals: {
        cardiac_murmur_continuous: 10, age_young: 9, complaints_exercise_intolerance: 7,
        complaints_coughing: 5, complaints_dyspnea: 5, breed_maltese: 6,
        breed_poodle: 5, breed_border_collie: 5, complaints_lethargy: 4,
        resp_crackles_fine: 5
      },
      tests: {
        tier1: ["Echocardiography (Doppler — turbulent flow through ductus, left heart enlargement)","Thoracic radiographs (left-sided cardiomegaly, pulmonary over-circulation, ductal bulge)","ECG"],
        tier2: ["NT-proBNP","Blood pressure","CBC/chemistry baseline"],
        tier3: ["Cardiac CT (complex anatomy pre-intervention)","Referral: veterinary cardiologist"]
      },
      treatment: {
        medications: ["Furosemide if CHF present pre-closure","Pimobendan if heart failure (bridge to intervention)"],
        procedures: ["Transcatheter ductal occlusion (ACDO/coil) — technique of choice","Surgical ligation (thoracotomy) — if catheter intervention unavailable","Correct BEFORE heart failure develops for best outcome"],
        diet: ["Sodium-restricted diet if heart failure present"]
      },
      education: {
        monitor: ["Resting respiratory rate (if CHF signs present)","Echocardiogram post-closure (3 months, 6 months)","Listen for residual murmur (residual shunt)"],
        red_flags: ["Reverse PDA (right-to-left shunt — cyanosis of caudal limbs — inoperable)","CHF signs before intervention","Atrial fibrillation"],
        followup: "Referral to cardiologist as soon as murmur confirmed in young animal; surgical/catheter closure curative in most; breed predisposition — screen siblings",
        prognosis: "excellent with early closure; guarded if CHF has developed; grave if reverse PDA"
      }
    },

    {
      id: "feline_oral_squamous_cell_carcinoma",
      name: "Oral Squamous Cell Carcinoma (Feline)",
      species: ["cat"],
      category: "Oncology",
      emergency: false,
      signals: {
        oral_mass: 9, oral_ulceration: 8, complaints_anorexia: 8,
        complaints_weight_loss: 9, oral_halitosis: 7, complaints_drooling: 8,
        age_old: 8, complaints_dysphagia: 8, oral_bleeding: 6,
        complaints_pawing_mouth: 6, organ_lymphadenopathy: 5
      },
      tests: {
        tier1: ["Oral examination under anesthesia","Incisional biopsy (histopathology — definitive)","Skull radiographs (bone invasion)"],
        tier2: ["Thoracic radiographs (metastasis — rare at presentation)","CT skull (extent of bone invasion — pre-surgical planning)","Regional lymph node FNA or biopsy"],
        tier3: ["Abdominal ultrasound","Bone scan (scintigraphy)"]
      },
      treatment: {
        medications: ["Meloxicam 0.05 mg/kg PO SID (palliative analgesia)","Buprenorphine 0.02 mg/kg OTM q8h (pain)","COX-2 inhibitors (palliative)","Appetite stimulants (mirtazapine 1.88 mg/cat q48h)"],
        procedures: ["Surgical resection (mandibulectomy/maxillectomy — rarely curative, often not possible)","Radiation therapy (palliative — short-course)","Esophagostomy/gastrostomy tube (nutritional support)","Referral: veterinary oncologist"],
        diet: ["Assisted feeding via esophagostomy tube","Soft or liquefied food as long as possible"]
      },
      education: {
        monitor: ["Food and water intake daily","Body weight weekly","Pain assessment","Tumor progression"],
        red_flags: ["Complete anorexia (tube feeding urgently needed)","Severe dysphagia causing aspiration","Rapid mass expansion"],
        followup: "Median survival <3 months; most cases diagnosed at advanced stage with bone invasion; quality-of-life and palliative care central to management; euthanasia discussion early",
        prognosis: "grave"
      }
    },

    {
      id: "urinary_incontinence_dog",
      name: "Urinary Incontinence — Urethral Sphincter Mechanism Incompetence (USMI)",
      species: ["dog"],
      category: "Urology",
      signals: {
        complaints_urine_dribbling: 9, sex_spayed_female: 9,
        urine_perineal_scalding: 7, complaints_wet_bedding: 8,
        age_middle: 6, breed_large: 5, age_old: 6,
        complaints_no_pollakiuria: 6
      },
      tests: {
        tier1: ["Urinalysis + culture (rule out UTI)","Abdominal ultrasound (bladder, ureters, kidney)","Rectal examination"],
        tier2: ["Contrast cystography/urethrography (ectopic ureters, anatomical defects)","Urethral pressure profile","Urodynamic study"],
        tier3: ["CT/MRI (ectopic ureter, pelvic anatomy)","Cystoscopy (ectopic ureteral orifice visualization)"]
      },
      treatment: {
        medications: ["Phenylpropanolamine (PPA) 1.5 mg/kg PO BID–TID (alpha-1 agonist — first-line)","Estriol 0.5–1 mg/dog PO SID × 7 days then weekly (hormone replacement)","Testosterone cypionate (males — 2.2 mg/kg IM every 4–6 weeks)"],
        procedures: ["Colposuspension (surgical — if PPA insufficient)","Hydraulic urethral occluder implant","Endoscopic injection of bulking agent (collagen/teflon)","Ectopic ureter correction (laser ablation or surgery)"],
        diet: ["Weight management (obesity worsens incontinence)"]
      },
      education: {
        monitor: ["Frequency of leakage episodes","Perineal hygiene (urine scalding prevention)","Response to medication at 2–4 weeks"],
        red_flags: ["Pollakiuria or dysuria (UTI complicating)","Progressive urine stream weakness (urethral obstruction)","No response to PPA (consider anatomical cause)"],
        followup: "PPA effective in ~85% USMI; monitor blood pressure (PPA hypertension risk); spayed females at highest risk; most cases managed medically long-term",
        prognosis: "good with management"
      }
    },

    {
      id: "aural_hematoma",
      name: "Aural Hematoma (Ear Flap Hematoma)",
      species: ["dog","cat"],
      category: "ENT/Dermatology",
      signals: {
        ear_swelling_pinna: 9, ear_pruritus: 7, complaints_head_shaking: 8,
        ear_scratching: 7, ear_discharge: 5, ear_odor: 5,
        otitis_concurrrent: 8, complaints_pain_ear: 6
      },
      tests: {
        tier1: ["Clinical diagnosis (fluctuant non-painful pinna swelling)","Otoscopy (assess ear canal — underlying otitis)","Ear cytology (identify otitis organism)"],
        tier2: ["Culture + sensitivity (chronic/recurrent otitis)"],
        tier3: []
      },
      treatment: {
        medications: ["Prednisolone 1 mg/kg PO SID × 14 days (reduce inflammation — conservative)","Intralesional triamcinolone after drainage","Treat underlying otitis: ear cleaner + topical antimicrobial/antifungal"],
        procedures: ["Aspiration (temporary — high recurrence without corticosteroids)","Surgical incision: S-shaped or multiple stab incisions + through-and-through sutures (technique of choice — low recurrence)","Teat cannula drainage + corticosteroid injection","Cauliflower ear may occur cosmetically if untreated"],
        diet: []
      },
      education: {
        monitor: ["Pinna swelling resolution","Underlying ear canal condition","Recurrence if otitis not resolved"],
        red_flags: ["Untreated leads to fibrosis and permanent cauliflower deformity","Bilateral hematoma (suggest systemic coagulopathy or immune disease)"],
        followup: "Surgical correction + aggressive otitis management reduces recurrence; recheck ear canal at 2 and 4 weeks post-surgery; address allergen trigger if atopic",
        prognosis: "good"
      }
    },

    {
      id: "degenerative_myelopathy_dog",
      name: "Degenerative Myelopathy (DM) — Canine",
      species: ["dog"],
      category: "Neurology",
      signals: {
        neuro_hindlimb_weakness: 10, neuro_ataxia: 9, complaints_knuckling: 8,
        worn_nails_hindlimb: 8, complaints_non_painful: 9, age_old: 8,
        breed_gsd: 9, breed_corgi: 8, breed_boxer: 7,
        neuro_progressive: 8, complaints_fecal_incontinence: 6
      },
      contra_signals: {
        neuro_pain_spinal: 8
      },
      tests: {
        tier1: ["Neurological examination (proprioceptive deficits, upper motor neuron signs — non-painful)","Thoracolumbar radiographs (rule out disc disease)","CBC/chemistry/thyroid (rule out metabolic)"],
        tier2: ["MRI thoracolumbar spine (rule out compressive myelopathy — IVDD, neoplasia)","CSF analysis (mildly elevated protein in DM)"],
        tier3: ["SOD1 genetic mutation testing (A/A homozygous — at-risk; definitive only on post-mortem histopathology)","EMG/nerve conduction studies"]
      },
      treatment: {
        medications: ["No proven disease-modifying treatment","Vitamin E + C supplementation (antioxidant — minimal evidence)","N-acetylcysteine (investigational)"],
        procedures: ["Intensive physical rehabilitation (treadmill, swimming — may slow progression)","Hindlimb cart/wheelchair (when unable to ambulate)","Pressure sore prevention (padded bedding, turning)","Bladder expression or urinary catheter (late-stage)"],
        diet: ["Maintain lean body condition — reduces spinal stress","Omega-3 fatty acids"]
      },
      education: {
        monitor: ["Ability to ambulate (document baseline, reassess monthly)","Skin integrity (pressure sores)","Bladder and bowel function","Quality of life assessment"],
        red_flags: ["Loss of ambulation within 6–12 months typical (disease is progressive — no reversals)","Urinary/fecal incontinence (late stage)","Tetraparesis (terminal stage)"],
        followup: "Rehabilitation 3–5× weekly slows progression; average 1–3 years from hindlimb weakness to tetraplegia; quality-of-life discussions early; genetic counseling for breeding",
        prognosis: "poor (progressive, ultimately fatal)"
      }
    },

    {
      id: "canine_influenza",
      name: "Canine Influenza Virus (H3N8 / H3N2)",
      species: ["dog"],
      category: "Respiratory/Infectious",
      signals: {
        complaints_coughing: 9, complaints_nasal_discharge: 8, temp_high: 7,
        complaints_lethargy: 7, complaints_anorexia: 6, kennel_exposure: 8,
        age_young: 5, dog_show_boarding_exposure: 7, eye_discharge: 5,
        resp_crackles_fine: 5
      },
      tests: {
        tier1: ["Thoracic radiographs (pneumonia infiltrate)","PCR (oropharyngeal/nasal swab — within first 4 days of illness — highest yield)","CBC (leukocytosis with left shift)"],
        tier2: ["Serology paired (4-fold rise — retrospective confirmation)","Bacterial culture (secondary infection: Bordetella, Streptococcus, Mycoplasma)"],
        tier3: ["Bronchoalveolar lavage (severe pneumonia)"]
      },
      treatment: {
        medications: ["Supportive: IV fluids if anorexic/dehydrated","Doxycycline 5 mg/kg PO BID × 7–10 days (secondary bacterial pneumonia)","Amoxicillin-clavulanate (secondary infection alternative)","Cough suppressants only if non-productive (avoid if pneumonia present)","Oseltamivir (limited veterinary evidence — not routinely recommended)"],
        procedures: ["Strict isolation from other dogs (7–10 days)","Oxygen supplementation (severe pneumonia)","Nebulization + coupage (consolidating pneumonia)"],
        diet: ["Highly palatable food — encourage intake"]
      },
      education: {
        monitor: ["Respiratory rate and effort","Temperature daily","Food and water intake","Progression to pneumonia (cough becoming productive, dyspnea)"],
        red_flags: ["Dyspnea at rest","Coughing blood","Temperature >40.5°C","Rapidly worsening radiographs"],
        followup: "Most dogs recover in 2–3 weeks; highly contagious — isolate affected animals; vaccination available (H3N2, H3N8 bivalent); notify boarding/grooming facilities of exposure",
        prognosis: "good in healthy adults; guarded in puppies, elderly, brachycephalic, or immunocompromised"
      }
    },

    {
      id: "nasopharyngeal_polyp_cat",
      name: "Nasopharyngeal / Inflammatory Polyp (Feline)",
      species: ["cat"],
      category: "ENT/Respiratory",
      signals: {
        complaints_nasal_discharge_unilateral: 8, complaints_stertor: 9,
        age_young: 8, complaints_dysphagia: 5, neuro_vestibular: 6,
        complaints_head_tilt: 6, ear_discharge: 5, ear_pruritus: 4,
        horner_unilateral: 5, complaints_open_mouth_breathing: 6
      },
      tests: {
        tier1: ["Oropharyngeal exam under sedation (polyp visible behind soft palate — pink, pedunculated)","Skull radiographs (bulla opacity)","Otoscopy (polyp in ear canal)"],
        tier2: ["CT skull (definitive extent — bulla involvement, tympanic membrane)","Rhinoscopy / nasopharyngoscopy"],
        tier3: ["Biopsy (histopathology — confirm benign inflammatory polyp vs neoplasia)"]
      },
      treatment: {
        medications: ["Anti-inflammatory: prednisolone 1–2 mg/kg PO SID × 3 weeks (reduce recurrence after removal)"],
        procedures: ["Traction-avulsion (oropharyngeal approach) — simple removal, high recurrence without bulla osteotomy","Ventral bulla osteotomy (VBO) — procedure of choice if bulla involved (lowest recurrence ~10%)","Middle ear flushing at time of VBO"],
        diet: []
      },
      education: {
        monitor: ["Nasal discharge after surgery","Head tilt / Horner's (Horner's often resolves 4–6 weeks post-VBO)","Recurrence check at 4–6 weeks, 3 months"],
        red_flags: ["Recurrence after simple traction (common — 30–50% without VBO)","Worsening neurological signs","Aspiration pneumonia from pharyngeal obstruction"],
        followup: "VBO recommended if bulla is opacified on CT; Horner's and vestibular signs usually resolve; post-operative analgesics 5–7 days; young cats (often <2 years at diagnosis)",
        prognosis: "excellent with VBO; fair with traction only (high recurrence)"
      }
    },

    {
      id: "spirocercosis_dog",
      name: "Spirocercosis (Spirocerca lupi)",
      species: ["dog"],
      category: "Parasitology",
      signals: {
        complaints_regurgitation: 9, complaints_dysphagia: 8, complaints_vomiting: 6,
        complaints_weight_loss: 7, complaints_coughing: 5, age_young: 4,
        age_middle: 5, tropical_subtropical_exposure: 8, esophageal_mass_sign: 9,
        complaints_lethargy: 5
      },
      tests: {
        tier1: ["Thoracic radiographs (caudal mediastinal/esophageal mass, aortic aneurysm, spondylitis)","Fecal flotation — Baermann sedimentation (larvated 11–14 µm × 30–37 µm eggs)"],
        tier2: ["Esophagoscopy (granulomatous nodules in caudal esophagus — pathognomonic)","Chest CT (mass extent, aortic involvement, metastases if sarcomatous transformation)"],
        tier3: ["Biopsy of esophageal nodule (benign granuloma vs osteosarcoma/fibrosarcoma transformation)","Fecal PCR"]
      },
      treatment: {
        medications: ["Doramectin 0.2–0.4 mg/kg SC once monthly × 3–9 months (drug of choice)","Milbemycin oxime 0.5 mg/kg PO weekly × 6–12 weeks","Ivermectin 0.2 mg/kg SC monthly (alternative)"],
        procedures: ["Esophagoscopic removal of nodules (if accessible)","Surgical esophagotomy (large nodules or obstruction)","Coprophagia prevention"],
        diet: ["Soft food to reduce esophageal trauma"]
      },
      education: {
        monitor: ["Esophagoscopy at 3 and 6 months to assess response","Regurgitation frequency","Body weight","Thoracic radiographs at 3 months"],
        red_flags: ["Sudden severe dyspnea (aortic aneurysm rupture — emergency)","Sarcomatous transformation (osteosarcoma/fibrosarcoma — grave prognosis)","Hypertrophic osteopathy (periosteal reaction on limb bones)"],
        followup: "Prevention: doramectin monthly in endemic areas; intermediate hosts (coprophagic beetles, frogs, lizards) — prevent ingestion; benign nodules respond well; sarcomatous transformation is fatal",
        prognosis: "fair (benign stage); grave (sarcomatous transformation)"
      }
    },

    {
      id: "feline_herpesvirus_dermatitis",
      name: "Feline Herpesvirus 1 (FHV-1) Ulcerative Facial Dermatitis",
      species: ["cat"],
      category: "Dermatology/Infectious",
      signals: {
        skin_ulceration: 9, skin_facial_nasal: 9, fhv1_history: 8,
        eye_discharge: 6, complaints_nasal_discharge: 5, stress_trigger: 7,
        complaints_pruritus_facial: 6, complaints_lethargy: 4,
        age_young: 5, age_old: 4, bilateral_periocular: 7
      },
      tests: {
        tier1: ["Clinical examination (nasal planum ulceration, periocular facial skin — characteristic)","Fluorescein staining (concurrent herpetic keratitis)","Response to antiviral treatment (empirical diagnostic)"],
        tier2: ["PCR (skin swab or conjunctival — high sensitivity)","Histopathology (intranuclear inclusion bodies — Cowdry type A)","Virus isolation"],
        tier3: ["Skin culture (rule out bacterial secondary infection)","Allergy panel (differentiate from EGC if perioral)"]
      },
      treatment: {
        medications: ["Famciclovir 90 mg/cat PO BID–TID × 3–4 weeks (drug of choice in cats — safe)","L-lysine 250–500 mg/cat PO BID (arginine antagonist — inhibits viral replication — controversial)","Topical trifluridine or ganciclovir ophthalmic (concurrent keratitis)","Interferon-alpha (IFN-α) 30 IU PO SID (immunomodulation)","Antibiotics if secondary bacterial pyoderma"],
        procedures: ["Stress minimization (pheromone diffusers — Feliway)","Gentle wound cleaning","Elizabethan collar (prevent self-trauma)"],
        diet: ["High-quality nutrition to support immune response"]
      },
      education: {
        monitor: ["Ulcer healing (2–4 weeks with famciclovir)","Eye signs (concurrent herpetic keratitis)","Stress triggers","Recurrence after stressors"],
        red_flags: ["Non-responsive to famciclovir (consider alternative diagnosis: EGC, neopl, demodicosis)","Corneal ulceration progressing","Secondary bacterial sepsis (rare)"],
        followup: "Virus establishes latency in trigeminal ganglion — lifelong; stress reactivation common; prophylactic famciclovir during stressors; vaccination reduces severity not infection; indoor housing reduces exposure",
        prognosis: "fair — recurrences expected lifelong"
      }
    },

  ],  // end conditions[]

  // ── VITAL SIGN THRESHOLDS ─────────────────────────────────────────────────
  vitals_reference: {
    dog: {
      temp: { low: 37.2, normal_low: 37.5, normal_high: 39.2, high: 39.5, unit: "°C" },
      hr:   { low: 50, normal_low: 60, normal_high: 140, high: 160, unit: "bpm" },
      rr:   { low: 8, normal_low: 10, normal_high: 30, high: 35, unit: "brpm" }
    },
    cat: {
      temp: { low: 37.5, normal_low: 38.0, normal_high: 39.2, high: 39.5, unit: "°C" },
      hr:   { low: 100, normal_low: 120, normal_high: 200, high: 220, unit: "bpm" },
      rr:   { low: 8, normal_low: 15, normal_high: 40, high: 45, unit: "brpm" }
    },
    rabbit: {
      temp: { low: 38.0, normal_low: 38.5, normal_high: 40.0, high: 40.5, unit: "°C" },
      hr:   { low: 120, normal_low: 130, normal_high: 325, high: 350, unit: "bpm" },
      rr:   { low: 20, normal_low: 30, normal_high: 60, high: 65, unit: "brpm" }
    },
    bird: {
      temp: { low: 39.0, normal_low: 40.0, normal_high: 42.0, high: 42.5, unit: "°C" },
      hr:   { low: 150, normal_low: 200, normal_high: 600, high: 650, unit: "bpm" },
      rr:   { low: 15, normal_low: 25, normal_high: 60, high: 65, unit: "brpm" }
    },
    exotic: {
      temp: { low: 36.5, normal_low: 37.0, normal_high: 40.0, high: 40.5, unit: "°C" },
      hr:   { low: 100, normal_low: 150, normal_high: 400, high: 450, unit: "bpm" },
      rr:   { low: 15, normal_low: 25, normal_high: 60, high: 65, unit: "brpm" }
    }
  }

};

// ── DIAGNOSIS ENGINE ──────────────────────────────────────────────────────────
function runDiagnosisEngine(formData) {
  const species = (formData.species || "dog").toLowerCase();
  const results = [];

  JOYVET_KB.conditions.forEach(condition => {
    // Species filter — only process conditions that include this patient's species
    if (!condition.species.includes(species)) return;

    let score = 0;
    let matched = [];
    let total_possible = 0;

    // Score positive signals
    Object.entries(condition.signals).forEach(([signal, weight]) => {
      total_possible += weight;
      if (formData[signal]) {
        score += weight;
        matched.push(signal.replace(/_/g, " "));
      }
    });

    // Score contra-signals
    if (condition.contra_signals) {
      Object.entries(condition.contra_signals).forEach(([signal, penalty]) => {
        if (formData[signal]) {
          score += penalty; // penalty is negative
          matched.push("⚠ " + signal.replace(/_/g, " ") + " (against)");
        }
      });
    }

    // Vital sign scoring
    if (formData.temperature && formData.species) {
      const ref = JOYVET_KB.vitals_reference[species];
      if (ref) {
        const temp = parseFloat(formData.temperature);
        if (!isNaN(temp)) {
          if (temp < ref.temp.low) {
            formData.temp_low = true;
          } else if (temp > ref.temp.high) {
            formData.temp_high = true;
          }
          if (formData.temp_low && condition.signals.temp_low) {
            score += condition.signals.temp_low;
            matched.push("hypothermia");
          }
          if (formData.temp_high && condition.signals.temp_high) {
            score += condition.signals.temp_high;
            matched.push("hyperthermia");
          }
        }
      }
    }

    if (score <= 0) return;

    const pct = total_possible > 0 ? (score / total_possible) : 0;
    let confidence;
    if (pct >= 0.45) confidence = "High";
    else if (pct >= 0.25) confidence = "Medium";
    else if (pct >= 0.12) confidence = "Low";
    else return; // Not significant

    results.push({
      condition,
      score,
      pct,
      confidence,
      matched: [...new Set(matched)]
    });
  });

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 5); // Top 5 differentials
}

// ── WARNINGS ENGINE ───────────────────────────────────────────────────────────
function checkContradictions(formData) {
  const warnings = [];
  const species = (formData.species || 'dog').toLowerCase();

  // Cardiovascular
  if (formData.hydration_normal && formData.hr_high) {
    warnings.push("⚠ Normal hydration with tachycardia — reassess cardiovascular status; consider pain, fever, or early shock.");
  }
  if (formData.mm_cyanotic && !formData.complaints_dyspnea) {
    warnings.push("⚠ Cyanotic mucous membranes without reported dyspnea — verify respiratory and cardiac assessment.");
  }
  if (formData.mm_pale && formData.hr_high && formData.attitude_dull) {
    warnings.push("⚠ Pale MM + tachycardia + dull mentation — suspect hemorrhagic shock or severe anemia; prioritize stabilization.");
  }
  if (formData.mm_icteric) {
    warnings.push("ℹ Icteric (jaundiced) mucous membranes — differential includes hepatic disease, hemolytic anemia (IMHA), leptospirosis, biliary obstruction.");
  }

  // Mentation-complaint mismatch
  if (formData.attitude_bar && (formData.complaints_collapse || formData.complaints_seizures)) {
    warnings.push("⚠ BAR mentation reported with collapse/seizures — verify current mentation; animal may have recovered from episode.");
  }
  if ((formData.temp_high || formData.temp_low) && formData.attitude_bar) {
    warnings.push("ℹ Abnormal temperature with BAR mentation — early systemic illness; do not dismiss temperature reading.");
  }

  // PU/PD differential
  if (formData.complaints_polydipsia || formData.complaints_polyuria) {
    warnings.push("ℹ PU/PD noted — systematic workup: blood glucose (DM), BUN/Cr (CKD), low-dose dex suppression or UCCR (Cushing's), T4 (cats — hyperthyroidism), uterus exam in intact female (pyometra), Na:K ratio (Addison's).");
  }

  // Dysuria differential
  if (formData.complaints_dysuria || formData.complaints_hematuria) {
    if (species === 'cat' && formData.sex_male_neutered) {
      warnings.push("⚠ Male neutered cat with lower urinary signs — URETHRAL OBSTRUCTION must be ruled out immediately; palpate bladder for distension.");
    }
    if (formData.sex_female_intact && species === 'dog') {
      warnings.push("ℹ Intact female dog with urinary signs — consider pyometra (cervical discharge, lethargy, PU/PD) alongside UTI/urolithiasis.");
    }
  }

  // Emergency bleeding
  if (formData.complaints_bleeding && formData.mm_pale) {
    warnings.push("⚠ Active bleeding with pale MM — assess for thrombocytopenia (ITP/ehrlichiosis) or coagulopathy; urgent CBC + platelet count.");
  }

  // Respiratory
  if (formData.complaints_dyspnea && species === 'cat' && formData.chest_open_mouth) {
    warnings.push("⚠ Open-mouth breathing in a cat is ALWAYS abnormal — immediate O2 + minimal handling until stabilized; defer full exam.");
  }

  // Neuro + young unvaccinated dog
  if (formData.neuro_seizure && species === 'dog' && (formData.vaccine_never || formData.vaccine_overdue)) {
    warnings.push("ℹ Seizures in unvaccinated/overdue dog — include Canine Distemper Virus on differential; check vaccine history carefully.");
  }

  // Toxin ingestion
  if (formData.history_toxin_ingestion) {
    warnings.push("⚠ Suspected toxin ingestion — identify substance immediately; call poison control if needed; decontaminate only if patient is alert and within 1–2h of exposure.");
  }

  // Cat sudden hindlimb
  if (species === 'cat' && formData.gait_non_weight && formData.hpi_onset_sudden) {
    warnings.push("⚠ Cat with acute non-weight bearing — Aortic Thromboembolism (ATE) must be ruled out; check for pulse in both femoral arteries, assess limb temperature and pain.");
  }

  // Abdominal distension large dog
  if ((formData.weight_large || formData.weight_giant) && formData.abdomen_distension && formData.complaints_vomiting) {
    warnings.push("⚠ Large/giant breed dog with abdominal distension + vomiting — GASTRIC DILATATION-VOLVULUS (GDV) must be ruled out immediately; radiograph STAT.");
  }

  // Intact male dog prostate
  if (species === 'dog' && formData.sex_male_intact && (formData.complaints_dysuria || formData.complaints_diarrhea)) {
    warnings.push("ℹ Intact male dog with urinary/rectal signs — rectal palpation of prostate warranted; consider BPH, prostatitis, prostatic cysts/abscess, or carcinoma.");
  }

  return warnings;
}
