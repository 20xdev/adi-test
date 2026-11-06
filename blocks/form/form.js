/**
 * Simple form block (e.g. a newsletter "Stay in touch" sign-up).
 *
 * Two authoring modes:
 * 1. Inline rows, one per field: [Label] [Type] [Placeholder or options] [Required]
 *    - Type: text | email | tel | number | date | textarea | select | checkbox | submit
 *      (missing/unknown type falls back to text)
 *    - select: third cell lists options, one per line or comma-separated
 *    - checkbox: the label cell may contain rich text and links
 *    - Required: "yes", "true", "required" or "*" marks the field mandatory;
 *      a label ending in "*" is also mandatory
 *    - Config rows: Type "action" (third cell or a link = submission URL) and
 *      Type "success" (label cell = message shown after submit)
 * 2. A single link to a spreadsheet JSON (`/forms/x.json`) with columns
 *    Label, Name, Type, Placeholder, Options, Mandatory. Rows of Type
 *    "action"/"success" behave as above (value in Placeholder).
 *
 * Submissions are POSTed as JSON `{ data: { ...fields } }` to the action URL.
 * @param {Element} block
 */

const REQUIRED = /^(yes|true|required|\*|y|x)$/i;
const FIELD_TYPES = ['text', 'email', 'tel', 'number', 'date', 'textarea', 'select', 'checkbox', 'submit'];

function toName(label, index) {
  const slug = label.toLowerCase().replace(/\*/g, '').trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return slug || `field-${index}`;
}

function parseOptions(value) {
  return value.split(/\n|,/).map((o) => o.trim()).filter(Boolean);
}

function readInlineRows(block) {
  return [...block.children].map((row) => {
    const [labelCell, typeCell, valueCell, requiredCell] = row.children;
    const labelText = labelCell ? labelCell.textContent.trim() : '';
    const valueLink = valueCell && valueCell.querySelector('a[href]');
    let value = '';
    if (valueCell) {
      value = valueCell.querySelectorAll('p, li').length > 1
        ? [...valueCell.querySelectorAll('p, li')].map((p) => p.textContent.trim()).join('\n')
        : valueCell.textContent.trim();
    }
    return {
      label: labelText,
      labelHtml: labelCell ? labelCell.innerHTML : '',
      name: '',
      type: typeCell ? typeCell.textContent.trim().toLowerCase() : 'text',
      value: valueLink ? valueLink.getAttribute('href') : value,
      required: (requiredCell && REQUIRED.test(requiredCell.textContent.trim()))
        || /\*\s*$/.test(labelText),
    };
  }).filter((f) => f.label || f.value);
}

async function readSheet(href) {
  const resp = await fetch(href);
  if (!resp.ok) return [];
  const json = await resp.json();
  const rows = json.data || (json[':names'] ? json[json[':names'][0]].data : []) || [];
  return rows.map((r) => ({
    label: r.Label || '',
    labelHtml: '',
    name: r.Name || '',
    type: (r.Type || 'text').toLowerCase(),
    value: r.Type && r.Type.toLowerCase() === 'select' ? (r.Options || '') : (r.Placeholder || ''),
    required: REQUIRED.test(String(r.Mandatory || '').trim()),
  }));
}

function buildField(def, index, formId) {
  const type = FIELD_TYPES.includes(def.type) ? def.type : 'text';
  const wrapper = document.createElement('div');
  wrapper.className = `form-field form-field-${type}`;
  const id = `${formId}-${index}`;
  const name = def.name || toName(def.label, index);
  const cleanLabel = def.label.replace(/\*\s*$/, '').trim();

  if (type === 'submit') {
    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'button';
    button.textContent = cleanLabel || 'Submit';
    wrapper.append(button);
    return wrapper;
  }

  const label = document.createElement('label');
  label.htmlFor = id;

  let control;
  if (type === 'textarea') {
    control = document.createElement('textarea');
    if (def.value) control.placeholder = def.value;
  } else if (type === 'select') {
    control = document.createElement('select');
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Please select an option';
    control.append(placeholder);
    parseOptions(def.value).forEach((o) => {
      const option = document.createElement('option');
      option.value = o;
      option.textContent = o;
      control.append(option);
    });
  } else {
    control = document.createElement('input');
    control.type = type;
    if (type === 'checkbox') control.value = 'yes';
    else if (def.value) control.placeholder = def.value;
  }
  control.id = id;
  control.name = name;
  if (def.required) {
    control.required = true;
    wrapper.classList.add('form-field-required');
  }

  if (type === 'checkbox') {
    // keep authored rich text (links) in the checkbox label
    const tmp = document.createElement('div');
    tmp.innerHTML = def.labelHtml || cleanLabel;
    label.append(...tmp.childNodes);
    wrapper.append(control, label);
  } else {
    label.textContent = cleanLabel;
    wrapper.append(label, control);
  }
  return wrapper;
}

function collect(form) {
  const data = {};
  [...form.elements].forEach((el) => {
    if (!el.name) return;
    if (el.type === 'checkbox') data[el.name] = el.checked ? el.value : '';
    else data[el.name] = el.value;
  });
  return data;
}

export default async function decorate(block) {
  const links = block.querySelectorAll('a[href]');
  const sheetLink = links.length === 1 && block.textContent.trim() === links[0].textContent.trim()
    && /\.json(\?|$)/.test(links[0].getAttribute('href'))
    ? links[0].getAttribute('href') : null;

  let defs = [];
  try {
    defs = sheetLink ? await readSheet(sheetLink) : readInlineRows(block);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('form: could not load definition', e);
  }

  let action = '';
  let success = 'Thank you. Your submission has been received.';
  const fields = defs.filter((d) => {
    if (d.type === 'action') { action = d.value; return false; }
    if (d.type === 'success') { success = d.label || d.value || success; return false; }
    return true;
  });
  if (!fields.some((f) => f.type === 'submit')) fields.push({ label: 'Submit', type: 'submit' });

  const formId = `form-${Math.random().toString(36).slice(2, 8)}`;
  const form = document.createElement('form');
  form.className = 'form-form';
  form.noValidate = false;
  fields.forEach((def, i) => form.append(buildField(def, i, formId)));

  const status = document.createElement('div');
  status.className = 'form-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const submit = form.querySelector('button[type="submit"]');
    if (submit) submit.disabled = true;
    status.className = 'form-status';
    status.textContent = '';
    try {
      if (action) {
        const resp = await fetch(action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: collect(form) }),
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      } else {
        // eslint-disable-next-line no-console
        console.warn('form: no action URL configured; submission was not sent');
      }
      form.reset();
      status.classList.add('form-status-success');
      status.textContent = success;
    } catch (err) {
      status.classList.add('form-status-error');
      status.textContent = 'Sorry, something went wrong. Please try again.';
    } finally {
      if (submit) submit.disabled = false;
    }
  });

  block.replaceChildren(form, status);
}
