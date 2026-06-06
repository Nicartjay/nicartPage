/**
 * Stars Scroll Parallax Effect
 * Inspired by codepen.io/aleksa-rakocevic/pen/QwEEWam
 * Multiple parallax star layers that shift with scroll
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollStars() {
  const starsContainer = document.getElementById('scroll-stars');
  if (!starsContainer) return;

  const LAYERS = 3;
  const STARS_PER_LAYER = [120, 80, 40];
  const PARALLAX_SPEEDS = [0.3, 0.6, 1.0];
  const STAR_SIZES = [1, 1.5, 2.5];
  const layerEls = [];

  // Create star layers
  for (let l = 0; l < LAYERS; l++) {
    const layer = document.createElement('div');
    layer.className = 'star-layer';
    layer.style.cssText = `
      position: absolute; inset: 0; pointer-events: none;
      will-change: transform;
    `;

    for (let i = 0; i < STARS_PER_LAYER[l]; i++) {
      const star = document.createElement('div');
      const size = STAR_SIZES[l] + Math.random() * STAR_SIZES[l] * 0.5;
      star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: white;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${0.2 + Math.random() * 0.6};
        animation: starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate;
        animation-delay: ${Math.random() * 5}s;
      `;
      layer.appendChild(star);
    }

    starsContainer.appendChild(layer);
    layerEls.push(layer);
  }

  // Parallax scroll
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      layerEls.forEach((layer, i) => {
        const yOffset = progress * window.innerHeight * PARALLAX_SPEEDS[i] * -0.5;
        gsap.set(layer, { y: yOffset });
      });
    },
  });

  // Shooting stars
  function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.4;
    star.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      left: ${startX}px;
      top: ${startY}px;
      box-shadow: 0 0 6px 2px rgba(150, 200, 255, 0.6);
      pointer-events: none;
    `;
    starsContainer.appendChild(star);

    gsap.to(star, {
      x: 200 + Math.random() * 300,
      y: 100 + Math.random() * 200,
      opacity: 0,
      duration: 0.8 + Math.random() * 0.4,
      ease: 'power2.in',
      onComplete: () => star.remove(),
    });
  }

  // Random shooting stars
  setInterval(() => {
    if (Math.random() > 0.6) createShootingStar();
  }, 3000);
}
