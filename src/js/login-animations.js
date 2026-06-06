/**
 * Login Animations — GSAP-powered entrance for the login page
 */

import gsap from 'gsap';

export function initLoginAnimations() {
  const tl = gsap.timeline({ delay: 0.2 });

  // Visual panel animations
  const meshBg = document.querySelector('.mesh-bg');
  if (meshBg) {
    tl.fromTo(meshBg,
      { scale: 1.3, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' },
      0
    );

    // Continuous mesh animation
    gsap.to(meshBg, {
      scale: 1.1,
      rotation: 3,
      duration: 12,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }

  // Geometric shapes
  const shapes = document.querySelectorAll('.geo-shape');
  shapes.forEach((shape, i) => {
    tl.fromTo(shape,
      { scale: 0, opacity: 0, rotation: -45 },
      {
        scale: 1,
        opacity: 0.6,
        rotation: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      },
      0.2 + i * 0.1
    );

    // Continuous float
    gsap.to(shape, {
      x: `random(-20, 20)`,
      y: `random(-30, 30)`,
      rotation: `random(-90, 90)`,
      duration: `random(8, 16)`,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.5,
    });
  });

  // Logo reveal
  const logoLarge = document.querySelector('.logo-large');
  if (logoLarge) {
    tl.to(logoLarge, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, 0.5);
  }

  // Tagline
  const tagline = document.querySelector('.tagline');
  if (tagline) {
    tl.to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, 0.8);
  }

  // Orbit animation
  const orbit = document.querySelector('.orbit');
  if (orbit) {
    tl.fromTo(orbit,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' },
      0.6
    );

    // Continuous spin
    gsap.to(orbit, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });
  }

  // Login card elements — stagger reveal
  const cardElements = document.querySelectorAll('.login-card > *');
  if (cardElements.length) {
    tl.to(cardElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.08,
    }, 0.4);
  }

  // Parallax on visual panel
  const visual = document.querySelector('.login-visual');
  if (visual) {
    visual.addEventListener('mousemove', (e) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      shapes.forEach((shape, i) => {
        const depth = (i + 1) * 8;
        gsap.to(shape, {
          x: x * depth,
          y: y * depth,
          duration: 0.8,
          ease: 'power2.out',
        });
      });

      // Subtle movement on logo
      if (logoLarge) {
        gsap.to(logoLarge, {
          x: x * 5,
          y: y * 5,
          duration: 1,
          ease: 'power2.out',
        });
      }
    });
  }
}
