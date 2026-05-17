// Dosing engine: calculates doses ONLY from structured kb-drugs.js data — never from free text.

/**
 * calculateDose(drug, weightKg, species)
 *
 * drug: one entry from kb-drugs.js
 * weightKg: number > 0
 * species: string matching drug.species[]
 *
 * Returns:
 * {
 *   ok: true,
 *   drugId, name, route, frequency,
 *   lowDoseMg, highDoseMg,     // computed from mg/kg × weight
 *   cappedLow, cappedHigh,     // booleans — true if ceiling was hit
 *   displayLow, displayHigh,   // formatted strings e.g. "250 mg"
 *   mgPerKgBasis: "2–4 mg/kg",
 *   maxTotalMg: 500,
 *   notes,
 *   disclaimer: "Verify against current formulary before administering."
 * }
 *
 * Or on error:
 * { ok: false, error: string }
 */
export function calculateDose(drug, weightKg, species) {
  if (!drug) return { ok: false, error: 'Drug not found in formulary.' };
  if (typeof weightKg !== 'number' || weightKg <= 0 || isNaN(weightKg)) {
    return { ok: false, error: 'Valid patient weight (kg) required for dose calculation.' };
  }
  if (!drug.species.includes(species)) {
    return {
      ok: false,
      error: `${drug.name} is not listed for ${species} in the formulary. Verify species suitability.`,
    };
  }

  const raw_low = drug.mgPerKgLow * weightKg;
  const raw_high = drug.mgPerKgHigh * weightKg;
  const ceiling = drug.maxTotalMg ?? Infinity;

  const cappedLow = raw_low > ceiling;
  const cappedHigh = raw_high > ceiling;
  const lowDoseMg = Math.min(raw_low, ceiling);
  const highDoseMg = Math.min(raw_high, ceiling);

  const fmt = (mg) => {
    if (mg >= 1000) return (mg / 1000).toFixed(2).replace(/\.?0+$/, '') + ' g';
    return mg.toFixed(1).replace(/\.0$/, '') + ' mg';
  };

  return {
    ok: true,
    drugId: drug.id,
    name: drug.name,
    route: drug.route,
    frequency: drug.frequency,
    lowDoseMg,
    highDoseMg,
    cappedLow,
    cappedHigh,
    displayLow: fmt(lowDoseMg),
    displayHigh: fmt(highDoseMg),
    mgPerKgBasis: `${drug.mgPerKgLow}–${drug.mgPerKgHigh} mg/kg`,
    maxTotalMg: drug.maxTotalMg ?? null,
    notes: drug.notes ?? '',
    disclaimer: 'Verify against current formulary and patient record before administering.',
  };
}

/**
 * getDrug(drugId, kb)
 * Looks up a drug in the kb-drugs array by id.
 */
export function getDrug(drugId, kb) {
  return kb.find(d => d.id === drugId) ?? null;
}

/**
 * listDrugsForSpecies(species, kb)
 * Returns all drugs available for a given species, sorted by name.
 */
export function listDrugsForSpecies(species, kb) {
  return kb
    .filter(d => d.species.includes(species))
    .sort((a, b) => a.name.localeCompare(b.name));
}
