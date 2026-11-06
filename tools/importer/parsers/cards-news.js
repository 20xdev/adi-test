/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-news.
 * Base block: cards. Source: https://adelaide.edu.au/ (news teaser grid in experience fragment)
 * Rows: one per card -> [image | date paragraph + H3 + excerpt + Read More link]
 */
export default function parse(element, { document }) {
  const cells = [];

  const cards = element.querySelectorAll('.content-container.content-block .teaser-wrapper');
  cards.forEach((card) => {
    // Cell 1: image
    let imageCell = '';
    const img = card.querySelector('.cmp-teaser__image img');
    if (img) {
      const image = document.createElement('img');
      image.src = img.getAttribute('src');
      image.alt = (img.getAttribute('alt') || '').trim();
      imageCell = image;
    }

    // Cell 2: date, title, excerpt, CTA
    const content = [];
    const pretitle = card.querySelector('.cmp-teaser__pretitle');
    if (pretitle && pretitle.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = pretitle.textContent.trim();
      content.push(p);
    }

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

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-news', cells });
  element.replaceWith(block);
}
