/**
 * nicart.space — Main Application Entry Point
 * Initializes all animations, smooth scroll, and interactions
 */

import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/hero.css';

import { initSmoothScroll } from './js/smooth-scroll';
import { initHeroAnimations } from './js/hero-animations';
import { initScrollAnimations } from './js/scroll-animations';
import { initInteractions } from './js/interactions';
import { initCursorLight } from './js/cursor-light';
import { initMagneticButtons } from './js/magnetic-buttons';
import { initTerminal } from './js/terminal';
import { initMobileNav } from './js/mobile-nav';

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
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
});
