// Single responsibility: render a read-only visit record (diagnostic or wellness) with print and copy support.

import { getVisit, getPatient, getOwner } from '../api.js';
import { navigate }                        from '../router.js';
import { showToast }                       from '../app.js';
import { VITALS_RANGES }                   from '../data/kb-vitals.js';

/**
 * Renders a single visit record into #app.
 * @param {object} params
 * @param {string} params.id - Visit Firestore document ID.
 */
export async function renderVisitView(params) {
  const app = document.getElementById('app');
  if (!app) return;

  const visitId = params?.id;
  if (!visitId) { navigate('#/'); return; }

  app.innerHTML = `<div class="loading-state"><div class="spinner" aria-label="Loading visit"></div><span>Loading visit…</span></div>`;

  let visit, patient, owner;
  try {
    visit = await getVisit(visitId);
    if (!visit) throw new Error('Visit not found.');
    [patient, owner] = await Promise.all([
      getPatient(visit.patientId),
      null, // defer owner fetch until we have ownerId
    ]);
    if (patient?.ownerId) {
      owner = await getOwner(patient.ownerId);
    }
  } catch (err) {
    console.error(err);
    showToast('Failed to load visit.', 'error');
    app.innerHTML = `<div class="empty-state"><p>Visit not found. <a href="#/">Return to dashboard</a></p></div>`;
    return;
  }

  const patientName = patient?.name ?? 'Unknown patient';
  const ownerName   = owner?.name   ?? 'Unknown owner';
  const ownerId     = patient?.ownerId ?? '';
  const patientId   = visit.patientId ?? '';
  const dateStr     = _formatDate(visit.date);
  const isWell      = visit.type === 'wellness';

  // ── Breadcrumb ────────────────────────────────────────────────────────────
  const breadcrumb = `
<nav class="breadcrumb text-sm text-muted" aria-label="Breadcrumb" style="margin-bottom:12px;">
  <a href="#/owners">Owners</a> &rsaquo;
  <a href="#/owners/${ownerId}">${_esc(ownerName)}</a> &rsaquo;
  Patients &rsaquo;
  <a href="#/patients/${patientId}">${_esc(patientName)}</a> &rsaquo;
  <strong>Visit ${dateStr}</strong>
</nav>`;

  // ── Patient header ────────────────────────────────────────────────────────
  const speciesStr = patient?.species ? ` · ${_capitalize(patient.species)}` : '';
  const weightStr  = visit.weightKg   ? ` · ${visit.weightKg} kg` : '';
  const typeBadge  = isWell
    ? `<span class="badge badge-wellness">Wellness</span>`
    : `<span class="badge badge-info">Diagnostic</span>`;

  const patientHeader = `
<div class="card">
  <div class="card-header">
    <div>
      <h2 style="margin:0 0 4px;">${_esc(patientName)}</h2>
      <span class="text-muted text-sm">${_esc(ownerName)}${speciesStr}${weightStr}</span>
    </div>
    ${typeBadge}
  </div>
  <dl style="display:grid;grid-template-columns:auto 1fr;gap:4px 16px;font-size:.9rem;line-height:1.6;margin-top:8px;">
    <dt class="text-muted">Date</dt><dd>${dateStr}</dd>
    ${visit.clinician ? `<dt class="text-muted">Clinician</dt><dd>${_esc(visit.clinician)}</dd>` : ''}
    ${visit.type ? `<dt class="text-muted">Visit type</dt><dd>${_capitalize(visit.type)}</dd>` : ''}
  </dl>
</div>`;

  // ── Clinical Notes (shared) ───────────────────────────────────────────────
  const clinicalNotes = visit.notes
    ? `<div class="card" style="margin-top:16px;">
  <div class="card-header"><span class="card-title">Clinical Notes</span></div>
  <p class="text-sm" style="white-space:pre-wrap;line-height:1.7;">${_esc(visit.notes)}</p>
</div>`
    : '';

  // ── Type-specific content ─────────────────────────────────────────────────
  const typeContent = isWell
    ? _wellnessHtml(visit)
    : _diagnosticHtml(visit, patient?.species);

  // ── Action buttons ────────────────────────────────────────────────────────
  const actions = `
<div class="no-print" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
  <button class="btn btn-secondary" id="btn-back"     type="button">Back</button>
  <button class="btn btn-secondary" id="btn-print"    type="button">Print</button>
  <button class="btn btn-secondary" id="btn-copy-text" type="button">Copy as text</button>
</div>`;

  // ── Print header / disclaimer (hidden on screen) ──────────────────────────
  const printHeader = `
<div class="print-header print-show" style="display:none;" aria-hidden="true">
  <h1>JoyVet CDS — Visit Record</h1>
  <div class="clinic-info">
    Patient: ${_esc(patientName)} · Owner: ${_esc(ownerName)} · Date: ${dateStr} · Type: ${_capitalize(visit.type ?? '')}
  </div>
</div>`;

  const printDisclaimer = `
<div class="print-disclaimer print-show" style="display:none;" aria-hidden="true">
  JoyVet CDS provides clinical decision support only. All diagnoses, treatment plans, and medication doses
  are the sole responsibility of the attending veterinarian. Independently verify against current formularies
  and local clinical guidelines. This software does not replace professional veterinary judgement.
</div>`;

  // ── Assemble page ─────────────────────────────────────────────────────────
  app.innerHTML = `
${printHeader}
${breadcrumb}
${actions}
${patientHeader}
${clinicalNotes}
${typeContent}
${printDisclaimer}`;

  // ── Wire buttons ──────────────────────────────────────────────────────────
  app.querySelector('#btn-back').addEventListener('click', () => {
    navigate('#/patients/' + patientId);
  });

  app.querySelector('#btn-print').addEventListener('click', () => {
    globalThis.print();
  });

  app.querySelector('#btn-copy-text').addEventListener('click', async () => {
    const text = _buildPlainText(visit, patientName, ownerName, dateStr, patient?.species);
    try {
      await navigator.clipboard.writeText(text);
      showToast('Visit copied to clipboard.', 'success');
    } catch (_) {
      showToast('Could not copy — check browser permissions.', 'error');
    }
  });
}

