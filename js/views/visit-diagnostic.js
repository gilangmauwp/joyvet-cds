// Single responsibility: multi-step diagnostic visit form with clinical decision-support engine integration.

import { getPatient, saveVisit }       from '../api.js';
import { navigate }                     from '../router.js';
import { showToast }                    from '../app.js';
import { state, setState, clearVisitDraft } from '../state.js';
import { calculateDose, getDrug, listDrugsForSpecies } from '../engine/dosing.js';
import { DRUGS }                        from '../data/kb-drugs.js';
import {
  _esc, _todayISO, _checkboxGroup, _collectSignals, _applySignals,
  wizardStepsHTML, navButtonsHTML, wireWizardNav, runEngine,
} from './visit-diagnostic-steps.js';

// ── Public entry point ────────────────────────────────────────────────────────

export async function renderVisitNew(params) {
  if (params?.type === 'wellness') {
    const { renderWellnessVisit } = await import('./visit-wellness.js');
    return renderWellnessVisit(params);
  }
  return _renderDiagnosticVisit(params);
}

async function _renderDiagnosticVisit(params) {
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

  if (!state.visitDraft || state.visitDraft.patientId !== patientId) {
    setState({ visitDraft: { patientId, type: 'diagnostic', step: 1, signals: {} } });
  }
  _renderStep(app, patient, state.visitDraft.step);
}

// ── Step dispatcher ───────────────────────────────────────────────────────────

function _renderStep(app, patient, step) {
  ({ 1: _step1, 2: _step2, 3: _step3, 4: _step4, 5: _step5, 6: _step6 }[step] || _step1)(app, patient, step);
}

// ── Breadcrumb helper ─────────────────────────────────────────────────────────

function _breadcrumb(patient) {
  return `<nav class="breadcrumb text-sm text-muted" style="margin-bottom:12px;"><a href="#/patients/${_esc(patient.id)}">${_esc(patient.name)}</a> &rsaquo; New Diagnostic Visit</nav>`;
}

// ── Step 1: Patient & Context ─────────────────────────────────────────────────

function _step1(app, patient, step = 1) {
  const d = state.visitDraft;
  app.innerHTML = `${_breadcrumb(patient)}${wizardStepsHTML(step)}
<div class="card">
  <h2 style="margin-top:0;font-size:1.05rem;">Step 1: Patient &amp; Context</h2>
  <div class="patient-banner" style="padding:10px 14px;background:rgba(51,79,132,.06);border-radius:6px;margin-bottom:16px;">
    <strong>${_esc(patient.name)}</strong>
    <span class="badge badge-info" style="margin-left:8px;">${_esc(patient.species ?? '')}</span>
    ${patient.breed ? `<span class="text-sm text-muted" style="margin-left:8px;">${_esc(patient.breed)}</span>` : ''}
  </div>
  <div class="form-row">
    <div class="field"><label for="s1-weight">Weight (kg)</label><input type="number" id="s1-weight" min="0.1" step="0.01" placeholder="e.g. 8.5" value="${_esc(d.weight ?? '')}"></div>
    <div class="field"><label for="s1-clinician">Clinician</label><input type="text" id="s1-clinician" placeholder="Clinician name" value="${_esc(d.clinician ?? '')}"></div>
  </div>
  <div class="form-row">
    <div class="field"><label for="s1-date">Visit Date</label><input type="date" id="s1-date" value="${_esc(d.date ?? _todayISO())}"></div>
  </div>
  <div class="field"><label for="s1-notes">Clinical Notes</label><textarea id="s1-notes" rows="4" placeholder="General clinical notes…">${_esc(d.clinicalNotes ?? '')}</textarea></div>
  ${navButtonsHTML(step)}
</div>`;
  const save = () => setState({ visitDraft: { ...state.visitDraft,
    weight:       parseFloat(app.querySelector('#s1-weight').value) || null,
    clinician:    app.querySelector('#s1-clinician').value.trim(),
    date:         app.querySelector('#s1-date').value,
    clinicalNotes: app.querySelector('#s1-notes').value.trim(),
  }});
  wireWizardNav(app, patient, step, save, _renderStep, runEngine);
}

