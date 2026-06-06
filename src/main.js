/**
 * nicart.space — Main Application Entry Point
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
import { initSpacePlanet } from './js/space-planet';
import { initDepthStack } from './js/depth-stack';
import { initCursorReveal } from './js/cursor-reveal';

document.addEventListener('DOMContentLoaded', () => {
  // Background effects
  initStarfield();
  initScrollStars();

  // Smooth scrolling
  initSmoothScroll();

  // Animations
  initHeroAnimations();
  initScrollAnimations();

  // Interactions
  initInteractions();
  initCursorLight();
  initMagneticButtons();
  initTerminal();
  initMobileNav();

  // Space elements
  initSpacePlanet();
  initDepthStack();
  initCursorReveal();

  // 3D Globe (lazy-loaded)
  if (document.getElementById('globe-container')) {
    import('./js/globe').then(({ initGlobe }) => initGlobe());
  }
});
