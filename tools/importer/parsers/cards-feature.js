/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-feature.
 * Base block: cards. Source: https://adelaide.edu.au/ (.container.flex-columns-lrg--4 teaser cards)
 * Rows: one per card -> [icon image | H3 + description + CTA link]
 */
export default function parse(element, { document }) {
  const cells = [];

  const cards = element.querySelectorAll('.content-container.content-block .cmp-teaser__content');
  cards.forEach((card) => {
    // Cell 1: icon
    const icon = card.querySelector('img.cmp-teaser__icon, img');
    let imageCell = '';
    if (icon) {
      const img = document.createElement('img');
      img.src = icon.getAttribute('src');
      img.alt = icon.getAttribute('alt') || '';
      imageCell = img;
    }

    // Cell 2: title, description, CTA
    const content = [];
    const title = card.querySelector('.cmp-teaser__title');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      content.push(h3);
    }

    const desc = card.querySelector('.cmp-teaser__description');
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

    card.querySelectorAll('.cmp-teaser__action-container a').forEach((a) => {
      const text = a.textContent.trim();
      if (!text) return;
      const p = document.createElement('p');
      const link = document.createElement('a');
      link.href = a.getAttribute('href');
      link.textContent = text;
      p.append(link);
      content.push(p);
    });

    if (imageCell || content.length) cells.push([imageCell, content]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  element.replaceWith(block);
}
