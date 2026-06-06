/**
 * Animated Space Planet / Orb
 * Inspired by codepen.io/iamglynnsmith/pen/aNGVYa
 * CSS-driven rotating planet with cloud layers and glow
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSpacePlanet() {
  const planet = document.getElementById('space-planet');
  if (!planet) return;

  // Create planet elements dynamically
  const orbSize = 280;

  planet.innerHTML = `
    <div class="planet-wrapper">
      <div class="planet-glow"></div>
      <div class="planet-body">
        <div class="planet-surface"></div>
        <div class="planet-clouds cloud-1"></div>
        <div class="planet-clouds cloud-2"></div>
        <div class="planet-shade"></div>
        <div class="planet-highlight"></div>
      </div>
      <div class="planet-ring"></div>
      <div class="orbit-dot od-1"></div>
      <div class="orbit-dot od-2"></div>
      <div class="orbit-dot od-3"></div>
    </div>
  `;

  // Parallax on mouse
  const wrapper = planet.querySelector('.planet-wrapper');
  let rect = planet.getBoundingClientRect();

  planet.addEventListener('mousemove', (e) => {
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(wrapper, {
      rotateY: x * 20,
      rotateX: -y * 20,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  planet.addEventListener('mouseleave', () => {
    gsap.to(wrapper, {
      rotateY: 0,
      rotateX: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    });
  });

  // Scroll entrance
  gsap.from(wrapper, {
    scale: 0.5,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: planet,
      start: 'top 80%',
    },
  });

  // Resize handler
  window.addEventListener('resize', () => {
    rect = planet.getBoundingClientRect();
  });
}