// ── Diagnostic sections ───────────────────────────────────────────────────────

function _diagnosticHtml(visit, species) {
  const sections = [];

  // Anamnesis
  if (visit.chiefComplaint || visit.history) {
    sections.push(`
<div class="card" style="margin-top:16px;">
  <div class="card-header"><span class="card-title">Anamnesis</span></div>
  ${visit.chiefComplaint ? `<p class="text-sm"><strong>Chief complaint:</strong> ${_esc(visit.chiefComplaint)}</p>` : ''}
  ${visit.history ? `<p class="text-sm" style="margin-top:8px;white-space:pre-wrap;">${_esc(visit.history)}</p>` : ''}
</div>`);
  }

  // Physical exam
  if (visit.physicalExam) {
    sections.push(`
<div class="card" style="margin-top:16px;">
  <div class="card-header"><span class="card-title">Physical Examination</span></div>
  <p class="text-sm" style="white-space:pre-wrap;line-height:1.7;">${_esc(visit.physicalExam)}</p>
</div>`);
  }

  // Vitals
  if (visit.vitals && Object.keys(visit.vitals).length) {
    sections.push(_vitalsHtml(visit.vitals, species));
  }

  // Differentials
  if (Array.isArray(visit.differentials) && visit.differentials.length) {
    sections.push(_differentialsHtml(visit.differentials, visit.selectedDiagnosis));
  }

  // Treatment plan
  if (visit.treatmentPlan) {
    sections.push(`
<div class="card" style="margin-top:16px;">
  <div class="card-header"><span class="card-title">Treatment Plan</span></div>
  <p class="text-sm" style="white-space:pre-wrap;line-height:1.7;">${_esc(visit.treatmentPlan)}</p>
</div>`);
  }

  return sections.join('');
}

