# nicart.space

> Creative Developer Platform — An animation-focused landing site built with modern web technologies.

[![Deploy to Cloudflare Pages](https://github.com/Nicartjay/nicartPage/actions/workflows/deploy.yml/badge.svg)](https://github.com/Nicartjay/nicartPage/actions/workflows/deploy.yml)

---

## Overview

**nicart.space** is a high-performance, animation-heavy landing page for a creative developer platform. The site emphasizes fluid motion design, micro-interactions, and smooth scrolling to deliver an immersive user experience.

### Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page with hero animations, feature cards, terminal demo, and CTAs |
| `login.html` | Sign-in page with split-screen layout, geometric animations, and form validation |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Build** | [Vite](https://vite.dev/) | Lightning-fast bundler with HMR |
| **Animation** | [GSAP](https://gsap.com/) | Professional-grade animation engine |
| **Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Smooth scroll with momentum |
| **Text** | [SplitType](https://www.splittype.com/) | Per-character/word text animation |
| **Styling** | Vanilla CSS | Custom properties, `color-mix()`, `oklch` |
| **Fonts** | Inter + JetBrains Mono | Via Google Fonts |
| **Deploy** | Cloudflare Pages | Edge-deployed static site |

---

## Animation Features

### Hero Section
- **Character-split headline** — Each letter animates in with 3D rotation via GSAP + SplitType
- **Floating particle orbs** — Elastic entrance + continuous random-drift motion
- **Grid pulse** — Background grid with parallax scroll and opacity breathing
- **Staggered CTA reveal** — Buttons spring-in with `back.out` easing

### Interactions
- **Magnetic buttons** — Buttons attract toward cursor on hover, snap back with elastic easing
- **Cursor light** — Subtle ambient radial gradient follows the mouse (desktop only)
- **Feature card glow** — Mouse-tracking radial gradient on hover
- **Terminal typing** — Lines animate in sequence on scroll, reset on re-entry

### Scroll
- **Lenis smooth scroll** — Connected to GSAP ScrollTrigger for scroll-driven animations
- **ScrollTrigger reveals** — `fade-up`, `fade-left`, `fade-right`, `scale-in`, `stagger` animations
- **Parallax layers** — Data-attribute driven parallax with configurable speed
- **Section headings** — Clip-path reveal animation on scroll

### Login Page
- **Geometric shapes** — GSAP-driven continuous float with parallax mouse response
- **Orbiting dots** — Infinite rotation around the brand logo
- **Mesh gradient** — Slowly morphing background with scale/rotation
- **Stagger form reveal** — Each form element fades up in sequence
- **Ripple submit** — Click ripple effect on the sign-in button
- **Loading shimmer** — Gradient sweep during form submission

---

## Project Structure

```
nicart.space/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD — build & deploy to Cloudflare Pages
├── public/                     # Static assets (copied as-is to dist/)
├── src/
│   ├── styles/
│   │   ├── base.css            # Design tokens, reset, scrollbar, selection
│   │   ├── layout.css          # Grid system, typography utilities
│   │   ├── components.css      # Nav, buttons, cards, terminal, footer
│   │   ├── hero.css            # Hero section, particles, typed cursor
│   │   └── login.css           # Login page specific styles
│   ├── js/
│   │   ├── smooth-scroll.js    # Lenis + GSAP ScrollTrigger integration
│   │   ├── hero-animations.js  # GSAP timeline — hero entrance sequence
│   │   ├── scroll-animations.js # ScrollTrigger-based reveals
│   │   ├── interactions.js     # Card glow, nav highlighting
│   │   ├── cursor-light.js     # Mouse-following ambient light
│   │   ├── magnetic-buttons.js # Magnetic hover effect
│   │   ├── terminal.js         # Terminal typing animation
│   │   ├── mobile-nav.js       # Mobile navigation
│   │   ├── login-animations.js # Login page GSAP animations
│   │   └── login-form.js       # Form validation & interactions
│   ├── index.html              # Landing page
│   ├── login.html              # Login page
│   ├── main.js                 # Entry point — landing page
│   └── login-main.js           # Entry point — login page
├── template/                   # Original design references (gitignored)
├── .gitignore
├── package.json
├── vite.config.js
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
# Clone the repository
git clone https://github.com/Nicartjay/nicartPage.git
cd nicartPage

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server starts at `http://localhost:3000` with hot module replacement (HMR).

### Build

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview
```

Output is generated in the `dist/` directory.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR on port 3000 |
| `npm run build` | Build for production (minified, tree-shaken) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on source files |
| `npm run format` | Format code with Prettier |

---

## Deployment

### Cloudflare Pages (Recommended)

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys on every push to `main`.

**Setup:**

1. Create a Cloudflare Pages project named `nicart-space`
2. Add these secrets to your GitHub repository:
   - `CLOUDFLARE_API_TOKEN` — API token with Pages edit permissions
   - `CLOUDFLARE_ACCOUNT_ID` — Your Cloudflare account ID
3. Push to `main` — deployment is automatic

**Manual deploy:**

```bash
npm run build
npx wrangler pages deploy dist --project-name=nicart-space
```

### Other Platforms

Since this builds to static files, it works on any static host:

| Platform | Build Command | Output Dir |
|----------|---------------|------------|
| Cloudflare Pages | `npm run build` | `dist` |
| Vercel | `npm run build` | `dist` |
| Netlify | `npm run build` | `dist` |
| GitHub Pages | `npm run build` | `dist` |

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0b1020` | Page background |
| `--surface` | `#131b2f` | Card/panel backgrounds |
| `--accent` | `#60a5fa` | Primary accent (blue) |
| `--success` | `#22c55e` | Success states |
| `--warn` | `#fbbf24` | Warning states |
| `--danger` | `#fb7185` | Error states |

### Typography

- **Display/Headings:** Inter (700, -0.02em tracking)
- **Body:** Inter (400, 1.55 line-height)
- **Code/Mono:** JetBrains Mono (400)

### Easing Curves

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Exits, reveals |
| `--ease-spring` | `cubic-bezier(0.2, 0, 0, 1)` | Default transitions |
| `--ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | Smooth deceleration |

---

## Browser Support

- Chrome/Edge 105+
- Firefox 110+
- Safari 16.4+

Uses modern CSS features: `color-mix()`, `oklch`, `text-wrap: balance`, CSS nesting (via build).

---

## Performance

- **No framework** — Zero JS framework overhead
- **Tree-shaken GSAP** — Only imported modules are bundled
- **CSS-first** — Animations use CSS for anything that doesn't need JS control
- **Lazy animations** — ScrollTrigger only activates when elements enter viewport
- **Preconnect** — Font loading optimized with preconnect hints

---

## License

MIT — see [LICENSE](./LICENSE)

---

## Contact

- **Email:** nicartjay@rakumail.jp
- **GitHub:** [@Nicartjay](https://github.com/Nicartjay)
