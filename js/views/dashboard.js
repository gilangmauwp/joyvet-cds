// Single responsibility: render the Dashboard view with quick actions and recent activity feed.

import { getRecentVisits, getPatient } from '../api.js';
import { navigate }                    from '../router.js';
import { showToast }                   from '../app.js';

/**
 * Renders the Dashboard into #app.
 * @param {object} _params - Unused route params.
 */
export async function renderDashboard(_params) {
  const app = document.getElementById('app');
  if (!app) return;

  // ── Static scaffold ───────────────────────────────────────────────────────
  app.innerHTML = `
<div class="page-header">
  <h1>Dashboard</h1>
</div>

<div class="card">
  <div class="card-header">
    <span class="card-title">Quick Actions</span>
  </div>
  <div class="dashboard-actions" style="display:flex;flex-wrap:wrap;gap:12px;">
    <button class="btn btn-primary" id="qa-new-owner" type="button">+ New Owner</button>
    <button class="btn btn-secondary" id="qa-new-patient" type="button">+ New Patient</button>
    <button class="btn btn-secondary" id="qa-new-diagnostic" type="button">+ Diagnostic Visit</button>
    <button class="btn btn-secondary" id="qa-new-wellness" type="button">+ Wellness Visit</button>
  </div>
</div>

<div class="card" style="margin-top:16px;">
  <div class="card-header">
    <span class="card-title">Recent Activity</span>
  </div>
  <div id="recent-activity">
    <div class="loading-state">
      <div class="spinner" aria-label="Loading recent visits"></div>
      <span>Loading recent visits…</span>
    </div>
  </div>
</div>`;

  // ── Quick-action wiring ───────────────────────────────────────────────────
  app.querySelector('#qa-new-owner').addEventListener('click', () => {
    navigate('#/owners?new=1');
  });
  app.querySelector('#qa-new-patient').addEventListener('click', () => {
    navigate('#/owners');
  });
  app.querySelector('#qa-new-diagnostic').addEventListener('click', () => {
    navigate('#/owners');
  });
  app.querySelector('#qa-new-wellness').addEventListener('click', () => {
    navigate('#/owners');
  });

  // ── Load recent visits ────────────────────────────────────────────────────
  const activityEl = app.querySelector('#recent-activity');

  try {
    const visits = await getRecentVisits(10);

    if (!visits || visits.length === 0) {
      activityEl.innerHTML = `
<div class="empty-state">
  <div class="empty-state-icon">📋</div>
  <h3>No visits yet</h3>
  <p>Create your first owner and patient to start recording visits.</p>
</div>`;
      return;
    }

    // Fetch patient data in parallel (deduplicated)
    const patientIds = [...new Set(visits.map(v => v.patientId).filter(Boolean))];
    const patientMap = {};
    await Promise.allSettled(
      patientIds.map(async pid => {
        try {
          const p = await getPatient(pid);
          if (p) patientMap[pid] = p;
        } catch (_) { /* patient may have been deleted */ }
      })
    );

    const rows = visits.map(visit => {
      const patient   = patientMap[visit.patientId];
      const name      = patient?.name ?? 'Unknown patient';
      const dateStr   = _formatDate(visit.date);
      const isWell    = visit.type === 'wellness';
      const badge     = isWell
        ? `<span class="badge badge-wellness">Wellness</span>`
        : `<span class="badge badge-info">Diagnostic</span>`;
      const clinician = visit.clinician ? `<span class="text-muted text-sm">${_esc(visit.clinician)}</span>` : '';

      return `<div class="timeline-item">
  <div class="timeline-dot${isWell ? ' dot-success' : ''}"></div>
  <div class="timeline-date">${dateStr}</div>
  <div class="timeline-content">
    <a href="#/visits/${visit.id}" class="font-medium">${_esc(name)}</a>
    ${badge}
    ${clinician}
  </div>
</div>`;
    }).join('');

    activityEl.innerHTML = `<div class="timeline">${rows}</div>`;

  } catch (err) {
    console.error('Dashboard: failed to load recent visits', err);
    showToast('Could not load recent activity.', 'error');
    activityEl.innerHTML = `
<div class="empty-state">
  <p>Failed to load recent visits. <button class="btn btn-sm btn-secondary" id="retry-recent" type="button">Retry</button></p>
</div>`;
    activityEl.querySelector('#retry-recent')?.addEventListener('click', () => renderDashboard({}));
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function _formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
    }).format(new Date(dateStr));
  } catch (_) {
    return dateStr;
  }
}

function _esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
