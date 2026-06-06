/**
 * Scroll Animations — GSAP ScrollTrigger reveals
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations(lenis) {
  // Generic fade-up animations
  const fadeUpElements = document.querySelectorAll('[data-animate="fade-up"]');
  fadeUpElements.forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    });
  });

  // Fade left
  const fadeLeftElements = document.querySelectorAll('[data-animate="fade-left"]');
  fadeLeftElements.forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    });
  });

  // Fade right
  const fadeRightElements = document.querySelectorAll('[data-animate="fade-right"]');
  fadeRightElements.forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    });
  });

  // Scale in
  const scaleElements = document.querySelectorAll('[data-animate="scale-in"]');
  scaleElements.forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
    });
  });

  // Stagger children
  const staggerContainers = document.querySelectorAll('[data-animate="stagger"]');
  staggerContainers.forEach((container) => {
    const children = container.children;
    gsap.to(children, {
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
    });
  });

  // Section headings — clip/reveal
  const sectionHeadings = document.querySelectorAll('.section-heading');
  sectionHeadings.forEach((heading) => {
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
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  parallaxElements.forEach((el) => {
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
