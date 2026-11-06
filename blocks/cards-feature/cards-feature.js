import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Cards feature: icon on top, heading, short text and an arrow link.
 * One row per card: [icon/image] [text]. Either cell may be missing.
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      const media = div.querySelector('picture, .icon');
      const mediaOnly = media && div.children.length === 1 && !div.textContent.trim();
      if (mediaOnly) div.className = 'cards-feature-card-icon';
      else if (!div.textContent.trim() && !media) div.remove();
      else div.className = 'cards-feature-card-body';
    });
    // last link-only paragraph in the body is the card CTA
    const body = li.querySelector('.cards-feature-card-body');
    if (body) {
      const last = body.lastElementChild;
      const link = last && last.tagName === 'P' ? last.querySelector('a') : null;
      if (link && last.textContent.trim() === link.textContent.trim()) {
        last.classList.add('cards-feature-card-cta');
        // keep the last word and the CSS chevron together when the label wraps
        const text = link.lastChild;
        const match = text && text.nodeType === Node.TEXT_NODE && text.textContent.match(/^(.*?)(\S+)\s*$/s);
        if (match) {
          const [, head, lastWord] = match;
          const end = document.createElement('span');
          end.className = 'cards-feature-card-cta-end';
          end.textContent = lastWord;
          text.textContent = head;
          link.append(end);
        }
      }
    }
    if (li.children.length) ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]));
  });
  block.replaceChildren(ul);
}