function _vitalsHtml(vitals, species) {
  const ranges = VITALS_RANGES[species] ?? VITALS_RANGES['dog'];

  const VITAL_DEFS = [
    { key: 'tempC',   label: 'Temperature (°C)', range: ranges.tempC,   unit: '°C'  },
    { key: 'hrBpm',   label: 'Heart rate (bpm)',  range: ranges.hrBpm,   unit: 'bpm' },
    { key: 'rrBpm',   label: 'Resp. rate (brpm)', range: ranges.rrBpm,   unit: 'brpm'},
    { key: 'spo2Pct', label: 'SpO₂ (%)',          range: ranges.spo2Pct, unit: '%'   },
    { key: 'weightKg',label: 'Weight (kg)',        range: null,           unit: 'kg'  },
    { key: 'mm',      label: 'Mucous membranes',  range: null,           unit: ''    },
    { key: 'crt',     label: 'CRT (sec)',          range: [1, 2],         unit: 's'   },
  ];

  const rows = VITAL_DEFS
    .filter(def => vitals[def.key] != null && vitals[def.key] !== '')
    .map(def => {
      const val     = vitals[def.key];
      const display = `${_esc(String(val))}${def.unit ? ' ' + def.unit : ''}`;
      let status    = '';

      if (def.range && typeof val === 'number') {
        const [lo, hi] = def.range;
        if (val < lo || val > hi) {
          status = `<span class="badge badge-warning">Abnormal</span>`;
        } else {
          status = `<span class="badge badge-success">Normal</span>`;
        }
      }

      const normalRange = def.range
        ? `${def.range[0]}–${def.range[1]} ${def.unit}`
        : '—';

      return `<tr>
  <td>${def.label}</td>
  <td><strong>${display}</strong></td>
  <td class="text-muted">${normalRange}</td>
  <td>${status}</td>
</tr>`;
    }).join('');

  if (!rows) return '';

  return `
<div class="card" style="margin-top:16px;">
  <div class="card-header"><span class="card-title">Vitals</span></div>
  <div class="table-wrapper">
    <table class="table" aria-label="Vitals">
      <thead>
        <tr>
          <th scope="col">Parameter</th>
          <th scope="col">Recorded</th>
          <th scope="col">Normal range</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
</div>`;
}

function _differentialsHtml(differentials, selectedDiagnosis) {
  const rows = differentials.map((diff, idx) => {
    const score   = diff.score ?? diff.matchStrength ?? 0;
    const total   = diff.totalSignals ?? diff.signalCount ?? '—';
    const matched = diff.matchedSignals ?? diff.matched ?? '—';
    const isSelected = selectedDiagnosis && diff.name === selectedDiagnosis;

    let strengthClass = 'match-weak';
    let strengthLabel = 'Weak';
    if (score >= 70) { strengthClass = 'match-strong';   strengthLabel = 'Strong'; }
    else if (score >= 40) { strengthClass = 'match-moderate'; strengthLabel = 'Moderate'; }

    return `<tr ${isSelected ? 'style="background:rgba(51,79,132,.06);"' : ''}>
  <td>${idx + 1}</td>
  <td>${isSelected ? `<strong>${_esc(diff.name)}</strong>` : _esc(diff.name)}</td>
  <td><span class="${strengthClass}">${strengthLabel}</span></td>
  <td>${matched} / ${total}</td>
  ${isSelected ? '<td><span class="badge badge-info">Selected</span></td>' : '<td></td>'}
</tr>`;
  });

  const selectedRow = selectedDiagnosis
    ? `<div style="margin-top:12px;padding:10px 14px;background:rgba(51,79,132,.08);border-radius:6px;font-size:.95rem;">
    <strong>Selected diagnosis:</strong> ${_esc(selectedDiagnosis)}
  </div>`
    : '';

  return `
<div class="card" style="margin-top:16px;">
  <div class="card-header"><span class="card-title">Differential Diagnoses</span></div>
  <div class="table-wrapper">
    <table class="table" aria-label="Differentials">
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Condition</th>
          <th scope="col">Signal match</th>
          <th scope="col">Signals matched</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>${rows.join('')}</tbody>
    </table>
  </div>
  ${selectedRow}
</div>`;
}

