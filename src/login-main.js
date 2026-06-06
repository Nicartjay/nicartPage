/**
 * nicart.space — Login Page Entry Point
 */

import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/login.css';
import './styles/space.css';

import { initLoginAnimations } from './js/login-animations';
import { initLoginForm } from './js/login-form';
import { initStarfield } from './js/starfield';
import { initScrollStars } from './js/scroll-stars';
import { initCursorLight } from './js/cursor-light';

document.addEventListener('DOMContentLoaded', () => {
  // Background space effects
  initStarfield();
  initScrollStars();

  // Login page animations & form
  initLoginAnimations();
  initLoginForm();

  // Cursor light on form side
  initCursorLight();

  // Photorealistic Earth Globe (lazy-loaded for performance)
  import('./js/globe.js').then(({ initGlobe }) => {
    initGlobe();
  });
});
