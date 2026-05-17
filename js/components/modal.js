// Single responsibility: render a focus-trapped, keyboard-accessible confirmation modal.

const FOCUSABLE = [
  'a[href]',
  'button:not(:disabled)',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

let _currentCleanup = null;

/**
 * Renders a modal into #modal-container and wires up focus trap, Escape, overlay-click.
 *
 * @param {object} opts
 * @param {string}   opts.title
 * @param {string}   opts.body          - HTML string or plain text for the modal body.
 * @param {string}   [opts.confirmLabel] - Default: 'Confirm'.
 * @param {string}   [opts.cancelLabel]  - Default: 'Cancel'.
 * @param {Function} [opts.onConfirm]
 * @param {Function} [opts.onCancel]
 * @param {boolean}  [opts.danger]       - If true, confirm button uses btn-danger. Default: false.
 */
export function showModal({
  title,
  body,
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
} = {}) {
  // Tear down any existing modal first.
  closeModal();

  const container = document.getElementById('modal-container');
  if (!container) return;

  const confirmClass = danger ? 'btn btn-danger' : 'btn btn-primary';

  container.innerHTML = `
<div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
  <div class="modal">
    <div class="modal-header">
      <h2 id="modal-title">${_esc(title)}</h2>
    </div>
    <div class="modal-body">${body}</div>
    <div class="modal-footer modal-actions">
      <button class="btn btn-secondary" id="modal-cancel" type="button">${_esc(cancelLabel)}</button>
      <button class="${confirmClass}" id="modal-confirm" type="button">${_esc(confirmLabel)}</button>
    </div>
  </div>
</div>`;

  const overlay = container.querySelector('.modal-overlay');
  const modal   = container.querySelector('.modal');
  const cancelBtn  = container.querySelector('#modal-cancel');
  const confirmBtn = container.querySelector('#modal-confirm');

  // ── Focus management ──────────────────────────────────────────────────────
  // Save previously focused element to restore on close.
  const previouslyFocused = document.activeElement;

  // Focus confirm button after paint.
  requestAnimationFrame(() => cancelBtn.focus());

  // ── Focus trap ────────────────────────────────────────────────────────────
  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(modal.querySelectorAll(FOCUSABLE));
    if (focusable.length === 0) { e.preventDefault(); return; }

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // ── Escape key ────────────────────────────────────────────────────────────
  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      _handleCancel();
    }
    trapFocus(e);
  }

  // ── Overlay click cancels (only if clicking outside .modal) ───────────────
  function onOverlayClick(e) {
    if (e.target === overlay) _handleCancel();
  }

  // ── Handlers ──────────────────────────────────────────────────────────────
  function _handleCancel() {
    _cleanup();
    if (typeof onCancel === 'function') onCancel();
  }

  function _handleConfirm() {
    _cleanup();
    if (typeof onConfirm === 'function') onConfirm();
  }

  function _cleanup() {
    document.removeEventListener('keydown', onKeydown);
    overlay.removeEventListener('click', onOverlayClick);
    container.innerHTML = '';
    _currentCleanup = null;
    // Restore focus
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus();
    }
  }

  _currentCleanup = _cleanup;

  cancelBtn.addEventListener('click',  _handleCancel);
  confirmBtn.addEventListener('click', _handleConfirm);
  overlay.addEventListener('click',    onOverlayClick);
  document.addEventListener('keydown', onKeydown);
}

/**
 * Closes the currently open modal programmatically (no callbacks fired).
 */
export function closeModal() {
  if (typeof _currentCleanup === 'function') {
    _currentCleanup();
  } else {
    const container = document.getElementById('modal-container');
    if (container) container.innerHTML = '';
  }
}

function _esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
