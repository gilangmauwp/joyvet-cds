// Hash-based client-side router — maps URL fragments to view render functions.

import { setState } from './state.js';

let _routes = {};

/**
 * Parse the current location.hash into a structured params object.
 * Patterns: #/, #/owners, #/owners/:id, #/patients/:id,
 *           #/visits/new/diagnostic/:patientId, #/visits/new/wellness/:patientId,
 *           #/visits/:id, #/search, #/settings
 */
export function getParams() {
  const hash = location.hash.slice(1) || '/';
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0 || hash === '/') return { view: 'dashboard' };

  switch (parts[0]) {
    case 'owners':
      return parts[1]
        ? { view: 'ownerDetail', id: parts[1] }
        : { view: 'owners' };
    case 'patients':
      return parts[1]
        ? { view: 'patientDetail', id: parts[1] }
        : { view: 'patients' };
    case 'visits':
      if (parts[1] === 'new' && parts[2] && parts[3]) {
        return { view: 'visitNew', type: parts[2], patientId: parts[3] };
      }
      if (parts[1]) return { view: 'visitView', id: parts[1] };
      return { view: 'dashboard' };
    case 'search':   return { view: 'search', query: parts[1] || '' };
    case 'settings': return { view: 'settings' };
    default:         return { view: 'dashboard' };
  }
}

/** Navigate programmatically. */
export function navigate(hash) {
  location.hash = hash;
}

/** Update sidebar active-link highlight. */
function syncSidebarActive(view) {
  document.querySelectorAll('.nav-link').forEach(a => {
    const v = a.dataset.view;
    const active =
      v === view ||
      (v === 'owners'   && (view === 'ownerDetail'))   ||
      (v === 'patients' && (view === 'patientDetail' || view === 'visitNew' || view === 'visitView'));
    a.classList.toggle('active', active);
  });
}

/** Main dispatch — called on every hash change. */
async function dispatch() {
  const params = getParams();
  setState({ currentView: params.view });
  syncSidebarActive(params.view);

  const app = document.getElementById('app');
  if (app) app.innerHTML = '<div class="spinner" aria-label="Loading"></div>';

  try {
    switch (params.view) {
      case 'dashboard':     await _routes.dashboard(params); break;
      case 'owners':        await _routes.owners(params); break;
      case 'ownerDetail':   await _routes.ownerDetail(params); break;
      case 'patients':      await _routes.patients(params); break;
      case 'patientDetail': await _routes.patientDetail(params); break;
      case 'visitNew':      await _routes.visitNew(params); break;
      case 'visitView':     await _routes.visitView(params); break;
      case 'search':        await _routes.search(params); break;
      case 'settings':      await _routes.settings(params); break;
      default:              await _routes.dashboard(params);
    }
  } catch (err) {
    console.error('Router dispatch error:', err);
    if (app) app.innerHTML = `<div class="empty-state"><p>Something went wrong. <a href="#/">Return to dashboard</a></p></div>`;
  }
}

/** Initialise the router with a map of view render functions. */
export function initRouter(routes) {
  _routes = routes;
  window.addEventListener('hashchange', dispatch);
  dispatch(); // render initial view
}
