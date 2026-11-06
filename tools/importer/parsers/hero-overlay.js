/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-overlay.
 * Base block: hero. Source: https://adelaide.edu.au/ (.herobanner.cmp-herobanner--overlay)
 * Rows: 1) background image  2) heading + paragraph(s) + CTA link
 */
export default function parse(element, { document }) {
  const cells = [];

  // Row 1: background image
  const img = element.querySelector('.cmp-herobanner__image img');
  if (img) {
    const image = document.createElement('img');
    image.src = img.getAttribute('src');
    image.alt = img.getAttribute('alt') || '';
    cells.push([image]);
  } else {
    cells.push(['']);
  }

  // Row 2: heading, description, CTA
  const content = [];
  const title = element.querySelector('.cmp-herobanner__title');
  if (title) {
    const level = /^H[1-6]$/.test(title.tagName) ? title.tagName.toLowerCase() : 'h2';
    const h = document.createElement(level);
    h.textContent = title.textContent.trim();
    content.push(h);
  }

  const desc = element.querySelector('.cmp-herobanner__description');
  if (desc) {
    const paras = desc.querySelectorAll('p');
    if (paras.length) {
      paras.forEach((p) => { if (p.textContent.trim()) content.push(p); });
    } else if (desc.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      content.push(p);
    }
  }

  element.querySelectorAll('.cmp-herobanner__actions a.cmp-herobanner__action-link').forEach((a) => {
    const text = a.textContent.trim();
    if (!text) return;
    const p = document.createElement('p');
    const link = document.createElement('a');
    link.href = a.getAttribute('href');
    link.textContent = text;
    p.append(link);
    content.push(p);
  });

  cells.push([content]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-overlay', cells });
  element.replaceWith(block);
}
