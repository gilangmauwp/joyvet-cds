// Single responsibility: scrollable single-page wellness visit form with preventive care tracking.

import { getPatient, saveVisit } from '../api.js';
import { navigate }               from '../router.js';
import { showToast }              from '../app.js';
import {
  BCS_SCALE, DENTAL_GRADES, VACCINE_SCHEDULES, RER_FORMULA,
} from '../data/kb-wellness.js';

const MCS_OPTIONS = [
  { value: 'normal',        label: 'Normal — No muscle loss' },
  { value: 'mild_loss',     label: 'Mild loss — Mild wasting over epaxial muscles, scapulae, skull, or wings of ilia' },
  { value: 'moderate_loss', label: 'Moderate loss — Moderate muscle wasting' },
  { value: 'severe_loss',   label: 'Severe loss — Severe muscle wasting' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function _esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function _todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function _addMonths(dateStr, n) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  d.setMonth(d.getMonth() + n);
  return d.toISOString().slice(0, 10);
}

/** Age in months from DOB to today. Returns null if DOB invalid. */
function _ageMonths(dob) {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth)) return null;
  const now = new Date();
  return (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
}

/** Returns { label, badge, care } */
function _lifeStageInfo(ageMonths) {
  if (ageMonths === null) return { label: 'Unknown', badge: 'badge-info', care: 'Date of birth not set — life-stage care cannot be determined.' };
  if (ageMonths < 6)   return { stage: 'puppy_kitten',  label: 'Puppy / Kitten',  badge: 'badge-warning', care: 'Rapid growth phase. High-frequency preventive care, vaccination series, parasite monitoring.' };
  if (ageMonths < 18)  return { stage: 'junior',        label: 'Junior',          badge: 'badge-info',    care: 'Growth continues. Vaccination boosters due. Consider neutering discussion.' };
  if (ageMonths < 84)  return { stage: 'adult',         label: 'Adult',           badge: 'badge-success', care: 'Annual wellness screen recommended. Monitor weight and dental health.' };
  if (ageMonths < 120) return { stage: 'senior',        label: 'Senior',          badge: 'badge-warning', care: 'Bi-annual wellness visits recommended. Geriatric bloodwork (CBC/Chemistry/UA) advised.' };
  return                      { stage: 'geriatric',     label: 'Geriatric',       badge: 'badge-danger',  care: 'Enhanced monitoring. Pain assessment, cognitive function, and organ function screening recommended.' };
}

/** Compute RER and MER. Factor selected from life stage + neuter status. */
function _computeEnergy(weightKg, ageMonths, neutered) {
  if (!weightKg || weightKg <= 0) return null;
  const rer = Math.round(70 * Math.pow(weightKg, 0.75));
  let factor, factorLabel;
  if (ageMonths !== null && ageMonths < 6) {
    factor = RER_FORMULA.factors.puppy_lt4mo; factorLabel = 'Puppy/Kitten';
  } else if (ageMonths !== null && ageMonths < 18) {
    factor = RER_FORMULA.factors.puppy_4to12mo; factorLabel = 'Junior';
  } else if (neutered) {
    factor = RER_FORMULA.factors.neutered_adult; factorLabel = 'Neutered adult';
  } else {
    factor = RER_FORMULA.factors.intact_adult; factorLabel = 'Intact adult';
  }
  const mer = Math.round(rer * factor);
  return { rer, mer, factor, factorLabel };
}

