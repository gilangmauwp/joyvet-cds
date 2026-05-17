// Single responsibility: HTML content generators for each diagnostic visit wizard step.

import { state, setState }               from '../state.js';
import { diagnose }                       from '../engine/diagnose.js';
import { CONDITIONS }                     from '../data/kb-conditions.js';
import { renderAccordion, initAccordions } from '../components/accordion.js';

export function _esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function _todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function _checkboxGroup(title, checks) {
  const boxes = checks.map(([key, label]) => `
<label class="checkbox-label" style="display:flex;align-items:flex-start;gap:6px;margin-bottom:6px;cursor:pointer;">
  <input type="checkbox" data-signal="${_esc(key)}" name="${_esc(key)}" style="margin-top:2px;flex-shrink:0;">
  <span class="text-sm">${_esc(label)}</span>
</label>`).join('');
  return `
<fieldset style="border:1px solid rgba(26,45,80,.12);border-radius:6px;padding:12px 16px;margin-bottom:12px;">
  <legend style="font-size:.8rem;font-weight:600;color:var(--c-text-muted);padding:0 4px;">${_esc(title)}</legend>
  ${boxes}
</fieldset>`;
}

export function _collectSignals(container) {
  const signals = {};
  container.querySelectorAll('[data-signal]:checked').forEach(el => {
    signals[el.dataset.signal] = true;
  });
  return signals;
}

export function _applySignals(container, signals) {
  if (!signals || !container) return;
  Object.keys(signals).forEach(key => {
    const el = container.querySelector(`[data-signal="${CSS.escape(key)}"]`);
    if (el) el.checked = true;
  });
}

export const STEPS = [
  { num: 1, label: 'Patient & Context' },
  { num: 2, label: 'Anamnesis' },
  { num: 3, label: 'Physical Exam' },
  { num: 4, label: 'Vitals' },
  { num: 5, label: 'Differentials' },
  { num: 6, label: 'Diagnosis & Rx' },
];

export function wizardStepsHTML(currentStep) {
  return `
<div class="wizard-steps" role="tablist" aria-label="Visit steps">
  ${STEPS.map(s => {
    const isDone   = s.num < currentStep;
    const isActive = s.num === currentStep;
    const cls = `wizard-step${isActive ? ' active' : isDone ? ' done' : ''}`;
    return `<div class="${cls}" role="tab" aria-selected="${isActive}" data-goto-step="${s.num}" style="cursor:pointer;" tabindex="0">
  <div class="wizard-step-num">${isDone ? '✓' : s.num}</div>
  <div class="wizard-step-label">${_esc(s.label)}</div>
</div>`;
  }).join('')}
</div>`;
}

export function navButtonsHTML(currentStep) {
  const hasPrev = currentStep > 1;
  const hasNext = currentStep < STEPS.length;
  return `
<div class="flex gap-3" style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(26,45,80,.1);">
  ${hasPrev ? `<button class="btn btn-secondary" type="button" id="btn-prev">← Previous</button>` : ''}
  ${hasNext ? `<button class="btn btn-primary"   type="button" id="btn-next">Next →</button>` : ''}
</div>`;
}

export function wireWizardNav(app, patient, currentStep, saveFn, renderStep, runEngine) {
  app.querySelectorAll('[data-goto-step]').forEach(el => {
    el.addEventListener('click', () => {
      saveFn();
      const target = parseInt(el.dataset.gotoStep, 10);
      setState({ visitDraft: { ...state.visitDraft, step: target } });
      renderStep(app, patient, target);
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
    });
  });
  const prevBtn = app.querySelector('#btn-prev');
  const nextBtn = app.querySelector('#btn-next');
  if (prevBtn) prevBtn.addEventListener('click', () => {
    saveFn();
    const step = currentStep - 1;
    setState({ visitDraft: { ...state.visitDraft, step } });
    renderStep(app, patient, step);
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    saveFn();
    const step = currentStep + 1;
    setState({ visitDraft: { ...state.visitDraft, step } });
    renderStep(app, patient, step);
    if (step === 5) runEngine(app, patient);
  });
}

