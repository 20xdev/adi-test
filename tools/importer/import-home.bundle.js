/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document: document2 }) {
    const cells = [];
    const img = element.querySelector("picture.cmp-herobanner__image img, .cmp-herobanner__image img");
    if (img) {
      const image = document2.createElement("img");
      image.src = img.getAttribute("src");
      image.alt = img.getAttribute("alt") || "";
      cells.push([image]);
    } else {
      cells.push([""]);
    }
    const content = [];
    const title = element.querySelector(".cmp-herobanner__title");
    if (title) {
      const h1 = document2.createElement("h1");
      h1.textContent = title.textContent.trim();
      content.push(h1);
    }
    const desc = element.querySelector(".cmp-herobanner__description");
    if (desc) {
      const paras = desc.querySelectorAll("p");
      if (paras.length) {
        paras.forEach((p) => content.push(p));
      } else if (desc.textContent.trim()) {
        const p = document2.createElement("p");
        p.textContent = desc.textContent.trim();
        content.push(p);
      }
    }
    element.querySelectorAll(".cmp-herobanner__actions a.cmp-herobanner__action-link").forEach((a) => {
      const text = a.textContent.trim();
      if (!text) return;
      const p = document2.createElement("p");
      const link = document2.createElement("a");
      link.href = a.getAttribute("href");
      link.textContent = text;
      p.append(link);
      content.push(p);
    });
    cells.push([content]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/search-degree.js
  function parse2(element, { document: document2 }) {
    const cells = [];
    let action = element.getAttribute("action") || "/search/";
    try {
      const u = new URL(action, "https://adelaide.edu.au/");
      action = u.hostname.endsWith("adelaide.edu.au") ? u.pathname : u.href;
    } catch (e) {
      action = "/search/";
    }
    const params = [];
    const hidden = element.querySelectorAll('input[type="hidden"][name]');
    hidden.forEach((h) => {
      if (h.name === "search") return;
      params.push([h.name, h.value]);
    });
    if (!params.length) {
      params.push(["collection", "uosa~sp-aem-prod"]);
      params.push(["profile", "site-search"]);
      params.push(["f.Tabs|type", "Degrees & Courses"]);
    }
    const field = element.querySelector("input.cmp-fb--search-field, input#search-input");
    const queryName = field && field.getAttribute("name") || "query";
    const qs = params.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).concat(`${encodeURIComponent(queryName)}=`).join("&");
    const href = `${action}?${qs}`;
    const link = document2.createElement("a");
    link.href = href;
    link.textContent = href;
    cells.push([link]);
    const label = element.querySelector(".cmp-fb--search-field-wrapper label, label");
    const placeholder = field && field.getAttribute("placeholder") || label && label.textContent.trim() || "";
    if (placeholder) cells.push([placeholder]);
    const button = element.querySelector('button.cmp-fb--search-button, button[type="submit"]');
    const buttonText = button ? button.textContent.trim() : "";
    if (buttonText) cells.push([`Button: ${buttonText}`]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "search-degree", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-overlay.js
  function parse3(element, { document: document2 }) {
    const cells = [];
    const img = element.querySelector(".cmp-herobanner__image img");
    if (img) {
      const image = document2.createElement("img");
      image.src = img.getAttribute("src");
      image.alt = img.getAttribute("alt") || "";
      cells.push([image]);
    } else {
      cells.push([""]);
    }
    const content = [];
    const title = element.querySelector(".cmp-herobanner__title");
    if (title) {
      const level = /^H[1-6]$/.test(title.tagName) ? title.tagName.toLowerCase() : "h2";
      const h = document2.createElement(level);
      h.textContent = title.textContent.trim();
      content.push(h);
    }
    const desc = element.querySelector(".cmp-herobanner__description");
    if (desc) {
      const paras = desc.querySelectorAll("p");
      if (paras.length) {
        paras.forEach((p) => {
          if (p.textContent.trim()) content.push(p);
        });
      } else if (desc.textContent.trim()) {
        const p = document2.createElement("p");
        p.textContent = desc.textContent.trim();
        content.push(p);
      }
    }
    element.querySelectorAll(".cmp-herobanner__actions a.cmp-herobanner__action-link").forEach((a) => {
      const text = a.textContent.trim();
      if (!text) return;
      const p = document2.createElement("p");
      const link = document2.createElement("a");
      link.href = a.getAttribute("href");
      link.textContent = text;
      p.append(link);
      content.push(p);
    });
    cells.push([content]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-overlay", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse4(element, { document: document2 }) {
    const cells = [];
    const cards = element.querySelectorAll(".content-container.content-block .cmp-teaser__content");
    cards.forEach((card) => {
      const icon = card.querySelector("img.cmp-teaser__icon, img");
      let imageCell = "";
      if (icon) {
        const img = document2.createElement("img");
        img.src = icon.getAttribute("src");
        img.alt = icon.getAttribute("alt") || "";
        imageCell = img;
      }
      const content = [];
      const title = card.querySelector(".cmp-teaser__title");
      if (title) {
        const h3 = document2.createElement("h3");
        h3.textContent = title.textContent.trim();
        content.push(h3);
      }
      const desc = card.querySelector(".cmp-teaser__description");
      if (desc) {
        const paras = desc.querySelectorAll("p");
        if (paras.length) {
          paras.forEach((p) => {
            if (p.textContent.trim()) content.push(p);
          });
        } else if (desc.textContent.trim()) {
          const p = document2.createElement("p");
          p.textContent = desc.textContent.trim();
          content.push(p);
        }
      }
      card.querySelectorAll(".cmp-teaser__action-container a").forEach((a) => {
        const text = a.textContent.trim();
        if (!text) return;
        const p = document2.createElement("p");
        const link = document2.createElement("a");
        link.href = a.getAttribute("href");
        link.textContent = text;
        p.append(link);
        content.push(p);
      });
      if (imageCell || content.length) cells.push([imageCell, content]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse5(element, { document: document2 }) {
    const cells = [];
    const items = element.querySelectorAll(".cmp-accordion__item");
    items.forEach((item) => {
      const titleEl = item.querySelector(".cmp-accordion__title") || item.querySelector(".cmp-accordion__header");
      const question = titleEl ? titleEl.textContent.trim() : "";
      const panel = item.querySelector(".cmp-accordion__panel");
      const answer = [];
      if (panel) {
        const texts = panel.querySelectorAll(".cmp-text");
        if (texts.length) {
          texts.forEach((t) => answer.push(...Array.from(t.children)));
        } else {
          answer.push(...Array.from(panel.children));
        }
      }
      if (question || answer.length) cells.push([question, answer]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-media-panel.js
  function parse6(element, { document: document2 }) {
    const cells = [];
    const content = [];
    const title = element.querySelector(".cmp-herobanner__title");
    if (title) {
      const level = /^H[1-6]$/.test(title.tagName) ? title.tagName.toLowerCase() : "h2";
      const h = document2.createElement(level);
      h.textContent = title.textContent.trim();
      content.push(h);
    }
    const desc = element.querySelector(".cmp-herobanner__description");
    if (desc) {
      const paras = desc.querySelectorAll("p");
      if (paras.length) {
        paras.forEach((p) => {
          if (p.textContent.trim()) content.push(p);
        });
      } else if (desc.textContent.trim()) {
        const p = document2.createElement("p");
        p.textContent = desc.textContent.trim();
        content.push(p);
      }
    }
    element.querySelectorAll(".cmp-herobanner__actions a.cmp-herobanner__action-link").forEach((a) => {
      const text = a.textContent.trim();
      if (!text) return;
      const p = document2.createElement("p");
      const link = document2.createElement("a");
      link.href = a.getAttribute("href");
      link.textContent = text;
      p.append(link);
      content.push(p);
    });
    let imageCell = "";
    const img = element.querySelector(".cmp-herobanner__image img");
    if (img) {
      const image = document2.createElement("img");
      image.src = img.getAttribute("src");
      image.alt = img.getAttribute("alt") || "";
      imageCell = image;
    }
    cells.push([content, imageCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-media-panel", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-news.js
  function parse7(element, { document: document2 }) {
    const cells = [];
    const cards = element.querySelectorAll(".content-container.content-block .teaser-wrapper");
    cards.forEach((card) => {
      let imageCell = "";
      const img = card.querySelector(".cmp-teaser__image img");
      if (img) {
        const image = document2.createElement("img");
        image.src = img.getAttribute("src");
        image.alt = (img.getAttribute("alt") || "").trim();
        imageCell = image;
      }
      const content = [];
      const pretitle = card.querySelector(".cmp-teaser__pretitle");
      if (pretitle && pretitle.textContent.trim()) {
        const p = document2.createElement("p");
        p.textContent = pretitle.textContent.trim();
        content.push(p);
      }
      const title = card.querySelector(".cmp-teaser__title");
      if (title) {
        const h3 = document2.createElement("h3");
        h3.textContent = title.textContent.trim();
        content.push(h3);
      }
      const desc = card.querySelector(".cmp-teaser__description");
      if (desc) {
        const paras = desc.querySelectorAll("p");
        if (paras.length) {
          paras.forEach((p) => {
            if (p.textContent.trim()) content.push(p);
          });
        } else if (desc.textContent.trim()) {
          const p = document2.createElement("p");
          p.textContent = desc.textContent.trim();
          content.push(p);
        }
      }
      card.querySelectorAll(".cmp-teaser__action-container a").forEach((a) => {
        const text = a.textContent.trim();
        if (!text) return;
        const p = document2.createElement("p");
        const link = document2.createElement("a");
        link.href = a.getAttribute("href");
        link.textContent = text;
        p.append(link);
        content.push(p);
      });
      if (imageCell || content.length) cells.push([imageCell, content]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-news", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/form.js
  function parse8(element, { document: document2 }) {
    const cells = [];
    const isHidden = (wrapper, control) => {
      const visibleAttr = wrapper.querySelector("[data-cmp-visible]");
      if (wrapper.getAttribute("data-cmp-visible") === "false") return true;
      if (visibleAttr && visibleAttr.getAttribute("data-cmp-visible") === "false") return true;
      const name = control ? control.getAttribute("name") || "" : "";
      if (/^utm_|amcv/i.test(name)) return true;
      return false;
    };
    const labelText = (wrapper, selector) => {
      const l = wrapper.querySelector(selector);
      return l ? l.textContent.replace(/\s+/g, " ").trim() : "";
    };
    const fields = element.querySelectorAll(
      ".cmp-adaptiveform-textinput, .cmp-adaptiveform-emailinput, .cmp-adaptiveform-dropdown, .cmp-adaptiveform-checkbox, .cmp-adaptiveform-button, .cmp-adaptiveform-textarea, .cmp-adaptiveform-numberinput, .cmp-adaptiveform-datepicker, .cmp-adaptiveform-telephoneinput"
    );
    fields.forEach((field) => {
      const cls = field.className;
      const wrapper = field.parentElement || field;
      if (/recaptcha/i.test(cls)) return;
      if (/cmp-adaptiveform-button/.test(cls)) {
        const text = labelText(field, ".cmp-adaptiveform-button__text") || "Submit";
        cells.push([text, "submit", "", ""]);
        return;
      }
      if (/cmp-adaptiveform-checkbox/.test(cls)) {
        const control2 = field.querySelector("input");
        if (isHidden(wrapper, control2) || isHidden(field, control2)) return;
        const label2 = field.querySelector(".cmp-adaptiveform-checkbox__label");
        const labelContent = [];
        if (label2) {
          const paras = label2.querySelectorAll("p");
          if (paras.length) paras.forEach((p) => labelContent.push(p));
          else if (label2.textContent.trim()) labelContent.push(label2.textContent.trim());
        }
        if (!labelContent.length) {
          const d = labelText(field, ".cmp-adaptiveform-checkbox-description");
          if (d) labelContent.push(d);
        }
        if (!labelContent.length) return;
        labelContent.forEach((node) => {
          if (typeof node === "string") return;
          node.querySelectorAll('a[href^="/content/adelaideuniversity/au/en"]').forEach((a) => {
            const href = a.getAttribute("href").replace(/^\/content\/adelaideuniversity\/au\/en/, "").replace(/\.html(?=$|[?#])/, "/");
            a.setAttribute("href", href || "/");
          });
        });
        const required2 = control2 && control2.hasAttribute("required") ? "yes" : "";
        cells.push([labelContent, "checkbox", "", required2]);
        return;
      }
      if (/cmp-adaptiveform-dropdown/.test(cls)) {
        const select = field.querySelector("select");
        if (isHidden(wrapper, select) || isHidden(field, select)) return;
        const label2 = labelText(field, ".cmp-adaptiveform-dropdown__label");
        if (!label2) return;
        const options = [];
        if (select) {
          select.querySelectorAll("option").forEach((o) => {
            const t = o.textContent.trim();
            const v = o.getAttribute("value");
            if (!t || v === "" || /^please select/i.test(t)) return;
            const p = document2.createElement("p");
            p.textContent = t;
            options.push(p);
          });
        }
        const required2 = !select || select.hasAttribute("required") || select.hasAttribute("data-cmp-required") ? "yes" : "";
        cells.push([label2, "select", options, required2]);
        return;
      }
      const control = field.querySelector("input, textarea");
      if (isHidden(wrapper, control) || isHidden(field, control)) return;
      const label = labelText(field, "label");
      if (!label) return;
      if (/amcv/i.test(label)) return;
      let type = "text";
      if (/emailinput/.test(cls)) type = "email";
      else if (/textarea/.test(cls) || control && control.tagName === "TEXTAREA") type = "textarea";
      else if (/numberinput/.test(cls)) type = "number";
      else if (/datepicker/.test(cls)) type = "date";
      else if (/telephoneinput/.test(cls)) type = "tel";
      else if (control) {
        const t = (control.getAttribute("type") || "").toLowerCase();
        if (["email", "tel", "number", "date"].includes(t)) type = t;
      }
      const placeholder = control ? control.getAttribute("placeholder") || "" : "";
      const required = control && control.hasAttribute("required") || /name|email/i.test(label) ? "yes" : "";
      cells.push([label, type, placeholder, required]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "form", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-contact.js
  function parse9(element, { document: document2 }) {
    const cells = [];
    let bg = null;
    const img = Array.from(element.children).find((c) => c.tagName === "IMG") || element.querySelector(":scope > picture img");
    if (img && img.getAttribute("src")) {
      bg = document2.createElement("img");
      bg.src = img.getAttribute("src");
      bg.alt = img.getAttribute("alt") || "";
    } else {
      const style = element.getAttribute("style") || "";
      const m = style.match(/background-image:\s*url\((['"]?)(.*?)\1\)/i);
      if (m && m[2]) {
        bg = document2.createElement("img");
        bg.src = m[2];
        bg.alt = "";
      }
    }
    cells.push([bg || ""]);
    const content = [];
    const isEmptyP = (p) => !p.textContent.replace(/ /g, " ").trim() && !p.querySelector("img, a");
    element.querySelectorAll(".cmp-text").forEach((t) => {
      Array.from(t.children).forEach((child) => {
        if (child.tagName === "P" && isEmptyP(child)) return;
        content.push(child);
      });
    });
    element.querySelectorAll(".content-block .cmp-teaser__content").forEach((item) => {
      const title = item.querySelector(".cmp-teaser__title");
      if (title) {
        const h3 = document2.createElement("h3");
        h3.textContent = title.textContent.trim();
        content.push(h3);
      }
      const desc = item.querySelector(".cmp-teaser__description");
      if (desc) {
        desc.querySelectorAll(":scope > p").forEach((p) => {
          if (isEmptyP(p)) return;
          while (p.lastElementChild && p.lastElementChild.tagName === "BR" && !(p.lastChild.nodeType === 3 && p.lastChild.textContent.trim())) {
            p.lastElementChild.remove();
          }
          content.push(p);
        });
      }
      item.querySelectorAll(".cmp-teaser__action-container a").forEach((a) => {
        const text = a.textContent.trim();
        if (!text) return;
        const p = document2.createElement("p");
        const link = document2.createElement("a");
        link.href = a.getAttribute("href");
        link.textContent = text;
        p.append(link);
        content.push(p);
      });
    });
    cells.push([content]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-contact", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/adelaide-cleanup.js
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
  function transform(hookName, element, payload) {
    if (hookName === "beforeTransform") {
      removeAll(element, [
        // Global header / navigation experience fragment
        "#navigation-ad8430d0a2",
        "header.experiencefragment",
        ".cmp-experiencefragment--header",
        // Global footer experience fragment
        "footer.experiencefragment.aem-GridColumn",
        "footer.experiencefragment",
        ".cmp-experiencefragment--footer",
        // Scroll-to-top button
        ".footer-button-wrapper",
        // Cookie banner
        ".cookiesbanner",
        ".cookiesbanner-wrapper",
        "#cookiebanner--initial-alert",
        "dialog.cookiebanner--more-info",
        ".cookiebanner--launch",
        // reCAPTCHA widget (form + body-level challenge widgets)
        ".recaptcha.base",
        ".cmp-adaptiveform-recaptcha",
        ".cmp-adaptiveform-recaptcha__widget",
        ".g-recaptcha",
        "#g-recaptcha-response",
        // Empty search suggestion dropdowns
        ".suggestions-box.is-hidden",
        // Tracking pixels / beacons
        '[id^="batBeacon"]',
        "#universal_pixel_emcc062",
        'img[src*="analytics.yahoo.com"]',
        "img.ywa-10000",
        "iframe",
        // Hidden inputs
        'input[type="hidden"]',
        // Non-content resources
        "script",
        "style",
        "noscript",
        "link",
        "meta"
      ]);
      element.querySelectorAll(".g-recaptcha-bubble-arrow").forEach((arrow) => {
        const wrapper = arrow.parentElement;
        if (wrapper && wrapper.isConnected && wrapper !== element) wrapper.remove();
      });
    }
    if (hookName === "afterTransform") {
      removeAll(element, [
        "iframe",
        "script",
        "style",
        "noscript",
        "link",
        "meta",
        'input[type="hidden"]',
        ".g-recaptcha",
        ".cmp-adaptiveform-recaptcha"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
          const n = attr.name;
          if (n.startsWith("data-cmp-") || n === "data-cmp-data-layer" || n.startsWith("on")) {
            el.removeAttribute(n);
          }
        });
      });
    }
  }

  // tools/importer/transformers/adelaide-sections.js
  var MARKER_ATTR = "data-excat-section-id";
  var EL_ATTR = "data-excat-section-el";
  function findSectionElement(root, section) {
    const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
    for (let i = 0; i < selectors.length; i += 1) {
      const sel = selectors[i];
      if (!sel) continue;
      try {
        const el = root.querySelector(sel);
        if (el) return el;
      } catch (e) {
      }
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    const template = payload && payload.template;
    const sections = template && Array.isArray(template.sections) ? template.sections : [];
    if (sections.length < 2) return;
    const doc = element.ownerDocument || payload && payload.document || document;
    if (hookName === "beforeTransform") {
      const resolved = sections.map((section) => findSectionElement(element, section));
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const el = resolved[i];
        if (!el) continue;
        if (section.style) el.setAttribute(EL_ATTR, section.id);
        if (i === 0 && !section.style) continue;
        const hr = doc.createElement("hr");
        if (section.style) hr.setAttribute(MARKER_ATTR, section.id);
        if (i === 0) hr.setAttribute("data-excat-section-first", "true");
        el.parentNode.insertBefore(hr, el);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`hr[${MARKER_ATTR}="${section.id}"]`);
        const el = element.querySelector(`[${EL_ATTR}="${section.id}"]`);
        const anchor = el || marker;
        if (!anchor) continue;
        const meta = WebImporter.Blocks.createBlock(doc, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(meta);
      }
      element.querySelectorAll(`[${EL_ATTR}]`).forEach((n) => n.removeAttribute(EL_ATTR));
      element.querySelectorAll(`hr[${MARKER_ATTR}]`).forEach((hr) => {
        if (hr.getAttribute("data-excat-section-first") === "true") {
          hr.remove();
        } else {
          hr.removeAttribute(MARKER_ATTR);
        }
      });
    }
  }

  // tools/importer/import-home.js
  var PAGE_TEMPLATE = {
    "name": "home",
    "urls": [
      "https://adelaide.edu.au/"
    ],
    "representativeUrl": "https://adelaide.edu.au/",
    "description": "Adelaide University home page: hero, degree search, feature cards, FAQ, news, sign-up form and contact",
    "blocks": [
      {
        "name": "hero-banner",
        "instances": [
          ".herobanner.personalization-container",
          ".herobanner.cmp-herobanner--full-bleed:not(.cmp-herobanner--overlay)"
        ]
      },
      {
        "name": "search-degree",
        "instances": [
          ".searchbar.cmp-home-search-title--center .cmp-fb--search form"
        ]
      },
      {
        "name": "hero-overlay",
        "instances": [
          ".herobanner.cmp-herobanner--overlay"
        ]
      },
      {
        "name": "cards-feature",
        "instances": [
          ".container.flex-columns-lrg--4.flex-columns-med--2"
        ]
      },
      {
        "name": "accordion-faq",
        "instances": [
          ".accordion.panelcontainer"
        ]
      },
      {
        "name": "columns-media-panel",
        "instances": [
          ".herobanner.cmp-herobanner--image-50percent"
        ]
      },
      {
        "name": "cards-news",
        "instances": [
          '.cmp-aucontainer--bg-tertiary .experiencefragment [class*="flex-columns-xsml"]'
        ]
      },
      {
        "name": "form",
        "instances": [
          ".aemform .cmp-adaptiveform-container__wrapper > .panelcontainer"
        ]
      },
      {
        "name": "hero-contact",
        "instances": [
          ".cmp-experiencefragment--contact .container-has-bg"
        ]
      }
    ],
    "urlPattern": "/",
    "sections": [
      {
        "id": "rc2",
        "name": "Hero banner",
        "selector": [
          ".herobanner.personalization-container",
          "body > div.root.container.responsivegrid > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > main.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.herobanner.teaser.cmp-herobanner--image-background-no-gradient.cmp-herobanner--full-bleed.personalization-container.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": null,
        "blocks": [
          "hero-banner"
        ],
        "defaultContent": []
      },
      {
        "id": "rc3",
        "name": "Find your degree or career",
        "selector": [
          ".container.col-wrapper--pt-4.col-wrapper--pb-6",
          "body > div.root.container.responsivegrid > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > main.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.col-wrapper--pt-4.col-wrapper--pb-6.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": "centered",
        "blocks": [
          "search-degree"
        ],
        "defaultContent": [
          ".cmp-searchbar--title--text"
        ]
      },
      {
        "id": "rc4",
        "name": "A university for the future",
        "selector": [
          ".herobanner.cmp-herobanner--overlay",
          "body > div.root.container.responsivegrid > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > main.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.herobanner.teaser.cmp-herobanner--overlay.cmp-herobanner--image-background-no-gradient.cmp-herobanner--centre.cmp-herobanner--full-bleed.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": null,
        "blocks": [
          "hero-overlay"
        ],
        "defaultContent": []
      },
      {
        "id": "rc5",
        "name": "Four pillars",
        "selector": [
          ".container.flex-columns-lrg--4.flex-columns-med--2",
          "body > div.root.container.responsivegrid > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > main.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.flex-columns-med--2.flex-columns-lrg--4.flex-columns--flex-grow.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": null,
        "blocks": [
          "cards-feature"
        ],
        "defaultContent": []
      },
      {
        "id": "rc6",
        "name": "Ask Adelaide University",
        "selector": [
          ".container.col-wrapper--pt-3.col-wrapper--pb-5",
          "body > div.root.container.responsivegrid > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > main.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.col-wrapper--pt-3.col-wrapper--pb-5.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": "centered",
        "blocks": [
          "accordion-faq"
        ],
        "defaultContent": [
          ".col-wrapper--pt-3.col-wrapper--pb-5 > .custom-container > .col-wrapper > .col > .column-content > .text",
          ".col-wrapper--pt-3.col-wrapper--pb-5 .cmp-aucontainer--grid_col-2 .button"
        ]
      },
      {
        "id": "rc7",
        "name": "Launch your new life in Adelaide",
        "selector": [
          ".container.col-wrapper--pb-6:has(.cmp-herobanner--image-50percent)",
          "body > div.root.container.responsivegrid > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > main.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.col-wrapper--pb-6.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(6)"
        ],
        "style": null,
        "blocks": [
          "columns-media-panel"
        ],
        "defaultContent": []
      },
      {
        "id": "rc8",
        "name": "Whyalla - we are here for you",
        "selector": [
          ".container.cmp-aucontainer--bg-dark.col-wrapper--pr-4",
          "body > div.root.container.responsivegrid > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > main.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.cmp-aucontainer--bg-dark.col-wrapper--pt-4.col-wrapper--pr-4.col-wrapper--pb-4.col-wrapper--pl-4.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": "dark, centered",
        "blocks": [],
        "defaultContent": [
          ".cmp-aucontainer--bg-dark.col-wrapper--pr-4 .cmp-text",
          ".cmp-aucontainer--bg-dark.col-wrapper--pr-4 .button"
        ]
      },
      {
        "id": "rc9",
        "name": "Latest news and events",
        "selector": [
          ".container.cmp-aucontainer--bg-tertiary",
          "body > div.root.container.responsivegrid > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > main.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.cmp-aucontainer--bg-tertiary.col-wrapper--pt-4.col-wrapper--pb-4.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": "cream",
        "blocks": [
          "cards-news"
        ],
        "defaultContent": [
          ".cmp-aucontainer--bg-tertiary .text.cmp-text-centered",
          ".cmp-aucontainer--bg-tertiary .cmp-aucontainer--grid_col-3 .button"
        ]
      },
      {
        "id": "rc10",
        "name": "Stay in touch",
        "selector": [
          ".container.cmp-aucontainer--bg-grey",
          "body > div.root.container.responsivegrid > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > main.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.container.responsivegrid.cmp-aucontainer--bg-grey.col-wrapper--pt-4.col-wrapper--pb-4.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": "centered",
        "blocks": [
          "form"
        ],
        "defaultContent": [
          ".aemform .cmp-adaptiveform-container__wrapper > .text.base"
        ]
      },
      {
        "id": "rc11",
        "name": "Contact us",
        "selector": [
          ".experiencefragment:has(.cmp-experiencefragment--contact)",
          "body > div.root.container.responsivegrid > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > main.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div.cmp-container.row.col-wrapper.resp-grid > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div.experiencefragment.aem-GridColumn.aem-GridColumn--default--12"
        ],
        "style": null,
        "blocks": [
          "hero-contact"
        ],
        "defaultContent": []
      }
    ]
  };
  var parsers = {
    "hero-banner": parse,
    "search-degree": parse2,
    "hero-overlay": parse3,
    "cards-feature": parse4,
    "accordion-faq": parse5,
    "columns-media-panel": parse6,
    "cards-news": parse7,
    "form": parse8,
    "hero-contact": parse9
  };
  var transformers = [transform, transform2];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((fn) => {
      try {
        fn(hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        document2.querySelectorAll(selector).forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element });
        });
      });
    });
    return pageBlocks;
  }
  var import_home_default = {
    transform: (payload) => {
      const { document: document2, url, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (!parser) return;
        try {
          parser(block.element, { document: document2, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      });
      executeTransformers("afterTransform", main, payload);
      main.appendChild(document2.createElement("hr"));
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: { title: document2.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) }
      }];
    }
  };
  return __toCommonJS(import_home_exports);
})();
