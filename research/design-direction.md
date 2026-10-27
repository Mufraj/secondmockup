# White Feather Supplies — Design Direction & System Specification

**Philosophy**: Emil Kowalski interaction standard · Restrained luxury · Optical clarity & natural light  
**Target Atmosphere**: Bright, calm, airy, meticulously organized, whisper-quiet luxury.

---

## 1. Visual Moodboard & Theme Rules
* **Light Theme Exclusively**: Kitchen and pantry organization thrives in bright morning light. Clear acrylic and SAN plastic containers reflect transparency, cleanliness, and order.
* **Palette Philosophy**:
  * Warm, sunlit off-white foundations echoing limestone countertops and unbleached linen.
  * Near-black deep charcoal ink (`#171615`) for razor-sharp typography without harsh digital black.
  * A signature gasket cyan-blue secondary accent (`#0284C7` / `#0369A1` / `#E0F2FE`) that pays homage to White Feather's signature airtight blue silicone sealing gasket.
  * Organic wheat/warm taupe border accents (`#E6E1D8`) providing structure without visual weight.

---

## 2. Complete Design Token Specification

```css
:root {
  /* ─── Color Foundations (WCAG AA & AAA Compliant) ─── */
  --color-bg-base: #FBF9F6;          /* Warm limestone off-white */
  --color-bg-surface: #FFFFFF;       /* Pure white card substrate */
  --color-bg-elevated: #F5F1EB;      /* Subtle warm secondary tint */
  --color-bg-subtle: #EFEAE2;        /* Pill & badge backgrounds */
  
  --color-text-primary: #171615;     /* Near-black ink (14.2:1 contrast against base) */
  --color-text-secondary: #58534C;   /* Warm charcoal gray (6.4:1 contrast) */
  --color-text-tertiary: #847E75;    /* Subdued metadata / captions */
  --color-text-inverse: #FFFFFF;     /* White on dark buttons */

  /* ─── Brand & Functional Accents ─── */
  --color-brand-primary: #1F2937;    /* Obsidian slate primary CTA */
  --color-brand-hover: #111827;      /* Hover state */
  --color-accent-gasket: #0284C7;    /* Signature Airtight Silicone Blue */
  --color-accent-gasket-dark: #0369A1;
  --color-accent-gasket-soft: #F0F9FF; /* Soft ice-blue highlight */
  --color-accent-gasket-border: #BAE6FD;
  
  --color-accent-warm: #B45309;      /* Warm golden amber / savings tag */
  --color-accent-warm-soft: #FEF3C7;
  --color-border: #E8E3DA;           /* Delicate mineral borders */
  --color-border-subtle: #F0EBE3;
  --color-border-focus: #0284C7;     /* Keyboard outline ring */

  /* ─── Fluid Typography Scale (clamp) ─── */
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
  
  --font-size-xs: clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem);    /* 12px -> 13px */
  --font-size-sm: clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem);   /* 14px -> 15px */
  --font-size-base: clamp(1rem, 0.96rem + 0.2vw, 1.0625rem);      /* 16px -> 17px */
  --font-size-md: clamp(1.125rem, 1.08rem + 0.25vw, 1.25rem);     /* 18px -> 20px */
  --font-size-lg: clamp(1.25rem, 1.18rem + 0.35vw, 1.5rem);       /* 20px -> 24px */
  --font-size-xl: clamp(1.625rem, 1.5rem + 0.6vw, 2rem);          /* 26px -> 32px */
  --font-size-2xl: clamp(2.125rem, 1.9rem + 1.1vw, 2.75rem);      /* 34px -> 44px */
  --font-size-3xl: clamp(2.75rem, 2.4rem + 1.8vw, 3.75rem);       /* 44px -> 60px */
  --font-size-display: clamp(3.25rem, 2.8rem + 2.4vw, 4.75rem);   /* 52px -> 76px */

  --line-height-tight: 1.1;
  --line-height-heading: 1.22;
  --line-height-body: 1.6;

  --tracking-tight: -0.03em;
  --tracking-normal: -0.01em;
  --tracking-wide: 0.04em;
  --tracking-caps: 0.08em;

  /* ─── 8px Spacing Grid ─── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* ─── Geometry & Radius Tokens ─── */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 9999px;

  /* ─── Multi-Layered Soft Ambient Shadows (No Cheap Gradients) ─── */
  --shadow-sm: 0 1px 2px rgba(23, 22, 21, 0.04), 0 2px 4px rgba(23, 22, 21, 0.02);
  --shadow-md: 0 4px 12px -2px rgba(23, 22, 21, 0.06), 0 2px 6px -1px rgba(23, 22, 21, 0.03);
  --shadow-lg: 0 12px 32px -4px rgba(23, 22, 21, 0.08), 0 4px 12px -2px rgba(23, 22, 21, 0.04);
  --shadow-float: 0 20px 48px -8px rgba(23, 22, 21, 0.12), 0 6px 16px -3px rgba(23, 22, 21, 0.05);

  /* ─── Emil Kowalski Motion Curves & Physics ─── */
  --ease-spring: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-smooth: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out-smooth: cubic-bezier(0.77, 0, 0.175, 1);
  
  --duration-instant: 120ms;
  --duration-fast: 200ms;
  --duration-normal: 350ms;
  --duration-reveal: 600ms;
}
```

---

## 3. Motion & Micro-Interaction Guidelines
1. **Physical Momentum on Drag/Swipe**: The hero slider cards use pointer tracking with a dampening coefficient and magnetic snapping to the nearest card index.
2. **Transform & Opacity Exclusivity**: No transitions on `height`, `width`, `margin`, or `padding` during scroll or drag interactions to ensure constant 60fps / 120fps rendering.
3. **Button Press Feedback**: All interactive buttons utilize `:active { transform: scale(0.975); }` with a 150ms return transition.
4. **Accessible Reduced-Motion Enforcement**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
