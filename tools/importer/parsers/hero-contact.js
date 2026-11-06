/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-contact.
 * Base block: hero. Source: https://adelaide.edu.au/ (.cmp-experiencefragment--contact .container-has-bg)
 * Rows: 1) background image
 *       2) H2 intro, then per contact item: H3 + text / CTA / phone links
 */
export default function parse(element, { document }) {
  const cells = [];

  // Row 1: background image (img child, or inline background-image)
  let bg = null;
  const img = Array.from(element.children).find((c) => c.tagName === 'IMG')
    || element.querySelector(':scope > picture img');
  if (img && img.getAttribute('src')) {
    bg = document.createElement('img');
    bg.src = img.getAttribute('src');
    bg.alt = img.getAttribute('alt') || '';
  } else {
    const style = element.getAttribute('style') || '';
    const m = style.match(/background-image:\s*url\((['"]?)(.*?)\1\)/i);
    if (m && m[2]) {
      bg = document.createElement('img');
      bg.src = m[2];
      bg.alt = '';
    }
  }
  cells.push([bg || '']);

  // Row 2: content
  const content = [];
  const isEmptyP = (p) => !p.textContent.replace(/ /g, ' ').trim() && !p.querySelector('img, a');

  // Intro heading (and any intro text) from the centered text component
  element.querySelectorAll('.cmp-text').forEach((t) => {
    Array.from(t.children).forEach((child) => {
      if (child.tagName === 'P' && isEmptyP(child)) return;
      content.push(child);
    });
  });

  // Contact items
  element.querySelectorAll('.content-block .cmp-teaser__content').forEach((item) => {
    const title = item.querySelector('.cmp-teaser__title');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      content.push(h3);
    }

    const desc = item.querySelector('.cmp-teaser__description');
    if (desc) {
      desc.querySelectorAll(':scope > p').forEach((p) => {
        if (isEmptyP(p)) return;
        // drop trailing <br> left by the source editor
        while (p.lastElementChild && p.lastElementChild.tagName === 'BR'
          && !(p.lastChild.nodeType === 3 && p.lastChild.textContent.trim())) {
          p.lastElementChild.remove();
        }
        content.push(p);
      });
    }

    item.querySelectorAll('.cmp-teaser__action-container a').forEach((a) => {
      const text = a.textContent.trim();
      if (!text) return;
      const p = document.createElement('p');
      const link = document.createElement('a');
      link.href = a.getAttribute('href');
      link.textContent = text;
      p.append(link);
      content.push(p);
    });
  });

  cells.push([content]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-contact', cells });
  element.replaceWith(block);
}
