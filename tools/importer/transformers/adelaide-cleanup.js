/* eslint-disable */
/* global WebImporter */

/**
 * Adelaide University cleanup transformer.
 * Removes non-authorable chrome (global header/nav, footer, cookie banner,
 * reCAPTCHA, tracking iframes, hidden inputs, scroll-to-top, etc.).
 * All selectors come from migration-work/cleaned.html.
 */

function removeAll(root, selectors) {
  selectors.forEach((sel) => {
    let nodes = [];
    try {
      nodes = root.querySelectorAll(sel);
    } catch (e) {
      nodes = [];
    }
    nodes.forEach((n) => n.remove());
  });
}

export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    removeAll(element, [
      // Global header / navigation experience fragment
      '#navigation-ad8430d0a2',
      'header.experiencefragment',
      '.cmp-experiencefragment--header',
      // Global footer experience fragment
      'footer.experiencefragment.aem-GridColumn',
      'footer.experiencefragment',
      '.cmp-experiencefragment--footer',
      // Scroll-to-top button
      '.footer-button-wrapper',
      // Cookie banner
      '.cookiesbanner',
      '.cookiesbanner-wrapper',
      '#cookiebanner--initial-alert',
      'dialog.cookiebanner--more-info',
      '.cookiebanner--launch',
      // reCAPTCHA widget (form + body-level challenge widgets)
      '.recaptcha.base',
      '.cmp-adaptiveform-recaptcha',
      '.cmp-adaptiveform-recaptcha__widget',
      '.g-recaptcha',
      '#g-recaptcha-response',
      // Empty search suggestion dropdowns
      '.suggestions-box.is-hidden',
      // Tracking pixels / beacons
      '[id^="batBeacon"]',
      '#universal_pixel_emcc062',
      'img[src*="analytics.yahoo.com"]',
      'img.ywa-10000',
      'iframe',
      // Hidden inputs
      'input[type="hidden"]',
      // Non-content resources
      'script',
      'style',
      'noscript',
      'link',
      'meta',
    ]);

    // Body-level reCAPTCHA bubble container (unclassed div wrapping the arrows)
    element.querySelectorAll('.g-recaptcha-bubble-arrow').forEach((arrow) => {
      const wrapper = arrow.parentElement;
      if (wrapper && wrapper.isConnected && wrapper !== element) wrapper.remove();
    });
  }

  if (hookName === 'afterTransform') {
    // Final sweep for anything parsers may have left behind (do NOT touch comments).
    removeAll(element, [
      'iframe',
      'script',
      'style',
      'noscript',
      'link',
      'meta',
      'input[type="hidden"]',
      '.g-recaptcha',
      '.cmp-adaptiveform-recaptcha',
    ]);

    // Strip tracking / data-layer / inline handler attributes
    element.querySelectorAll('*').forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        const n = attr.name;
        if (
          n.startsWith('data-cmp-')
          || n === 'data-cmp-data-layer'
          || n.startsWith('on')
        ) {
          el.removeAttribute(n);
        }
      });
    });
  }
}
