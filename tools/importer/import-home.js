/* eslint-disable */
/* global WebImporter */

import heroBannerParser from './parsers/hero-banner.js';
import searchDegreeParser from './parsers/search-degree.js';
import heroOverlayParser from './parsers/hero-overlay.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import columnsMediaPanelParser from './parsers/columns-media-panel.js';
import cardsNewsParser from './parsers/cards-news.js';
import formParser from './parsers/form.js';
import heroContactParser from './parsers/hero-contact.js';
import adelaideCleanupTransformer from './transformers/adelaide-cleanup.js';
import adelaideSectionsTransformer from './transformers/adelaide-sections.js';

const PAGE_TEMPLATE = {
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
        ".cmp-aucontainer--bg-tertiary .experiencefragment [class*=\"flex-columns-xsml\"]"
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

const parsers = {
  'hero-banner': heroBannerParser,
  'search-degree': searchDegreeParser,
  'hero-overlay': heroOverlayParser,
  'cards-feature': cardsFeatureParser,
  'accordion-faq': accordionFaqParser,
  'columns-media-panel': columnsMediaPanelParser,
  'cards-news': cardsNewsParser,
  'form': formParser,
  'hero-contact': heroContactParser,
};

const transformers = [adelaideCleanupTransformer, adelaideSectionsTransformer];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((fn) => {
    try { fn(hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        pageBlocks.push({ name: blockDef.name, selector, element });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); }
      catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    executeTransformers('afterTransform', main, payload);

    main.appendChild(document.createElement('hr'));
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }];
  },
};