// ── Wellness sections ─────────────────────────────────────────────────────────

function _wellnessHtml(visit) {
  const sections = [];

  // BCS
  if (visit.bcs != null) {
    const bcsLabel = _bcsLabel(visit.bcs);
    sections.push(`
<div class="card" style="margin-top:16px;">
  <div class="card-header"><span class="card-title">Body Condition Score</span></div>
  <p class="text-sm">
    <strong>BCS ${visit.bcs}/9</strong> — ${bcsLabel}
  </p>
</div>`);
  }

  // Vaccinations
  if (Array.isArray(visit.vaccinations) && visit.vaccinations.length) {
    const rows = visit.vaccinations.map(v => `
<tr>
  <td>${_esc(v.name ?? v)}</td>
  <td>${_esc(v.batch ?? '—')}</td>
  <td>${_formatDate(v.nextDue)}</td>
  <td>${v.given ? '<span class="badge badge-success">Given</span>' : '<span class="badge badge-warning">Pending</span>'}</td>
</tr>`).join('');

    sections.push(`
<div class="card" style="margin-top:16px;">
  <div class="card-header"><span class="card-title">Vaccinations</span></div>
  <div class="table-wrapper">
    <table class="table" aria-label="Vaccinations">
      <thead><tr>
        <th scope="col">Vaccine</th>
        <th scope="col">Batch</th>
        <th scope="col">Next due</th>
        <th scope="col">Status</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
</div>`);
  }

  // Parasite control
  if (visit.parasiteControl) {
    sections.push(`
<div class="card" style="margin-top:16px;">
  <div class="card-header"><span class="card-title">Parasite Control</span></div>
  <p class="text-sm" style="white-space:pre-wrap;line-height:1.7;">${_esc(visit.parasiteControl)}</p>
</div>`);
  }

  // Dental
  if (visit.dentalGrade != null) {
    const labels = ['0 — No disease', '1 — Mild', '2 — Moderate', '3 — Severe'];
    sections.push(`
<div class="card" style="margin-top:16px;">
  <div class="card-header"><span class="card-title">Dental Health</span></div>
  <p class="text-sm"><strong>Grade ${visit.dentalGrade}</strong> — ${labels[visit.dentalGrade] ?? '—'}</p>
</div>`);
  }

  // Next visit / overdue
  const overdueItems = Array.isArray(visit.overdueItems) ? visit.overdueItems : [];
  if (visit.nextVisitDue || overdueItems.length) {
    sections.push(`
<div class="card" style="margin-top:16px;">
  <div class="card-header"><span class="card-title">Follow-up</span></div>
  ${visit.nextVisitDue ? `<p class="text-sm"><strong>Next visit due:</strong> ${_formatDate(visit.nextVisitDue)}</p>` : ''}
  ${overdueItems.length ? `
  <div style="margin-top:10px;">
    <strong class="text-sm">Overdue items:</strong>
    <ul style="margin:6px 0 0 16px;font-size:.875rem;line-height:1.8;">
      ${overdueItems.map(i => `<li>${_esc(typeof i === 'string' ? i : i.name ?? JSON.stringify(i))}</li>`).join('')}
    </ul>
  </div>` : ''}
</div>`);
  }

  return sections.join('');
}

// ── Plain-text copy builder ───────────────────────────────────────────────────

