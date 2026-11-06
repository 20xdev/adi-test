/* eslint-disable */
/* global WebImporter */
/**
 * Parser for form.
 * Source: https://adelaide.edu.au/ (AEM adaptive form "register your interest")
 * Rows: one per visible field -> [Label | Type | Placeholder or options | Required]
 * Hidden tracking fields (utm_*, AMCV cookie) and reCAPTCHA are dropped.
 */
export default function parse(element, { document }) {
  const cells = [];

  const isHidden = (wrapper, control) => {
    const visibleAttr = wrapper.querySelector('[data-cmp-visible]');
    if (wrapper.getAttribute('data-cmp-visible') === 'false') return true;
    if (visibleAttr && visibleAttr.getAttribute('data-cmp-visible') === 'false') return true;
    const name = control ? (control.getAttribute('name') || '') : '';
    if (/^utm_|amcv/i.test(name)) return true;
    return false;
  };

  const labelText = (wrapper, selector) => {
    const l = wrapper.querySelector(selector);
    return l ? l.textContent.replace(/\s+/g, ' ').trim() : '';
  };

  // Field wrappers in document order (component roots of the adaptive form)
  const fields = element.querySelectorAll(
    '.cmp-adaptiveform-textinput, .cmp-adaptiveform-emailinput, .cmp-adaptiveform-dropdown, '
    + '.cmp-adaptiveform-checkbox, .cmp-adaptiveform-button, .cmp-adaptiveform-textarea, '
    + '.cmp-adaptiveform-numberinput, .cmp-adaptiveform-datepicker, .cmp-adaptiveform-telephoneinput',
  );

  fields.forEach((field) => {
    const cls = field.className;
    const wrapper = field.parentElement || field;

    // reCAPTCHA (defensive; cleanup transformer removes it too)
    if (/recaptcha/i.test(cls)) return;

    if (/cmp-adaptiveform-button/.test(cls)) {
      const text = labelText(field, '.cmp-adaptiveform-button__text') || 'Submit';
      cells.push([text, 'submit', '', '']);
      return;
    }

    if (/cmp-adaptiveform-checkbox/.test(cls)) {
      const control = field.querySelector('input');
      if (isHidden(wrapper, control) || isHidden(field, control)) return;
      const label = field.querySelector('.cmp-adaptiveform-checkbox__label');
      const labelContent = [];
      if (label) {
        const paras = label.querySelectorAll('p');
        if (paras.length) paras.forEach((p) => labelContent.push(p));
        else if (label.textContent.trim()) labelContent.push(label.textContent.trim());
      }
      if (!labelContent.length) {
        const d = labelText(field, '.cmp-adaptiveform-checkbox-description');
        if (d) labelContent.push(d);
      }
      if (!labelContent.length) return;
      // Map internal AEM content paths to public URLs (/content/.../en/about/x.html -> /about/x/)
      labelContent.forEach((node) => {
        if (typeof node === 'string') return;
        node.querySelectorAll('a[href^="/content/adelaideuniversity/au/en"]').forEach((a) => {
          const href = a.getAttribute('href')
            .replace(/^\/content\/adelaideuniversity\/au\/en/, '')
            .replace(/\.html(?=$|[?#])/, '/');
          a.setAttribute('href', href || '/');
        });
      });
      const required = control && control.hasAttribute('required') ? 'yes' : '';
      cells.push([labelContent, 'checkbox', '', required]);
      return;
    }

    if (/cmp-adaptiveform-dropdown/.test(cls)) {
      const select = field.querySelector('select');
      if (isHidden(wrapper, select) || isHidden(field, select)) return;
      const label = labelText(field, '.cmp-adaptiveform-dropdown__label');
      if (!label) return;
      const options = [];
      if (select) {
        select.querySelectorAll('option').forEach((o) => {
          const t = o.textContent.trim();
          const v = o.getAttribute('value');
          // skip the "Please select an option" placeholder
          if (!t || v === '' || /^please select/i.test(t)) return;
          const p = document.createElement('p');
          p.textContent = t;
          options.push(p);
        });
      }
      const required = !select || select.hasAttribute('required') || select.hasAttribute('data-cmp-required') ? 'yes' : '';
      cells.push([label, 'select', options, required]);
      return;
    }

    // Text-like inputs
    const control = field.querySelector('input, textarea');
    if (isHidden(wrapper, control) || isHidden(field, control)) return;
    const label = labelText(field, 'label');
    if (!label) return; // unlabeled inputs are hidden tracking fields
    if (/amcv/i.test(label)) return;

    let type = 'text';
    if (/emailinput/.test(cls)) type = 'email';
    else if (/textarea/.test(cls) || (control && control.tagName === 'TEXTAREA')) type = 'textarea';
    else if (/numberinput/.test(cls)) type = 'number';
    else if (/datepicker/.test(cls)) type = 'date';
    else if (/telephoneinput/.test(cls)) type = 'tel';
    else if (control) {
      const t = (control.getAttribute('type') || '').toLowerCase();
      if (['email', 'tel', 'number', 'date'].includes(t)) type = t;
    }

    const placeholder = control ? (control.getAttribute('placeholder') || '') : '';
    // Visible name/email fields are mandatory on the source form
    const required = (control && control.hasAttribute('required')) || /name|email/i.test(label) ? 'yes' : '';
    cells.push([label, type, placeholder, required]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'form', cells });
  element.replaceWith(block);
}