// ── Step 2: Anamnesis ─────────────────────────────────────────────────────────

function _step2(app, patient, step = 2) {
  const d = state.visitDraft;
  app.innerHTML = `${_breadcrumb(patient)}${wizardStepsHTML(step)}
<div class="card">
  <h2 style="margin-top:0;font-size:1.05rem;">Step 2: Anamnesis</h2>
  <div class="field"><label for="s2-chief">Chief Complaint (free text)</label>
    <input type="text" id="s2-chief" placeholder="Brief summary of presenting complaint" value="${_esc(d.chiefComplaint ?? '')}"></div>
  <div id="signal-checks">
    ${_checkboxGroup('Chief Complaints', [
      ['complaints_gi','GI signs'],['complaints_respiratory','Respiratory signs'],
      ['complaints_skin_lesions','Skin lesions'],['complaints_hair_loss','Hair loss / alopecia'],
      ['complaints_urinary','Urinary signs'],['complaints_neurological','Neurological signs'],
      ['complaints_orthopedic','Orthopaedic / lameness'],['complaints_ophthalmic','Eye / ocular signs'],
      ['complaints_behavioral','Behavioural change'],['complaints_weight_loss','Weight loss'],
      ['complaints_weight_gain','Weight gain'],['complaints_polyuria_polydipsia','Polyuria / polydipsia (PU/PD)'],
      ['complaints_vomiting','Vomiting'],['complaints_diarrhea','Diarrhoea'],
      ['complaints_appetite_loss','Appetite loss / anorexia'],['complaints_lethargy','Lethargy'],
      ['complaints_coughing','Coughing'],['complaints_sneezing','Sneezing'],['complaints_discharge','Discharge'],
    ])}
    ${_checkboxGroup('Onset', [
      ['hpi_onset_acute','Acute (< 48h)'],['hpi_onset_subacute','Subacute (2–14 days)'],['hpi_onset_chronic','Chronic (> 2 weeks)'],
    ])}
    ${_checkboxGroup('Progression', [
      ['hpi_progression_worsening','Worsening'],['hpi_progression_stable','Stable'],['hpi_progression_fluctuating','Fluctuating / intermittent'],
    ])}
    ${_checkboxGroup('Environment & Exposure', [
      ['env_indoor_outdoor','Indoor and outdoor'],['env_outdoor','Primarily outdoor'],
      ['env_contact_stray','Contact with strays'],['env_contact_other_pets','Contact with other pets'],
    ])}
    ${_checkboxGroup('Age Category', [
      ['age_young','Young / juvenile (< 2 yr)'],['age_middle','Middle-aged (2–7 yr)'],['age_old','Senior / geriatric (> 7 yr)'],
    ])}
    ${_checkboxGroup('Known Chronic Conditions', [
      ['chronic_condition_none','None known'],['chronic_condition_allergies','Allergies'],
      ['chronic_condition_cardiac','Cardiac disease'],['chronic_condition_renal','Renal disease'],
      ['chronic_condition_endocrine','Endocrine disease'],
    ])}
  </div>
  ${navButtonsHTML(step)}
</div>`;
  _applySignals(app.querySelector('#signal-checks'), d.signals);
  const save = () => setState({ visitDraft: { ...state.visitDraft,
    chiefComplaint: app.querySelector('#s2-chief').value.trim(),
    signals: { ...state.visitDraft.signals, ..._collectSignals(app.querySelector('#signal-checks')) },
  }});
  wireWizardNav(app, patient, step, save, _renderStep, runEngine);
}

// ── Step 3: Physical Exam ─────────────────────────────────────────────────────

