// Single responsibility: render the Settings view with backup, app info, and disclaimer sections.

import { exportAll, importAll } from '../backup.js';
import { APP_VERSION }          from '../config.js';
import { showToast }            from '../app.js';

// kb-conditions.js may not exist yet — graceful fallback.
let CONDITIONS = null;
let KB_VERSION = 'N/A';
try {
  const kb = await import('../data/kb-conditions.js');
  CONDITIONS = kb.CONDITIONS ?? null;
  KB_VERSION = kb.KB_VERSION ?? 'N/A';
} catch (_) { /* module not yet present */ }

/**
 * Renders the Settings view into #app.
 * @param {object} _params - Unused route params.
 */
export async function renderSettings(_params) {
  const app = document.getElementById('app');
  if (!app) return;

  const conditionCount = Array.isArray(CONDITIONS) ? CONDITIONS.length : '—';

  app.innerHTML = `
<div class="page-header">
  <h1>Settings</h1>
</div>

<!-- KB & App Info -->
<div class="card">
  <div class="card-header">
    <span class="card-title">Knowledge Base &amp; App Info</span>
  </div>
  <dl style="display:grid;grid-template-columns:auto 1fr;gap:6px 16px;font-size:.9rem;line-height:1.6;">
    <dt class="text-muted">App Version</dt>
    <dd><strong>${_esc(APP_VERSION)}</strong></dd>
    <dt class="text-muted">KB Version</dt>
    <dd><strong>${_esc(String(KB_VERSION))}</strong></dd>
    <dt class="text-muted">Conditions in KB</dt>
    <dd><strong>${conditionCount}</strong></dd>
  </dl>
</div>

<!-- Backup -->
<div class="card" style="margin-top:16px;">
  <div class="card-header">
    <span class="card-title">Backup &amp; Restore</span>
  </div>
  <p class="text-sm text-muted" style="margin-bottom:12px;">
    Export all owners, patients, and visits to a JSON file. Keep copies off-site (weekly minimum recommended).
  </p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
    <button class="btn btn-primary" id="btn-export" type="button">Export all data</button>
    <button class="btn btn-secondary" id="btn-import-trigger" type="button">Import / Restore</button>
    <input type="file" id="import-file-input" accept=".json"
      aria-label="Select backup JSON file to import"
      style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;">
  </div>
  <div id="backup-status" style="margin-top:12px;" aria-live="polite"></div>
</div>

<!-- Clinical Disclaimer -->
<div class="card" style="margin-top:16px;border-left:4px solid #334f84;">
  <div class="card-header">
    <span class="card-title">Clinical Disclaimer</span>
  </div>
  <p class="text-sm" style="line-height:1.7;">
    JoyVet CDS provides clinical decision support only. All diagnoses, treatment plans, and medication doses
    are the sole responsibility of the attending veterinarian and must be independently verified against
    current formularies and local clinical guidelines. This software does not replace professional
    veterinary judgement.
  </p>
</div>

<!-- Open-Access Notice -->
<div class="card" style="margin-top:16px;border-left:4px solid #e67e22;">
  <div class="card-header">
    <span class="card-title">Open-Access Database Notice</span>
  </div>
  <p class="text-sm" style="line-height:1.7;">
    This application's database is publicly accessible. Anyone with the Firebase project ID can read or
    write records. Maintain regular backups (weekly minimum). See the README for scheduled backup setup.
  </p>
</div>`;

  // ── Export ──────────────────────────────────────────────────────────────
  const exportBtn   = app.querySelector('#btn-export');
  const statusEl    = app.querySelector('#backup-status');

  exportBtn.addEventListener('click', async () => {
    exportBtn.disabled   = true;
    exportBtn.textContent = 'Exporting…';
    statusEl.innerHTML   = `<div class="loading-state"><div class="spinner spinner-sm" aria-label="Exporting"></div><span>Building export…</span></div>`;
    try {
      const result = await exportAll();
      showToast('Export complete. File downloaded.', 'success');
      statusEl.innerHTML = `
<div class="text-sm" style="color:var(--c-success);">
  Export saved — ${result.owners} owner${result.owners !== 1 ? 's' : ''},
  ${result.patients} patient${result.patients !== 1 ? 's' : ''},
  ${result.visits} visit${result.visits !== 1 ? 's' : ''}.
</div>`;
    } catch (err) {
      console.error(err);
      showToast('Export failed. Please try again.', 'error');
      statusEl.innerHTML = `<p class="text-sm text-danger">Export failed: ${_esc(err?.message ?? String(err))}</p>`;
    } finally {
      exportBtn.disabled   = false;
      exportBtn.textContent = 'Export all data';
    }
  });

  // ── Import ──────────────────────────────────────────────────────────────
  const importTrigger = app.querySelector('#btn-import-trigger');
  const fileInput     = app.querySelector('#import-file-input');

  importTrigger.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    fileInput.value = ''; // reset so same file can be re-picked

    importTrigger.disabled   = true;
    importTrigger.textContent = 'Importing…';
    statusEl.innerHTML = `<div class="loading-state"><div class="spinner spinner-sm" aria-label="Importing"></div><span>Importing…</span></div>`;

    try {
      const text   = await file.text();
      const result = await importAll(text);
      const { imported, skipped } = result;
      showToast(
        `Import complete — ${imported.owners + imported.patients + imported.visits} records imported.`,
        'success'
      );
      statusEl.innerHTML = `
<div class="text-sm" style="color:var(--c-success);line-height:1.7;">
  Import complete.<br>
  Imported: ${imported.owners} owner${imported.owners !== 1 ? 's' : ''},
  ${imported.patients} patient${imported.patients !== 1 ? 's' : ''},
  ${imported.visits} visit${imported.visits !== 1 ? 's' : ''}.<br>
  <span class="text-muted">Skipped (already exist):
  ${skipped.owners} owner${skipped.owners !== 1 ? 's' : ''},
  ${skipped.patients} patient${skipped.patients !== 1 ? 's' : ''},
  ${skipped.visits} visit${skipped.visits !== 1 ? 's' : ''}.
  </span>
</div>`;
    } catch (err) {
      console.error(err);
      showToast(`Import failed: ${err?.message ?? 'Unknown error'}`, 'error');
      statusEl.innerHTML = `<p class="text-sm text-danger">Import failed: ${_esc(err?.message ?? String(err))}</p>`;
    } finally {
      importTrigger.disabled   = false;
      importTrigger.textContent = 'Import / Restore';
    }
  });
}

function _esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
