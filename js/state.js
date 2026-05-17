// In-memory app state — single source of truth; no window globals.

export const state = {
  currentView: 'dashboard',
  currentOwner: null,
  currentPatient: null,
  currentVisit: null,
  isOnline: navigator.onLine,
  search: { query: '', results: [] },
  // Transient visit-builder state (cleared between visits)
  visitDraft: null,
};

export function setState(patch) {
  Object.assign(state, patch);
}

export function setOnline(online) {
  state.isOnline = online;
  const banner = document.getElementById('offline-banner');
  if (banner) banner.hidden = online;
}

export function clearVisitDraft() {
  state.visitDraft = null;
}
