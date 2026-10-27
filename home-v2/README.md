# White Feather Supplies — Premium E-Commerce Homepage (v2)
> A brand redesign engineered to the craft standards of Emil Kowalski, built with vanilla HTML5, CSS3, and modern JavaScript. Zero-build static architecture ready for instant deployment to Vercel or Shopify Hydrogen.

---

## 1. Executive Summary & Design Engineering Overview

White Feather Supplies manufactures premium, crystal-clear, airtight kitchen and pantry storage containers. This project presents a completely **new, ground-up homepage design (`home-v2/`)** built without template frameworks or heavy runtimes.

### Core Pillars of Craft
1. **Emil Kowalski Motion Polish**: Every transition is purposeful and physically grounded. No layout thrashing or animating height/width. Animations strictly manipulate `transform` and `opacity` with custom cubic-bezier easing (`cubic-bezier(0.23, 1, 0.32, 1)` and `cubic-bezier(0.16, 1, 0.3, 1)`). Micro-interactions on buttons deliver tactile spring feedback (`scale(0.97)` on `:active`).
2. **True Ground Truth Data**: Every price ($40.99), compare-at price ($43.99 / $44.99), dimension (`7.87"W x 5.51"L x 11.96"H`), material specification (BPA-free food-grade ABS & SAN plastic, silicone gasket), and policy claim directly references the live store at `https://whitefeathersupplies.com/`. No fake reviews or artificial star ratings.
3. **Warm Premium Aesthetic**: A warm limestone off-white canvas (`#FBF9F6`) with dark obsidian typography (`#171615`), accented by the brand's signature blue airtight silicone gasket tint (`#0284C7` and `#E0F2FE`).

---

## 2. All 15 Homepage Sections (In Exact Specification Order)

| # | Section | Key Features & Implementation Details |
|---|---|---|
| **1** | **Announcement Bar** | Sticky top bar with dismissible button, localized sessionStorage persistence, promoting "Free standard shipping on all orders over $50". |
| **2** | **Compacting Header** | Fixed glassmorphism (`backdrop-filter: blur(16px)`), auto-shrinks on scroll (padding drops from 18px to 10px), brand logo, primary navigation links, search/account/cart icons with live counter badge, and mobile drawer with focus trap and `Escape` key dismissal. |
| **3** | **Hero Multi-Card Slider** | Editorial intro with a toned multi-card slider. Smooth touch drag, momentum mouse drag, dot indicators, arrow buttons, keyboard navigation (`ArrowLeft` / `ArrowRight`), pause on hover/focus. Card 1 includes a dedicated **3D model slot** ready for GLTF/Three.js integration. |
| **4** | **Trust Strip** | 4 key brand assurances with custom inline SVGs: BPA-Free Food-Grade Plastic, Airtight Silicone-Gasket Lids, Free Shipping Over $50, and 30-Day Hassle-Free Returns. |
| **5** | **The Problem** | Empathetic editorial statement addressing kitchen pantry chaos, split flour sacks, stale cereal, and pest vulnerabilities, paired with a photorealistic "before" pantry image. |
| **6** | **The Solution (Interactive Slider)** | Interactive before/after split image comparison slider with a smooth draggable divider handle, touch swipe support, and full keyboard arrow control (`ArrowLeft`, `ArrowRight`, `Home`, `End`). |
| **7** | **Best Sellers Grid** | Verified live purchasable products only: **8.5L Extra-Large Set of 2** ($40.99, reg $43.99) and **6.5L Set of 2** ($40.99, reg $44.99). Real savings badges (-7%, -9%), color swatches (Clear vs. Black lids) that dynamically swap photo previews, secondary hover image swaps, and an interactive **Quick View** modal. |
| **8** | **Feature Deep-Dive** | Sticky container showcase with interactive hotspot indicators highlighting the 5 key engineering hallmarks: Blue Silicone Airtight Gasket, Crystal-Clear SAN Body, Included Measuring Cups, Reusable Labels & Marker, and Modular Stacking Bases. Features exact real dimensions callout: `7.87"W × 5.51"L × 11.96"H`. |
| **9** | **Visual Size Guide** | Practical real-world pantry capacity breakdown showing what 8.5L and 6.5L hold (e.g. 10–12 lbs of baking flour, full 10 lb sugar sacks, bulk jasmine rice, cereal family packs, or pet kibble). |
| **10** | **Shop by Collection** | Two large editorial collection banners with hover zoom transforms linking to the live collections: **Flour & Sugar Storage Containers** and **Pantry Storage Containers**. |
| **11** | **Reviews (Testimonial Architecture)** | Clean editorial testimonial cards clearly labeled in code with `<!-- PLACEHOLDER: replace with real reviews -->`. Zero synthetic 5-star badges or fake ratings. |
| **12** | **Smooth FAQ Accordion** | Real FAQs addressing sizes, airtight sealing mechanics, freezer safety, and cleaning recommendations. Smooth animated accordion height using `scrollHeight` measurements without layout jumps. |
| **13** | **Kitchen Tips (Blog)** | Editorial card grid linking to real live articles on `whitefeathersupplies.com/blogs/kitchen-tips`: Bulk Rice Storage, Keeping Oats Crispy, and Natural Pantry Moth Defense. |
| **14** | **Newsletter Subscription** | Clean, accessible email capture with client-side regex validation, animated loading state, and inline success notification ("You're on the insider list"). Ready for Klaviyo/Shopify integration. |
| **15** | **Brand Footer** | Deep charcoal footer featuring brand tagline, primary navigation, policy links (Shipping, Returns, Privacy, Terms), verified social links (Facebook, Instagram, Pinterest), secure payment badges (Visa, Mastercard, Amex, Apple Pay, Google Pay, PayPal, Shop Pay, Discover, Diners Club), and copyright notice: `© 2026 White Feather Supplies.` |

