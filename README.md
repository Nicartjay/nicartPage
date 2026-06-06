# nicart.space

> Creative Developer Platform — An animation-focused, space-themed landing site built with modern web technologies and WebGL.

---

## Overview

**nicart.space** is a high-performance, animation-heavy landing page for a creative developer platform. The site features a space/astronomy theme with a photorealistic 3D Earth globe, warp-speed starfield, scroll-driven parallax effects, and immersive micro-interactions.

### Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page with hero animations, 3D globe, feature cards, terminal demo, depth stack showcase, and cursor reveal |
| `login.html` | Sign-in page with photorealistic Earth WebGL background, animated geometric shapes, starfield, and form validation |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Build** | [Vite 8](https://vite.dev/) | Lightning-fast bundler with HMR |
| **3D** | [Three.js](https://threejs.org/) | Photorealistic Earth globe with shaders |
| **Animation** | [GSAP 3.15](https://gsap.com/) + ScrollTrigger | Professional-grade animation engine |
| **Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Smooth scroll with momentum |
| **Text** | [SplitType](https://www.splittype.com/) | Per-character/word text animation |
| **Styling** | Vanilla CSS | Custom properties, `color-mix()`, `oklch` |
| **Fonts** | Inter + JetBrains Mono | Via Google Fonts |
| **Deploy** | Cloudflare Pages | Edge-deployed static site |

---

## Animation & Visual Features

### Photorealistic Earth Globe (Three.js)
- NASA Blue Marble textures (terrain, bump map, specular water, clouds)
- Fresnel atmosphere glow shader (inner rim + outer halo)
- Auto-rotating terrain + cloud layers at different speeds
- ACES tone mapping with sRGB color space
- Mouse-driven parallax rotation
- Elastic scale-in entrance animation
- Lazy-loaded (code-split) for performance

### Space Background Effects
- **Starfield Canvas** — 600 stars with warp-speed acceleration on scroll
- **Scroll Stars** — 3 parallax star layers with twinkling + random shooting stars
- **Space Planet** — CSS animated orb with cloud rotation, ring, orbiting dots

### Interactive Elements
- **Magnetic buttons** — Attract toward cursor on hover
- **Cursor light** — Ambient radial glow follows mouse (desktop)
- **Feature card glow** — Mouse-tracking radial gradient
- **Depth Stack** — 3D perspective card showcase with focus shift
- **Cursor Reveal** — Circular mask reveals gradient text on hover
- **Geo-shape interaction** — Login shapes repel from cursor with magnetic physics

### Scroll Animations
- Lenis smooth scroll connected to GSAP ScrollTrigger
- `fade-up`, `fade-left`, `fade-right`, `scale-in` reveal types via data attributes
- Stagger children, section heading clip-path reveals
- Parallax layers via `data-parallax` attribute

### Hero Section
- Character-split 3D headline with `back.out` easing (SplitType + GSAP)
- Floating particle orbs with elastic entrance + continuous drift
- Pulsing grid background

### Login Page
- Photorealistic Earth right-half visible as background
- 12 animated geometric shapes with mouse repulsion physics
- Starfield + scroll stars ambient effects
- Staggered form reveal + toast notifications + ripple submit

---

## Project Structure

```
nicart.space/
├── .github/workflows/deploy.yml    # CI/CD (optional, Cloudflare Pages)
├── public/
│   ├── textures/                   # NASA Earth textures (local, no CORS)
│   │   ├── earth-blue-marble.jpg   # 1.4MB — surface color
│   │   ├── earth-topology.png      # 369KB — bump/height map
│   │   ├── earth-water.png         # 420KB — specular (water)
│   │   └── earth-clouds.jpg        # 829KB — cloud layer
│   └── robots.txt
├── src/
│   ├── styles/
│   │   ├── base.css                # Design tokens, reset, scrollbar
│   │   ├── layout.css              # Grid, typography utilities
│   │   ├── components.css          # Nav, buttons, cards, terminal, footer
│   │   ├── hero.css                # Hero section, particles, data-animate
│   │   ├── login.css               # Login page (visual panel, form, shapes)
│   │   └── space.css               # Globe, planet, depth-stack, cursor-reveal
│   ├── js/
│   │   ├── utils.js                # Shared helpers (getRelativeMousePos, clamp, lerp)
│   │   ├── smooth-scroll.js        # Lenis + GSAP ScrollTrigger sync
│   │   ├── hero-animations.js      # GSAP hero entrance sequence
│   │   ├── scroll-animations.js    # ScrollTrigger reveal system
│   │   ├── interactions.js         # Card glow, nav highlighting
│   │   ├── cursor-light.js         # Mouse-following ambient glow
│   │   ├── magnetic-buttons.js     # Magnetic hover effect
│   │   ├── terminal.js             # Terminal typing animation
│   │   ├── mobile-nav.js           # Mobile hamburger menu
│   │   ├── starfield.js            # Canvas warp-speed starfield
│   │   ├── scroll-stars.js         # Parallax star layers + shooting stars
│   │   ├── globe.js                # Three.js photorealistic Earth
│   │   ├── space-planet.js         # CSS animated planet orb
│   │   ├── depth-stack.js          # 3D perspective card stack
│   │   ├── cursor-reveal.js        # Circular mask reveal
│   │   ├── login-animations.js     # Login page GSAP + shape physics
│   │   └── login-form.js           # Form validation & interactions
│   ├── index.html                  # Landing page
│   ├── login.html                  # Login page
│   ├── main.js                     # Entry — landing page
│   └── login-main.js              # Entry — login page
├── .gitignore
├── package.json
├── vite.config.js
├── wrangler.toml                   # Cloudflare Pages config
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── LICENSE
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
git clone https://github.com/Nicartjay/nicartPage.git
cd nicartPage
npm install
npm run dev
```

Dev server starts at `http://localhost:3000` with HMR.

### Build

```bash
npm run build    # Production build → dist/
npm run preview  # Preview production locally
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server with HMR (port 3000) |
| `npm run build` | Production build (minified, tree-shaken, code-split) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint on source files |
| `npm run format` | Prettier formatting |

---

## Deployment (Cloudflare Pages)

The site is deployed via Cloudflare Pages connected directly to the GitHub repository.

**Cloudflare Pages Settings:**

| Setting | Value |
|---------|-------|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Deploys automatically on every push to `main`.

---

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0b1020` | Page background |
| `--surface` | `#131b2f` | Card/panel backgrounds |
| `--accent` | `#60a5fa` | Primary blue accent |
| `--success` | `#22c55e` | Success states |
| `--warn` | `#fbbf24` | Warning states |
| `--danger` | `#fb7185` | Error states |

### Typography

- **Display/Headings:** Inter 700 (-0.02em tracking)
- **Body:** Inter 400 (1.55 line-height)
- **Code/Mono:** JetBrains Mono 400

---

## Browser Support

- Chrome/Edge 105+
- Firefox 110+
- Safari 16.4+

Requires WebGL for the 3D globe. Falls back gracefully without it.

---

## Performance

- **Code-split globe** — Three.js loaded on-demand (~130KB gzip)
- **Tree-shaken GSAP** — Only imported modules bundled
- **Local textures** — No CORS / third-party CDN dependencies
- **Lazy animations** — ScrollTrigger activates only in viewport
- **Preconnect** — Font loading optimized

---

## License

MIT — see [LICENSE](./LICENSE)

---

## Contact

- **Email:** nicartjay@rakumail.jp
- **GitHub:** [@Nicartjay](https://github.com/Nicartjay)
