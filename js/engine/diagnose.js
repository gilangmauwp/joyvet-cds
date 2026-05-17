// Diagnostic engine: pure functions only — no DOM, no storage, no side effects.

import { VITALS_RANGES } from '../data/kb-vitals.js';

// Prevalence priors adjust the base score before signal matching.
// Horses before zebras: common conditions start with an advantage.
const PREVALENCE_PRIOR = {
  common: 15,
  uncommon: 0,
  rare: -10,
};

// Score thresholds for match-strength label (never called "confidence").
const STRENGTH_LABELS = {
  STRONG: 'Strong signal match',
  MODERATE: 'Moderate signal match',
  WEAK: 'Weak signal match',
};

/**
 * Compute vital-sign flags from raw vitals + species reference ranges.
 * Returns a flat object of booleans and severity grades (0–3).
 * 0 = normal, 1 = mild deviation, 2 = moderate, 3 = severe.
 */
export function computeVitalFlags(vitals, species) {
  const ranges = VITALS_RANGES[species] || VITALS_RANGES.dog;
  const flags = {};

  if (vitals.tempC != null) {
    const t = parseFloat(vitals.tempC);
    if (!isNaN(t)) {
      const lo = ranges.tempC[0], hi = ranges.tempC[1];
      if (t < lo) {
        const diff = lo - t;
        flags.tempLow = true;
        flags.tempLowGrade = diff > 2 ? 3 : diff > 1 ? 2 : 1;
      } else if (t > hi) {
        const diff = t - hi;
        flags.tempHigh = true;
        flags.tempHighGrade = diff > 2 ? 3 : diff > 1 ? 2 : 1;
      }
    }
  }

  if (vitals.hrBpm != null) {
    const hr = parseFloat(vitals.hrBpm);
    if (!isNaN(hr)) {
      const lo = ranges.hrBpm[0], hi = ranges.hrBpm[1];
      if (hr < lo) {
        flags.hrLow = true;
        flags.hrLowGrade = (lo - hr) > 40 ? 3 : (lo - hr) > 20 ? 2 : 1;
      } else if (hr > hi) {
        flags.hrHigh = true;
        flags.hrHighGrade = (hr - hi) > 60 ? 3 : (hr - hi) > 30 ? 2 : 1;
      }
    }
  }

  if (vitals.rrBpm != null) {
    const rr = parseFloat(vitals.rrBpm);
    if (!isNaN(rr)) {
      const lo = ranges.rrBpm[0], hi = ranges.rrBpm[1];
      if (rr < lo) {
        flags.rrLow = true;
        flags.rrLowGrade = 1;
      } else if (rr > hi) {
        flags.rrHigh = true;
        flags.rrHighGrade = (rr - hi) > 20 ? 3 : (rr - hi) > 10 ? 2 : 1;
      }
    }
  }

  if (vitals.spo2Pct != null) {
    const sp = parseFloat(vitals.spo2Pct);
    if (!isNaN(sp)) {
      if (sp < 90) { flags.spo2Critical = true; flags.spo2Low = true; }
      else if (sp < 95) { flags.spo2Low = true; }
    }
  }

  if (vitals.mmColor) {
    flags['mm_' + vitals.mmColor] = true;  // e.g. mm_pale, mm_icteric, mm_cyanotic
  }

  if (vitals.crtSec != null) {
    const crt = parseFloat(vitals.crtSec);
    if (!isNaN(crt)) {
      if (crt > 2) flags.crtSlow = true;
      if (crt < 1) flags.crtFast = true;
    }
  }

  return flags;
}

/**
 * Build a flat signal map from the structured visit data.
 * Merges: anamnesis signals + physical exam signals + derived vital flags.
 * This is computed ONCE before scoring; the scoring loop never mutates it.
 */
export function buildSignalMap(visitData, vitalFlags) {
  // visitData.signals is a flat {key: true} map already assembled by the visit form.
  // vitalFlags come from computeVitalFlags().
  return { ...visitData.signals, ...vitalFlags };
}

