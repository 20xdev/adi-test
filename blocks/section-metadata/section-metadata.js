import { readBlockConfig, toClassName, toCamelCase } from '../../scripts/aem.js';

/**
 * Applies authored section metadata to the parent section.
 * `style` values become section classes; other keys become data attributes.
 * @param {Element} block The section-metadata block element
 */
export default function decorate(block) {
  const section = block.closest('.section');
  if (section) {
    const config = readBlockConfig(block);
    Object.entries(config).forEach(([key, value]) => {
      if (key === 'style') {
        const styles = Array.isArray(value) ? value : String(value).split(',');
        styles.map((s) => toClassName(s.trim())).filter(Boolean)
          .forEach((s) => section.classList.add(s));
      } else {
        section.dataset[toCamelCase(key)] = value;
      }
    });
  }
  const wrapper = block.parentElement;
  block.remove();
  if (wrapper && !wrapper.children.length) wrapper.remove();
}
