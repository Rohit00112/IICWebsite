# News & Events Redesign — Minimalist Editorial

**Date:** 2026-07-02
**Scope:** `/news` listing + `/news/[slug]` detail pages

## Context

Current news pages are visually heavy: cinematic dark hero, solid blue filter bar, a large featured post, tilted cards with heavy shadows, and a boxed green sidebar (upcoming events + newsletter). The detail page uses a 60–70vh cinematic hero and an article+sidebar split with tilted "Article Details" and newsletter blobs. Goal: total redesign to a clean, minimalist editorial look while preserving all functional behavior (search, category filter, pagination, newsletter API, share, SEO schema).

Palette: white background, `#21409A` primary accent, `#74C044` used sparingly, slate greys for text. Fewer fills, thinner borders, subtle motion only.

## Files

### Listing
- `app/news/page.tsx` — server page. **Keep** data fetching + SEO/JSON-LD. Featured post no longer visually distinct, but `getFeaturedNews` still fetched (fold into feed) — OR drop from props. Decision: keep fetch, pass featured into feed as a normal item (merge, dedupe by id). `getNewsArchive` currently unused in UI — drop the fetch.
- `components/sections/news/NewsHero.tsx` — restyle lighter (calmer kicker, heading, subtitle; remove glowing badge weight).
- `components/sections/news/NewsContent.tsx` — major rewrite: flat toolbar, uniform 3-col grid, no featured card, inline Upcoming Events + Newsletter sections below feed, minimal pagination. Remove `Tilt` import/usage.
- `components/sections/news/NewsletterSignup.tsx` — keep API logic; restyle flatter (used as inline band). Reuse component.

### Detail
- `components/sections/news/NewsDetailHero.tsx` — reduce height (~50vh), softer gradient, calmer fade; breadcrumb + category + date + title + thin meta row (location/time/category).
- `components/sections/news/NewsDetailContent.tsx` — rewrite to single centered column (~max-w-[720px]). Remove article+sidebar grid, remove `Tilt` "Article Details" card + sidebar newsletter. Keep prose (`sanitizeHtml`), keep share (flatten — drop `Magnetic`), keep back link.
- `components/sections/news/RelatedNews.tsx` — restyle cards to match new minimalist listing cards (thin border, no heavy shadow).
- `app/news/[slug]/page.tsx` — unchanged (composition + SEO stays).

## Design detail

### Listing toolbar
Sticky flat row on white. Left: tab filters `All · News · Events` — active state a small solid `#21409A` pill or underline, inactive muted slate. Right: borderless search input, bottom-border only, magnifier icon left. No blue background bar.

### Card (shared listing + related)
- Image top, `aspect-[16/9]`, rounded-2xl, subtle zoom on hover.
- Category as small uppercase text label (not filled pill).
- Date (muted xs) · title (font-iic bold, `line-clamp-2`) · description (`line-clamp-2`, slate) · "Read →".
- Container: `border border-gray-200`, hover → `border-[#21409A]/40` + slight `-translate-y-1`. No `shadow-md/xl`, no `Tilt`.

### Upcoming Events (inline, below feed)
Full-width section. Clean horizontal rows grouped by month: date chip (`#21409A`) + title + arrow. Flatter than current boxed green widget. Reuse `groupUpcomingEventsByMonth` logic.

### Newsletter (inline band)
Slim centered section reusing `NewsletterSignup` (functional). Restyle flatter — light background, centered copy + inline input+button.

### Pagination
Numbered, minimal. Active = solid `#21409A`; inactive = plain text with hover, no bordered boxes. Keep Prev/Next.

### Detail body
Single column centered `max-w-[720px]`. Prose block unchanged classes for rich content. Meta (category/location/time) shown as thin row in hero, not sidebar cards. Share row flattened (simple circular icon buttons, no Magnetic). Back-to-news link kept.

## Preserve (must not break)
- Search + category filter logic (`activeCategory`, `searchQuery`, plural→singular `Events`→`Event` normalization).
- Pagination state (`currentPage`, `ITEMS_PER_PAGE`).
- Newsletter POST `/api/subscribe` flow.
- Share targets (Facebook/LinkedIn) + `ShareMenu` on cards.
- All JSON-LD / breadcrumb schema in both `page.tsx` files.
- `sanitizeHtml` for detail content.

## Remove
- `Tilt` usage (listing cards, detail sidebar, related).
- `Magnetic` on detail share buttons.
- Featured post special card.
- Sidebar layout (both pages) → inline/stacked.
- Heavy shadows, filled category pills, `rounded-[40px]` blobs.

## Verification
1. `npx tsc --noEmit` — clean.
2. `npm run build` — compiles.
3. Dev server: `/news` — filters switch, search narrows, pagination works, upcoming events render, newsletter submits.
4. `/news/<slug>` — hero renders, prose intact, share opens, related cards link.
5. View-source: JSON-LD still present both pages.
