# Contributing to nicart.space

Thank you for your interest in contributing to nicart.space! This document outlines the process for contributing to this project.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Architecture](#project-architecture)
- [Coding Standards](#coding-standards)
- [Animation Guidelines](#animation-guidelines)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)

---

## Getting Started

### Fork and Clone

```bash
git clone https://github.com/<your-username>/nicartPage.git
cd nicartPage
npm install
npm run dev
```

### Branch Naming

```
feature/short-description    # New features
fix/issue-description        # Bug fixes
refactor/what-changed        # Code refactoring
animation/what-animated      # New animations or motion work
```

---

## Development Workflow

1. Create a branch from `main`
2. Make changes in `src/`
3. Test with `npm run dev` (localhost:3000)
4. Build with `npm run build` to verify production output
5. Commit with conventional commits
6. Push and open a Pull Request

---

## Project Architecture

```
src/
├── js/              # One module per concern
│   ├── utils.js     # Shared helpers (getRelativeMousePos, clamp, lerp)
│   ├── globe.js     # Three.js Earth (heavy, lazy-loaded)
│   └── ...          # 15 other modules
├── styles/          # Split by concern
│   ├── base.css     # Tokens, reset
│   ├── layout.css   # Grid, typography
│   ├── components.css # Nav, buttons, cards
│   ├── hero.css     # Hero section
│   ├── login.css    # Login page
│   └── space.css    # Globe, planet, depth-stack
├── main.js          # Landing page entry
└── login-main.js    # Login page entry
```

**Key principles:**
- One init function per module, exported and called from entry points
- Heavy code (Three.js) is lazy-loaded via dynamic `import()`
- CSS uses design tokens from `base.css` — never hardcode colors/spacing
- Use `data-animate` attributes as animation hooks, not classes

---

## Coding Standards

### JavaScript

- ES Modules (`import`/`export`)
- No frameworks — GSAP + Three.js + vanilla
- Use shared utilities from `src/js/utils.js` for mouse position, math
- Guard all modules with `if (!element) return;` at the top
- GSAP for complex animations; CSS for simple transitions

### CSS

- Use design tokens: `var(--accent)`, `var(--gap-md)`, `var(--ease-spring)`
- No `!important` unless overriding third-party
- Mobile-first with `@media (max-width)` breakpoints
- Modern CSS: `color-mix()`, `oklch`, `clamp()`

### HTML

- Semantic elements (`<section>`, `<header>`, `<nav>`, `<main>`)
- `data-animate` and `data-parallax` for animation hooks
- Minimize inline styles

---

## Animation Guidelines

### Performance

1. Animate only `transform` and `opacity` when possible
2. Use `will-change` sparingly
3. Prefer GSAP over CSS for complex sequences
4. Use ScrollTrigger — never raw scroll event listeners
5. Lazy-load heavy 3D content

### Motion Design

- **Fast** (150-300ms): feedback, hover states
- **Medium** (400-800ms): transitions, reveals
- **Slow** (800-1500ms): hero entrances, page-level
- Use custom easing: `power3.out`, `back.out(1.7)`, `elastic.out(1, 0.5)`
- Stagger: 0.05-0.15s between items

### Three.js / WebGL

- Always dispose geometries and materials on cleanup
- Use `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`
- Textures: serve locally (no CORS), use reasonable resolution
- Guard with feature detection for WebGL support

---

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description
```

| Type | Usage |
|------|-------|
| `feat` | New feature or animation |
| `fix` | Bug fix |
| `refactor` | Code restructuring |
| `style` | CSS/formatting (no logic) |
| `perf` | Performance improvement |
| `docs` | Documentation |
| `chore` | Build/tooling/deps |

---

## Pull Request Process

1. Describe what changed and why
2. Include screen recording for visual changes
3. Verify `npm run build` succeeds
4. Test responsive (375px+)
5. Check browser console for errors

---

## Questions?

Open an issue or reach out at nicartjay@rakumail.jp.
