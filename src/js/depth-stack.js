/**
 * 3D Depth Image Stack
 * Layered cards with perspective depth and mouse-driven focus
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRelativeMousePos } from './utils';

gsap.registerPlugin(ScrollTrigger);

export function initDepthStack() {
  const container = document.getElementById('depth-stack');
  if (!container) return;

  const items = [...container.querySelectorAll('.depth-card')];
  if (!items.length) return;

  const TOTAL = items.length;
  const SPACING = 60;

  // Initial positioning
  items.forEach((item, i) => {
    gsap.set(item, {
      z: -i * SPACING,
      scale: 1 - i * 0.04,
      opacity: 1 - i * 0.15,
      zIndex: TOTAL - i,
    });
  });

  // Mouse-driven focus (only when visible)
  let focusIndex = 0;
  let targetFocus = 0;
  let isVisible = false;

  container.addEventListener('mousemove', (e) => {
    if (!isVisible) return;
    const { x } = getRelativeMousePos(e, container);
    targetFocus = Math.max(0, Math.min(TOTAL - 1, Math.floor(x * TOTAL)));
  });

  container.addEventListener('mouseleave', () => { targetFocus = 0; });

  // Only animate when in viewport
  ScrollTrigger.create({
    trigger: container,
    start: 'top 90%',
    end: 'bottom 10%',
    onEnter: () => { isVisible = true; },
    onLeave: () => { isVisible = false; },
    onEnterBack: () => { isVisible = true; },
    onLeaveBack: () => { isVisible = false; },
  });

  gsap.ticker.add(() => {
    if (!isVisible) return;
    focusIndex += (targetFocus - focusIndex) * 0.08;

    items.forEach((item, i) => {
      const dist = Math.abs(i - focusIndex);
      gsap.set(item, {
        z: -dist * SPACING,
        scale: 1 - dist * 0.04,
        opacity: Math.max(0.2, 1 - dist * 0.2),
        filter: `blur(${dist * 1.5}px)`,
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
    scrollTrigger: { trigger: container, start: 'top 75%' },
  });
}
