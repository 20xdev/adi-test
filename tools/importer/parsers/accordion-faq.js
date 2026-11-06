/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq.
 * Base block: accordion. Source: https://adelaide.edu.au/ (.accordion.panelcontainer)
 * Rows: one per item -> [question | rich answer]
 * The "Expand all" control is UI chrome and is rebuilt by the block JS.
 */
export default function parse(element, { document }) {
  const cells = [];

  const items = element.querySelectorAll('.cmp-accordion__item');
  items.forEach((item) => {
    const titleEl = item.querySelector('.cmp-accordion__title')
      || item.querySelector('.cmp-accordion__header');
    const question = titleEl ? titleEl.textContent.trim() : '';

    const panel = item.querySelector('.cmp-accordion__panel');
    const answer = [];
    if (panel) {
      const texts = panel.querySelectorAll('.cmp-text');
      if (texts.length) {
        texts.forEach((t) => answer.push(...Array.from(t.children)));
      } else {
        answer.push(...Array.from(panel.children));
      }
    }

    if (question || answer.length) cells.push([question, answer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
