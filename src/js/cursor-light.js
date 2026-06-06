/**
 * Cursor Light — Subtle ambient glow that follows the mouse
 */

import gsap from 'gsap';

export function initCursorLight() {
  // Only on desktop (no touch)
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const light = document.createElement('div');
  light.classList.add('cursor-light');
  document.body.appendChild(light);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow with GSAP ticker
  gsap.ticker.add(() => {
    gsap.set(light, {
      x: mouseX,
      y: mouseY,
    });
  });

  // Hide when mouse leaves window
  document.addEventListener('mouseleave', () => {
    gsap.to(light, { opacity: 0, duration: 0.3 });
  });

  document.addEventListener('mouseenter', () => {
    gsap.to(light, { opacity: 1, duration: 0.3 });
  });
}
