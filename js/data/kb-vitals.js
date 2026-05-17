/**
 * kb-vitals.js
 * Species vital-sign reference ranges for the JoyVet CDS diagnostic engine.
 * Pure data module — no Firebase, no DOM.
 */

// Normal vital-sign ranges per species.
// Each range is [min, max] (inclusive).
// tempC: degrees Celsius
// hrBpm: heart rate in beats per minute
// rrBpm: respiratory rate in breaths per minute
// spo2Pct: peripheral oxygen saturation %
export const VITALS_RANGES = {
  dog: {
    tempC:   [37.5, 39.2],
    hrBpm:   [60, 140],
    rrBpm:   [10, 30],
    spo2Pct: [95, 100],
  },
  cat: {
    tempC:   [38.0, 39.5],
    hrBpm:   [120, 220],
    rrBpm:   [15, 40],
    spo2Pct: [95, 100],
  },
  rabbit: {
    tempC:   [38.5, 40.0],
    hrBpm:   [130, 325],
    rrBpm:   [30, 60],
    spo2Pct: [95, 100],
  },
  bird: {
    tempC:   [40.0, 42.0],
    hrBpm:   [200, 400],
    rrBpm:   [15, 50],
    spo2Pct: [95, 100],
  },
  exotic: {
    tempC:   [37.0, 40.0],
    hrBpm:   [60, 200],
    rrBpm:   [10, 40],
    spo2Pct: [94, 100],
  },
};

// Fall back to dog ranges for unknown species.
export const DEFAULT_SPECIES = 'dog';

// Mucous membrane color codes mapped to clinical significance.
// Key: short code used in UI/engine; Value: human-readable clinical interpretation.
export const MM_COLORS = {
  pink_moist: 'Normal (pink, moist)',
  pale:       'Pale — anaemia, shock, poor perfusion',
  white:      'White — severe anaemia or shock',
  icteric:    'Icteric (jaundiced) — hepatic/haemolytic',
  cyanotic:   'Cyanotic (blue) — hypoxia',
  brick_red:  'Brick red / hyperaemic — early sepsis, CO poisoning',
  muddy:      'Muddy/grey — severe shock, endotoxaemia',
};
