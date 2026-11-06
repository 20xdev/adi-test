/**
 * Hero banner: full-bleed background photo with left-aligned H1, tagline and CTAs.
 * Rows: [background image] [content]. Authors may omit the image row or put the
 * picture in the same cell as the text; both are handled.
 * @param {Element} block
 */
export default function decorate(block) {
  const picture = block.querySelector('picture');
  const media = document.createElement('div');
  media.className = 'hero-banner-media';
  if (picture) {
    const parentP = picture.parentElement;
    media.append(picture);
    if (parentP && parentP.tagName === 'P' && !parentP.textContent.trim() && !parentP.children.length) {
      parentP.remove();
    }
  }

  const content = document.createElement('div');
  content.className = 'hero-banner-content';
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      while (cell.firstChild) content.append(cell.firstChild);
    });
  });

  // group consecutive CTA paragraphs into one actions row
  const ctas = [...content.querySelectorAll(':scope > p')].filter((p) => p.querySelector('a') && p.textContent.trim() === p.querySelector('a').textContent.trim());
  if (ctas.length) {
    const actions = document.createElement('div');
    actions.className = 'hero-banner-actions';
    ctas[0].before(actions);
    ctas.forEach((p) => actions.append(p));
  }

  block.replaceChildren();
  if (picture) block.append(media);
  else block.classList.add('no-image');
  block.append(content);
}
