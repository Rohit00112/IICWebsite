# Fluid.glass Cinematic Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `ScrollScaleVideo` into a scroll-pinned, fluid.glass-style atmospheric video block — sticky 100vh viewport, edge radial blur mask, fade-out center hero text, pinned LMU/ING corner logos, retained click-to-fullscreen.

**Architecture:** Outer wrapper `h-[200vh]` provides scroll runway; inner `sticky top-0 h-screen` pins the video panel. Framer Motion `useScroll`/`useTransform` on the outer ref drive five overlay animations (center text opacity/Y, video parallax scale, mask intensity, corner logo opacity). Existing `FullscreenOverlay` retained verbatim. No changes to `AboutSection.tsx` or `app/page.tsx`.

**Tech Stack:** Next.js 16, React 19, Framer Motion 12, Tailwind 4. Bun for package manager / dev server (`bun run dev`).

**Spec:** `docs/superpowers/specs/2026-04-30-fluid-glass-video-design.md`

---

## File Structure

- **Modify:** `components/sections/home/ScrollScaleVideo.tsx` — full rewrite of the exported `ScrollScaleVideo` component (outer/sticky structure, scroll-linked layers). The internal `FullscreenOverlay` component below it is preserved unchanged.

No new files. No tests added (UI animation component, project has no existing UI test harness — manual browser verification per spec acceptance criteria).

---

## Task 1: Restructure container to sticky scroll runway

**Files:**
- Modify: `components/sections/home/ScrollScaleVideo.tsx:52-117` (the `ScrollScaleVideo` component, not `FullscreenOverlay`)

- [ ] **Step 1: Replace component imports and add scroll hook**

Replace the import line at the top of the file:

```tsx
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

const VIDEO_SRC = '/videos/iic.mp4';
const POSTER_SRC = '/images/home/tower_block.png';
const IIC_LOGO = '/images/common/iic_logo.png';
const LMU_LOGO = '/images/home/lmu brand 1.png';
const ING_LOGO = '/images/home/ing.png';
```

- [ ] **Step 2: Replace the `ScrollScaleVideo` component body with the sticky scroll structure**

Replace the entire `ScrollScaleVideo` component (lines 9-117 in the current file) with:

```tsx
const ScrollScaleVideo = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const outerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  const centerOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const centerY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const maskOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const cornerOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    [0, 0.6, 0.6, 0]
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setCursor((prev) => ({ ...prev, visible: false }));
  };

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = useCallback(() => setIsFullscreen(false), []);

  useEffect(() => {
    if (!isFullscreen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isFullscreen, closeFullscreen]);

  return (
    <section ref={outerRef} className="relative w-full h-[200vh] bg-black mt-20 md:mt-32">
      <div
        ref={containerRef}
        onClick={openFullscreen}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="sticky top-0 h-screen w-full overflow-hidden cursor-none group"
      >
        <motion.video
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={{ scale: videoScale }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Edge radial blur mask */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: maskOpacity }}
          className="absolute inset-0 z-10 pointer-events-none fluid-edge-mask"
        />

        {/* Vignette */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Grain */}
        <div className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Framing lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-20" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-20" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-white/10 z-20" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-white/10 z-20" />

        {/* Corner logos */}
        <motion.div
          style={{ opacity: cornerOpacity }}
          className="absolute top-6 left-6 md:top-10 md:left-10 z-30 pointer-events-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LMU_LOGO}
            alt=""
            aria-hidden="true"
            className="h-6 md:h-10 w-auto brightness-0 invert opacity-90"
          />
        </motion.div>
        <motion.div
          style={{ opacity: cornerOpacity }}
          className="absolute top-6 right-6 md:top-10 md:right-10 z-30 pointer-events-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ING_LOGO}
            alt=""
            aria-hidden="true"
            className="h-6 md:h-10 w-auto brightness-0 invert opacity-90"
          />
        </motion.div>

        {/* Center hero overlay */}
        <motion.div
          style={{ opacity: centerOpacity, y: centerY }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-6 text-center"
        >
          <span className="text-white/80 text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase mb-6">
            Start your journey with
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IIC_LOGO}
            alt="IIC"
            className="h-16 md:h-24 w-auto brightness-0 invert"
          />
        </motion.div>

        {/* Custom cursor pill */}
        <AnimatePresence>
          {cursor.visible && !isFullscreen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                left: cursor.x,
                top: cursor.y,
                translateX: '-50%',
                translateY: '-50%',
              }}
              className="absolute z-50 pointer-events-none flex items-center justify-center"
            >
              <div className="px-6 py-3 rounded-full bg-[#74C044] text-white text-[10px] font-bold tracking-[0.2em] shadow-2xl flex items-center gap-3 backdrop-blur-sm border border-white/20">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                WATCH VIDEO
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <FullscreenOverlay src={VIDEO_SRC} poster={POSTER_SRC} onClose={closeFullscreen} />
        )}
      </AnimatePresence>
    </section>
  );
};
```

Note: `FullscreenOverlay` (the second component in the file, currently lines 119-297) is unchanged — leave it as-is below `ScrollScaleVideo`.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `bun run lint`

Expected: no errors. If `outerRef` type complains, ensure declaration is `useRef<HTMLElement>(null)` (matches `<section ref={outerRef}>`).

- [ ] **Step 4: Commit**

