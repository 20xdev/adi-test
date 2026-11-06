/**
 * Hero overlay: full-bleed photo with centered heading, copy and CTA.
 * Rows: [background image] [content]. Missing image row is tolerated.
 * @param {Element} block
 */
export default function decorate(block) {
  const picture = block.querySelector('picture');
  const media = document.createElement('div');
  media.className = 'hero-overlay-media';
  if (picture) {
    const parentP = picture.parentElement;
    media.append(picture);
    if (parentP && parentP.tagName === 'P' && !parentP.textContent.trim() && !parentP.children.length) {
      parentP.remove();
    }
  }

  const content = document.createElement('div');
  content.className = 'hero-overlay-content';
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      while (cell.firstChild) content.append(cell.firstChild);
    });
  });

  // group link-only paragraphs into one centered actions row
  const ctas = [...content.querySelectorAll(':scope > p')].filter((p) => {
    const a = p.querySelector('a');
    return a && p.textContent.trim() === a.textContent.trim();
  });
  if (ctas.length) {
    const actions = document.createElement('div');
    actions.className = 'hero-overlay-actions';
    ctas[0].before(actions);
    ctas.forEach((p) => actions.append(p));
  }

  block.replaceChildren();
  if (picture) block.append(media);
  else block.classList.add('no-image');
  block.append(content);
}