export function runEngine(app, patient) {
  const d         = state.visitDraft;
  const resultsEl = app.querySelector('#engine-results');
  if (!resultsEl) return;
  const visitData = { species: patient.species ?? 'dog', signals: d.signals ?? {}, vitals: d.vitals ?? {} };
  let results;
  try { results = diagnose(visitData, CONDITIONS); }
  catch (err) {
    console.error('Engine error:', err);
    resultsEl.innerHTML = `<div class="empty-state"><p>Engine error — check console.</p></div>`;
    return;
  }
  if (!results || results.length === 0) {
    resultsEl.innerHTML = `<div class="empty-state"><p>No differentials generated. Add more clinical signals in steps 2–4, then re-run.</p></div>`;
    return;
  }
  const topResults = results.slice(0, 10);
  const cards = topResults.map((r, idx) => {
    const sClass = r.matchStrength.includes('Strong') ? 'match-strong badge-success' :
                   r.matchStrength.includes('Moderate') ? 'match-moderate badge-warning' : 'match-weak';
    const emBadge = r.emergency ? `<span class="badge badge-danger" style="margin-left:4px;">EMERGENCY</span>` : '';
    const matchedList = r.matchedSignals.length
      ? `<ul style="margin:4px 0 8px;padding-left:18px;font-size:.85rem;">${r.matchedSignals.map(s => `<li>${_esc(s.key)} <span class="text-sm text-muted">(+${s.weight})</span></li>`).join('')}</ul>`
      : '<p class="text-sm text-muted">None</p>';
    const contraList = r.contraMatchedSignals.length
      ? `<ul style="margin:4px 0 8px;padding-left:18px;font-size:.85rem;color:var(--c-danger);">${r.contraMatchedSignals.map(s => `<li>${_esc(s.key)} (${s.weight})</li>`).join('')}</ul>`
      : '';
    const testsList = (r.tests ?? []).length
      ? `<ul style="margin:4px 0;padding-left:18px;font-size:.85rem;">${r.tests.map(t => `<li>${_esc(t)}</li>`).join('')}</ul>`
      : '<p class="text-sm text-muted">None specified</p>';
    const accordionBody = `
<p class="text-sm text-muted" style="margin:0 0 4px;">Category: ${_esc(r.category)}</p>
<p class="text-sm" style="margin:0 0 8px;"><strong>Matched signals (${r.matchedSignals.length}):</strong></p>${matchedList}
${r.contraMatchedSignals.length ? `<p class="text-sm" style="margin:0 0 4px;"><strong>Contra-signals matched:</strong></p>${contraList}` : ''}
<p class="text-sm" style="margin:8px 0 4px;"><strong>Recommended diagnostics:</strong></p>${testsList}`;
    return `
<div class="card" style="margin-bottom:10px;padding:12px 14px;">
  <div class="flex items-center gap-2" style="flex-wrap:wrap;margin-bottom:8px;">
    <strong>${_esc(r.name)}</strong>
    <span class="badge ${sClass}" style="font-size:.72rem;">${_esc(r.matchStrength)}</span>
    ${emBadge}
    <span class="text-sm text-muted">${r.matchedSignals.length} signal${r.matchedSignals.length !== 1 ? 's' : ''} matched</span>
    <button class="btn btn-sm btn-secondary" type="button" data-select-dx="${_esc(r.name)}" style="margin-left:auto;">Select as working diagnosis</button>
  </div>
  <div id="accordion-diff-${idx}">${renderAccordion([{ title: 'Details', body: accordionBody }])}</div>
</div>`;
  }).join('');
  resultsEl.innerHTML = `<p class="text-sm text-muted" style="margin-bottom:12px;">Showing top ${topResults.length} of ${results.length} result${results.length !== 1 ? 's' : ''}.</p>${cards}`;
  resultsEl.querySelectorAll('[id^="accordion-diff-"]').forEach(el => initAccordions(el));
  return topResults; // returned so caller can wire select buttons
}