function _step3(app, patient, step = 3) {
  const d = state.visitDraft;
  app.innerHTML = `${_breadcrumb(patient)}${wizardStepsHTML(step)}
<div class="card">
  <h2 style="margin-top:0;font-size:1.05rem;">Step 3: Physical Examination</h2>
  <div id="exam-checks">
    ${_checkboxGroup('Skin & Coat', [
      ['skin_pruritus','Pruritus'],['skin_erythema','Erythema'],
      ['skin_alopecia_focal','Focal alopecia'],['skin_alopecia_diffuse','Diffuse alopecia'],
      ['skin_pustules','Pustules'],['skin_papules','Papules'],['skin_crusts','Crusts / scales'],
      ['skin_lichenification','Lichenification'],['skin_hyperpigmentation','Hyperpigmentation'],
      ['skin_thickened','Thickened skin'],['skin_ventral','Ventral distribution'],
      ['skin_dorsal','Dorsal distribution'],['skin_pedal','Pedal involvement'],
      ['skin_facial','Facial involvement'],['skin_self_trauma','Self-trauma'],
    ])}
    ${_checkboxGroup('Eyes, Ears & Nasal', [
      ['eyes_discharge','Ocular discharge'],['eyes_opacity','Corneal opacity'],['eyes_squinting','Blepharospasm'],
      ['ears_erythema','Ear canal erythema'],['ears_pruritus','Ear pruritus'],['ears_discharge','Ear discharge'],
      ['nasal_discharge','Nasal discharge'],['nasal_epistaxis','Epistaxis'],
    ])}
    ${_checkboxGroup('Gastrointestinal', [
      ['gi_vomiting','Vomiting'],['gi_diarrhea','Diarrhoea'],['gi_constipation','Constipation'],
      ['gi_hematochezia','Haematochezia'],['gi_melena','Melaena'],['gi_abd_pain','Abdominal pain'],
      ['gi_abd_distension','Abdominal distension'],['gi_mass','Palpable mass'],
    ])}
    ${_checkboxGroup('Respiratory', [
      ['resp_cough','Cough'],['resp_dyspnea','Dyspnoea'],['resp_wheeze','Wheeze'],
      ['resp_crackles','Crackles'],['resp_dull_sounds','Dull/absent sounds'],
    ])}
    ${_checkboxGroup('Cardiovascular', [
      ['cv_murmur','Cardiac murmur'],['cv_arrhythmia','Arrhythmia'],
      ['cv_weak_pulse','Weak pulse'],['cv_bounding_pulse','Bounding pulse'],['cv_ascites','Ascites'],
    ])}
    ${_checkboxGroup('Neurological & Musculoskeletal', [
      ['neuro_ataxia','Ataxia'],['neuro_seizures','Seizures'],['neuro_paresis','Paresis'],['neuro_head_tilt','Head tilt'],
      ['musculo_lameness','Lameness'],['musculo_pain','Pain on palpation'],
      ['musculo_swelling','Joint / limb swelling'],['musculo_muscle_atrophy','Muscle atrophy'],
    ])}
    ${_checkboxGroup('Urogenital & Reproductive', [
      ['uro_stranguria','Stranguria'],['uro_hematuria','Haematuria'],['uro_pu_pd','PU/PD confirmed'],
      ['repro_vulvar_discharge','Vulvar discharge'],['repro_mammary_mass','Mammary mass'],
    ])}
    ${_checkboxGroup('Lymph Nodes', [
      ['ln_submandibular','Submandibular'],['ln_prescapular','Prescapular'],
      ['ln_popliteal','Popliteal'],['ln_generalized','Generalised lymphadenopathy'],
    ])}
    ${_checkboxGroup('Parasites (observed)', [
      ['parasites_fleas','Fleas / flea dirt'],['parasites_ticks','Ticks'],['parasites_mites','Mites / mange'],
    ])}
  </div>
  ${navButtonsHTML(step)}
</div>`;
  _applySignals(app.querySelector('#exam-checks'), d.signals);
  const save = () => setState({ visitDraft: { ...state.visitDraft,
    signals: { ...state.visitDraft.signals, ..._collectSignals(app.querySelector('#exam-checks')) },
  }});
  wireWizardNav(app, patient, step, save, _renderStep, runEngine);
}

