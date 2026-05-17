// Single responsibility: render and wire up independent, keyboard-accessible accordion components.

/**
 * Renders an accordion list as an HTML string.
 *
 * @param {Array<{title: string, body: string, open?: boolean}>} items
 * @returns {string} HTML string — insert into the DOM then call initAccordions(container).
 */
export function renderAccordion(items) {
  if (!Array.isArray(items) || items.length === 0) return '';

  return items.map((item, idx) => {
    const id       = `accordion-panel-${idx}-${Math.random().toString(36).slice(2, 7)}`;
    const btnId    = `accordion-btn-${idx}-${Math.random().toString(36).slice(2, 7)}`;
    const expanded = item.open ? 'true' : 'false';
    const hidden   = item.open ? 'false' : 'true';
    const bodyStyle = item.open ? '' : ' hidden';

    return `<div class="accordion accordion-item">
  <button
    class="accordion-header"
    id="${btnId}"
    aria-expanded="${expanded}"
    aria-controls="${id}"
    type="button"
  >${item.title}</button>
  <div
    class="accordion-body"
    id="${id}"
    role="region"
    aria-labelledby="${btnId}"
    aria-hidden="${hidden}"${bodyStyle}
  >${item.body}</div>
</div>`;
  }).join('\n');
}

/**
 * Wires click and keyboard handlers to all accordion buttons inside a container.
 * Each accordion is independent — opening one does NOT close others.
 *
 * @param {Element} container - The DOM element that contains the rendered accordion HTML.
 */
export function initAccordions(container) {
  if (!container) return;

  const buttons = container.querySelectorAll('.accordion-header');

  buttons.forEach(btn => {
    // Remove any existing listener by cloning the node (avoids duplicates on re-render).
    const fresh = btn.cloneNode(true);
    btn.replaceWith(fresh);

    fresh.addEventListener('click', () => _toggle(fresh));

    fresh.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        _toggle(fresh);
      }
    });
  });
}

/** Toggles one accordion panel open/closed. */
function _toggle(btn) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  const panelId  = btn.getAttribute('aria-controls');
  const panel    = document.getElementById(panelId);

  if (!panel) return;

  const next = !expanded;
  btn.setAttribute('aria-expanded', String(next));
  panel.setAttribute('aria-hidden', String(!next));

  if (next) {
    panel.removeAttribute('hidden');
  } else {
    panel.setAttribute('hidden', '');
  }
}
