/* eslint-disable */
/* global WebImporter */
/**
 * Parser for search-degree.
 * Base block: search. Source: https://adelaide.edu.au/ (.searchbar .cmp-fb--search form)
 * Rows: 1) link to results page (empty query param = input name)
 *       2) placeholder text  3) optional "Button: <label>"
 */
export default function parse(element, { document }) {
  const cells = [];

  // Results page (form action), defaulting to the site search page
  let action = element.getAttribute('action') || '/search/';
  try {
    const u = new URL(action, 'https://adelaide.edu.au/');
    action = u.hostname.endsWith('adelaide.edu.au') ? u.pathname : u.href;
  } catch (e) {
    action = '/search/';
  }

  // Fixed filters the source form submits as hidden inputs (removed by cleanup,
  // so fall back to the known source values).
  const params = [];
  const hidden = element.querySelectorAll('input[type="hidden"][name]');
  hidden.forEach((h) => {
    if (h.name === 'search') return; // Funnelback API endpoint, not a query filter
    params.push([h.name, h.value]);
  });
  if (!params.length) {
    params.push(['collection', 'uosa~sp-aem-prod']);
    params.push(['profile', 'site-search']);
    params.push(['f.Tabs|type', 'Degrees & Courses']);
  }

  const field = element.querySelector('input.cmp-fb--search-field, input#search-input');
  const queryName = (field && field.getAttribute('name')) || 'query';

  const qs = params
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .concat(`${encodeURIComponent(queryName)}=`)
    .join('&');
  const href = `${action}?${qs}`;

  const link = document.createElement('a');
  link.href = href;
  link.textContent = href;
  cells.push([link]);

  // Placeholder text (placeholder attr, else visible label)
  const label = element.querySelector('.cmp-fb--search-field-wrapper label, label');
  const placeholder = (field && field.getAttribute('placeholder'))
    || (label && label.textContent.trim())
    || '';
  if (placeholder) cells.push([placeholder]);

  // Button label
  const button = element.querySelector('button.cmp-fb--search-button, button[type="submit"]');
  const buttonText = button ? button.textContent.trim() : '';
  if (buttonText) cells.push([`Button: ${buttonText}`]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'search-degree', cells });
  element.replaceWith(block);
}
