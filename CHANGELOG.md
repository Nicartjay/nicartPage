# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-06-06

### Added

- **Build System** — Vite 6 with multi-page HTML support, Terser minification
- **Animation Engine** — GSAP 3.12 with ScrollTrigger for scroll-driven animations
- **Smooth Scroll** — Lenis for buttery-smooth momentum scrolling
- **Text Animations** — SplitType for per-character/word headline animations
- **Hero Section**
  - Character-split 3D headline reveal with `back.out` easing
  - Floating particle orbs with elastic entrance + random drift
  - Pulsing grid background with parallax
  - Staggered CTA button spring-in
- **Interactive Elements**
  - Magnetic button hover effect (attract toward cursor)
  - Cursor-following ambient light (desktop only)
  - Mouse-tracking radial glow on feature cards
  - Nav link underline animation on scroll position
- **Terminal Demo**
  - ScrollTrigger-activated line-by-line typing animation
  - Cursor blink after sequence completes
  - Resets on scroll re-entry
- **Login Page**
  - GSAP-animated geometric shapes with parallax mouse response
  - Orbiting dots with infinite rotation
  - Morphing mesh gradient background
  - Staggered form element reveal
  - Click ripple effect on submit button
  - Loading shimmer + success state transitions
  - Toast notification system
  - Email/password validation with error states
- **Scroll Animations**
  - `fade-up`, `fade-left`, `fade-right`, `scale-in` reveal types
  - Stagger children animation via data attributes
  - Section heading clip-path reveal
  - Configurable parallax via `data-parallax` attribute
- **Responsive Design**
  - Mobile hamburger menu with GSAP link animations
  - Adaptive grid layouts (3-col → 1-col)
  - Touch-friendly interactions
- **Developer Experience**
  - Hot Module Replacement (HMR) via Vite
  - Modular CSS architecture (base, layout, components, page-specific)
  - Modular JS architecture (one file per concern)
  - ESLint + Prettier configuration
- **CI/CD**
  - GitHub Actions workflow for automatic Cloudflare Pages deployment
- **Documentation**
  - Comprehensive README with animation catalog
  - Contributing guide with animation guidelines
  - MIT License

### Technical Details

- **Dependencies:** gsap, lenis, split-type
- **Dev Dependencies:** vite, eslint, prettier, vite-plugin-html
- **Browser Support:** Chrome 105+, Firefox 110+, Safari 16.4+
- **CSS Features:** `color-mix()`, `oklch`, `clamp()`, custom properties, `text-wrap: balance`
- **Deploy Target:** Cloudflare Pages (static, edge-deployed)

---

## [0.1.0] — 2026-06-06

### Added

- Initial static HTML/CSS/JS prototype
- Landing page with CSS-only animations
- Login page with inline JavaScript
- Basic IntersectionObserver scroll reveals
- Pure CSS floating orbs and grid pulse