// ── Step 4: Vitals ────────────────────────────────────────────────────────────

function _step4(app, patient, step = 4) {
  const d  = state.visitDraft;
  const vt = d.vitals ?? {};
  const mm = (v) => vt.mmColor === v ? ' selected' : '';
  app.innerHTML = `${_breadcrumb(patient)}${wizardStepsHTML(step)}
<div class="card">
  <h2 style="margin-top:0;font-size:1.05rem;">Step 4: Vitals</h2>
  <div class="form-row">
    <div class="field"><label for="v-temp">Temperature (°C)</label><input type="number" id="v-temp" min="30" max="44" step="0.1" placeholder="38.5" value="${_esc(vt.tempC ?? '')}"></div>
    <div class="field"><label for="v-hr">Heart Rate (bpm)</label><input type="number" id="v-hr" min="20" max="600" step="1" placeholder="100" value="${_esc(vt.hrBpm ?? '')}"></div>
  </div>
  <div class="form-row">
    <div class="field"><label for="v-rr">Respiratory Rate (bpm)</label><input type="number" id="v-rr" min="4" max="120" step="1" placeholder="20" value="${_esc(vt.rrBpm ?? '')}"></div>
    <div class="field"><label for="v-spo2">SpO₂ (%)</label><input type="number" id="v-spo2" min="50" max="100" step="1" placeholder="98" value="${_esc(vt.spo2Pct ?? '')}"></div>
  </div>
  <div class="form-row">
    <div class="field"><label for="v-mm">Mucous Membranes</label>
      <select id="v-mm">
        <option value="">— not assessed —</option>
        <option value="pink_moist"${mm('pink_moist')}>Pink &amp; Moist (Normal)</option>
        <option value="pale"${mm('pale')}>Pale</option>
        <option value="white"${mm('white')}>White (severe)</option>
        <option value="icteric"${mm('icteric')}>Icteric (jaundiced)</option>
        <option value="cyanotic"${mm('cyanotic')}>Cyanotic (blue)</option>
        <option value="brick_red"${mm('brick_red')}>Brick Red / hyperaemic</option>
        <option value="muddy"${mm('muddy')}>Muddy / grey</option>
      </select>
    </div>
    <div class="field"><label for="v-crt">CRT (seconds)</label><input type="number" id="v-crt" min="0" max="10" step="0.5" placeholder="1.5" value="${_esc(vt.crtSec ?? '')}"></div>
  </div>
  ${navButtonsHTML(step)}
</div>`;
  const save = () => setState({ visitDraft: { ...state.visitDraft, vitals: {
    tempC:   parseFloat(app.querySelector('#v-temp').value)  || null,
    hrBpm:   parseFloat(app.querySelector('#v-hr').value)    || null,
    rrBpm:   parseFloat(app.querySelector('#v-rr').value)    || null,
    spo2Pct: parseFloat(app.querySelector('#v-spo2').value)  || null,
    mmColor: app.querySelector('#v-mm').value || null,
    crtSec:  parseFloat(app.querySelector('#v-crt').value)   || null,
  }}});
  wireWizardNav(app, patient, step, save, _renderStep, runEngine);
}

// ── Step 5: Differentials ─────────────────────────────────────────────────────

