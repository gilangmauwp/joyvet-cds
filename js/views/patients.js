// Single responsibility: render the patient list and patient detail / medical record views.

import {
  getPatient, getPatients, getAllPatients, getOwner,
  savePatient, confirmDeletePatient, getVisits, deletePatient, searchPatients,
} from '../api.js';
import { navigate }    from '../router.js';
import { showModal }   from '../components/modal.js';
import { showToast }   from '../app.js';
import { formField }   from '../components/form-field.js';

// ── Helper utilities ──────────────────────────────────────────────────────────

function _esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function _formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      .format(new Date(dateStr));
  } catch (_) { return dateStr; }
}

/** Compute "X years Y months" from a DOB string to today. */
function _computeAge(dob) {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth)) return null;
  const now   = new Date();
  let years  = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (months < 0) { years--; months += 12; }
  if (years === 0 && months === 0) return '< 1 month';
  const parts = [];
  if (years  > 0) parts.push(`${years} yr${years  !== 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo`);
  return parts.join(' ');
}

// ── Patient List ──────────────────────────────────────────────────────────────

export async function renderPatients(_params) {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
<div class="page-header">
  <h1>Patients</h1>
</div>
<div class="card">
  <div class="card-header" style="margin-bottom:12px;">
    <label for="patient-search" class="card-title">Search patients</label>
  </div>
  <div class="form-row" style="margin-bottom:12px;">
    <div class="field">
      <label for="patient-search">Name / microchip</label>
      <input type="search" id="patient-search" placeholder="Type a name or chip number…">
    </div>
    <div class="field">
      <label for="species-filter">Species</label>
      <select id="species-filter">
        <option value="">All species</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="rabbit">Rabbit</option>
        <option value="bird">Bird</option>
        <option value="exotic">Exotic</option>
      </select>
    </div>
  </div>
  <div id="patients-table-wrap">
    <div class="loading-state"><div class="spinner" aria-label="Loading"></div><span>Loading patients…</span></div>
  </div>
</div>`;

  const tableWrap  = app.querySelector('#patients-table-wrap');
  const searchEl   = app.querySelector('#patient-search');
  const speciesEl  = app.querySelector('#species-filter');

  let allPatients  = [];
  let ownerCache   = {};

  async function fetchOwnerName(ownerId) {
    if (!ownerId) return '—';
    if (ownerCache[ownerId] !== undefined) return ownerCache[ownerId];
    try {
      const o = await getOwner(ownerId);
      ownerCache[ownerId] = o?.name ?? '—';
    } catch (_) { ownerCache[ownerId] = '—'; }
    return ownerCache[ownerId];
  }

  async function renderTable(patients) {
    if (!patients.length) {
      tableWrap.innerHTML = `
<div class="empty-state">
  <div class="empty-state-icon">🐾</div>
  <h3>No patients found</h3>
  <p>Patients are created via the Owner detail page.</p>
</div>`;
      return;
    }

    // Batch owner name lookup
    const ownerIds = [...new Set(patients.map(p => p.ownerId).filter(Boolean))];
    await Promise.allSettled(ownerIds.map(id => fetchOwnerName(id)));

    const rows = patients.map(p => `
<tr>
  <td><a href="#/patients/${_esc(p.id)}">${_esc(p.name)}</a></td>
  <td><span class="badge badge-info">${_esc(p.species ?? '—')}</span></td>
  <td>${_esc(p.breed ?? '—')}</td>
  <td>${_esc(ownerCache[p.ownerId] ?? '—')}</td>
  <td><a href="#/patients/${_esc(p.id)}" class="btn btn-sm btn-secondary">View</a></td>
</tr>`).join('');

    tableWrap.innerHTML = `
<div class="table-wrapper">
  <table class="table" aria-label="Patients list">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Species</th>
        <th scope="col">Breed</th>
        <th scope="col">Owner</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</div>`;
  }

  function applyFilters() {
    const q       = searchEl.value.trim().toLowerCase();
    const species = speciesEl.value;
    let filtered  = allPatients;
    if (species) filtered = filtered.filter(p => p.species === species);
    if (q) filtered = filtered.filter(p =>
      (p.name ?? '').toLowerCase().includes(q) ||
      (p.microchip ?? '').toLowerCase().includes(q)
    );
    renderTable(filtered);
  }

  try {
    allPatients = await getAllPatients();
    await renderTable(allPatients);
  } catch (err) {
    console.error(err);
    tableWrap.innerHTML = `<div class="empty-state"><p>Failed to load patients.</p></div>`;
  }

  let searchTimer;
  searchEl.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applyFilters, 300);
  });
  speciesEl.addEventListener('change', applyFilters);
}

// ── Patient Detail / Medical Record ──────────────────────────────────────────

export async function renderPatientDetail(params) {
  const app = document.getElementById('app');
  if (!app) return;

  const patientId = params?.id;
  if (!patientId) { navigate('#/patients'); return; }

  app.innerHTML = `<div class="loading-state"><div class="spinner" aria-label="Loading"></div><span>Loading patient…</span></div>`;

  let patient, owner, visits;
  try {
    [patient, visits] = await Promise.all([
      getPatient(patientId),
      getVisits(patientId),
    ]);
    if (!patient) throw new Error('Patient not found.');
    owner = patient.ownerId ? await getOwner(patient.ownerId) : null;
  } catch (err) {
    console.error(err);
    showToast('Failed to load patient.', 'error');
    app.innerHTML = `<div class="empty-state"><p>Patient not found. <a href="#/patients">Back to patients</a></p></div>`;
    return;
  }

  const age          = _computeAge(patient.dateOfBirth);
  const mostRecent   = visits?.[0];
  const currentWeight = mostRecent?.weight ? `${mostRecent.weight} kg` : '—';
  const ownerName    = owner?.name ?? '—';
  const ownerId      = patient.ownerId ?? '';

  app.innerHTML = `
<nav class="breadcrumb text-sm text-muted" aria-label="Breadcrumb" style="margin-bottom:12px;">
  <a href="#/patients">Patients</a> &rsaquo; ${_esc(patient.name)}
</nav>

<div class="card" id="profile-card">
  <div class="card-header">
    <div class="flex items-center gap-3">
      <h1 style="font-size:1.4rem;margin:0;">${_esc(patient.name)}</h1>
      <span class="badge badge-info">${_esc(patient.species ?? '')}</span>
      ${patient.sex ? `<span class="badge badge-wellness">${_esc(patient.sex)}</span>` : ''}
    </div>
    <div class="flex gap-2">
      <button class="btn btn-sm btn-secondary" id="btn-edit-patient" type="button">Edit</button>
      <button class="btn btn-sm btn-danger"    id="btn-delete-patient" type="button">Delete</button>
    </div>
  </div>
  <dl class="patient-meta" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px 16px;">
    <div><dt class="text-sm text-muted">Breed</dt><dd>${_esc(patient.breed ?? '—')}</dd></div>
    <div><dt class="text-sm text-muted">Age</dt><dd>${age ?? '—'}${patient.dateOfBirth ? ` <span class="text-sm text-muted">(${_esc(patient.dateOfBirth)})</span>` : ''}</dd></div>
    <div><dt class="text-sm text-muted">Current Weight</dt><dd>${currentWeight}</dd></div>
    ${patient.microchip ? `<div><dt class="text-sm text-muted">Microchip</dt><dd>${_esc(patient.microchip)}</dd></div>` : ''}
    <div><dt class="text-sm text-muted">Owner</dt><dd>${ownerId ? `<a href="#/owners/${_esc(ownerId)}">${_esc(ownerName)}</a>` : _esc(ownerName)}</dd></div>
  </dl>
</div>

<div class="card" id="edit-patient-card" hidden style="margin-top:12px;"></div>

<div class="card" style="margin-top:16px;" id="visits-card">
  <div class="card-header">
    <h2 style="font-size:1.1rem;margin:0;">Visit History</h2>
    <div class="flex gap-2">
      <button class="btn btn-sm btn-primary"    id="btn-new-diagnostic" type="button">+ Diagnostic Visit</button>
      <button class="btn btn-sm btn-secondary"  id="btn-new-wellness"   type="button">+ Wellness Visit</button>
    </div>
  </div>
  <div id="visits-timeline"></div>
</div>`;

  // ── Render visit timeline ─────────────────────────────────────────────────
  const timelineEl = app.querySelector('#visits-timeline');
  if (!visits || visits.length === 0) {
    timelineEl.innerHTML = `
<div class="empty-state">
  <div class="empty-state-icon">📋</div>
  <p>No visits recorded yet.</p>
</div>`;
  } else {
    const items = visits.map(v => {
      const isWell   = v.type === 'wellness';
      const dotClass = isWell ? 'dot-success' : '';
      const badge    = isWell
        ? `<span class="badge badge-wellness">Wellness</span>`
        : `<span class="badge badge-info">Diagnostic</span>`;
      const snippet  = isWell
        ? (v.bcs ? `BCS ${_esc(String(v.bcs))}/9` : '')
        : (v.chiefComplaint ? _esc(v.chiefComplaint.slice(0, 80)) : '');
      const weight   = v.weight ? `<span class="text-sm text-muted">${_esc(String(v.weight))} kg</span>` : '';
      const clinician = v.clinician ? `<span class="text-sm text-muted">${_esc(v.clinician)}</span>` : '';
      return `
<div class="timeline-item">
  <div class="timeline-dot ${dotClass}"></div>
  <div class="timeline-date">${_formatDate(v.date)}</div>
  <div class="timeline-content flex items-center gap-3" style="flex-wrap:wrap;">
    ${badge}
    ${clinician}
    ${weight}
    ${snippet ? `<span class="text-sm">${snippet}</span>` : ''}
    <a href="#/visits/${_esc(v.id)}" class="btn btn-sm btn-secondary" style="margin-left:auto;">View</a>
  </div>
</div>`;
    }).join('');
    timelineEl.innerHTML = `<div class="timeline">${items}</div>`;
  }

  // ── New visit buttons ─────────────────────────────────────────────────────
  app.querySelector('#btn-new-diagnostic').addEventListener('click', () => {
    navigate(`#/visits/new/diagnostic/${patientId}`);
  });
  app.querySelector('#btn-new-wellness').addEventListener('click', () => {
    navigate(`#/visits/new/wellness/${patientId}`);
  });

  // ── Edit patient ──────────────────────────────────────────────────────────
  const editCard  = app.querySelector('#edit-patient-card');
  const editBtn   = app.querySelector('#btn-edit-patient');

  editBtn.addEventListener('click', () => {
    const showing = !editCard.hidden;
    if (showing) {
      editCard.hidden = true;
      editBtn.textContent = 'Edit';
      return;
    }
    editCard.hidden = false;
    editBtn.textContent = 'Cancel Edit';
    editCard.innerHTML = `
<h3 style="margin-top:0;">Edit Patient</h3>
<form id="edit-patient-form">
  ${formField({ id: 'ep-name',    label: 'Name',    required: true,  value: patient.name   ?? '' })}
  ${formField({ id: 'ep-species', label: 'Species', type: 'select',
    value: patient.species ?? '', options: ['dog','cat','rabbit','bird','exotic'] })}
  ${formField({ id: 'ep-breed',   label: 'Breed',   value: patient.breed ?? '' })}
  ${formField({ id: 'ep-sex',     label: 'Sex',     type: 'select',
    value: patient.sex ?? '', options: [{value:'',label:'—'},{value:'Male',label:'Male'},{value:'Female',label:'Female'},{value:'Male (neutered)',label:'Male (neutered)'},{value:'Female (spayed)',label:'Female (spayed)'}] })}
  ${formField({ id: 'ep-dob',     label: 'Date of Birth', type: 'date', value: patient.dateOfBirth ?? '' })}
  ${formField({ id: 'ep-chip',    label: 'Microchip number', value: patient.microchip ?? '' })}
  <div class="flex gap-2">
    <button class="btn btn-primary" type="submit">Save Changes</button>
    <button class="btn btn-secondary" type="button" id="ep-cancel">Cancel</button>
  </div>
</form>`;

    editCard.querySelector('#ep-cancel').addEventListener('click', () => {
      editCard.hidden = true;
      editBtn.textContent = 'Edit';
    });

    editCard.querySelector('#edit-patient-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = editCard.querySelector('[type=submit]');
      btn.disabled = true;
      try {
        await savePatient({
          ...patient,
          name:        editCard.querySelector('#ep-name').value.trim(),
          species:     editCard.querySelector('#ep-species').value,
          breed:       editCard.querySelector('#ep-breed').value.trim(),
          sex:         editCard.querySelector('#ep-sex').value,
          dateOfBirth: editCard.querySelector('#ep-dob').value,
          microchip:   editCard.querySelector('#ep-chip').value.trim(),
        });
        showToast('Patient updated.', 'success');
        renderPatientDetail(params);
      } catch (err) {
        console.error(err);
        showToast('Failed to save patient.', 'error');
        btn.disabled = false;
      }
    });
  });

  // ── Delete patient ────────────────────────────────────────────────────────
  app.querySelector('#btn-delete-patient').addEventListener('click', async () => {
    let preview;
    try {
      preview = await deletePatient(patientId);
    } catch (err) {
      showToast('Could not load patient data for deletion preview.', 'error');
      return;
    }
    const visitCount = preview.visits?.length ?? 0;
    showModal({
      title: `Delete ${_esc(patient.name)}?`,
      body: `<p>This will permanently delete <strong>${_esc(patient.name)}</strong> and
        <strong>${visitCount} visit${visitCount !== 1 ? 's' : ''}</strong>. This cannot be undone.</p>`,
      confirmLabel: 'Delete permanently',
      danger: true,
      onConfirm: async () => {
        try {
          await confirmDeletePatient(patientId);
          showToast(`${patient.name} deleted.`, 'success');
          navigate('#/patients');
        } catch (err) {
          console.error(err);
          showToast('Failed to delete patient.', 'error');
        }
      },
    });
  });
}
