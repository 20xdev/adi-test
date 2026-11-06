/**
 * Columns media panel: text panel (heading, copy, CTA) beside a photo, 50/50.
 * One row: [text] [image]; the image may be on either side. Cells holding only
 * a picture become the media column, the rest are text panels.
 * @param {Element} block
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('columns-media-panel-row');
    const cells = [...row.children];
    cells.forEach((cell) => {
      const pic = cell.querySelector('picture');
      const onlyPicture = pic && !cell.textContent.trim();
      if (onlyPicture) {
        cell.classList.add('columns-media-panel-media');
      } else if (cell.textContent.trim() || cell.children.length) {
        cell.classList.add('columns-media-panel-text');
      } else {
        cell.remove();
      }
    });
    const media = row.querySelector('.columns-media-panel-media');
    if (media && row.firstElementChild === media) row.classList.add('media-first');
  });
}
