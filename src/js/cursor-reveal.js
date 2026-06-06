/**
 * Cursor Mask Reveal
 * Inspired by codepen.io/Gopi-Chakradhar/pen/vEKLNBX
 * Cursor-driven circular mask that reveals a hidden layer
 */

import gsap from 'gsap';

export function initCursorReveal() {
  const section = document.getElementById('cursor-reveal');
  if (!section) return;

  const revealLayer = section.querySelector('.reveal-layer');
  const maskCircle = section.querySelector('.reveal-mask');
  if (!revealLayer || !maskCircle) return;

  const MASK_SIZE = 250;
  let isActive = false;

  // Mouse tracking
  section.addEventListener('mouseenter', () => {
    isActive = true;
    gsap.to(maskCircle, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  section.addEventListener('mouseleave', () => {
    isActive = false;
    gsap.to(maskCircle, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    });
  });

  section.addEventListener('mousemove', (e) => {
    if (!isActive) return;

    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move the reveal mask
    gsap.to(maskCircle, {
      left: x - MASK_SIZE / 2,
      top: y - MASK_SIZE / 2,
      duration: 0.15,
      ease: 'power2.out',
    });

    // Update clip-path on reveal layer
    revealLayer.style.clipPath = `circle(${MASK_SIZE / 2}px at ${x}px ${y}px)`;
  });

  // Initial state
  gsap.set(maskCircle, { scale: 0, opacity: 0 });
}
