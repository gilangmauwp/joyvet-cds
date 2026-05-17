// Single responsibility: full JSON export/import of all Firestore data and overdue-backup banner check.

import {
  getOwners,
  getAllPatients,
  getVisits,
  saveOwner,
  savePatient,
  saveVisit,
  getMeta,
  setMeta,
} from './api.js';
import { BACKUP_INTERVAL_DAYS } from './config.js';

const JOYVET_VERSION = '2';
const LS_KEY = 'joyvet_last_backup';

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

/**
 * Fetches all owners, patients, and visits; packages them as a dated JSON file
 * and triggers a browser download. Also stamps lastBackupAt in Firestore meta
 * and localStorage.
 */
export async function exportAll() {
  // 1. Fetch all top-level collections
  const owners   = await getOwners();
  const patients = await getAllPatients();

  // 2. Fetch visits for every patient (in parallel, batched to avoid overwhelming Firestore)
  const BATCH = 10;
  const allVisits = [];
  for (let i = 0; i < patients.length; i += BATCH) {
    const slice = patients.slice(i, i + BATCH);
    const results = await Promise.all(slice.map(p => getVisits(p.id)));
    results.forEach(vList => allVisits.push(...vList));
  }

  // 3. Build payload
  const exportedAt = new Date().toISOString();
  const payload = {
    joyvetVersion: JOYVET_VERSION,
    exportedAt,
    owners,
    patients,
    visits: allVisits,
  };

  // 4. Trigger download
  const json     = JSON.stringify(payload, null, 2);
  const dateStr  = exportedAt.slice(0, 10); // YYYY-MM-DD
  const filename = `joyvet-backup-${dateStr}.json`;
  _triggerDownload(json, filename);

  // 5. Stamp timestamps
  await setMeta('lastBackupAt', exportedAt);
  try { localStorage.setItem(LS_KEY, exportedAt); } catch (_) { /* storage blocked */ }

  return { owners: owners.length, patients: patients.length, visits: allVisits.length };
}

/** Creates a temporary <a> and clicks it to download a JSON file. */
function _triggerDownload(json, filename) {
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  // Clean up asynchronously
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 1000);
}

// ---------------------------------------------------------------------------
// Import
// ---------------------------------------------------------------------------

/**
 * Parses a JSON string from a backup file and merges its contents into Firestore.
 * Existing docs (matched by id) are skipped — newer local data is preserved.
 * Returns a summary: { imported, skipped } each with { owners, patients, visits } counts.
 *
 * @param {string} jsonString - Raw JSON content of a backup file.
 */
export async function importAll(jsonString) {
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err) {
    throw new Error('Backup file is not valid JSON.');
  }

  if (parsed.joyvetVersion !== JOYVET_VERSION) {
    throw new Error(
      `Incompatible backup version "${parsed.joyvetVersion}". Expected "${JOYVET_VERSION}".`
    );
  }

  const { owners = [], patients = [], visits = [] } = parsed;

  const summary = {
    imported: { owners: 0, patients: 0, visits: 0 },
    skipped:  { owners: 0, patients: 0, visits: 0 },
  };

  // --- Owners ---
  const existingOwnerIds = new Set((await getOwners()).map(o => o.id));
  for (const owner of owners) {
    if (owner.id && existingOwnerIds.has(owner.id)) {
      summary.skipped.owners++;
    } else {
      await saveOwner(owner);
      summary.imported.owners++;
    }
  }

  // --- Patients ---
  const existingPatientIds = new Set((await getAllPatients()).map(p => p.id));
  for (const patient of patients) {
    if (patient.id && existingPatientIds.has(patient.id)) {
      summary.skipped.patients++;
    } else {
      await savePatient(patient);
      summary.imported.patients++;
    }
  }

  // --- Visits ---
  // We don't have a getVisit-by-list helper, so we check per patient's existing visits.
  // Build a set of all known visit ids by fetching visits for every patient we just imported.
  // For large datasets this could be slow; we use a local seen-set built during the loop.
  const seenVisitIds = new Set();

  // Collect existing visit ids from patients that existed before import
  const existingPatients = await getAllPatients();
  const BATCH = 10;
  for (let i = 0; i < existingPatients.length; i += BATCH) {
    const slice = existingPatients.slice(i, i + BATCH);
    const results = await Promise.all(slice.map(p => getVisits(p.id)));
    results.forEach(vList => vList.forEach(v => seenVisitIds.add(v.id)));
  }

  for (const visit of visits) {
    if (visit.id && seenVisitIds.has(visit.id)) {
      summary.skipped.visits++;
    } else {
      await saveVisit(visit);
      summary.imported.visits++;
    }
  }

  return summary;
}

// ---------------------------------------------------------------------------
// Overdue-backup reminder
// ---------------------------------------------------------------------------

/**
 * Checks whether a backup is overdue and shows the #backup-banner element if so.
 * Uses whichever timestamp is newer: localStorage or the Firestore meta record.
 */
export async function checkBackupOverdue() {
  const intervalMs = BACKUP_INTERVAL_DAYS * 24 * 60 * 60 * 1000;
  const now = Date.now();

  // Read localStorage timestamp (synchronous)
  let lsTimestamp = null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) lsTimestamp = new Date(raw).getTime();
  } catch (_) { /* storage blocked */ }

  // Read Firestore meta timestamp (async, best-effort)
  let metaTimestamp = null;
  try {
    const raw = await getMeta('lastBackupAt');
    if (raw) metaTimestamp = new Date(raw).getTime();
  } catch (_) { /* Firestore offline or missing */ }

  // Use the most recent of the two
  const candidates = [lsTimestamp, metaTimestamp].filter(t => t !== null && !isNaN(t));
  const lastBackup = candidates.length > 0 ? Math.max(...candidates) : null;

  const overdue = lastBackup === null || (now - lastBackup) > intervalMs;

  const banner = document.getElementById('backup-banner');
  if (banner) {
    banner.hidden = !overdue;
  }

  return overdue;
}
