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

  // Interactive mouse repulsion on visual panel
  const visual = document.querySelector('.login-visual');
  if (visual) {
    const shapePositions = [];
    shapes.forEach((shape) => {
      const rect = shape.getBoundingClientRect();
      const parentRect = visual.getBoundingClientRect();
      shapePositions.push({
        cx: rect.left - parentRect.left + rect.width / 2,
        cy: rect.top - parentRect.top + rect.height / 2,
      });
    });

    visual.addEventListener('mousemove', (e) => {
      const rect = visual.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      shapes.forEach((shape, i) => {
        const shapeRect = shape.getBoundingClientRect();
        const shapeCX = shapeRect.left - rect.left + shapeRect.width / 2;
        const shapeCY = shapeRect.top - rect.top + shapeRect.height / 2;

        const dx = shapeCX - mouseX;
        const dy = shapeCY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxRadius = 200;

        if (distance < maxRadius) {
          const force = (1 - distance / maxRadius) * 60;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force;
          const pushY = Math.sin(angle) * force;
          const scaleBump = 1 + (1 - distance / maxRadius) * 0.3;

          shape.classList.add('near-cursor');
          gsap.to(shape, {
            x: `+=${pushX * 0.3}`,
            y: `+=${pushY * 0.3}`,
            scale: scaleBump,
            opacity: 0.9,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else {
          shape.classList.remove('near-cursor');
          gsap.to(shape, {
            scale: 1,
            opacity: 0.6,
            duration: 1.2,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto',
          });
        }
      });

      // Subtle parallax on logo
      if (logoLarge) {
        const nx = (mouseX / rect.width - 0.5) * 10;
        const ny = (mouseY / rect.height - 0.5) * 10;
        gsap.to(logoLarge, {
          x: nx,
          y: ny,
          duration: 1,
          ease: 'power2.out',
        });
      }
    });

    // Reset on mouse leave
    visual.addEventListener('mouseleave', () => {
      shapes.forEach((shape) => {
        shape.classList.remove('near-cursor');
        gsap.to(shape, {
          scale: 1,
          opacity: 0.6,
          duration: 1.5,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto',
        });
      });
    });
  }
}