/**
 * Score one condition against the current signal map.
 * Returns null if species mismatch.
 */
function scoreCondition(condition, signalMap, species) {
  if (condition.species && !condition.species.includes(species)) return null;

  let score = PREVALENCE_PRIOR[condition.prevalence] ?? 0;
  const matchedSignals = [];
  const contraMatchedSignals = [];

  // --- Regular signals ---
  for (const [key, weight] of Object.entries(condition.signals || {})) {
    if (signalMap[key]) {
      score += weight;
      matchedSignals.push({ key, weight, type: 'signal' });
    }
  }

  // --- Pathognomonic signals — single match lifts score to strong regardless ---
  // Each pathognomonic key carries a very high weight (e.g. 35).
  for (const [key, weight] of Object.entries(condition.pathognomonic || {})) {
    if (signalMap[key]) {
      score += weight;
      matchedSignals.push({ key, weight, type: 'pathognomonic' });
    }
  }

  // --- Contra-signals carry real negative weight ---
  for (const [key, weight] of Object.entries(condition.contraSignals || {})) {
    if (signalMap[key]) {
      score += weight; // weight is already negative in the data
      contraMatchedSignals.push({ key, weight, type: 'contra' });
    }
  }

  // Graded vital contributions: severity grade multiplies the vital weight.
  for (const [key, weight] of Object.entries(condition.vitalSignals || {})) {
    const gradeKey = key + 'Grade';
    if (signalMap[key]) {
      const grade = signalMap[gradeKey] ?? 1;
      const graded = weight * grade;
      score += graded;
      matchedSignals.push({ key, weight: graded, type: 'vital' });
    }
  }

  return { score, matchedSignals, contraMatchedSignals };
}

/**
 * Assign a match-strength label from a raw score.
 * Thresholds are relative to achievable signal weights; calibrated empirically.
 */
function strengthLabel(score) {
  if (score >= 40) return STRENGTH_LABELS.STRONG;
  if (score >= 20) return STRENGTH_LABELS.MODERATE;
  return STRENGTH_LABELS.WEAK;
}

/**
 * Main entry point — pure function.
 *
 * diagnose(visitData, kb) → ranked array of differentials.
 *
 * visitData shape:
 *   { species: 'dog'|'cat'|..., signals: {key:true,...},
 *     vitals: { tempC, hrBpm, rrBpm, spo2Pct, mmColor, crtSec } }
 *
 * kb: array of condition objects from kb-conditions.js
 *
 * Returns: [
 *   { conditionId, name, score, matchStrength, matchedSignals, contraMatchedSignals,
 *     emergency, category }
 * ] sorted by score desc, max 20 results with score > 0.
 */
export function diagnose(visitData, kb) {
  const species = visitData.species || 'dog';

  // Step 1: derive vital flags ONCE, before any scoring.
  const vitalFlags = computeVitalFlags(visitData.vitals || {}, species);

  // Step 2: build the immutable signal map.
  const signalMap = buildSignalMap(visitData, vitalFlags);

  // Step 3: score every condition — do not mutate visitData or signalMap.
  const results = [];
  for (const condition of kb) {
    const scored = scoreCondition(condition, signalMap, species);
    if (scored === null) continue; // species mismatch
    if (scored.score <= 0) continue; // no positive signal contribution

    results.push({
      conditionId: condition.id,
      name: condition.name,
      category: condition.category,
      emergency: condition.emergency ?? false,
      score: scored.score,
      matchStrength: strengthLabel(scored.score),
      matchedSignals: scored.matchedSignals,
      contraMatchedSignals: scored.contraMatchedSignals,
      tests: condition.tests,
      treatment: condition.treatment,
      clientEducation: condition.clientEducation,
    });
  }

  // Step 4: sort by score descending; emergencies bubble to top within their score band.
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.emergency && !b.emergency) return -1;
    if (!a.emergency && b.emergency) return 1;
    return 0;
  });

  return results.slice(0, 20);
}