function _step5(app, patient, step = 5) {
  app.innerHTML = `${_breadcrumb(patient)}${wizardStepsHTML(step)}
<div class="card">
  <h2 style="margin-top:0;font-size:1.05rem;">Step 5: Differential Diagnoses</h2>
  <div class="callout" role="note" style="background:rgba(51,79,132,.07);border-left:3px solid var(--c-primary);padding:10px 14px;border-radius:4px;margin-bottom:16px;font-size:.85rem;color:var(--c-text-muted);">
    This is clinical decision support only. Confirm diagnosis with full clinical assessment and appropriate diagnostic tests.
  </div>
  <button class="btn btn-primary" type="button" id="btn-run-engine">Run Diagnostic Engine</button>
  <div id="engine-results" style="margin-top:16px;"></div>
  ${navButtonsHTML(step)}
</div>`;
  wireWizardNav(app, patient, step, () => {}, _renderStep, runEngine);
  app.querySelector('#btn-run-engine').addEventListener('click', () => {
    runEngine(app, patient);
    _wireSelectDx(app, patient);
  });
  runEngine(app, patient);
  _wireSelectDx(app, patient);
}

function _wireSelectDx(app, patient) {
  // Re-wire after engine renders (delegated via timeout so DOM is updated)
  setTimeout(() => {
    app.querySelectorAll('[data-select-dx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.selectDx;
        setState({ visitDraft: { ...state.visitDraft, workingDiagnosis: name } });
        showToast(`"${name}" set as working diagnosis.`, 'success');
        setState({ visitDraft: { ...state.visitDraft, workingDiagnosis: name, step: 6 } });
        _renderStep(app, patient, 6);
      });
    });
  }, 50);
}

// ── Step 6: Diagnosis & Treatment ─────────────────────────────────────────────

