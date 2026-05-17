// Single responsibility: bootstrap the application — router, online/offline monitoring, service-worker registration, toast notifications.

import { initRouter }             from './router.js';
import { setOnline }              from './state.js';
import { checkBackupOverdue }     from './backup.js';

// View imports
import { renderDashboard }                       from './views/dashboard.js';
import { renderOwners, renderOwnerDetail }       from './views/owners.js';
import { renderPatients, renderPatientDetail }   from './views/patients.js';
import { renderVisitNew }                        from './views/visit-diagnostic.js';
import { renderVisitView }                       from './views/visit-view.js';
import { renderSearch }                          from './views/search.js';
import { renderSettings }                        from './views/settings.js';

// ---------------------------------------------------------------------------
// Toast notification system
// ---------------------------------------------------------------------------

/**
 * Appends a transient toast message to #toast-container.
 * @param {string} message  - Text to display.
 * @param {'success'|'error'|'info'|'warning'} type - Visual style & ARIA role.
 */
export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) {
    // Fallback: create container if it doesn't exist yet
    const el = document.createElement('div');
    el.id = 'toast-container';
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  // Accessibility: success/info use status (polite); error/warning use alert (assertive).
  const isAlert = type === 'error' || type === 'warning';
  toast.setAttribute('role', isAlert ? 'alert' : 'status');
  toast.setAttribute('aria-live', isAlert ? 'assertive' : 'polite');
  toast.setAttribute('aria-atomic', 'true');

  const target = document.getElementById('toast-container');
  if (target) target.appendChild(toast);

  // Animate in (next frame so CSS transition fires)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
  });

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hiding');
    // Remove from DOM after the CSS fade-out transition (300 ms assumed)
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// ---------------------------------------------------------------------------
// Service Worker registration
// ---------------------------------------------------------------------------

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.register('/service-worker.js');
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      if (!newWorker) return;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // A new service worker is ready — notify the user non-intrusively.
          showToast('App updated — refresh to apply the latest version.', 'info');
        }
      });
    });
  } catch (err) {
    console.warn('Service worker registration failed:', err);
  }
}

// ---------------------------------------------------------------------------
// Online / offline monitoring
// ---------------------------------------------------------------------------

function initNetworkMonitor() {
  const update = () => {
    setOnline(navigator.onLine);
    if (!navigator.onLine) {
      showToast('You are offline. Changes will sync when reconnected.', 'warning');
    } else {
      showToast('Back online.', 'success');
    }
  };

  addEventListener('online',  update);
  addEventListener('offline', update);

  // Set initial state without showing a toast (the banner handles the offline UI)
  setOnline(navigator.onLine);
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Service worker
  registerServiceWorker();

  // 2. Online/offline monitoring
  initNetworkMonitor();

  // 3. Overdue-backup check (non-blocking)
  checkBackupOverdue().catch(err => console.warn('checkBackupOverdue failed:', err));

  // 4. Router — maps view names to render functions
  initRouter({
    dashboard:     renderDashboard,
    owners:        renderOwners,
    ownerDetail:   renderOwnerDetail,
    patients:      renderPatients,
    patientDetail: renderPatientDetail,
    visitNew:      renderVisitNew,
    visitView:     renderVisitView,
    search:        renderSearch,
    settings:      renderSettings,
  });
});
