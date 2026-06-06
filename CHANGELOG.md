# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-06-06

### Added

- **Photorealistic Earth Globe** — Three.js sphere with NASA Blue Marble textures, bump map, specular highlights, rotating cloud layer, Fresnel atmosphere shader, ACES tone mapping
- **Starfield Background** — Canvas-based 600-star warp-speed animation with scroll acceleration
- **Scroll Stars** — 3 parallax star layers (240 elements) with twinkling + shooting stars
- **Space Planet** — CSS animated orb with rotating clouds, glow ring, orbiting dots
- **Depth Stack Showcase** — 3D perspective card layout with mouse-driven focus shift
- **Cursor Reveal** — Circular clip-path mask follows cursor to reveal gradient text
- **Login Page Earth** — Photorealistic globe as right-half background in login visual panel
- **Login Shape Physics** — 12 geometric shapes with mouse repulsion, magnetic pull, glow effects
- **Shared Utilities** — `src/js/utils.js` with `getRelativeMousePos`, `clamp`, `lerp`
- **Local Textures** — NASA Earth textures served from `public/textures/` (no CORS)
- **Wrangler Config** — `wrangler.toml` for Cloudflare Pages deployment

### Changed

- **Vite** upgraded from 6.x to 8.0.16
- **GSAP** upgraded from 3.12 to 3.15
- **Lenis** upgraded from 1.1 to 1.3
- **ESLint** upgraded from 9.x to 10.4
- **Prettier** upgraded from 3.4 to 3.8
- Globe lazy-loaded via dynamic `import()` for code-splitting (~130KB gzip chunk)
- Login visual panel darkened (near-black) for better globe contrast
- Navigation expanded with Universe, Showcase section links

### Refactored

- Removed dead code: unused parameters, unreachable returns, computed-but-unread variables
- Consolidated scroll animation blocks into config-driven loop
- `cursor-light.js` optimized with `gsap.quickSetter` instead of ticker
- `depth-stack.js` guards animation with ScrollTrigger visibility check
- Deleted unused `public/textures/earth-clouds.png`
- Net reduction: -94 lines of code

### Fixed

- Globe CORS errors — textures now served locally
- Globe oval distortion — camera locked to 1:1 aspect ratio
- Sun lighting — repositioned to illuminate visible hemisphere
- Cloudflare Pages deployment — added `wrangler.toml` with `[assets] directory`

---

## [1.0.0] — 2026-06-06

### Added

- **Build System** — Vite with multi-page HTML support, Terser minification
- **Animation Engine** — GSAP with ScrollTrigger for scroll-driven animations
- **Smooth Scroll** — Lenis for momentum scrolling
- **Text Animations** — SplitType for per-character headline animations
- **Hero Section** — Character-split 3D reveal, floating orbs, pulsing grid, staggered CTAs
- **Interactive Elements** — Magnetic buttons, cursor light, feature card glow, nav scroll highlighting
- **Terminal Demo** — ScrollTrigger-activated typing sequence with cursor blink
- **Login Page** — Split-screen layout, staggered form reveal, social auth, toast notifications, parallax shapes
- **CI/CD** — GitHub Actions workflow for Cloudflare Pages
- **Documentation** — README, CONTRIBUTING, CHANGELOG, LICENSE

---

## [0.1.0] — 2026-06-06

### Added

- Initial static HTML/CSS/JS prototype
- Landing page with CSS-only animations
- Login page with inline JavaScript
