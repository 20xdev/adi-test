/**
 * Hero contact: full-bleed photo, centered heading, and contact items side by side.
 * Rows: [background image] [content]. In the content cell each H3 starts a contact
 * item; everything up to the next H3 belongs to that item. Content before the
 * first H3 (e.g. the H2) is the intro.
 * @param {Element} block
 */
export default function decorate(block) {
  const picture = block.querySelector('picture');
  const media = document.createElement('div');
  media.className = 'hero-contact-media';
  if (picture) {
    const parentP = picture.parentElement;
    media.append(picture);
    if (parentP && parentP.tagName === 'P' && !parentP.textContent.trim() && !parentP.children.length) {
      parentP.remove();
    }
  }

  const nodes = [];
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      nodes.push(...cell.childNodes);
    });
  });

  const content = document.createElement('div');
  content.className = 'hero-contact-content';
  const intro = document.createElement('div');
  intro.className = 'hero-contact-intro';
  const items = document.createElement('div');
  items.className = 'hero-contact-items';

  let current = null;
  nodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'H3') {
      current = document.createElement('div');
      current.className = 'hero-contact-item';
      items.append(current);
    }
    if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;
    (current || intro).append(node);
  });

  // a paragraph holding only a web link (not tel:/mailto:) is a CTA button
  items.querySelectorAll(':scope > .hero-contact-item > p').forEach((p) => {
    const link = p.querySelector(':scope > a[href]');
    if (!link || p.children.length !== 1) return;
    if (p.textContent.trim() !== link.textContent.trim()) return;
    if (/^(tel|mailto):/i.test(link.getAttribute('href'))) return;
    p.classList.add('hero-contact-action');
  });

  if (intro.children.length) content.append(intro);
  if (items.children.length) {
    items.classList.add(`hero-contact-items-${items.children.length}`);
    content.append(items);
  }

  block.replaceChildren();
  if (picture) block.append(media);
  else block.classList.add('no-image');
  block.append(content);
}
