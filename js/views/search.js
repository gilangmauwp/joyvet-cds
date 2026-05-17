// Single responsibility: render the global search view with parallel owner and patient results.

import { searchOwners, searchPatients } from '../api.js';
import { showToast }                    from '../app.js';

/**
 * Renders the Search view into #app.
 * @param {object} params
 * @param {string} [params.query] - Pre-populated search query from the URL hash.
 */
export async function renderSearch(params) {
  const app = document.getElementById('app');
  if (!app) return;

  const initialQuery = params?.query ?? '';

  app.innerHTML = `
<div class="page-header">
  <h1>Search</h1>
</div>

<div class="card">
  <form id="search-form" role="search" novalidate>
    <label for="search-input" class="card-title" style="display:block;margin-bottom:8px;">
      Search owners &amp; patients
    </label>
    <div style="display:flex;gap:8px;">
      <input
        type="search"
        id="search-input"
        name="q"
        placeholder="Name, phone, microchip…"
        autocomplete="off"
        aria-label="Search query"
        value="${_esc(initialQuery)}"
        style="flex:1;padding:10px 14px;border:1px solid rgba(26,45,80,.25);border-radius:4px;font-size:1rem;"
      >
      <button class="btn btn-primary" type="submit">Search</button>
    </div>
  </form>
</div>

<div id="search-results" style="margin-top:16px;" aria-live="polite" aria-atomic="true"></div>`;

  const form        = app.querySelector('#search-form');
  const input       = app.querySelector('#search-input');
  const resultsEl   = app.querySelector('#search-results');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) {
      resultsEl.innerHTML = '';
      return;
    }
    await _runSearch(q, resultsEl);
  });

  // Run search immediately if there's an initial query from the URL.
  if (initialQuery) {
    await _runSearch(initialQuery, resultsEl);
  } else {
    input.focus();
  }
}

// ── Core search logic ─────────────────────────────────────────────────────────

async function _runSearch(q, resultsEl) {
  resultsEl.innerHTML = `
<div class="loading-state">
  <div class="spinner" aria-label="Searching"></div>
  <span>Searching…</span>
</div>`;

  let owners   = [];
  let patients = [];

  try {
    [owners, patients] = await Promise.all([
      searchOwners(q),
      searchPatients(q),
    ]);
  } catch (err) {
    console.error('Search error:', err);
    showToast('Search failed. Please try again.', 'error');
    resultsEl.innerHTML = `<div class="empty-state"><p>Search failed. Please try again.</p></div>`;
    return;
  }

  if (!owners.length && !patients.length) {
    resultsEl.innerHTML = `
<div class="empty-state">
  <div class="empty-state-icon">🔍</div>
  <h3>No results</h3>
  <p>No owners or patients matched <strong>${_esc(q)}</strong>.</p>
</div>`;
    return;
  }

  const sections = [];

  // ── Owners section ────────────────────────────────────────────────────────
  if (owners.length) {
    const rows = owners.map(o => `
<tr>
  <td><a href="#/owners/${o.id}">${_esc(o.name)}</a></td>
  <td>${_esc(o.phone ?? '—')}</td>
  <td>${_esc(o.email ?? '—')}</td>
  <td><a href="#/owners/${o.id}" class="btn btn-sm btn-secondary">View</a></td>
</tr>`).join('');

    sections.push(`
<div class="card">
  <div class="card-header">
    <span class="card-title">Owners <span class="badge badge-info">${owners.length}</span></span>
  </div>
  <div class="table-wrapper">
    <table class="table" aria-label="Owner search results">
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
  </div>
</div>`);
  }

  // ── Patients section ──────────────────────────────────────────────────────
  if (patients.length) {
    const rows = patients.map(p => `
<tr>
  <td><a href="#/patients/${p.id}">${_esc(p.name)}</a></td>
  <td>${_esc(_capitalize(p.species ?? '—'))}</td>
  <td>${_esc(p.breed ?? '—')}</td>
  <td><a href="#/patients/${p.id}" class="btn btn-sm btn-secondary">View</a></td>
</tr>`).join('');

    sections.push(`
<div class="card" style="margin-top:16px;">
  <div class="card-header">
    <span class="card-title">Patients <span class="badge badge-info">${patients.length}</span></span>
  </div>
  <div class="table-wrapper">
    <table class="table" aria-label="Patient search results">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Species</th>
          <th scope="col">Breed</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
</div>`);
  }

  resultsEl.innerHTML = sections.join('');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function _capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function _esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
