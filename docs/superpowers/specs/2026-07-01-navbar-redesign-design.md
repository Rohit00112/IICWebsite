# Navbar Redesign — Design Spec

Date: 2026-07-01
File: `components/layout/Navbar.tsx` (single-file rewrite)

## Goal
Redesign navbar: cleaner UI/UX, animated, on-brand. Move from bottom floating pill to top floating pill.

## Decisions
- **Position:** Top floating pill. `fixed top-*, left-1/2, -translate-x-1/2`, high z-index.
- **Style:** Solid IIC blue `#21409A`, white text, green `#74C044` accent on hover/active. Rounded pill, subtle shadow.
- **Desktop links:** Inline + dropdowns.
- **Scroll:** Shrink on scroll (compact after ~40px).
- **Mobile menu:** Dropdown panel below pill, accordion groups.

## Desktop structure (≥ lg)
`[logo] | Home · About▾ · Academics▾ · Innovation Lab↗ · News | [Contact CTA]`

Top-level items:
- **Home** → `/`
- **About** ▾ → About Us `/about-us`, Life at IIC `/life-at-iic`
- **Academics** ▾ → Courses `/courses`, Admission `/admissions`, Scholarships `/scholarships`
- **Innovation Lab** → `https://innovation.iic.edu.np` (external ↗, new tab)
- **News** → `/news` (label "News & Events")
- **Contact** → `/contact` (green pill CTA button)

Dropdown behavior: hover-open + focus/keyboard open. Framer-motion fade+slide. Panel = card below item. Active link = green accent (underline/dot). Close on outside click / Esc / route change.

## Scroll behavior
Full padding at top. After ~40px scroll: tighter padding, smaller logo, more opaque bg. Framer-motion spring transition. Stays visible (no hide).

## Mobile (< lg)
Compact pill: `[logo] ... [animated menu toggle]`. Tap toggle → dropdown panel drops below pill (brand blue glass card). Groups (About, Academics) as inline accordions. Staggered link entry. Body scroll lock + backdrop dimmer. CTA button at panel bottom. Toggle animates hamburger ↔ close.

## Animations
- Magnetic wrapper on toggle button (keep, `components/effects/Magnetic`).
- Animated hamburger ↔ close icon.
- Dropdown / mobile-panel stagger.
- Hover: translate + green accent.
- Shrink-on-scroll spring.

## Accessibility
- `aria-expanded` / `aria-controls` on toggles + dropdowns.
- `role=menu` / `menuitem`.
- Keyboard: Esc closes, focus-visible rings, tab order.
- Keep JSON-LD `SiteNavigationElement` schema (flatten all leaf links).

## Tech
- Single-file rewrite. Deps unchanged: framer-motion, next/image, next/link, Magnetic, usePathname. No new packages.
- Rendered by `components/layout/ClientLayoutWrapper.tsx`.
- Preserve `getAbsoluteUrl` + JSON-LD for SEO.
