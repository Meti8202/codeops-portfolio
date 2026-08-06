# Project brief — a responsive static site
## Build: Habesha Eatery website
A multi-section marketing site for a real Addis Ababa restaurant: a hero, an about section, a responsive menu, a reservation form, and a footer with location and contact details.

#### REQUIRED SECTIONS
1. Sticky navbar (Flexbox) - logo left, links right
2. Hero with a clear call-to-action - fluid heading with clamp()
3. About / story section 
4. Menu grid (auto-fit cards) - reflows 1 → 2 → 3 columns
5. Reservation form - labelled, validated inputs (Day 12)
6. Footer - Bole address, phone, hours
--------------------------------------------------------------
#### Checklist
- [x] Viewport meta tag present
- [x] Semantic landmarks (header, nav, main, footer)
- [x] box-sizing: border-box reset
- [x] Colour & spacing in :root variables
- [x] Sticky Flexbox navbar
- [x] Menu reflows 1 → 2 → 3 columns
- [x] Reservation form with labels + validation
- [x] Images use max-width: 100%
- [x] One tasteful hover transition
- [x] Looks right at 360px and at 1280px

---
## What I built

- **Interface:** Habesha Eatery restaurant marketing site (hero, about, menu, reservation form, footer).

#### Files

| File | Description |
|------|-------------|
| `index.html` | Custom CSS version of the site |
| `index-tailwind.html` | Tailwind CSS version of the site |
| `styles/style.css` | Custom CSS styles (variables, Grid, Flexbox, responsive) |
| `images/` | Dish images (lambtibs.jpeg, shiro.png, doro.png) |
| `README.md` | This documentation |

#### Layout

**Grid**

- `.page` uses `display: grid` with `grid-template-rows: auto 1fr auto`:
  - `auto` – header (navbar)
  - `1fr` – main content (hero, about, menu grid, reservation form)
  - `auto` – footer
- `.menu-grid` uses `display: grid` with explicit breakpoints:
  - Base: `grid-template-columns: 1fr` (single column on mobile)
  - `min-width: 768px`: `repeat(2, 1fr)` (two columns on tablet)
  - `min-width: 1024px`: `repeat(3, 1fr)` (three columns on desktop)

**Flexbox**

- `.navbar` – flex row for logo (left) and navigation links (right); stacks on mobile.
- `.nav-links` – Flexbox for horizontal navigation links with `gap`.
- `.hero` – Flexbox for centered text and CTA button.
- `.menu-card` – Flexbox column with `margin-top: auto` to pin price to bottom.
- `.dish` – Flexbox row for dish name and price (price later moved to bottom).
- `.reservation-form` – Flexbox column for stacked form fields.
- `.footer` – Flexbox for stacked contact details and copyright.

#### Responsive card grid

- `.menu-grid` uses explicit breakpoints:
  - Base: `grid-template-columns: 1fr`
  - `768px`: `grid-template-columns: repeat(2, 1fr)`
  - `1024px`: `grid-template-columns: repeat(3, 1fr)`
- `gap: 20px` for spacing.
- On mobile (`max-width: 600px`), the navbar stacks and the hero heading scales down.

#### Sticky element

- `.navbar` (header) uses `position: sticky; top: 0; z-index: 10;` so the top navigation stays visible while the main content scrolls.

#### Absolute element

- `.menu-card` is `position: relative`.
- `.badge` is `position: absolute; top: 12px; right: 12px;` to pin the "Popular" badge to the top-right corner of the card.

#### Hover transition

- `.menu-card` has `transform: translateY(0.5rem);` with `transition` for smooth lift on hover.
- `@media (prefers-reduced-motion: reduce)` disables motion for users with motion sensitivity.

#### Responsiveness

- One media query at `max-width: 600px`:
  - stacks navbar vertically (`flex-direction: column`)
  - wraps navigation links with `flex-wrap: wrap` and `justify-content: center`.
- Mobile-first menu grid with explicit breakpoints at `768px` and `1024px` for tablet and desktop.

---

### Tailwind CSS Version
- Grid: `grid grid-rows-[auto_1fr_auto]`
- Menu grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Card hover: `hover:-translate-y-2 hover:scale-105`
- Reduced motion: `motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100`



