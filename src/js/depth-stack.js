/**
 * 3D Depth Image Stack
 * Inspired by codepen.io/vanholtzco/pen/YPGppbX
 * Layered cards with perspective depth and mouse-driven focus
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initDepthStack() {
  const container = document.getElementById('depth-stack');
  if (!container) return;

  const items = container.querySelectorAll('.depth-card');
  if (!items.length) return;

  const TOTAL = items.length;
  const DEPTH_SPACING = 60;
  const PERSPECTIVE = 1200;

  container.style.perspective = `${PERSPECTIVE}px`;

  // Initial positioning
  items.forEach((item, i) => {
    const z = -i * DEPTH_SPACING;
    const scale = 1 - i * 0.04;
    const opacity = 1 - i * 0.15;

    gsap.set(item, {
      z,
      scale,
      opacity,
      zIndex: TOTAL - i,
    });
  });

  // Mouse-driven focus shift
  let focusIndex = 0;
  let targetFocus = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    targetFocus = Math.floor(x * TOTAL);
    targetFocus = Math.max(0, Math.min(TOTAL - 1, targetFocus));
  });

  container.addEventListener('mouseleave', () => {
    targetFocus = 0;
  });

  // Animation tick
  gsap.ticker.add(() => {
    if (focusIndex === targetFocus) return;
    focusIndex += (targetFocus - focusIndex) * 0.08;

    items.forEach((item, i) => {
      const distance = Math.abs(i - focusIndex);
      const z = -distance * DEPTH_SPACING;
      const scale = 1 - distance * 0.04;
      const opacity = Math.max(0.2, 1 - distance * 0.2);
      const blur = distance * 1.5;

      gsap.set(item, {
        z,
        scale,
        opacity,
        filter: `blur(${blur}px)`,
      });
    });
  });

  // Scroll entrance
  gsap.from(container, {
    rotateX: 20,
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
    },
  });
}