function _step6(app, patient, step = 6) {
  const d       = state.visitDraft;
  const species = patient.species ?? 'dog';
  const drugs   = listDrugsForSpecies(species, DRUGS);
  const drugOpts = drugs.map(dr => `<option value="${_esc(dr.id)}">${_esc(dr.name)} (${_esc(dr.route)})</option>`).join('');

  app.innerHTML = `${_breadcrumb(patient)}${wizardStepsHTML(step)}
<div class="card">
  <h2 style="margin-top:0;font-size:1.05rem;">Step 6: Diagnosis &amp; Treatment</h2>
  <div class="field"><label for="s6-dx">Working Diagnosis</label>
    <input type="text" id="s6-dx" placeholder="Enter or confirm working diagnosis" value="${_esc(d.workingDiagnosis ?? '')}"></div>
  <div class="field"><label for="s6-plan">Treatment Plan</label>
    <textarea id="s6-plan" rows="5" placeholder="Document treatment plan, medications, follow-up…">${_esc(d.treatmentPlan ?? '')}</textarea></div>
  <section style="border:1px solid rgba(26,45,80,.12);border-radius:6px;padding:14px 16px;margin-bottom:16px;">
    <h3 style="font-size:.95rem;margin:0 0 12px;">Drug Dose Calculator</h3>
    ${!d.weight ? `<p class="text-sm text-muted" style="margin-bottom:10px;">Weight not set — enter in Step 1 for accurate dosing.</p>` : ''}
    <div class="form-row">
      <div class="field"><label for="drug-select">Drug</label>
        <select id="drug-select"><option value="">— choose —</option>${drugOpts}</select></div>
      <div class="field"><label for="dose-weight">Weight (kg)</label>
        <input type="number" id="dose-weight" min="0.1" step="0.01" value="${_esc(d.weight ?? '')}" placeholder="kg"></div>
    </div>
    <button class="btn btn-secondary" type="button" id="btn-calc-dose">Calculate Dose</button>
    <div id="dose-result" style="margin-top:12px;"></div>
  </section>
  <div class="field"><label for="s6-notes">Additional Clinical Notes</label>
    <textarea id="s6-notes" rows="5" placeholder="Expanded notes, client communication, follow-up…">${_esc(d.notes ?? '')}</textarea></div>
  <div class="flex gap-3" style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(26,45,80,.1);">
    <button class="btn btn-secondary" type="button" id="btn-prev">← Previous</button>
    <button class="btn btn-primary"   type="button" id="btn-save-visit">Save Visit</button>
  </div>
</div>`;

  // Prev
  app.querySelector('#btn-prev').addEventListener('click', () => {
    _saveStep6(app); setState({ visitDraft: { ...state.visitDraft, step: 5 } }); _renderStep(app, patient, 5);
  });
  // Wizard step chips
  app.querySelectorAll('[data-goto-step]').forEach(el => {
    el.addEventListener('click', () => {
      _saveStep6(app);
      const t = parseInt(el.dataset.gotoStep, 10);
      setState({ visitDraft: { ...state.visitDraft, step: t } });
      _renderStep(app, patient, t);
    });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
  });

  // Drug calculator
  app.querySelector('#btn-calc-dose').addEventListener('click', () => {
    const drugId = app.querySelector('#drug-select').value;
    const wkg    = parseFloat(app.querySelector('#dose-weight').value);
    const doseEl = app.querySelector('#dose-result');
    if (!drugId) { doseEl.innerHTML = `<p class="text-sm text-muted">Select a drug.</p>`; return; }
    if (!wkg || wkg <= 0) { doseEl.innerHTML = `<p class="text-sm text-muted">Enter a valid weight.</p>`; return; }
    const drug = getDrug(drugId, DRUGS);
    const res  = calculateDose(drug, wkg, species);
    if (!res.ok) { doseEl.innerHTML = `<p class="text-sm text-danger">${_esc(res.error)}</p>`; return; }
    const cappedNote = (res.cappedLow || res.cappedHigh)
      ? `<p class="text-sm text-muted" style="margin:4px 0;"><strong>Note:</strong> Dose capped at maximum (${res.maxTotalMg} mg).</p>` : '';
    doseEl.innerHTML = `
<div style="background:rgba(51,79,132,.06);border-radius:6px;padding:12px 14px;">
  <p style="margin:0 0 4px;"><strong>${_esc(res.name)}</strong> — ${_esc(res.route)} — ${_esc(res.frequency)}</p>
  <p style="margin:0 0 4px;">Dose: <strong>${_esc(res.displayLow)} – ${_esc(res.displayHigh)}</strong></p>
  <p class="text-sm text-muted" style="margin:0 0 4px;">Basis: ${_esc(res.mgPerKgBasis)}</p>
  ${cappedNote}
  ${res.notes ? `<p class="text-sm" style="margin:4px 0;">${_esc(res.notes)}</p>` : ''}
  <p class="text-sm text-muted" style="margin:8px 0 0;font-style:italic;">${_esc(res.disclaimer)}</p>
</div>`;
  });

  // Save
  app.querySelector('#btn-save-visit').addEventListener('click', async () => {
    _saveStep6(app);
    const draft = state.visitDraft;
    const btn   = app.querySelector('#btn-save-visit');
    btn.disabled = true; btn.textContent = 'Saving…';
    try {
      const saved = await saveVisit({
        type: 'diagnostic', patientId: draft.patientId,
        date: draft.date ?? _todayISO(), clinician: draft.clinician ?? '',
        weight: draft.weight ?? null, chiefComplaint: draft.chiefComplaint ?? '',
        clinicalNotes: draft.clinicalNotes ?? '', signals: draft.signals ?? {},
        vitals: draft.vitals ?? {}, workingDiagnosis: draft.workingDiagnosis ?? '',
        treatmentPlan: draft.treatmentPlan ?? '', notes: draft.notes ?? '',
      });
      clearVisitDraft();
      showToast('Visit saved.', 'success');
      navigate(`#/visits/${saved.id}`);
    } catch (err) {
      console.error(err); showToast('Failed to save visit.', 'error');
      btn.disabled = false; btn.textContent = 'Save Visit';
    }
  });
}

function _saveStep6(app) {
  setState({ visitDraft: { ...state.visitDraft,
    workingDiagnosis: app.querySelector('#s6-dx')?.value.trim()   ?? '',
    treatmentPlan:    app.querySelector('#s6-plan')?.value.trim() ?? '',
    notes:            app.querySelector('#s6-notes')?.value.trim() ?? '',
  }});
}