---

## 3. Design Engineering Decisions & Token Architecture

### 3.1 Color Palette
- **Canvas Base**: `#FBF9F6` (Warm limestone off-white, calm and airy)
- **Primary Text**: `#171615` (Obsidian soft black, WCAG AAA contrast ratio 15.8:1 against canvas)
- **Secondary Text**: `#57534E` (Warm slate gray, WCAG AA compliant for metadata and descriptions)
- **Signature Accent**: `#0284C7` (Silicone gasket blue, honoring the blue seal on White Feather containers)
- **Accent Light Tint**: `#E0F2FE` (Soft morning sky mist for tags and callout badges)
- **Borders & Dividers**: `rgba(23, 22, 21, 0.08)` (Delicate hairline borders, never harsh)

### 3.2 Typography System
- **Display / Headings**: *Playfair Display* (Editorial luxury, high-fashion pantry aesthetic)
- **Body / Interface**: *Plus Jakarta Sans* (Crisp geometric clarity, optimal legibility at micro sizes)
- **Fluid Scale**: Uses `clamp()` functions across all headings to ensure fluid scaling between 375px mobile and 1920px desktop viewports without abrupt breakpoint reflows.

### 3.3 Motion & Interaction (Emil Kowalski Standard)
- **Timing Tokens**: Fast UI feedback (`150ms–200ms`), medium modal transitions (`300ms–400ms`), section reveal transitions (`500ms–700ms`).
- **Physical Springs**: Slider tracks feature momentum dragging and rubber-band bounding.
- **Accessibility / Prefers-Reduced-Motion**: Under `@media (prefers-reduced-motion: reduce)`, all transform slide animations are disabled in favor of instantaneous opacity transitions.

---

## 4. Discovered Catalog Realities & Recommendations

### 4.1 Dishwasher Contradiction Flag
On the live Shopify product pages for both the 8.5L and 6.5L containers, the product description contains contradictory bullets:
- Bullet A: *"Dishwasher safe (top rack recommended)"*
- Bullet B: *"Clean by hand washing with warm soapy water to preserve silicone seals"*

**Implementation Choice & Recommendation for Client**:
We have resolved this on the homepage by highlighting **"Hand Wash Recommended for Gasket Longevity & High Durability"**, and clarifying in the FAQ that while the container body is top-rack safe, hand-washing the lids preserves the airtight blue silicone gasket elasticity indefinitely. We recommend the client align their Shopify product bullet copy to avoid customer return disputes.

