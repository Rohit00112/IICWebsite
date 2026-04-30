# Fluid.glass-style Cinematic Video Section

## Goal

Refactor `components/sections/home/ScrollScaleVideo.tsx` into an atmospheric, scroll-pinned cinematic backdrop matching the behavior on https://fluid.glass. The component remains rendered inside `AboutSection.tsx` at its current position. Click-to-fullscreen behavior is preserved.

## Behavior Reference (from `video.md`)

- Full-height (`100vh`) sticky video while content scrolls over.
- Edge-blur/vignette mask creating center "portal" focus.
- Centered hero overlay text that fades out on scroll.
- Pinned corner logos (London Met top-left, ING top-right).
- Subtle grain/noise overlay.
- No native player chrome; ambient autoplay.

Click-to-fullscreen with full custom controls is an IIC addition retained from the current implementation.

## Architecture

### Outer scroll runway

```
<section className="relative h-[200vh] w-full bg-black">
  <div className="sticky top-0 h-screen w-full overflow-hidden">
    {/* layers */}
  </div>
</section>
```

`h-[200vh]` provides a 100vh scroll distance during which the video is pinned. This drives the scroll-linked animations.

### Layer stack (z-order, bottom → top)

1. **Video** (`<video>`, `object-cover`, `w-full h-full`, autoplay/muted/loop/playsInline). Subtle scale parallax via `motion.video` style.
2. **Edge radial blur mask** — absolutely positioned, full-bleed div with `backdrop-filter: blur(40px)` and `mask-image: radial-gradient(ellipse 65% 55% at center, transparent 35%, black 75%)` (plus `-webkit-mask-image`). Blur applies only outside the elliptical center; center stays sharp.
3. **Vignette gradient** — `bg-gradient-to-t from-black/60 via-transparent to-black/30` for filmic falloff.
4. **Grain** — same noise SVG already in use, `opacity-[0.04]`.
5. **Framing lines** — 1px white/10 borders top/bottom/left/right (kept from current).
6. **Center overlay** — small uppercase eyebrow "Start your journey with" + large IIC logo. Framer `motion.div` driven by scroll progress (opacity + Y).
7. **Corner logos** — LMU top-left, ING top-right. `40px` height, `opacity-60`, fade out near scroll end.
8. **Custom cursor "WATCH VIDEO" pill** — kept from current; only visible while pointer inside container and not in fullscreen.

### Scroll mapping

`useScroll({ target: outerRef, offset: ['start start', 'end end'] })` → `scrollYProgress` (0 → 1).

`useTransform` derivations:

| Output | Domain → Range |
|---|---|
| `centerOpacity` | `[0, 0.35]` → `[1, 0]` |
| `centerY` | `[0, 0.4]` → `[0, -40]` (px) |
| `videoScale` | `[0, 1]` → `[1, 1.08]` |
| `maskIntensity` (CSS var on mask layer) | `[0, 0.5]` → `[0.5, 1]` |
| `cornerOpacity` | `[0, 0.1, 0.85, 1]` → `[0, 0.6, 0.6, 0]` |

`maskIntensity` modulates `--mask-strength` consumed by the mask layer's `opacity` so blur edges deepen as user scrolls in.

### Click-to-fullscreen

Unchanged. The sticky inner panel is the click target. `FullscreenOverlay` component already in file is kept verbatim — controls, scrub bar, branding.

The custom cursor pill should NOT render while fullscreen is active (already covered by current AnimatePresence on `cursor.visible`, but ensure pointer-events on overlay elements don't trigger pill flicker).

## Assets

- `/images/common/iic_logo.png` — center hero logo.
- `/images/home/lmu brand 1.png` — top-left pinned logo (LMU).
- `/images/home/ing.png` — top-right pinned logo (ING).
- `/videos/iic.mp4` — unchanged.
- `/images/home/tower_block.png` — poster, unchanged.

Use `next/image` for static logos with `unoptimized` if path contains spaces; otherwise rename or use `<img>` with explicit width/height. Decision: use `<img>` to avoid space-in-path Next/Image escape issues; logos are small.

## Component contract

`<ScrollScaleVideo />`

- Props: none.
- Side effects: locks `body.overflow` only while fullscreen open (existing behavior).
- Refs: `outerRef` for scroll target, `containerRef` for cursor math, `videoRef` (in fullscreen overlay).

## Browser support / fallbacks

- `backdrop-filter` works in modern Chrome/Safari/Firefox (≥103). Fallback: if unsupported, mask layer reduces to a pure radial-gradient vignette (no blur). Acceptable degradation; no JS detection needed — `@supports (backdrop-filter: blur(1px))` rule wraps the blur version.
- `mask-image` requires `-webkit-mask-image` prefix for Safari.

## Out of scope

- Bottom-pinned blurred Navbar transition (video.md item C). Skipped this iteration; Navbar lives outside this component and would require global scroll state. Document as follow-up.
- Replacing AboutSection layout. Component stays as the trailing element of AboutSection.
- New routing or page restructuring.

## Acceptance criteria

1. Section occupies 200vh of scroll, with video panel pinned at `top: 0` for the duration.
2. Video autoplays muted/looping; poster shown until first frame.
3. Center text "Start your journey with" + IIC logo visible at scroll start, fully faded by ~35% scroll progress.
4. LMU logo (top-left) and ING logo (top-right) fade in by ~10% scroll, fade out near 100%.
5. Edge of video panel shows visible blur (when `backdrop-filter` supported); center stays sharp.
6. Grain overlay visible at low opacity.
7. Click anywhere on video panel opens fullscreen overlay with existing controls.
8. ESC closes fullscreen; body scroll restored.
9. Mobile (≤768px): scroll runway still 200vh, mask intensity reduced (smaller ellipse), corner logos at 24px height, cursor pill hidden (touch).
10. No console errors; Lighthouse a11y score not regressed (video has no captions but is decorative — `aria-hidden="true"` on the ambient `<video>`).

## Files

- **Modify:** `components/sections/home/ScrollScaleVideo.tsx` — rewrite outer/sticky structure + scroll-linked layers; keep `FullscreenOverlay` block unchanged.
- **No change:** `components/sections/home/AboutSection.tsx`, `app/page.tsx`.
