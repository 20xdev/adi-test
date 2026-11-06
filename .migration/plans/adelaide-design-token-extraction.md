# Design Token Extraction Plan: University of Adelaide (adelaide.edu.au)

> **Status: Ready to run. Waiting for Execute mode.**
> You've approved this plan, but plan mode only allows planning, so I haven't changed anything yet. Switch to Execute mode and I'll work through the checklist below in order.

## Goal
Pull the site-wide design tokens (colours, typography and spacing) from https://adelaide.edu.au/ and apply them to the project's global styles. The result should be that every block, existing or future, picks up the University of Adelaide look by default.

## Current State
- The global styles still use the boilerplate defaults: white background, `#3b63fb` link blue, Roboto / Roboto Condensed fonts, and the standard heading and body size scale.
- Blocks from earlier migration work are already in the project: hero-banner, hero-overlay, hero-contact, cards-feature, cards-news, columns-media-panel, accordion-faq, search-degree and form. They will inherit the new tokens.
- No site-wide design pass has been run yet.

## Approach
I'll use the design migration workflow, limited to the **site-wide design tokens** step. Per-block styling is out of scope unless you ask for it. The steps:

1. **Inspect the source site.** Load the homepage and read the computed styles of key elements: body, headings h1–h6, links, buttons, header, footer and section backgrounds. I'll check desktop and mobile sizes to get the responsive type scale.
2. **Extract the tokens:**
   - **Colours:** primary brand colour (the Adelaide navy), secondary and accent colours, text, link and link-hover, light and dark section backgrounds, borders.
   - **Typography:** body and heading font families and where they're hosted, weights, size scale for body (xs/s/m) and headings (xs–xxl) at mobile and desktop, line heights, letter spacing.
   - **Spacing:** section padding, content max-width, gutters, vertical rhythm between elements, header/nav height.
   - **Buttons and links:** background, text colour, border radius, padding, hover states.
3. **Set up fonts.** If the site uses web fonts, check whether they're licensed or self-hostable. Open fonts (e.g. Google Fonts) go into the font file; proprietary fonts get a close open substitute plus size-adjusted fallbacks so the layout doesn't shift while fonts load.
4. **Update the global styles.** Replace the boilerplate `:root` values, keeping the existing variable names so current blocks still work. Add new tokens where needed (e.g. `--brand-primary`, `--accent-color`, spacing variables). Update the default button, link, heading and section styles to use them.
5. **Check the result.** Compare the migrated pages in the preview against the source site for colour accuracy, type scale and spacing at desktop and mobile widths.

## Deliverables
- Updated global styles with University of Adelaide colour, typography and spacing tokens
- An updated font file (web fonts or fallbacks)
- A short token summary listing each token, its value and where it came from on the source site

## Checklist
- [ ] Load https://adelaide.edu.au/ and capture computed styles for body, h1–h6, links, buttons, header, footer and section backgrounds
- [ ] Capture mobile-width (≤ 600px) and desktop-width (≥ 900px) type sizes
- [ ] Record the colour palette: primary, secondary, accent, text, link and hover, backgrounds, borders
- [ ] Record typography: font families and hosting, weights, size scale, line heights, letter spacing
- [ ] Record spacing: section padding, max-width, gutters, element spacing, nav height
- [ ] Record button and link styles: colours, radius, padding, hover states
- [ ] Set up fonts: open web fonts, or a substitute with size-adjusted fallbacks
- [ ] Update the `:root` tokens in the global styles, keeping existing variable names
- [ ] Add new brand and spacing tokens where needed
- [ ] Update the default heading, link, button and section styles to use the tokens
- [ ] Check migrated pages in the preview against the source at desktop and mobile widths
- [ ] Give you the token summary

## Notes
- These are local changes only. Nothing goes to Document Authoring, preview or live, and no git commits are made unless you ask.
- **Running this requires Execute mode.** Once you switch, I'll start with the first checklist item.
