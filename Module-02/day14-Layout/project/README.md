## Day 14 Project – EthioAirlines Results Layout

#### Instructions

Pick a real Ethiopian web interface with a clear structure — an Ethio Telecom-style account dashboard, a CBE online-banking screen, or an Ethiopian Airlines booking results page — and rebuild its layout (structure only, placeholder content is fine) using Grid for the skeleton and Flexbox for the components.

#### Requirements

- A Grid page skeleton built with `grid-template-areas`: at least a header, a sidebar or filter panel, a main content area, and a footer.
- Flexbox for the components inside those areas — a navbar, a toolbar, or a row of stat cards.
- A responsive card grid somewhere, using `repeat(auto-fit, minmax(...))`.
- One sticky element — a header or sidebar that stays visible while the main area scrolls.
- At least one absolutely positioned element anchored to a relative parent (a badge, tag or close button).
- A single media query that collapses the layout to one column on mobile.

#### Worked start (from notes)

```
.app {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}
.app > header {
  grid-area: header;
  position: sticky;
  top: 0;
}
.cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
@media (max-width: 700px) {
  .app {
    grid-template-columns: 1fr;
  }
}
```

---

### What I built

#### Interface

- **Interface:** Ethiopian Airlines flight booking results page (filters and flight cards).
- **Focus:** Layout and responsiveness only, content is placeholder.

#### Layout structure

**Grid**

- `.app` uses `display: grid` with `grid-template-areas`:
  - `header` – top navbar
  - `sidebar` – filters panel on the left
  - `main` – flight results content
  - `footer` – footer links and copyright
- Desktop: `grid-template-columns: 260px 1fr`.
- Mobile (`max-width: 700px`): single-column grid with areas stacked as `header`, `sidebar`, `main`, `footer`.

**Flexbox**

- `.navbar` – flex row for brand block and buttons (search and login).
- `.logo`, `.links` – Flexbox for horizontal alignment and spacing.
- `.filter-buttons` – flex row for Apply and Reset buttons.
- `.results-header` – flex row for “RESULTS” title and flight count.
- `.flight-times` – flex row for time.
- `.card-bottom` – flex row aligning price and button, with `margin-top: auto` to pin it to the bottom of the card.
- `.footer` and `.footer-links` – Flexbox for footer links and copyright.

#### Responsive card grid

- `.card-grid` uses Grid with:
  - `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));`
  - `gap: 24px` for spacing.
- On mobile, the media query sets `grid-template-columns: 1fr` for a single-column card list.

#### Sticky element

- `.navbar` (header) uses `position: sticky; top: 0; z-index: 10;` so the top navigation stays visible while the main content scrolls.

#### Absolute element

- `.card` is `position: relative`.
- `.badge` is `position: absolute; top: 12px; right: 12px;` to pin badge to the corner of card.

#### Responsiveness

- One media query at `max-width: 700px`:
  - collapses `.app` to one column and stacks grid areas (`header`, `sidebar`, `main`, `footer`).
  - adjusts Flexbox layouts for the navbar, filters, results header, cards, and footer on narrow screens.
  - ansures the card grid becomes one card per row on mobile.