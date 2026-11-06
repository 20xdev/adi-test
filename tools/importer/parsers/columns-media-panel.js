/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-media-panel.
 * Base block: columns. Source: https://adelaide.edu.au/ (.herobanner.cmp-herobanner--image-50percent)
 * One row, two columns: [heading + paragraph + CTA | image]
 */
export default function parse(element, { document }) {
  const cells = [];

  // Column 1: text panel
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

  // Column 2: image
  let imageCell = '';
  const img = element.querySelector('.cmp-herobanner__image img');
  if (img) {
    const image = document.createElement('img');
    image.src = img.getAttribute('src');
    image.alt = img.getAttribute('alt') || '';
    imageCell = image;
  }

  cells.push([content, imageCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-media-panel', cells });
  element.replaceWith(block);
}