function _buildPlainText(visit, patientName, ownerName, dateStr, species) {
  const lines = [];
  const hr = '─'.repeat(48);

  lines.push('JOYVET CDS — VISIT RECORD');
  lines.push(hr);
  lines.push(`Patient  : ${patientName}`);
  lines.push(`Owner    : ${ownerName}`);
  lines.push(`Date     : ${dateStr}`);
  lines.push(`Type     : ${_capitalize(visit.type ?? 'Unknown')}`);
  if (visit.clinician) lines.push(`Clinician: ${visit.clinician}`);
  lines.push('');

  if (visit.notes) {
    lines.push('CLINICAL NOTES');
    lines.push(visit.notes);
    lines.push('');
  }

  if (visit.type === 'diagnostic') {
    if (visit.chiefComplaint) { lines.push('CHIEF COMPLAINT'); lines.push(visit.chiefComplaint); lines.push(''); }
    if (visit.history)        { lines.push('HISTORY'); lines.push(visit.history); lines.push(''); }
    if (visit.physicalExam)   { lines.push('PHYSICAL EXAM'); lines.push(visit.physicalExam); lines.push(''); }

    if (visit.vitals && Object.keys(visit.vitals).length) {
      lines.push('VITALS');
      for (const [k, v] of Object.entries(visit.vitals)) {
        if (v != null && v !== '') lines.push(`  ${k}: ${v}`);
      }
      lines.push('');
    }

    if (Array.isArray(visit.differentials) && visit.differentials.length) {
      lines.push('DIFFERENTIALS');
      visit.differentials.forEach((d, i) => {
        lines.push(`  ${i + 1}. ${d.name}`);
      });
      if (visit.selectedDiagnosis) {
        lines.push('');
        lines.push(`SELECTED DIAGNOSIS: ${visit.selectedDiagnosis}`);
      }
      lines.push('');
    }

    if (visit.treatmentPlan) { lines.push('TREATMENT PLAN'); lines.push(visit.treatmentPlan); lines.push(''); }
  }

  if (visit.type === 'wellness') {
    if (visit.bcs != null) { lines.push(`BCS: ${visit.bcs}/9 — ${_bcsLabel(visit.bcs)}`); lines.push(''); }

    if (Array.isArray(visit.vaccinations) && visit.vaccinations.length) {
      lines.push('VACCINATIONS');
      visit.vaccinations.forEach(v => {
        lines.push(`  ${v.name ?? v} — ${v.given ? 'Given' : 'Pending'}`);
      });
      lines.push('');
    }

    if (visit.parasiteControl)  { lines.push('PARASITE CONTROL'); lines.push(visit.parasiteControl); lines.push(''); }
    if (visit.dentalGrade != null) { lines.push(`DENTAL GRADE: ${visit.dentalGrade}`); lines.push(''); }
    if (visit.nextVisitDue) { lines.push(`NEXT VISIT DUE: ${_formatDate(visit.nextVisitDue)}`); lines.push(''); }
  }

  lines.push(hr);
  lines.push('JoyVet CDS provides clinical decision support only. All diagnoses and treatment plans are');
  lines.push('the sole responsibility of the attending veterinarian. Verify independently.');

  return lines.join('\n');
}

// ── Utility helpers ───────────────────────────────────────────────────────────

function _formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Intl.DateTimeFormat('en-GB', { day:'2-digit', month:'short', year:'numeric' })
      .format(new Date(dateStr));
  } catch (_) { return dateStr; }
}

function _capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function _bcsLabel(score) {
  const n = parseInt(score, 10);
  if (n <= 2) return 'Severely underweight';
  if (n === 3) return 'Underweight';
  if (n === 4) return 'Slightly underweight';
  if (n === 5) return 'Ideal';
  if (n === 6) return 'Slightly overweight';
  if (n === 7) return 'Overweight';
  if (n >= 8)  return 'Obese';
  return '—';
}

function _esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
