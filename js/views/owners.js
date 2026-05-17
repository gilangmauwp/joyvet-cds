// Single responsibility: render the Owners list, Owner detail page, and inline patient management.

import {
  getOwners, getOwner, saveOwner, deleteOwner, confirmDeleteOwner,
  getPatients, savePatient, searchOwners,
} from '../api.js';
import { navigate }     from '../router.js';
import { showToast }    from '../app.js';
import { showModal }    from '../components/modal.js';
import { formField, formFieldValue } from '../components/form-field.js';

// ── Owner list ────────────────────────────────────────────────────────────────

export async function renderOwners(_params) {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
<div class="page-header">
  <h1>Owners</h1>
  <button class="btn btn-primary" id="btn-new-owner" type="button">+ New Owner</button>
</div>
<div class="card" id="owner-form-card" hidden></div>
<div class="card" style="margin-top:16px;">
  <div class="card-header" style="margin-bottom:12px;">
    <label for="owner-search" class="card-title">Search owners</label>
  </div>
  <input type="search" id="owner-search" placeholder="Type a name…"
    style="width:100%;padding:8px 12px;border:1px solid rgba(26,45,80,.25);border-radius:4px;font-size:.9rem;margin-bottom:16px;">
  <div id="owners-table-wrap">
    <div class="loading-state"><div class="spinner" aria-label="Loading"></div><span>Loading…</span></div>
  </div>
</div>`;

  const formCard  = app.querySelector('#owner-form-card');
  const tableWrap = app.querySelector('#owners-table-wrap');
  const searchEl  = app.querySelector('#owner-search');

  // Cache the full list for client-side filtering
  let allOwners = [];

  async function loadOwners() {
    try {
      allOwners = await getOwners();
      renderTable(allOwners);
    } catch (err) {
      console.error(err);
      tableWrap.innerHTML = `<div class="empty-state"><p>Failed to load owners.</p></div>`;
    }
  }

  function renderTable(owners) {
    if (!owners.length) {
      tableWrap.innerHTML = `
<div class="empty-state">
  <div class="empty-state-icon">🐾</div>
  <h3>No owners found</h3>
  <p>Add your first owner with the button above.</p>
</div>`;
      return;
    }

    const rows = owners.map(o => `
<tr>
  <td>${_esc(o.name)}</td>
  <td>${_esc(o.phone ?? '—')}</td>
  <td>${_esc(o.email ?? '—')}</td>
  <td>
    <a href="#/owners/${o.id}" class="btn btn-sm btn-secondary">View</a>
  </td>
</tr>`).join('');

    tableWrap.innerHTML = `
<div class="table-wrapper">
  <table class="table" aria-label="Owners list">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Phone</th>
        <th scope="col">Email</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</div>`;
  }

  // ── Search ──────────────────────────────────────────────────────────────
  let searchTimer = null;
  searchEl.addEventListener('input', () => {
    clearTimeout(searchTimer);
    const q = searchEl.value.trim();
    if (!q) { renderTable(allOwners); return; }

    searchTimer = setTimeout(async () => {
      if (allOwners.length < 50) {
        const lower = q.toLowerCase();
        renderTable(allOwners.filter(o =>
          (o.name ?? '').toLowerCase().includes(lower) ||
          (o.phone ?? '').includes(q) ||
          (o.email ?? '').toLowerCase().includes(lower)
        ));
      } else {
        try {
          const results = await searchOwners(q);
          renderTable(results);
        } catch (_) { renderTable([]); }
      }
    }, 250);
  });

  // ── New owner inline form ───────────────────────────────────────────────
  app.querySelector('#btn-new-owner').addEventListener('click', () => {
    formCard.hidden = false;
    formCard.innerHTML = _ownerFormHtml({});
    formCard.querySelector('#cancel-owner-form').addEventListener('click', () => {
      formCard.hidden = true;
    });
    formCard.querySelector('#save-owner-form').addEventListener('click', async () => {
      await _submitOwnerForm(formCard, null, async (saved) => {
        showToast(`Owner "${saved.name}" created.`, 'success');
        formCard.hidden = true;
        await loadOwners();
      });
    });
    formCard.querySelector('#owner-name').focus();
  });

  await loadOwners();
}

// ── Owner detail ───────────────────────────────────────────────────────────────

export async function renderOwnerDetail(params) {
  const app = document.getElementById('app');
  if (!app) return;

  const id = params?.id;
  if (!id) { navigate('#/owners'); return; }

  app.innerHTML = `<div class="loading-state"><div class="spinner" aria-label="Loading"></div><span>Loading owner…</span></div>`;

  let owner, patients;
  try {
    [owner, patients] = await Promise.all([getOwner(id), getPatients(id)]);
  } catch (err) {
    console.error(err);
    showToast('Failed to load owner.', 'error');
    app.innerHTML = `<div class="empty-state"><p>Owner not found. <a href="#/owners">Back to owners</a></p></div>`;
    return;
  }

  if (!owner) {
    app.innerHTML = `<div class="empty-state"><p>Owner not found. <a href="#/owners">Back to owners</a></p></div>`;
    return;
  }

  function renderPage(editMode = false, patientFormOpen = false) {
    app.innerHTML = `
<nav class="breadcrumb text-sm text-muted" aria-label="Breadcrumb" style="margin-bottom:12px;">
  <a href="#/owners">Owners</a> &rsaquo; <strong>${_esc(owner.name)}</strong>
</nav>

<div class="page-header">
  <h1>${_esc(owner.name)}</h1>
  <div style="display:flex;gap:8px;">
    <button class="btn btn-secondary" id="btn-edit-owner" type="button">Edit</button>
    <button class="btn btn-danger"    id="btn-delete-owner" type="button">Delete</button>
  </div>
</div>

<div class="card" id="owner-info-card">
  ${editMode ? _ownerFormHtml(owner, true) : _ownerInfoHtml(owner)}
</div>

<div class="card" style="margin-top:16px;">
  <div class="card-header">
    <span class="card-title">Patients (${patients.length})</span>
    <button class="btn btn-sm btn-primary" id="btn-add-patient" type="button">+ Add Patient</button>
  </div>
  <div id="patient-form-wrap" ${patientFormOpen ? '' : 'hidden'}></div>
  ${_patientsHtml(patients)}
</div>`;

    // ── Edit owner ──────────────────────────────────────────────────────────
    app.querySelector('#btn-edit-owner').addEventListener('click', () => {
      renderPage(true, false);
    });

    if (editMode) {
      const card = app.querySelector('#owner-info-card');
      card.querySelector('#cancel-owner-form')?.addEventListener('click', () => renderPage(false));
      card.querySelector('#save-owner-form')?.addEventListener('click', async () => {
        await _submitOwnerForm(card, owner.id, async (saved) => {
          owner = saved;
          showToast('Owner updated.', 'success');
          renderPage(false);
        });
      });
    }

    // ── Delete owner ────────────────────────────────────────────────────────
    app.querySelector('#btn-delete-owner').addEventListener('click', async () => {
      let preview;
      try { preview = await deleteOwner(id); } catch (_) { preview = {}; }
      const pCount = preview?.patients?.length ?? patients.length;
      const vCount = preview?.visits?.length ?? 0;

      showModal({
        title: `Delete ${owner.name}?`,
        body: `<p>This will permanently delete:</p>
<ul style="margin:8px 0 0 16px;line-height:1.8;">
  <li><strong>${pCount}</strong> patient${pCount !== 1 ? 's' : ''}</li>
  <li><strong>${vCount}</strong> visit record${vCount !== 1 ? 's' : ''}</li>
</ul>
<p style="margin-top:12px;">This action cannot be undone.</p>`,
        confirmLabel: 'Delete permanently',
        danger: true,
        onConfirm: async () => {
          try {
            await confirmDeleteOwner(id);
            showToast(`Owner "${owner.name}" deleted.`, 'success');
            navigate('#/owners');
          } catch (err) {
            console.error(err);
            showToast('Delete failed. Please try again.', 'error');
          }
        },
      });
    });

    // ── Add patient ─────────────────────────────────────────────────────────
    const patientFormWrap = app.querySelector('#patient-form-wrap');
    app.querySelector('#btn-add-patient').addEventListener('click', () => {
      patientFormWrap.hidden = false;
      patientFormWrap.innerHTML = _patientFormHtml({});
      patientFormWrap.querySelector('#cancel-patient-form')?.addEventListener('click', () => {
        patientFormWrap.hidden = true;
      });
      patientFormWrap.querySelector('#save-patient-form')?.addEventListener('click', async () => {
        await _submitPatientForm(patientFormWrap, owner.id, null, async (saved) => {
          showToast(`Patient "${saved.name}" added.`, 'success');
          patients = await getPatients(id);
          renderPage(false);
        });
      });
      patientFormWrap.querySelector('#patient-name')?.focus();
    });
  }

  renderPage(false);
}

// ── Form helpers ──────────────────────────────────────────────────────────────

function _ownerFormHtml(owner = {}, isEdit = false) {
  return `<form novalidate>
  <h2 style="margin-bottom:16px;">${isEdit ? 'Edit Owner' : 'New Owner'}</h2>
  <div class="form-row">
    ${formField({ id:'owner-name',    label:'Name',    required:true,  value: owner.name    ?? '' })}
    ${formField({ id:'owner-phone',   label:'Phone',   type:'tel',     value: owner.phone   ?? '' })}
  </div>
  <div class="form-row">
    ${formField({ id:'owner-email',   label:'Email',   type:'email',   value: owner.email   ?? '' })}
    ${formField({ id:'owner-address', label:'Address',                 value: owner.address ?? '' })}
  </div>
  ${formField({ id:'owner-notes', label:'Notes', type:'textarea', value: owner.notes ?? '' })}
  <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px;">
    <button class="btn btn-secondary" id="cancel-owner-form" type="button">Cancel</button>
    <button class="btn btn-primary"   id="save-owner-form"   type="button">Save</button>
  </div>
</form>`;
}

function _ownerInfoHtml(owner) {
  const row = (label, val) => val
    ? `<div class="text-sm" style="margin-bottom:6px;"><strong>${label}:</strong> ${_esc(val)}</div>`
    : '';
  return `
${row('Phone', owner.phone)}
${row('Email', owner.email)}
${row('Address', owner.address)}
${owner.notes ? `<hr class="divider"><div class="text-sm text-muted">${_esc(owner.notes)}</div>` : ''}`;
}

function _patientsHtml(patients) {
  if (!patients.length) {
    return `<div class="empty-state" style="padding:24px 0;"><p>No patients yet. Add one above.</p></div>`;
  }
  const rows = patients.map(p => `
<tr>
  <td>${_esc(p.name)}</td>
  <td>${_esc(p.species ?? '—')}</td>
  <td>${_esc(p.breed   ?? '—')}</td>
  <td><a href="#/patients/${p.id}" class="btn btn-sm btn-secondary">View</a></td>
</tr>`).join('');
  return `
<div class="table-wrapper">
  <table class="table" aria-label="Patients">
    <thead>
      <tr>
        <th scope="col">Name</th><th scope="col">Species</th>
        <th scope="col">Breed</th><th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</div>`;
}

function _patientFormHtml(patient = {}) {
  const sexOptions = [
    { value: '',               label: '-- Select --' },
    { value: 'male_intact',    label: 'Male (intact)' },
    { value: 'male_neutered',  label: 'Male (neutered)' },
    { value: 'female_intact',  label: 'Female (intact)' },
    { value: 'female_spayed',  label: 'Female (spayed)' },
  ];
  const speciesOptions = [
    { value: 'dog',    label: 'Dog' },
    { value: 'cat',    label: 'Cat' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'bird',   label: 'Bird' },
    { value: 'exotic', label: 'Exotic / Other' },
  ];
  return `<form novalidate style="padding:16px 0;">
  <h3 style="margin-bottom:12px;">New Patient</h3>
  <div class="form-row">
    ${formField({ id:'patient-name',    label:'Name',    required:true, value: patient.name    ?? '' })}
    ${formField({ id:'patient-species', label:'Species', type:'select', required:true, value: patient.species ?? '', options: speciesOptions })}
  </div>
  <div class="form-row">
    ${formField({ id:'patient-breed',  label:'Breed',  value: patient.breed  ?? '' })}
    ${formField({ id:'patient-sex',    label:'Sex',    type:'select', value: patient.sex ?? '', options: sexOptions })}
  </div>
  <div class="form-row">
    ${formField({ id:'patient-dob',        label:'Date of Birth',  type:'date',  value: patient.dob        ?? '' })}
    ${formField({ id:'patient-colour',     label:'Colour / Coat',                value: patient.colour     ?? '' })}
  </div>
  ${formField({ id:'patient-microchip', label:'Microchip Number', value: patient.microchip ?? '' })}
  ${formField({ id:'patient-notes',     label:'Notes', type:'textarea', value: patient.notes ?? '' })}
  <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px;">
    <button class="btn btn-secondary" id="cancel-patient-form" type="button">Cancel</button>
    <button class="btn btn-primary"   id="save-patient-form"   type="button">Save Patient</button>
  </div>
</form>`;
}

// ── Shared submit helpers ─────────────────────────────────────────────────────

async function _submitOwnerForm(container, existingId, onSuccess) {
  const name = formFieldValue('owner-name').trim();
  if (!name) {
    showToast('Name is required.', 'error');
    container.querySelector('#owner-name')?.focus();
    return;
  }
  const btn = container.querySelector('#save-owner-form');
  if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

  try {
    const data = {
      ...(existingId ? { id: existingId } : {}),
      name,
      phone:   formFieldValue('owner-phone').trim(),
      email:   formFieldValue('owner-email').trim(),
      address: formFieldValue('owner-address').trim(),
      notes:   formFieldValue('owner-notes').trim(),
    };
    const saved = await saveOwner(data);
    await onSuccess(saved);
  } catch (err) {
    console.error(err);
    showToast('Failed to save owner.', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Save'; }
  }
}

async function _submitPatientForm(container, ownerId, existingId, onSuccess) {
  const name    = formFieldValue('patient-name').trim();
  const species = formFieldValue('patient-species').trim();
  if (!name)    { showToast('Patient name is required.', 'error'); return; }
  if (!species) { showToast('Species is required.', 'error'); return; }

  const btn = container.querySelector('#save-patient-form');
  if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

  try {
    const data = {
      ...(existingId ? { id: existingId } : {}),
      ownerId,
      name,
      species,
      breed:     formFieldValue('patient-breed').trim(),
      sex:       formFieldValue('patient-sex').trim(),
      dob:       formFieldValue('patient-dob').trim(),
      colour:    formFieldValue('patient-colour').trim(),
      microchip: formFieldValue('patient-microchip').trim(),
      notes:     formFieldValue('patient-notes').trim(),
    };
    const saved = await savePatient(data);
    await onSuccess(saved);
  } catch (err) {
    console.error(err);
    showToast('Failed to save patient.', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Save Patient'; }
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
