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
import { initSpacePlanet } from './js/space-planet';
import { initCursorLight } from './js/cursor-light';

document.addEventListener('DOMContentLoaded', () => {
  // Background space effects
  initStarfield();
  initScrollStars();

  // Login page animations & form
  initLoginAnimations();
  initLoginForm();

  // Space planet in visual panel
  initSpacePlanet();

  // Cursor light on form side
  initCursorLight();

  // 3D Globe (lazy-loaded) in visual panel
  if (document.getElementById('globe-container')) {
    import('./js/globe').then(({ initGlobe }) => initGlobe());
  }
});
