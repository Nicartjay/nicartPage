/**
 * nicart.space — Main Application Entry Point
 * Initializes all animations, smooth scroll, and interactions
 */

import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/hero.css';
import './styles/space.css';

import { initSmoothScroll } from './js/smooth-scroll';
import { initHeroAnimations } from './js/hero-animations';
import { initScrollAnimations } from './js/scroll-animations';
import { initInteractions } from './js/interactions';
import { initCursorLight } from './js/cursor-light';
import { initMagneticButtons } from './js/magnetic-buttons';
import { initTerminal } from './js/terminal';
import { initMobileNav } from './js/mobile-nav';
import { initStarfield } from './js/starfield';
import { initScrollStars } from './js/scroll-stars';
// Globe is lazy-loaded due to Three.js bundle size
import { initSpacePlanet } from './js/space-planet';
import { initDepthStack } from './js/depth-stack';
import { initCursorReveal } from './js/cursor-reveal';

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Background effects
  initStarfield();
  initScrollStars();

  // Smooth scrolling with Lenis
  const lenis = initSmoothScroll();

  // GSAP-powered hero entrance animations
  initHeroAnimations();

  // ScrollTrigger-based reveal animations
  initScrollAnimations(lenis);

  // Interactive elements (card glow, nav highlighting)
  initInteractions();

  // Cursor follow light effect
  initCursorLight();

  // Magnetic button hover effects
  initMagneticButtons();

  // Terminal typing animation
  initTerminal();

  // Mobile navigation
  initMobileNav();

  // 3D Globe (Three.js) — lazy loaded
  if (document.getElementById('globe-container')) {
    import('./js/globe').then(({ initGlobe }) => initGlobe());
  }

  // Animated space planet
  initSpacePlanet();

  // 3D depth card stack
  initDepthStack();

  // Cursor reveal interaction
  initCursorReveal();
});
