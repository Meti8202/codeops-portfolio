## In-Class Exercise Instructions
*Make the menu responsive & animated*

#### Deliverables
A menu section that is single-column on mobile, multi-column on desktop, with a tasteful hover transition on each card.

##### Steps
[x] Add the viewport meta tag if it is missing.
[x] Rewrite the menu mobile-first: one column as the base.
[x] Add a min-width: 768px query for two columns, 1024px for three.
[x] Add a transition and a translateY/scale lift on card :hover.
[x] Wrap the motion in a prefers-reduced-motion guard.
[] Resize from 360px to 1280px and confirm it adapts smoothly.

## What I implemented

- **Viewport meta tag** added for responsive behavior.
- **Mobile-first menu grid**:
  - Base: `.menu-grid { grid-template-columns: 1fr; }` (single column on small screens).
  - `@media (min-width: 768px)`: two columns (`repeat(2, 1fr)`).
  - `@media (min-width: 1024px)`: three columns (`repeat(3, 1fr)`).
- **Animated cards**:
  - `transition` on `transform`, `box-shadow`, and `background-color`.
  - `:hover` uses `transform: translateY(-4px)` with a slightly darker shadow.
- **Reduced-motion support**:
  - `@media (prefers-reduced-motion: no-preference)` enables the lift animation.