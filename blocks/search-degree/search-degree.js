/**
 * Search degree: a single text input with an inline Search button that sends
 * the visitor to a results page.
 * Rows (all optional, any order):
 * - a link: the results URL. If it carries an empty query parameter
 *   (e.g. `?query=`), that parameter name is used; otherwise `q`.
 * - plain text: the input placeholder (default "Search").
 * - "Button: <label>": the button label (default "Search").
 * @param {Element} block
 */
export default function decorate(block) {
  let action = '/search';
  let param = 'q';
  let placeholder = 'Search';
  let buttonLabel = 'Search';

  [...block.querySelectorAll(':scope > div > div')].forEach((cell) => {
    const link = cell.querySelector('a[href]');
    const text = cell.textContent.trim();
    if (link) {
      const url = new URL(link.getAttribute('href'), window.location.href);
      const empty = [...url.searchParams.entries()].find(([, v]) => v === '');
      if (empty) {
        [param] = empty;
        url.searchParams.delete(param);
      }
      action = url.href;
    } else if (/^button\s*:/i.test(text)) {
      buttonLabel = text.replace(/^button\s*:/i, '').trim() || buttonLabel;
    } else if (text) {
      placeholder = text;
    }
  });

  const form = document.createElement('form');
  form.className = 'search-degree-form';
  form.setAttribute('role', 'search');

  const id = `search-degree-${Math.random().toString(36).slice(2, 8)}`;
  const label = document.createElement('label');
  label.className = 'search-degree-label';
  label.htmlFor = id;
  label.textContent = placeholder;

  const input = document.createElement('input');
  input.type = 'search';
  input.id = id;
  input.name = param;
  input.placeholder = placeholder;
  input.className = 'search-degree-input';
  input.autocomplete = 'off';

  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'search-degree-button';
  button.textContent = buttonLabel;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = new URL(action);
    const value = input.value.trim();
    if (value) url.searchParams.set(param, value);
    window.location.href = url.href;
  });

  form.append(label, input, button);
  block.replaceChildren(form);
}