/** Check if a date string is more than N months in the past. */
function _isOverdueByMonths(dateStr, months) {
  if (!dateStr) return true;
  const d = new Date(dateStr);
  if (isNaN(d)) return true;
  const threshold = new Date();
  threshold.setMonth(threshold.getMonth() - months);
  return d < threshold;
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function renderWellnessVisit(params) {
  const app = document.getElementById('app');
  if (!app) return;

  const patientId = params?.patientId;
  if (!patientId) { navigate('#/patients'); return; }

  app.innerHTML = `<div class="loading-state"><div class="spinner" aria-label="Loading"></div><span>Loading patient…</span></div>`;

  let patient;
  try {
    patient = await getPatient(patientId);
    if (!patient) throw new Error('Patient not found.');
  } catch (err) {
    showToast('Failed to load patient.', 'error');
    app.innerHTML = `<div class="empty-state"><p>Patient not found. <a href="#/patients">Back</a></p></div>`;
    return;
  }

  const ageMonths  = _ageMonths(patient.dateOfBirth);
  const lifeStage  = _lifeStageInfo(ageMonths);
  const species    = patient.species ?? 'dog';
  const scheduleKey = (species === 'cat') ? 'cat' : (species === 'rabbit') ? 'rabbit' : 'dog';
  const vaccines   = VACCINE_SCHEDULES[scheduleKey] ?? { core: [], nonCore: [] };
  const allVaccines = [...(vaccines.core ?? []), ...(vaccines.nonCore ?? [])];

  // Build vaccine rows HTML
  const vaccineRows = allVaccines.map(v => `
<div class="vaccine-row" data-vaccine="${_esc(v.name)}" style="border:1px solid rgba(26,45,80,.1);border-radius:6px;padding:12px 14px;margin-bottom:10px;">
  <div class="flex items-center gap-2" style="margin-bottom:8px;flex-wrap:wrap;">
    <strong class="text-sm">${_esc(v.name)}</strong>
    ${v.wsava ? `<span class="badge badge-info text-sm">${_esc(v.wsava)}</span>` : ''}
  </div>
  <p class="text-sm text-muted" style="margin:0 0 8px;">${_esc(v.schedule ?? v.intervalNote ?? '')}</p>
  ${v.notes ? `<p class="text-sm" style="margin:0 0 8px;color:var(--c-warning);">${_esc(v.notes)}</p>` : ''}
  <div class="form-row" style="margin-bottom:0;">
    <label class="checkbox-label" style="display:flex;align-items:center;gap:6px;cursor:pointer;grid-column:1/-1;margin-bottom:8px;">
      <input type="checkbox" data-vax-given="${_esc(v.name)}"> <span class="text-sm">Given today</span>
    </label>
    <div class="field" style="margin-bottom:0;">
      <label style="font-size:.8rem;">Date given</label>
      <input type="date" data-vax-date="${_esc(v.name)}" value="${_todayISO()}">
    </div>
    <div class="field" style="margin-bottom:0;">
      <label style="font-size:.8rem;">Lot number</label>
      <input type="text" data-vax-lot="${_esc(v.name)}" placeholder="Lot / batch number">
    </div>
  </div>
</div>`).join('');

  // BCS radio buttons
  const bcsRadios = BCS_SCALE.map(b => `
<label class="bcs-option" style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;border-radius:5px;cursor:pointer;border:1px solid rgba(26,45,80,.1);margin-bottom:4px;">
  <input type="radio" name="bcs" value="${b.score}" style="margin-top:3px;flex-shrink:0;">
  <div>
    <strong class="text-sm">${b.score} — ${_esc(b.label)}</strong>
    <p class="text-sm text-muted" style="margin:2px 0 0;">${_esc(b.description)}</p>
  </div>
</label>`).join('');

  // MCS select options
  const mcsOptions = MCS_OPTIONS.map(m =>
    `<option value="${_esc(m.value)}">${_esc(m.label)}</option>`
  ).join('');

  // Dental grade options
  const dentalOptions = DENTAL_GRADES.map(d =>
    `<option value="${_esc(d.grade)}">${_esc(d.label)}</option>`
  ).join('');

  const nextVisitDefault = _addMonths(_todayISO(), 6);

  app.innerHTML = `
<nav class="breadcrumb text-sm text-muted" style="margin-bottom:12px;">
  <a href="#/patients/${_esc(patient.id)}">${_esc(patient.name)}</a> &rsaquo; New Wellness Visit
</nav>

<div class="page-header">
  <h1 style="font-size:1.3rem;">Wellness Visit — ${_esc(patient.name)}</h1>
  <span class="badge badge-wellness">Wellness</span>
</div>

<!-- Patient Context -->
<section class="card" style="margin-bottom:14px;">
  <h2 style="font-size:1rem;margin-top:0;">Patient Context</h2>
  <div class="form-row">
    <div class="field">
      <label for="wv-weight">Weight (kg)</label>
      <input type="number" id="wv-weight" min="0.1" step="0.01" placeholder="e.g. 8.5">
    </div>
    <div class="field">
      <label for="wv-clinician">Clinician</label>
      <input type="text" id="wv-clinician" placeholder="Clinician name">
    </div>
    <div class="field">
      <label for="wv-date">Visit Date</label>
      <input type="date" id="wv-date" value="${_todayISO()}">
    </div>
  </div>
</section>

<!-- Life Stage -->
<section class="card" style="margin-bottom:14px;">
  <h2 style="font-size:1rem;margin-top:0;">Life Stage</h2>
  <div class="flex items-center gap-3" style="margin-bottom:8px;">
    <span class="badge ${lifeStage.badge}">${_esc(lifeStage.label)}</span>
    ${ageMonths !== null ? `<span class="text-sm text-muted">(${Math.floor(ageMonths / 12)} yr${ageMonths >= 12 ? 's' : ''} ${ageMonths % 12} mo)</span>` : ''}
  </div>
  <p class="text-sm" style="margin:0;">${_esc(lifeStage.care)}</p>
</section>

<!-- Body Condition Score -->
<section class="card" style="margin-bottom:14px;">
  <h2 style="font-size:1rem;margin-top:0;">Body Condition Score (BCS)</h2>
  <p class="text-sm text-muted" style="margin-bottom:12px;">WSAVA Body Condition Score 1–9 scale. Score 4–5 is ideal for most species.</p>
  <fieldset style="border:none;padding:0;">
    <legend class="text-sm" style="font-weight:600;margin-bottom:8px;">Select BCS:</legend>
    ${bcsRadios}
  </fieldset>
</section>

<!-- Muscle Condition Score -->
<section class="card" style="margin-bottom:14px;">
  <h2 style="font-size:1rem;margin-top:0;">Muscle Condition Score (MCS)</h2>
  <p class="text-sm text-muted" style="margin-bottom:12px;">WSAVA Muscle Condition Score — assessed over epaxial muscles, scapulae, skull, and wings of ilia.</p>
  <div class="field">
    <label for="wv-mcs">MCS</label>
    <select id="wv-mcs">
      <option value="">— not assessed —</option>
      ${mcsOptions}
    </select>
  </div>
</section>

<!-- Vaccinations -->
<section class="card" style="margin-bottom:14px;">
  <h2 style="font-size:1rem;margin-top:0;">Vaccinations</h2>
  ${vaccineRows || '<p class="text-sm text-muted">No vaccine schedule defined for this species.</p>'}
</section>

<!-- Parasite Control -->
<section class="card" style="margin-bottom:14px;">
  <h2 style="font-size:1rem;margin-top:0;">Parasite Control</h2>
  <div class="callout" role="note" style="background:rgba(230,126,34,.08);border-left:3px solid var(--c-warning);padding:10px 14px;border-radius:4px;margin-bottom:16px;font-size:.85rem;">
    <strong>Adult deworming frequency: every 3 months (quarterly)</strong> — ESCCAP guideline.<br>
    Monthly deworming in healthy adults is <strong>not recommended</strong> and not evidence-based.
  </div>
  <h3 style="font-size:.9rem;margin:0 0 10px;">Ectoparasite Control</h3>
  <div class="form-row" style="margin-bottom:16px;">
    <div class="field">
      <label for="ecto-product">Product</label>
      <input type="text" id="ecto-product" placeholder="e.g. Fluralaner (Bravecto)">
    </div>
    <div class="field">
      <label for="ecto-date">Date given</label>
      <input type="date" id="ecto-date">
    </div>
  </div>
  <h3 style="font-size:.9rem;margin:0 0 10px;">Endoparasite (Deworming)</h3>
  <div class="form-row">
    <div class="field">
      <label for="endo-product">Product</label>
      <input type="text" id="endo-product" placeholder="e.g. Fenbendazole, Pyrantel">
    </div>
    <div class="field">
      <label for="endo-date">Date given</label>
      <input type="date" id="endo-date">
    </div>
    <div class="field">
      <label for="endo-next">Next due (auto +3 months)</label>
      <input type="date" id="endo-next" value="${_addMonths(_todayISO(), 3)}">
    </div>
  </div>
</section>

<!-- Nutrition -->
<section class="card" style="margin-bottom:14px;">
  <h2 style="font-size:1rem;margin-top:0;">Nutrition</h2>
  <div class="form-row">
    <div class="field">
      <label for="diet-type">Diet Type</label>
      <select id="diet-type">
        <option value="">— select —</option>
        <option value="dry">Dry kibble</option>
        <option value="wet">Wet / canned</option>
        <option value="raw">Raw diet</option>
        <option value="mixed">Mixed</option>
        <option value="prescription">Prescription diet</option>
      </select>
    </div>
    <div class="field">
      <label for="feed-amount">Feeding amount (g/day)</label>
      <input type="number" id="feed-amount" min="0" step="1" placeholder="grams per day">
    </div>
  </div>
  <div id="rer-display" style="background:rgba(51,79,132,.06);border-radius:6px;padding:12px 14px;font-size:.88rem;">
    <p class="text-muted" style="margin:0;">Enter weight above to compute energy requirements.</p>
  </div>
</section>

<!-- Dental -->
<section class="card" style="margin-bottom:14px;">
  <h2 style="font-size:1rem;margin-top:0;">Dental Assessment</h2>
  <div class="field">
    <label for="dental-grade">Periodontal Disease Grade (AVDC)</label>
    <select id="dental-grade">
      <option value="">— not assessed —</option>
      ${dentalOptions}
    </select>
  </div>
  <div id="dental-description" class="text-sm text-muted" style="margin-top:4px;"></div>
</section>

<!-- Preventive Diagnostics -->
<section class="card" style="margin-bottom:14px;">
  <h2 style="font-size:1rem;margin-top:0;">Preventive Diagnostics</h2>
  <p class="text-sm text-muted" style="margin-bottom:10px;">Performed today:</p>
  ${[
    ['diag_heartworm',    'Heartworm antigen test'],
    ['diag_tick_panel',   'Tick-borne disease panel'],
    ['diag_cbc_chem',     'CBC / Chemistry panel'],
    ['diag_ua',           'Urinalysis'],
    ['diag_fecal',        'Faecal exam / flotation'],
  ].map(([key, label]) => `
<label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;cursor:pointer;">
  <input type="checkbox" data-diag="${_esc(key)}">
  <span class="text-sm">${_esc(label)}</span>
</label>`).join('')}
</section>

<!-- Next Visit -->
<section class="card" style="margin-bottom:14px;">
  <h2 style="font-size:1rem;margin-top:0;">Next Wellness Visit</h2>
  <div class="field" style="max-width:240px;">
    <label for="next-visit">Recommended date</label>
    <input type="date" id="next-visit" value="${nextVisitDefault}">
  </div>
</section>

<!-- Overdue Items -->
<section class="card" id="overdue-section" style="margin-bottom:14px;" hidden>
  <h2 style="font-size:1rem;margin-top:0;color:var(--c-warning);">Overdue Items</h2>
  <div id="overdue-list"></div>
</section>

<!-- Save -->
<div class="card" style="margin-bottom:24px;">
  <button class="btn btn-primary" type="button" id="btn-save-wellness">Save Wellness Visit</button>
</div>`;

  // ── Live RER calculation on weight change ─────────────────────────────────
  const weightEl  = app.querySelector('#wv-weight');
  const rerDisplay = app.querySelector('#rer-display');
  const neutered   = (patient.sex ?? '').toLowerCase().includes('neutered') ||
                     (patient.sex ?? '').toLowerCase().includes('spayed');

  function updateRER() {
    const wkg = parseFloat(weightEl.value);
    const energy = _computeEnergy(wkg, ageMonths, neutered);
    if (!energy) {
      rerDisplay.innerHTML = `<p class="text-muted" style="margin:0;">Enter weight to compute energy requirements.</p>`;
      return;
    }
    rerDisplay.innerHTML = `
<p style="margin:0 0 4px;"><strong>RER</strong> = 70 × ${wkg}^0.75 = <strong>${energy.rer} kcal/day</strong></p>
<p style="margin:0 0 4px;"><strong>MER</strong> = RER × ${energy.factor} (${_esc(energy.factorLabel)}) = <strong>${energy.mer} kcal/day</strong></p>
<p class="text-muted" style="margin:0;font-size:.8rem;">Formula: ${_esc(RER_FORMULA.description)}</p>`;
  }
  weightEl.addEventListener('input', updateRER);

  // ── Endo-next auto-calc ───────────────────────────────────────────────────
  const endoDateEl = app.querySelector('#endo-date');
  const endoNextEl = app.querySelector('#endo-next');
  endoDateEl.addEventListener('change', () => {
    const next = _addMonths(endoDateEl.value, 3);
    if (next) endoNextEl.value = next;
  });

  // ── Dental description ────────────────────────────────────────────────────
  const dentalEl  = app.querySelector('#dental-grade');
  const dentalDesc = app.querySelector('#dental-description');
  dentalEl.addEventListener('change', () => {
    const found = DENTAL_GRADES.find(d => d.grade === dentalEl.value);
    dentalDesc.textContent = found ? found.description : '';
  });

  // ── Overdue items computation ─────────────────────────────────────────────
  function computeOverdue() {
    const items = [];
    // Parasite — check if endo date is set and overdue
    const endoVal = endoDateEl.value;
    if (endoVal && _isOverdueByMonths(endoVal, 3)) {
      items.push('Endoparasite (deworming) — last recorded date is more than 3 months ago (ESCCAP quarterly guideline).');
    }
    // Vaccines — any not checked today with given date in the past > 12 months
    allVaccines.forEach(v => {
      const givenCheckbox = app.querySelector(`[data-vax-given="${CSS.escape(v.name)}"]`);
      const givenDate     = app.querySelector(`[data-vax-date="${CSS.escape(v.name)}"]`)?.value;
      if (!givenCheckbox?.checked && givenDate && _isOverdueByMonths(givenDate, 12)) {
        items.push(`${v.name} vaccination — date appears outdated. Review and update.`);
      }
    });
    const overdueSection = app.querySelector('#overdue-section');
    const overdueList    = app.querySelector('#overdue-list');
    if (items.length) {
      overdueSection.hidden = false;
      overdueList.innerHTML = `<ul style="margin:0;padding-left:20px;">${items.map(i => `<li class="text-sm" style="margin-bottom:4px;">${_esc(i)}</li>`).join('')}</ul>`;
    } else {
      overdueSection.hidden = true;
    }
  }

  // ── Save handler ──────────────────────────────────────────────────────────
  app.querySelector('#btn-save-wellness').addEventListener('click', async () => {
    computeOverdue();
    const btn = app.querySelector('#btn-save-wellness');
    btn.disabled = true;
    btn.textContent = 'Saving…';

    // Collect vaccine data
    const vaccinationRecord = allVaccines.map(v => ({
      name:    v.name,
      given:   !!(app.querySelector(`[data-vax-given="${CSS.escape(v.name)}"]`)?.checked),
      date:    app.querySelector(`[data-vax-date="${CSS.escape(v.name)}"]`)?.value ?? '',
      lot:     app.querySelector(`[data-vax-lot="${CSS.escape(v.name)}"]`)?.value.trim() ?? '',
    }));

    // Collect diagnostics
    const preventiveDiagnostics = {};
    app.querySelectorAll('[data-diag]').forEach(el => {
      preventiveDiagnostics[el.dataset.diag] = el.checked;
    });

    const weight   = parseFloat(weightEl.value) || null;
    const bcsEl    = app.querySelector('[name="bcs"]:checked');
    const energy   = _computeEnergy(weight, ageMonths, neutered);

    const visitData = {
      type:            'wellness',
      patientId,
      date:            app.querySelector('#wv-date').value || _todayISO(),
      clinician:       app.querySelector('#wv-clinician').value.trim(),
      weight,
      lifeStage:       lifeStage.label,
      bcs:             bcsEl ? parseInt(bcsEl.value, 10) : null,
      mcs:             app.querySelector('#wv-mcs').value || null,
      vaccinations:    vaccinationRecord,
      ectoProduct:     app.querySelector('#ecto-product').value.trim(),
      ectoDate:        app.querySelector('#ecto-date').value,
      endoProduct:     app.querySelector('#endo-product').value.trim(),
      endoDate:        endoDateEl.value,
      endoNextDue:     endoNextEl.value,
      dietType:        app.querySelector('#diet-type').value,
      feedingAmountG:  parseFloat(app.querySelector('#feed-amount').value) || null,
      rerKcal:         energy?.rer   ?? null,
      merKcal:         energy?.mer   ?? null,
      merFactor:       energy?.factor ?? null,
      dentalGrade:     dentalEl.value || null,
      preventiveDiagnostics,
      nextVisitDue:    app.querySelector('#next-visit').value,
    };

    try {
      const saved = await saveVisit(visitData);
      showToast('Wellness visit saved.', 'success');
      navigate(`#/visits/${saved.id}`);
    } catch (err) {
      console.error(err);
      showToast('Failed to save wellness visit.', 'error');
      btn.disabled = false;
      btn.textContent = 'Save Wellness Visit';
    }
  });
}
