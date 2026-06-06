/**
 * Cursor Light — Subtle ambient glow that follows the mouse
 */

import gsap from 'gsap';

export function initCursorLight() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const light = document.createElement('div');
  light.classList.add('cursor-light');
  document.body.appendChild(light);

  const xSet = gsap.quickSetter(light, 'x', 'px');
  const ySet = gsap.quickSetter(light, 'y', 'px');

  document.addEventListener('mousemove', (e) => {
    xSet(e.clientX);
    ySet(e.clientY);
  });

  document.addEventListener('mouseleave', () => {
    gsap.to(light, { opacity: 0, duration: 0.3 });
  });

  document.addEventListener('mouseenter', () => {
    gsap.to(light, { opacity: 1, duration: 0.3 });
  });
}
