/**
 * Scroll Animations — GSAP ScrollTrigger reveals
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ANIMATE_CONFIGS = {
  'fade-up': { y: 0, opacity: 1 },
  'fade-left': { x: 0, opacity: 1 },
  'fade-right': { x: 0, opacity: 1 },
  'scale-in': { scale: 1, opacity: 1 },
};

export function initScrollAnimations() {
  // Generic data-animate elements
  Object.entries(ANIMATE_CONFIGS).forEach(([type, props]) => {
    document.querySelectorAll(`[data-animate="${type}"]`).forEach((el) => {
      gsap.to(el, {
        ...props,
        duration: type === 'scale-in' ? 1.2 : 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });
  });

  // Stagger children
  document.querySelectorAll('[data-animate="stagger"]').forEach((container) => {
    gsap.to(container.children, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Section headings — clip reveal
  document.querySelectorAll('.section-heading').forEach((heading) => {
    gsap.fromTo(heading,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Parallax elements
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Feature cards — stagger reveal
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length) {
    gsap.fromTo(featureCards,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: featureCards[0].parentElement,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }
}
