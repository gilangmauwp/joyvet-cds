// Single responsibility: render accessible HTML form fields and read their values.

/**
 * Renders a complete, accessible form field as an HTML string.
 *
 * @param {object} opts
 * @param {string}  opts.id          - Unique element id (also used as name).
 * @param {string}  opts.label       - Human-readable label text.
 * @param {string}  [opts.type]      - Input type, 'select', or 'textarea'. Default: 'text'.
 * @param {string}  [opts.value]     - Initial value. Default: ''.
 * @param {boolean} [opts.required]  - Mark field as required. Default: false.
 * @param {Array}   [opts.options]   - For type='select': [{value, label}] or plain strings.
 * @param {string}  [opts.placeholder] - Placeholder text for input/textarea.
 * @param {string}  [opts.hint]      - Helper text shown below the control.
 * @returns {string} HTML string.
 */
export function formField({
  id,
  label,
  type = 'text',
  value = '',
  required = false,
  options = [],
  placeholder = '',
  hint = '',
} = {}) {
  const labelText = `${label}${required ? ' *' : ''}`;
  const describedBy = hint ? ` aria-describedby="${id}-hint"` : '';
  const requiredAttr = required ? ' required aria-required="true"' : '';
  const placeholderAttr = placeholder ? ` placeholder="${_esc(placeholder)}"` : '';

  let control = '';

  if (type === 'select') {
    const optionsHtml = options.map(opt => {
      const optVal  = typeof opt === 'object' ? opt.value : opt;
      const optLabel = typeof opt === 'object' ? opt.label : opt;
      const selected = String(optVal) === String(value) ? ' selected' : '';
      return `<option value="${_esc(String(optVal))}"${selected}>${_esc(String(optLabel))}</option>`;
    }).join('');

    control = `<select id="${id}" name="${id}"${requiredAttr}${describedBy}>`
      + `<option value="">-- Select --</option>`
      + optionsHtml
      + `</select>`;

  } else if (type === 'textarea') {
    control = `<textarea id="${id}" name="${id}" rows="3"`
      + `${requiredAttr}${describedBy}${placeholderAttr}>`
      + `${_esc(String(value))}</textarea>`;

  } else {
    const typeAttr = ` type="${type}"`;
    const valueAttr = value !== '' ? ` value="${_esc(String(value))}"` : '';
    control = `<input${typeAttr} id="${id}" name="${id}"`
      + `${valueAttr}${requiredAttr}${describedBy}${placeholderAttr}>`;
  }

  const hintHtml = hint
    ? `<div class="field-hint" id="${id}-hint">${_esc(hint)}</div>`
    : '';

  return `<div class="field">
  <label for="${id}">${_esc(labelText)}</label>
  ${control}
  ${hintHtml}
</div>`;
}

/**
 * Returns the current value of a form field by id.
 * @param {string} id
 * @returns {string}
 */
export function formFieldValue(id) {
  return document.getElementById(id)?.value ?? '';
}

/** Escapes HTML special characters in attribute values and text nodes. */
function _esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
