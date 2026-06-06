/**
 * Hero Animations — GSAP-powered entrance sequence
 */

import gsap from 'gsap';
import SplitType from 'split-type';

export function initHeroAnimations() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  const tl = gsap.timeline({ delay: 0.3 });

  // Animate the grid background
  const heroGrid = document.querySelector('.hero-grid');
  if (heroGrid) {
    tl.fromTo(heroGrid,
      { opacity: 0, scale: 1.2 },
      { opacity: 0.5, scale: 1, duration: 2, ease: 'power2.out' },
      0
    );

    // Continuous grid pulse
    gsap.to(heroGrid, {
      opacity: 0.7,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }

  // Animate floating orbs
  const orbs = document.querySelectorAll('.hero-particles .orb');
  orbs.forEach((orb, i) => {
    tl.fromTo(orb,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
      },
      i * 0.15
    );

    // Continuous floating animation
    gsap.to(orb, {
      x: `random(-30, 30)`,
      y: `random(-40, 40)`,
      scale: `random(0.9, 1.1)`,
      duration: `random(6, 12)`,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.5,
    });
  });

  // Eyebrow text
  const eyebrow = heroContent.querySelector('.eyebrow');
  if (eyebrow) {
    tl.fromTo(eyebrow,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.5
    );
  }

  // Split and animate headline
  const headline = heroContent.querySelector('h1');
  if (headline) {
    const split = new SplitType(headline, { types: 'chars, words' });

    tl.fromTo(split.chars,
      { y: 60, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.02,
      },
      0.7
    );
  }

  // Lead paragraph
  const lead = heroContent.querySelector('.lead');
  if (lead) {
    tl.fromTo(lead,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      1.2
    );
  }

  // CTA buttons
  const ctaButtons = heroContent.querySelectorAll('.hero-cta .btn');
  if (ctaButtons.length) {
    tl.fromTo(ctaButtons,
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.1,
      },
      1.5
    );
  }

  // Typed cursor blinking (enhanced)
  const cursor = document.querySelector('.typed-cursor');
  if (cursor) {
    gsap.fromTo(cursor,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, delay: 2, ease: 'steps(1)' }
    );
  }
}
