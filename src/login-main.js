/**
 * nicart.space — Login Page Entry Point
 */

import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/login.css';

import { initLoginAnimations } from './js/login-animations';
import { initLoginForm } from './js/login-form';

document.addEventListener('DOMContentLoaded', () => {
  initLoginAnimations();
  initLoginForm();
});