```bash
git add components/sections/home/ScrollScaleVideo.tsx
git commit -m "$(cat <<'EOF'
refactor(video): convert ScrollScaleVideo to sticky scroll runway

Outer h-[200vh] wraps a sticky h-screen panel; framer-motion useScroll
drives center text/logo, corner logos, video parallax, edge mask opacity.
Click-to-fullscreen retained.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Add edge radial blur mask CSS

The `fluid-edge-mask` class referenced in Task 1 needs CSS rules for the radial-gradient blur mask. Tailwind 4 doesn't express `mask-image` + `backdrop-filter` cleanly inline, so add a global rule.

**Files:**
- Modify: `app/globals.css` (append)

- [ ] **Step 1: Read current globals.css to find a good insertion point**

Run: `wc -l app/globals.css` to confirm size. Open and scan for an existing utilities section.

- [ ] **Step 2: Append mask styles**

Append to the end of `app/globals.css`:

```css
/* Fluid.glass-style edge blur mask for ScrollScaleVideo */
.fluid-edge-mask {
  -webkit-mask-image: radial-gradient(
    ellipse 65% 55% at center,
    transparent 35%,
    black 75%
  );
  mask-image: radial-gradient(
    ellipse 65% 55% at center,
    transparent 35%,
    black 75%
  );
}

@supports (backdrop-filter: blur(1px)) {
  .fluid-edge-mask {
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    background-color: rgba(0, 0, 0, 0.15);
  }
}

@supports not (backdrop-filter: blur(1px)) {
  .fluid-edge-mask {
    background: radial-gradient(
      ellipse 65% 55% at center,
      transparent 35%,
      rgba(0, 0, 0, 0.7) 90%
    );
  }
}

@media (max-width: 768px) {
  .fluid-edge-mask {
    -webkit-mask-image: radial-gradient(
      ellipse 80% 65% at center,
      transparent 30%,
      black 80%
    );
    mask-image: radial-gradient(
      ellipse 80% 65% at center,
      transparent 30%,
      black 80%
    );
  }
}
```

- [ ] **Step 3: Verify build still passes**

Run: `bun run build` (or `bun run dev` and watch console for CSS errors).

Expected: no PostCSS errors. CSS file emitted.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "$(cat <<'EOF'
style(video): add fluid edge blur mask CSS

Radial-gradient mask isolates blur to outer edges with @supports
fallback for browsers without backdrop-filter. Tightens ellipse
on mobile for stronger center focus.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Manual browser verification against acceptance criteria

This task is a checklist run against the spec acceptance criteria (`docs/superpowers/specs/2026-04-30-fluid-glass-video-design.md` §Acceptance criteria). No code change unless a check fails.

**Files:**
- None (verification only)

- [ ] **Step 1: Start dev server**

Run: `bun run dev`

Expected: server starts on http://localhost:3000.

- [ ] **Step 2: Open home page and scroll to video section**

Open `http://localhost:3000` in a browser. Scroll past Hero and the AboutSection text until video appears.

- [ ] **Step 3: Run acceptance checklist in browser**

For each, verify visually:

1. Section occupies ~2× viewport height of scroll while video pinned at top.
2. Video autoplays muted, loops; poster shows briefly at start.
3. "Start your journey with" + IIC logo visible at scroll start, fully faded by ~35% scroll into the section.
4. LMU logo top-left, ING logo top-right, both faded in by 10% scroll, faded out near 100%.
5. Edges show visible blur, center sharp (Chrome/Safari modern).
6. Grain overlay at low opacity.
7. Click anywhere on video panel opens fullscreen.
8. ESC closes fullscreen and body scroll restores.
9. Resize to ≤768px: tighter mask, smaller corner logos, no cursor pill on touch.
10. DevTools console: zero errors.

- [ ] **Step 4: Fix any failures inline**

If a criterion fails, edit `ScrollScaleVideo.tsx` or `globals.css` to address it. After fix, re-run the failing check. Commit each fix:

```bash
git add <files>
git commit -m "fix(video): <specific issue>"
```

- [ ] **Step 5: Final lint + build**

Run: `bun run lint && bun run build`

Expected: zero lint errors, build succeeds.

- [ ] **Step 6: Final commit if any followup fixes**

Already covered by Step 4. If no fixes needed, skip.

---

## Self-Review

**Spec coverage:**
- §Architecture (sticky runway, layer stack) → Task 1
- §Scroll mapping (5 transforms) → Task 1 step 2
- §Edge radial blur mask + fallbacks + mobile tightening → Task 2
- §Click-to-fullscreen unchanged → Task 1 (FullscreenOverlay preserved)
- §Acceptance criteria (10 items) → Task 3
- §Out of scope (Navbar transition) → not in plan, correct

**Placeholder scan:** none. All code shown. All file paths exact.

**Type consistency:** `outerRef: HTMLElement`, `containerRef: HTMLDivElement`. `useScroll` consumes `outerRef`. Class names `fluid-edge-mask` defined in CSS, applied in JSX.

**Asset paths verified:** `/images/common/iic_logo.png`, `/images/home/lmu brand 1.png` (space in filename — used in `<img src>` so URL-encoded by browser; works), `/images/home/ing.png`, `/videos/iic.mp4`, `/images/home/tower_block.png`. All confirmed present in `public/`.
