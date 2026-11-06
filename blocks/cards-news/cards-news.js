import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Cards news: photo on top, date tag, heading, excerpt and a Read More button.
 * One row per card: [image] [text]. In the text cell, a paragraph before the
 * heading is treated as the date tag; a trailing link-only paragraph is the CTA.
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-news-card-image';
      else if (!div.textContent.trim() && !div.querySelector('picture')) div.remove();
      else div.className = 'cards-news-card-body';
    });

    const body = li.querySelector('.cards-news-card-body');
    if (body) {
      const heading = body.querySelector('h1, h2, h3, h4, h5, h6');
      const first = body.firstElementChild;
      if (heading && first && first !== heading && first.tagName === 'P' && !first.querySelector('a, picture')) {
        first.classList.add('cards-news-card-date');
      }
      const last = body.lastElementChild;
      const link = last && last.tagName === 'P' ? last.querySelector('a') : null;
      if (link && last.textContent.trim() === link.textContent.trim()) last.classList.add('cards-news-card-cta');

      // group the excerpt (everything after the heading, before the CTA) like the
      // source .cmp-teaser__description, so multi-paragraph excerpts keep p spacing
      const children = [...body.children];
      const start = heading ? children.indexOf(heading) + 1 : 0;
      const excerpt = children.slice(start).filter((el) => !el.matches('.cards-news-card-date, .cards-news-card-cta'));
      if (excerpt.length) {
        const description = document.createElement('div');
        description.className = 'cards-news-card-description';
        excerpt[0].before(description);
        description.append(...excerpt);
      }
    }
    if (li.children.length) ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
  block.replaceChildren(ul);
}