### 4.2 Dead Catalog URLs (404s)
During Phase 1 catalog verification, the following 4 URLs listed in legacy brand sheets returned 404 Not Found on `whitefeathersupplies.com`:
- `/products/5-2l-and-6-5l-plastic-food-storage-container-set-of-4` (404)
- `/products/airtight-food-storage-container-set-20-pcs` (404)
- `/products/6-5l-plastic-food-container-set-of-2-grey-lids` (404)
- `/products/5-2l-and-6-5l-plastic-food-storage-container-set-of-4-clear-lids` (404)

**Implementation Choice**:
Only the two verified, purchasable products (**8.5L Extra-Large Set of 2** and **6.5L Set of 2**) are featured in active product slots with verified pricing ($40.99) and real savings tags.

### 4.3 Brand Logo Contrast Optimization
The original logo file at `https://cdn.shopify.com/s/files/1/0863/8388/6643/files/White_Feather_Logo_Png.png` is composed of 100% white pixels (`rgb(255, 255, 255)`), designed solely for dark footers.
For the new bright, airy, light-themed header, we generated `assets/brand/white_feather_logo_dark.png` (`rgb(23, 22, 21)`), guaranteeing crisp contrast while preserving the white logo in the deep footer.

---

## 5. Client Integration Checklist & Placeholders

1. **Testimonial Reviews (`#reviewsSection`)**: Marked in code with `<!-- PLACEHOLDER: replace with real reviews -->`. Connect Yotpo, Judge.me, or Okendo API when real customer reviews are gathered.
2. **3D Model Slot (`#hero3dSlot`)**: Located inside Hero Card 1. The container currently displays high-res studio photography with a labeled mount point for `@google/model-viewer` or Three.js canvas.
3. **Newsletter Form (`#newsletterForm`)**: Wired with client-side validation; replace the dummy success delay with your Klaviyo or Shopify Customer API endpoint.
4. **Quick View Add-to-Cart (`#modalAddToCart`)**: Dispatches a standard cart event and updates the header badge; wire to `/cart/add.js` when embedding into Shopify Liquid.

---

## 6. Visual Verification Screenshots

### Desktop Viewports (1440px)
- **Announcement Bar, Compacting Header & Hero**: `screenshots/sec_01_announcement_header_hero.png`
- **Trust Strip, Problem & Draggable Solution**: `screenshots/sec_02_trust_problem_solution.png`
- **Best Sellers Grid & Interactive Swatches**: `screenshots/sec_03_bestsellers.png`
- **Feature Deep-Dive Hotspots & Spec Callout**: `screenshots/sec_04_deepdive.png`
- **Visual Size Guide (8.5L vs 6.5L)**: `screenshots/sec_05_sizeguide.png`
- **Editorial Collection Banners**: `screenshots/sec_06_collections.png`
- **Customer Reviews Architecture**: `screenshots/sec_07_reviews.png`
- **Animated FAQ Accordion**: `screenshots/sec_08_faq.png`
- **Kitchen Tips Blog Cards**: `screenshots/sec_09_blog.png`
- **Newsletter & Brand Footer**: `screenshots/sec_10_newsletter_footer.png`
- **Complete Full-Page Desktop Capture**: `screenshots/desktop_full_page.png`

### Mobile Viewports (375px)
- **Mobile Header, Hero & Trust Strip**: `screenshots/mob_01_hero_trust.png`
- **Mobile Comparison Slider & Product Cards**: `screenshots/mob_02_comparison_bestsellers.png`
- **Mobile Deep Dive & Capacity Guide**: `screenshots/mob_03_deepdive_sizeguide.png`
- **Mobile FAQ, Blog & Compact Footer**: `screenshots/mob_04_faq_blog_footer.png`
- **Complete Full-Page Mobile Capture**: `screenshots/mobile_full_page.png`

---

## 7. How to Run Locally & Deploy

### Local Development
```bash
# From within the repository root:
python -m http.server 3000 --directory home-v2
# Open http://localhost:3000 in your browser
```

### Vercel Deployment
Because `home-v2/` is a pure static site (zero build steps, pure HTML/CSS/JS), point Vercel's root directory setting to `home-v2` or deploy with:
```bash
vercel --cwd home-v2 --prod
```
