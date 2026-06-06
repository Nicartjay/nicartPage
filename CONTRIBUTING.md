# Contributing to nicart.space

Thank you for your interest in contributing to nicart.space! This document outlines the process for contributing to this project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Animation Guidelines](#animation-guidelines)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and harassment-free environment for everyone. Be constructive, be kind, and focus on the work.

---

## Getting Started

### Fork and Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/<your-username>/nicartPage.git
cd nicartPage
npm install
npm run dev
```

### Branch Naming

Create a branch from `main` using this convention:

```
feature/short-description    # New features
fix/issue-description        # Bug fixes
refactor/what-changed        # Code refactoring
docs/what-updated            # Documentation changes
animation/what-animated      # New animations or motion work
```

---

## Development Workflow

1. **Create a branch** from `main`
2. **Make your changes** in the `src/` directory
3. **Test locally** with `npm run dev`
4. **Build** with `npm run build` to verify production output
5. **Commit** using conventional commits
6. **Push** and open a Pull Request

### Directory Guide

| Directory | What goes here |
|-----------|----------------|
| `src/styles/` | CSS files — split by concern (base, layout, components, page-specific) |
| `src/js/` | JavaScript modules — one file per concern |
| `src/assets/` | Static assets that need processing (SVGs, images) |
| `public/` | Static assets copied as-is (favicons, robots.txt) |

---

## Coding Standards

### JavaScript

- **ES Modules** — Use `import`/`export`, no CommonJS
- **Vanilla JS** — No frameworks; GSAP is the animation library
- **Descriptive names** — Functions describe what they do (`initHeroAnimations`, not `init1`)
- **JSDoc comments** — Document exported functions with `/** */`
- **No global state** — Each module is self-contained

```javascript
// Good
export function initFeatureCards() {
  const cards = document.querySelectorAll('.feature-card');
  // ...
}

// Avoid
window.initCards = function() { /* ... */ }
```

### CSS

- **Custom Properties** — Use design tokens from `base.css` for all values
- **BEM-lite naming** — `.block-element` for children, state classes for variants
- **No `!important`** — Unless overriding third-party styles
- **Mobile-first** — Base styles for mobile, `@media (min-width)` for larger screens
- **Modern CSS** — Use `color-mix()`, `oklch`, `clamp()` where appropriate

```css
/* Good */
.feature-card {
  background: var(--surface);
  transition: all var(--transition-base);
}

/* Avoid */
.feature-card {
  background: #131b2f;
  transition: all 0.25s ease;
}
```

### HTML

- **Semantic elements** — Use `<section>`, `<header>`, `<nav>`, `<main>`, `<footer>`
- **ARIA labels** — All interactive elements need accessible labels
- **Data attributes** — Use `data-animate`, `data-parallax` for animation hooks
- **No inline styles** — Except for CSS custom property overrides

---

## Animation Guidelines

Since this project is animation-focused, please follow these principles:

### Performance

1. **Animate only `transform` and `opacity`** — These are GPU-accelerated
2. **Use `will-change` sparingly** — Only on elements that actually animate continuously
3. **Prefer GSAP over CSS animations** for complex sequences — better control and performance
4. **Use ScrollTrigger** for scroll-based animations — don't use scroll event listeners

### Motion Design

1. **Purposeful motion** — Every animation should guide attention or provide feedback
2. **Respect timing** — Fast for feedback (150-300ms), medium for transitions (400-800ms), slow for reveals (800-1200ms)
3. **Use custom easing** — Avoid `linear` and default `ease`. Use the design tokens:
   - `power3.out` for most reveals
   - `back.out(1.7)` for spring-like entrances
   - `elastic.out(1, 0.5)` for playful elements
4. **Stagger thoughtfully** — 0.05-0.15s between items in a group
5. **Reduce motion** — Respect `prefers-reduced-motion` (add checks for this)

### Adding New Animations

1. Create a new module in `src/js/` if it's a distinct concern
2. Export an `init` function that sets up the animation
3. Import and call it from the appropriate entry point (`main.js` or `login-main.js`)
4. Use `data-animate` attributes on HTML elements as animation hooks
5. Document the animation in the README

---

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature or animation |
| `fix` | Bug fix |
| `refactor` | Code change that neither fixes nor adds |
| `style` | CSS/formatting changes (no logic change) |
| `docs` | Documentation only |
| `perf` | Performance improvement |
| `chore` | Build/tooling/dependency changes |
| `animation` | New or modified animation (alias for feat) |

### Examples

```
feat(hero): add character-split headline animation
fix(login): correct parallax depth on mobile
refactor(scroll): extract ScrollTrigger setup into shared utility
animation(terminal): add cursor blink after typing sequence
docs: update README with animation catalog
```

---

## Pull Request Process

1. **Fill out the PR template** — Describe what changed and why
2. **Include a screen recording** — For any visual/animation changes
3. **Keep PRs focused** — One concern per PR
4. **Test on multiple browsers** — Chrome, Firefox, Safari minimum
5. **Check bundle size** — Run `npm run build` and note any significant increases

### PR Checklist

- [ ] Code follows the style guide
- [ ] Animations are smooth (60fps on mid-range hardware)
- [ ] No console errors or warnings
- [ ] Responsive on mobile (375px+)
- [ ] `npm run build` succeeds without errors
- [ ] README updated if adding new features

---

## Reporting Issues

When opening an issue, please include:

1. **Description** — What happened vs. what you expected
2. **Steps to reproduce** — Exact steps to trigger the issue
3. **Browser/OS** — Include version numbers
4. **Screenshots/recordings** — Especially for visual bugs
5. **Console output** — Any errors in DevTools

---

## Questions?

Open a [Discussion](https://github.com/Nicartjay/nicartPage/discussions) or reach out at nicartjay@rakumail.jp.
