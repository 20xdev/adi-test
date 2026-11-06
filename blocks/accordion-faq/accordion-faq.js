/**
 * Accordion FAQ: expandable question/answer rows with an "Expand all" control.
 * One row per item: [question] [answer]. Rows without a question are skipped.
 * @param {Element} block
 */
export default function decorate(block) {
  const items = [];
  [...block.children].forEach((row) => {
    const [label, body] = row.children;
    if (!label || !label.textContent.trim()) {
      row.remove();
      return;
    }
    const summary = document.createElement('summary');
    summary.className = 'accordion-faq-item-label';
    summary.append(...label.childNodes);

    const content = document.createElement('div');
    content.className = 'accordion-faq-item-body';
    if (body) content.append(...body.childNodes);

    const details = document.createElement('details');
    details.className = 'accordion-faq-item';
    details.append(summary, content);
    items.push(details);
  });

  const list = document.createElement('div');
  list.className = 'accordion-faq-items';
  list.append(...items);

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'accordion-faq-toggle-all';
  const sync = () => {
    const allOpen = items.length > 0 && items.every((d) => d.open);
    toggle.textContent = allOpen ? 'Collapse all' : 'Expand all';
    toggle.setAttribute('aria-expanded', String(allOpen));
  };
  toggle.addEventListener('click', () => {
    const open = !items.every((d) => d.open);
    items.forEach((d) => { d.open = open; });
    sync();
  });
  items.forEach((d) => d.addEventListener('toggle', sync));
  sync();

  const controls = document.createElement('div');
  controls.className = 'accordion-faq-controls';
  controls.append(toggle);

  block.replaceChildren();
  if (items.length > 1) block.append(controls);
  block.append(list);
}
