/* eslint-disable */
/* global WebImporter */

/**
 * Adelaide University sections transformer.
 * Uses payload.template.sections (from page-templates.json) to insert
 * section breaks (<hr>) in beforeTransform and Section Metadata blocks
 * for styled sections in afterTransform.
 */

const MARKER_ATTR = 'data-excat-section-id';
const EL_ATTR = 'data-excat-section-el';

function findSectionElement(root, section) {
  const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
  for (let i = 0; i < selectors.length; i += 1) {
    const sel = selectors[i];
    if (!sel) continue;
    try {
      const el = root.querySelector(sel);
      if (el) return el;
    } catch (e) {
      // unsupported selector (e.g. :has) - try next
    }
  }
  return null;
}

export default function transform(hookName, element, payload) {
  const template = payload && payload.template;
  const sections = template && Array.isArray(template.sections) ? template.sections : [];
  if (sections.length < 2) return;

  const doc = element.ownerDocument || (payload && payload.document) || document;

  if (hookName === 'beforeTransform') {
    // Resolve all section elements first so later insertions don't affect matching.
    const resolved = sections.map((section) => findSectionElement(element, section));

    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const el = resolved[i];
      if (!el) continue;

      if (section.style) el.setAttribute(EL_ATTR, section.id);

      // First section gets a break only when styled (temporary marker, removed later).
      if (i === 0 && !section.style) continue;

      const hr = doc.createElement('hr');
      if (section.style) hr.setAttribute(MARKER_ATTR, section.id);
      if (i === 0) hr.setAttribute('data-excat-section-first', 'true');
      el.parentNode.insertBefore(hr, el);
    }
  }

  if (hookName === 'afterTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue;

      const marker = element.querySelector(`hr[${MARKER_ATTR}="${section.id}"]`);
      const el = element.querySelector(`[${EL_ATTR}="${section.id}"]`);
      const anchor = el || marker;
      if (!anchor) continue;

      const meta = WebImporter.Blocks.createBlock(doc, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      anchor.after(meta);
    }

    // Clean up temporary attributes / first-section marker hr.
    element.querySelectorAll(`[${EL_ATTR}]`).forEach((n) => n.removeAttribute(EL_ATTR));
    element.querySelectorAll(`hr[${MARKER_ATTR}]`).forEach((hr) => {
      if (hr.getAttribute('data-excat-section-first') === 'true') {
        hr.remove();
      } else {
        hr.removeAttribute(MARKER_ATTR);
      }
    });
  }
}
